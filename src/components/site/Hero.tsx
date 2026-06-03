import { ParticlesBackground } from "./ParticlesBackground";
import { HolographicSphere } from "./HolographicSphere";
import { ScrambleText } from "./ScrambleText";
import { CountUp } from "./CountUp";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden gradient-radial-fade grain pt-24 md:pt-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <ParticlesBackground />
      <HolographicSphere />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-6 pb-20 pt-8 md:pb-32 md:pt-12 md:pt-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground" />
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Agência Digital · Disponível agora
          </span>
        </div>

        <h1 className="font-display text-balance text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight">
          <ScrambleText text="Transformamos ideias" />
          <br />
          <span className="text-muted-foreground">em experiências</span>
          <br />
          <ScrambleText text="digitais." />
        </h1>

        <p className="mt-8 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
          Sites que vendem. Identidades que ficam na memória. Design estratégico,
          tecnologia de ponta e copy de impacto — entregues no prazo.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#portfolio"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-transform hover:scale-[1.02]"
          >
            Ver nossos projetos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contato"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground/60"
          >
            Falar com a gente
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-16 grid w-full grid-cols-3 md:mt-24 gap-6 border-t border-border pt-8">
          {[
            { n: 47, s: "+", l: "Projetos entregues" },
            { n: 5, s: "+", l: "Anos de mercado" },
            { n: 100, s: "%", l: "Satisfação" },
          ].map((it) => (
            <div key={it.l}>
              <div className="font-display text-4xl font-bold md:text-6xl">
                <CountUp end={it.n} suffix={it.s} />
              </div>
              <div className="mt-1 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:text-xs">
                {it.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}