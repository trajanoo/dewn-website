import { client } from '@/sanity/lib/client'
import IngredientsSectionClient from './IngredientsSectionClient'

export default async function IngredientsSection() {
  const res = await client.fetch(`*[_type == "ingredients"][0]{title, items[]{name,subtitle,desc}}`)
  const items = res?.items ?? []

  return <IngredientsSectionClient items={items} />
}