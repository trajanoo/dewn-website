import ScrollReveal from './ScrollReveal';
import { client } from '@/sanity/lib/client'

export default async function EngineeringSection() {
  const query = `*[_type == "engineering"][0]{overline,title,metrics[]{title,desc,stat}}`
  const data = await client.fetch(query)
  const overline = data?.overline ?? 'Engineering'
  const title = data?.title ?? 'Precision is not a goal.\nIt is a constraint.'
  const metrics = data?.metrics

  const edge = 'clamp(120px, 32vh, 420px)'
  const sectionBg = `linear-gradient(180deg, #ede9e2 0px, #ede9e2 calc(100% - ${edge}), #FAFAFA 100%)`

  return (
    <section
      className="py-32 lg:py-44 relative overflow-hidden"
      id="science"
      style={{ background: sectionBg }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")' }}
      />

      <div className="absolute inset-0 opacity-[0.025]">
        <img
          src="https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/a28434f62_generated_image.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <p className="text-xs tracking-[0.25em] uppercase text-foreground/40 mb-6 font-medium">
              {overline}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3rem] text-foreground leading-[1.15]">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-foreground/[0.08]">
          {metrics.map((metric: any, i: number) => (
            <ScrollReveal key={metric.title ?? i} delay={i * 0.08}>
              <div className="p-8 lg:p-10 h-full flex flex-col gap-5 group hover:bg-black/[0.025] transition-colors duration-300">

                <div className="font-sans text-[#5a8a90] text-3xl lg:text-4xl font-bold tabular-nums">
                  {metric.stat}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-sm font-semibold text-foreground/90 leading-snug">
                    {metric.title}
                  </p>
                  <p className="text-xs text-foreground/55 leading-relaxed font-light">
                    {metric.desc}
                  </p>
                </div>

                <div className="w-6 h-px bg-[#5a8a90]/30 group-hover:w-10 transition-all duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}