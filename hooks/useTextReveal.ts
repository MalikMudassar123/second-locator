"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Word-by-word reveal (SplitText-style without the paid plugin).
 * Wraps each word in a span and staggers a blur+rise reveal.
 */
export function useTextReveal<T extends HTMLElement = HTMLHeadingElement>(
  options: { stagger?: number; start?: string; trigger?: boolean } = {}
) {
  const ref = useRef<T>(null);
  const { stagger = 0.03, start = "top 85%", trigger = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const original = el.dataset.text ?? el.textContent ?? "";
    el.dataset.text = original;

    // Split into word spans.
    el.innerHTML = original
      .split(" ")
      .map(
        (w) =>
          `<span class="inline-block overflow-hidden align-bottom"><span class="word inline-block will-change-transform">${w}</span></span>`
      )
      .join(" ");

    const words = el.querySelectorAll<HTMLElement>(".word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger,
          scrollTrigger: trigger
            ? { trigger: el, start, toggleActions: "play none none reverse" }
            : undefined,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, start, trigger]);

  return ref;
}
