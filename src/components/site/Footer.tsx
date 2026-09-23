const logo = "/mystrats-logo.png";
import { Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={logo} alt="MYSTRATS" loading="lazy" className="h-10 w-auto" />
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              Sites que vendem. Identidades que ficam na memória. Pronto para crescer online? A MYSTRATS está aqui.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">Navegar</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#sobre" className="hover:text-foreground text-muted-foreground transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="hover:text-foreground text-muted-foreground transition-colors">Serviços</a></li>
              <li><a href="#portfolio" className="hover:text-foreground text-muted-foreground transition-colors">Portfólio</a></li>
              <li><a href="#contato" className="hover:text-foreground text-muted-foreground transition-colors">Contato</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">Contato</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="text-muted-foreground">(11) 98297-5044</li>
              <li className="text-muted-foreground">agencia.mystrats@gmail.com</li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 font-mono-tech text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} MYSTRATS — Todos os direitos reservados</span>
          <span>Feito com precisão em São Paulo</span>
        </div>
      </div>
    </footer>
  );
}