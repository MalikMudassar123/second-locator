"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Star, Quote } from "lucide-react";

const quotes = [
  {
    q: "Locator cut our idle time by 31% in the first quarter. The driver-behaviour AI alone paid for the platform.",
    a: "Fleet Director",
    c: "Refrigerated Transport · Dubai",
  },
  {
    q: "Compliance reporting that used to take a week now takes minutes. The regulatory-grade GPS is non-negotiable for us.",
    a: "Head of Operations",
    c: "Heavy Equipment · Abu Dhabi",
  },
  {
    q: "Dispatchers love the live map. Drivers love the app. Finance loves the per-vehicle P&L. Everyone wins.",
    a: "COO",
    c: "Logistics Group · Sharjah",
  },
];

/**
 * Pinned + scrub: three quotes crossfade as the user scrolls. The active
 * indicator bar fills smoothly via the master timeline.
 */
export default function Testimonials() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      const cards = gsap.utils.toArray<HTMLElement>(".tm-quote");
      const dots  = gsap.utils.toArray<HTMLElement>(".tm-dot");
      const step = 1 / cards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=320%",
          pin: stage.current,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.inOut" },
      });

      // intro
      tl.fromTo(".tm-head > *", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 })
        .fromTo(".tm-frame",   { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "<0.2");

      // crossfade each quote
      cards.forEach((c, i) => {
        const start = 1.2 + i * 1.3;
        tl.to(c, { opacity: 1, y: 0, duration: 0.5 }, start)
          .to(dots[i], { width: 28, backgroundColor: "#0a84e3", duration: 0.4 }, "<");
        if (i < cards.length - 1) {
          tl.to(c, { opacity: 0, y: -10, duration: 0.5 }, start + 0.8)
            .to(dots[i], { width: 6, backgroundColor: "rgba(15,27,58,0.18)", duration: 0.4 }, "<");
        }
      });

      tl.to({}, { duration: 0.6 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative" style={{ background: "var(--bg-base)" }}>
      <div ref={stage} className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="tm-head mx-auto mb-10 max-w-2xl text-center">
          <span className="pill">Customer outcomes</span>
          <h2 className="mt-5 text-[clamp(24px,3.4vw,40px)] font-bold leading-[1.12] text-gradient">
            Real fleets. Real numbers.
          </h2>
        </div>

        <div className="tm-frame card-tinted relative w-full max-w-3xl overflow-hidden p-9 md:p-14">
          <Quote className="h-6 w-6 text-brand/70" />
          <div className="relative mt-5 min-h-[160px]">
            {quotes.map((qt, idx) => (
              <div key={idx} className="tm-quote absolute inset-0 opacity-0" style={{ transform: "translateY(10px)" }}>
                <p className="text-center font-display text-[clamp(18px,2.1vw,24px)] font-medium leading-snug text-ink">
                  &ldquo;{qt.q}&rdquo;
                </p>
                <div className="mt-5 text-center text-[12.5px] text-ink-muted">
                  <span className="font-semibold text-ink">{qt.a}</span> · {qt.c}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-6 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1 text-warm-deep">
              {[0,1,2,3,4].map(s => <Star key={s} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <span className="text-[11px] text-ink-subtle">·</span>
            <div className="flex items-center gap-2">
              {quotes.map((_, idx) => (
                <span key={idx} className="tm-dot h-1.5 w-1.5 rounded-full" style={{ background: "rgba(15,27,58,0.18)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
