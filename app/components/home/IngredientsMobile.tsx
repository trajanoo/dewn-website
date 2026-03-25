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

export default async function IngredientsMobile() {
  const query = `*[_type == "ingredients"][0]{items[]{name,subtitle,desc}}`
  const res = await client.fetch(query)

  const items = res?.items ?? []

  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <ScrollReveal>
          <h2 className="font-serif text-4xl text-foreground mb-6">What's Inside</h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, i: number) => {
            const Icon = ICONS[item.name] ?? Leaf

            return (
              <ScrollReveal key={item.name ?? i}>
                <div className="p-6 border rounded-xl">
                  <Icon className="w-5 h-5 mb-3" />
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}