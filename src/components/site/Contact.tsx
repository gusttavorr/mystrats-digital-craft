import { Reveal } from "./Reveal";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511982975044?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20MYSTRATS%20e%20gostaria%20de%20um%20or%C3%A7amento.";

export function Contact() {
  return (
    <section id="contato" className="relative bg-ink py-20 text-ink-invert md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono-tech text-xs uppercase tracking-[0.3em] text-brand-blue">
            (06) Contato
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-4xl font-display text-balance text-[clamp(2.25rem,7vw,6rem)] font-bold leading-[0.98]">
            Pronto para dar
            <br />
            <span className="text-ink-invert/55">o próximo passo?</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-8 max-w-xl text-base text-ink-invert/60 md:text-lg">
            Seu site do jeito que você sempre imaginou, entregue no prazo.
            Responderemos em até 2 horas em dias úteis.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { href: WHATSAPP_URL, icon: MessageCircle, t: "WhatsApp", d: "(11) 98297-5044", ext: true },
            { href: "mailto:agencia.mystrats@gmail.com", icon: Mail, t: "E-mail", d: "agencia.mystrats@gmail.com", ext: true },
            { href: "tel:+5511982975044", icon: Phone, t: "Telefone", d: "(11) 98297-5044", ext: false },
          ].map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <a
                href={it.href}
                target={it.ext ? "_blank" : undefined}
                rel={it.ext ? "noopener noreferrer" : undefined}
                className="card-lift group flex h-full flex-col justify-between rounded-2xl border border-ink-invert/15 bg-ink-invert/[0.05] p-8"
              >
                <div className="flex items-start justify-between">
                  <it.icon className="h-7 w-7" strokeWidth={1.5} />
                   <ArrowUpRight className="h-5 w-5 text-ink-invert/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue" />
                </div>
                <div className="mt-16">
                   <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-ink-invert/50">{it.t}</div>
                   <div className="mt-2 break-words font-display text-xl font-bold md:text-2xl">{it.d}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <form
            onSubmit={(e) => { e.preventDefault(); window.open(WHATSAPP_URL, "_blank"); }}
             className="mt-16 rounded-3xl border border-ink-invert/15 bg-ink-invert/[0.05] p-8 md:p-12"
          >
            <h3 className="font-display text-2xl font-bold md:text-3xl">Conte rapidinho sobre seu projeto</h3>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
               <input required placeholder="Seu nome" className="rounded-xl border border-ink-invert/15 bg-ink-invert/[0.06] px-5 py-4 text-sm text-ink-invert outline-none transition-colors placeholder:text-ink-invert/40 focus:border-brand-blue" />
               <input required placeholder="Seu contato" className="rounded-xl border border-ink-invert/15 bg-ink-invert/[0.06] px-5 py-4 text-sm text-ink-invert outline-none transition-colors placeholder:text-ink-invert/40 focus:border-brand-blue" />
               <textarea required rows={4} placeholder="Sobre o projeto..." className="resize-none rounded-xl border border-ink-invert/15 bg-ink-invert/[0.06] px-5 py-4 text-sm text-ink-invert outline-none transition-colors placeholder:text-ink-invert/40 focus:border-brand-blue md:col-span-2" />
            </div>
             <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-invert transition-transform hover:scale-[1.02]">
              Enviar proposta
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}