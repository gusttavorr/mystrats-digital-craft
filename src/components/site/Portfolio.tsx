import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

type Project = {
  title: string;
  category: "Landing Page" | "E-commerce" | "Institucional" | "Portfólio";
  span: string;
  ratio: string;
  img: string;
};

const projects: Project[] = [
  {
    title: "Loja Virtual — Moda",
    category: "E-commerce",
    span: "md:col-span-2 md:row-span-2",
    ratio: "aspect-[4/5]",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title: "Landing Page — Consultoria",
    category: "Landing Page",
    span: "",
    ratio: "aspect-[4/3]",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&auto=format&fit=crop&q=80",
  },
  {
    title: "Site Institucional — Clínica",
    category: "Institucional",
    span: "",
    ratio: "aspect-[4/3]",
    img: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1000&auto=format&fit=crop&q=80",
  },
  {
    title: "Portfólio — Fotógrafo",
    category: "Portfólio",
    span: "md:col-span-2",
    ratio: "aspect-[16/9]",
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1400&auto=format&fit=crop&q=80",
  },
  {
    title: "App SaaS — Fintech",
    category: "Landing Page",
    span: "",
    ratio: "aspect-[4/3]",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
  },
  {
    title: "Landing — Infoproduto",
    category: "Landing Page",
    span: "",
    ratio: "aspect-[4/3]",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80",
  },
];

const filters = ["Todos", "Landing Page", "E-commerce", "Institucional", "Portfólio"] as const;

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");

  const list = useMemo(
    () => (filter === "Todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="portfolio" className="relative section-gradient-3 py-32">
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
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-1.5 font-mono-tech text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    filter === f
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 md:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.title + filter} delay={i * 60} className={p.span}>
              <a
                href="#contato"
                className="card-hover group relative block h-full overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className={`${p.ratio} w-full overflow-hidden`}>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
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
        </div>
      </div>
    </section>
  );
}