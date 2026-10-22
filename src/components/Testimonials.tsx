import { Container, Icon, Reveal, SectionEnter, SectionHeading } from "./ui";

const quotes = [
  {
    quote:
      "We went from guessing what happened on calls to knowing, live. Our reps handle pricing pushback with a confidence I've never seen, and win rate against our top rival is up 31%.",
    name: "Marcus Hale",
    role: "Chief Revenue Officer, Northwind",
    grad: "from-brand-500 to-aqua",
    featured: true,
  },
  {
    quote: "Friday CRM cleanup is gone. Forecast calls are now five minutes of strategy instead of an hour of interrogation.",
    name: "Priya Raman",
    role: "VP Sales, Lumen&Co",
    grad: "from-fuchsia-400 to-brand-500",
  },
  {
    quote: "The competitor talk tracks alone paid for the platform in the first month. New reps are productive in half the time.",
    name: "Daniel Okafor",
    role: "Head of Sales Enablement, Helix",
    grad: "from-mint to-aqua",
  },
  {
    quote: "It feels like having my best closer whispering in every rep's ear. The adoption was instant, which never happens.",
    name: "Sofia Alvarez",
    role: "Founder & CEO, Vertex",
    grad: "from-amber-400 to-fuchsia-400",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" className="size-4" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [featured, ...rest] = quotes;
  return (
    <SectionEnter id="testimonials" className="relative border-y border-line bg-[#f3f2ee] py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Customers"
          title={
            <>
              Loved by sellers. <span className="font-serif font-normal italic text-gradient">Trusted by CFOs.</span>
            </>
          }
          sub="Hear from the revenue leaders who replaced post-call regret with real-time confidence."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal from="left" className="lg:col-span-2 lg:row-span-2">
            <figure className="frame relative flex h-full flex-col justify-between overflow-hidden border border-ink bg-ink p-8 text-white sm:p-12">
              <div className="bg-noise-dark pointer-events-none absolute inset-0" aria-hidden="true" />
              <span className="pointer-events-none absolute -top-6 right-6 font-serif text-[10rem] leading-none text-white/10" aria-hidden="true">
                “
              </span>
              <div className="relative">
                <Stars />
                <blockquote className="mt-6 text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                  {featured.quote}
                </blockquote>
              </div>
              <figcaption className="relative mt-10 flex items-center gap-4">
                <span className={`grid size-12 place-items-center border border-white/20 bg-gradient-to-br ${featured.grad} font-semibold`}>
                  MH
                </span>
                <span>
                  <span className="block font-semibold">{featured.name}</span>
                  <span className="block text-sm text-slate-300">{featured.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {rest.map((q, i) => (
            <Reveal key={q.name} from="up" delay={(i + 1) * 140}>
              <figure className="flex h-full flex-col justify-between border border-line bg-white p-7 transition-colors duration-300 hover:border-ink">
                <div>
                  <Stars />
                  <blockquote className="mt-4 leading-relaxed text-ink-soft">“{q.quote}”</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className={`grid size-10 place-items-center bg-gradient-to-br ${q.grad} text-sm font-semibold text-white`}>
                    {q.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{q.name}</span>
                    <span className="block text-xs text-muted">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionEnter>
  );
}
