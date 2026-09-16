import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Globe, Palette, Rocket, ShoppingBag, Building2 } from "lucide-react";

const services = [
  { t: "Criação de Sites", d: "Sites únicos, desenvolvidos do zero conforme sua identidade e objetivos.", icon: Globe },
  { t: "Landing Pages", d: "Páginas de alta conversão para campanhas, lançamentos e captação.", icon: Rocket },
  { t: "E-commerce", d: "Lojas virtuais rápidas, seguras e prontas para escalar suas vendas.", icon: ShoppingBag },
  { t: "Sites Institucionais", d: "Presença sólida e profissional para sua empresa ou consultoria.", icon: Building2 },
  { t: "Identidade Visual Digital", d: "Marca, paleta e tipografia pensadas para a era digital.", icon: Palette },
  { t: "Consultoria em Presença Online", d: "Estratégia para você crescer com clareza e direção.", icon: Compass },
];

export function Services() {
  return (
    <section id="servicos" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="section-index">02 — Serviços</p>
          <h2 className="mt-6 text-balance text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold leading-[1.05]">
            Cada projeto desenvolvido do zero, com propósito.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Foco total na sua identidade e nos seus objetivos. Sem templates genéricos.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="card-lift flex h-full flex-col rounded-3xl border border-border bg-surface p-7"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue-soft text-brand-blue">
                <service.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-6 text-xl font-bold">{service.t}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.d}</p>
              <a
                href="#contato"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-foreground"
              >
                Saiba mais <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
