"use client";

import { useEffect, useRef } from "react";

export function MeshBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-paused");
      return;
    }
    const card = node.parentElement;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => node.classList.toggle("is-paused", !entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="mesh" />;
}
