'use client'

import React, {useEffect, useState} from 'react'
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default function ProductsSection() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{name,tagline,image,gradient,atmosphere,whatItIs,whyItWorks,experience}`
      const res = await client.fetch(query)
      if (!mounted) return
      const mapped = (res ?? []).map((p: any) => ({
        ...p,
        image: p.image ? urlFor(p.image).width(1200).url() : null,
      }))
      setProducts(mapped)
    }
    fetchProducts()
    return () => { mounted = false }
  }, [])

  return (
    <section className="relative py-32 lg:py-44 bg-gradient-to-b from-background to-[hsl(var(--surface-1))]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-8 tracking-tight leading-[1.1]">
              Two Phases.<br />
              <span className="text-foreground/50 font-bold">Zero Friction.</span>
            </h2>
            <div className="text-lg text-foreground/60 leading-[1.8] space-y-6 font-light">
              <p>Digestive tolerance shifts throughout the day.</p>
              <p>Mornings often begin with higher sensitivity. Later in the day, minerals and electrolytes support restoration and recovery.</p>
              <p className="text-foreground/80">DEWN is built around that shift.</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-24 lg:space-y-32 mt-20">
          {products.map((product, i) => (
            <ScrollReveal key={product.name ?? i} delay={i * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${i === 1 ? 'lg:flex-row-reverse' : ''}`}
              >

                <div className={`relative ${i === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br ${product.gradient ?? 'from-amber-50/80 via-orange-50/60 to-yellow-50/40'} shadow-2xl shadow-primary/5 border border-border/40`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/30 mix-blend-overlay" />
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      />
                    ) : null}
                  </div>

                  <div className="absolute -bottom-4 left-6 bg-card/95 backdrop-blur-sm border border-border/60 rounded-full px-5 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground tracking-wide">{product.atmosphere}</span>
                    </div>
                  </div>
                </div>

                <div className={i === 1 ? 'lg:order-1' : ''}>
                  <div className="mb-3">
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground/70">{product.tagline}</span>
                  </div>
                  <h3 className="font-serif text-3xl lg:text-4xl text-foreground mb-8 tracking-tight">{product.name}</h3>
                  
                  <div className="space-y-7">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/60 mb-3">What it is</p>
                      <p className="text-base text-foreground/70 leading-relaxed font-light">{product.whatItIs}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/60 mb-3">Why it works</p>
                      <p className="text-base text-foreground/70 leading-relaxed font-light">{product.whyItWorks}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/60 mb-4">Experience</p>
                      <ul className="space-y-3">
                        {product.experience?.map((line: string, j: number) => (
                          <li key={j} className="text-base text-foreground/70 leading-relaxed flex items-start gap-3 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}