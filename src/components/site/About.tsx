import { motion } from "framer-motion";
import { Compass, Palette, TrendingUp } from "lucide-react";

const cards = [
  { n: "01", t: "Estratégia", d: "Cada pixel ancorado num objetivo de negócio claro.", icon: Compass },
  { n: "02", t: "Criatividade", d: "Design único, nunca template. Sua marca em primeiro plano.", icon: Palette },
  { n: "03", t: "Resultado", d: "Sites que convertem e marcas que ficam na memória.", icon: TrendingUp },
];

export function About() {
  return (
    <section id="sobre" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="section-index">01 — Quem somos</p>
          <h2 className="mt-6 text-balance text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold leading-[1.05]">
            Empresas com grande potencial não merecem sites amadores.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            A MYSTRATS nasceu para resolver um problema real. Unimos design estratégico, tecnologia de
            ponta e copy de impacto para criar sites que trabalham por você 24h por dia.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.article
              key={card.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="card-lift rounded-3xl border border-border bg-background p-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                  <card.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="section-index">{card.n}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{card.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.d}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
