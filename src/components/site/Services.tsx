import { useEffect, useRef, useState, type PointerEvent } from "react";
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

const typingPhrases = (() => [
  "Sites rápidos com presença premium.",
  "Estratégia visual feita para converter.",
  "Experiências digitais com acabamento profissional.",
  "Tecnologia, design e clareza no mesmo fluxo.",
])();

function ServiceCard({ service: s, index }: { service: (typeof services)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
    card.style.setProperty("--sheen-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--sheen-y", `${(y / rect.height) * 100}%`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--sheen-x", "50%");
    card.style.setProperty("--sheen-y", "50%");
  };

  return (
    <Reveal delay={index * 80}>
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="service-tilt-card group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8"
      >
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-foreground/[0.03] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
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
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [typingActive, setTypingActive] = useState(false);
  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTypingActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!typingActive) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const phrase = typingPhrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      setTypingText(phrase.slice(0, charIndex));

      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        timer = window.setTimeout(tick, 1400);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      }

      timer = window.setTimeout(tick, deleting ? 34 : 52);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [typingActive]);

  return (
    <section ref={sectionRef} id="servicos" className="relative overflow-hidden sand-flow sand-flow--c py-20 md:py-32">
      <div className="service-ambient-orb" aria-hidden />
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

        <Reveal delay={180}>
          <p className="mt-12 min-h-7 font-mono-tech text-xs uppercase tracking-[0.22em] text-foreground/75 sm:text-sm">
            <span>{typingText}</span>
            <span className="typing-cursor" aria-hidden />
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => <ServiceCard key={service.t} service={service} index={i} />)}
        </div>
      </div>
    </section>
  );
}