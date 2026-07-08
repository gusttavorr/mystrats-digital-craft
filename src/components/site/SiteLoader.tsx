import { useEffect, useState, useRef } from "react";

type Variant = "slide" | "smoke" | "lego" | "zoom";

type Message = {
  text: string;
  variant: Variant;
  letterDelay: number; // ms between each char start
  charDuration: number; // ms each char takes to fully appear
  readPause: number; // ms to hold after fully revealed
};

const MESSAGES: Message[] = [
  { text: "Design Profissional",         variant: "slide", letterDelay: 70, charDuration: 650, readPause: 1400 },
  { text: "Mais conversão",              variant: "smoke", letterDelay: 90, charDuration: 900, readPause: 1400 },
  { text: "Mais vendas",                 variant: "lego",  letterDelay: 95, charDuration: 550, readPause: 1400 },
  { text: "Te Apresentamos a MYSTRATS",  variant: "zoom",  letterDelay: 60, charDuration: 900, readPause: 2000 },
];

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
    const totalChars = message.text.length;

    setVisibleChars(0);

    // Reveal letter by letter
    for (let i = 1; i <= totalChars; i++) {
      const id = window.setTimeout(() => {
        setVisibleChars(i);
      }, i * message.letterDelay);
      timers.current.push(id);
    }

    // Wait until every char has FINISHED its animation + a full read pause
    const totalDuration =
      totalChars * message.letterDelay + message.charDuration + message.readPause;

    const nextId = window.setTimeout(() => {
      if (currentIndex < MESSAGES.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setPhase("exiting");
      }
    }, totalDuration);
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
        <p
          className={`site-loader__text site-loader__text--${message.variant} ${isLast ? "site-loader__text--brand" : ""}`}
        >
          {message.text.split("").map((char, i) => {
            const isVisible = i < visibleChars;
            return (
              <span
                key={`${currentIndex}-${i}`}
                className={`site-loader__char site-loader__char--${message.variant} ${isVisible ? "site-loader__char--visible" : ""}`}
                style={{ transitionDuration: `${message.charDuration}ms`, animationDuration: `${message.charDuration}ms` }}
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
          style={{ width: `${((currentIndex + visibleChars / message.text.length) / MESSAGES.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
