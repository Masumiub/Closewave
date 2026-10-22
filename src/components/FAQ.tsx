import { useState } from "react";
import { Container, Icon, Reveal, SectionEnter, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

const faqs = [
  {
    q: "How does Closewave work during a live call?",
    a: "Closewave connects to Zoom, Google Meet, Microsoft Teams, and your dialer. It transcribes in real time, detects objections, competitors, and buying signals, and shows a discreet prompt to your rep, typically in under a second.",
  },
  {
    q: "Will prospects know they're being recorded?",
    a: "Closewave supports configurable consent banners and announcements for every region, including two-party consent jurisdictions. You decide the policy, and we enforce it automatically.",
  },
  {
    q: "Which CRMs do you integrate with?",
    a: "Native two-way sync with Salesforce and HubSpot, plus Pipedrive, Microsoft Dynamics, and Zoho. Custom field mapping supports MEDDICC, BANT, SPICED, or your own methodology.",
  },
  {
    q: "Can we customize the objection and competitor talk tracks?",
    a: "Absolutely. Enablement teams can edit or create plays in a no-code editor, and Closewave learns from your best closed-won calls to suggest improvements automatically.",
  },
  {
    q: "How long does implementation take?",
    a: "Most teams are live in under a day. Connect your calendar and CRM, import your playbooks, and invite reps. Our team will help on every paid plan.",
  },
  {
    q: "Is our data secure?",
    a: "Yes. We're SOC 2 Type II certified and GDPR compliant. Data is encrypted in transit and at rest, never used to train models for other customers, and retention is fully configurable.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionEnter id="faq" className="relative py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Questions, <span className="font-serif font-normal italic text-gradient">answered</span>
              </>
            }
            sub="Everything you need to know before you start. Still curious? Our team replies within a few hours."
          />
          <Reveal delay={200}>
            <a
              href="mailto:hello@closewave.example"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-600"
            >
              Talk to a human
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} from="left" delay={i * 80}>
                <div
                  className={cn(
                    "border bg-white transition-colors duration-200",
                    isOpen ? "border-ink" : "border-line hover:border-ink/40",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold tracking-tight sm:text-lg"
                    >
                      {f.q}
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center border transition-all duration-300",
                          isOpen ? "rotate-45 bg-brand-600 text-white" : "bg-brand-50 text-brand-600",
                        )}
                      >
                        <Icon name="plus" className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    data-open={isOpen}
                    className="accordion-panel"
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-relaxed text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </SectionEnter>
  );
}
