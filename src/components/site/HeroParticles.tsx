import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; baseX: number; baseY: number };
type Ripple = { x: number; y: number; radius: number; alpha: number };

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000 };
    let particles: Particle[] = [];
    const ripples: Ripple[] = [];
    let frame = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      const count = rect.width < 700 ? 55 : 120;
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        return { x, y, baseX: x, baseY: y, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18 };
      });
    };
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    const click = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, radius: 4, alpha: 0.72 });
    };
    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (!reduced && distance < 100 && distance > 0) {
          const force = (100 - distance) / 100;
          particle.x += (dx / distance) * force * 2.2;
          particle.y += (dy / distance) * force * 2.2;
        }
        if (!reduced) {
          particle.x += particle.vx + (particle.baseX - particle.x) * 0.004;
          particle.y += particle.vy + (particle.baseY - particle.y) * 0.004;
        }
      }
      particles.forEach((particle, index) => {
        for (let j = index + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance < 108) {
            const cursorNear = Math.min(Math.hypot(particle.x - pointer.x, particle.y - pointer.y), Math.hypot(other.x - pointer.x, other.y - pointer.y)) < 130;
            context.strokeStyle = cursorNear ? `rgba(79,142,247,${(1 - distance / 108) * 0.62})` : `rgba(255,255,255,${(1 - distance / 108) * 0.14})`;
            context.lineWidth = cursorNear ? 1 : 0.55;
            context.beginPath(); context.moveTo(particle.x, particle.y); context.lineTo(other.x, other.y); context.stroke();
          }
        }
        context.fillStyle = "rgba(255,255,255,0.48)";
        context.beginPath(); context.arc(particle.x, particle.y, 1.25, 0, Math.PI * 2); context.fill();
      });
      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i];
        context.strokeStyle = `rgba(59,130,246,${ripple.alpha})`;
        context.lineWidth = 1.5;
        context.beginPath(); context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2); context.stroke();
        ripple.radius += 4.4; ripple.alpha *= 0.955;
        if (ripple.alpha < 0.02) ripples.splice(i, 1);
      }
      frame = requestAnimationFrame(draw);
    };
    resize(); draw();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    parent.addEventListener("pointerdown", click);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
      parent.removeEventListener("pointerdown", click);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}