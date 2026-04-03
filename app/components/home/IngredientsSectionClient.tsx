'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import IngredientsMobile from './IngredientsMobile';

const TOTAL_FRAMES = 192;
const SCROLL_HEIGHT = 680;
const FRAME_BASE_PATH = '/dewn-3d/ezgif-frame-';
const FRAME_EXTENSION = '.png';
const SECTION_BG = '#FAFAFA';

// ─── AMBIENT PARTICLES ────────────────────────────────────────────────────────
const AMBIENT_COUNT = 38;
const ASH_COLORS = [
  'rgba(160,163,168,',
  'rgba(175,177,181,',
  'rgba(190,192,195,',
  'rgba(145,148,155,',
  'rgba(200,201,204,',
  'rgba(152,157,165,',
];
type AmbientParticle = {
  id: number; x: number; y: number; size: number; color: string;
  speed: number; lateralAmp: number; lateralFreq: number; phase: number; opacity: number;
};
function seededRand(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}
function buildAmbientParticles(): AmbientParticle[] {
  const rand = seededRand(42);
  return Array.from({ length: AMBIENT_COUNT }, (_, i) => {
    let x: number, y: number;
    const zone = rand();
    if (zone < 0.35) { x = rand() * 22; y = rand() * 100; }
    else if (zone < 0.70) { x = 78 + rand() * 22; y = rand() * 100; }
    else if (zone < 0.85) { x = 20 + rand() * 60; y = rand() * 18; }
    else { x = 20 + rand() * 60; y = 82 + rand() * 18; }
    return {
      id: i, x, y, size: 1.2 + rand() * 2.0,
      color: ASH_COLORS[Math.floor(rand() * ASH_COLORS.length)],
      speed: 4 + rand() * 8, lateralAmp: 6 + rand() * 14,
      lateralFreq: 0.04 + rand() * 0.08, phase: rand() * Math.PI * 2,
      opacity: 0.18 + rand() * 0.28,
    };
  });
}
const AMBIENT_PARTICLES = buildAmbientParticles();

// ─── BEAT POSITIONING SYSTEM ──────────────────────────────────────────────────
//
// Each beat's visual position is controlled by an `anchor` object.
// This is the only thing you need to change to reposition any beat.
//
// FIELDS:
//
//   x         (0–100)  — horizontal % from the left edge of the viewport.
//   y         (0–100)  — vertical % from the top edge of the viewport.
//
//   originX   — which horizontal point of the text block snaps to `x`:
//                 'left'   → block starts at x
//                 'center' → block is centered on x
//                 'right'  → block ends at x
//
//   originY   — which vertical point of the text block snaps to `y`:
//                 'top'    → block starts at y
//                 'center' → block is vertically centered on y
//                 'bottom' → block ends at y
//
//   textAlign — text alignment inside the block: 'left' | 'center' | 'right'
//
// ENTRY ANIMATION:
//   Blocks with textAlign 'left'   slide in from the left.
//   Blocks with textAlign 'right'  slide in from the right.
//   Blocks with textAlign 'center' slide in from below.
//
// EXAMPLE — block anchored at the top-right corner of the viewport:
//   { x: 94, y: 8, originX: 'right', originY: 'top', textAlign: 'right' }
//
// ─── EDIT BELOW ──────────────────────────────────────────────────────────────

type Anchor = {
  x: number;
  y: number;
  originX: 'left' | 'center' | 'right';
  originY: 'top' | 'center' | 'bottom';
  textAlign: 'left' | 'center' | 'right';
};

type Beat = {
  id: string;
  start: number;       // scroll progress where beat fades IN  (0–1)
  end: number;         // scroll progress where beat fades OUT (0–1)
  heading: string;
  descriptor: string;
  size: 'large' | 'medium' | 'small';
  label?: string;
  anchor: Anchor;
};

type SanityItem = { name?: string; subtitle?: string; desc?: string };

