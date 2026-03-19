import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section className="py-24 lg:py-36 bg-secondary/50" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl">
          <ScrollReveal>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">About</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
              Quiet by Design
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                DEWN was created for people whose digestion has changed — whether from age, medication, treatment, or chronic conditions — and who found that existing products were no longer comfortable to consume.
              </p>
              <p>
                We don't add flavors to mask problems. We don't use textures that require tolerance. We engineer nutrition that the body can accept without negotiation.
              </p>
              <p>
                Every decision — from particle size to pH to dissolution rate — is made with one principle: reduce the burden on the body.
              </p>
              <p>
                DEWN is not loud. It is not bold. It is nutrition that gets out of the way.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}