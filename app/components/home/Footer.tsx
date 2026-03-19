import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 lg:py-16 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <span className="font-serif text-lg tracking-wider text-foreground">DEWN</span>
            <p className="text-xs text-muted-foreground mt-3 max-w-md leading-relaxed">
              *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link href="/Science" className="hover:text-foreground transition-colors">Clinical Rationale</Link>
            <Link href="/About" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/Privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/Terms" className="hover:text-foreground transition-colors">Terms of Use</Link>
            <a href="mailto:hello@dewn.co" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground/60">
            © 2026 DEWN LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}