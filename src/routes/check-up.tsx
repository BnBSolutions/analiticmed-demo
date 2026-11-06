import { createFileRoute, Link } from "@tanstack/react-router";
import checkupImg from "@/assets/checkup.jpg";
import { checkups } from "@/data/site";
import { seo, useT } from "@/lib/i18n";
import { Arrow, PageHeader, Section } from "@/components/site/ui";

export const Route = createFileRoute("/check-up")({
  head: ({ match }) =>
    seo(match.search, "/check-up", {
      ro: { title: "Pachete check-up medical complet – AnaliticMed Bălți", desc: "Programe check-up general, cardiologic, pentru femei și copii. Analize, investigații și consultații într-o singură vizită la AnaliticMed." },
      ru: { title: "Программы check-up – AnaliticMed Бельцы", desc: "Общий, кардиологический, женский и детский check-up. Анализы, диагностика и консультации за одно посещение в AnaliticMed." },
    }),
  component: Page,
});

function Page() {
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  return (
    <>
      <PageHeader crumb={ui.checkup} title={ru ? "Программы check-up" : "Pachete check-up"} sub={ru ? "Комплексное обследование за одно утро." : "Evaluare completă a sănătății într-o singură dimineață."} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <img src={checkupImg} alt={ru ? "Врач проводит осмотр пациента" : "Medic care consultă un pacient"} width={1200} height={912} className="rounded-2xl" />
          <div className="grid gap-4">
            {checkups.map((c) => (
              <Link key={c.name.ro} to="/contacte" hash="programare" className="card-link group items-start">
                <div><h2 className="text-lg">{t(c.name)}</h2><p className="mt-2 text-sm text-muted-foreground">{t(c.items)}</p></div>
                <Arrow />
              </Link>
            ))}
            <p className="text-sm text-muted-foreground">{ru ? "Состав пакета можно адаптировать – уточните при записи." : "Componența pachetului poate fi adaptată – precizați la programare."}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
