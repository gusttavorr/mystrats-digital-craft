import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511982975044?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20MYSTRATS%20e%20gostaria%20de%20um%20or%C3%A7amento.";

type Msg = { from: "bot" | "user"; text: string; cta?: boolean };

const QUICK = [
  { id: "novo", label: "🌐 Quero um site novo", answer: "Ótima decisão! Criamos sites personalizados do zero. Para receber uma proposta, fale com nossa equipe no WhatsApp." },
  { id: "custo", label: "💰 Quanto custa um site?", answer: "Nossos projetos variam conforme o escopo. Landing pages a partir de R$ 997. Sites institucionais a partir de R$ 1.997. Solicite uma proposta grátis!" },
  { id: "prazo", label: "⏱ Qual o prazo de entrega?", answer: "Entregamos em 7 a 21 dias úteis dependendo da complexidade. Você aprova cada etapa antes de publicar." },
  { id: "redesign", label: "🎨 Vocês fazem redesign?", answer: "Sim! Reformulamos sites existentes mantendo seu histórico e melhorando performance, design e conversão." },
  { id: "humano", label: "📲 Quero falar com humano", answer: "Claro! Te direciono direto para nossa equipe agora mesmo." },
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [showCTA, setShowCTA] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    if (msgs.length > 0) return;
    const t = setTimeout(() => {
      setMsgs([{ from: "bot", text: "Olá! 👋 Sou o assistente da MYSTRATS. Como posso ajudar?" }]);
    }, 600);
    return () => clearTimeout(t);
  }, [open, msgs.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, showCTA]);

  const handleQuick = (q: typeof QUICK[number]) => {
    setMsgs((m) => [...m, { from: "user", text: q.label }]);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: q.answer }]);
      setShowCTA(true);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Abrir chat"
        className="fixed bottom-24 right-6 z-40 grid h-14 w-14 place-items-center rounded-full border border-border bg-popover text-foreground shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed bottom-44 right-6 z-40 flex h-[460px] w-[320px] max-w-[calc(100vw-3rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl animate-slide-up">
          {/* header */}
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <div>
              <div className="font-display text-sm font-bold">MYSTRATS — Assistente Digital</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#25D366]" />
                Online agora
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fechar" className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.length === 0 && (
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.from === "user"
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground border border-border"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {msgs.length > 0 && !showCTA && (
              <div className="space-y-2 pt-2">
                {QUICK.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuick(q)}
                    className="block w-full rounded-xl border border-border bg-card px-3 py-2.5 text-left text-xs transition-colors hover:border-foreground/40 hover:bg-popover"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {showCTA && (
              <div className="pt-2">
                <p className="mb-2 text-xs text-muted-foreground">Prefere falar direto? 👇</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-black"
                >
                  <Send className="h-4 w-4" /> Abrir WhatsApp
                </a>
                <button
                  onClick={() => setShowCTA(false)}
                  className="mt-3 w-full text-center text-[11px] text-muted-foreground underline-offset-2 hover:underline"
                >
                  Ver outras perguntas
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}