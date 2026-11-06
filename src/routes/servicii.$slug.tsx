import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Clock, Phone } from "lucide-react";
import { CLINIC, diagnostics } from "@/data/site";
import { langOf, seo, SITE_URL, useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/site/ui";
import { BookingForm } from "@/components/site/BookingForm";

export const Route = createFileRoute("/servicii/$slug")({
  loader: ({ params }) => {
    const d = diagnostics.find((x) => x.slug === params.slug);
    if (!d) throw notFound();
    return { slug: d.slug };
  },
  head: ({ match, params }) => {
    const d = diagnostics.find((x) => x.slug === params.slug);
    if (!d) return { meta: [{ title: "Serviciu indisponibil – AnaliticMed" }, { name: "robots", content: "noindex" }] };
    const lang = langOf(match.search);
    return seo(match.search, `/servicii/${d.slug}`, {
      ro: { title: `${d.name.ro} în Bălți – AnaliticMed`, desc: `${d.short.ro}. Pregătire, durată și programare la ${d.name.ro} în clinica AnaliticMed din Bălți.` },
      ru: { title: `${d.name.ru} в Бельцах – AnaliticMed`, desc: `${d.short.ru}. Подготовка, длительность и запись на ${d.name.ru} в клинике AnaliticMed в Бельцах.` },
    }, {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: d.name[lang],
      description: d.desc[lang],
      preparation: d.prep.map((p) => p[lang]).join("; "),
      url: `${SITE_URL}/servicii/${d.slug}`,
      provider: { "@type": "MedicalClinic", name: "AnaliticMed", telephone: "+37362000020" },
    });
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const d = diagnostics.find((x) => x.slug === slug)!;
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  const faq = [
    { q: ru ? "Нужно ли направление?" : "Am nevoie de trimitere?", a: ru ? "Направление не обязательно, но желательно – оно помогает врачу точнее провести исследование." : "Trimiterea nu este obligatorie, dar este recomandată – ajută medicul să efectueze investigația mai precis." },
    { q: ru ? "Когда я получу результат?" : "Când primesc rezultatul?", a: ru ? "Обычно заключение готово в день исследования или на следующий рабочий день." : "De obicei, concluzia este gata în ziua investigației sau în următoarea zi lucrătoare." },
    { q: ru ? "Можно ли пройти исследование ребёнку?" : "Poate fi efectuată investigația la copii?", a: ru ? "Да, по показаниям врача. Уточните детали при записи." : "Da, la indicația medicului. Detaliile se precizează la programare." },
  ];
  return (
    <>
      <PageHeader crumb={ui.services} title={t(d.name)} sub={t(d.short)} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl">{ru ? "Описание" : "Descriere"}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t(d.desc)}</p>
            </div>
            <div>
              <h2 className="text-2xl">{ru ? "Для чего назначают" : "Pentru ce se recomandă"}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {d.uses.map((u) => <li key={u.ro} className="flex gap-3 rounded-lg bg-surface p-4 text-sm"><CheckCircle2 className="size-5 shrink-0 text-primary" />{t(u)}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl">{ru ? "Подготовка" : "Pregătire"}</h2>
              <ol className="mt-4 space-y-3">
                {d.prep.map((p, k) => <li key={p.ro} className="flex gap-3 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-tint font-bold text-primary-dark">{k + 1}</span><span className="pt-1">{t(p)}</span></li>)}
              </ol>
            </div>
            <div>
              <h2 className="text-2xl">{ru ? "Частые вопросы" : "Întrebări frecvente"}</h2>
              <div className="mt-4 divide-y rounded-xl border">
                {faq.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}<span className="float-right text-primary group-open:rotate-45 transition">+</span></summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          <aside className="h-fit space-y-4 rounded-xl border p-6 lg:sticky lg:top-40">
            <div className="flex items-center gap-3"><Clock className="size-5 text-primary" /><span className="text-sm">{ru ? "Длительность" : "Durată"}: <b>{t(d.duration)}</b></span></div>
            <div>
              <p className="text-sm text-muted-foreground">{ru ? "Стоимость" : "Preț"}</p>
              <p className="mt-1 font-semibold">{ru ? "Уточняйте по телефону – зависит от зоны исследования" : "Se confirmă telefonic – depinde de zona investigată"}</p>
            </div>
            <a href={CLINIC.phoneHref} className="btn-outline w-full"><Phone className="size-4" />{CLINIC.phone}</a>
            <Link to="/servicii/$slug" params={{ slug }} hash="programare" className="btn-primary w-full">{ui.book}</Link>
          </aside>
        </div>
      </Section>
      <Section alt id="programare">
        <h2 className="mb-6 text-2xl">{ui.book}: {t(d.name)}</h2>
        <BookingForm defaultService={d.slug} />
      </Section>
    </>
  );
}
