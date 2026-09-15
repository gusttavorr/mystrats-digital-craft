import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Building2, Clock3, LayoutGrid, ShieldCheck, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import orbitMark from "@/assets/mystrats-orbit-mark-cropped.png";

const WHATSAPP_BASE = "https://wa.me/5511982975044";

const suggestions = [
  { label: "Site institucional", prompt: "Quero um orçamento para um site institucional.", icon: Building2 },
  { label: "Landing page", prompt: "Quero um orçamento para uma landing page.", icon: Zap },
  { label: "E-commerce", prompt: "Quero um orçamento para um e-commerce.", icon: ShoppingCart },
  { label: "Catálogo digital", prompt: "Quero um orçamento para um catálogo digital.", icon: LayoutGrid },
];

const dots = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  side: index % 2 === 0 ? "left" : "right",
  top: 8 + ((index * 17) % 84),
  offset: 2 + ((index * 29) % 25),
  size: 2 + (index % 4),
  opacity: 0.16 + (index % 5) * 0.1,
  delay: (index % 7) * -0.7,
}));

export function Hero() {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submitEstimate = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    const text = `Olá! Vim pelo site da MYSTRATS. ${trimmed}`;
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const selectSuggestion = (prompt: string) => {
    setMessage(prompt);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <section id="top" className="relative flex min-h-[min(940px,100svh)] overflow-hidden bg-hero-bg pt-[72px] text-hero-ink">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {dots.map((dot) => (
          <span
            key={dot.id}
            className="hero-dot absolute rounded-full bg-hero-ink"
            style={{
              top: `${dot.top}%`,
              [dot.side]: `${dot.offset}%`,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-5 pb-10 pt-8 text-center sm:px-8 md:pb-14 md:pt-10">
        <img
          src={orbitMark}
          alt="Símbolo MYSTRATS"
          width={884}
          height={812}
          className="hero-enter hero-enter-1 h-[76px] w-auto sm:h-[94px] lg:h-[112px]"
        />

        <p className="hero-enter hero-enter-2 mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-hero-muted sm:text-xs">
          MYSTRATS <span className="px-1 text-hero-blue">•</span> Orçamento inteligente
        </p>

        <h1 className="hero-title hero-enter hero-enter-3 mt-5 max-w-4xl text-balance text-[clamp(2.55rem,7.2vw,5.75rem)] font-semibold leading-[0.94] tracking-normal text-hero-ink">
          Quanto custa o seu
          <br className="hidden sm:block" /> próximo site?
        </h1>

        <p className="hero-enter hero-enter-4 mt-5 max-w-2xl text-balance text-sm leading-relaxed text-hero-muted sm:text-base md:text-lg">
          Conte o que você precisa e receba uma estimativa personalizada de investimento e prazo.
        </p>

        <form onSubmit={submitEstimate} className="hero-enter hero-enter-5 mt-7 w-full max-w-3xl rounded-[24px] border border-hero-border bg-hero-panel p-2.5 shadow-[0_24px_70px_color-mix(in_oklab,var(--hero-ink)_10%,transparent)] sm:p-4">
          <div className="flex min-h-14 items-center gap-2 rounded-full border border-hero-border bg-hero-bg p-1.5 pl-4 transition-all focus-within:border-hero-blue focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--hero-blue)_12%,transparent)] sm:min-h-16 sm:pl-5">
            <Sparkles className="h-5 w-5 shrink-0 text-hero-blue" aria-hidden="true" />
            <input
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Conte como você imagina seu site..."
              aria-label="Conte como você imagina seu site"
              className="min-w-0 flex-1 bg-transparent text-sm text-hero-ink outline-none placeholder:text-hero-muted sm:text-base"
            />
            <Button type="submit" size="icon" aria-label="Enviar pedido de orçamento" className="h-11 w-11 shrink-0 rounded-full bg-hero-ink text-hero-bg shadow-none transition-transform hover:scale-[1.04] hover:bg-hero-blue sm:h-12 sm:w-12">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-3 sm:grid-cols-4">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.label}
                type="button"
                variant="outline"
                onClick={() => selectSuggestion(suggestion.prompt)}
                className="h-10 min-w-0 rounded-full border-hero-border bg-hero-bg px-2 text-[11px] font-medium text-hero-ink shadow-none transition-all hover:scale-[1.02] hover:border-hero-blue hover:bg-hero-blue hover:text-hero-bg sm:px-3 sm:text-xs"
              >
                <suggestion.icon className="h-3.5 w-3.5" />
                <span className="truncate">{suggestion.label}</span>
              </Button>
            ))}
          </div>
        </form>

        <div className="hero-enter hero-enter-6 mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-medium text-hero-muted sm:text-xs">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-hero-blue" />Estimativa personalizada</span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-hero-blue" />Prazo de entrega</span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5"><LayoutGrid className="h-3.5 w-3.5 text-hero-blue" />Escopo do projeto</span>
        </div>
      </div>
    </section>
  );
}