'use client';

import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, CheckCircle2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface BenefitItem {
  name: string;
  desc: string;
}

interface Column {
  id: 'rise' | 'set';
  title: string;
  subtitle: string;
  tagline: string;
  overline: string;
  image?: string;
  items: BenefitItem[];
}

interface BenefitsData {
  title: string;
  heroImage?: string;
  columns: Column[];
}

// ─── Static fallback data ─────────────────────────────────────────────────────
const FALLBACK_DATA: BenefitsData = {
  title: 'Two Phases. Zero Friction.',
  heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=90',
  columns: [
    {
      id: 'rise',
      title: 'Rise',
      subtitle: 'Morning',
      tagline: 'Stability when the body is most sensitive',
      overline:
        'A clear protein and fiber formulation designed to establish a gentle nutritional baseline for the day.',
      image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=1200&q=85',
      items: [
        { name: 'Muscle preservation', desc: 'Maintains muscle when intake drops' },
        { name: 'Glucose stability', desc: 'Helps maintain energy when intake is low' },
        { name: 'Digestive comfort', desc: 'Reduces heaviness and improves tolerance' },
        { name: 'Nausea relief', desc: 'Easier intake during sensitive states' },
      ],
    },
    {
      id: 'set',
      title: 'Set',
      subtitle: 'Evening',
      tagline: 'Recovery when the body is most receptive',
      overline:
        'A triple-chelate magnesium and electrolyte formulation designed to support neural and muscular recovery.',
      image: 'https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/46b57c36f_generated_image.png',
      items: [
        { name: 'Deep sleep', desc: 'Improves sleep quality during recovery' },
        { name: 'Muscle recovery', desc: 'Restores minerals required for muscle function' },
        { name: 'Neural support', desc: 'Supports nervous system function' },
        { name: 'Hydration support', desc: 'Restores electrolyte balance' },
      ],
    },
  ],
};

// ─── Image config ──────────────────────────────────────────────────────────────
const IMAGES: Record<string, string> = {
  hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=90',
  rise: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=1200&q=85',
  set: 'https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/46b57c36f_generated_image.png',
};

// ─── Theme config — very minimal color difference between RISE / SET ──────────
const THEMES = {
  rise: {
    // Warm white — barely tinted
    bg: 'linear-gradient(160deg, #FAFAF8 0%, #F5F3EE 100%)',
    cardBg: '#FAFAF8',
    accent: '#A07840',
    pillBg: 'rgba(250,248,244,0.92)',
    pillText: '#8C6830',
    pillBorder: 'rgba(160,120,64,0.15)',
    checkColor: '#B08040',
    divider: 'rgba(160,120,64,0.12)',
    Icon: Sun,
    iconColor: '#C09050',
  },
  set: {
    // Cool white — barely tinted, very close to RISE
    bg: 'linear-gradient(160deg, #F8FAFA 0%, #EEF2F3 100%)',
    cardBg: '#F8FAFA',
    accent: '#527880',
    pillBg: 'rgba(244,248,249,0.92)',
    pillText: '#3A6068',
    pillBorder: 'rgba(82,120,128,0.15)',
    checkColor: '#62909A',
    divider: 'rgba(82,120,128,0.12)',
    Icon: Moon,
    iconColor: '#6898A2',
  },
};

// ─── Hook: maps scroll position within element to a 0-1 progress value ────────
function useScrollProgress(ref: React.RefObject<HTMLElement>, total: number) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // Begin revealing when element top enters 70% of viewport,
      // finish only when it's well past — stretched window for slower reveal.
      const raw = (wh * 0.7 - rect.top) / (wh * 1.1);
      const clamped = Math.max(0, Math.min(1, raw));
      setVisible(Math.ceil(clamped * total));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [ref, total]);

  return visible;
}

