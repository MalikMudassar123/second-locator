"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Global ScrollTrigger hardening — avoids mobile-resize jitter and keeps
    // velocity in sync with Lenis so pins don't desync between renders.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after images/fonts finish loading.
    // This is the fix for "pin works the first time, breaks after reload" —
    // pin start/end positions are calculated before images settle, so any
    // late layout shift desyncs every pin below.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      requestAnimationFrame(refresh);
    } else {
      window.addEventListener("load", refresh, { once: true });
    }
    // Also re-run after fonts settle (Sora + Manrope from Google Fonts)
    if ("fonts" in document) {
      document.fonts.ready.then(refresh);
    }

    return () => {
      gsap.ticker.remove(raf);
      window.removeEventListener("load", refresh);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
