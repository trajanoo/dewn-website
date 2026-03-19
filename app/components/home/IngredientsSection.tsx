import ScrollReveal from './ScrollReveal';
import { Leaf, Droplets, Gem, CircleDot, Sparkles } from 'lucide-react';

const ingredients = [
  {
    icon: Leaf,
    name: 'PHGG',
    subtitle: 'Low-viscosity soluble fiber',
    desc: 'Prevents the thickening common in fiber drinks',
  },
  {
    icon: Droplets,
    name: 'Acid-Stable Clear Whey',
    subtitle: 'Protein isolate',
    desc: 'Remains dispersed under acidic digestive conditions',
  },
  {
    icon: Gem,
    name: 'Magnesium Complex',
    subtitle: 'L-Threonate · Glycinate · Taurate',
    desc: 'Chelated mineral forms that prevent chalky residue',
  },
  {
    icon: CircleDot,
    name: 'Electrolyte System',
    subtitle: 'Potassium Citrate · Sodium Chloride',
    desc: 'Mineral forms designed for a smoother taste',
  },
  {
    icon: Sparkles,
    name: 'Sensory Balance',
    subtitle: 'Ginger · Glycine · Reb-M · Natural Lemon Flavor',
    desc: 'Calibrated for a clean, neutral finish',
  },
];

export default function IngredientsSection() {
  return (
    <section className="py-24 lg:py-36 relative">
      {/* Decorative element */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">What's Inside</h2>
            <p className="text-base text-muted-foreground">Essential nutrients engineered to remain light, stable, and easy to drink.</p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 0.1}>
              <div className="group p-6 rounded-xl border border-border/40 hover:border-border hover:bg-card transition-all duration-300 hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-medium text-foreground mb-1">{item.name}</h3>
                <p className="text-xs text-muted-foreground/70 mb-3">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}