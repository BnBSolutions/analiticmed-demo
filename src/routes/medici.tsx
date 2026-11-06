import { createFileRoute, Link } from "@tanstack/react-router";
import { doctors, specialties } from "@/data/site";
import { langOf, seo, useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/site/ui";

export const Route = createFileRoute("/medici")({
  validateSearch: (s: Record<string, unknown>): { spec?: string } =>
    typeof s.spec === "string" ? { spec: s.spec } : {},
  head: ({ match }) => {
    const lang = langOf(match.search);
    return seo(match.search, "/medici", {
      ro: { title: "Medicii clinicii AnaliticMed din Bălți", desc: "Echipa de medici AnaliticMed: cardiologie, pediatrie, neurologie, ginecologie și alte specialități. Alegeți medicul și programați-vă online." },
      ru: { title: "Врачи клиники AnaliticMed в Бельцах", desc: "Команда врачей AnaliticMed: кардиология, педиатрия, неврология, гинекология и другие направления. Выберите врача и запишитесь онлайн." },
    }, doctors.map((d) => ({
      "@context": "https://schema.org",
      "@type": "Physician",
      name: `${d.title[lang]} – AnaliticMed`,
      medicalSpecialty: specialties.find((s) => s.slug === d.spec)?.name[lang],
      address: { "@type": "PostalAddress", addressLocality: "Bălți", addressCountry: "MD" },
    })));
  },
  component: Page,
});

function Page() {
  const { spec } = Route.useSearch();
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  const used = specialties.filter((s) => doctors.some((d) => d.spec === s.slug));
  const list = spec ? doctors.filter((d) => d.spec === spec) : doctors;
  const specName = spec ? specialties.find((s) => s.slug === spec) : undefined;
  return (
    <>
      <PageHeader crumb={ui.doctors} title={ru ? "Наши врачи" : "Medicii noștri"} sub={ru ? "Выберите специальность, чтобы найти нужного врача." : "Alegeți specialitatea pentru a găsi medicul potrivit."} />
      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          <Link to="/medici" search={{}} className={`rounded-full border px-4 py-2 text-sm font-medium ${!spec ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{ru ? "Все" : "Toți"}</Link>
          {used.map((s) => (
            <Link key={s.slug} to="/medici" search={{ spec: s.slug }} className={`rounded-full border px-4 py-2 text-sm font-medium ${spec === s.slug ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{t(s.name)}</Link>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="rounded-xl bg-surface p-8 text-center">
            <p className="font-semibold">{specName ? t(specName.name) : ""}</p>
            <p className="mt-2 text-muted-foreground">{ru ? "Уточните расписание врачей этой специальности по телефону или оставьте заявку." : "Pentru programul medicilor acestei specialități sunați-ne sau lăsați o cerere."}</p>
            <Link to="/contacte" hash="programare" className="btn-primary mt-5">{ui.book}</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((d) => (
              <article key={d.id} className="overflow-hidden rounded-xl border bg-card">
                <img src={d.photo} alt={t(d.alt)} loading="lazy" width={768} height={960} className="aspect-[4/5] w-full object-cover" />
                <div className="p-4">
                  <h2 className="text-lg">{t(d.title)}</h2>
                  <p className="text-sm text-muted-foreground">{t(specialties.find((s) => s.slug === d.spec)!.name)}</p>
                  <Link to="/contacte" hash="programare" className="btn-outline mt-4 w-full py-2">{ui.bookShort}</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
