import ScrollReveal from './ScrollReveal';
import { client } from '@/sanity/lib/client'

export default async function EngineeringSection() {
  const query = `*[_type == "engineering"][0]{overline,title,metrics[]{title,desc,stat}}`
  const data = await client.fetch(query)
  const overline = data?.overline ?? 'Engineering'
  const title = data?.title ?? 'Precision is not a goal.\nIt is a constraint.'
  const metrics = data?.metrics

  return (
    <section className="py-32 lg:py-44 bg-[#ede9e2] relative overflow-hidden" id="science">
      <div className="absolute top-0 left-0 right-0 h-[8%] bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none z-10" />

      <div className="absolute inset-0 opacity-[0.03]">
        <img
          src="https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/a28434f62_generated_image.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 mb-6 font-medium">{overline}</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3rem] text-foreground leading-[1.15] mb-6">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((metric: any, i: number) => (
            <ScrollReveal key={metric.title ?? i} delay={i * 0.08}>
              <div className="bg-card/70 backdrop-blur-sm border border-border/50 hover:border-border rounded-2xl p-8 hover:bg-card transition-all duration-300 hover:shadow-lg group">
                <div className="mb-6">
                  <div className="font-sans text-[#6A9BA0] text-4xl font-bold group-hover:scale-105 transition-transform inline-block">
                    {metric.stat}
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground mb-3">{metric.title}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{metric.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}