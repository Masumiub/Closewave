import { useState } from "react";
import { Container, Icon, Reveal, SectionEnter, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

const plans = [
  {
    name: "Starter",
    desc: "For small teams starting to coach in the moment.",
    monthly: 39,
    annual: 31,
    cta: "Start free trial",
    features: ["Live objection prompts", "Call transcripts & summaries", "HubSpot sync", "Up to 10 seats"],
  },
  {
    name: "Growth",
    desc: "For revenue teams serious about winning competitive deals.",
    monthly: 79,
    annual: 63,
    cta: "Start free trial",
    popular: true,
    features: [
      "Everything in Starter",
      "Competitor talk tracks & battlecards",
      "Automated CRM updates (Salesforce + HubSpot)",
      "Deal risk & forecast insights",
      "Live manager coaching",
    ],
  },
  {
    name: "Enterprise",
    desc: "For global orgs with advanced security and scale needs.",
    custom: true,
    cta: "Talk to sales",
    features: ["Everything in Growth", "SSO, SCIM & custom roles", "Regional data residency", "Custom AI model tuning", "Dedicated success manager"],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <SectionEnter id="pricing" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple pricing that <span className="font-serif font-normal italic text-gradient">scales with wins</span>
            </>
          }
          sub="Try everything free for 14 days. No credit card, no contracts, cancel anytime."
        />

        <Reveal delay={100} className="mt-10 flex justify-center">
          <div className="flex items-center border border-ink bg-white p-1">
            {[
              { label: "Monthly", val: false },
              { label: "Annual", val: true },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={annual === o.val}
                onClick={() => setAnnual(o.val)}
                className={cn(
                  "relative px-5 py-2 text-sm font-semibold transition-colors duration-200",
                  annual === o.val ? "bg-ink text-white" : "text-muted hover:text-ink",
                )}
              >
                {o.label}
                {o.val && (
                  <span className="ml-2 bg-mint/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} from="up" delay={i * 140} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col border p-8 transition-colors duration-300",
                  p.popular
                    ? "border-ink bg-ink text-white shadow-[8px_8px_0_0_#6d5ef6] lg:-my-4 lg:py-12"
                    : "border-line bg-white hover:border-ink",
                )}
              >
                {p.popular && (
                  <>
                    <div className="bg-noise-dark pointer-events-none absolute inset-0" aria-hidden="true" />
                    <span className="absolute left-6 top-0 -translate-y-1/2 border border-aqua bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-aqua">
                      Most popular
                    </span>
                  </>
                )}
                <div className="relative flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className={cn("mt-2 text-sm leading-relaxed", p.popular ? "text-slate-300" : "text-muted")}>{p.desc}</p>

                  <div className="mt-6 flex items-end gap-1.5">
                    {p.custom ? (
                      <span className="text-5xl font-semibold tracking-tight">Custom</span>
                    ) : (
                      <>
                        <span className="text-5xl font-semibold tracking-tight tabular-nums" aria-live="polite">
                          ${annual ? p.annual : p.monthly}
                        </span>
                        <span className={cn("pb-2 text-sm", p.popular ? "text-slate-300" : "text-muted")}>
                          /seat/mo
                        </span>
                      </>
                    )}
                  </div>
                  <p className={cn("mt-1 h-5 text-xs", p.popular ? "text-slate-400" : "text-muted")}>
                    {p.custom ? "Volume discounts available" : annual ? "Billed annually" : "Billed monthly"}
                  </p>

                  <a
                    href="#cta"
                    className={cn(
                      "group mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors duration-200",
                      p.popular
                        ? "bg-white text-ink hover:bg-aqua hover:text-ink"
                        : "bg-ink text-white hover:bg-brand-600",
                    )}
                  >
                    {p.cta}
                    <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <ul className="mt-8 space-y-3.5 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 grid size-5 shrink-0 place-items-center",
                            p.popular ? "bg-brand-500/30 text-brand-200" : "bg-brand-50 text-brand-600",
                          )}
                        >
                          <Icon name="check" className="size-3.5" />
                        </span>
                        <span className={p.popular ? "text-slate-200" : "text-ink-soft"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-muted">
            <Icon name="lock" className="size-4" /> 30-day money-back guarantee · SOC 2 Type II · GDPR compliant
          </p>
        </Reveal>
      </Container>
    </SectionEnter>
  );
}
