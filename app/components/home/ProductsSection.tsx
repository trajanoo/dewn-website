import ScrollReveal from './ScrollReveal';
import { Sun, Moon } from 'lucide-react';
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default async function ProductsSection() {
  const query = `*[_type == "product"]{
    name,tagline,image,gradient,atmosphere,whatItIs,whyItWorks,experience
  }`

  const res = await client.fetch(query)
  console.log('Produtos do Sanity:', res?.map((p: any) => p.name))
  const products = (res ?? []).map((p: any) => ({
    ...p,
    image: p.image ? urlFor(p.image).width(1200).url() : null,
  })).sort((a: any, b: any) => {
    const order = ['rise', 'set'];
    const indexA = order.findIndex(name => a.name?.toLowerCase() === name);
    const indexB = order.findIndex(name => b.name?.toLowerCase() === name);
    return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
  });

  // Topo = #f0ede8 contínuo com o fim de Problem; só o rodapé mistura até Engineering
  const edge = 'clamp(120px, 32vh, 420px)'
  const sectionBg = `linear-gradient(180deg, #f0ede8 0px, #f0ede8 calc(100% - ${edge}), #ede9e2 100%)`

  return (
    <section
      className="relative overflow-hidden py-32 lg:py-44"
      style={{ background: sectionBg }}
    >

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">

        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-8 tracking-tight leading-[1.1]">
              Two Phases.<br />
              <span className="text-foreground/50 font-bold">Zero Friction.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-24 lg:space-y-32 mt-20">
          {products.map((product: any, i: number) => (
            <ScrollReveal key={product.name ?? i} delay={i * 0.1}>
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${i === 1 ? 'lg:flex-row-reverse' : ''}`}>

                <div className={`relative ${i === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${product.gradient ?? 'from-amber-50/80 via-orange-50/60 to-yellow-50/40'}`}>
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>

                <div className={i === 1 ? 'lg:order-1' : ''}>
                  <div className="mb-3">
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground/70">
                      {product.tagline}
                    </span>
                  </div>

                  <div className="mb-8 w-36">
                    {product.name?.toLowerCase() === 'rise' ? (
                      <img
                        src="/assets/Copy of Rise Text.svg"
                        alt="RISE"
                        className="w-full h-auto"
                      />
                    ) : product.name?.toLowerCase() === 'set' ? (
                      <img
                        src="/assets/Copy of Set Text.svg"
                        alt="SET"
                        className="w-full h-auto"
                      />
                    ) : (
                      <h3 className="font-serif text-3xl lg:text-4xl text-foreground tracking-tight">
                        {product.name}
                      </h3>
                    )}
                  </div>

                  <div className="space-y-7">

                    {product.whatItIs && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-foreground/60 mb-3">
                          What it is
                        </p>
                        <p className="text-base text-foreground/70 leading-relaxed font-light">
                          {product.whatItIs}
                        </p>
                      </div>
                    )}

                    {product.whyItWorks && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-foreground/60 mb-3">
                          Why it works
                        </p>
                        <p className="text-base text-foreground/70 leading-relaxed font-light">
                          {product.whyItWorks}
                        </p>
                      </div>
                    )}

                    {product.experience?.length > 0 && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-foreground/60 mb-4">
                          Experience
                        </p>
                        <ul className="space-y-3">
                          {product.experience.map((line: string, j: number) => (
                            <li
                              key={j}
                              className="text-base text-foreground/70 leading-relaxed flex items-start gap-3 font-light"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}