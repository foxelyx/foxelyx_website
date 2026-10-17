"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ProcessPin({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const stage = root.current;
        const grid = stage?.querySelector<HTMLElement>(".process-grid");
        if (!stage || !grid) return;

        const cols = gsap.utils.toArray<HTMLElement>("[data-process-col]", grid);
        const step = () => {
          const cell = grid.querySelector<HTMLElement>("[data-cell]");
          if (!cell) return 0;
          const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
          return cell.offsetHeight + gap;
        };
        const maxOffset = cols.length - 1;

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top+=72",
            end: () => `+=${step() * maxOffset + 64}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onLeave: () => gsap.set(cols, { y: 0, willChange: "auto" }),
            onEnterBack: () => gsap.set(cols, { willChange: "transform" }),
          },
        });

        cols.forEach((col, index) => {
          if (index === 0) return;
          timeline.fromTo(
            col,
            { y: () => step() * index, willChange: "transform" },
            { y: 0, duration: index, force3D: true },
            0,
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-cell]", grid).forEach((cell) => {
          gsap.fromTo(
            cell,
            { opacity: 0.25 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: cell,
                start: "top 100%",
                end: "top 80%",
                scrub: 0.4,
              },
            },
          );
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const cols = gsap.utils.toArray<HTMLElement>("[data-process-col]", root.current);
        cols.forEach((col, index) => {
          gsap.fromTo(
            col,
            { y: (index % 2) * 80 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: col,
                start: "top 95%",
                end: "top 40%",
                scrub: 0.5,
              },
            },
          );
        });
      });

      document.fonts.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

      return () => mm.revert();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
