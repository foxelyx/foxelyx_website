"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const OPEN = 5;
const STEP_VH = 0.75;
const HOLD = 0.25;

export default function ExpertiseScroll({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pinEl = root.current?.querySelector<HTMLElement>(".exp-pin");
        if (!pinEl) return;

        const row = pinEl.querySelector<HTMLElement>(".exp-row");
        if (!row) return;

        const panels = gsap.utils.toArray<HTMLElement>(".exp-panel", row);
        const bodies = panels.map((panel) => panel.querySelector<HTMLElement>(".exp-body"));
        const titles = panels.map((panel) => panel.querySelector<HTMLElement>(".exp-vtitle"));
        const imgs = panels.map((panel) => panel.querySelector<HTMLElement>(".exp-img img"));
        const btns = panels.map((panel) => panel.querySelector<HTMLButtonElement>("[data-panel-btn]"));
        const countEl = pinEl.querySelector<HTMLElement>(".exp-count");
        const barEl = pinEl.querySelector<HTMLElement>(".exp-progress b");
        const n = panels.length;

        if (!n || !countEl || !barEl || bodies.some((body) => !body) || titles.some((title) => !title) || btns.some((btn) => !btn)) {
          return;
        }

        const contentBodies = bodies as HTMLElement[];
        const verticalTitles = titles as HTMLElement[];
        const panelButtons = btns as HTMLButtonElement[];

        row.classList.add("is-scroll");
        panels.forEach((panel) => panel.removeAttribute("data-open"));

        const setOpenW = () => {
          const width = row.clientWidth;
          row.style.setProperty("--open-w", `${(width * OPEN) / (OPEN + n - 1) - 32}px`);
        };
        setOpenW();

        panels.forEach((panel, index) => {
          gsap.set(panel, { flexGrow: index === 0 ? OPEN : 1, backgroundColor: index === 0 ? "#fff" : "" });
        });
        gsap.set(contentBodies, { autoAlpha: 0 });
        gsap.set(contentBodies[0], { autoAlpha: 1, x: 0 });
        gsap.set(verticalTitles, { autoAlpha: 1 });
        gsap.set(verticalTitles[0], { autoAlpha: 0 });

        let active = -1;
        const setActive = (index: number) => {
          if (index === active) return;
          active = index;
          countEl.textContent = String(index + 1).padStart(2, "0");
          panelButtons.forEach((button, buttonIndex) => {
            button.setAttribute("aria-expanded", String(buttonIndex === index));
            const number = button.querySelector<HTMLElement>(".exp-num");
            if (number) number.style.color = buttonIndex === index ? "var(--brand)" : "";
          });
        };
        setActive(0);

        const headerOffset = 72;
        const pinStart = () => {
          const idealTop = (window.innerHeight - pinEl.offsetHeight) / 2;
          const top = Math.max(headerOffset, Math.round(idealTop));
          return `top top+=${top}`;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pinEl,
            start: pinStart,
            end: () => `+=${window.innerHeight * STEP_VH * (n - 1 + HOLD * 2)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
            snap: {
              snapTo: "labelsDirectional",
              duration: { min: 0.2, max: 0.5 },
              delay: 0.06,
              ease: "power1.inOut",
            },
            onRefresh: setOpenW,
            onUpdate: () => {
              const trigger = tl.scrollTrigger;
              if (!trigger) return;
              barEl.style.transform = `scaleX(${trigger.progress})`;
              const time = tl.time() - HOLD;
              setActive(Math.min(n - 1, Math.max(0, Math.round(time))));
            },
          },
        });

        tl.to({}, { duration: HOLD });
        tl.addLabel("p0");

        for (let index = 0; index < n - 1; index += 1) {
          const at = `p${index}`;
          tl.to(panels[index], { flexGrow: 1, backgroundColor: "#f6f7f9", duration: 1 }, at)
            .to(panels[index + 1], { flexGrow: OPEN, backgroundColor: "#fff", duration: 1 }, at)
            .to(contentBodies[index], { autoAlpha: 0, x: -30, duration: 0.35 }, at)
            .to(verticalTitles[index], { autoAlpha: 1, duration: 0.3 }, `${at}+=0.5`)
            .to(verticalTitles[index + 1], { autoAlpha: 0, duration: 0.3 }, at)
            .fromTo(
              contentBodies[index + 1],
              { autoAlpha: 0, x: 40 },
              { autoAlpha: 1, x: 0, duration: 0.45 },
              `${at}+=0.55`,
            );
          if (imgs[index + 1]) {
            tl.fromTo(imgs[index + 1], { scale: 1.15 }, { scale: 1, duration: 1 }, at);
          }
          tl.addLabel(`p${index + 1}`);
        }

        tl.to({}, { duration: HOLD });

        const goTo = (index: number) => {
          const trigger = tl.scrollTrigger;
          const labelTime = tl.labels[`p${index}`];
          if (!trigger || labelTime === undefined) return;
          const y = trigger.start + (trigger.end - trigger.start) * (labelTime / tl.duration());
          const lenis = window.__lenis;
          if (lenis) {
            lenis.scrollTo(y, { duration: 0.9 });
          } else {
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        };

        const cleanups: Array<() => void> = [];
        panels.forEach((panel, index) => {
          const onClick = () => goTo(index);
          const onFocus = () => {
            if (active !== index) goTo(index);
          };
          panelButtons[index].addEventListener("click", onClick);
          panel.addEventListener("focusin", onFocus);
          cleanups.push(() => {
            panelButtons[index].removeEventListener("click", onClick);
            panel.removeEventListener("focusin", onFocus);
          });
        });

        return () => {
          cleanups.forEach((cleanup) => cleanup());
          row.classList.remove("is-scroll");
          panels[0]?.setAttribute("data-open", "true");
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
