import ScrollReveal from './ScrollReveal';
import { client } from '@/sanity/lib/client'

export default async function ProblemSection() {
  const query = `*[_type == "problem"][0]{title,paragraphs[],image,statTitle,statValue}`
  const data = await client.fetch(query)

  const title = data?.title
  const paragraphs = data?.paragraphs

  const image = data?.image
  const statTitle = data?.statTitle
  const statValue = data?.statValue

  const edge = 'clamp(120px, 32vh, 420px)'
  const sectionBg = `linear-gradient(180deg, #F7F6F4 0px, #e2e2e2 ${edge}, #dbdbdb
 calc(100% - ${edge}), #f0ede8 100%)`

  return (
    <section
      className="py-24 lg:py-36 text-foreground relative overflow-hidden"
      style={{ background: sectionBg }}
    >

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <ScrollReveal>
              <h2 className="font-serif  font-bold text-3xl sm:text-4xl lg:text-4xl 2xl:text-[40px] leading-tight mb-10">{title}</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-3 text-base lg:text-lg text-muted-foreground leading-relaxed">
                {paragraphs.map((p: string, i: number) => (<p key={i}>{p}</p>))}
              </div>
            </ScrollReveal>
          </div>

          {/* Visual element */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="relative">
              <div className="aspect-square shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1)] max-w-md mx-auto rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img
                  src="https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/963489c39_generated_image.png"
                  alt="Crystal clear water clarity"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}