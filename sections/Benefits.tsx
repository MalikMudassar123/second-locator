"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Activity, ShieldCheck, Fuel, Headphones } from "lucide-react";

const items = [
  {
    n: "01",
    icon: <Activity className="h-5 w-5" />,
    title: "Cut idle time by 30%",
    body: "Driver-behaviour AI spots harsh braking, speeding and idling in real time — and tells you who, when and where.",
    metric: "−31%",
    metricLabel: "Idle reduction · Q1 average",
  },
  {
    n: "02",
    icon: <Fuel className="h-5 w-5" />,
    title: "Reduce fuel cost per km",
    body: "Pair GPS routes with engine telematics to spot the trips and trucks that bleed fuel.",
    metric: "−24%",
    metricLabel: "Fuel cost / km · first 90 days",
  },
  {
    n: "03",
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Pass every compliance audit",
    body: "UAE-licensed GPS with tamper-proof logs and full audit trails — submission-ready exports.",
    metric: "100%",
    metricLabel: "Audits passed",
  },
  {
    n: "04",
    icon: <Headphones className="h-5 w-5" />,
    title: "24/7 local support",
    body: "Arabic & English support, on-the-ground installers across the Emirates. No overseas call centres.",
    metric: "<15m",
    metricLabel: "Avg. response time",
  },
];

/**
 * Pinned + scrub: as the user scrolls, each benefit slides in from the right
 * while the previous one settles into the side rail on the left. The active
 * metric counts up; the rail shows the journey so far.
 */
export default function Benefits() {
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
          end: "+=420%",
          pin: stage.current,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.inOut" },
      });

      tl.fromTo(".bn-head > *", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 });

      const cards = gsap.utils.toArray<HTMLElement>(".bn-card");
      const rails = gsap.utils.toArray<HTMLElement>(".bn-rail-item");

      cards.forEach((c, i) => {
        const t = 1 + i * 1.4;
        tl.fromTo(c, { x: 50, opacity: 0, scale: 0.97 },
                     { x: 0, opacity: 1, scale: 1, duration: 0.8 }, t)
          .to(rails[i], { backgroundColor: "#0a84e3", color: "#ffffff", duration: 0.4 }, "<0.1")
          .to(rails[i].querySelector(".bn-rail-bar"), { scaleX: 1, duration: 0.6 }, "<");
        if (i < cards.length - 1) {
          tl.to(c, { x: -30, opacity: 0, scale: 0.97, duration: 0.7 }, t + 1.0);
        }
      });

      tl.to({}, { duration: 0.8 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative" style={{ background: "var(--bg-base)" }}>
      <div ref={stage} className="relative h-screen w-full overflow-hidden px-6">
        <div className="bn-head mx-auto max-w-2xl pt-[14vh] text-center">
          <span className="pill">Why Locator</span>
          <h2 className="mt-5 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.1] text-gradient">
            Outcomes you can measure. From week one.
          </h2>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[260px_1fr]">
          {/* left rail — visual progress */}
          <ol className="hidden flex-col gap-2 lg:flex">
            {items.map((it, i) => (
              <li key={it.n} className="bn-rail-item relative flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white px-3.5 py-3 text-ink"
                style={{ transition: "background-color 0.4s ease, color 0.4s ease" }}>
                <span className="text-[10px] font-semibold tracking-[0.22em]">{it.n}</span>
                <span className="text-[12.5px] font-semibold">{it.title}</span>
                <span className="bn-rail-bar absolute -bottom-px left-3.5 right-3.5 h-[2px] origin-left rounded-full bg-brand" style={{ transform: "scaleX(0)" }} />
              </li>
            ))}
          </ol>

          {/* right stage — cards stack in same slot */}
          <div className="relative h-[420px]">
            {items.map((it, i) => (
              <article key={it.n} className="bn-card card absolute inset-0 grid grid-cols-1 gap-5 p-7 md:p-9 lg:grid-cols-[1fr_280px]" style={{ opacity: i === 0 ? undefined : 0 }}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-light to-brand text-white shadow-[0_10px_28px_-10px_rgba(10,132,227,.55)]">
                      {it.icon}
                    </span>
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-brand">Benefit {it.n}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[clamp(22px,2.6vw,32px)] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-muted">{it.body}</p>
                </div>
                <div className="card-tinted relative flex flex-col justify-center gap-1 p-6 text-center">
                  <div className="font-display text-[clamp(34px,5vw,54px)] font-bold leading-none tracking-[-0.04em] text-good">
                    {it.metric}
                  </div>
                  <div className="text-[12px] text-ink-muted">{it.metricLabel}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
