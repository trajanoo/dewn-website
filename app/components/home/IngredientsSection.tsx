'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const TOTAL_FRAMES = 147;
const SCROLL_HEIGHT = 680;
const FRAME_BASE_PATH = '/dewn-3d/ezgif-frame-';
const FRAME_EXTENSION = '.jpg';
const SECTION_BG = '#FAFAFA';

type Beat = {
  id: string;
  start: number;
  end: number;
  heading: string;
  descriptor: string;
};

const STORY_BEATS: Beat[] = [
  {
    id: 'intro',
    start: 0,
    end: 0.15,
    heading: "What's Inside",
    descriptor: 'Essential nutrients engineered to remain light, stable, and easy to drink.',
  },
  {
    id: 'phgg',
    start: 0.15,
    end: 0.3,
    heading: 'PHGG',
    descriptor: 'Low-viscosity soluble fiber / Prevents the thickening common in fiber drinks',
  },
  {
    id: 'whey',
    start: 0.3,
    end: 0.45,
    heading: 'Acid-Stable Clear Whey',
    descriptor: 'Protein isolate / Remains dispersed under acidic digestive conditions',
  },
  {
    id: 'magnesium',
    start: 0.45,
    end: 0.6,
    heading: 'Magnesium Complex',
    descriptor: 'L-Threonate · Glycinate · Taurate / Chelated mineral forms that prevent chalky residue',
  },
  {
    id: 'electrolyte',
    start: 0.6,
    end: 0.75,
    heading: 'Electrolyte System',
    descriptor: 'Potassium Citrate · Sodium Chloride / Mineral forms designed for a smoother taste',
  },
  {
    id: 'sensory',
    start: 0.75,
    end: 0.9,
    heading: 'Sensory Balance',
    descriptor: 'Ginger · Glycine · Reb-M · Natural Lemon Flavor / Calibrated for a clean, neutral finish',
  },
  {
    id: 'outro',
    start: 0.9,
    end: 1,
    heading: 'Zero grit. Zero haze. Zero heaviness.',
    descriptor: 'Held in solution from first sip to finish.',
  },
];

function framePath(frameNumber: number) {
  return `${FRAME_BASE_PATH}${String(frameNumber).padStart(3, '0')}${FRAME_EXTENSION}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function beatOpacity(progress: number, start: number, end: number, feather = 0.035) {
  const fadeInStart = start;
  const fadeInEnd = Math.min(start + feather, end);
  const fadeOutStart = Math.max(end - feather, start);
  const fadeOutEnd = end;

  if (progress <= fadeInStart || progress >= fadeOutEnd) return 0;
  if (progress >= fadeInEnd && progress <= fadeOutStart) return 1;
  if (progress < fadeInEnd) return (progress - fadeInStart) / Math.max(fadeInEnd - fadeInStart, 0.0001);
  return (fadeOutEnd - progress) / Math.max(fadeOutEnd - fadeOutStart, 0.0001);
}

export default function IngredientsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef<number>(0);
  const drawRafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const beatStates = useMemo(() => {
    return STORY_BEATS.map((beat) => {
      const opacity = beatOpacity(scrollProgress, beat.start, beat.end);
      const y = 14 * (1 - opacity);
      return { ...beat, opacity, y };
    });
  }, [scrollProgress]);

  const sectionEntranceOpacity = useMemo(() => {
    // Fast but smooth fade-in during the first slice of section scroll.
    const t = clamp(scrollProgress / 0.08, 0, 1);
    return t * t;
  }, [scrollProgress]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[index];
    if (!canvas || !image) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = Math.floor(viewportWidth * dpr);
    const targetHeight = Math.floor(viewportHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = SECTION_BG;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const scale = Math.max(viewportWidth / image.width, viewportHeight / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const x = (viewportWidth - drawWidth) / 2;
    const y = (viewportHeight - drawHeight) / 2;

    context.drawImage(image, x, y, drawWidth, drawHeight);
    frameRef.current = index;
  };

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    const loadFrame = (frameNumber: number) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        const image = new Image();
        image.decoding = 'async';
        image.src = framePath(frameNumber);
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
      });

    const preload = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return loadFrame(i + 1).then((image) => {
          loadedCount += 1;
          if (isMounted) {
            setLoadProgress(loadedCount / TOTAL_FRAMES);
          }
          return image;
        });
      });

      const images = await Promise.all(promises);
      if (!isMounted) return;

      imagesRef.current = images;
      setIsLoaded(true);

      const firstLoadedIndex = images.findIndex((image) => image !== null);
      if (firstLoadedIndex >= 0) {
        drawFrame(firstLoadedIndex);
      }
    };

    preload();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!isLoaded) return;
      drawFrame(frameRef.current);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded]);

  useEffect(() => {
    const updateScrollState = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionStart = section.offsetTop;
      const sectionEnd = sectionStart + section.offsetHeight - window.innerHeight;
      const maxScroll = Math.max(sectionEnd - sectionStart, 1);
      const currentScroll = window.scrollY;
      const progress = clamp((currentScroll - sectionStart) / maxScroll, 0, 1);

      setScrollProgress(progress);

      if (!isLoaded) return;

      const frameIndex = clamp(Math.round(progress * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1);
      if (frameIndex === frameRef.current) return;

      if (drawRafRef.current !== null) cancelAnimationFrame(drawRafRef.current);
      drawRafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
    };

    const onScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        updateScrollState();
      });
    };

    updateScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
      if (drawRafRef.current !== null) cancelAnimationFrame(drawRafRef.current);
    };
  }, [isLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-[#FAFAFA]"
      style={{ height: `${SCROLL_HEIGHT}vh` }}
    >
      <div className="sticky top-0 h-screen" style={{ opacity: sectionEntranceOpacity }}>
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#FAFAFA]" aria-hidden="true">
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ backgroundColor: SECTION_BG }}
          />
        </div>

        {!isLoaded ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
            <div className="h-px w-full bg-[#E5E7EB]">
              <div className="h-px bg-[#0E7490] transition-all duration-200" style={{ width: `${Math.round(loadProgress * 100)}%` }} />
            </div>
          </div>
        ) : null}

        <div className="relative z-10 flex h-screen items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="relative min-h-[220px]">
              {beatStates.map((beat) => (
                <motion.div
                  key={beat.id}
                  animate={{ opacity: beat.opacity, y: beat.y }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-0 max-w-3xl"
                >
                  <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#2563EB]">What&apos;s Inside</p>
                  <h2 className="text-4xl font-light tracking-[0.04em] text-[#0D0D0D] sm:text-5xl lg:text-6xl">{beat.heading}</h2>
                  <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-[#6B6B6B] sm:text-lg">{beat.descriptor}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}