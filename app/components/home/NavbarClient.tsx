'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

type NavbarClientProps = {
  title?: string | null
  logo?: string | null
  menu?: any[]
}

export default function Navbar({ title, logo, menu }: NavbarClientProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [siteTitle, setSiteTitle] = useState<string | null>(null)
  const [logoSrc, setLogoSrc] = useState<string | null>(null)
  const [menuItems, setMenuItems] = useState<any[] | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true
    const fetchNav = async () => {
      const query = `*[_type == "navbar"][0]{siteTitle,logo,menu[]{label,target}}`
      const res = await client.fetch(query)
      if (!mounted) return
      setSiteTitle(res?.siteTitle ?? null)
      if (res?.logo) setLogoSrc(urlFor(res.logo).width(200).url())
      setMenuItems(res?.menu ?? null)
    }
    fetchNav()
    return () => { mounted = false }
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="font-serif text-xl  text-foreground">
          {logoSrc ? <img width={80} src={logoSrc} alt={siteTitle ?? 'logo'} /> : (siteTitle ?? 'DEWN')}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems ? (
            menuItems.map((m, i) => {
              const label = String(m.label ?? '').trim()
              const target = String(m.target ?? '').trim()
              const isWaitlist = /waitlist|join\s*waitlist/i.test(label) || /waitlist|finalCTA/i.test(target)
              return isWaitlist ? (
                <button
                  key={i}
                  onClick={() => scrollTo(m.target)}
                  className="text-sm cursor-pointer px-5 py-2 rounded-pill bg-[#1E2429] text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {m.label}
                </button>
              ) : (
                <button key={i} onClick={() => scrollTo(m.target)} className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                  {m.label}
                </button>
              )
            })
          ) : (
            <>
              <button onClick={() => scrollTo('science')} className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">Science</button>
              <button onClick={() => scrollTo('about')} className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">About</button>
              <button onClick={() => scrollTo('finalCTA')} className="text-sm cursor-pointer px-5 py-2 rounded-pill bg-[#1E2429] text-primary-foreground hover:opacity-90 transition-opacity">Join Waitlist</button>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

        <div
  className={`md:hidden bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out overflow-hidden ${
    menuOpen
      ? 'max-h-96 opacity-100 translate-y-0'
      : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
  }`}
>
          <div className="px-6 py-4 flex flex-col gap-4">
            {menuItems ? (
              menuItems.map((m, i) => {
                const label = String(m.label ?? '').trim()
                const target = String(m.target ?? '').trim()
                const isWaitlist = /waitlist|join\s*waitlist/i.test(label) || /waitlist|finalCTA/i.test(target)
                return isWaitlist ? (
                  <button key={i} onClick={() => scrollTo(m.target)} className="text-sm px-5 py-2 rounded-pill bg-[#1E2429] text-primary-foreground w-fit">
                    {m.label}
                  </button>
                ) : (
                  <button key={i} onClick={() => scrollTo(m.target)} className="text-sm text-muted-foreground text-left">
                    {m.label}
                  </button>
                )
              })
            ) : (
              <>
                <button onClick={() => scrollTo('science')} className="text-sm text-muted-foreground text-left">
                  Science
                </button>
                <button onClick={() => scrollTo('about')} className="text-sm text-muted-foreground text-left">
                  About
                </button>
                <button
                  onClick={() => scrollTo('finalCTA')}
                  className="text-sm px-5 py-2 rounded-pill bg-[#1E2429] text-primary-foreground w-fit"
                >
                  Join Waitlist
                </button>
              </>
            )}
          </div>
        </div>

    </nav>
  );
}