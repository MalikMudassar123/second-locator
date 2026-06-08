import Image from "next/image";

const cols = [
  { title: "Product", links: ["Fleet Manager", "Task Manager", "Inspection", "Expense Manager"] },
  { title: "Solutions", links: ["Logistics", "Construction", "Heavy Equipment", "Marine", "Public Transport"] },
  { title: "Company", links: ["About us", "Industries", "Service", "Contact"] },
  { title: "Legal", links: ["Regulatory GPS", "Privacy", "Terms", "Security"] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)] surface-mist px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-5">
        <div className="md:col-span-1">
          <a href="#home" className="flex items-center gap-2 font-semibold text-ink">
            <Image src="/logo-01.svg" alt="Locator" width={120} height={40} className="h-9 w-auto" />
          </a>
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            UAE-built fleet management &amp; GPS telematics. Manage your vehicles &amp; team from one premium command center.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Image src="/uae-flag.svg" alt="UAE" width={24} height={24} className="rounded-full border border-[var(--line-strong)]" />
            <span className="text-xs text-ink-subtle">Made in the United Arab Emirates</span>
          </div>
          <div className="mt-5 flex gap-3">
            {["X", "in", "IG"].map((s) => (
              <a key={s} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] bg-white text-ink-muted transition-colors hover:text-brand">
                {s}
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold text-ink">{c.title}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="transition-colors hover:text-brand">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 text-sm text-ink-subtle md:flex-row">
        <p>© {new Date().getFullYear()} Locator. All rights reserved.</p>
        <p>Powered by real-time GPS, AI &amp; edge telematics.</p>
      </div>
    </footer>
  );
}
