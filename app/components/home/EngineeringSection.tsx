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
    <section className="py-24 lg:py-36 bg-secondary/50 relative" id="science">
      <div className="absolute inset-0 opacity-[0.03]">
        <img
          src="https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/a28434f62_generated_image.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
              Precision is not a goal. <br/>It is a constraint.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.title} delay={i * 0.1}>
              <div className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl p-6 hover:bg-card transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="font-serif text-3xl text-accent/80 group-hover:text-accent transition-colors">
                    {metric.stat}
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground mb-2">{metric.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{metric.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}