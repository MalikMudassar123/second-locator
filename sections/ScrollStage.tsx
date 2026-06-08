"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import {
  Truck, MapPin, ShieldCheck, ArrowRight, Navigation,
  BadgeCheck, Activity, Radio,
} from "lucide-react";

/**
 * Locator — primary pinned storytelling stage.
 *
 *   pin: true · scrub: 1.6
 *
 * Five scenes share one master timeline on a CONTINUOUS Locator-blue sky.
 * Each scene is a single flex column (label → headline → product surface).
 * The Dubai skyline + sun glow are anchored to the stage; only scene
 * content crossfades.
 */
export default function ScrollStage() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // ambient warm sun glow — always running
      gsap.to(".hero-sun", { opacity: 0.9, scale: 1.06, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" });

      if (reduced) { el.classList.add("fallback"); return; }

      const EASE = "power2.inOut";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=560%",
          pin: stage.current,
          scrub: 1.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: EASE },
      });

      // ── HERO → TRACK
      tl.to(".s-hero", { opacity: 0, y: -24, duration: 1.0 })
        // skyline tucks down a touch as the user advances
        .to(".hero-skyline", { y: 30, opacity: 0.55, duration: 1.2 }, "<")
        .fromTo(".s-track", { opacity: 0 }, { opacity: 1, duration: 1.0 }, "<0.4")
        .fromTo(".s-track .head-in", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "<")
        .fromTo(".s-track .map",     { x: -26, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0 }, "<0.05")
        .fromTo(".s-track .phone",   { x: 26, opacity: 0 },  { x: 0, opacity: 1, duration: 1.0 }, "<")
        .to({}, { duration: 1.4 })

        // ── TRACK → DISPATCH
        .to(".s-track .head-in", { y: -14, opacity: 0, duration: 0.7 })
        .to(".s-track .map",     { y: -14, opacity: 0, duration: 0.7 }, "<")
        .to(".s-track .phone",   { y: -14, opacity: 0, duration: 0.7 }, "<0.05")
        .fromTo(".s-dispatch", { opacity: 0 }, { opacity: 1, duration: 0.9 }, "<0.05")
        .fromTo(".s-dispatch .head-in", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "<")
        .fromTo(".s-dispatch .phone",   { y: 26, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1.0 }, "<0.05")
        .fromTo(".s-dispatch .job-l",   { x: -28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, "<0.05")
        .fromTo(".s-dispatch .job-r",   { x: 28,  opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, "<")
        .to({}, { duration: 1.4 })

        // ── DISPATCH → INSIGHTS
        .to(".s-dispatch .head-in", { y: -14, opacity: 0, duration: 0.7 })
        .to(".s-dispatch .phone",   { y: -14, opacity: 0, duration: 0.7 }, "<")
        .to(".s-dispatch .job-l, .s-dispatch .job-r", { y: -14, opacity: 0, duration: 0.7 }, "<")
        .fromTo(".s-insights", { opacity: 0 }, { opacity: 1, duration: 0.9 }, "<0.05")
        .fromTo(".s-insights .head-in", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "<")
        .fromTo(".s-insights .dash",    { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, "<0.05")
        .fromTo(".s-insights .kpi",     { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "<0.05")
        .to({}, { duration: 1.4 })

        // ── INSIGHTS → OUTRO
        .to(".s-insights", { opacity: 0, y: -18, duration: 0.9 })
        .fromTo(".s-outro", { opacity: 0 }, { opacity: 1, duration: 0.9 }, "<0.15")
        .fromTo(".s-outro > *", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "<")
        .to({}, { duration: 1.2 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative" id="home">
      <div ref={stage} className="relative h-screen w-full overflow-hidden brand-sky">
        {/* ambient sky atmospherics — sized so the skyline fills lower viewport */}
        <div className="hero-sun pointer-events-none absolute left-1/2 bottom-[6%] z-[1] h-[42%] w-[68%] -translate-x-1/2 [filter:blur(30px)] [mix-blend-mode:screen]"
          style={{ background: "radial-gradient(50% 60% at 50% 70%, rgba(251,234,188,.92) 0%, rgba(251,234,188,.50) 32%, rgba(251,234,188,.14) 62%, rgba(251,234,188,0) 92%)" }} />
        <div className="hero-skyline pointer-events-none absolute bottom-0 left-1/2 z-[2] w-[clamp(420px,62vw,820px)] -translate-x-1/2 opacity-100">
          <Image src="/building image.png" alt="Dubai skyline" width={820} height={460} priority className="h-auto w-full" />
        </div>
        <div className="pointer-events-none absolute left-[2%] bottom-[14%] z-[2] hidden w-[clamp(140px,18vw,260px)] opacity-80 md:block">
          <Image src="/skky.png" alt="" width={260} height={180} className="h-auto w-full mix-blend-screen" />
        </div>
        <div className="pointer-events-none absolute top-[12%] right-[3%] z-[2] hidden w-[clamp(140px,18vw,240px)] opacity-80 md:block">
          <Image src="/skky.png" alt="" width={240} height={170} className="h-auto w-full mix-blend-screen [transform:scaleX(-1)]" />
        </div>

        {/* ── 1 · HERO ────────────────────────────────────────── */}
        <div className="s-hero scene">
          <div className="relative z-[5] flex flex-col items-center text-center">
            <span className="pill-on-brand mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-warm shadow-[0_0_10px_2px_rgba(251,234,188,.7)]" />
              AI &amp; GPS telematics · made in the UAE
            </span>
            <h1 className="max-w-[820px] text-[clamp(28px,4.4vw,54px)] font-bold leading-[1.06] text-white">
              Manage your Vehicles &amp; your Team.
              <span className="text-gradient-on-brand"> From one app.</span>
            </h1>
            <p className="mt-4 max-w-[500px] text-[clamp(13.5px,1.2vw,15.5px)] leading-relaxed text-white/85">
              Real-time GPS, driver-behaviour AI, video telematics &amp; compliance-grade reports — purpose-built for fleets in the Gulf.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button className="btn-on-light-primary">Get a Quote <ArrowRight className="h-4 w-4" /></button>
              <button className="btn-on-light-ghost">Watch demo</button>
            </div>
            <div className="mt-5 flex items-center gap-2 text-[11.5px] font-medium text-white/85">
              <ShieldCheck className="h-3.5 w-3.5 text-warm" /> Regulatory GPS Certificate · UAE-licensed
            </div>
          </div>
        </div>

        {/* ── 2 · TRACK ───────────────────────────────────────── */}
        <div className="s-track scene opacity-0">
          <div className="scene-head head-in">
            <SceneLabel>01 · Track</SceneLabel>
            <h2 className="text-[clamp(24px,3.4vw,40px)] font-bold leading-[1.1] text-white">
              Every vehicle. Every second. <span className="text-gradient-on-brand">On one live map.</span>
            </h2>
          </div>
          <div className="scene-stage grid gap-6 lg:grid-cols-[1.4fr_auto] lg:items-center">
            <div className="map card relative overflow-hidden p-0"><MapSurface /></div>
            <div className="phone mx-auto"><DeviceFrame><ScreenTrack /></DeviceFrame></div>
          </div>
        </div>

        {/* ── 3 · DISPATCH ────────────────────────────────────── */}
        <div className="s-dispatch scene opacity-0">
          <div className="scene-head head-in">
            <SceneLabel>02 · Dispatch</SceneLabel>
            <h2 className="text-[clamp(24px,3.4vw,40px)] font-bold leading-[1.1] text-white">
              Dispatch jobs to drivers <span className="text-gradient-on-brand">in seconds.</span>
            </h2>
          </div>
          <div className="scene-stage grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <div className="job-l hidden justify-self-end lg:block"><DriverCard /></div>
            <div className="phone mx-auto"><DeviceFrame><ScreenDispatch /></DeviceFrame></div>
            <div className="job-r hidden justify-self-start lg:block"><JobCard /></div>
          </div>
        </div>

        {/* ── 4 · INSIGHTS ────────────────────────────────────── */}
        <div className="s-insights scene opacity-0">
          <div className="scene-head head-in">
            <SceneLabel>03 · Insights</SceneLabel>
            <h2 className="text-[clamp(24px,3.4vw,40px)] font-bold leading-[1.1] text-white">
              Insights you can <span className="text-gradient-on-brand">actually act on.</span>
            </h2>
          </div>
          <div className="scene-stage grid gap-4 lg:grid-cols-[auto_1.5fr]">
            <div className="grid grid-cols-2 gap-3 self-center lg:grid-cols-1">
              <Kpi value="−31%" label="Idle time" />
              <Kpi value="+18%" label="On-time deliveries" />
              <Kpi value="−24%" label="Fuel / km" />
              <Kpi value="100%" label="Audits passed" />
            </div>
            <div className="dash card relative overflow-hidden p-0"><DashSurface /></div>
          </div>
        </div>

        {/* ── 5 · OUTRO ───────────────────────────────────────── */}
        <div className="s-outro scene opacity-0">
          <div className="flex flex-col items-center gap-5 pt-[6vh]">
            <SceneLabel>Ready when you are</SceneLabel>
            <h2 className="max-w-[760px] text-[clamp(28px,4.4vw,52px)] font-bold leading-[1.05] text-white">
              Take command of your fleet. <span className="text-gradient-on-brand">In one app.</span>
            </h2>
            <p className="max-w-[480px] text-[clamp(14px,1.3vw,16px)] leading-relaxed text-white/85">
              Talk to a Locator specialist — a tailored quote ready within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="btn-on-light-primary">Get a Quote <ArrowRight className="h-4 w-4" /></button>
              <button className="btn-on-light-ghost">Book a demo</button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-1 text-[12px] text-white/80">
              <span>✓ UAE-licensed GPS</span>
              <span>✓ 24/7 local support</span>
              <span>✓ Arabic &amp; English</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── shared bits ─────────────────────────────────────────────────────── */

function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="pill-on-brand">
      <span className="h-1 w-1 rounded-full bg-warm shadow-[0_0_8px_1px_var(--warm)]" />
      {children}
    </span>
  );
}

/* ── product surfaces ────────────────────────────────────────────────── */

function MapSurface() {
  return (
    <div className="relative aspect-[16/10] w-full max-w-[640px] overflow-hidden">
      {/* light map tile */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #EAF4FE 0%, #D6ECFB 100%)" }} />
      <div className="absolute inset-0 map-grid" />
      <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a84e3" />
            <stop offset="100%" stopColor="#08b2e0" />
          </linearGradient>
        </defs>
        <path d="M 40 420 C 140 340, 240 390, 320 320 S 520 240, 600 180 S 740 100, 770 60" stroke="url(#route)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 80 90 C 200 160, 320 110, 420 180 S 620 300, 720 340" stroke="rgba(10,132,227,.4)" strokeWidth="1.6" strokeDasharray="5 7" strokeLinecap="round" fill="none" />
      </svg>
      <MapPin2 top="32%" left="64%" label="DXB-A4 · Truck" sub="62 km/h · on-route" tone="primary" />
      <MapPin2 top="58%" left="28%" label="AUH-B2 · Bus"   sub="ETA 9 min"          tone="primary" />
      <MapPin2 top="22%" left="34%" label="GEN-07"         sub="Idle alert"         tone="warn" />
      <MapPin2 top="72%" left="72%" label="SHJ-V3 · Van"   sub="Delivered"          tone="ok" />
      <div className="absolute right-3 top-3 flex items-center gap-2 rounded-xl border border-[var(--line-strong)] bg-white px-2.5 py-1.5 text-[10.5px] font-medium text-ink shadow-card">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-brand-light to-brand text-white"><Activity className="h-3 w-3" /></span>
        28 live · 4 idle
      </div>
    </div>
  );
}

function MapPin2({ top, left, label, sub, tone }: { top: string; left: string; label: string; sub: string; tone: "primary" | "warn" | "ok" }) {
  const color = tone === "warn" ? "#f59f0b" : tone === "ok" ? "#14a86b" : "#0a84e3";
  return (
    <div className="absolute z-[2]" style={{ top, left, transform: "translate(-50%,-100%)" }}>
      <div className="relative mx-auto h-5 w-5">
        <div className="gps-ping" style={{ background: `${color}55` }} />
        <div className="absolute inset-[3px] rounded-full" style={{ background: color, boxShadow: `0 0 16px ${color}` }} />
        <div className="absolute inset-[36%] rounded-full bg-white" />
      </div>
      <div className="mt-1.5 whitespace-nowrap rounded-md border border-[var(--line-strong)] bg-white px-2 py-1 text-left text-[9.5px] font-medium text-ink shadow-card">
        <div className="font-semibold">{label}</div>
        <div className="text-[9px] text-ink-subtle">{sub}</div>
      </div>
    </div>
  );
}

function DashSurface() {
  return (
    <div className="relative aspect-[16/10] w-full max-w-[680px] overflow-hidden" style={{ background: "linear-gradient(160deg, #F1F6FE 0%, #FFFFFF 100%)" }}>
      <div className="absolute inset-0 map-grid opacity-50" />
      <div className="relative grid h-full grid-cols-12 gap-2.5 p-4">
        <div className="col-span-3 flex flex-col gap-1.5">
          {["Fleet HQ", "Live map", "Trips", "Drivers", "Video", "Inspection"].map((s, i) => (
            <div key={s} className={`rounded-md px-2.5 py-1.5 text-[10px] font-medium ${i === 0 ? "bg-gradient-to-b from-brand-light to-brand text-white shadow-[0_6px_16px_-6px_rgba(10,132,227,.6)]" : "text-ink-muted"}`}>{s}</div>
          ))}
        </div>
        <div className="col-span-9 flex flex-col gap-2.5">
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "Utilisation", v: "84%",    d: "+2.4%" },
              { l: "Fuel /km",    v: "0.42 L", d: "−24%"  },
              { l: "Trips",       v: "176",    d: "+12"   },
            ].map((m) => (
              <div key={m.l} className="rounded-lg border border-[var(--line)] bg-white p-2.5">
                <div className="text-[9px] uppercase tracking-[0.1em] text-ink-subtle">{m.l}</div>
                <div className="mt-0.5 font-display text-[15px] font-bold text-ink">{m.v}</div>
                <div className="text-[9.5px] font-semibold text-good">{m.d}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-lg border border-[var(--line)] bg-white p-2.5">
            <div className="mb-1.5 flex items-center justify-between text-[9.5px] text-ink-subtle">
              <span>Fleet activity · 24h</span><span className="text-brand">Live</span>
            </div>
            <svg viewBox="0 0 400 100" className="h-[calc(100%-18px)] w-full">
              <defs>
                <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5b9bff" /><stop offset="100%" stopColor="#0a84e3" />
                </linearGradient>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(251,234,188,.6)" /><stop offset="100%" stopColor="rgba(251,234,188,0)" />
                </linearGradient>
              </defs>
              {[28,52,38,68,45,64,82,72,90,60,76,52].map((h, i) => (
                <rect key={i} x={i*32+10} y={100-h} width="18" height={h} rx="3" fill="url(#bar)" opacity="0.92" />
              ))}
              <path d="M 10 70 Q 60 45 110 55 T 210 38 T 310 28 T 400 22" stroke="#F6C46A" strokeWidth="1.8" fill="none" />
              <path d="M 10 70 Q 60 45 110 55 T 210 38 T 310 28 T 400 22 L 400 100 L 10 100 Z" fill="url(#area)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <div className="kpi card relative overflow-hidden p-4 text-left">
      <div className="font-display text-[clamp(20px,2.6vw,30px)] font-bold leading-none tracking-[-0.03em] text-good">{value}</div>
      <div className="mt-1.5 text-[11.5px] text-ink-muted">{label}</div>
    </div>
  );
}

function JobCard() {
  return (
    <div className="card w-[220px] p-3.5 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-brand">New job · #4192</span>
        <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-b from-brand-light to-brand text-white"><Navigation className="h-3 w-3" /></span>
      </div>
      <div className="mt-2 font-display text-[14px] font-bold text-ink">Jebel Ali → DWC</div>
      <div className="mt-0.5 text-[10.5px] text-ink-subtle">42 km · ETA 38 min</div>
      <div className="mt-3 flex gap-1.5">
        <div className="flex-1 rounded-lg bg-gradient-to-b from-brand-light to-brand py-1.5 text-center text-[10.5px] font-bold text-white">Assign</div>
        <div className="rounded-lg border border-[var(--line-strong)] px-2.5 py-1.5 text-[10.5px] font-semibold text-ink-muted">Later</div>
      </div>
    </div>
  );
}

function DriverCard() {
  return (
    <div className="card w-[200px] p-3.5 text-left">
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-warm to-warm-deep text-brand-deep"><Truck className="h-4 w-4" /></div>
        <div className="flex-1">
          <div className="flex items-center gap-1 text-[12px] font-semibold text-ink">Ahmed K. <BadgeCheck className="h-3 w-3 text-brand" /></div>
          <div className="text-[10px] text-good">● online · DXB-A4</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <Stat k="Score" v="96" />
        <Stat k="Trips" v="214" />
      </div>
    </div>
  );
}
function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-bg-mist px-2 py-1.5">
      <div className="text-[8.5px] uppercase tracking-[0.1em] text-ink-subtle">{k}</div>
      <div className="text-[12px] font-bold text-ink">{v}</div>
    </div>
  );
}

/* ── device shell — kept dark for realistic phone bezel ─────────────── */

function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[1179/2556] w-[220px] rounded-[38px] p-[8px] shadow-[0_40px_80px_-30px_rgba(15,27,58,0.4),0_20px_40px_-22px_rgba(10,132,227,.35)]"
      style={{ background: "linear-gradient(145deg,#3a4150 0%,#11151e 22%,#0c0f17 50%,#161b25 78%,#3a4150 100%)" }}>
      <div className="relative h-full w-full overflow-hidden rounded-[30px] shadow-[0_0_0_2px_#05070d]" style={{ background: "linear-gradient(180deg,#FFFFFF,#F1F6FE)" }}>
        <div className="absolute left-1/2 top-[9px] z-[8] h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
        <div className="absolute left-0 right-0 top-[9px] z-[7] flex h-[22px] items-center justify-between px-[18px] text-[9.5px] font-semibold text-ink">
          <span>9:41</span>
          <svg viewBox="0 0 24 24" className="h-2.5 w-3 fill-none stroke-current" strokeWidth="1.6"><rect x="2" y="8" width="17" height="9" rx="2" /><rect x="4" y="10" width="11" height="5" rx="1" className="fill-current" /></svg>
        </div>
        {children}
      </div>
    </div>
  );
}

function ScreenTrack() {
  return (
    <div className="absolute inset-0 flex flex-col px-3 pb-2.5 pt-[36px] text-ink">
      <div className="flex items-center gap-2 border-b border-[var(--line)] pb-2.5">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand-light to-brand text-white"><Truck className="h-3 w-3" /></div>
        <div className="flex-1">
          <div className="text-[10.5px] font-semibold">DXB-A4</div>
          <div className="text-[8.5px] text-good">● en route · ETA 14 min</div>
        </div>
      </div>
      <div className="relative mt-2 h-[110px] overflow-hidden rounded-xl border border-[var(--line)]" style={{ background: "linear-gradient(160deg,#EAF4FE,#D6ECFB)" }}>
        <div className="absolute inset-0 map-grid" />
        <svg viewBox="0 0 220 110" className="absolute inset-0 h-full w-full">
          <path d="M 8 95 C 50 60, 90 105, 130 55 S 200 22, 212 38" stroke="#0a84e3" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <circle cx="8" cy="95" r="3.5" fill="#14a86b" />
          <circle cx="212" cy="38" r="3.5" fill="#F6C46A" />
          <circle cx="130" cy="55" r="4" fill="#0a84e3" stroke="#fff" strokeWidth="1.4" />
        </svg>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1">
        {[{k:"Speed",v:"62"},{k:"Fuel",v:"78%"},{k:"ETA",v:"14m"}].map(s=>(
          <div key={s.k} className="rounded-md border border-[var(--line)] bg-bg-mist py-1 text-center">
            <div className="text-[7.5px] uppercase tracking-[0.1em] text-ink-subtle">{s.k}</div>
            <div className="text-[10px] font-bold text-ink">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-lg border border-[var(--line-brand)] p-2" style={{ background: "linear-gradient(160deg,rgba(10,132,227,.10),rgba(8,178,224,.04))" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[7.5px] uppercase tracking-[0.1em] text-brand">Next stop</div>
            <div className="font-display text-[11px] font-bold">Jebel Ali FZ</div>
          </div>
          <MapPin className="h-3 w-3 text-brand" />
        </div>
      </div>
    </div>
  );
}

function ScreenDispatch() {
  return (
    <div className="absolute inset-0 flex flex-col px-3 pb-2.5 pt-[36px] text-ink">
      <div className="flex items-center gap-2 border-b border-[var(--line)] pb-2.5">
        <div className="grid h-6 w-6 place-items-center rounded-[7px] bg-gradient-to-br from-brand-light to-brand"><Radio className="h-3 w-3 text-white" /></div>
        <div className="text-[10.5px] font-semibold">Dispatch board</div>
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        {[
          { id:"#4192", route:"Jebel Ali → DWC", eta:"38m",     live:true },
          { id:"#4193", route:"AUH → Sharjah",   eta:"1h 12m",  live:false },
          { id:"#4194", route:"Deira → Mall E.", eta:"22m",     live:true },
        ].map(j=>(
          <div key={j.id} className="rounded-lg border border-[var(--line)] bg-white p-2">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-brand">{j.id}</span>
              <span className={`text-[8.5px] font-semibold ${j.live ? "text-good" : "text-ink-subtle"}`}>{j.live ? "● live" : "queued"}</span>
            </div>
            <div className="mt-0.5 text-[10px] font-semibold">{j.route}</div>
            <div className="text-[8.5px] text-ink-subtle">ETA {j.eta}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-lg bg-gradient-to-b from-brand-light to-brand py-2 text-center text-[10px] font-bold text-white">Assign next job</div>
    </div>
  );
}
