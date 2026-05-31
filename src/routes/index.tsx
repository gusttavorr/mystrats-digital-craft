import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Chatbot } from "@/components/site/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MYSTRATS — Sites que vendem. Identidades que ficam na memória." },
      { name: "description", content: "Agência digital especializada em sites, landing pages, e-commerce e identidade visual. Design estratégico entregue no prazo." },
      { property: "og:title", content: "MYSTRATS — Agência Digital" },
      { property: "og:description", content: "Transformamos ideias em experiências digitais. Sites que vendem enquanto você dorme." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppFloat />
      <Chatbot />
    </main>
  );
}
