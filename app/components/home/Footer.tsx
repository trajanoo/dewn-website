import Link from 'next/link';
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default async function Footer() {
  const query = `*[_type == "footerSettings"][0]{siteName,legalText,links[]{title,url}}`
  const navQuery = `*[_type == "navbar"][0]{logo,siteTitle}`

  const [data, nav] = await Promise.all([
    client.fetch(query),
    client.fetch(navQuery),
  ])

  const siteName = data?.siteName
  const legalText = data?.legalText
  const links = data?.links ?? []
  const logoSrc = nav?.logo ? urlFor(nav.logo).width(160).url() : null

  return (
    <footer className="py-12 lg:py-16 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            {logoSrc ? (
              <img src={logoSrc} width={80} alt={siteName ?? 'logo'} />
            ) : (
              <span className="font-serif text-lg tracking-wider text-foreground">{siteName}</span>
            )}
            <p className="text-xs text-muted-foreground mt-3 max-w-md leading-relaxed">
              {legalText}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {links.map((l: any, i: number) => (
              <Link key={i} href={l.url} className="hover:text-foreground transition-colors">{l.title}</Link>
            ))}
            <a href="mailto:hello@dewn.co" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}