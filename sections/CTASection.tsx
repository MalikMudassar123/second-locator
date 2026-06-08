"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowRight, ShieldCheck } from "lucide-react";

/**
 * Pinned + scrub close: brand-blue card scales in, headline + sub + CTA + trust
 * row reveal sequentially as the user scrolls. Final moment of the page.
 */
export default function CTASection() {
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
          end: "+=260%",
          pin: stage.current,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(".cta-card",  { y: 60, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.9 })
        .fromTo(".cta-card .cta-item", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, "<0.2")
        .to({}, { duration: 0.6 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} id="contact" className="relative" style={{ background: "var(--bg-base)" }}>
      <div ref={stage} className="relative flex h-screen items-center justify-center overflow-hidden px-6">
        <div className="cta-card relative w-full max-w-5xl overflow-hidden rounded-[28px] p-9 md:p-16 brand-sky" style={{ opacity: 0 }}>
          <div className="absolute inset-0 map-grid-on-brand [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent_82%)]" />
          <div className="absolute -left-20 -top-28 h-[380px] w-[380px] rounded-full [filter:blur(70px)]"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,.35), transparent 65%)" }} />
          <div className="absolute -right-16 bottom-[-80px] h-[320px] w-[320px] rounded-full [filter:blur(70px)]"
            style={{ background: "radial-gradient(circle, rgba(251,234,188,.45), transparent 65%)" }} />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <span className="cta-item pill-on-brand">
              <ShieldCheck className="h-3 w-3" /> Regulatory GPS Certificate · UAE
            </span>
            <h2 className="cta-item max-w-3xl text-[clamp(28px,4.2vw,52px)] font-bold leading-[1.05] text-white">
              Take command of your fleet — <span className="text-gradient-on-brand">today.</span>
            </h2>
            <p className="cta-item max-w-xl text-[15px] leading-relaxed text-white/90">
              Talk to a Locator specialist. We&apos;ll scope your fleet, your compliance needs, and deliver a tailored quote within 24 hours.
            </p>
            <div className="cta-item flex flex-wrap items-center justify-center gap-3">
              <button className="btn-on-light-primary">Get a Quote <ArrowRight className="h-4 w-4" /></button>
              <button className="btn-on-light-ghost">Book a demo</button>
            </div>
            <div className="cta-item flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-[12px] text-white/80">
              <span>✓ UAE-licensed GPS</span>
              <span>✓ 24/7 local support</span>
              <span>✓ Arabic &amp; English</span>
              <span>✓ Onboarding in days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
