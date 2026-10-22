import { Container, CountUp, Icon, Reveal, SectionEnter, SectionHeading } from "./ui";

const benefits = [
  {
    icon: "bolt",
    metric: { to: 38, suffix: "%", decimals: 0 },
    title: "Faster ramp for new reps",
    body: "New hires sell like veterans in weeks, not quarters, with live guidance on every call.",
  },
  {
    icon: "clock",
    metric: { to: 6.4, suffix: " hrs", decimals: 1 },
    title: "Admin time saved per rep, weekly",
    body: "Reps sell. Closewave documents. Your CRM stays current without anyone chasing updates.",
  },
  {
    icon: "chart",
    metric: { to: 27, suffix: "%", decimals: 0 },
    title: "Higher win rate on competitive deals",
    body: "Consistent, confident competitor handling turns head-to-head deals your way.",
  },
  {
    icon: "target",
    metric: { to: 94, suffix: "%", decimals: 0 },
    title: "Forecast accuracy",
    body: "Pipeline built on what buyers actually said gives leadership numbers they can bet on.",
  },
];

export function Benefits() {
  return (
    <SectionEnter id="benefits" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-0 mx-auto h-96 max-w-4xl bg-brand-200/25 blur-[120px]" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Results"
          title={
            <>
              Built for leaders who care about <span className="font-serif font-normal italic text-gradient">revenue, not reports</span>
            </>
          }
          sub="Closewave pays for itself by improving the three numbers you're measured on: win rate, velocity, and forecast confidence."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b.title} from={i % 2 === 0 ? "up" : "right"} delay={(i % 2) * 140}>
              <article className="group relative h-full overflow-hidden border border-line bg-white p-8 transition-colors duration-300 hover:border-ink">
                <div className="absolute -right-10 -top-10 size-40 bg-gradient-to-br from-brand-100 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-4">
                  <p className="text-5xl font-semibold tracking-tight text-gradient sm:text-6xl">
                    <CountUp to={b.metric.to} suffix={b.metric.suffix} decimals={b.metric.decimals} />
                  </p>
                  <span className="grid size-11 place-items-center border border-brand-200 bg-brand-50 text-brand-600 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <Icon name={b.icon} />
                  </span>
                </div>
                <h3 className="relative mt-6 text-xl font-semibold tracking-tight">{b.title}</h3>
                <p className="relative mt-2 leading-relaxed text-muted">{b.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-5 flex flex-col items-start gap-5 border border-ink bg-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">Average payback period: 47 days</p>
              <p className="mt-2 max-w-xl text-slate-300">
                Based on 600+ customer deployments, comparing win rate, cycle length, and admin hours before and after
                Closewave.
              </p>
            </div>
            <a
              href="#pricing"
              className="group inline-flex shrink-0 items-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-aqua"
            >
              See pricing <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </Container>
    </SectionEnter>
  );
}
