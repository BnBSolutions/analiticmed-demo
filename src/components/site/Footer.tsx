import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { CLINIC, diagnostics } from "@/data/site";
import { useT } from "@/lib/i18n";
import { Logo } from "./ui";

export function Footer() {
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  const h = (x: string | { ro: string; ru: string }) => (typeof x === "string" ? x : t(x));
  return (
    <footer className="border-t bg-surface">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo />
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="size-4 text-primary" />{t(CLINIC.city)}</li>
            <li><a href={CLINIC.phoneHref} className="flex gap-2 hover:text-primary"><Phone className="size-4 text-primary" />{CLINIC.phone}</a></li>
            <li><a href={`mailto:${CLINIC.email}`} className="flex gap-2 hover:text-primary"><Mail className="size-4 text-primary" />{CLINIC.email}</a></li>
          </ul>
          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
            {CLINIC.hours.map((x) => (
              <li key={x.d.ro}>{t(x.d)}: {h(x.h)}</li>
            ))}
          </ul>
        </div>
        <FooterCol title={ui.services}>
          {diagnostics.slice(0, 5).map((d) => (
            <Link key={d.slug} to="/servicii/$slug" params={{ slug: d.slug }} className="hover:text-primary">{t(d.name)}</Link>
          ))}
          <Link to="/servicii" className="hover:text-primary">{ui.allServices}</Link>
        </FooterCol>
        <FooterCol title={ru ? "Пациентам" : "Pacienți"}>
          <Link to="/ghidul-pacientului" className="hover:text-primary">{ui.guide}</Link>
          <Link to="/laborator" className="hover:text-primary">{ui.lab}</Link>
          <Link to="/check-up" className="hover:text-primary">{ui.checkup}</Link>
          <Link to="/contacte" hash="programare" className="hover:text-primary">{ui.book}</Link>
        </FooterCol>
        <FooterCol title={ui.about}>
          <Link to="/despre-clinica" className="hover:text-primary">{ui.about}</Link>
          <Link to="/medici" className="hover:text-primary">{ui.doctors}</Link>
          <Link to="/noutati" className="hover:text-primary">{ui.news}</Link>
          <Link to="/contacte" className="hover:text-primary">{ui.contacts}</Link>
        </FooterCol>
        <FooterCol title={ru ? "Правовая информация" : "Informații legale"}>
          <Link to="/ghidul-pacientului" hash="drepturi" className="hover:text-primary">{ru ? "Права пациента" : "Drepturile pacientului"}</Link>
          <Link to="/ghidul-pacientului" hash="date-personale" className="hover:text-primary">{ru ? "Защита персональных данных" : "Protecția datelor personale"}</Link>
          <Link to="/despre-clinica" hash="licenta" className="hover:text-primary">{ru ? "Лицензия и реквизиты" : "Licență și rechizite"}</Link>
        </FooterCol>
      </div>
      <div className="border-t">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {CLINIC.legal}. {ru ? "Все права защищены." : "Toate drepturile rezervate."}</p>
          <div className="flex gap-3">
            {CLINIC.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-9 place-items-center rounded-full border bg-background text-primary-dark hover:border-primary">
                {s.name === "Facebook" ? <Facebook className="size-4" /> : <Instagram className="size-4" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">{title}</h3>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
