# facil — Crypto Messaging Landing Page

A premium, production-grade recreation of the **facil** crypto-wallet landing page: a pinned, scroll-scrubbed scene sequence with a realistic iPhone, refined lighting, and a true-3D orbital globe finale. Built to feel like a venture-backed SaaS product, not a template.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + **tailwindcss-animate**
- **GSAP** + **ScrollTrigger** — pinned master timeline, scrubbed to scroll
- **Lenis** smooth scroll, synced to GSAP's ticker
- **lucide-react** — consistent premium line-icon system (no emoji)
- Type pairing: **Sora** (display) + **Manrope** (body)

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Verified: `tsc --noEmit` clean and `next build` passes (~167 kB First Load JS).

## How the scroll works (important)

The page **does not scroll** like a normal document. `sections/ScrollStage.tsx`
pins a full-viewport stage and scrubs **one master GSAP timeline** onto scroll
position (`ScrollTrigger` `pin` + `scrub`). A single realistic iPhone persists
and morphs (scale / rotate / screen swap) while scenes crossfade in place:

Hero -> Chat / Pay / Confirm / Execute (phone shows a live payment + success
state) -> Feature bento -> tilted product showcase -> One Wallet . Every Chain
-> 3D orbital globe finale.

Under `prefers-reduced-motion` it falls back to a normal stacked layout.

## Design system

- **Type:** Sora display (700) with tight tracking; Manrope body. Loaded via
  Google Fonts `@import` in `globals.css`. For production you can swap to
  `next/font/google` (Sora, Manrope) for self-hosted, zero-layout-shift fonts.
- **Color & light:** layered multi-hue glows (blue + indigo) with `screen`
  blending, vignette, fine grid, and film grain — tokens in `tailwind.config.ts`
  and `app/globals.css`.
- **Components:** glass cards with inset top-highlight + deep ambient shadow,
  premium gradient buttons, pill eyebrows.
- **Device:** CSS iPhone with titanium bezel gradient, Dynamic Island, status
  bar, screen reflection + moving sheen, and two real app screens (chat + wallet).
- **Globe:** `perspective` + `transform-style: preserve-3d`; three inclined
  orbit rings with billboarded coin tokens (front larger, back smaller) for real
  depth, plus a glowing dotted sphere, rim light, starfield, and floating notes.

## Structure

```
app/
  layout.tsx          # metadata + SmoothScrollProvider (fonts via globals)
  page.tsx            # Navbar + ScrollStage + Footer
  globals.css         # design system, glass, grain, helpers, scene layers
components/
  providers/SmoothScrollProvider.tsx
  ui/Button.tsx, ui/Reveal.tsx
hooks/                # useScrollReveal / useTextReveal / useCounter (reusable)
lib/                  # gsap.ts, utils.ts (cn)
sections/
  Navbar.tsx, Footer.tsx
  ScrollStage.tsx     # the pinned scroll-scrubbed experience (core)
```

## Tuning

- **Pace / length:** the `end: "+=820%"` value on the master timeline controls
  total scroll distance (bigger = slower, more room per scene).
- **Per-scene timing:** each `.to(...)` block in `ScrollStage.tsx` has its own
  `duration` and `ease`; the empty `.to({}, { duration })` blocks are holds.
- **Globe:** ring radius / tilt / token count / speed live in the `rings` array
  inside the build effect.

## Notes

- Coin marks are generic, tasteful glyphs (not real brand logos) — drop in
  licensed SVGs if you want them exact.
- App screens are high-fidelity CSS mockups; replace with `next/image` captures
  for real product shots (aspect ratios are reserved to avoid layout shift).
