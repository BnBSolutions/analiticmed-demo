import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, Microscope, ShieldCheck, Users } from "lucide-react";
import heroMri from "@/assets/hero-mri.jpg";
import { CLINIC } from "@/data/site";
import { seo, useT } from "@/lib/i18n";
import { clinicSchema } from "@/lib/schema";
import { PageHeader, Section } from "@/components/site/ui";

export const Route = createFileRoute("/despre-clinica")({
  head: ({ match }) =>
    seo(match.search, "/despre-clinica", {
      ro: { title: "Despre clinica AnaliticMed din Bălți", desc: "AnaliticMed este o clinică medicală privată și laborator de diagnostic din Bălți: echipamente moderne, medici cu experiență și grijă pentru fiecare pacient." },
      ru: { title: "О клинике AnaliticMed в Бельцах", desc: "AnaliticMed – частная медицинская клиника и диагностическая лаборатория в Бельцах: современное оборудование, опытные врачи и забота о каждом пациенте." },
    }, clinicSchema),
  component: Page,
});

function Page() {
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  const values = [
    { icon: Microscope, h: ru ? "Современная диагностика" : "Diagnostică modernă", p: ru ? "МРТ, КТ, цифровой рентген, УЗИ, ЭЭГ, спирометрия и денситометрия." : "RMN, CT, radiografie digitală, ecografie, EEG, spirometrie și osteodensitometrie." },
    { icon: Users, h: ru ? "Опытные врачи" : "Medici cu experiență", p: ru ? "Более 20 специальностей для взрослых и детей." : "Peste 20 de specialități pentru adulți și copii." },
    { icon: HeartPulse, h: ru ? "Всё в одном месте" : "Totul într-un singur loc", p: ru ? "Консультация, анализы и диагностика – в одной клинике." : "Consultație, analize și investigații – într-o singură clinică." },
    { icon: ShieldCheck, h: ru ? "Конфиденциальность" : "Confidențialitate", p: ru ? "Бережное отношение к данным и здоровью пациентов." : "Grijă față de datele și sănătatea pacienților." },
  ];
  return (
    <>
      <PageHeader crumb={ui.about} title={ru ? "О клинике AnaliticMed" : "Despre clinica AnaliticMed"} sub={ru ? "Частная медицинская клиника и диагностическая лаборатория в Бельцах." : "Clinică medicală privată și laborator de diagnostic în Bălți."} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl">{ru ? "Наша миссия" : "Misiunea noastră"}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{ru ? "AnaliticMed объединяет функциональную диагностику, лабораторию и консультации специалистов, чтобы жители Бельц и севера Молдовы могли получить качественную медицинскую помощь рядом с домом – быстро и без лишних поездок." : "AnaliticMed reunește diagnostica funcțională, laboratorul și consultațiile de specialitate, pentru ca locuitorii din Bălți și din nordul Moldovei să primească servicii medicale de calitate aproape de casă – rapid și fără drumuri inutile."}</p>
            <Link to="/medici" className="btn-primary mt-6">{ru ? "Познакомиться с врачами" : "Cunoașteți medicii"}</Link>
          </div>
          <img src={heroMri} alt={ru ? "Кабинет МРТ клиники AnaliticMed" : "Cabinetul RMN al clinicii AnaliticMed"} width={1200} height={912} className="rounded-2xl" />
        </div>
      </Section>
      <Section alt>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.h} className="rounded-xl border bg-card p-6">
              <v.icon className="size-7 text-primary" />
              <h2 className="mt-4 text-lg">{v.h}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{v.p}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="licenta">
        <h2 className="text-2xl">{ru ? "Реквизиты" : "Rechizite"}</h2>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
          <div><dt className="text-muted-foreground">{ru ? "Юридическое лицо" : "Persoană juridică"}</dt><dd className="font-semibold">{CLINIC.legal}</dd></div>
          <div><dt className="text-muted-foreground">{ru ? "Адрес" : "Adresa"}</dt><dd className="font-semibold">{t(CLINIC.city)}</dd></div>
          <div><dt className="text-muted-foreground">E-mail</dt><dd className="font-semibold">{CLINIC.email}</dd></div>
        </dl>
      </Section>
    </>
  );
}
