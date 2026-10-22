import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Container, Icon, Reveal, SectionEnter, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

type Tab = {
  id: string;
  label: string;
  icon: string;
  title: string;
  body: string;
  points: string[];
  panel: ReactNode;
};

function ObjectionPanel() {
  const items = [
    { q: "“We're happy with our current vendor.”", a: "Ask: “What would need to be true for you to switch?” Then share the Lumen&Co migration story (3 weeks, zero downtime).", tone: "Status quo" },
    { q: "“This isn't a priority this quarter.”", a: "Quantify the cost of waiting: “Teams like yours lose ~11% of pipeline to slow follow-up each quarter.”", tone: "Timing" },
    { q: "“I need to run this by my CFO.”", a: "Offer an ROI one-pager tailored to the CFO and propose a 20-minute alignment call this week.", tone: "Authority" },
  ];
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div
          key={it.q}
          className="animate-slide-up border border-white/10 bg-white/5 p-4"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-white">{it.q}</p>
            <span className="shrink-0 border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
              {it.tone}
            </span>
          </div>
          <p className="mt-2 flex gap-2 text-[13px] leading-relaxed text-slate-300">
            <Icon name="spark" className="mt-0.5 size-3.5 text-aqua" />
            {it.a}
          </p>
        </div>
      ))}
    </div>
  );
}

function CompetitorPanel() {
  const rows = [
    { k: "Their pitch", v: "“All-in-one conversation analytics.”" },
    { k: "Concede", v: "Mature reporting and a large integration library." },
    { k: "Land mines", v: "Post-call only. Ask: “How do reps get help during the call?”" },
    { k: "Proof point", v: "Teams switching cut ramp time by 38%." },
  ];
  return (
    <div className="animate-slide-up border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center border border-white/20 bg-ink text-sm font-bold">G</span>
          <div>
            <p className="text-sm font-semibold">Battlecard · Gong</p>
            <p className="text-xs text-slate-400">Mentioned 2× on this call</p>
          </div>
        </div>
        <span className="border border-mint/30 bg-mint/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-mint">Updated today</span>
      </div>
      <dl className="mt-5 space-y-2.5">
        {rows.map((r) => (
          <div key={r.k} className="grid gap-1 border border-white/10 bg-white/5 p-3 text-[13px] sm:grid-cols-[6.5rem_1fr] sm:gap-3">
            <dt className="font-semibold text-brand-200">{r.k}</dt>
            <dd className="text-slate-200">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CrmPanel() {
  const fields = [
    { k: "Deal stage", from: "Discovery", to: "Negotiation" },
    { k: "Budget", from: "—", to: "$48,000 / yr" },
    { k: "Decision maker", from: "—", to: "Priya Shah, CFO" },
    { k: "Close date", from: "Sep 30", to: "Aug 28" },
    { k: "Risk", from: "—", to: "Procurement review" },
  ];
  return (
    <div className="animate-slide-up border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold">Northwind · Opportunity</p>
        <span className="flex items-center gap-1.5 border border-mint/30 bg-mint/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-mint">
          <Icon name="check" className="size-3" /> 5 fields synced
        </span>
      </div>
      <ul className="space-y-2">
        {fields.map((f, i) => (
          <li
            key={f.k}
            className="animate-slide-up flex items-center justify-between gap-3 border border-white/10 bg-white/5 px-3.5 py-2.5 text-[13px]"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-slate-400">{f.k}</span>
            <span className="flex items-center gap-2 text-right">
              <span className="text-slate-500 line-through decoration-slate-600">{f.from}</span>
              <Icon name="arrow" className="size-3.5 text-brand-400" />
              <span className="font-semibold text-white">{f.to}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const tabs: Tab[] = [
  {
    id: "objections",
    label: "Objection handling",
    icon: "target",
    title: "The perfect response, a heartbeat after the objection",
    body: "Closewave recognizes 40+ objection patterns and surfaces the answer your top performers use, in language that sounds like your brand.",
    points: ["Trained on your closed-won conversations", "Context-aware: segment, stage and persona", "Whisper-quiet UI that never distracts the rep"],
    panel: <ObjectionPanel />,
  },
  {
    id: "competitors",
    label: "Competitor talk tracks",
    icon: "swords",
    title: "Battlecards that show up exactly when they're needed",
    body: "No more digging through wikis. Mention a competitor and your rep gets a concise, always-fresh talk track with proof points.",
    points: ["Auto-detects 500+ vendors and aliases", "Managed by enablement, deployed instantly", "Track which talk tracks actually win deals"],
    panel: <CompetitorPanel />,
  },
  {
    id: "crm",
    label: "Automated CRM",
    icon: "sync",
    title: "Your CRM, always accurate. Zero typing.",
    body: "Closewave extracts the details that matter and writes them to the right fields, with a review step if you want one.",
    points: ["Native Salesforce & HubSpot sync", "Custom field mapping, MEDDICC & BANT ready", "Full audit trail on every change"],
    panel: <CrmPanel />,
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];

  const onKey = (e: KeyboardEvent) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <SectionEnter id="product" line="aqua" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="bg-noise-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="The product"
          title={
            <>
              One co-pilot. <span className="font-serif font-normal italic text-brand-200">Three superpowers.</span>
            </>
          }
          sub="Explore how Closewave helps your team respond, outmaneuver, and document, all in real time."
        />

        <Reveal delay={100} className="mt-12">
          <div
            role="tablist"
            aria-label="Product capabilities"
            onKeyDown={onKey}
            className="mx-auto flex w-full max-w-2xl gap-px border border-white/15 bg-white/5 p-1"
          >
            {tabs.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 px-2 py-2.5 text-xs font-semibold transition-colors duration-200 sm:px-4 sm:text-sm",
                  active === i
                    ? "bg-white text-ink"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon name={t.icon} className="hidden size-4 sm:block" />
                <span className="truncate">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal from="right" delay={160} className="mt-10">
          <div
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            key={tab.id}
            className="frame glass-dark animate-pop grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14"
          >
            <div>
              <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{tab.title}</h3>
              <p className="mt-4 leading-relaxed text-slate-300">{tab.body}</p>
              <ul className="mt-6 space-y-3">
                {tab.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-slate-200">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-brand-500/30 text-brand-200">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">{tab.panel}</div>
          </div>
        </Reveal>
      </Container>
    </SectionEnter>
  );
}
