"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Activity, Radio, ShieldCheck, MapPin } from "lucide-react";

type Pin = { top: string; left: string; label: string; sub: string; tone: "primary" | "warn" | "ok" };

const pins: Pin[] = [
  { top: "28%", left: "22%", label: "AUH-B2 · Bus",   sub: "ETA 9 min",         tone: "primary" },
  { top: "44%", left: "40%", label: "DXB-A4 · Truck", sub: "62 km/h · on-route", tone: "primary" },
  { top: "62%", left: "32%", label: "SHJ-V3 · Van",   sub: "Delivered",          tone: "ok" },
  { top: "32%", left: "62%", label: "GEN-07",         sub: "Idle 12 min",        tone: "warn" },
  { top: "58%", left: "72%", label: "RAK-Y1 · Yacht", sub: "Docked",             tone: "ok" },
  { top: "22%", left: "80%", label: "FUJ-T9 · Crane", sub: "Operating",          tone: "primary" },
];

const vehicles = [
  { src: "/car.png",       top: "70%", left: "10%", w: 86 },
  { src: "/bus.png",       top: "16%", left: "10%", w: 104 },
  { src: "/van.png",       top: "78%", left: "60%", w: 92 },
  { src: "/track.png",     top: "12%", left: "58%", w: 100 },
  { src: "/generator.png", top: "76%", left: "84%", w: 78 },
  { src: "/bike.png",      top: "20%", left: "44%", w: 70 },
];

/**
 * Pinned + scrub: the map starts empty; vehicles fade in, GPS pins drop one
 * by one, then KPI tiles count up — all driven by the scroll wheel.
 */