// ─── Single benefit row ────────────────────────────────────────────────────────
function BenefitRow({
  item,
  visible,
  checkColor,
  delay,
}: {
  item: BenefitItem;
  visible: boolean;
  checkColor: string;
  delay: number;
}) {
  return (
    <div
      className="flex items-start gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      <CheckCircle2
        className="w-3.5 h-3.5 mt-[3px] shrink-0"
        style={{ color: checkColor }}
        strokeWidth={2}
      />
      <div>
        <p className="text-[13px] font-semibold text-neutral-800 mb-0.5 leading-snug">{item.name}</p>
        <p className="text-[12px] text-neutral-400 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

// ─── Desktop: side-by-side — both columns share one scroll tracker ────────────
function DesktopColumns({ columns }: { columns: Column[] }) {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const maxItems = Math.max(...columns.map((c) => c.items.length));
  // Single shared scroll tracker — both sides progress in sync
  const visibleCount = useScrollProgress(sectionRef, maxItems);

  return (
    <div ref={sectionRef} className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
      {columns.map((col) => {
        const theme = THEMES[col.id];
        const Icon = theme.Icon;

        return (
          <div
            key={col.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: theme.bg,
              // Subtle layered shadow for depth — not flat
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
            }}
          >
            {/* Image — clean, no overlay, no gradient */}
            <div className="relative h-56 lg:h-64 overflow-hidden">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-center"
                style={{ display: 'block' }}
              />
              {/* Pill badge only — no gradient overlay on image */}
              <div className="absolute top-4 left-4">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{
                    background: theme.pillBg,
                    border: `1px solid ${theme.pillBorder}`,
                  }}
                >
                  <Icon
                    className="w-3 h-3"
                    style={{ color: theme.iconColor }}
                    strokeWidth={1.75}
                  />
                  <span
                    className="text-[10px] font-medium tracking-[0.18em] uppercase"
                    style={{ color: theme.pillText }}
                  >
                    {col.subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-7 pb-9 pt-6 lg:px-8 lg:pb-10">
              <h3
                className="font-serif text-2xl lg:text-[1.65rem] text-neutral-900 font-normal mb-1 tracking-tight"
              >
                {col.title}
              </h3>
              <p
                className="text-[13px] font-medium mb-5 leading-snug"
                style={{ color: theme.accent }}
              >
                {col.tagline}
              </p>
              <p
                className="text-[13px] text-neutral-400 leading-relaxed pb-5 mb-5"
                style={{ borderBottom: `1px solid ${theme.divider}` }}
              >
                {col.overline}
              </p>

              {/* Synced progressive reveal */}
              <div className="space-y-[14px]">
                {col.items.map((item, j) => (
                  <BenefitRow
                    key={j}
                    item={item}
                    visible={visibleCount > j}
                    checkColor={theme.checkColor}
                    delay={0}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Mobile: stacked, each with its own simple scroll reveal ──────────────────
function MobileColumn({ col }: { col: Column }) {
  const theme = THEMES[col.id];
  const Icon = theme.Icon;

  // Card entrance reveal
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState(false);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCardVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Items reveal — simple scroll hook
  const itemsRef = useRef<HTMLDivElement>(null!);
  const visibleCount = useScrollProgress(itemsRef, col.items.length);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl overflow-hidden"
      style={{
        background: theme.bg,
        boxShadow:
          '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'opacity, transform',
      }}
    >
      {/* Mobile image — tall enough to be clear, no gradients, no cropping issues */}
      <div className="relative w-full overflow-hidden" style={{ height: '240px' }}>
        <img
          src={col.image ?? IMAGES[col.id]}   // ← prioriza Sanity, cai no hardcoded se vazio
          alt={col.title}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%', display: 'block' }}
        />
        {/* Pill badge — clean, no overlay */}
        <div className="absolute top-4 left-4">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm"
            style={{
              background: theme.pillBg,
              border: `1px solid ${theme.pillBorder}`,
            }}
          >
            <Icon className="w-3 h-3" style={{ color: theme.iconColor }} strokeWidth={1.75} />
            <span
              className="text-[10px] font-medium tracking-[0.18em] uppercase"
              style={{ color: theme.pillText }}
            >
              {col.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8 pt-5">
        <h3 className="font-serif text-[1.4rem] text-neutral-900 font-normal mb-1 tracking-tight">
          DEWN {col.title}
        </h3>
        <p
          className="text-[13px] font-medium mb-4 leading-snug"
          style={{ color: theme.accent }}
        >
          {col.tagline}
        </p>
        <p
          className="text-[13px] text-neutral-400 leading-relaxed pb-4 mb-4"
          style={{ borderBottom: `1px solid ${theme.divider}` }}
        >
          {col.overline}
        </p>
        <div ref={itemsRef} className="space-y-[14px]">
          {col.items.map((item, j) => (
            <BenefitRow
              key={j}
              item={item}
              visible={visibleCount > j}
              checkColor={theme.checkColor}
              delay={j * 120}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section header with simple entrance ─────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-10 lg:mb-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'opacity, transform',
      }}
    >
      <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-400 mb-3 font-medium">
        The System
      </p>
      <h2 className="font-serif text-4xl sm:text-5xl lg:text-[2.9rem] text-neutral-900 leading-[1.12] font-normal tracking-tight">
        {title}
      </h2>
    </div>
  );
}

// ─── Hero image with simple entrance ─────────────────────────────────────────
// ─── Hero image ────────────────────────────────────────────────────────────────
function HeroImage({ src }: { src?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="hidden md:block w-full mb-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'opacity, transform',
      }}
    >
      <img
        src={src ?? IMAGES.hero}   // ← fallback para o hardcoded se vier vazio
        alt="DEWN — nutrition for slowed digestion"
        className="w-full object-cover object-center"
        style={{ height: 'clamp(280px, 38vw, 400px)', display: 'block' }}
      />
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function BenefitsSection({ data }: { data?: BenefitsData | null }) {
  const resolvedData = data ?? FALLBACK_DATA
  const { title, columns, heroImage } = resolvedData;

  return (
    <section
      id="benefits"
      className="relative overflow-hidden pt-28 lg:pt-40 pb-28 lg:pb-40"
      style={{
        // Subtle background depth — not flat white
        background: 'linear-gradient(180deg, #FEFEFE 0%, #F7F6F3 40%, #F4F3F0 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: '18%',
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 10,
        }}
      />
      {/* Very faint noise texture for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.018,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Header — constrained */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader title={title} />
      </div>

      {/* Full-width hero image — desktop only, clean, no overlays */}
      <HeroImage src={heroImage} />

      {/* Columns — back inside container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Desktop: side-by-side with synced scroll reveal */}
        <DesktopColumns columns={columns} />

        {/* Mobile: stacked sections */}
        <div className="md:hidden space-y-6">
          {columns.map((col) => (
            <MobileColumn key={col.id} col={col} />
          ))}
        </div>
      </div>
    </section>
  );
}
