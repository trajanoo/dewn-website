  import { client } from '@/sanity/lib/client'
  import BenefitsSection from './BenefitsSectionClient'

const query = `*[_type == "benefits"][0]{
  title,
  "heroImage": heroImage.asset->url,
  columns[]{
    id,
    title,
    subtitle,
    tagline,
    overline,
    "image": image.asset->url,
    items[]{name, desc}
  }
}`

export default async function BenefitsSectionServer() {
  const data = await client.fetch(query)
    console.log('BENEFITS DATA:', JSON.stringify(data, null, 2))  
  return <BenefitsSection data={data} />
}