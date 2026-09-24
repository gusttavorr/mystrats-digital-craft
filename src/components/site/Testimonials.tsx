import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  { name: "Carlos M.", role: "Empresário", text: "A MYSTRATS entregou além do que esperávamos. Em 2 semanas, nosso site estava no ar e já tivemos retorno." },
  { name: "Ana P.", role: "Coach", text: "Design incrível e equipe super atenciosa. Recomendo demais para quem quer profissionalismo." },
  { name: "Rafael S.", role: "Fundador SaaS", text: "Performance, identidade e estratégia em um pacote só. Conversão dobrou no primeiro mês." },
  { name: "Juliana T.", role: "Diretora de Marketing", text: "Processo claro, prazo respeitado, entrega impecável. Difícil encontrar isso hoje." },
  { name: "Pedro L.", role: "Consultor", text: "Eles entenderam meu negócio melhor que eu mesmo. O site reflete exatamente o que eu queria passar." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="depoimentos" className="relative sand-flow sand-flow--tl py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-muted-foreground">
            (05) Depoimentos
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            Quem confiou, <span className="text-muted-foreground">conta o que viveu.</span>
          </h2>
        </Reveal>

        <div
          className="mt-16 overflow-hidden rounded-3xl border border-border bg-card"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {testimonials.map((t) => (
              <div key={t.name} className="w-full shrink-0 p-10 md:p-16">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="mt-8 font-display text-balance text-2xl font-medium leading-snug md:text-4xl">
                  “{t.text}”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-popover font-mono-tech text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border px-10 py-5">
            <div className="font-mono-tech text-xs text-muted-foreground">
              {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </div>
            <div className="flex gap-2">
              <Button type="button" size="icon" variant="outline" aria-label="Depoimento anterior" onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)} className="rounded-full">
                <ArrowLeft />
              </Button>
              <Button type="button" size="icon" variant="outline" aria-label="Próximo depoimento" onClick={() => setI((i + 1) % testimonials.length)} className="rounded-full">
                <ArrowRight />
              </Button>
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Ir para depoimento ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    k === i ? "w-8 bg-foreground" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}