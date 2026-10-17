"use client";

import { useEffect, useState } from "react";

export function WordRotator({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <span className="rotator" aria-hidden="true">
      <span key={words[index]} className="rotator-word">
        {words[index]}
      </span>
    </span>
  );
}
