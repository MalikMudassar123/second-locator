"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Counts a number up from 0 to `value` when scrolled into view.
 * Returns a ref to attach to the element whose textContent gets updated.
 */
export function useCounter<T extends HTMLElement = HTMLSpanElement>(
  value: number,
  options: { duration?: number; decimals?: number; suffix?: string; prefix?: string } = {}
) {
  const ref = useRef<T>(null);
  const { duration = 2, decimals = 0, suffix = "", prefix = "" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent =
            prefix + obj.val.toFixed(decimals) + suffix;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, duration, decimals, suffix, prefix]);

  return ref;
}
