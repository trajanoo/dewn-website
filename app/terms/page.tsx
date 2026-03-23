import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import ScrollReveal from '../components/home/ScrollReveal';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 lg:pt-40 lg:pb-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Legal</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-4">
              Terms of Use
            </h1>
            <div className="flex gap-6 text-sm text-muted-foreground mb-12">
              <div>
                <span className="text-foreground/70 font-medium">Effective Date:</span> March 2, 2026
              </div>
              <div>
                <span className="text-foreground/70 font-medium">Jurisdiction:</span> United States (Wyoming)
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-8">
                Welcome to DEWN LLC ("DEWN," "we," "us," "our").
              </p>
              <p className="text-muted-foreground leading-relaxed mb-12">
                These Terms of Use are governed by the laws of the State of Wyoming and United States federal law. By accessing this website or submitting your information, you agree to these Terms.
              </p>

              {/* Section 1 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">1. Informational Nature of Content</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The materials on this website — including technical documents, whitepapers, formulation descriptions, data tables, and product information — are provided for educational and informational purposes.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  They are not medical advice and are not intended to replace consultation with a qualified healthcare professional.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Always seek professional guidance before making changes to diet, supplementation, or clinical protocols.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">2. Pre-Launch Status</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  DEWN is currently in a pre-launch phase.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  No products are being sold directly through this website at this time.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Product specifications and technical materials are shared for informational transparency and may be refined prior to commercial release.
                </p>
              </div>

              {/* Section 3 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">3. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All website content — including text, technical documentation, performance data tables, formulation parameters, graphics, branding, and trademarks — is the property of DEWN LLC.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may view and download materials for personal, non-commercial use only.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Reproduction, redistribution, republication, systematic extraction, or commercial use without written permission is prohibited.
                </p>
              </div>

              {/* Section 4 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">4. Acceptable Use & Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You must be at least 18 years old to use this website.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">You agree not to:</p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="text-muted-foreground leading-relaxed">Submit false or misleading information</li>
                  <li className="text-muted-foreground leading-relaxed">Attempt to disrupt website security or functionality</li>
                  <li className="text-muted-foreground leading-relaxed">Copy, scrape, or systematically extract content</li>
                  <li className="text-muted-foreground leading-relaxed">Extract technical specifications, performance data tables, or formulation parameters using automated tools or software</li>
                  <li className="text-muted-foreground leading-relaxed">Use automated systems to harvest data for commercial or competitive purposes</li>
                  <li className="text-muted-foreground leading-relaxed">Engage in abusive, fraudulent, or unlawful activity</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">5. Waitlist Integrity</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The waitlist is intended for genuine individuals interested in launch updates.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-3">We reserve the right to:</p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="text-muted-foreground leading-relaxed">Remove duplicate submissions</li>
                  <li className="text-muted-foreground leading-relaxed">Filter automated or bot-generated entries</li>
                  <li className="text-muted-foreground leading-relaxed">Limit multiple submissions from the same user</li>
                  <li className="text-muted-foreground leading-relaxed">Maintain list integrity to ensure fair access</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  This helps preserve the quality and accuracy of communications.
                </p>
              </div>

              {/* Section 6 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">6. Product Positioning</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  DEWN formulations are nutritional products.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  They are not drugs and are not intended to diagnose, treat, cure, or prevent any disease.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Statements on this website have not been evaluated by the U.S. Food and Drug Administration or equivalent regulatory authorities.
                </p>
              </div>

              {/* Section 7 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">7. Balanced Termination Clause</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We may restrict or suspend access to the website if a user engages in activity that:
                </p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="text-muted-foreground leading-relaxed">Violates these Terms</li>
                  <li className="text-muted-foreground leading-relaxed">Compromises website security</li>
                  <li className="text-muted-foreground leading-relaxed">Infringes intellectual property</li>
                  <li className="text-muted-foreground leading-relaxed">Interferes with other users</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Where reasonable, we will provide notice prior to restriction, except in cases involving security risks or unlawful conduct.
                </p>
              </div>

              {/* Section 8 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">8. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website may contain links to third-party websites. We are not responsible for the content or practices of external sites.
                </p>
              </div>

              {/* Section 9 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">9. Intellectual Property Infringement / Takedown Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  If you believe that content on this website infringes your copyright or intellectual property rights, you may submit a written notice including:
                </p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="text-muted-foreground leading-relaxed">Identification of the copyrighted work</li>
                  <li className="text-muted-foreground leading-relaxed">Identification of the material claimed to be infringing</li>
                  <li className="text-muted-foreground leading-relaxed">Your contact information</li>
                  <li className="text-muted-foreground leading-relaxed">A statement of good-faith belief</li>
                  <li className="text-muted-foreground leading-relaxed">A statement that the information provided is accurate</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Send notices to: <a href="mailto:legal@dewn.com" className="text-foreground hover:text-accent transition-colors">legal@dewn.com</a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We will review and respond in accordance with applicable law.
                </p>
              </div>

              {/* Section 10 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">10. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  To the fullest extent permitted under applicable law, DEWN shall not be liable for any indirect, incidental, consequential, punitive, or exemplary damages arising from:
                </p>
                <ul className="space-y-2 ml-6 mb-4">
                  <li className="text-muted-foreground leading-relaxed">Your use of the website</li>
                  <li className="text-muted-foreground leading-relaxed">Reliance on informational content</li>
                  <li className="text-muted-foreground leading-relaxed">Inability to access the Services</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Use of the website is at your discretion.
                </p>
              </div>

              {/* Section 11 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms are governed by the laws of Wyoming and United States federal law.
                </p>
              </div>

              {/* Section 12 */}
              <div className="mb-12 pb-8 border-b border-border/50">
                <h2 className="font-serif text-2xl text-foreground mb-4">12. Modifications</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may update these Terms as operations evolve. Updated versions will be posted with a revised Effective Date.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Continued use of the website constitutes acceptance of revised Terms.
                </p>
              </div>

              {/* Section 13 */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-foreground mb-4">13. Contact</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For questions regarding these Terms:
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Email: <a href="mailto:hello@dewn.com" className="text-foreground hover:text-accent transition-colors">hello@dewn.com</a>
                </p>
                <div className="text-muted-foreground leading-relaxed">
                  <p className="font-medium text-foreground mb-2">DEWN LLC</p>
                  <p>30 N Gould Street, Suite N</p>
                  <p>Sheridan, WY 82801</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </div>
  );
}