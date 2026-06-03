import { useEffect, useRef } from "react";

/**
 * Holographic particle sphere rendered on a canvas.
 * - Dark neon blue points
 * - Slow auto-rotation
 * - Reacts to mouse: points near the cursor are pushed outward
 */
export function HolographicSphere() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let visible = true;
    let w = 0,
      h = 0,
      dpr = 1;
    let radius = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    type P = {
      // base unit-sphere position
      bx: number;
      by: number;
      bz: number;
      // displacement from mouse interaction
      dx: number;
      dy: number;
      dz: number;
    };
    let pts: P[] = [];

    const buildSphere = (count: number) => {
      pts = [];
      // Fibonacci sphere — even distribution
      const phi = Math.PI * (Math.sqrt(5) - 1);
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;
        pts.push({
          bx: Math.cos(theta) * r,
          by: y,
          bz: Math.sin(theta) * r,
          dx: 0,
          dy: 0,
          dz: 0,
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(w, h) * 0.42;
      const count = Math.min(2200, Math.max(900, Math.floor((w * h) / 900)));
      if (pts.length !== count) buildSphere(count);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left - w / 2;
      mouse.y = e.clientY - r.top - h / 2;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let t = 0;
    const draw = () => {
      if (!visible) {
        raf = 0;
        return;
      }
      t += 0.0025;
      const cx = w / 2;
      const cy = h / 2;

      // soft trail for glow
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, w, h);

      const cosA = Math.cos(t);
      const sinA = Math.sin(t);
      const cosB = Math.cos(t * 0.6);
      const sinB = Math.sin(t * 0.6);

      for (const p of pts) {
        // rotate around Y then X
        let x = p.bx * cosA + p.bz * sinA;
        let z = -p.bx * sinA + p.bz * cosA;
        let y = p.by * cosB - z * sinB;
        z = p.by * sinB + z * cosB;

        // scale to view
        x *= radius;
        y *= radius;
        z *= radius;

        // apply persistent displacement (decays each frame)
        x += p.dx;
        y += p.dy;
        z += p.dz;
        p.dx *= 0.92;
        p.dy *= 0.92;
        p.dz *= 0.92;

        // perspective
        const persp = 600 / (600 + z);
        const sx = cx + x * persp;
        const sy = cy + y * persp;

        // mouse repulsion (push outward in 2D plane)
        if (mouse.active) {
          const mdx = sx - cx - mouse.x;
          const mdy = sy - cy - mouse.y;
          const md2 = mdx * mdx + mdy * mdy;
          const R = 110;
          if (md2 < R * R) {
            const md = Math.sqrt(md2) || 1;
            const force = (1 - md / R) * 6;
            p.dx += (mdx / md) * force;
            p.dy += (mdy / md) * force;
          }
        }

        // depth-based color/size — dark neon blue palette
        const depth = (z + radius) / (radius * 2); // 0..1
        const size = (0.6 + depth * 1.6) * persp;
        const alpha = 0.25 + depth * 0.7;

        // mix between deep blue and electric neon blue
        const r = Math.floor(20 + depth * 30);
        const g = Math.floor(80 + depth * 90);
        const b = Math.floor(200 + depth * 55);

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && raf === 0) draw();
    });
    io.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70 mix-blend-screen"
    />
  );
}