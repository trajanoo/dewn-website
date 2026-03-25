'use client';
import ScrollReveal from './ScrollReveal';
import { Sun, Moon, CheckCircle2 } from 'lucide-react';
import { client } from '@/sanity/lib/client'
import { useEffect, useState } from 'react';


const fallbackImages: Record<string, { src: string; alt: string }> = {
  rise: { src: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=900&q=80', alt: 'DEWN RISE' },
  set: { src: 'https://media.base44.com/images/public/69bb2e760f85bc431ed88f86/46b57c36f_generated_image.png', alt: 'DEWN SET' },
}

const atmospheres: Record<string, any> = {
  rise: {
    bg: 'from-[#FFFDF7] to-[#F5F0E8]',
    imageTint: 'bg-amber-50/30',
    accent: 'text-amber-700/70',
    iconColor: 'text-amber-600',
    overlineBorder: 'border-amber-100',
    fadeColor: '#F5F0E8',
    Icon: Sun,
  },
  set: {
    bg: 'from-[#F4F6F9] to-[#EBF0F5]',
    imageTint: 'bg-slate-400/10',
    accent: 'text-slate-500/70',
    iconColor: 'text-[#6A9BA0]',
    overlineBorder: 'border-slate-200',
    fadeColor: '#EBF0F5',
    Icon: Moon,
  },
}


const query = `*[_type == "benefits"][0]{
  title,
  columns[]{
    id,
    title,
    subtitle,
    tagline,
    overline,
    items[]{name, desc}
  }
}`

export default function BenefitsSection() {
  
  const [title, setTitle] = useState('')
  const [columnsSanity, setColumnsSanity] = useState<any[]>([])

  useEffect(() => {
    client.fetch(query).then((data) => {
      setTitle(data?.title ?? '')
      setColumnsSanity(data?.columns ?? [])
    })
  }, [])

  if (!columnsSanity || columnsSanity.length === 0) {
  return null
}

  return (
    <section className="py-32 lg:py-44 bg-white relative overflow-hidden" id="benefits">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <ScrollReveal>
          <div className="mb-16 lg:mb-20">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 mb-4 font-medium">The System</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3rem] text-foreground leading-[1.15] font-normal">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {columnsSanity.map((col: any, i: number) => {
            if(!col) return null
            
const image = fallbackImages[col.id] ?? fallbackImages.rise


            const atm = atmospheres[col.id] ?? atmospheres.rise
            const Icon = atm.Icon

            return (
              <ScrollReveal key={col.id} delay={i * 0.12}>
                <div className={`bg-gradient-to-b ${atm.bg} rounded-3xl overflow-hidden border border-black/[0.04]`}>

                  <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${atm.imageTint}`} />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-24"
                      style={{ background: `linear-gradient(to bottom, transparent, ${atm.fadeColor})` }}
                    />
                    <div className="absolute top-5 left-5">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/70 border border-white/50">
                        <Icon className={`w-3 h-3 ${atm.iconColor}`} />
                        <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-foreground/70">
                          {col.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 pb-10 pt-2 lg:px-10 lg:pb-12">
                    <h3 className="font-serif text-2xl lg:text-3xl text-foreground font-normal mb-1">{col.title}</h3>
                    <p className={`text-sm font-medium mb-5 ${atm.accent}`}>{col.tagline}</p>
                    <p className={`text-sm text-muted-foreground leading-relaxed pb-6 mb-6 border-b ${atm.overlineBorder}`}>
                      {col.overline}
                    </p>
                    <div className="space-y-4">
                      {col.items?.map((item: any, j: number) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-3.5 h-3.5 text-foreground/20 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground mb-0.5">{item.name}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  );
}