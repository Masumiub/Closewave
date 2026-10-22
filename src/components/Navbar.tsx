import { useEffect, useState } from "react";
import { Button, Container, Icon, Logo } from "./ui";
import { cn } from "../utils/cn";

const links = [
  { href: "#features", label: "Features" },
  { href: "#product", label: "Product" },
  { href: "#benefits", label: "Results" },
  { href: "#testimonials", label: "Customers" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Container
        className={cn(
          "relative max-w-7xl overflow-hidden border-b px-5 transition-colors duration-300 sm:px-8",
          scrolled || open ? "border-line bg-white/90 py-2.5 backdrop-blur-md" : "border-transparent py-4",
        )}
      >
        <nav className="flex items-center justify-between" aria-label="Primary">
          <a href="#top" aria-label="Closewave home">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a href="#" className="px-3 text-sm font-medium text-muted transition-colors hover:text-ink">
              Sign in
            </a>
            <Button href="#cta">
              Book a demo <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center border border-transparent text-ink transition-colors hover:border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={cn(
            "grid transition-all duration-500 lg:hidden",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
          inert={!open}
        >
          <div className="overflow-hidden">
            <ul className="mt-3 flex flex-col gap-1 border-t border-line pt-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line px-1 py-3 text-base font-medium text-ink-soft hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mb-2 mt-3 flex flex-col gap-2">
              <Button href="#cta" size="lg" className="w-full">
                Book a demo
              </Button>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-600 transition-opacity"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
          aria-hidden="true"
        />
      </Container>
    </header>
  );
}
