import { AppLink as Link } from "@/lib/router";
import { CheckCircle2 } from "lucide-react";
import labImg from "@/assets/lab.jpg";
import homeImg from "@/assets/home-collection.jpg";
import { CLINIC } from "@/data/site";
import { useSeo, useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/site/ui";

export function Page() {
  const { ui, lang } = useT();
  const ru = lang === "ru";
  useSeo("/laborator", {
    ro: { title: "Laborator de analize medicale în Bălți – AnaliticMed", desc: "Analize de sânge, urină, hormonale și infecțioase în laboratorul AnaliticMed. Recoltare la domiciliu în Bălți și rezultate rapide." },
    ru: { title: "Лаборатория медицинских анализов в Бельцах – AnaliticMed", desc: "Анализы крови, мочи, гормоны и инфекции в лаборатории AnaliticMed. Забор анализов на дому в Бельцах и быстрые результаты." },
  });
  const groups = ru
    ? ["Общий анализ крови и мочи", "Биохимия крови", "Гормоны щитовидной железы и половые гормоны", "Онкомаркеры", "Инфекции и серология", "Коагулограмма", "Витамины и микроэлементы", "Аллергологические панели"]
    : ["Hemoleucogramă și sumarul urinei", "Biochimie sanguină", "Hormoni tiroidieni și sexuali", "Markeri tumorali", "Infecții și serologie", "Coagulogramă", "Vitamine și microelemente", "Panouri alergologice"];
  return (
    <>
      <PageHeader crumb={ui.lab} title={ru ? "Лаборатория AnaliticMed" : "Laboratorul AnaliticMed"} sub={ru ? "Точные анализы на современном оборудовании." : "Analize precise, efectuate pe echipamente moderne."} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src={labImg} alt={ru ? "Лаборант анализирует пробирки с кровью" : "Laborantă care analizează eprubete cu sânge"} width={1200} height={912} className="rounded-2xl" />
          <div>
            <h2 className="text-2xl">{ru ? "Какие анализы мы делаем" : "Ce analize efectuăm"}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {groups.map((g) => <li key={g} className="flex gap-2 text-sm"><CheckCircle2 className="size-5 shrink-0 text-primary" />{g}</li>)}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">{ru ? "Полный перечень и стоимость анализов уточняйте по телефону" : "Lista completă și prețurile analizelor le aflați la telefon"} <a href={CLINIC.phoneHref} className="font-semibold text-primary-dark">{CLINIC.phone}</a>.</p>
          </div>
        </div>
      </Section>
      <Section alt id="domiciliu">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl">{ui.homeTests}</h2>
            <p className="mt-3 text-muted-foreground">{ru ? "Медсестра приедет к вам домой в Бельцах в удобное время, возьмёт биоматериал с соблюдением всех стандартов и доставит его в лабораторию." : "Asistenta medicală vine la domiciliul dumneavoastră din Bălți la ora convenită, recoltează proba respectând toate standardele și o transportă în laborator."}</p>
            <ol className="mt-6 space-y-3 text-sm">
              {(ru ? ["Позвоните или оставьте заявку", "Согласуйте время визита", "Получите результаты по e-mail или в клинике"] : ["Sunați sau lăsați o cerere", "Stabiliți ora vizitei", "Primiți rezultatele pe e-mail sau la clinică"]).map((s, k) => (
                <li key={s} className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{k + 1}</span><span className="pt-1">{s}</span></li>
              ))}
            </ol>
            <Link to="/contacte#programare" className="btn-primary mt-8">{ui.book}</Link>
          </div>
          <img src={homeImg} alt={ru ? "Медсестра берёт кровь у пациентки дома" : "Asistentă care recoltează sânge unei paciente acasă"} loading="lazy" width={1200} height={912} className="rounded-2xl" />
        </div>
      </Section>
    </>
  );
}
