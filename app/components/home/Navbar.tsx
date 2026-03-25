import NavbarClient from './NavbarClient'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default async function Navbar() {
  const res = await client.fetch(`*[_type == "navbar"][0]{siteTitle,logo,menu}`)

  return (
    <NavbarClient
      title={res?.siteTitle}
      logo={res?.logo ? urlFor(res.logo).width(200).url() : null}
      menu={res?.menu}
    />
  )
}