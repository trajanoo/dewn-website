'use client'
import ScrollReveal from './ScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    q: 'What is DEWN?',
    a: 'DEWN is a premium nutrition system designed for people with slowed or sensitive digestion. It delivers protein, fiber, and essential minerals in a clear, light format that\'s easy on the stomach.',
  },
  {
    q: 'Who is DEWN for?',
    a: 'DEWN is for anyone whose digestion has changed — whether from age, medication, treatment, or chronic conditions — and who finds that conventional supplements and nutrition products are difficult to tolerate.',
  },
  {
    q: 'What makes DEWN different from other supplements?',
    a: 'DEWN is engineered from the ground up for digestive comfort. Every aspect — particle size, pH, dissolution rate, flavor profile — is optimized to reduce the burden on your body. It\'s not a regular supplement with gentler marketing. It\'s a fundamentally different approach.',
  },
  {
    q: 'What are the two products?',
    a: 'DEWN RISE is a morning formulation with gentle protein and electrolytes for daily stability. DEWN SET is an evening formulation with prebiotic fiber and magnesium for overnight restoration.',
  },
  {
    q: 'Is DEWN a meal replacement?',
    a: 'No. DEWN is a nutritional supplement designed to complement your diet — not replace meals. It fills specific gaps in protein, fiber, and mineral intake that are common with digestive changes.',
  },
  {
    q: 'Does it have a taste or texture?',
    a: 'DEWN is designed to be sensorially neutral. It dissolves completely clear in water with no grit, no sweetness, and no metallic aftertaste. It\'s as close to water as functional nutrition can get.',
  },
  {
    q: 'When will DEWN be available?',
    a: 'DEWN is currently in pre-launch. Join the waitlist to be among the first to access it when we launch.',
  },
  {
    q: 'Is DEWN backed by research?',
    a: 'Yes. Every ingredient and formulation decision in DEWN is grounded in published clinical research. Visit our Clinical Rationale page for detailed references.',
  },
];

export default function FAQSection() {
  return (
    <section className="py-24 lg:py-36">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">FAQ</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground">Questions</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/60 rounded-xl px-6 data-[state=open]:bg-card">
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}