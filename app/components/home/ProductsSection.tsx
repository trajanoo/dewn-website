import ScrollReveal from './ScrollReveal';
import { Sun, Moon } from 'lucide-react';

const products = [
  {
    name: 'DEWN RISE',
    tagline: 'Morning Stability',
    Icon: Sun,
    image: '../assets/rise_image.jpeg',
    whatItIs: 'A clear protein and fiber formulation designed to establish a gentle nutritional baseline for the day.',
    whyItWorks: 'Engineered to remain stable in high-acid stomach environments.',
    experience: [
      'Crystal-clear.',
      'Dissolves in 15 seconds.',
      'No grit. No haze. No heaviness.',
      'Looks like water. Tastes clean and light.',
    ],
  },
  {
    name: 'DEWN SET',
    tagline: 'Evening Restoration',
    Icon: Moon,
    image: '../assets/set_image.jpeg',
    whatItIs: 'A triple-chelate magnesium and electrolyte formulation designed to support neural and muscular recovery.',
    whyItWorks: 'Fully reacted mineral complexes improve absorption while minimizing digestive irritation.',
    experience: [
      'Clean taste.',
      'Light and easy on the stomach.',
      'No chalky texture. No metallic aftertaste.',
      'Supports mental clarity and steady muscle recovery.',
    ],
  },
];

export default function ProductsSection() {
  return (
<section className="py-24 lg:py-36 min-h-screen">
  <div className="max-w-6xl mx-auto px-4">
    
    {/* Header */}
    <ScrollReveal>
      <div className="max-w-xl mb-8">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4">
          Two Phases. Zero Friction.
        </h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>Digestive tolerance shifts throughout the day.</p>
          <p>Mornings are more sensitive. Later, recovery matters.</p>
          <p>DEWN is built around that shift.</p>
        </div>
      </div>
    </ScrollReveal>

    <div className="grid md:grid-cols-2 gap-4">
      {products.map((product, i) => (
        <ScrollReveal key={product.name} delay={i * 0.1}>
          
          <div className="bg-card border border-border/50 rounded-xl overflow-hidden group">
            
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              
              <div className="flex items-center gap-2 mb-1">
                <product.Icon className="w-4 h-4 text-accent" />
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                  {product.tagline}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl text-foreground mb-3">
                {product.name}
              </h3>
              
              <div className="space-y-3">
                
                <div>
                  <p className="text-[10px] uppercase text-foreground/60 mb-1">
                    What it is
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {product.whatItIs}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-foreground/60 mb-1">
                    Why it works
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {product.whyItWorks}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-foreground/60 mb-1">
                    Experience
                  </p>
                  <ul className="space-y-1">
                    {product.experience.map((line, j) => (
                      <li
                        key={j}
                        className="text-xs text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>
      ))}
    </div>

  </div>
</section>
  );
}