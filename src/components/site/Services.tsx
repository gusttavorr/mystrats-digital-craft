import { Reveal } from "./Reveal";
import { Globe, Rocket, ShoppingBag, Building2, Palette, Compass, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Globe, t: "Criação de Sites", d: "Sites únicos, desenvolvidos do zero conforme sua identidade e objetivos." },
  { icon: Rocket, t: "Landing Pages", d: "Páginas de alta conversão para campanhas, lançamentos e captação." },
  { icon: ShoppingBag, t: "E-commerce", d: "Lojas virtuais rápidas, seguras e prontas para escalar suas vendas." },
  { icon: Building2, t: "Sites Institucionais", d: "Presença sólida e profissional para sua empresa ou consultoria." },
  { icon: Palette, t: "Identidade Visual Digital", d: "Marca, paleta e tipografia pensadas para a era digital." },
  { icon: Compass, t: "Consultoria em Presença Online", d: "Estratégia para você crescer com clareza e direção." },
];

export function Services() {
  return (
    <section id="servicos" className="relative section-gradient-2 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-muted-foreground">
              (02) Serviços
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
              Cada projeto desenvolvido
              <br />
              <span className="text-muted-foreground">do zero, com propósito.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-sm text-muted-foreground">
              Foco total na sua identidade e nos seus objetivos. Sem templates genéricos.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="card-hover group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-foreground/[0.03] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                <s.icon className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                <h3 className="mt-8 font-display text-2xl font-bold">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <a
                  href="#contato"
                  className="mt-8 inline-flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-foreground/80 transition-colors group-hover:text-foreground"
                >
                  Saiba mais
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}