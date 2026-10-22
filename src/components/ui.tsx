import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

function useOnScreen<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
  from = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right" | "down";
  as?: ElementType;
}) {
  const { ref, visible } = useOnScreen<HTMLElement>(0.2);

  return (
    <Tag
      ref={ref}
      data-from={from}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---------- Section entrance ---------- */
export function SectionEnter({
  children,
  className,
  id,
  line = "ink",
  as: Tag = "section",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  line?: "ink" | "aqua" | "none";
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "id" | "children">) {
  const { ref, visible } = useOnScreen<HTMLElement>(0.12);

  return (
    <Tag
      ref={ref}
      id={id}
      data-line={line}
      className={cn("section-enter", visible && "is-in", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------- Count up ---------- */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVal(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setVal(to * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Spotlight handler ---------- */
export function spotlightMove(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ---------- Layout ---------- */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2.5 border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
            dark ? "border-white/20 text-brand-200" : "border-ink/15 bg-white text-ink",
          )}
        >
          <span className={cn("h-3 w-px", dark ? "bg-aqua" : "bg-brand-600")} />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={cn(
            "mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl",
            dark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={160}>
          <p className={cn("mt-5 text-pretty text-lg leading-relaxed", dark ? "text-slate-300" : "text-muted")}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Buttons ---------- */
export function Button({
  children,
  href = "#",
  variant = "primary",
  className,
  size = "md",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "light" | "ghost-dark";
  className?: string;
  size?: "md" | "lg";
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-semibold tracking-tight transition-colors duration-200";
  const sizes = { md: "px-4 py-2.5 text-sm", lg: "px-6 py-3.5 text-base" };
  const variants = {
    primary: "bg-ink text-white hover:bg-brand-600",
    secondary: "bg-transparent text-ink ring-1 ring-ink/80 hover:bg-ink hover:text-white",
    light: "bg-white text-ink hover:bg-brand-50",
    "ghost-dark": "bg-transparent text-white ring-1 ring-white/30 hover:bg-white hover:text-ink",
  };
  return (
    <a href={href} className={cn(base, sizes[size], variants[variant], className)}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

/* ---------- Icons ---------- */
const paths: Record<string, ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  shield: <path d="M12 3 5 6v5.5c0 4.2 2.9 7.7 7 9.5 4.1-1.8 7-5.3 7-9.5V6l-7-3Zm-3 9 2.2 2.2L15.5 10" />,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  swords: <path d="m14.5 17.5 6-6V4h-7.5l-6 6m3.5 4-3 3m-2-5 3 3m-6 0 2-2m5-12L4 11m0 0-1 5 3 3 5-1" />,
  sync: <path d="M20 11a8 8 0 0 0-14-4L4 9m0-5v5h5m-5 4a8 8 0 0 0 14 4l2-2m0 5v-5h-5" />,
  chart: <path d="M4 20V10m6 10V4m6 16v-7m5 7H3" />,
  mic: <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm-7 9a7 7 0 0 0 14 0m-7 7v3" />,
  lock: <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="m12 2.8 2.75 5.9 6.45.8-4.75 4.4 1.25 6.4L12 17.1l-5.7 3.2 1.25-6.4L2.8 9.5l6.45-.8L12 2.8Z"
    />
  ),
  play: <path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5Z" />,
  pause: <path fill="currentColor" stroke="none" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  users: <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20m16 0v-1.5a3.5 3.5 0 0 0-2.5-3.35M10 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm5.5-6.85a3.5 3.5 0 0 1 0 6.7" />,
  spark: <path d="M12 3v4m0 10v4M3 12h4m10 0h4m-14.2-6.2 2.8 2.8m8.8 8.8 2.8 2.8m0-14.4-2.8 2.8m-8.8 8.8-2.8 2.8" />,
};

export function Icon({ name, className }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-5 shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight", className)}>
      <span className="relative grid size-8 place-items-center bg-ink">
        <span className="flex h-3.5 items-center gap-[2px]" aria-hidden="true">
          {[0.5, 1, 0.65, 0.9, 0.4].map((h, i) => (
            <span key={i} className="w-[2px] bg-aqua" style={{ height: `${h * 100}%` }} />
          ))}
        </span>
      </span>
      <span className={cn("text-[1.15rem]", dark ? "text-white" : "text-ink")}>Closewave</span>
    </span>
  );
}
