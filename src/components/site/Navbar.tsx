import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import wordmark from "@/assets/mystrats-wordmark-black-cropped.png";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#por-que", label: "Por que nós" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/95 shadow-[0_6px_24px_color-mix(in_oklab,var(--ink)_7%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a href="#top" className="flex shrink-0 items-center" aria-label="MYSTRATS — início">
          <img src={wordmark} alt="MYSTRATS" width={1154} height={138} fetchPriority="high" className={`h-[20px] w-auto transition-[filter] sm:h-[23px] ${scrolled ? "" : "invert"}`} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[13px] font-medium transition-colors hover:text-brand-blue ${scrolled ? "text-muted-foreground" : "text-ink-invert/70"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Button
          asChild
          className="hidden h-11 rounded-full bg-primary px-5 text-primary-foreground shadow-none transition-all duration-200 hover:scale-[1.03] hover:bg-brand-blue lg:inline-flex"
        >
          <a href="#contato">
            Falar com a gente <ArrowRight />
          </a>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`rounded-full hover:bg-surface lg:hidden ${scrolled ? "text-foreground" : "text-ink-invert"}`}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={`absolute inset-x-0 top-[76px] border-b border-border bg-background px-5 py-5 shadow-lg transition-all duration-300 lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] flex-col gap-1" aria-label="Navegação móvel">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 font-medium text-foreground transition-colors hover:bg-surface hover:text-brand-blue"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="mt-3 h-11 rounded-full bg-primary text-primary-foreground hover:bg-brand-blue">
            <a href="#contato" onClick={() => setOpen(false)}>
              Falar com a gente <ArrowRight />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
