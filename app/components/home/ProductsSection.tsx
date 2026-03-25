import ScrollReveal from './ScrollReveal';
import { Sun, Moon } from 'lucide-react';
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default async function ProductsSection() {
  const query = `*[_type == "product"]{
    name,tagline,image,gradient,atmosphere,whatItIs,whyItWorks,experience
  }`

  const res = await client.fetch(query)

  const products = (res ?? []).map((p: any) => ({
    ...p,
    image: p.image ? urlFor(p.image).width(1200).url() : null,
  }))

  return (
    <section className="relative py-32 lg:py-44 bg-gradient-to-b from-background to-[hsl(var(--surface-1))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

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
                  <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-6">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.tagline}</p>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}