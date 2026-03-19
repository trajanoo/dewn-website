import ScrollReveal from './ScrollReveal';

export default function ProblemSection() {
  return (
    <section className="py-24 lg:py-36 bg-[#111111] text-white relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <ScrollReveal>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl 2xl:text-[50px] leading-tight mb-10">
                The body changed. Products didn't.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-3 text-base lg:text-lg text-white/70 leading-relaxed">
                <p>Most nutrition products are built for normal digestion.</p>
                <p>When digestion slows, liquids behave differently in the stomach.</p>
                <p>Textures feel heavier. Sweetness intensifies. Metallic aftertastes linger.</p>
                <p>What once felt routine becomes harder to maintain. Sometimes dramatically. Often quietly.</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual element */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img
                  src="https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/963489c39_generated_image.png"
                  alt="Crystal clear water clarity"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute transition duration-400 hover:scale-110 bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                <p className="text-xs text-white/50 mb-1">Industry Standard</p>
                <p className="text-2xl font-serif text-white">Not built for sensitivity</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}