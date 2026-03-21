'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
          <img width={80} src="../dewn-logo.png" alt="" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('science')} className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            Science
          </button>
          <button onClick={() => scrollTo('about')} className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            About
          </button>
          <button
            onClick={() => scrollTo('waitlist')}
            className="text-sm cursor-pointer px-5 py-2 rounded-pill bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Join Waitlist
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            <button onClick={() => scrollTo('science')} className="text-sm text-muted-foreground text-left">
              Science
            </button>
            <button onClick={() => scrollTo('about')} className="text-sm text-muted-foreground text-left">
              About
            </button>
            <button
              onClick={() => scrollTo('waitlist')}
              className="text-sm px-5 py-2 rounded-pill bg-primary text-primary-foreground w-fit"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}