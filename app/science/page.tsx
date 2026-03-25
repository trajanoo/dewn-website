import { client } from '@/sanity/lib/client'
import ScienceClient from './ScienceClient'

export default async function Science() {
  const thesis = await client.fetch(`*[_type == "technicalThesis"][0]{
    pageTitle, pageSubtitle, disclaimer, sections[]{ number, title, body }
  }`)

  return (
    <ScienceClient
      pageTitle={thesis?.pageTitle ?? null}
      pageSubtitle={thesis?.pageSubtitle ?? null}
      disclaimer={thesis?.disclaimer ?? null}
      sections={thesis?.sections ?? []}
    />
  )
}