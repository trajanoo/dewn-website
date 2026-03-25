'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface MenuItem { label: string; target: string }
interface Props {
  siteTitle: string | null
  logoSrc: string | null
  menuItems: MenuItem[] | null
}

export default function NavbarClient({ siteTitle, logoSrc, menuItems }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const renderItems = (items: MenuItem[] | null, mobile = false) => {
    if (items) {
      return items.map((m, i) => {
        const label = String(m.label ?? '').trim()
        const target = String(m.target ?? '').trim()
        const isWaitlist = /waitlist|join\s*waitlist/i.test(label) || /waitlist|finalCTA/i.test(target)
        return isWaitlist ? (
          <button
            key={i}
            onClick={() => scrollTo(target)}
            className={`text-sm cursor-pointer px-5 py-2 rounded-pill bg-[#1E2429] text-primary-foreground hover:opacity-90 transition-opacity${mobile ? ' w-fit' : ''}`}
          >
            {label}
          </button>
        ) : (
          <button
            key={i}
            onClick={() => scrollTo(target)}
            className={`text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors${mobile ? ' text-left' : ''}`}
          >
            {label}
          </button>
        )
      })
    }

    return mobile ? (
      <>
        <button onClick={() => scrollTo('science')} className="text-sm text-muted-foreground text-left">Science</button>
        <button onClick={() => scrollTo('about')} className="text-sm text-muted-foreground text-left">About</button>
        <button onClick={() => scrollTo('finalCTA')} className="text-sm px-5 py-2 rounded-pill bg-[#1E2429] text-primary-foreground w-fit">Join Waitlist</button>
      </>
    ) : (
      <>
        <button onClick={() => scrollTo('science')} className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">Science</button>
        <button onClick={() => scrollTo('about')} className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">About</button>
        <button onClick={() => scrollTo('finalCTA')} className="text-sm cursor-pointer px-5 py-2 rounded-pill bg-[#1E2429] text-primary-foreground hover:opacity-90 transition-opacity">Join Waitlist</button>
      </>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="font-serif text-xl text-foreground">
          {logoSrc ? <img width={80} src={logoSrc} alt={siteTitle ?? 'logo'} /> : (siteTitle ?? 'DEWN')}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {renderItems(menuItems)}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className={`md:hidden bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out overflow-hidden ${
        menuOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="px-6 py-4 flex flex-col gap-4">
          {renderItems(menuItems, true)}
        </div>
      </div>
    </nav>
  );
}