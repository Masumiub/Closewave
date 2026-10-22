import { Container, Icon, Reveal, SectionEnter, SectionHeading, spotlightMove } from "./ui";

const features = [
  {
    icon: "target",
    title: "Objection-handling prompts",
    body: "The moment a prospect says “too expensive” or “bad timing,” your rep sees a proven, on-brand response — tuned from your own best closed-won calls.",
    accent: "from-brand-500 to-brand-400",
  },
  {
    icon: "swords",
    title: "Competitor talk tracks",
    body: "Name-drop a rival and a battlecard appears instantly: strengths to concede, landmines to set, and proof points that win.",
    accent: "from-aqua to-brand-400",
  },
  {
    icon: "sync",
    title: "Automated CRM updates",
    body: "Stage, next steps, budget, decision-makers, and risks flow into Salesforce or HubSpot before the call ends. No more Friday data entry.",
    accent: "from-mint to-aqua",
  },
  {
    icon: "chart",
    title: "Deal risk & momentum",
    body: "See which deals are warming up or quietly stalling, based on what buyers actually say, not what reps remember.",
    accent: "from-fuchsia-400 to-brand-500",
  },
  {
    icon: "users",
    title: "Live manager coaching",
    body: "Spot struggling calls in real time and send a private nudge. Scale your best seller's instincts across the entire team.",
    accent: "from-amber-400 to-fuchsia-400",
  },
  {
    icon: "shield",
    title: "Enterprise-grade security",
    body: "SOC 2 Type II, SSO, role-based access, regional data residency, and configurable retention. Your conversations stay yours.",
    accent: "from-brand-600 to-aqua",
  },
];

export function Features() {
  return (
    <SectionEnter id="features" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything your team needs to <span className="font-serif font-normal italic text-gradient">say the right thing</span>
            </>
          }
          sub="Stop guessing in the moment and stop typing notes after. Closewave turns every conversation into a closing advantage."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} from={i % 2 === 0 ? "left" : "right"} delay={(i % 3) * 120} className="h-full">
              <article
                onMouseMove={spotlightMove}
                className="spotlight group h-full border border-line bg-white p-7 transition-colors duration-300 hover:border-ink"
              >
                <span
                  className={`grid size-11 place-items-center bg-gradient-to-br ${f.accent} text-white`}
                >
                  <Icon name={f.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionEnter>
  );
}
