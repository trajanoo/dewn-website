import ScrollReveal from './ScrollReveal';
import WaitlistForm from './WaitlistForm';
import { client } from '@/sanity/lib/client'

export default async function FinalCTA() {
  const query = `*[_type == "finalCTA"][0]{title,subtitle,buttonLabel}`
  const data = await client.fetch(query)

  const title = data?.title
  const subtitle = data?.subtitle

  return (
    <section id='finalCTA' className="py-24 lg:py-36 bg-[#1E2429] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center ">
        <ScrollReveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            {title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-white/50 text-lg tracking-wide">
            {subtitle}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <WaitlistForm dark instanceId='cta' />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}