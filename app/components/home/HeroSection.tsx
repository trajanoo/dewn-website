import ScrollReveal from './ScrollReveal';
import WaitlistForm from './WaitlistForm';
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default async function HeroSection() {
  const query = `*[_type == "siteSettings"][0]{heroTitle, heroSubtitle, heroImage}`
  const data = await client.fetch(query)

  const title = data?.heroTitle
  const subtitle = data?.heroSubtitle
  const imageUrl = data?.heroImage ? urlFor(data.heroImage).width(1400).url() : '/assets/hero-image.png'
  const imageAlt = data?.heroImage?.alt ?? 'Person holding a crystal-clear glass in morning light'

  return (
    <section className="min-h-screen bg-[#F7F6F4] flex items-center pt-20 lg:pt-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal delay={0.1}>
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl 2xl:text-[70px] leading-tight text-foreground">
                {(() => {
                  if (!title) return null
                  return title.split(/(slowed)/i).map((part, i) =>
                    /^(slowed)$/i.test(part) ? (
                      <span key={i} className="text-[#6A9BA0]">{part}</span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )
                })()}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#77A4A8] to-transparent mt-8 mb-8" />
              <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg">
                {subtitle}
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
                    src={imageUrl}
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