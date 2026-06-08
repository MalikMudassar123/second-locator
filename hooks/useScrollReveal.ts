"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  /** selector for staggered children; if omitted, the container itself animates */
  childSelector?: string;
}

/**
 * Reveals an element (or its children) on scroll:
 * opacity 0 -> 1, y 80 -> 0, duration 1.2, ease power3.out.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 80,
    duration = 1.2,
    delay = 0,
    stagger = 0.15,
    start = "top 82%",
    childSelector,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = childSelector
      ? el.querySelectorAll(childSelector)
      : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, toggleActions: "play none none reverse" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, stagger, start, childSelector]);

  return ref;
}
