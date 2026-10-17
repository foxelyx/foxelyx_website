"use client";

import { gsap, useGSAP } from "@/lib/gsap";

export function HeroMotion() {
  useGSAP(() => {
    const card = document.querySelector("[data-hero-card]");
    if (!(card instanceof HTMLElement)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = card.querySelectorAll("[data-hero-word]");
    if (words.length) {
      gsap.from(words, {
        yPercent: 110,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
      });
    }

    const rises = card.querySelectorAll("[data-hero-rise]");
    if (rises.length) {
      gsap.from(rises, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.12,
      });
    }

    const shifts = [...card.querySelectorAll<HTMLElement>("[data-orb-shift]")];
    const buttonNode = card.querySelector(".hero-action");
    const button = buttonNode instanceof HTMLElement ? buttonNode : null;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      shifts.forEach((el, index) => {
        const depth = 16 + index * 10;
        gsap.to(el, {
          x: x * depth,
          y: y * depth,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const onButton = (event: PointerEvent) => {
      if (!(button instanceof HTMLElement) || event.pointerType !== "mouse") return;
      const rect = button.getBoundingClientRect();
      const x = Math.max(-8, Math.min(8, event.clientX - (rect.left + rect.width / 2)));
      const y = Math.max(-6, Math.min(6, event.clientY - (rect.top + rect.height / 2)));
      gsap.to(button, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onButtonLeave = () => {
      if (!(button instanceof HTMLElement)) return;
      gsap.to(button, { x: 0, y: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };

    card.addEventListener("pointermove", onMove);
    button?.addEventListener("pointermove", onButton);
    button?.addEventListener("pointerleave", onButtonLeave);

    return () => {
      card.removeEventListener("pointermove", onMove);
      button?.removeEventListener("pointermove", onButton);
      button?.removeEventListener("pointerleave", onButtonLeave);
    };
  });

  return null;
}
