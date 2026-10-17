"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function PageMotion() {
  const pathname = usePathname();

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.utils.toArray<HTMLElement>(".section-heading").forEach((row) => {
      const label = row.querySelector<HTMLElement>(".section-label");
      gsap.fromTo(
        row,
        { opacity: 0.15, y: 48, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 98%",
            end: "top 72%",
            scrub: 0.5,
          },
        },
      );
      if (label) {
        gsap.fromTo(
          label,
          { opacity: 0.15, y: 18, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 94%",
              end: "top 70%",
              scrub: 0.5,
            },
          },
        );
      }
      gsap.fromTo(
        row,
        { "--heading-rule-scale": 0 },
        {
          "--heading-rule-scale": 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            end: "top 65%",
            scrub: 0.5,
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-row], .faq-list details").forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0.2, y: 24 },
        {
          opacity: 1,
          y: 0,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 100%",
            end: "top 82%",
            scrub: 0.4,
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
      gsap.from(node, {
        y: Number(node.dataset.revealY ?? 24),
        opacity: 0,
        force3D: true,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          once: true,
        },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-color-word]").forEach((node) => {
      gsap.fromTo(
        node,
        { color: "var(--ink-3)" },
        {
          color: "var(--ink)",
          ease: "none",
          scrollTrigger: {
            trigger: node.parentElement ?? node,
            start: "top 80%",
            end: "top 35%",
            scrub: 0.4,
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-counter-end]").forEach((node) => {
      const end = Number(node.dataset.counterEnd);
      const suffix = node.dataset.counterSuffix ?? "";
      const counter = { value: 0 };
      gsap.to(counter, {
        value: end,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: node,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          node.textContent = `${Math.round(counter.value)}${suffix}`;
        },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-slat]").forEach((card) => {
      const strips = card.querySelectorAll("[data-slat-strip]");
      const caption = card.querySelector<HTMLElement>(".work-caption");
      const captionLine = card.querySelector<HTMLElement>(".work-caption i");
      const play = card.querySelector<HTMLElement>("[data-cursor-play]");
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "center center",
          scrub: 0.5,
        },
      });

      timeline.fromTo(
        strips,
        {
          yPercent: (index) => (index % 2 === 0 ? -10 : 10),
          scaleY: 1.1,
          opacity: 0.75,
          force3D: true,
        },
        {
          yPercent: 0,
          scaleY: 1,
          opacity: 1,
          stagger: { from: "center", each: 0.04 },
          duration: 1,
        },
        0,
      );

      if (play) {
        timeline.fromTo(play, { scale: 0.4, opacity: 0.35 }, { scale: 1, opacity: 1, duration: 1 }, 0);
      }

      if (caption) {
        timeline.fromTo(
          caption,
          { opacity: 0, filter: "blur(8px)", y: 12 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.35 },
          0.65,
        );
      }

      if (captionLine) {
        timeline.fromTo(captionLine, { scaleX: 0 }, { scaleX: 1, duration: 0.2, transformOrigin: "left" }, 0.8);
      }
    });

    gsap.utils.toArray<HTMLElement>("[data-cursor-card]").forEach((card) => {
      const button = card.querySelector<HTMLElement>("[data-cursor-play]");
      if (!button) return;
      const moveX = gsap.quickTo(button, "x", { duration: 0.35, ease: "power3.out" });
      const moveY = gsap.quickTo(button, "y", { duration: 0.35, ease: "power3.out" });

      card.addEventListener("pointerenter", () => gsap.to(button, { scale: 1, autoAlpha: 1, duration: 0.2 }));
      card.addEventListener("pointerleave", () => gsap.to(button, { scale: 0, autoAlpha: 0, duration: 0.2 }));
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        moveX(event.clientX - rect.left - rect.width / 2);
        moveY(event.clientY - rect.top - rect.height / 2);
      });
    });

    const logo = document.querySelector<HTMLElement>(".logo-link");
    if (logo) {
      let last = 0;
      let direction = 0;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const next = self.scroll();
          const delta = next - last;
          last = next;
          if (Math.abs(delta) < 4) return;
          const nextDirection = delta > 0 ? 1 : -1;
          if (nextDirection === direction) return;
          direction = nextDirection;
          if (nextDirection !== -1 || next < 48) return;
          gsap.fromTo(
            logo,
            { y: 18, opacity: 0.15, filter: "blur(8px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "expo.out",
              overwrite: true,
            },
          );
        },
      });
    }

    const bottomBlur = document.querySelector<HTMLElement>(".edge-blur--bottom");
    const footerWordmark = document.querySelector<HTMLElement>("#footer-wordmark");
    if (bottomBlur && footerWordmark) {
      gsap.to(bottomBlur, {
        opacity: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: footerWordmark,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
