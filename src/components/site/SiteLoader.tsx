import { useEffect, useState, useRef } from "react";

const MESSAGES = [
  "Design Profissional",
  "Mais conversão",
  "Mais vendas",
  "Te Apresentamos a MYSTRATS",
];

const LETTER_DELAY = 55;
const PAUSE_AFTER_MESSAGE = 720;
const FINAL_PAUSE = 900;

export function SiteLoader() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || phase !== "loading") return;

    const message = MESSAGES[currentIndex];
    const totalChars = message.length;

    setVisibleChars(0);

    // Reveal letter by letter
    for (let i = 1; i <= totalChars; i++) {
      const id = window.setTimeout(() => {
        setVisibleChars(i);
      }, i * LETTER_DELAY);
      timers.current.push(id);
    }

    // After full message + pause, go to next or exit
    const nextId = window.setTimeout(() => {
      if (currentIndex < MESSAGES.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setPhase("exiting");
      }
    }, totalChars * LETTER_DELAY + PAUSE_AFTER_MESSAGE);
    timers.current.push(nextId);

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [mounted, currentIndex, phase]);

  useEffect(() => {
    if (phase === "exiting") {
      const id = window.setTimeout(() => {
        setPhase("done");
      }, 700);
      timers.current.push(id);
      return () => {
        window.clearTimeout(id);
      };
    }
  }, [phase]);

  // Prevent body scroll while loader is active
  useEffect(() => {
    if (!mounted || phase === "done") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mounted, phase]);

  if (!mounted || phase === "done") return null;

  const message = MESSAGES[currentIndex];
  const isLast = currentIndex === MESSAGES.length - 1;

  return (
    <div
      className={`site-loader ${phase === "exiting" ? "site-loader--exiting" : ""}`}
      aria-hidden="true"
    >
      <div className="site-loader__glow" />
      <div className="site-loader__content">
        <p className={`site-loader__text ${isLast ? "site-loader__text--brand" : ""}`}>
          {message.split("").map((char, i) => {
            const isVisible = i < visibleChars;
            return (
              <span
                key={`${currentIndex}-${i}`}
                className={`site-loader__char ${isVisible ? "site-loader__char--visible" : ""}`}
                style={{ transitionDelay: `${i * LETTER_DELAY}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
          <span className="site-loader__cursor" />
        </p>
      </div>
      <div className="site-loader__progress" aria-hidden="true">
        <div
          className="site-loader__progress-bar"
          style={{ width: `${((currentIndex + visibleChars / message.length) / MESSAGES.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
