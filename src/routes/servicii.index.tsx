import { AppLink as Link } from "@/lib/router";
import { diagnostics, specialties } from "@/data/site";
import { useSeo, useT } from "@/lib/i18n";
import { Arrow, PageHeader, Section, SectionTitle } from "@/components/site/ui";

export function Page() {
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  useSeo("/servicii", {
    ro: { title: "Servicii medicale – AnaliticMed Bălți", desc: "Lista completă a serviciilor AnaliticMed: diagnostică funcțională (RMN, CT, ecografie, EEG) și consultații la peste 20 de specialități." },
    ru: { title: "Медицинские услуги – AnaliticMed Бельцы", desc: "Полный список услуг AnaliticMed: функциональная диагностика (МРТ, КТ, УЗИ, ЭЭГ) и консультации более 20 специалистов." },
  });
  return (
    <>
      <PageHeader crumb={ui.services} title={ui.allServices} sub={ru ? "Диагностика, консультации и лабораторные анализы в Бельцах." : "Diagnostică, consultații și analize de laborator în Bălți."} />
      <Section>
        <SectionTitle title={ru ? "Функциональная диагностика" : "Diagnostică funcțională"} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diagnostics.map((d) => (
            <Link key={d.slug} to={`/servicii/${encodeURIComponent(d.slug)}`} className="card-link group items-start">
              <div><h3 className="font-bold">{t(d.name)}</h3><p className="mt-2 text-sm text-muted-foreground">{t(d.short)}</p></div>
              <Arrow />
            </Link>
          ))}
        </div>
      </Section>
      <Section alt>
        <SectionTitle title={ru ? "Консультации специалистов" : "Consultații de specialitate"} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((s) => (
            <Link key={s.slug} to={`/medici?spec=${encodeURIComponent(s.slug)}`} className="card-link group py-4">
              <span className="font-semibold">{t(s.name)}</span><Arrow />
            </Link>
          ))}
          <Link to="/laborator" className="card-link group py-4"><span className="font-semibold">{ui.lab}</span><Arrow /></Link>
          <Link to="/check-up" className="card-link group py-4"><span className="font-semibold">{ui.checkup}</span><Arrow /></Link>
        </div>
      </Section>
    </>
  );
}
