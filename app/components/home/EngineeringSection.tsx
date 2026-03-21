import ScrollReveal from './ScrollReveal';

const metrics = [
  { 
    title: 'The Zero-Grit Standard', 
    desc: 'Every batch passes through a 40-mesh stainless steel sieve to eliminate particles larger than 0.5 mm.',
    stat: '< 0.5mm'
  },
  { 
    title: 'Chelate Integrity', 
    desc: '98% verified chelation (HPLC), ensuring stable mineral complexes.',
    stat: '98%'
  },
  { 
    title: 'Verified Clarity', 
    desc: 'Prepared solutions remain below 5 NTU turbidity, maintaining water-like clarity.',
    stat: '< 5 NTU'
  },
  { 
    title: 'Rapid Dispersion', 
    desc: 'Cold-water dissolve time ≤15 seconds.',
    stat: '≤ 15s'
  },
  { 
    title: 'pH Alignment (RISE)', 
    desc: 'Optimized to remain stable in acidic digestive environments (pH 3.45–3.55).',
    stat: '3.45–3.55'
  },
  { 
    title: 'Dose Reliability', 
    desc: 'Precision filling within ±2% weight tolerance ensures consistent dosing.',
    stat: '±2%'
  },
];

export default function EngineeringSection() {
  return (
    <section className="py-32 lg:py-44 bg-gradient-to-b from-[#ebe7e0] to-[#f5f2ed] relative overflow-hidden" id="science">
      {/* Lab image background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img
          src="https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/a28434f62_generated_image.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 mb-6 font-medium">Engineering</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-foreground leading-[1.15] mb-6">
              Precision is not a goal.<br />It is a constraint.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.title} delay={i * 0.08}>
              <div className="bg-card/70 backdrop-blur-sm border border-border/50 hover:border-border rounded-2xl p-8 hover:bg-card transition-all duration-300 hover:shadow-lg group">
                <div className="mb-6">
                  <div className="font-serif text-[#6A9BA0] text-4xl font-bold group-hover:scale-105 transition-transform inline-block">
                    {metric.stat}
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground mb-3">{metric.title}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{metric.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}