"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function CaseStudyStack({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".case-study-card", root.current);
        const wrappers = gsap.utils.toArray<HTMLElement>(".case-study-sticky", root.current);

        cards.forEach((card, index) => {
          const targetScale = 1 - (cards.length - index) * 0.025;
          gsap.to(card, {
            scale: targetScale,
            ease: "none",
            scrollTrigger: {
              trigger: wrappers[index],
              start: "top top+=88",
              end: "bottom top+=88",
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="case-study-stack">
      {children}
    </div>
  );
}
