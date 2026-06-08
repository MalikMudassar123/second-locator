"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#software", label: "Software" },
  { href: "#service", label: "Service" },
  { href: "#industries", label: "Industries" },
  { href: "#regulatory", label: "Regulatory GPS" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-3" : "py-5")}>
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
            scrolled ? "border border-white/35 bg-white/15 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(15,27,58,0.25)]" : ""
          )}
        >
          <a href="#home" className="flex items-center gap-2 font-semibold text-white">
            <Image src="/logo.png" alt="Locator" width={120} height={40} className="h-9 w-auto" priority />
          </a>

          <ul className="hidden items-center gap-7 text-sm font-medium text-white/90 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="whitespace-nowrap transition-opacity hover:opacity-100 opacity-85">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Image
              src="/uae-flag.svg"
              alt="UAE"
              width={28}
              height={28}
              className="hidden h-7 w-7 rounded-full border-2 border-white/40 sm:block"
            />
            <button className="hidden sm:inline-flex btn-on-light-primary">Get a Quote</button>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {open && mounted &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex flex-col animate-fadein"
            style={{ background: "linear-gradient(165deg, #1360ee 0%, #0a84e3 38%, #08b2e0 72%, #3abede 100%)" }}>
            <div className="flex items-center justify-between border-b border-white/20 px-6 py-4">
              <Image src="/logo.png" alt="Locator" width={120} height={40} className="h-9 w-auto" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/15 py-4 text-base font-semibold text-white">
                    {l.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/15 px-6 py-5">
              <div className="mb-4 flex items-center gap-3">
                <Image src="/uae-flag.svg" alt="UAE" width={26} height={26} className="rounded-full border-2 border-white/40" />
                <span className="text-sm font-medium text-white/90">United Arab Emirates</span>
              </div>
              <button className="btn-on-light-primary w-full">Get a Quote</button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
