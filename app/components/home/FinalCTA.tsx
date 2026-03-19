import ScrollReveal from './ScrollReveal';
import WaitlistForm from './WaitlistForm';

export default function FinalCTA() {
  return (
    <section className="py-24 lg:py-36 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Nutrition without friction.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-white/50 text-lg tracking-wide">
            Clear. Light. Effortless.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <WaitlistForm dark />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}