import { MessageCircle } from "lucide-react";

const URL = "https://wa.me/5511982975044?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20MYSTRATS%20e%20gostaria%20de%20um%20or%C3%A7amento.";

export function WhatsAppFloat() {
  return (
    <a
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 pr-5 text-sm font-semibold text-black shadow-lg pulse-ring"
      aria-label="Falar no WhatsApp"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
        <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <span className="hidden font-display sm:inline">Fale conosco</span>
    </a>
  );
}