import { useState, type FormEvent } from "react";
import { Container, Icon, Reveal, SectionEnter } from "./ui";

export function CTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <SectionEnter id="cta" line="none" className="px-3 pb-8 sm:px-6">
      <Container className="max-w-7xl px-0 sm:px-0">
        <Reveal from="up">
          <div className="frame relative overflow-hidden border border-ink bg-ink px-6 py-20 text-center text-white sm:px-12 sm:py-28">
            <div className="bg-noise-dark pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-20 -top-20 size-80 animate-float bg-brand-500/30 blur-[100px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 animate-float-slow bg-aqua/25 blur-[100px]" aria-hidden="true" />

            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
                Your next call could be your <span className="font-serif font-normal italic text-brand-200">best one yet.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
                Join 2,400+ revenue teams closing more deals with real-time intelligence. Start your free trial in
                minutes.
              </p>

              {done ? (
                <div
                  role="status"
                  className="glass-dark mx-auto mt-10 flex max-w-md animate-pop items-center justify-center gap-3 border-l-2 border-l-mint px-6 py-5"
                >
                  <span className="grid size-8 place-items-center border border-mint/40 bg-mint/15 text-mint">
                    <Icon name="check" className="size-4" />
                  </span>
                  <p className="text-left text-sm">
                    <span className="block font-semibold">You're on the list!</span>
                    <span className="text-slate-300">We'll email {email} to set up your trial.</span>
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row" noValidate={false}>
                  <label htmlFor="cta-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-dark min-w-0 flex-1 px-5 py-4 text-base text-white placeholder:text-slate-400 transition focus:border-aqua focus:bg-white/10 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 bg-white px-7 py-4 font-semibold text-ink transition-colors duration-200 hover:bg-aqua"
                  >
                    Start free trial
                    <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
              <p className="mt-5 text-sm text-slate-400">14-day free trial · No credit card required · Cancel anytime</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionEnter>
  );
}
