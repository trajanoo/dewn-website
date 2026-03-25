'use client'
import React, { useMemo } from 'react'
import { PortableText } from '@portabletext/react'
import Navbar from '../components/home/Navbar'
import Footer from '../components/home/Footer'
import ScrollReveal from '../components/home/ScrollReveal'

interface Section {
  number: number
  title: string
  body: any
}

interface Props {
  pageTitle: string | null
  pageSubtitle: string | null
  disclaimer: string | null
  extraSections: Section[]
  sanityOverrides: Record<number, Section>
}

const hardcodedSections: Array<{ number: number; title: string; body: React.ReactNode }> = [
  {
    number: 4,
    title: 'Protein Performance in Acidic Conditions — DEWN RISE',
    body: (
      <>
        <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
          <p>Most whey proteins are optimized for neutral mixing environments.</p>
          <p>
            <span className="font-medium text-foreground">Isoelectric Behavior:</span> Whey proteins exhibit an isoelectric point near pH 4.8–5.2. Aggregation may increase near this range under acidic exposure. DEWN RISE uses an acid-stable whey isolate pre-aligned to pH 3.45–3.55 to maintain dispersion stability below the isoelectric range.
          </p>
          <p>
            <span className="font-medium text-foreground">Turbidity as Functional Metric:</span> Turbidity (NTU) reflects particulate load. Acidic protein beverages frequently exceed 20–80 NTU during aggregation. DEWN RISE targets &lt;5.0 NTU under defined preparation — visually comparable to clear water.
          </p>
          <p>
            <span className="font-medium text-foreground">Perceived Heaviness:</span> High turbidity and aggregation increase perceived density, often described as protein feeling heavy or sitting in the stomach.
          </p>
        </div>
        <div className="bg-card/50 border border-border/40 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-border/40 bg-muted/20">
            <h3 className="text-sm font-semibold text-foreground">Performance Profile (Defined Preparation)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/10">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground border-b border-border/30">Parameter</th>
                  <th className="text-left p-4 font-medium text-foreground border-b border-border/30">Typical Whey Beverage</th>
                  <th className="text-left p-4 font-medium text-foreground border-b border-border/30">DEWN RISE</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="p-4 border-b border-border/20">Isoelectric Range</td>
                  <td className="p-4 border-b border-border/20">4.8–5.2</td>
                  <td className="p-4 border-b border-border/20 text-accent font-medium">3.45–3.55 alignment</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border/20">Turbidity (acidic)</td>
                  <td className="p-4 border-b border-border/20">20–80+ NTU</td>
                  <td className="p-4 border-b border-border/20 text-accent font-medium">&lt;5.0 NTU</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-border/20">Cold Dispersion</td>
                  <td className="p-4 border-b border-border/20">Variable</td>
                  <td className="p-4 border-b border-border/20 text-accent font-medium">≤15 sec</td>
                </tr>
                <tr>
                  <td className="p-4">Visual Profile</td>
                  <td className="p-4">Opaque</td>
                  <td className="p-4 text-accent font-medium">Clear</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ),
  },
  {
    number: 9,
    title: 'Formulation Constraints',
    body: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Each quantitative target reflects a defined boundary condition:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Protein Floor', value: '4 g acid-stable whey isolate' },
            { label: 'Hydration Matrix', value: '12 g PHGG (controlled viscosity window)' },
            { label: 'Density Gate', value: '≥0.65 g/ml' },
            { label: 'Turbidity Target', value: '<5.0 NTU' },
            { label: 'Particle Size (D50)', value: '≤75 μm' },
            { label: 'Cold Dispersion', value: '≤15 sec' },
            { label: 'Fill Tolerance', value: '±2% gravimetric (RISE 17.950 g / SET 4.295 g)' },
          ].map((item, i) => (
            <div key={i} className="flex items-baseline gap-3 text-sm">
              <span className="text-foreground font-medium">{item.label}:</span>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    number: 12,
    title: 'Mechanical Performance Summary',
    body: (
      <div className="bg-card/50 border border-border/40 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/10">
              <tr>
                <th className="text-left p-4 font-medium text-foreground border-b border-border/30">Parameter</th>
                <th className="text-left p-4 font-medium text-foreground border-b border-border/30">Target</th>
                <th className="text-left p-4 font-medium text-foreground border-b border-border/30">Functional Rationale</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                { param: 'Turbidity', target: '<5.0 NTU', rationale: 'Water-like clarity' },
                { param: 'Final Viscosity', target: '<1.8 cP', rationale: 'Fluid profile' },
                { param: 'Particle Size (D50)', target: '≤75 μm', rationale: 'Residue-free dispersion' },
                { param: 'Cold Dispersion', target: '≤15 sec', rationale: 'Rapid hydration' },
                { param: 'Blend Density', target: '≥0.65 g/ml', rationale: 'Dose integrity' },
                { param: 'Protein pH Alignment', target: '3.45–3.55', rationale: 'Stability below IEP' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-4 border-b border-border/20 font-medium text-foreground">{row.param}</td>
                  <td className="p-4 border-b border-border/20 text-accent">{row.target}</td>
                  <td className="p-4 border-b border-border/20">{row.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    number: 13,
    title: 'Biphasic Performance Benchmarking',
    body: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-6">
          DEWN's full system operates within physical boundaries unmet by commercial clear beverages. The table below positions measured targets against leading products.
        </p>
        <div className="bg-card/50 border border-border/40 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs lg:text-sm">
              <thead className="bg-muted/10">
                <tr>
                  <th className="text-left p-3 lg:p-4 font-medium text-foreground border-b border-border/30">Parameter</th>
                  <th className="text-left p-3 lg:p-4 font-medium text-foreground border-b border-border/30">DEWN (RISE+SET)</th>
                  <th className="text-left p-3 lg:p-4 font-medium text-foreground border-b border-border/30">MyProtein Clear</th>
                  <th className="text-left p-3 lg:p-4 font-medium text-foreground border-b border-border/30">Isopure Clear</th>
                  <th className="text-left p-3 lg:p-4 font-medium text-foreground border-b border-border/30">Seeq Clear</th>
                  <th className="text-left p-3 lg:p-4 font-medium text-foreground border-b border-border/30">Ensure Clear</th>
                  <th className="text-left p-3 lg:p-4 font-medium text-foreground border-b border-border/30">Slowed Digestion Edge</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { param: 'Turbidity (NTU)', dewn: '<5.0', my: '10-30', iso: '15-25', seeq: '10-20', ensure: '10-20', edge: 'Water-clarity vs. "heavy" residue' },
                  { param: 'Viscosity Final (cP)', dewn: '1.8', my: '2-5', iso: '2-4', seeq: '2-5', ensure: '2-5', edge: 'Fluid vs. bloating suspension' },
                  { param: 'Protein pH Stability', dewn: '3.45-3.55 (RISE)', my: '≥4.0', iso: '≥4.0', seeq: '≥4.0', ensure: '≥4.0', edge: 'Below IEP (4.8) vs. acidic aggregation' },
                  { param: 'Protein/Serve', dewn: '4g floor (RISE)', my: '20g', iso: '20g', seeq: '20g', ensure: '9g', edge: 'Low-volume satiety control' },
                  { param: 'Fiber (PHGG)', dewn: '12g low-visc', my: 'None', iso: 'None', seeq: 'None', ensure: 'None', edge: 'IBS-proven tolerance vs. gas' },
                  { param: 'Mg Elemental', dewn: '300mg chelates (SET)', my: 'None', iso: 'None', seeq: 'None', ensure: 'None', edge: 'Bioavailable restoration' },
                  { param: 'Sweetener', dewn: 'Reb-M (high purity)', my: 'Sucralose', iso: 'Sucralose', seeq: 'Artificial', ensure: 'Sugar alcohols', edge: 'No bitterness linger; neutral sensory' },
                  { param: 'Target Context', dewn: 'GLP-1/slowed motility', my: 'Fitness', iso: 'Fitness', seeq: 'Fitness', ensure: 'General', edge: 'Physics solves residence time' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-3 lg:p-4 border-b border-border/20 font-medium text-foreground">{row.param}</td>
                    <td className="p-3 lg:p-4 border-b border-border/20 text-accent font-medium">{row.dewn}</td>
                    <td className="p-3 lg:p-4 border-b border-border/20">{row.my}</td>
                    <td className="p-3 lg:p-4 border-b border-border/20">{row.iso}</td>
                    <td className="p-3 lg:p-4 border-b border-border/20">{row.seeq}</td>
                    <td className="p-3 lg:p-4 border-b border-border/20">{row.ensure}</td>
                    <td className="p-3 lg:p-4 border-b border-border/20 text-xs">{row.edge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            Fitness/general clear proteins; no motility-optimized equivalents currently exist. Public specifications derived from manufacturer data sheets and product performance literature.
          </p>
        </div>
      </>
    ),
  },
]

export default function ScienceClient({ pageTitle, pageSubtitle, disclaimer, extraSections, sanityOverrides }: Props) {
  const mergedSections = useMemo(() => {
    const result = hardcodedSections.map((h) => sanityOverrides[h.number] ?? h)
    extraSections.forEach((s) => result.push(s))
    result.sort((a, b) => Number(a.number) - Number(b.number))
    return result
  }, [extraSections, sanityOverrides])

  return (
    <div className="pt-32 pb-24 lg:pt-40 lg:pb-36">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Technical Documentation</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            {pageTitle}
          </h1>
          <p className="text-xl text-foreground/70 mb-12">{pageSubtitle}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-muted/30 border border-border/50 rounded-xl p-6 mb-16">
            <p className="text-xs font-medium text-foreground mb-2">Disclaimer</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{disclaimer}</p>
          </div>
        </ScrollReveal>

        {mergedSections.map((section, i) => (
          <ScrollReveal key={section.number} delay={0.15 + i * 0.05}>
            <div className="mb-16 pb-10 border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">
                {section.number}. {section.title}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {Array.isArray(section.body) ? (
                  <PortableText value={section.body} />
                ) : React.isValidElement(section.body) ? (
                  section.body
                ) : typeof section.body === 'string' ? (
                  section.body.split('\n\n').map((p: string, j: number) => (
                    <p key={j} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))
                ) : null}
              </div>
            </div>
          </ScrollReveal>
        ))}

        <ScrollReveal delay={0.85}>
          <div className="pt-10 border-border/50">
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              DEWN RISE™ and DEWN SET™ are trademarks of DEWN LLC. © 2026 DEWN LLC. All rights reserved.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}