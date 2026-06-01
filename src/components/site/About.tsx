import { Reveal } from "./Reveal";

const values = [
  { k: "01", t: "Estratégia", d: "Cada pixel ancorado num objetivo de negócio claro." },
  { k: "02", t: "Criatividade", d: "Design único, nunca template. Sua marca em primeiro plano." },
  { k: "03", t: "Resultado", d: "Sites que convertem e marcas que ficam na memória." },
];

export function About() {
  return (
    <section id="sobre" className="relative sand-flow sand-flow--br py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-muted-foreground">
            (01) Quem somos
          </p>
        </Reveal>
        <div className="mt-6 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
              Empresas com grande potencial não merecem
              <span className="text-muted-foreground"> sites amadores.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-5">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              A MYSTRATS nasceu para resolver um problema real. Unimos design
              estratégico, tecnologia de ponta e copy de impacto para criar sites
              que trabalham por você <span className="text-foreground">24h por dia</span>.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.k} delay={i * 120}>
              <div className="h-full bg-card p-8 md:p-10">
                <div className="font-mono-tech text-xs text-muted-foreground">{v.k}</div>
                <h3 className="mt-6 font-display text-3xl font-bold">{v.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}