const STORY_BEATS: Beat[] = [
  {
    id: 'intro',
    start: 0,
    end: 0.18,
    heading: "What's Inside",
    descriptor: 'Essential nutrients engineered to remain light, stable, and easy to drink.',
    size: 'large',
    anchor: { x: 85, y: 38, originX: 'right', originY: 'center', textAlign: 'right' },
  },
  {
    id: 'phgg',
    start: 0.18,
    end: 0.30,
    heading: 'PHGG',
    descriptor: 'Low-viscosity soluble fiber. Prevents the thickening common in fiber drinks.',
    size: 'medium',
    label: '01',
    anchor: { x: 90, y: 38, originX: 'right', originY: 'center', textAlign: 'right' },
  },
  {
    id: 'whey',
    start: 0.30,
    end: 0.45,
    heading: 'Acid-Stable Clear Whey',
    descriptor: 'Protein isolate. Remains dispersed under acidic digestive conditions.',
    size: 'medium',
    label: '02',
    anchor: { x: 94, y: 38, originX: 'right', originY: 'center', textAlign: 'right' },
  },
  {
    id: 'magnesium',
    start: 0.45,
    end: 0.53,
    heading: 'Magnesium Complex',
    descriptor: 'L-Threonate · Glycinate · Taurate — chelated mineral forms that prevent chalky residue.',
    size: 'medium',
    label: '03',
    anchor: { x: 10, y: 68, originX: 'left', originY: 'center', textAlign: 'left' },
  },
  {
    id: 'electrolyte',
    start: 0.53,
    end: 0.67,
    heading: 'Electrolyte System',
    descriptor: 'Potassium Citrate · Sodium Chloride. Mineral forms designed for a smoother taste.',
    size: 'small',
    label: '04',
    anchor: { x: 90, y: 22, originX: 'right', originY: 'top', textAlign: 'right' },
  },
  {
    id: 'sensory',
    start: 0.67,
    end: 0.77,
    heading: 'Sensory Balance',
    descriptor: 'Ginger · Glycine · Reb-M · Natural Lemon Flavor. Calibrated for a clean, neutral finish.',
    size: 'small',
    label: '05',
    anchor: { x: 50, y: 84, originX: 'center', originY: 'bottom', textAlign: 'center' },
  },
  {
    id: 'outro',
    start: 0.7,
    end: 1.0,
    heading: 'Zero grit. Zero haze.\nZero heaviness.',
    descriptor: 'Held in solution from first sip to finish.',
    size: 'large',
    anchor: { x: 94, y: 50, originX: 'right', originY: 'center', textAlign: 'right' },
  },
];

// ─── SIZE STYLES ──────────────────────────────────────────────────────────────
const sizeStyles: Record<Beat['size'], { heading: string; descriptor: string; maxWidth: string }> = {
  large: {
    heading: 'text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.15] tracking-[0.03em]',
    descriptor: 'mt-6 text-base sm:text-lg leading-relaxed',
    maxWidth: '22rem',
  },
  medium: {
    heading: 'text-3xl sm:text-4xl lg:text-[2.5rem] font-light leading-[1.2] tracking-[0.03em]',
    descriptor: 'mt-5 text-sm sm:text-base leading-relaxed',
    maxWidth: '20rem',
  },
  small: {
    heading: 'text-2xl sm:text-3xl lg:text-[2rem] font-light leading-[1.25] tracking-[0.03em]',
    descriptor: 'mt-4 text-sm leading-relaxed',
    maxWidth: '18rem',
  },
};

// ─── ANCHOR → CSS ─────────────────────────────────────────────────────────────
function anchorToStyle(anchor: Anchor, maxWidth: string): React.CSSProperties {
  const style: React.CSSProperties = { position: 'absolute', maxWidth, textAlign: anchor.textAlign };
  let tx = '0%';
  let ty = '0%';

  if (anchor.originX === 'left')        { style.left  = `${anchor.x}%`; }
  else if (anchor.originX === 'right')  { style.right = `${100 - anchor.x}%`; }
  else                                  { style.left  = `${anchor.x}%`; tx = '-50%'; }

  if (anchor.originY === 'top')         { style.top    = `${anchor.y}%`; }
  else if (anchor.originY === 'bottom') { style.bottom = `${100 - anchor.y}%`; }
  else                                  { style.top    = `${anchor.y}%`; ty = '-50%'; }

  if (tx !== '0%' || ty !== '0%') style.transform = `translate(${tx}, ${ty})`;
  return style;
}

