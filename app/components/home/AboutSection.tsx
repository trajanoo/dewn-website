import ScrollReveal from './ScrollReveal';
import { client } from '@/sanity/lib/client'

export default async function AboutSection() {
  const query = `*[_type == "about"][0]{title, body}`
  const data = await client.fetch(query)
  const title = data?.title
  const body = data?.body

  return (
    <section className="py-24 lg:py-36 bg-secondary/50 relative overflow-hidden" id="about">
      <div className="absolute top-0 left-0 right-0 h-[10%] bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="max-w-2xl">
          <ScrollReveal>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">About</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
              {title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              {body.split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}