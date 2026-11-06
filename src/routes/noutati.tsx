import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/data/site";
import { seo, useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/site/ui";

export const Route = createFileRoute("/noutati")({
  head: ({ match }) =>
    seo(match.search, "/noutati", {
      ro: { title: "Noutăți și articole despre sănătate – AnaliticMed", desc: "Sfaturi medicale de la specialiștii AnaliticMed: pregătirea pentru analize, diferența dintre RMN și CT, importanța check-up-ului anual." },
      ru: { title: "Новости и статьи о здоровье – AnaliticMed", desc: "Советы специалистов AnaliticMed: подготовка к анализам, разница между МРТ и КТ, важность ежегодного check-up." },
    }),
  component: Page,
});

function Page() {
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  return (
    <>
      <PageHeader crumb={ui.news} title={ru ? "Новости и статьи о здоровье" : "Noutăți și articole despre sănătate"} />
      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          {articles.map((a) => (
            <article key={a.id} id={a.id} className="scroll-mt-40 overflow-hidden rounded-2xl border">
              <img src={a.image} alt={t(a.alt)} loading="lazy" width={1200} height={912} className="aspect-[16/8] w-full object-cover" />
              <div className="p-6 md:p-8">
                <time dateTime={a.date} className="text-sm text-muted-foreground">{new Date(a.date).toLocaleDateString(ru ? "ru-RU" : "ro-RO", { day: "numeric", month: "long", year: "numeric" })}</time>
                <h2 className="mt-2 text-2xl">{t(a.title)}</h2>
                <p className="mt-3 font-medium">{t(a.excerpt)}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t(a.body)}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
