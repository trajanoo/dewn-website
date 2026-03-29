'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'What is DEWN?',
    a: "DEWN is a premium nutrition system designed for people with slowed or sensitive digestion. It delivers protein, fiber, and essential minerals in a clear, light format that's easy on the stomach.",
  },
  {
    q: 'Who is DEWN for?',
    a: "DEWN is for anyone whose digestion has changed — whether from age, medication, treatment, or chronic conditions — and who finds that conventional supplements and nutrition products are difficult to tolerate.",
  },
  {
    q: 'What makes DEWN different from other supplements?',
    a: "DEWN is engineered from the ground up for digestive comfort. Every aspect — particle size, pH, dissolution rate, flavor profile — is optimized to reduce the burden on your body. It's not a regular supplement with gentler marketing. It's a fundamentally different approach.",
  },
  {
    q: 'What are the two products?',
    a: 'DEWN RISE is a morning formulation with gentle protein and electrolytes for daily stability. DEWN SET is an evening formulation with prebiotic fiber and magnesium for overnight restoration.',
  },
  {
    q: 'Is DEWN a meal replacement?',
    a: 'No. DEWN is a nutritional supplement designed to complement your diet — not replace meals. It fills specific gaps in protein, fiber, and mineral intake that are common with digestive changes.',
  },
  {
    q: 'Does it have a taste or texture?',
    a: "DEWN is designed to be sensorially neutral. It dissolves completely clear in water with no grit, no sweetness, and no metallic aftertaste. It's as close to water as functional nutrition can get.",
  },
  {
    q: 'When will DEWN be available?',
    a: 'DEWN is currently in pre-launch. Join the waitlist to be among the first to access it when we launch.',
  },
  {
    q: 'Is DEWN backed by research?',
    a: 'Yes. Every ingredient and formulation decision in DEWN is grounded in published clinical research. Visit our Clinical Rationale page for detailed references.',
  },
];

// ─── Reveal hook ──────────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Single FAQ item ──────────────────────────────────────────────────────────
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  revealed,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  revealed: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Measure content height for smooth expand
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      setHeight(el.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms`,
        willChange: 'opacity, transform',
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: '14px',
          border: isOpen
            ? '1px solid rgba(0,0,0,0.08)'
            : '1px solid rgba(0,0,0,0.06)',
          background: isOpen
            ? 'rgba(255,255,255,0)'
            : hovered
            ? 'rgba(250,249,246,0.7)'
            : 'rgba(255,255,255,0)',
          // Subtle lift on hover/open
          boxShadow: isOpen
            ? '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)'
            : hovered
            ? '0 2px 8px rgba(0,0,0,0.05)'
            : 'none',
          transform: hovered && !isOpen ? 'translateY(-1px)' : 'translateY(0)',
          transition:
            'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.25s ease',
        }}
      >
        {/* Trigger */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
          style={{ cursor: 'pointer', background: 'none', border: 'none' }}
          aria-expanded={isOpen}
        >
          <span
            className="text-[14px] font-medium leading-snug"
            style={{ color: isOpen ? '#1a1a1a' : '#2d2d2d' }}
          >
            {faq.q}
          </span>
          <span
            className="shrink-0 flex items-center justify-center"
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.1)',
              background: isOpen ? '#1a1a1a' : 'transparent',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              flexShrink: 0,
            }}
          >
            <Plus
              style={{
                width: '11px',
                height: '11px',
                color: isOpen ? '#fff' : '#555',
                transition: 'color 0.3s ease',
              }}
              strokeWidth={2.5}
            />
          </span>
        </button>

        {/* Expandable content — height-based for smooth animation */}
        <div
          style={{
            height: `${height}px`,
            overflow: 'hidden',
            transition: 'height 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div ref={contentRef}>
            <p
              className="px-6 pb-5 text-[13.5px] leading-[1.75]"
              style={{ color: '#6b6b6b' }}
            >
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const header = useReveal(0.2);
  const list = useReveal(0.05);

  return (
    <section
      id="faq"
      className="py-24 lg:py-36"
      style={{ background: '#fff' }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header — centered on mobile, left on desktop */}
        <div
          ref={header.ref}
          className="mb-14 text-center md:text-left"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
            willChange: 'opacity, transform',
          }}
        >
          <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-400 mb-3 font-medium">
            FAQ
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-neutral-900 font-normal tracking-tight">
            Questions
          </h2>
        </div>

        {/* FAQ list */}
        <div
          ref={list.ref}
          className="space-y-2"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              revealed={list.visible}
            />
          ))}
        </div>

      </div>
    </section>
  );
}