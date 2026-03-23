import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import ScrollReveal from '../components/home/ScrollReveal';
import { client } from '@/sanity/lib/client'

export default async function Privacy() {
  const page = await client.fetch(`*[_type == "staticPage" && slug.current == "privacy"][0]{title,intro,body}`)

  const title = page?.title ?? 'Privacy Policy'
  const intro = page?.intro ?? 'DEWN LLC ("DEWN," "we," "us," "our") provides this Privacy Policy...'
  const body = page?.body ?? ''

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 lg:pt-40 lg:pb-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Legal</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-4">{title}</h1>
            <div className="flex gap-6 text-sm text-muted-foreground mb-12">
              <div>
                <span className="text-foreground/70 font-medium">Effective Date:</span> March 2, 2026
              </div>
              <div>
                <span className="text-foreground/70 font-medium">Jurisdiction:</span> United States (Wyoming)
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-8">{intro}</p>
              {body.split('\n\n').map((p: string, i: number) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </div>
  )
}