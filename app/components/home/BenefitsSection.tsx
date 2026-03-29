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
  items: BenefitItem[];
}

interface BenefitsData {
  title: string;
  columns: Column[];
}

// ─── Static fallback data (replace with Sanity fetch in server component) ─────
const FALLBACK_DATA: BenefitsData = {
  title: 'Two Phases. Zero Friction.',
  columns: [
    {
      id: 'rise',
      title: 'Rise',
      subtitle: 'Morning',
      tagline: 'Stability when the body is most sensitive',
      overline:
        'A clear protein and fiber formulation designed to establish a gentle nutritional baseline for the day.',
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
  // Full-width hero image shown only on desktop, above the two columns
  hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=90',
  rise: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=1200&q=85',
  set:  'https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/46b57c36f_generated_image.png',
};

// ─── Theme config ──────────────────────────────────────────────────────────────
const THEMES = {
  rise: {
    bg: '#FFFDF7',
    accent: '#B07D3A',
    pill: 'bg-amber-50/90 text-amber-800 border-amber-100',
    check: 'text-amber-400',
    divider: 'border-amber-100',
    Icon: Sun,
  },
  set: {
    bg: '#F4F6F9',
    accent: '#5A8A90',
    pill: 'bg-slate-50/90 text-slate-600 border-slate-200',
    check: 'text-[#6A9BA0]',
    divider: 'border-slate-200',
    Icon: Moon,
  },
};

// ─── Hook: scroll progress → visible item count ───────────────────────────────
function useScrollProgress(ref: React.RefObject<HTMLElement>, total: number) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // starts revealing when element top enters viewport, finishes before bottom leaves
      const raw = (wh - rect.top) / (wh * 0.8);
      const clamped = Math.max(0, Math.min(1, raw));
      setVisible(Math.ceil(clamped * total));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [ref, total]);

  return visible;
}

// ─── Single benefit row with fade-slide animation ─────────────────────────────
function BenefitRow({
  item,
  visible,
  checkClass,
  delay,
}: {
  item: BenefitItem;
  visible: boolean;
  checkClass: string;
  delay: number;
}) {
  return (
    <div
      className="flex items-start gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
    >
      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${checkClass}`} />
      <div>
        <p className="text-sm font-semibold text-foreground mb-0.5">{item.name}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

// ─── Desktop: side-by-side with synced scroll reveal ─────────────────────────
function DesktopColumns({ columns }: { columns: Column[] }) {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const maxItems = Math.max(...columns.map((c) => c.items.length));
  const visibleCount = useScrollProgress(sectionRef, maxItems);

  return (
    <div ref={sectionRef} className="hidden md:grid md:grid-cols-2 gap-8 mt-16">
      {columns.map((col) => {
        const theme = THEMES[col.id];
        const Icon = theme.Icon;

        return (
          <div
            key={col.id}
            className="rounded-3xl overflow-hidden border border-black/[0.04] shadow-xl"
            style={{ background: theme.bg }}
          >
            {/* Image — clean, no gradient overlays */}
            <div className="relative h-64 lg:h-72 overflow-hidden">
              <img
                src={IMAGES[col.id]}
                alt={col.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-5 left-5">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border ${theme.pill}`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="text-[10px] font-medium tracking-[0.18em] uppercase">
                    {col.subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-10 pt-6 lg:px-10 lg:pb-12">
              <h3 className="font-serif text-2xl lg:text-3xl text-foreground font-normal mb-1">
                {col.title}
              </h3>
              <p className="text-sm font-medium mb-5" style={{ color: theme.accent }}>
                {col.tagline}
              </p>
              <p
                className={`text-sm text-muted-foreground leading-relaxed pb-6 mb-6 border-b ${theme.divider}`}
              >
                {col.overline}
              </p>

              {/* Synced progressive reveal — both columns share visibleCount */}
              <div className="space-y-4">
                {col.items.map((item, j) => (
                  <BenefitRow
                    key={j}
                    item={item}
                    visible={visibleCount > j}
                    checkClass={theme.check}
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

// ─── Mobile: stacked sections, individual scroll reveal ───────────────────────
function MobileColumn({ col }: { col: Column }) {
  const theme = THEMES[col.id];
  const Icon = theme.Icon;
  const ref = useRef<HTMLDivElement>(null!);
  const visible = useScrollProgress(ref, col.items.length);

  return (
    <div
      ref={ref}
      className="rounded-3xl overflow-hidden border border-black/[0.04]"
      style={{ background: theme.bg }}
    >
      {/* Mobile image — tall, clean crop, no overlays */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={IMAGES[col.id]}
          alt={col.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-4 left-4">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border ${theme.pill}`}
          >
            <Icon className="w-3 h-3" />
            <span className="text-[10px] font-medium tracking-[0.18em] uppercase">
              {col.subtitle}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 pt-6">
        <h3 className="font-serif text-2xl text-foreground font-normal mb-1">{col.title}</h3>
        <p className="text-sm font-medium mb-4" style={{ color: theme.accent }}>
          {col.tagline}
        </p>
        <p
          className={`text-sm text-muted-foreground leading-relaxed pb-5 mb-5 border-b ${theme.divider}`}
        >
          {col.overline}
        </p>
        <div className="space-y-4">
          {col.items.map((item, j) => (
            <BenefitRow
              key={j}
              item={item}
              visible={visible > j}
              checkClass={theme.check}
              delay={j * 60}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function BenefitsSection({ data = FALLBACK_DATA }: { data?: BenefitsData }) {
  const { title, columns } = data;

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white relative overflow-hidden pt-32 lg:pt-44 pb-32 lg:pb-44" id="benefits">

      {/* Header — constrained */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mb-12 lg:mb-16 transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 mb-4 font-medium">
            The System
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3rem] text-foreground leading-[1.15] font-normal">
            {title}
          </h2>
        </div>
      </div>

      {/* Full-width image — desktop only, breaks out of container */}
      <div className="hidden md:block w-full mb-12">
        <img
          src={IMAGES.hero}
          alt="DEWN — nutrition for slowed digestion"
          className="w-full  lg:h-[560px] object-cover object-center"
        />
      </div>

      {/* Columns + mobile — back inside container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Desktop: side-by-side columns */}
        <DesktopColumns columns={columns} />

        {/* Mobile layout */}
        <div className="md:hidden space-y-8">
          {columns.map((col) => (
            <MobileColumn key={col.id} col={col} />
          ))}
        </div>

      </div>
    </section>
  );
}

/*
──────────────────────────────────────────────────────────────
  SERVER COMPONENT WRAPPER (when using Sanity)
──────────────────────────────────────────────────────────────
  Move the Sanity fetch here and pass data as prop:

  import { client } from '@/sanity/lib/client'
  import BenefitsSection from './BenefitsSection'

  const query = `*[_type == "benefits"][0]{
    title,
    columns[]{ id, title, subtitle, tagline, overline, items[]{name, desc} }
  }`

  export default async function BenefitsSectionServer() {
    const data = await client.fetch(query)
    return <BenefitsSection data={data} />
  }
──────────────────────────────────────────────────────────────
*/