import { client } from '@/sanity/lib/client'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import ScienceClient from './ScienceClient'

const HARDCODED_NUMBERS = [4, 9, 12, 13]

export default async function Science() {
  const thesis = await client.fetch(`*[_type == "technicalThesis"][0]{
    pageTitle, pageSubtitle, disclaimer, sections[]{ number, title, body }
  }`)

  const sanitySections: Array<{ number: number; title: string; body: any }> = thesis?.sections ?? []

  const extraSections = sanitySections.filter(
    (s) => !HARDCODED_NUMBERS.includes(Number(s.number))
  )

  const sanityOverrides = Object.fromEntries(
    sanitySections
      .filter((s) => HARDCODED_NUMBERS.includes(Number(s.number)))
      .map((s) => [Number(s.number), s])
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScienceClient
        pageTitle={thesis?.pageTitle ?? null}
        pageSubtitle={thesis?.pageSubtitle ?? null}
        disclaimer={thesis?.disclaimer ?? null}
        extraSections={extraSections}
        sanityOverrides={sanityOverrides}
      />
      <Footer />
    </div>
  )
}