'use client';

import { useEffect, useRef, useState } from 'react';

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

interface Props {
  title: string;
  body: string;
}

export default function AboutSectionClient({ title, body }: Props) {
  const header = useReveal(0.2);
  const text = useReveal(0.1);

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 lg:py-40"

    >
      {/* Faint noise texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.82\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.022,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Top fade from white */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0"
        style={{
          height: '15%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* Bottom fade to white */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: '15%',
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* Warm focal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          top: '-120px',
          right: '-180px',
          background: 'radial-gradient(circle, rgba(190,170,130,0.07) 0%, rgba(190,170,130,0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
        <div className="max-w-2xl">

          <div
            ref={header.ref}
            style={{
              opacity: header.visible ? 1 : 0,
              transform: header.visible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
              willChange: 'opacity, transform',
            }}
          >
            <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-400 mb-3 font-medium">
              About
            </p>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-[2.75rem] text-neutral-900 leading-[1.15] mb-10 tracking-tight">
              {title}
            </h2>
          </div>

          <div
            ref={text.ref}
            style={{
              opacity: text.visible ? 1 : 0,
              transform: text.visible ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 150ms, transform 1s cubic-bezier(0.22,1,0.36,1) 150ms',
              willChange: 'opacity, transform',
            }}
          >
            <div className="space-y-5 text-[15px] text-neutral-500 leading-[1.75]">
              {body.split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}