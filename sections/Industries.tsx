"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Anchor, Construction, HardHat, Bus, Truck, Plane } from "lucide-react";

const items = [
  { icon: <Truck className="h-5 w-5" />,        title: "Logistics",        body: "Last-mile, cold chain, and cross-border freight." },
  { icon: <Construction className="h-5 w-5" />, title: "Construction",     body: "Site vehicles, plant & yellow goods." },
  { icon: <HardHat className="h-5 w-5" />,      title: "Heavy equipment",  body: "Generators, cranes, lifts & rentals." },
  { icon: <Anchor className="h-5 w-5" />,       title: "Marine",           body: "Yachts, port assets & service boats." },
  { icon: <Bus className="h-5 w-5" />,          title: "Public transport", body: "Bus routes, school transport & shuttles." },
  { icon: <Plane className="h-5 w-5" />,        title: "Aviation ground",  body: "Airside vehicles & GSE tracking." },
];

/**
 * Pinned + scrub: header sticks, then each industry card reveals
 * progressively as the user scrolls. A single live tile expands per step
 * so the active industry is foregrounded.
 */
export default function Industries() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=380%",
          pin: stage.current,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(".ind-head > *", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 });

      // Each card: tile drops in, scales up slightly, then settles
      const cards = el.querySelectorAll<HTMLElement>(".ind-card");
      cards.forEach((card, i) => {
        tl.fromTo(card,
          { y: 40, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7 },
          i === 0 ? "+=0.1" : ">-0.35"
        )
        .fromTo(card.querySelector(".ind-glow"),
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "<"
        );
      });

      tl.to({}, { duration: 0.8 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} id="industries" className="relative" style={{ background: "var(--bg-base)" }}>
      <div ref={stage} className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="ind-head mx-auto mb-10 max-w-2xl text-center">
          <span className="pill">Industries</span>
          <h2 className="mt-5 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.1] text-gradient">
            Built for the Gulf — proven across industries.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            From last-mile delivery to heavy equipment, marine to public transport — one platform, six verticals.
          </p>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="ind-card card relative overflow-hidden p-6 opacity-0">
              <div className="ind-glow pointer-events-none absolute inset-0 opacity-0 [background:radial-gradient(280px_180px_at_85%_0%,rgba(10,132,227,.10),transparent_60%)]" />
              <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-light to-brand text-white shadow-[0_10px_28px_-10px_rgba(10,132,227,.55)]">
                {it.icon}
              </div>
              <h3 className="relative mt-4 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">{it.title}</h3>
              <p className="relative mt-1 text-[13.5px] leading-relaxed text-ink-muted">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
