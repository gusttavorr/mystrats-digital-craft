import { useEffect, useRef } from "react";

export function VideoReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("video-revealed");
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="reel"
      className="baby-blue-fall relative overflow-hidden py-20 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-foreground/70">
            Showreel · 2026
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            MYSTRATS — OUR WORK IN MOTION
          </h2>
        </div>

        <div ref={ref} className="video-reveal group relative mx-auto aspect-video w-full">
          <div className="video-reveal__frame">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/mystrats-apresentacao.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <div className="video-reveal__glow" aria-hidden />
        </div>
      </div>
    </section>
  );
}