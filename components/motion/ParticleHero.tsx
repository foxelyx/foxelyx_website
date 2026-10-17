"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const ParticleScene = dynamic(
  () => import("@/components/motion/ParticleScene").then((mod) => mod.ParticleScene),
  { ssr: false },
);

type Mode = "pending" | "scene" | "static";

/** Lives for this page load only. A reload starts the intro again. */
let introDismissed = false;

class ParticleErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function ParticleHero() {
  const [mode, setMode] = useState<Mode>("pending");
  const [dismissed, setDismissed] = useState(false);
  const scrollAfterDismiss = useRef<number | null>(null);
  const dismissRef = useRef<() => void>(() => {});

  dismissRef.current = () => {
    if (introDismissed) return;
    const home = document.querySelector(".home-after-particles");
    if (home instanceof HTMLElement) {
      const homeTop = home.getBoundingClientRect().top + window.scrollY;
      scrollAfterDismiss.current = Math.max(0, window.scrollY - homeTop);
    } else {
      scrollAfterDismiss.current = 0;
    }
    introDismissed = true;
    setDismissed(true);
  };

  useLayoutEffect(() => {
    if (!introDismissed) return;
    if (!dismissed) {
      setDismissed(true);
      return;
    }
    if (scrollAfterDismiss.current == null) return;
    const y = scrollAfterDismiss.current;
    scrollAfterDismiss.current = null;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
    ScrollTrigger.refresh();
  }, [dismissed]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMode(media.matches ? "static" : "scene");
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (mode !== "scene") return;
    const cue = document.querySelector<HTMLElement>(".particle-scroll-cue");
    const track = document.querySelector("[data-particle-scroll]");
    if (!cue || !(track instanceof HTMLElement)) return;

    const onScroll = () => {
      const scrolled = Math.max(-track.getBoundingClientRect().top, 0);
      const wordDistance = Math.max(track.offsetHeight - window.innerHeight * 2, 1);
      const word = Math.min(scrolled / wordDistance, 1);
      cue.style.opacity = String(1 - Math.min(word / 0.16, 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode, dismissed]);

  useEffect(() => {
    if (mode !== "scene" || dismissed) return;

    let snapping = false;
    let handedOff = false;
    let lastY = window.scrollY;

    const markers = () => {
      const track = document.querySelector("[data-particle-scroll]");
      const home = document.querySelector(".home-after-particles");
      if (!(track instanceof HTMLElement) || !(home instanceof HTMLElement)) return null;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const wordDistance = Math.max(track.offsetHeight - window.innerHeight * 2, 1);
      return {
        wordEnd: trackTop + wordDistance,
        homeTop: home.getBoundingClientRect().top + window.scrollY,
      };
    };

    const finish = () => {
      snapping = false;
      dismissRef.current();
    };

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 1;
      lastY = y;
      const spot = markers();
      if (!spot) return;
      const home = document.querySelector(".home-after-particles");
      if (
        !snapping &&
        home instanceof HTMLElement &&
        home.getBoundingClientRect().top <= 4 &&
        y > window.innerHeight
      ) {
        dismissRef.current();
        return;
      }
      if (y < spot.wordEnd - 48) handedOff = false;
      if (snapping || handedOff || !goingDown) return;
      if (y <= spot.wordEnd + 8 || y >= spot.homeTop - 16) return;

      handedOff = true;
      snapping = true;
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(spot.homeTop, {
          duration: 0.9,
          lock: true,
          force: true,
          onComplete: finish,
        });
      } else {
        window.scrollTo({ top: spot.homeTop, behavior: "smooth" });
        window.setTimeout(finish, 900);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode, dismissed]);

  return (
    <div
      className={[
        "particle-scroll",
        mode === "static" ? "is-static" : "",
        dismissed ? "is-dismissed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-particle-scroll
    >
      <section
        className="particle-hero"
        aria-label={mode === "static" ? undefined : "We Foxelyx build digital services"}
      >
        {!dismissed && mode === "static" ? (
          <p className="particle-fallback">
            We
            <img src="/images/foxelyx-mark.png" alt="Foxelyx" />
            Build
            <br />
            Digital Services
          </p>
        ) : null}
        {!dismissed && mode === "scene" ? (
          <ParticleErrorBoundary onError={() => setMode("static")}>
            <ParticleScene />
          </ParticleErrorBoundary>
        ) : null}
        {!dismissed ? (
          <span className="particle-scroll-cue" aria-hidden="true">
            Scroll
          </span>
        ) : null}
      </section>
    </div>
  );
}
