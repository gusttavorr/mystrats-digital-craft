import { motion } from "framer-motion";
import { Check } from "lucide-react";

const items = [
  { t: "Prazo que você pode cobrar", d: "Cronograma claro, etapas aprovadas, entrega no dia combinado." },
  { t: "Design único, nunca template", d: "Cada projeto desenhado do zero para a sua marca." },
  { t: "Suporte dedicado pós-entrega", d: "Você não fica sozinho depois do go-live." },
  { t: "Estratégia que converte", d: "Cada decisão de design pensada para gerar resultado." },
  { t: "Código limpo e SEO desde o início", d: "Performance, semântica e Core Web Vitals priorizados." },
];

export function WhyUs() {
  return (
    <section id="por-que" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="section-index">04 — Por que MYSTRATS</p>
          <h2 className="mt-6 text-balance text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold leading-[1.05]">
            Cinco compromissos que não negociamos.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.t}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`card-lift flex gap-4 rounded-3xl border border-border bg-background p-7 ${
                i === items.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-blue-soft text-brand-blue">
                <Check className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold">{item.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
