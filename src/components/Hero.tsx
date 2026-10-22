import { Button, Container, Icon, Reveal, SectionEnter } from "./ui";
import { LiveCallDemo } from "./LiveCallDemo";

export function Hero() {
  return (
    <SectionEnter id="top" line="none" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -left-32 top-0 size-[34rem] animate-float bg-brand-400/20 blur-[110px]" />
        <div className="absolute -right-24 top-24 size-[30rem] animate-float-slow bg-aqua/20 blur-[110px]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal from="down">
            <a
              href="#product"
              className="group inline-flex items-center gap-2.5 border border-ink/10 bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink-soft transition hover:border-ink/30"
            >
              <span className="bg-ink px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                New
              </span>
              Live competitor battlecards, now in every call
              <Icon name="arrow" className="size-4 text-brand-600 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-7 text-balance text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Win the deal <span className="font-serif font-normal italic text-gradient">while</span> the call is still
              live.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              Closewave listens to every sales conversation and whispers the right move in real time — objection
              handling, competitor talk tracks, and CRM updates that write themselves.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button href="#cta" size="lg">
                Start free for 14 days <Icon name="arrow" className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="#product" variant="secondary" size="lg">
                <Icon name="play" className="size-4 text-brand-600" /> Watch it in action
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              {["No credit card", "Set up in 10 minutes", "SOC 2 Type II"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Icon name="check" className="size-4 text-mint" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={400} className="relative mx-auto mt-16 max-w-5xl">
          <LiveCallDemo />

          {/* Floating chips */}
          <div className="glass absolute -left-3 -top-5 hidden animate-float items-center gap-3 px-4 py-3 lg:flex xl:-left-10">
            <span className="grid size-9 place-items-center border border-mint/40 bg-mint/10 text-emerald-700">
              <Icon name="chart" className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted">Win rate this quarter</p>
              <p className="text-sm font-semibold text-ink">+27% vs. last quarter</p>
            </div>
          </div>
          <div className="glass absolute -bottom-6 -right-3 hidden animate-float-slow items-center gap-3 px-4 py-3 lg:flex xl:-right-10">
            <span className="grid size-9 place-items-center border border-brand-200 bg-brand-50 text-brand-600">
              <Icon name="clock" className="size-5" />
            </span>
            <div>
              <p className="text-xs text-muted">Admin time saved / rep</p>
              <p className="text-sm font-semibold text-ink">6.4 hrs every week</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionEnter>
  );
}
