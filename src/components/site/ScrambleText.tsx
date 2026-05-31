import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    const oldText = "";
    const length = Math.max(oldText.length, text.length);
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = text[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40) + 10;
      queue.push({ from, to, start, end });
    }

    frameRef.current = 0;
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frameRef.current >= q.end) {
          complete++;
          output += q.to;
        } else if (frameRef.current >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += `<span class="opacity-60">${q.char}</span>`;
        } else {
          output += q.from;
        }
      }
      setOut(output);
      if (complete < queue.length) {
        frameRef.current++;
        rafRef.current = requestAnimationFrame(update);
      }
    };
    update();
    return () => cancelAnimationFrame(rafRef.current);
  }, [text]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: out }} />;
}