export default function LiveNetwork() {
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
          end: "+=320%",
          pin: stage.current,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(".ln-head > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 })
        .fromTo(".ln-map", { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 1.0 }, "<0.2")
        .fromTo(".ln-land", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "<0.2")
        .fromTo(".ln-vehicle", { y: 18, opacity: 0 }, { y: 0, opacity: 0.9, duration: 0.7, stagger: 0.08 }, "<0.1")
        .fromTo(".ln-route",   { drawSVG: "0%" as any, opacity: 0 }, { opacity: 0.7, duration: 0.8 }, "<")
        .fromTo(".ln-pin", { y: -20, scale: 0.6, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.55, stagger: 0.18, ease: "back.out(2)" }, "<0.2")
        // KPI count-ups bound to scroll progress
        .add(() => { /* anchor */ })
        .fromTo(".ln-kpi", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "+=0.2")
        .to({}, { duration: 0.8 });

      // Scroll-tied number counters — synced to the same timeline progress
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        const target = parseFloat(node.dataset.count!);
        const obj = { v: 0 };
        gsap.fromTo(obj, { v: 0 }, {
          v: target, ease: "none",
          scrollTrigger: {
            trigger: node, start: "top 90%", end: "top 30%", scrub: true,
          },
          onUpdate: () => {
            const suffix = node.dataset.suffix ?? "";
            const decimals = parseInt(node.dataset.decimals ?? "0", 10);
            node.textContent = obj.v.toFixed(decimals) + suffix;
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative" style={{ background: "var(--bg-mist)" }}>
      <div ref={stage} className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="ln-head flex flex-col items-center text-center max-w-2xl">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_1px_var(--brand)]" />
            Live network
          </span>
          <h2 className="mt-5 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.1] text-gradient">
            One live network. Across the UAE &amp; beyond.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            Every vehicle, driver and asset reports back in real time — no black boxes, just the truth on a map.
          </p>
        </div>

        <div className="ln-map card relative mt-8 aspect-[16/9] w-full max-w-[1080px] overflow-hidden p-0">
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #EAF4FE 0%, #D6ECFB 100%)" }} />
          <div className="absolute inset-0 map-grid" />

          <svg viewBox="0 0 1080 600" className="ln-land absolute inset-0 h-full w-full opacity-0">
            <defs>
              <linearGradient id="ln-land" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(10,132,227,0.22)" />
                <stop offset="100%" stopColor="rgba(10,132,227,0.06)" />
              </linearGradient>
            </defs>
            <path d="M 120 200 Q 220 140 320 180 T 520 200 T 720 170 T 920 220 L 940 360 Q 820 420 700 380 T 460 410 T 240 420 T 100 360 Z" fill="url(#ln-land)" stroke="rgba(10,132,227,.4)" strokeWidth="1" />
            <path d="M 80 460 Q 280 480 480 470 T 880 480 L 880 540 Q 600 560 320 540 T 80 540 Z" fill="url(#ln-land)" stroke="rgba(10,132,227,.3)" strokeWidth="1" />
          </svg>

          {vehicles.map((v, i) => (
            <div key={i} className="ln-vehicle pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 opacity-0"
              style={{ top: v.top, left: v.left, width: v.w }}>
              <Image src={v.src} alt="" width={v.w} height={v.w * 0.6} className="h-auto w-full drop-shadow-[0_8px_16px_rgba(10,132,227,0.25)]" />
            </div>
          ))}

          <svg viewBox="0 0 1080 600" className="ln-route absolute inset-0 h-full w-full opacity-0" preserveAspectRatio="none">
            <path d="M 238 168 Q 380 280 432 264" stroke="rgba(10,132,227,.5)" strokeWidth="1.6" strokeDasharray="4 6" fill="none" />
            <path d="M 432 264 Q 540 340 670 192" stroke="rgba(10,132,227,.5)" strokeWidth="1.6" strokeDasharray="4 6" fill="none" />
            <path d="M 670 192 Q 760 280 778 348" stroke="rgba(10,132,227,.4)" strokeWidth="1.6" strokeDasharray="4 6" fill="none" />
          </svg>

          {pins.map((p, i) => {
            const color = p.tone === "warn" ? "#f59f0b" : p.tone === "ok" ? "#14a86b" : "#0a84e3";
            return (
              <div key={i} className="ln-pin absolute z-10 opacity-0" style={{ top: p.top, left: p.left, transform: "translate(-50%,-100%)" }}>
                <div className="relative mx-auto h-6 w-6">
                  <div className="gps-ping" style={{ background: `${color}55` }} />
                  <div className="absolute inset-1 rounded-full" style={{ background: color, boxShadow: `0 0 18px ${color}` }} />
                  <div className="absolute inset-[36%] rounded-full bg-white" />
                </div>
                <div className="mt-1.5 whitespace-nowrap rounded-md border border-[var(--line-strong)] bg-white px-2 py-1 text-[10px] font-medium text-ink shadow-card">
                  <div className="font-semibold">{p.label}</div>
                  <div className="text-[9px] text-ink-subtle">{p.sub}</div>
                </div>
              </div>
            );
          })}

          <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white px-3 py-1.5 text-[10.5px] font-medium text-ink shadow-card">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-brand-light to-brand"><Radio className="h-2.5 w-2.5 text-white" /></span>
            Live ping · 1.1s
          </div>
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white px-3 py-1.5 text-[10.5px] font-medium text-ink shadow-card">
            <Image src="/uae-flag.svg" alt="UAE" width={16} height={16} className="rounded-full" />
            UAE · Gulf region
          </div>
        </div>

        <div className="mt-7 grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
          <KpiTile icon={<Activity className="h-3.5 w-3.5" />} count="38"   suffix="K+" decimals={0} label="Vehicles tracked" />
          <KpiTile icon={<MapPin   className="h-3.5 w-3.5" />} count="1200" suffix="+"  decimals={0} label="Fleets onboarded" />
          <KpiTile icon={<Radio    className="h-3.5 w-3.5" />} count="1.1"  suffix="s"  decimals={1} label="Ping interval" />
          <KpiTile icon={<ShieldCheck className="h-3.5 w-3.5" />} count="99.97" suffix="%" decimals={2} label="Platform uptime" />
        </div>
      </div>
    </section>
  );
}

function KpiTile({ icon, count, suffix, decimals, label }: { icon: React.ReactNode; count: string; suffix: string; decimals: number; label: string }) {
  return (
    <div className="ln-kpi card relative overflow-hidden p-5 opacity-0">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-light to-brand text-white">{icon}</span>
      <div className="mt-3 font-display text-[clamp(22px,3vw,32px)] font-bold leading-none tracking-[-0.03em] text-ink"
        data-count={count} data-suffix={suffix} data-decimals={decimals}>0{suffix}</div>
      <div className="mt-1.5 text-[12px] text-ink-muted">{label}</div>
    </div>
  );
}
