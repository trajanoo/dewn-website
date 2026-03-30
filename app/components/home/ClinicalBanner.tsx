// components/ClinicalBanner.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { client } from '@/sanity/lib/client'
import ResearchAccessButton from './ResearchAccessButton'

export default async function ClinicalBanner() {
  const query = `*[_type == "clinicalBanner"][0]{overline,title,linkText,linkUrl,pdfUrl}`
  const data = await client.fetch(query)

  return (
    <section className="py-16 lg:py-20 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {data?.overline}
              </p>
              <h3 className="font-serif text-2xl lg:text-3xl text-foreground">
                {data?.title}
              </h3>
            </div>
            <ResearchAccessButton
              linkText={data?.linkText}
              pdfUrl={data?.pdfUrl}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}