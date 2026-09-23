import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { VideoReveal } from "@/components/site/VideoReveal";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { TechDissolve } from "@/components/site/TechDissolve";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mystrats | Marketing, Design & Tecnologia" },
      {
        name: "description",
        content:
          "A Mystrats é uma agência de marketing, criação de sites, design e tecnologia. Criamos sites que vendem, identidade visual marcante e estratégias digitais que geram resultado.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Mystrats | Marketing, Design & Tecnologia" },
      {
        property: "og:description",
        content:
          "Marketing, criação de sites, design e tecnologia. A Mystrats transforma ideias em experiências digitais que vendem.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mystrats.online/" },
      { property: "og:site_name", content: "Mystrats" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: "https://mystrats.online/mystrats-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mystrats | Marketing, Design & Tecnologia" },
      {
        name: "twitter:description",
        content:
          "Marketing, criação de sites, design e tecnologia. A Mystrats transforma ideias em experiências digitais que vendem.",
      },
      { name: "twitter:image", content: "https://mystrats.online/mystrats-logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://mystrats.online/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Mystrats",
          url: "https://mystrats.online/",
          logo: "https://mystrats.online/mystrats-logo.png",
          description:
            "Agência de marketing, criação de sites, design e tecnologia.",
          email: "agencia.mystrats@gmail.com",
          sameAs: [],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />
      <Hero />
      <TechDissolve />
      <VideoReveal />
      <About />
      <Services />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
