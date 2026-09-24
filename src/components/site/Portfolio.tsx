import { useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: "Landing Page" | "E-commerce" | "Institucional" | "Portfólio";
  span: string;
  ratio: string;
  img?: string;
  href?: string;
};

const projects: Project[] = [
  {
    title: "Duo Freitas",
    category: "Portfólio",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
    img: "https://image.thum.io/get/width/800/crop/500/noanimate/https://duofreitas.vercel.app",
    href: "https://duofreitas.vercel.app",
  },
  {
    title: "Maiara Fonseca Estética",
    category: "Institucional",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
    img: "https://image.thum.io/get/width/800/crop/500/noanimate/https://maiarafonsecaestetica.online",
    href: "https://maiarafonsecaestetica.online",
  },
  {
    title: "Loja Virtual — Moda",
    category: "E-commerce",
    span: "md:col-span-2 md:row-span-2",
    ratio: "aspect-[4/5]",
  },
  {
    title: "Landing Page — Consultoria",
    category: "Landing Page",
    span: "",
    ratio: "aspect-[4/3]",
  },
  {
    title: "Site Institucional — Clínica",
    category: "Institucional",
    span: "",
    ratio: "aspect-[4/3]",
  },
  {
    title: "Portfólio — Fotógrafo",
    category: "Portfólio",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
  },
  {
    title: "App SaaS — Fintech",
    category: "Landing Page",
    span: "",
    ratio: "aspect-[4/3]",
  },
  {
    title: "Landing — Infoproduto",
    category: "Landing Page",
    span: "",
    ratio: "aspect-[4/3]",
  },
];

const filters = ["Todos", "Landing Page", "E-commerce", "Institucional", "Portfólio"] as const;

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const galleryScale = useTransform(scrollYProgress, [0.05, 0.42], [0.82, 1]);
  const galleryOpacity = useTransform(scrollYProgress, [0.05, 0.28], [0.35, 1]);

  const list = useMemo(
    () => (filter === "Todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section ref={sectionRef} id="portfolio" className="relative bg-background py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-muted-foreground">
              (03) Trabalhos selecionados
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
              Projetos que <span className="text-muted-foreground">falam por si.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-foreground/80 backdrop-blur">
                <span className="portfolio-counter-dot" aria-hidden />
                {list.length} projetos exibidos
              </div>
              <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <Button
                  key={f}
                  type="button"
                  variant="outline"
                  onClick={() => setFilter(f)}
                  className={`h-8 rounded-full border px-4 font-mono-tech text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    filter === f
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {f}
                </Button>
              ))}
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div style={{ scale: galleryScale, opacity: galleryOpacity }} className="mt-16 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 md:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.title + filter} delay={i * 80} className={p.span}>
              <a
                href={p.href ?? "#contato"}
                target={p.href ? "_blank" : undefined}
                rel={p.href ? "noopener noreferrer" : undefined}
                className="portfolio-scan-card group relative block h-full overflow-hidden rounded-2xl border border-border bg-card"
                style={{ "--portfolio-delay": `${i * 80}ms` } as CSSProperties}
              >
                <div className={`${p.ratio} gradient-placeholder relative w-full overflow-hidden`}>
                  {p.img ? <img
                    src={p.img}
                    alt={`Página inicial do projeto ${p.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  /> : <div className="absolute inset-0 grid place-items-center p-6 text-center text-ink-invert">
                    <div><span className="rounded-full border border-ink-invert/20 px-3 py-1 font-mono-tech text-[9px] uppercase tracking-[0.18em]">{p.category}</span><p className="mt-4 text-xl font-bold">{p.title}</p></div>
                  </div>}
                </div>
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 z-[4] flex items-end justify-between p-6">
                  <div>
                    <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {p.category}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold leading-tight md:text-2xl">
                      {p.title}
                    </h3>
                  </div>
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background/60 backdrop-blur transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}