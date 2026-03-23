import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import ScrollReveal from '../components/home/ScrollReveal';

export default function Science() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 lg:pt-40 lg:pb-36">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <ScrollReveal>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Technical Documentation</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              Technical Thesis:<br />The Physics of Tolerance
            </h1>
            <p className="text-xl text-foreground/70 mb-12">
              A Biphasic Architecture for Slowed and Sensitive Digestive States
            </p>
          </ScrollReveal>

          {/* Disclaimer */}
          <ScrollReveal delay={0.1}>
            <div className="bg-muted/30 border border-border/50 rounded-xl p-6 mb-16">
              <p className="text-xs font-medium text-foreground mb-2">Disclaimer</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This document describes formulation architecture, performance characteristics, and measurable quality parameters. It is not intended to diagnose, treat, cure, or prevent any disease. The system described is a nutritional support formulation designed for compatibility with slowed or sensitive digestive states.
              </p>
            </div>
          </ScrollReveal>

          {/* 1. Overview */}
          <ScrollReveal delay={0.15}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">1. Overview</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This document defines the physical boundaries that emerge when gastric motility slows and describes a biphasic nutritional system structured to operate within those boundaries.
                </p>
                <p>
                  When digestive transit decreases, residence time increases. Under these conditions, acidity persists longer, particulate load becomes more perceptible, and density amplification may occur. Liquids tolerated in rapid digestion may feel heavy, opaque, or burdensome.
                </p>
                <p>
                  The system described here is structured around clarity, dispersion stability, and viscosity control.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 2. The Digestive Shift */}
          <ScrollReveal delay={0.2}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">2. The Digestive Shift: Operating Environment</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In high-velocity physiology, the stomach functions as a processing chamber. Under therapeutic modulation, autonomic variability, or slowed gastric emptying, the internal environment transitions toward prolonged residence.
              </p>
              <p className="text-sm font-medium text-foreground mb-4">This altered state is characterized by:</p>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { title: 'Slowed Motility', desc: 'Extended gastric emptying intervals increase exposure time.' },
                  { title: 'Extended Residence', desc: 'Materials remain in contact with gastric acidity for longer durations.' },
                  { title: 'Acidity Persistence', desc: 'Fasted gastric pH (typically ~1.5–4.0) may persist for extended windows, influencing protein behavior and sensory tolerance.' },
                  { title: 'Amplified Sensitivity', desc: 'Turbidity, viscosity, and particulate load become more perceptible. Liquids may be described as thick, heavy, or difficult to tolerate.' },
                ].map((item, i) => (
                  <div key={i} className="bg-card/50 border border-border/40 rounded-lg p-5">
                    <p className="text-sm font-semibold text-foreground mb-2">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 3. Biphasic Alignment */}
          <ScrollReveal delay={0.25}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">3. Biphasic Digestive Alignment</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Gastric conditions differ between fasted and post-intake states. A single formulation cannot fully optimize for both.
              </p>
              <div className="space-y-5">
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-border/40 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">DEWN RISE (Morning Stability)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aligned to pH 3.45–3.55 to preserve clarity in acidic environments.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-slate-500/10 to-blue-500/5 border border-border/40 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">DEWN SET (Afternoon Restoration)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aligned to pH 6.8–7.2 to support mineral dispersion in the prepared beverage.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-6">
                Separating these phases avoids the performance compromise inherent to a single formulation.
              </p>
            </div>
          </ScrollReveal>

          {/* 4. Protein Performance */}
          <ScrollReveal delay={0.3}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">4. Protein Performance in Acidic Conditions — DEWN RISE</h2>
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

              {/* Performance Table */}
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
            </div>
          </ScrollReveal>

          {/* 5. Hydration Architecture */}
          <ScrollReveal delay={0.35}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">5. Hydration Architecture: Controlled Viscosity</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Fiber behavior in slowed digestion depends on hydration kinetics and controlled viscosity.
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <span className="font-medium text-foreground">PHGG Specification:</span> DEWN RISE incorporates enzymatically hydrolyzed PHGG with a 25–30 cP viscosity specification (Brookfield method, standardized conditions).
                </p>
                <p>
                  <span className="font-medium text-foreground">Low-Viscosity Boundary:</span> Under defined preparation, final solution viscosity remains &lt;1.8 cP, preserving a fluid profile rather than forming a thickened suspension.
                </p>
                <p>
                  For individuals who report bloating or heaviness from traditional fiber supplements, viscosity control is essential.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 6. Mineral Engineering */}
          <ScrollReveal delay={0.4}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">6. Mineral Engineering & Particle Control — DEWN SET</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Mineral tolerability depends on chemical form and particle geometry.
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <span className="font-medium text-foreground">Fully Reacted Chelates:</span> DEWN SET delivers magnesium exclusively in organic chelate forms (Threonate, Glycinate, Taurate). Inorganic oxide forms are excluded.
                </p>
                <p>
                  <span className="font-medium text-foreground">Particle Size Specification:</span> D50 ≤ 75 μm supports residue-free dispersion and reduces perceptible sedimentation.
                </p>
                <p>
                  <span className="font-medium text-foreground">Elemental Precision:</span> Each serving provides approximately 300 mg of elemental magnesium, within defined tolerances.
                </p>
                <p>
                  For individuals who describe magnesium as chalky or irritating, chelation and micronization are decisive variables.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 7. Sensory Neutrality */}
          <ScrollReveal delay={0.45}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">7. Sensory Neutrality as Functional Design</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The sensory profile is performance-driven.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { title: 'Sweetness Threshold Management', desc: 'Low sweetness intensity reduces lingering notes during slowed transit.' },
                  { title: 'Rebaudioside M Selection', desc: 'High-purity Reb-M is used to minimize amplification of metallic or bitter aftertaste.' },
                  { title: 'Residue Control', desc: 'Combined turbidity control (<5.0 NTU) and particle refinement (≤75 μm) support sensory neutrality.' },
                ].map((item, i) => (
                  <div key={i} className="bg-card/50 border border-border/40 rounded-lg p-5">
                    <p className="text-sm font-semibold text-foreground mb-2">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 8. Baseline Protection */}
          <ScrollReveal delay={0.5}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">8. Baseline Protection Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The system is structured to maintain a Nutritional Floor rather than replace dietary diversity.
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <span className="font-medium text-foreground">Minimal Volume Load:</span> Ingredient quantities are calibrated to support continuity without increasing gastric volume burden.
                </p>
                <p>
                  <span className="font-medium text-foreground">Continuity Over Intensity:</span> The objective is consistent intake support — not stimulation, appetite suppression, or meal replacement.
                </p>
                <p>
                  For individuals experiencing early satiety, reduced appetite, or intake resistance, stability supports adherence.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 9. Formulation Constraints */}
          <ScrollReveal delay={0.55}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">9. Formulation Constraints</h2>
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
            </div>
          </ScrollReveal>

          {/* 10. Quality Verification */}
          <ScrollReveal delay={0.6}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">10. Quality Verification Gates</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every production run is validated against measurable criteria:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  '40-Mesh Stainless Sieve (rejects >0.5 mm particles)',
                  'Turbidity <5.0 NTU (instrument verified)',
                  '≤15 sec Cold Dispersion (standardized test)',
                  '±2% Fill Tolerance',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent mt-1.5">•</span>
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                All gates verified with video documentation per production protocol. These gates ensure reproducible clarity, dispersion, and dose reliability.
              </p>
            </div>
          </ScrollReveal>

          {/* 11. Use Context */}
          <ScrollReveal delay={0.65}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">11. Use Context: Slowed or Sensitive Digestive States</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The system is structured for digestive environments characterized by slowed gastric emptying or heightened intake sensitivity.
              </p>
              <p className="text-sm text-foreground font-medium mb-3">These patterns may occur in:</p>
              <ul className="space-y-2 mb-6">
                {[
                  'Motility-modulating therapeutic contexts (e.g., GLP-1 protocols)',
                  'Appetite suppression or early satiety phases',
                  'Autonomic digestive variability',
                  'Periods of prolonged caloric restriction',
                  'Post-treatment intake sensitivity',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent mt-1.5">•</span>
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                The focus is on the physical behavior of nutrition under slowed conditions — not the treatment or diagnosis of disease.
              </p>
            </div>
          </ScrollReveal>

          {/* 12. Mechanical Performance Summary */}
          <ScrollReveal delay={0.7}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">12. Mechanical Performance Summary</h2>
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
            </div>
          </ScrollReveal>

          {/* 13. Biphasic Benchmarking */}
          <ScrollReveal delay={0.75}>
            <div className="mb-16 pb-10 border-b border-border/50">
              <h2 className="font-serif text-3xl text-foreground mb-6">13. Biphasic Performance Benchmarking</h2>
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
              </div>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                Fitness/general clear proteins; no motility-optimized equivalents currently exist. Public specifications derived from manufacturer data sheets and product performance literature.
              </p>
            </div>
          </ScrollReveal>

          {/* 14. References */}
          <ScrollReveal delay={0.8}>
            <div className="mb-12">
              <h2 className="font-serif text-3xl text-foreground mb-6">14. References</h2>
              <ol className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li>
                  1. Camilleri M. Clinical consequences of delayed gastric emptying with GLP-1 receptor agonists. <em>J Clin Endocrinol Metab.</em> 2025;110(1):1-12. <a href="https://academic.oup.com/jcem/article/110/1/1/7824836" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://academic.oup.com/jcem/article/110/1/1/7824836</a>
                </li>
                <li>
                  2. Wright JP, et al. Heat-stable whey protein isolate using isoelectric precipitation. <em>J Dairy Sci.</em> 2024. <a href="https://pubmed.ncbi.nlm.nih.gov/38788845/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/38788845/</a>
                </li>
                <li>
                  3. Mudie DM, et al. Intra- and interindividual variability in fasted gastric content. <em>Neurogastroenterol Motil.</em> 2024;36(8):e14904. <a href="https://onlinelibrary.wiley.com/doi/10.1111/nmo.14904" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://onlinelibrary.wiley.com/doi/10.1111/nmo.14904</a>
                </li>
                <li>
                  4. Blancquaert L, et al. Magnesium bioavailability from supplements. <em>Nutrients.</em> 2019;11(12):2997. <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6891707/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6891707/</a>
                </li>
                <li>
                  5. Slavin J. Fiber and prebiotics: mechanisms and health benefits. <em>Nutr Clin Pract.</em> 2013;28(3):293-301. <a href="https://aspenjournals.onlinelibrary.wiley.com/doi/10.1177/0884533613486947" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://aspenjournals.onlinelibrary.wiley.com/doi/10.1177/0884533613486947</a>
                </li>
                <li>
                  6. Slavin J. Fiber and prebiotics: mechanisms and health benefits. <em>Nutrients.</em> 2013;5(4):1417-1435. <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3705355/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3705355/</a>
                </li>
                <li>
                  7. Dressman JB, et al. Upper GI pH in young healthy adults. <em>Am J Gastroenterol.</em> 1990;85(7):706-13. <a href="https://pubmed.ncbi.nlm.nih.gov/2395805/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://pubmed.ncbi.nlm.nih.gov/2395805/</a>
                </li>
                <li>
                  8. Malagelada JR, et al. Gastric function measurement. <em>Gastroenterology.</em> 1976;70(1):33-40. <a href="https://www.gastrojournal.org/article/0016-5085(76)90802-0/abstract" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://www.gastrojournal.org/article/0016-5085(76)90802-0/abstract</a>
                </li>
              </ol>
            </div>
          </ScrollReveal>

          {/* Footer Note */}
          <ScrollReveal delay={0.85}>
            <div className="pt-10 border-t border-border/50">
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                DEWN RISE™ and DEWN SET™ are trademarks of DEWN LLC. © 2026 DEWN LLC. All rights reserved.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </div>
  );
}