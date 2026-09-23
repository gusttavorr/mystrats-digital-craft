import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Clock3, LayoutGrid, ShieldCheck, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { HeroParticles } from "./HeroParticles";
import orbitMark from "@/assets/mystrats-orbit-mark-cropped.png";

const SHOWREEL = "/mystrats-showreel-smooth.mp4";

const chips = [
  { label: "Site institucional", prompt: "Quero um orçamento para um site institucional.", icon: Building2 },
  { label: "Landing page", prompt: "Quero um orçamento para uma landing page.", icon: Zap },
  { label: "E-commerce", prompt: "Quero um orçamento para um e-commerce.", icon: ShoppingCart },
  { label: "Catálogo digital", prompt: "Quero um orçamento para um catálogo digital.", icon: LayoutGrid },
];

export function Hero() {
  const [input, setInput] = useState("");
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop, error } = useChat({ id: "mystrats-visit-estimate", transport });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || videoReady) return;
      setVideoReady(true);
      video.src = SHOWREEL;
      video.load();
      void video.play().catch(() => undefined);
      observer.disconnect();
    }, { rootMargin: "180px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoReady]);

  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy]);

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    await sendMessage({ text: trimmed });
  };

  return (
    <section id="top" className="hero-dark relative overflow-hidden pt-[76px] text-ink-invert">
      <HeroParticles />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-14 pt-12 text-center sm:px-8 md:pb-20 md:pt-16">
        <img
          src={orbitMark}
          alt="Símbolo MYSTRATS"
          width={884}
          height={812}
          fetchPriority="high"
          className="rise-in rise-1 h-[72px] w-auto invert sm:h-[88px] lg:h-[104px]"
        />

        <p className="rise-in rise-2 mt-6 text-[10px] font-bold uppercase tracking-[0.26em] text-ink-invert/60 sm:text-[11px]">
          MYSTRATS <span className="px-1 text-brand-blue">•</span> Orçamento inteligente
        </p>

        <h1 className="rise-in rise-3 mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.25rem)] font-extrabold leading-[0.98] text-ink-invert">
          Quanto custa o seu próximo site?
        </h1>

        <p className="rise-in rise-4 mt-6 max-w-2xl text-balance text-base leading-relaxed text-ink-invert/65 md:text-lg">
          Conte o que você precisa e receba uma estimativa personalizada de investimento e prazo.
        </p>

        <div className="rise-in rise-5 mt-9 w-full max-w-3xl rounded-3xl border border-ink-invert/15 bg-ink-invert/[0.06] p-3 text-left shadow-[0_22px_80px_color-mix(in_oklab,var(--brand-blue)_18%,transparent)] backdrop-blur-md sm:p-4">
          {messages.length > 0 && (
            <Conversation className="mb-3 h-72 rounded-2xl border border-ink-invert/10 bg-ink/45">
              <ConversationContent className="gap-4 p-4">
                {messages.map((item) => (
                  <Message key={item.id} from={item.role}>
                    <MessageContent className={item.role === "user" ? "bg-brand-blue text-ink-invert" : "text-ink-invert"}>
                      {item.parts.map((part, index) => part.type === "text" ? <MessageResponse key={index}>{part.text}</MessageResponse> : null)}
                    </MessageContent>
                  </Message>
                ))}
                {status === "submitted" && <Shimmer className="text-sm text-ink-invert/60">Calculando sua estimativa...</Shimmer>}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          )}

          <PromptInput onSubmit={({ text }) => submit(text)} className="border-ink-invert/20 bg-ink/70 text-ink-invert focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/25">
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Descreva seu projeto e receba uma estimativa..."
              aria-label="Descreva seu projeto"
              className="min-h-20 text-ink-invert placeholder:text-ink-invert/40"
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                status={status}
                onStop={stop}
                disabled={!input.trim() && !busy}
                aria-label={busy ? "Parar resposta" : "Enviar descrição"}
                className="rounded-full bg-brand-blue text-ink-invert hover:bg-brand-blue/80"
              >
                {!busy ? <ArrowRight className="h-4 w-4" /> : undefined}
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
          {error && <p role="alert" className="mt-2 px-2 text-xs text-red-300">{error.message || "Não foi possível gerar a estimativa. Tente novamente."}</p>}

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {chips.map((chip) => (
              <Button
                key={chip.label}
                type="button"
                variant="outline"
                onClick={() => { setInput(chip.prompt); requestAnimationFrame(() => textareaRef.current?.focus()); }}
                className="h-10 min-w-0 rounded-full border-ink-invert/15 bg-ink-invert/[0.06] px-2 text-[11px] font-medium text-ink-invert shadow-none transition-all duration-200 hover:scale-[1.03] hover:border-brand-blue hover:bg-brand-blue sm:px-3 sm:text-xs"
              >
                <chip.icon className="h-3.5 w-3.5" />
                <span className="truncate">{chip.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <p className="rise-in rise-6 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-medium text-ink-invert/60 sm:text-xs">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-blue" />
            Estimativa personalizada
          </span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-brand-blue" />
            Prazo de entrega
          </span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1.5">
            <LayoutGrid className="h-3.5 w-3.5 text-brand-blue" />
            Escopo do projeto
          </span>
        </p>

        <Button
          asChild
          className="rise-in rise-6 mt-8 h-12 rounded-full bg-ink-invert px-7 text-ink shadow-none transition-all duration-200 hover:scale-[1.03] hover:bg-brand-blue hover:text-ink-invert"
        >
          <a href="#contato">
            Solicitar proposta <ArrowRight />
          </a>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1400px] px-5 pb-16 sm:px-8 md:pb-24 lg:px-14"
      >
        <div className="overflow-hidden rounded-3xl border border-ink-invert/15 bg-ink">
          <video
            ref={videoRef}
            className="aspect-video h-full w-full object-cover"
            loop
            muted
            playsInline
            preload="none"
            aria-label="Showreel MYSTRATS"
          />
        </div>
        <p className="mt-4 text-center font-mono-tech text-[10px] uppercase tracking-[0.28em] text-ink-invert/50 sm:text-[11px]">
          MYSTRATS — Our work in motion
        </p>
      </motion.div>
    </section>
  );
}
