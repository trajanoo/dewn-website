'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import IngredientsMobile from './IngredientsMobile';

const TOTAL_FRAMES = 192;
const SCROLL_HEIGHT = 680;
const FRAME_BASE_PATH = '/dewn-3d/frame_';
const FRAME_EXTENSION = '.png';
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
  const fadeInEnd = Math.min(start + feather, end);
  const fadeOutStart = Math.max(end - feather, start);

  if (progress <= start || progress >= end) return 0;
  if (progress >= fadeInEnd && progress <= fadeOutStart) return 1;
  if (progress < fadeInEnd) return (progress - start) / Math.max(fadeInEnd - start, 0.0001);
  return (end - progress) / Math.max(end - fadeOutStart, 0.0001);
}

function useIsDesktop(): boolean | undefined {
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

function IngredientsDesktop() {
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
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = SECTION_BG;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

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
        const img = new Image();
        img.decoding = 'async';
        img.src = framePath(frameNumber);
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

    const preload = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
        loadFrame(i + 1).then((img) => {
          loadedCount += 1;
          if (isMounted) setLoadProgress(loadedCount / TOTAL_FRAMES);
          return img;
        }),
      );

      const images = await Promise.all(promises);
      if (!isMounted) return;

      imagesRef.current = images;
      setIsLoaded(true);

      const firstIndex = images.findIndex((img) => img !== null);
      if (firstIndex >= 0) drawFrame(firstIndex);
    };

    preload();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!isLoaded) return;
      drawFrame(frameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  useEffect(() => {
    const updateScrollState = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionStart = section.offsetTop;
      const sectionEnd = sectionStart + section.offsetHeight - window.innerHeight;
      const maxScroll = Math.max(sectionEnd - sectionStart, 1);
      const progress = clamp((window.scrollY - sectionStart) / maxScroll, 0, 1);

      setScrollProgress(progress);

      if (!isLoaded) return;

      const frameIndex = clamp(Math.round(progress * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1);
      if (frameIndex === frameRef.current) return;

      if (drawRafRef.current !== null) cancelAnimationFrame(drawRafRef.current);
      drawRafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
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
            style={{
              backgroundColor: SECTION_BG,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
            }}
          />
        </div>

        {!isLoaded && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
            <div className="h-px w-full bg-[#E5E7EB]">
              <div
                className="h-px bg-[#0E7490] transition-all duration-200"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Text overlay */}
        <div className="relative z-10 flex h-screen items-center">
          <div className="mx-auto 2xl:mx-0 2xl:ml-40 w-full max-w-7xl px-6 lg:px-10">
            <div className="relative min-h-[220px]">
              {beatStates.map((beat) => (
                <motion.div
                  key={beat.id}
                  animate={{ opacity: beat.opacity, y: beat.y }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-0 max-w-3xl"
                >
                  <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#2563EB]">
                    What&apos;s Inside
                  </p>
                  <h2 className="text-4xl font-light tracking-[0.04em] text-[#0D0D0D] sm:text-5xl lg:text-5xl">
                    {beat.heading}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-[#6B6B6B] sm:text-md">
                    {beat.descriptor}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function IngredientsSection() {
  const isDesktop = useIsDesktop();

  if (isDesktop === undefined) return null;

  if (!isDesktop) return <IngredientsMobile />;
  return <IngredientsDesktop />;
}