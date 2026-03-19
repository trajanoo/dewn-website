import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ClinicalBanner() {
  return (
    <section className="py-16 lg:py-20 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Research</p>
              <h3 className="font-serif text-2xl lg:text-3xl text-foreground">Built on published research.</h3>
            </div>
            <Link
              href="/Science"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group"
            >
              Clinical Rationale
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}