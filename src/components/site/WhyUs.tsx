import { Reveal } from "./Reveal";
import { Clock, Sparkles, LifeBuoy, Target, Code2 } from "lucide-react";

const items = [
  { icon: Clock, t: "Prazo que você pode cobrar", d: "Cronograma claro, etapas aprovadas, entrega no dia combinado." },
  { icon: Sparkles, t: "Design único, nunca template", d: "Cada projeto desenhado do zero para a sua marca." },
  { icon: LifeBuoy, t: "Suporte dedicado pós-entrega", d: "Você não fica sozinho depois do go-live." },
  { icon: Target, t: "Estratégia que converte", d: "Cada decisão de design pensada para gerar resultado." },
  { icon: Code2, t: "Código limpo e SEO desde o início", d: "Performance, semântica e Core Web Vitals priorizados." },
];

export function WhyUs() {
  return (
    <section id="por-que" className="relative sand-flow sand-flow--bu py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-muted-foreground">
            (04) Por que MYSTRATS
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            Cinco compromissos que <span className="text-muted-foreground">não negociamos.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <div className="group h-full bg-card p-8 transition-colors hover:bg-popover">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-border transition-transform group-hover:rotate-12">
                  <it.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}