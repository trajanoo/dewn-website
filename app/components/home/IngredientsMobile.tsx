'use client'

import React, {useEffect, useState} from 'react'
import ScrollReveal from './ScrollReveal';
import { Leaf, Droplets, Gem, CircleDot, Sparkles } from 'lucide-react';
import { client } from '@/sanity/lib/client'

const ICONS: Record<string, any> = {
  PHGG: Leaf,
  'Acid-Stable Clear Whey': Droplets,
  'Magnesium Complex': Gem,
  'Electrolyte System': CircleDot,
  'Sensory Balance': Sparkles,
}

export default function IngredientsMobile() {
  const [ingredients, setIngredients] = useState<any[] | null>(null)

  useEffect(() => {
    let mounted = true
    const fetchIngredients = async () => {
      const query = `*[_type == "ingredients"][0]{title,items[]{name,subtitle,desc}}`
      const res = await client.fetch(query)
      if (!mounted) return
      setIngredients(res?.items ?? null)
    }
    fetchIngredients()
    return () => { mounted = false }
  }, [])

  const items = ingredients ?? [
    {},
  ]

  return (
    <section className="py-24 lg:py-36 relative">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">What's Inside</h2>
            <p className="text-base text-muted-foreground">Essential nutrients engineered to remain light, stable, and easy to drink.</p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={item.name ?? i} delay={i * 0.1}>
              <div className="group p-6 rounded-xl border border-border/40 hover:border-border hover:bg-card transition-all duration-300 hover:shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  {React.createElement(ICONS[item.name] ?? Leaf, { className: 'w-5 h-5 text-[#77A4A8]' })}
                </div>
                <h3 className="font-medium text-foreground mb-1">{item.name}</h3>
                <p className="text-xs text-muted-foreground/70 mb-3">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}