function entryOffset(anchor: Anchor): { x: number; y: number } {
  if (anchor.textAlign === 'left')   return { x: -24, y: 0 };
  if (anchor.textAlign === 'right')  return { x:  24, y: 0 };
  return { x: 0, y: 12 };
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function framePath(n: number) {
  return `${FRAME_BASE_PATH}${String(n).padStart(3, '0')}${FRAME_EXTENSION}`;
}
function clamp(v: number, min: number, max: number) { return Math.min(Math.max(v, min), max); }
function beatOpacity(progress: number, start: number, end: number, feather = 0.03) {
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
function buildBeats(items: SanityItem[]): Beat[] {
  if (items.length === 0) return STORY_BEATS;
  const total = items.length;
  return items.map((it, idx) => {
    const start = idx / total;
    const end = (idx + 1) / total;
    const size: Beat['size'] = idx === 0 || idx === total - 1 ? 'large' : 'medium';
    const defaults = STORY_BEATS[idx] ?? STORY_BEATS[STORY_BEATS.length - 1];
    return {
      id: (it.name ?? `beat-${idx}`).toLowerCase().replace(/\s+/g, '-'),
      start, end, heading: it.name ?? '', descriptor: it.desc ?? '', size,
      label: it.subtitle, anchor: defaults.anchor,
    };
  });
}

// ─── AMBIENT CANVAS ──────────────────────────────────────────────────────────
function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      AMBIENT_PARTICLES.forEach((p) => {
        const drift = (p.speed * elapsed) % 100;
        const yPercent = (p.y + drift) % 100;
        const xSway = p.x + Math.sin(elapsed * p.lateralFreq * Math.PI * 2 + p.phase) * (p.lateralAmp / w * 100);
        ctx.beginPath();
        ctx.arc((xSway / 100) * w, (yPercent / 100) * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} />;
}

// ─── DESKTOP SECTION ─────────────────────────────────────────────────────────
function IngredientsDesktop({ items }: { items: SanityItem[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef<number>(0);
  const drawRafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const beats = useMemo(() => buildBeats(items), [items]);
  const beatStates = useMemo(() =>
    beats.map((beat) => ({
      ...beat,
      opacity: beatOpacity(scrollProgress, beat.start, beat.end),
      entry: entryOffset(beat.anchor),
    })),
    [scrollProgress, beats]
  );
  const sectionEntranceOpacity = useMemo(() => {
    const t = clamp(scrollProgress / 0.08, 0, 1);
    return t * t;
  }, [scrollProgress]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const image = imagesRef.current[index];
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.floor(vw * dpr) || canvas.height !== Math.floor(vh * dpr)) {
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = SECTION_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const scale = Math.max(vw / image.width, vh / image.height);
    const dw = image.width * scale;
    const dh = image.height * scale;
    ctx.drawImage(image, (vw - dw) / 2, (vh - dh) / 2, dw, dh);
    frameRef.current = index;
  };

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const preload = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
        new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = framePath(i + 1);
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
        }).then((img) => { loadedCount++; if (isMounted) setLoadProgress(loadedCount / TOTAL_FRAMES); return img; })
      );
      const images = await Promise.all(promises);
      if (!isMounted) return;
      imagesRef.current = images;
      setIsLoaded(true);
      const first = images.findIndex((img) => img !== null);
      if (first >= 0) drawFrame(first);
    };
    preload();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const handleResize = () => { if (isLoaded) drawFrame(frameRef.current); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionStart = section.offsetTop;
      const sectionEnd = sectionStart + section.offsetHeight - window.innerHeight;
      const progress = clamp((window.scrollY - sectionStart) / Math.max(sectionEnd - sectionStart, 1), 0, 1);
      setScrollProgress(progress);
      if (!isLoaded) return;
      const frameIndex = clamp(Math.round(progress * (TOTAL_FRAMES - 1)), 0, TOTAL_FRAMES - 1);
      if (frameIndex === frameRef.current) return;
      if (drawRafRef.current !== null) cancelAnimationFrame(drawRafRef.current);
      drawRafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    };
    const onScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(() => { scrollRafRef.current = null; update(); });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
      if (drawRafRef.current !== null) cancelAnimationFrame(drawRafRef.current);
    };
  }, [isLoaded]);

  return (
    <section ref={sectionRef} className="relative isolate bg-[#FAFAFA]" style={{ height: `${SCROLL_HEIGHT}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ opacity: sectionEntranceOpacity }}>
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#FAFAFA]" aria-hidden="true" />
        <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none', backgroundColor: SECTION_BG }} />
        <AmbientCanvas />
        {!isLoaded && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
            <div className="h-px w-full bg-[#E5E7EB]">
              <div className="h-px bg-[#0E7490] transition-all duration-200" style={{ width: `${Math.round(loadProgress * 100)}%` }} />
            </div>
          </div>
        )}

        {/* Beats */}
        <div className="relative z-30 h-screen pointer-events-none">
          {beatStates.map((beat, index) => {
            const posStyle = anchorToStyle(beat.anchor, sizeStyles[beat.size].maxWidth);
            const offset = beat.entry;
            return (
              <motion.div
                key={beat.id}
                style={{ ...posStyle }}
                animate={{
                  opacity: beat.opacity,
                  x: offset.x * (1 - beat.opacity),
                  y: offset.y * (1 - beat.opacity),
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <div className={`mb-5 flex items-center gap-4 ${beat.anchor.textAlign === 'right' ? 'flex-row-reverse' : beat.anchor.textAlign === 'center' ? 'justify-center' : ''}`}>
                  {index === 0 && (
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#2563EB]">
                      What&apos;s Inside
                    </p>
                  )}
                  {beat.label && (
                    <span className="text-xs font-bold text-[#0D0D0D]/25 tracking-widest">
                      {beat.label} / 05
                    </span>
                  )}
                </div>
                <h2 className={`text-[#0D0D0D] whitespace-pre-line ${sizeStyles[beat.size].heading}`}>
                  {beat.heading}
                </h2>
                <p className={`font-normal text-[#6B6B6B] ${sizeStyles[beat.size].descriptor}`}>
                  {beat.descriptor}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function IngredientsSectionClient({ items }: { items: SanityItem[] }) {
  const isDesktop = useIsDesktop();
  if (!isDesktop) return <IngredientsMobile items={items} />;
  return <IngredientsDesktop items={items} />;
}