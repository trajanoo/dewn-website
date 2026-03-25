import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  const query = `*[_type == "navbar"][0]{siteTitle,logo,menu[]{label,target}}`
  const res = await client.fetch(query)

  const siteTitle: string | null = res?.siteTitle ?? null
  const logoSrc: string | null = res?.logo ? urlFor(res.logo).width(200).url() : null
  const menuItems: any[] | null = res?.menu ?? null

  return <NavbarClient siteTitle={siteTitle} logoSrc={logoSrc} menuItems={menuItems} />
}