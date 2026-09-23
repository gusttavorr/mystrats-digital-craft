import { useEffect, useRef, useState } from "react";

const cells = Array.from({ length: 96 }, (_, index) => index);

export function TechDissolve() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let active = false;
    let frame = 0;
    const update = () => {
      if (!active) return;
      const rect = element.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, -rect.top / 300)));
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) update();
    });
    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <div ref={ref} className="tech-dissolve" aria-hidden="true">
      <div className="tech-dissolve__grid">
        {cells.map((cell) => {
          const threshold = ((cell * 37) % cells.length) / cells.length;
          const opacity = progress > threshold ? 0 : 1;
          return <span key={cell} className={`tech-cell tech-cell--${cell % 3}`} style={{ opacity, transform: `scale(${opacity ? 1 : 0.2})` }} />;
        })}
      </div>
      <span className="tech-scanline" style={{ transform: `translateY(${progress * 300}px)`, opacity: 1 - progress }} />
    </div>
  );
}