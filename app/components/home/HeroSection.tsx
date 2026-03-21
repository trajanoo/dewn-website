import ScrollReveal from './ScrollReveal';
import WaitlistForm from './WaitlistForm';


export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-20 lg:pt-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal delay={0.1}>
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight text-foreground">
                Nutrition for<br />slowed digestion
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Clear, light nutrition delivering protein, fiber, and essential minerals. Designed to be easy on the stomach.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-8" id="waitlist">
                <WaitlistForm instanceId='hero' />
                <p className="md:block text-white mt-3 text-xs md:text-muted-foreground tracking-wide">Launching soon.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="order-1 lg:order-2 relative">
            <ScrollReveal delay={0.2} direction="right">
              <div className="relative">

                <div className="hidden lg:block absolute transition duration-400 hover:scale-105 top-4 right-10 2xl:right-1 z-10 bg-white/90 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 shadow-sm">
                  <span className="text-xs font-medium tracking-wide text-foreground">Engineered for Sensitivity</span>
                </div>
                
                <div className="aspect-[3/4] max-h-[70vh] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={'/assets/hero-image.png'}
                    alt="Person holding a crystal-clear glass in morning light"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}