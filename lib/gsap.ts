"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: number | string | HTMLElement,
        options?: {
          immediate?: boolean;
          duration?: number;
          lock?: boolean;
          force?: boolean;
          onComplete?: () => void;
        },
      ) => void;
      stop: () => void;
      start: () => void;
    };
  }
}
