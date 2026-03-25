import Link from 'next/link';
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default async function Footer() {
  const data = await client.fetch(`*[_type == "footerSettings"][0]{siteName,legalText,links[]{title,url}}`)
  const nav = await client.fetch(`*[_type == "navbar"][0]{logo}`)

  const logoSrc = nav?.logo ? urlFor(nav.logo).width(160).url() : null

  return (
    <footer className="py-12 border-t">
      <div className="max-w-7xl mx-auto px-6">

        {logoSrc && <img src={logoSrc} width={80} alt="logo" />}

        <p className="text-xs mt-3">{data?.legalText}</p>

        <div className="flex gap-4 mt-6">
          {data?.links?.map((l: any, i: number) => (
            <Link key={i} href={l.url}>{l.title}</Link>
          ))}
        </div>

      </div>
    </footer>
  )
}