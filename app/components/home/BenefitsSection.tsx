import ScrollReveal from './ScrollReveal';
import { Sun, Moon, CheckCircle2 } from 'lucide-react';

const columns = [
  {
    title: 'RISE',
    subtitle: 'Morning',
    Icon: Sun,
    overline: 'Supports stability when the body is most sensitive',
    items: [
      { name: 'Muscle preservation', desc: 'Maintains muscle when intake drops' },
      { name: 'Glucose stability', desc: 'Helps maintain energy when intake is low' },
      { name: 'Digestive comfort', desc: 'Reduces heaviness and improves tolerance' },
      { name: 'Nausea relief', desc: 'Easier intake during sensitive states' },
    ],
  },
  {
    title: 'SET',
    subtitle: 'Evening',
    Icon: Moon,
    overline: 'Supports recovery when the body is most receptive',
    items: [
      { name: 'Deep sleep', desc: 'Improves sleep quality and restorative rest' },
      { name: 'Neural recovery', desc: 'Supports cognitive function and mental clarity' },
      { name: 'Muscle recovery', desc: 'Reduces cramping and supports steady repair' },
      { name: 'Electrolyte balance', desc: 'Restores key minerals lost during the day' },
    ],
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 lg:py-36 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">Benefits</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {columns.map((col, i) => (
            <ScrollReveal key={col.title} delay={i * 0.15}>
              <div className="bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl p-8 lg:p-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <col.Icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{col.subtitle}</span>
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">{col.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed pb-6 border-b border-border/50">{col.overline}</p>
                <div className="space-y-5">
                  {col.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent/60 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}