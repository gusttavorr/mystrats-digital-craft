import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Clock3, LayoutGrid, ShieldCheck, ShoppingCart, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import orbitMark from "@/assets/mystrats-orbit-mark-cropped.png";

const WHATSAPP_BASE = "https://wa.me/5511982975044";
const SHOWREEL = "/mystrats-showreel-smooth.mp4";

const chips = [
  { label: "Site institucional", prompt: "Quero um orçamento para um site institucional.", icon: Building2 },
  { label: "Landing page", prompt: "Quero um orçamento para uma landing page.", icon: Zap },
  { label: "E-commerce", prompt: "Quero um orçamento para um e-commerce.", icon: ShoppingCart },
  { label: "Catálogo digital", prompt: "Quero um orçamento para um catálogo digital.", icon: LayoutGrid },
];

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

  return (
    <section id="top" className="relative overflow-hidden bg-background pt-[76px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[16%] hero-dots opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[16%] hero-dots opacity-60" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-14 pt-12 text-center sm:px-8 md:pb-20 md:pt-16">
        <img
          src={orbitMark}
          alt="Símbolo MYSTRATS"
          width={884}
          height={812}
          className="rise-in rise-1 h-[72px] w-auto sm:h-[88px] lg:h-[104px]"
        />

        <p className="rise-in rise-2 mt-6 text-[10px] font-bold uppercase tracking-[0.26em] text-muted-foreground sm:text-[11px]">
          MYSTRATS <span className="px-1 text-brand-blue">•</span> Orçamento inteligente
        </p>

        <h1 className="rise-in rise-3 mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.25rem)] font-extrabold leading-[0.98] text-foreground">
          Quanto custa o seu próximo site?
        </h1>

        <p className="rise-in rise-4 mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
          Conte o que você precisa e receba uma estimativa personalizada de investimento e prazo.
        </p>

        <form
          onSubmit={submitEstimate}
          className="rise-in rise-5 mt-9 w-full max-w-3xl rounded-3xl border border-border bg-surface p-3 shadow-[0_22px_60px_color-mix(in_oklab,var(--ink)_9%,transparent)] sm:p-4"
        >
          <div className="flex min-h-14 items-center gap-2 rounded-full border border-border bg-background p-1.5 pl-4 transition-all focus-within:border-brand-blue focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand-blue)_14%,transparent)] sm:min-h-16 sm:pl-5">
            <Sparkles className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
            <input
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Conte como você imagina seu site..."
              aria-label="Conte como você imagina seu site"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Enviar pedido de orçamento"
              className="h-11 w-11 shrink-0 rounded-full bg-primary text-primary-foreground shadow-none transition-all duration-200 hover:scale-[1.03] hover:bg-brand-blue sm:h-12 sm:w-12"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {chips.map((chip) => (
              <Button
                key={chip.label}
                type="button"
                variant="outline"
                onClick={() => {
                  setMessage(chip.prompt);
                  requestAnimationFrame(() => inputRef.current?.focus());
                }}
                className="h-10 min-w-0 rounded-full border-border bg-background px-2 text-[11px] font-medium text-foreground shadow-none transition-all duration-200 hover:scale-[1.03] hover:border-brand-blue hover:bg-brand-blue hover:text-accent-foreground sm:px-3 sm:text-xs"
              >
                <chip.icon className="h-3.5 w-3.5" />
                <span className="truncate">{chip.label}</span>
              </Button>
            ))}
          </div>
        </form>

        <p className="rise-in rise-6 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-medium text-muted-foreground sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-blue" />
            Estimativa personalizada
          </span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-brand-blue" />
            Prazo de entrega
          </span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5">
            <LayoutGrid className="h-3.5 w-3.5 text-brand-blue" />
            Escopo do projeto
          </span>
        </p>

        <Button
          asChild
          className="rise-in rise-6 mt-8 h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-none transition-all duration-200 hover:scale-[1.03] hover:bg-brand-blue"
        >
          <a href="#contato">
            Solicitar proposta <ArrowRight />
          </a>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1400px] px-5 pb-16 sm:px-8 md:pb-24 lg:px-14"
      >
        <div className="overflow-hidden rounded-3xl border border-border bg-foreground">
          <video
            src={SHOWREEL}
            className="aspect-video h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Showreel MYSTRATS"
          />
        </div>
        <p className="mt-4 text-center font-mono-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:text-[11px]">
          MYSTRATS — Our work in motion
        </p>
      </motion.div>
    </section>
  );
}
