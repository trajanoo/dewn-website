import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-22'

if (!projectId || !dataset) {
  console.error('Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

async function run() {
  try {
    const doc = await client.fetch(`*[_type == "ingredients"][0]{_id,title,items[]{name,subtitle,desc}}`)
    console.log('Fetch result:')
    console.dir(doc, { depth: null })
  } catch (err) {
    console.error('Fetch error:', err)
    process.exit(2)
  }
}

run()
