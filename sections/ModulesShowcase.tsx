"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Truck, ClipboardList, Search, Wallet, ArrowRight } from "lucide-react";

type Module = {
  id: string;
  category: string;
  title: string;
  body: string;
  bullets: string[];
  icon: React.ReactNode;
  image: string;
};

const modules: Module[] = [
  {
    id: "fleet",
    category: "Fleet Manager",
    title: "Every vehicle, one screen.",
    body: "Live map of every truck, bus, van, generator and yacht — utilisation, location, alerts and exceptions, all in one command view.",
    bullets: ["Live unified map", "Utilisation & idle", "Geofences & alerts", "Driver scorecards"],
    icon: <Truck className="h-4 w-4" />,
    image: "/modules/fleet-manager/hyuiuyku.png",
  },
  {
    id: "task",
    category: "Task Manager",
    title: "Dispatch in seconds.",
    body: "Assign jobs to drivers from any device with auto-routes, ETAs and proof-of-completion captured automatically.",
    bullets: ["Drag-and-drop dispatch", "Auto-routed ETAs", "Proof of delivery", "SLA tracking"],
    icon: <ClipboardList className="h-4 w-4" />,
    image: "/modules/task-manager/jkliului.png",
  },
  {
    id: "inspection",
    category: "Inspection",
    title: "Pre-trip checks that stick.",
    body: "Mobile inspection workflows for drivers — photo evidence, defect routing, audit-ready logs for every vehicle.",
    bullets: ["Custom checklists", "Photo evidence", "Defect routing", "Audit-ready logs"],
    icon: <Search className="h-4 w-4" />,
    image: "/modules/inspection/kjiuguy.png",
  },
  {
    id: "expense",
    category: "Expense Manager",
    title: "Fuel & cost control.",
    body: "Capture fuel, tolls, maintenance and driver expenses against every vehicle — exportable for finance, ready for audit.",
    bullets: ["Receipt OCR", "Per-vehicle P&L", "Maintenance budgets", "Finance export"],
    icon: <Wallet className="h-4 w-4" />,
    image: "/modules/expense-manager/main.png",
  },
];

export default function ModulesShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () => tr.scrollWidth - el.clientWidth;
        gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance() + el.clientHeight * 0.5}`,
            pin: true,
            scrub: 1.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar.current) progressBar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="software" ref={root} className="relative overflow-hidden" style={{ background: "var(--bg-mist)" }}>
      <div className="flex h-screen flex-col">
        <div className="relative z-20 px-6 pt-24 text-center">
          <span className="pill">Software · 4 modules · one platform</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(22px,3vw,38px)] font-bold leading-[1.12] text-gradient">
            Everything your fleet needs — scroll through the stack.
          </h2>
          <div className="mx-auto mt-5 h-[3px] w-[160px] overflow-hidden rounded-full bg-[var(--line)]">
            <div ref={progressBar} className="h-full origin-left bg-gradient-to-r from-brand-light to-warm-deep" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>

        <div className="relative flex flex-1 items-center overflow-hidden">
          <div ref={track} className="flex shrink-0 gap-6 pl-[8vw] pr-[12vw] will-change-transform">
            {modules.map((m, i) => (
              <ModuleCard key={m.id} index={i} {...m} />
            ))}
            <ClosingCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ index, category, title, body, bullets, icon, image }: Module & { index: number }) {
  return (
    <article className="card relative grid w-[min(72vw,720px)] shrink-0 grid-cols-1 gap-5 overflow-hidden p-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="flex flex-col justify-between gap-5 p-1">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-light to-brand text-white shadow-[0_8px_20px_-8px_rgba(10,132,227,.55)]">
              {icon}
            </span>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
              0{index + 1} · {category}
            </div>
          </div>
          <h3 className="mt-4 font-display text-[clamp(18px,1.9vw,24px)] font-bold leading-[1.18] tracking-[-0.025em] text-ink">{title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{body}</p>
        </div>
        <ul className="grid grid-cols-2 gap-1.5 text-[11.5px] text-ink-muted">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 rounded-md border border-[var(--line)] bg-bg-mist px-2.5 py-1.5">
              <span className="h-1 w-1 rounded-full bg-brand" />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-bg-mist">
        <div className="relative aspect-[16/11] w-full overflow-hidden">
          <Image src={image} alt={category} fill sizes="(max-width: 1024px) 70vw, 420px" className="object-cover" />
        </div>
      </div>
    </article>
  );
}

function ClosingCard() {
  return (
    <article className="card-dark relative grid w-[min(56vw,420px)] shrink-0 place-items-center overflow-hidden p-8 text-center">
      <div className="absolute -left-12 -top-20 h-[260px] w-[260px] rounded-full [filter:blur(50px)]" style={{ background: "radial-gradient(circle,rgba(91,155,255,.45),transparent 65%)" }} />
      <div className="absolute -bottom-16 -right-12 h-[220px] w-[220px] rounded-full [filter:blur(50px)]" style={{ background: "radial-gradient(circle,rgba(251,234,188,.30),transparent 65%)" }} />
      <div className="relative">
        <span className="pill-on-brand">One platform</span>
        <h3 className="mt-4 font-display text-[clamp(18px,2vw,26px)] font-bold leading-[1.15] text-gradient-on-brand">
          Activate only what you need today.
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed ink-on-brand-muted">
          Add more modules as your fleet grows — the data stays in one place.
        </p>
        <button className="mt-5 btn-on-light-primary">
          Build my package <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
