import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CLINIC } from "@/data/site";
import { seo, useT } from "@/lib/i18n";
import { clinicSchema } from "@/lib/schema";
import { PageHeader, Section } from "@/components/site/ui";
import { BookingForm } from "@/components/site/BookingForm";

export const Route = createFileRoute("/contacte")({
  head: ({ match }) =>
    seo(match.search, "/contacte", {
      ro: { title: "Contacte și programare – AnaliticMed Bălți", desc: "Telefon 0 620 00 020, e-mail clinica@analiticmed.md, program de lucru și hartă. Programați-vă online la clinica AnaliticMed din Bălți." },
      ru: { title: "Контакты и запись – AnaliticMed Бельцы", desc: "Телефон 0 620 00 020, e-mail clinica@analiticmed.md, часы работы и карта. Онлайн-запись в клинику AnaliticMed в Бельцах." },
    }, clinicSchema),
  component: Page,
});

function Page() {
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  return (
    <>
      <PageHeader crumb={ui.contacts} title={ru ? "Контакты клиники" : "Contactele clinicii"} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <ul className="space-y-5 rounded-xl border p-6">
            <li className="flex gap-3"><MapPin className="size-5 text-primary" /><span className="font-semibold">{t(CLINIC.city)}</span></li>
            <li className="flex gap-3"><Phone className="size-5 text-primary" /><a href={CLINIC.phoneHref} className="font-semibold hover:text-primary">{CLINIC.phone}</a></li>
            <li className="flex gap-3"><Mail className="size-5 text-primary" /><a href={`mailto:${CLINIC.email}`} className="font-semibold hover:text-primary">{CLINIC.email}</a></li>
            <li className="flex gap-3"><Clock className="size-5 text-primary" />
              <div className="space-y-1 text-sm">{CLINIC.hours.map((h) => <p key={h.d.ro}>{t(h.d)}: <b>{typeof h.h === "string" ? h.h : t(h.h)}</b></p>)}</div>
            </li>
          </ul>
          <iframe title={ru ? "Карта AnaliticMed в Бельцах" : "Harta AnaliticMed în Bălți"} src={CLINIC.mapSrc} loading="lazy" className="h-80 w-full rounded-xl border lg:h-full" />
        </div>
      </Section>
      <Section alt id="programare">
        <h2 className="mb-6 text-2xl">{ui.book}</h2>
        <BookingForm />
      </Section>
    </>
  );
}
