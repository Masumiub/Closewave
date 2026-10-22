import { Container, CountUp, Reveal, SectionEnter } from "./ui";

const brands = [
  { name: "Northwind", style: "font-bold tracking-tight" },
  { name: "Lumen&Co", style: "font-serif text-2xl italic" },
  { name: "ACME Global", style: "font-extrabold tracking-widest text-sm" },
  { name: "Helix", style: "font-semibold tracking-[0.3em]" },
  { name: "Vertex", style: "font-bold italic" },
  { name: "Orbital", style: "font-medium tracking-wide lowercase text-xl" },
  { name: "Stratus", style: "font-serif text-2xl" },
  { name: "Kinetic", style: "font-black tracking-tighter" },
];

const stats = [
  { to: 2400, suffix: "+", label: "Revenue teams", decimals: 0 },
  { to: 38, suffix: "M", label: "Calls analyzed", decimals: 0 },
  { to: 27, suffix: "%", label: "Average win-rate lift", decimals: 0 },
  { to: 4.9, suffix: "/5", label: "Average rating on G2", decimals: 1 },
];

export function SocialProof() {
  const row = [...brands, ...brands];
  return (
    <SectionEnter aria-labelledby="proof-title" className="relative border-y border-line bg-white py-16">
      <Container>
        <Reveal>
          <p id="proof-title" className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Trusted by revenue leaders at fast-growing companies
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="fade-x mt-8 overflow-hidden" aria-hidden="true">
            <div className="flex w-max animate-marquee items-center gap-16 text-slate-400 hover:[animation-play-state:paused]">
              {row.map((b, i) => (
                <span key={i} className={`${b.style} whitespace-nowrap text-xl transition-colors hover:text-ink`}>
                  {b.name}
                </span>
              ))}
            </div>
          </div>
          <ul className="sr-only">
            {brands.map((b) => (
              <li key={b.name}>{b.name}</li>
            ))}
          </ul>
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="flex flex-col border-t border-ink pt-4 text-left">
              <dt className="order-2 mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{s.label}</dt>
              <dd className="text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </SectionEnter>
  );
}
