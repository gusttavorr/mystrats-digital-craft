import { Reveal } from "./Reveal";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511982975044?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20MYSTRATS%20e%20gostaria%20de%20um%20or%C3%A7amento.";

export function Contact() {
  return (
    <section id="contato" className="relative sand-flow sand-flow--br py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-muted-foreground">
            (06) Contato
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-balance text-[clamp(2.25rem,7vw,6rem)] font-bold leading-[0.98]">
            Pronto para dar
            <br />
            <span className="text-muted-foreground">o próximo passo?</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
            Seu site do jeito que você sempre imaginou, entregue no prazo.
            Responderemos em até 2 horas em dias úteis.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { href: WHATSAPP_URL, icon: MessageCircle, t: "WhatsApp", d: "(11) 98297-5044", ext: true },
            { href: "mailto:contato@mystrats.com", icon: Mail, t: "E-mail", d: "contato@mystrats.com", ext: true },
            { href: "tel:+5511982975044", icon: Phone, t: "Telefone", d: "(11) 98297-5044", ext: false },
          ].map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <a
                href={it.href}
                target={it.ext ? "_blank" : undefined}
                rel={it.ext ? "noopener noreferrer" : undefined}
                className="card-hover group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-start justify-between">
                  <it.icon className="h-7 w-7" strokeWidth={1.5} />
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="mt-16">
                  <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{it.t}</div>
                  <div className="mt-2 font-display text-2xl font-bold">{it.d}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <form
            onSubmit={(e) => { e.preventDefault(); window.open(WHATSAPP_URL, "_blank"); }}
            className="mt-16 rounded-3xl border border-border bg-card p-8 md:p-12"
          >
            <h3 className="font-display text-2xl font-bold md:text-3xl">Conte rapidinho sobre seu projeto</h3>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <input required placeholder="Seu nome" className="rounded-xl border border-border bg-background px-5 py-4 text-sm outline-none transition-colors focus:border-foreground/50" />
              <input required type="email" placeholder="Seu e-mail" className="rounded-xl border border-border bg-background px-5 py-4 text-sm outline-none transition-colors focus:border-foreground/50" />
              <input placeholder="Sua empresa" className="rounded-xl border border-border bg-background px-5 py-4 text-sm outline-none transition-colors focus:border-foreground/50 md:col-span-2" />
              <textarea required rows={4} placeholder="Sobre o projeto..." className="resize-none rounded-xl border border-border bg-background px-5 py-4 text-sm outline-none transition-colors focus:border-foreground/50 md:col-span-2" />
            </div>
            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-background transition-transform hover:scale-[1.02]">
              Enviar proposta
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}