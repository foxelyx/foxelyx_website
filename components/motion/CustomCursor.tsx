"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const INTERACTIVE_SELECTOR =
  "a, button, summary, input, textarea, select, [role='button'], [data-cursor-card], .product-card, .case-study-card";

function dampAngle(current: number, target: number, amount: number) {
  const delta = ((((target - current) % 360) + 540) % 360) - 180;
  return current + delta * amount;
}

export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cursor = root.current;
          const cursorRing = ring.current;
          const cursorDot = dot.current;
          const cursorLabel = label.current;
          if (!cursor || !cursorRing || !cursorDot || !cursorLabel) return;

          document.body.classList.add("has-custom-cursor");

          const mouse = { x: 0, y: 0 };
          const ringPos = { x: 0, y: 0 };
          const prev = { x: 0, y: 0 };
          const shape = { scaleX: 1, scaleY: 1, rotation: 0 };
          let hasPointer = false;
          let visible = false;
          let hovering = false;
          let pressed = false;

          gsap.set(cursor, { autoAlpha: 0 });
          gsap.set([cursorRing, cursorDot, cursorLabel], {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
          });
          gsap.set(cursorRing, {
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: "50% 50%",
          });

          const dotX = gsap.quickTo(cursorDot, "x", {
            duration: 0.1,
            ease: "power3.out",
          });
          const dotY = gsap.quickTo(cursorDot, "y", {
            duration: 0.1,
            ease: "power3.out",
          });
          const setRingX = gsap.quickSetter(cursorRing, "x", "px");
          const setRingY = gsap.quickSetter(cursorRing, "y", "px");
          const setRingRotation = gsap.quickSetter(
            cursorRing,
            "rotation",
            "deg",
          );
          const setRingScaleX = gsap.quickSetter(cursorRing, "scaleX");
          const setRingScaleY = gsap.quickSetter(cursorRing, "scaleY");
          const setLabelX = gsap.quickSetter(cursorLabel, "x", "px");
          const setLabelY = gsap.quickSetter(cursorLabel, "y", "px");

          const show = () => {
            if (visible) return;
            visible = true;
            gsap.to(cursor, {
              autoAlpha: 1,
              duration: 0.18,
              overwrite: "auto",
            });
          };
          const hide = () => {
            visible = false;
            gsap.to(cursor, {
              autoAlpha: 0,
              duration: 0.18,
              overwrite: "auto",
            });
          };

          const tick = () => {
            if (!hasPointer) return;

            const follow = hovering ? 0.28 : 0.16;
            ringPos.x += (mouse.x - ringPos.x) * follow;
            ringPos.y += (mouse.y - ringPos.y) * follow;

            const velocityX = ringPos.x - prev.x;
            const velocityY = ringPos.y - prev.y;
            prev.x = ringPos.x;
            prev.y = ringPos.y;

            const speed = Math.min(Math.hypot(velocityX, velocityY), 48);
            const resting = hovering || pressed || speed < 0.6;
            const stretch = resting
              ? 1
              : gsap.utils.mapRange(0, 48, 1, 1.72, speed);
            const squash = resting
              ? 1
              : gsap.utils.mapRange(0, 48, 1, 0.74, speed);
            const press = pressed ? 0.84 : 1;

            shape.scaleX += (stretch - shape.scaleX) * 0.28;
            shape.scaleY += (squash - shape.scaleY) * 0.28;
            if (!resting) {
              shape.rotation = dampAngle(
                shape.rotation,
                Math.atan2(velocityY, velocityX) * (180 / Math.PI),
                0.35,
              );
            }

            setRingX(ringPos.x);
            setRingY(ringPos.y);
            setRingRotation(shape.rotation);
            setRingScaleX(shape.scaleX * press);
            setRingScaleY(shape.scaleY * press);
            setLabelX(ringPos.x);
            setLabelY(ringPos.y);
          };

          const move = (event: PointerEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            if (!hasPointer) {
              hasPointer = true;
              ringPos.x = prev.x = event.clientX;
              ringPos.y = prev.y = event.clientY;
              gsap.set(cursorDot, { x: event.clientX, y: event.clientY });
              gsap.set(cursorLabel, { x: event.clientX, y: event.clientY });
            }
            show();
            dotX(event.clientX);
            dotY(event.clientY);
          };

          const activate = (event: PointerEvent) => {
            const target =
              event.target instanceof Element
                ? event.target.closest(INTERACTIVE_SELECTOR)
                : null;
            if (!target) return;

            hovering = true;
            cursorLabel.textContent =
              target instanceof HTMLElement && target.dataset.cursorLabel
                ? target.dataset.cursorLabel
                : "";
            gsap.to(cursorRing, {
              width: 54,
              height: 54,
              borderColor: "var(--accent-red)",
              duration: 0.25,
              overwrite: "auto",
            });
            gsap.to(cursorDot, {
              scale: 0.38,
              duration: 0.25,
              overwrite: "auto",
            });
            gsap.to(cursorLabel, {
              autoAlpha: cursorLabel.textContent ? 1 : 0,
              scale: 1,
              duration: 0.2,
              overwrite: "auto",
            });
          };

          const deactivate = (event: PointerEvent) => {
            const target =
              event.target instanceof Element
                ? event.target.closest(INTERACTIVE_SELECTOR)
                : null;
            const nextTarget =
              event.relatedTarget instanceof Element
                ? event.relatedTarget.closest(INTERACTIVE_SELECTOR)
                : null;
            if (target && nextTarget === target) return;

            hovering = false;
            cursorLabel.textContent = "";
            gsap.to(cursorRing, {
              width: 34,
              height: 34,
              borderColor: "rgba(11, 11, 11, 0.42)",
              duration: 0.25,
              overwrite: "auto",
            });
            gsap.to(cursorDot, { scale: 1, duration: 0.25, overwrite: "auto" });
            gsap.to(cursorLabel, {
              autoAlpha: 0,
              scale: 0.88,
              duration: 0.16,
              overwrite: "auto",
            });
          };

          const press = () => {
            pressed = true;
          };
          const release = () => {
            pressed = false;
          };

          gsap.ticker.add(tick);
          window.addEventListener("pointermove", move);
          window.addEventListener("pointerenter", show);
          window.addEventListener("pointerleave", hide);
          window.addEventListener("pointerdown", press);
          window.addEventListener("pointerup", release);
          document.addEventListener("pointerover", activate);
          document.addEventListener("pointerout", deactivate);

          return () => {
            document.body.classList.remove("has-custom-cursor");
            gsap.ticker.remove(tick);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerenter", show);
            window.removeEventListener("pointerleave", hide);
            window.removeEventListener("pointerdown", press);
            window.removeEventListener("pointerup", release);
            document.removeEventListener("pointerover", activate);
            document.removeEventListener("pointerout", deactivate);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="custom-cursor" aria-hidden="true">
      <div ref={ring} className="custom-cursor-ring" />
      <div ref={dot} className="custom-cursor-dot" />
      <span ref={label} className="custom-cursor-label" />
    </div>
  );
}
