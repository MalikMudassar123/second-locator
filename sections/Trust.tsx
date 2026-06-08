"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const logos = [
  { src: "/client-logos/DB-SCHENKER.png", alt: "DB Schenker" },
  { src: "/client-logos/GMG.png", alt: "GMG" },
  { src: "/client-logos/samsung.png", alt: "Samsung" },
  { src: "/client-logos/ABU-DHABI-EXECUTIVE-OFFICE.png", alt: "Abu Dhabi Executive Office" },
  { src: "/client-logos/AL LAITH Group.png", alt: "Al Laith Group" },
  { src: "/client-logos/Refrigerated-Transport-System-logo.png", alt: "Refrigerated Transport System" },
  { src: "/client-logos/SILVER-LINE-GROUP .png", alt: "Silver Line Group" },
  { src: "/client-logos/al-ghazal-transport.png", alt: "Al Ghazal Transport" },
  { src: "/client-logos/access-hire-middle-east-logo.png", alt: "Access Hire Middle East" },
  { src: "/client-logos/ELMEC-.png", alt: "Elmec" },
  { src: "/client-logos/United al saqerHeavy equiment .png", alt: "United Al Saqer" },
  { src: "/client-logos/al-furath-.png", alt: "Al Furath" },
];

/**
 * Pinned + scrub: the section pins for ~one viewport, and the logo row pans
 * horizontally driven by scroll progress. Once it finishes, normal scroll
 * resumes.
 */
export default function Trust() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const tr = track.current;
    if (!el || !tr) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, tr.scrollWidth - el.clientWidth + 80);
        gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance() + el.clientHeight * 0.5}`,
            pin: stage.current,
            scrub: 1.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(".tr-head > *", { y: 18, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative overflow-hidden" style={{ background: "var(--bg-mist)" }}>
      <div ref={stage} className="relative flex h-screen flex-col items-center justify-center px-6">
        <div className="tr-head mx-auto mb-12 max-w-3xl text-center">
          <span className="pill">Trusted partners</span>
          <h2 className="mt-5 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.1] text-gradient">
            Fleets across the UAE &amp; the region.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            1,200+ operators run their fleet on Locator — from last-mile couriers to heavy-equipment giants.
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
            style={{ background: "linear-gradient(90deg, var(--bg-mist), rgba(241,246,254,0))" }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
            style={{ background: "linear-gradient(270deg, var(--bg-mist), rgba(241,246,254,0))" }}
          />
          <div ref={track} className="flex shrink-0 items-center gap-12 will-change-transform px-[8vw] py-8">
            {logos.map((l, i) => (
              <div
                key={i}
                className="card flex h-[88px] w-[180px] shrink-0 items-center justify-center px-5"
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={180}
                  height={60}
                  className="h-full w-auto object-contain [filter:grayscale(1)_contrast(0.9)_opacity(0.72)] transition-all duration-300 hover:[filter:none]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-[12px] text-ink-subtle">
          <Image src="/uae-flag.svg" alt="UAE" width={18} height={18} className="rounded-full" />
          United Arab Emirates · GCC · Africa
        </div>
      </div>
    </section>
  );
}
