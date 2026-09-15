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
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-hero-border bg-hero-bg/95 transition-shadow duration-300 backdrop-blur-xl ${scrolled ? "shadow-[0_8px_30px_color-mix(in_oklab,var(--hero-ink)_7%,transparent)]" : ""}`}>
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-16">
        <a href="#top" className="flex shrink-0 items-center" aria-label="MYSTRATS — início">
          <img src={wordmark} alt="MYSTRATS" width={1154} height={138} className="h-[21px] w-auto sm:h-6" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-hero-muted transition-colors hover:text-hero-blue"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button asChild className="hidden h-11 rounded-full bg-hero-ink px-5 text-hero-bg shadow-none transition-transform hover:scale-[1.02] hover:bg-hero-blue lg:inline-flex">
          <a href="#contato">Falar com a gente <ArrowRight /></a>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full text-hero-ink hover:bg-hero-panel lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={`absolute inset-x-0 top-[72px] border-b border-hero-border bg-hero-bg px-5 py-6 shadow-lg transition-all duration-300 lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1440px] flex-col gap-1" aria-label="Navegação móvel">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 font-medium text-hero-ink transition-colors hover:bg-hero-panel hover:text-hero-blue"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="mt-4 h-11 rounded-full bg-hero-ink text-hero-bg hover:bg-hero-blue">
            <a href="#contato" onClick={() => setOpen(false)}>Falar com a gente <ArrowRight /></a>
          </Button>
        </nav>
      </div>
    </header>
  );
}