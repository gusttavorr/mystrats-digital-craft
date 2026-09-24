import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowRight, ArrowUp, Clock3, LayoutGrid, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { HeroParticles } from "./HeroParticles";
import orbitMark from "@/assets/mystrats-orbit-mark-cropped.png";

const chips = [
  { label: "Quero um site institucional", prompt: "Quero um orçamento para um site institucional." },
  { label: "Preciso de uma landing page", prompt: "Preciso de uma landing page para o meu negócio." },
  { label: "Quero uma loja virtual", prompt: "Quero criar uma loja virtual." },
];

export function Hero() {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, stop, error } = useChat({ id: "mystrats-visit-estimate", transport });
  const busy = status === "submitted" || status === "streaming";

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

      <img
        src={orbitMark}
        alt=""
        width={884}
        height={812}
        fetchPriority="high"
        className="hero-orbit-mark"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pb-24 pt-14 text-center sm:px-8 md:pb-32 md:pt-20">
        <p className="rise-in rise-2 text-[10px] font-bold uppercase tracking-[0.26em] text-ink-invert/60 sm:text-[11px]">
          MYSTRATS <span className="px-1 text-brand-blue">•</span> Orçamento inteligente
        </p>

        <h1 className="rise-in rise-3 mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.25rem)] font-extrabold leading-[0.98] text-ink-invert">
          Quanto custa o seu próximo site?
        </h1>

        <p className="rise-in rise-4 mt-6 max-w-2xl text-balance text-base leading-relaxed text-ink-invert/65 md:text-lg">
          Conte o que você precisa e receba uma estimativa personalizada de investimento e prazo.
        </p>

        <div className="rise-in rise-5 mt-9 w-full max-w-3xl text-left">
          {messages.length > 0 && (
            <Conversation className="mb-4 h-72">
              <ConversationContent className="gap-5 px-1 py-4 sm:px-3">
                {messages.map((item) => (
                  <Message key={item.id} from={item.role}>
                    <div className={item.role === "assistant" ? "flex items-start gap-3" : "flex justify-end"}>
                      {item.role === "assistant" && <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-blue text-[10px] font-bold text-ink-invert">MS</span>}
                      <MessageContent className={item.role === "user" ? "rounded-[18px_18px_4px_18px] bg-[#2f2f2f] px-4 py-2.5 text-ink-invert" : "text-[0.95rem] leading-[1.6] text-ink-invert/90"}>
                        {item.parts.map((part, index) => part.type === "text" ? <MessageResponse key={index}>{part.text}</MessageResponse> : null)}
                      </MessageContent>
                    </div>
                  </Message>
                ))}
                {status === "submitted" && <Shimmer className="text-sm text-ink-invert/60">Calculando sua estimativa...</Shimmer>}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          )}

          <PromptInput onSubmit={({ text }) => submit(text)} className="rounded-3xl border-ink-invert/15 bg-ink-invert/[0.06] text-ink-invert shadow-none focus-within:border-brand-blue/60 focus-within:ring-2 focus-within:ring-brand-blue/20">
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Descreva seu projeto..."
              aria-label="Descreva seu projeto"
              className="min-h-20 text-ink-invert placeholder:text-ink-invert/40"
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                status={status}
                onStop={stop}
                disabled={!input.trim() && !busy}
                aria-label={busy ? "Parar resposta" : "Enviar descrição"}
                className={input.trim() ? "rounded-full bg-brand-blue text-ink-invert hover:bg-brand-blue/80" : "rounded-full bg-ink-invert/10 text-ink-invert/40"}
              >
                {!busy ? <ArrowUp className="h-4 w-4" /> : undefined}
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
          {error && <p role="alert" className="mt-2 px-2 text-xs text-red-300">{error.message || "Não foi possível gerar a estimativa. Tente novamente."}</p>}

          {messages.length === 0 && <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Button
                key={chip.label}
                type="button"
                variant="outline"
                onClick={() => { setInput(chip.prompt); requestAnimationFrame(() => textareaRef.current?.focus()); }}
                className="h-9 min-w-0 rounded-full border-ink-invert/15 bg-ink-invert/[0.07] px-3 text-[11px] font-medium text-ink-invert shadow-none transition-all duration-200 hover:scale-[1.03] hover:border-brand-blue hover:bg-brand-blue sm:text-xs"
              >
                {chip.label}
              </Button>
            ))}
          </div>}
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

    </section>
  );
}
