import ScrollReveal from './ScrollReveal';
import WaitlistForm from './WaitlistForm';
import { client } from '@/sanity/lib/client'

export default async function FinalCTA() {
  const query = `*[_type == "finalCTA"][0]{title,subtitle,buttonLabel}`
  const data = await client.fetch(query)

  const title = data?.title
  const subtitle = data?.subtitle
  const edge = 'clamp(120px, 32vh, 420px)'

const sectionBg = `
  linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0)) top,
  linear-gradient(to top, rgba(255,255,255,0.8), rgba(255,255,255,0)) bottom,
  #dbdbdb
`
  return (
    <section id='finalCTA' className="py-24 lg:py-36 text-black"
      style={{
  background: sectionBg,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `100% ${edge}, 100% ${edge}, 100% 100%`
}}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center ">
        <ScrollReveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-black leading-tight">
            {title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-black/50 text-lg tracking-wide">
            {subtitle}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <WaitlistForm instanceId='cta' />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}