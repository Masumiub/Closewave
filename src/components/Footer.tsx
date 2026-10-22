import { Container, Logo, Reveal, SectionEnter } from "./ui";

const cols = [
  { title: "Product", links: ["Live assist", "Battlecards", "CRM automation", "Deal intelligence", "Integrations"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Blog", "Playbook library", "Help center", "API docs", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA", "Cookies"] },
];

export function Footer() {
  return (
    <SectionEnter as="footer" className="pb-10 pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <Reveal from="left" className="max-w-xs">
            <a href="#top" aria-label="Closewave home">
              <Logo />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Real-time sales call intelligence that helps revenue teams respond better, outmaneuver competitors, and
              keep their CRM spotless.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 border border-line bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
              <span className="size-2 bg-mint" /> All systems operational
            </p>
          </Reveal>

          <Reveal from="right" delay={120}>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="text-sm font-semibold">{c.title}</h3>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-brand-600"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
            <p>© {new Date().getFullYear()} Closewave, Inc. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="transition-colors hover:text-ink">LinkedIn</a>
              <a href="#" className="transition-colors hover:text-ink">X / Twitter</a>
              <a href="#" className="transition-colors hover:text-ink">YouTube</a>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionEnter>
  );
}
