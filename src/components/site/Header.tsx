import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CLINIC, diagnostics, specialties } from "@/data/site";
import { useT } from "@/lib/i18n";
import { Logo } from "./ui";

export function Header() {
  const { ui, t, lang } = useT();
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/medici", label: ui.doctors },
    { to: "/laborator", label: ui.lab },
    { to: "/check-up", label: ui.checkup },
    { to: "/ghidul-pacientului", label: ui.guide },
    { to: "/noutati", label: ui.news },
    { to: "/despre-clinica", label: ui.about },
    { to: "/contacte", label: ui.contacts },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container-site flex h-16 items-center gap-4 md:h-20">
        <button
          className="rounded-md p-2 lg:hidden"
          aria-label={ui.menu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
        <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
          <Logo />
        </div>
        <div className="hidden flex-1 lg:block">
          <SiteSearch />
        </div>
        <a href={CLINIC.phoneHref} className="hidden items-center gap-2 font-semibold xl:flex">
          <Phone className="size-4 text-primary" /> {CLINIC.phone}
        </a>
        <a href={CLINIC.phoneHref} className="rounded-md p-2 text-primary lg:hidden" aria-label={CLINIC.phone}>
          <Phone className="size-5" />
        </a>
        <Link to="/contacte" hash="programare" className="btn-primary hidden lg:inline-flex">
          {ui.book}
        </Link>
      </div>

      <nav className="hidden border-t lg:block" aria-label="Principal">
        <div className="container-site flex h-12 items-center gap-6 text-sm font-medium">
          <div className="group relative">
            <Link to="/servicii" className="flex items-center gap-1 hover:text-primary">
              {ui.services} <ChevronDown className="size-4" />
            </Link>
            <div className="invisible absolute left-0 top-full z-50 w-[560px] pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-xl border bg-popover p-3 shadow-soft">
                {diagnostics.map((d) => (
                  <Link key={d.slug} to="/servicii/$slug" params={{ slug: d.slug }} className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                    {t(d.name)}
                  </Link>
                ))}
                <Link to="/servicii" className="col-span-2 rounded-md px-3 py-2 font-semibold text-primary-dark hover:bg-accent">
                  {ui.allServices} →
                </Link>
              </div>
            </div>
          </div>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-primary" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
          <LangSwitch className="ml-auto" />
        </div>
      </nav>

      <div className="border-t p-3 lg:hidden">
        <Link to="/contacte" hash="programare" className="btn-primary w-full">
          {ui.book}
        </Link>
      </div>

      {open && (
        <div className="border-t bg-background lg:hidden">
          <div className="container-site space-y-1 py-4">
            <SiteSearch />
            <Link to="/servicii" onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 font-medium hover:bg-accent">
              {ui.services}
            </Link>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 font-medium hover:bg-accent">
                {n.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 pt-3">
              <a href={CLINIC.phoneHref} className="font-semibold">{CLINIC.phone}</a>
              <LangSwitch />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang } = useT();
  return (
    <div className={`flex items-center gap-1 text-sm font-semibold ${className}`}>
      <Link to="." search={(p: Record<string, unknown>) => ({ ...p, lang: undefined })} hrefLang="ro" className={`rounded px-2 py-1 ${lang === "ro" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}>
        RO
      </Link>
      <Link to="." search={(p: Record<string, unknown>) => ({ ...p, lang: "ru" as const })} hrefLang="ru" className={`rounded px-2 py-1 ${lang === "ru" ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}>
        RU
      </Link>
    </div>
  );
}

function SiteSearch() {
  const { ui, t, lang } = useT();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    const items = [
      ...diagnostics.map((d) => ({ label: t(d.name), go: () => navigate({ to: "/servicii/$slug", params: { slug: d.slug } }) })),
      ...specialties.map((sp) => ({ label: t(sp.name), go: () => navigate({ to: "/medici", search: { spec: sp.slug } }) })),
      { label: ui.lab, go: () => navigate({ to: "/laborator" }) },
      { label: ui.homeTests, go: () => navigate({ to: "/laborator" }) },
      { label: ui.checkup, go: () => navigate({ to: "/check-up" }) },
    ];
    return items.filter((i) => i.label.toLowerCase().includes(s)).slice(0, 8);
  }, [q, t, ui, navigate, lang]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={ui.search}
        aria-label={ui.search}
        className="field bg-surface pl-10"
      />
      {q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border bg-popover p-2 shadow-soft">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">{ui.noResults}</p>
          ) : (
            results.map((r) => (
              <button
                key={r.label}
                onClick={() => {
                  setQ("");
                  r.go();
                }}
                className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
              >
                {r.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
