import { useEffect, useState } from "react";
import { Icon } from "./ui";
import { cn } from "../utils/cn";

type Line = { who: "prospect" | "rep"; name: string; text: string; tag?: string };

const script: Line[] = [
  { who: "prospect", name: "Dana · VP Ops, Northwind", text: "Honestly, your pricing is higher than Gong's. I'm not sure it's justified.", tag: "Pricing objection" },
  { who: "rep", name: "You", text: "Fair concern, Dana. Can I show you how teams ramp in under two weeks?" },
  { who: "prospect", name: "Dana · VP Ops, Northwind", text: "Maybe. We'd have to loop in procurement and legal first.", tag: "Buying signal" },
];

const suggestions = [
  {
    kicker: "Objection detected · Competitor: Gong",
    title: "Reframe on time-to-value",
    body: "“Most teams recover the price difference in the first quarter — here's what Acme Co. saw in 30 days.”",
  },
  {
    kicker: "Competitor talk track",
    title: "Lead with live coaching",
    body: "Gong reviews calls after the fact. We coach reps while the deal is still open.",
  },
  {
    kicker: "Next best action",
    title: "Offer the security packet",
    body: "Procurement mentioned. Share the SOC 2 report and propose a 15-min legal sync.",
  },
];

const crm = [
  { k: "Stage", v: "Negotiation", at: 1 },
  { k: "Competitor", v: "Gong", at: 1 },
  { k: "Objection", v: "Pricing", at: 2 },
  { k: "Next step", v: "Send security packet", at: 3 },
];

export function LiveCallDemo() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(4);
      return;
    }
    const id = window.setTimeout(() => setStep((s) => (s >= 4 ? 0 : s + 1)), step === 4 ? 4200 : 2600);
    return () => window.clearTimeout(id);
  }, [step, playing]);

  const visibleLines = script.slice(0, Math.min(step === 0 ? 1 : step, 3));
  const sugIndex = Math.max(0, Math.min(step - 1, 2));
  const showSug = step >= 1;
  const synced = step >= 4;

  return (
    <div className="relative">
      <div className="frame relative overflow-hidden border border-white/15 bg-ink text-white shadow-[12px_12px_0_0_rgba(109,94,246,0.35)]">
        <div className="bg-noise-dark pointer-events-none absolute inset-0" aria-hidden="true" />

        {/* Window chrome */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 bg-white/20" />
              <span className="size-2.5 bg-white/20" />
              <span className="size-2.5 bg-white/20" />
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-pulse-ring bg-red-400" />
                <span className="relative size-2 bg-red-400" />
              </span>
              Live · Northwind renewal
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden h-4 items-end gap-[3px] sm:flex" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <span
                  key={i}
                  className="h-full w-[3px] origin-bottom animate-wave bg-aqua/80"
                  style={{ animationDelay: `${i * 0.12}s`, animationPlayState: playing ? "running" : "paused" }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause demo animation" : "Play demo animation"}
              className="grid size-7 place-items-center border border-white/20 text-white transition hover:bg-white hover:text-ink"
            >
              <Icon name={playing ? "pause" : "play"} className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="relative grid gap-px bg-white/5 md:grid-cols-[1.15fr_1fr]" aria-hidden="true">
          {/* Transcript */}
          <div className="min-h-[19rem] bg-ink/60 p-4 sm:p-6">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Live transcript</p>
            <div className="space-y-3.5">
              {visibleLines.map((l, i) => (
                <div
                  key={`${l.text}`}
                  className={cn("animate-slide-up flex gap-3", l.who === "rep" && "flex-row-reverse")}
                  style={{ animationDelay: `${i === visibleLines.length - 1 ? 0 : 0}ms` }}
                >
                  <div
                    className={cn(
                      "grid size-8 shrink-0 place-items-center text-[11px] font-bold",
                      l.who === "rep" ? "bg-brand-500" : "bg-white/15",
                    )}
                  >
                    {l.who === "rep" ? "You" : "D"}
                  </div>
                  <div
                    className={cn(
                      "max-w-[85%] border px-3.5 py-2.5 text-[13px] leading-relaxed",
                      l.who === "rep" ? "border-brand-400/40 bg-brand-600/70" : "border-white/10 bg-white/10",
                    )}
                  >
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300/80">{l.name}</p>
                    {l.text}
                    {l.tag && (
                      <span className="mt-2 flex w-fit items-center gap-1.5 border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                        <span className="size-1.5 bg-amber-300" />
                        {l.tag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-1.5 pl-11 text-slate-400">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-pulse bg-slate-400"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Assist + CRM */}
          <div className="flex flex-col gap-4 bg-ink/40 p-4 sm:p-6">
            <div>
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-200">
                <Icon name="spark" className="size-3.5" /> Live assist
              </p>
              <div className="min-h-[8.75rem]">
                {showSug ? (
                  <div
                    key={sugIndex}
                    className="glass-dark animate-pop border-l-2 border-l-aqua p-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-aqua">{suggestions[sugIndex].kicker}</p>
                    <p className="mt-1.5 text-sm font-semibold">{suggestions[sugIndex].title}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">{suggestions[sugIndex].body}</p>
                  </div>
                ) : (
                  <div className="border border-dashed border-white/20 p-4 text-[13px] text-slate-400">
                    Listening for objections, competitors and buying signals…
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto">
              <p className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                <span className="flex items-center gap-2">
                  <Icon name="sync" className="size-3.5" /> CRM autofill
                </span>
                <span
                  className={cn(
                    "border px-2 py-0.5 text-[10px] normal-case tracking-normal transition-all duration-500",
                    synced ? "border-mint/40 bg-mint/15 text-mint" : "border-white/10 bg-white/5 text-slate-400",
                  )}
                >
                  {synced ? "Synced to Salesforce" : "Drafting…"}
                </span>
              </p>
              <dl className="space-y-1.5">
                {crm.map((f) => {
                  const filled = step >= f.at;
                  return (
                    <div
                      key={f.k}
                      className="flex items-center justify-between border border-white/10 bg-white/5 px-3 py-2 text-[12px]"
                    >
                      <dt className="text-slate-400">{f.k}</dt>
                      <dd
                        className={cn(
                          "font-semibold transition-all duration-500",
                          filled ? "translate-x-0 text-white opacity-100" : "translate-x-2 text-slate-500 opacity-60",
                        )}
                      >
                        {filled ? f.v : "—"}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <p className="sr-only">
        Animated product demo: as a prospect raises a pricing objection and mentions a competitor, Closewave shows the
        rep a talk track in real time and automatically fills in CRM fields.
      </p>
    </div>
  );
}
