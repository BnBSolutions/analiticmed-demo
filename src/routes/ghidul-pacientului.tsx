import { createFileRoute, Link } from "@tanstack/react-router";
import { CLINIC } from "@/data/site";
import { seo, useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/site/ui";

export const Route = createFileRoute("/ghidul-pacientului")({
  head: ({ match }) =>
    seo(match.search, "/ghidul-pacientului", {
      ro: { title: "Ghidul pacientului – programare, pregătire, rezultate | AnaliticMed", desc: "Tot ce trebuie să știți înainte de vizita la AnaliticMed: cum vă programați, cum vă pregătiți pentru investigații și cum primiți rezultatele." },
      ru: { title: "Гид пациента – запись, подготовка, результаты | AnaliticMed", desc: "Всё, что нужно знать перед визитом в AnaliticMed: как записаться, как подготовиться к исследованиям и как получить результаты." },
    }),
  component: Page,
});

function Page() {
  const { ui, lang } = useT();
  const ru = lang === "ru";
  const blocks = [
    { id: "programare", h: ru ? "Как записаться" : "Cum vă programați", p: ru ? `Позвоните по номеру ${CLINIC.phone}, напишите на ${CLINIC.email} или оставьте онлайн-заявку. Администратор подтвердит дату и время.` : `Sunați la ${CLINIC.phone}, scrieți la ${CLINIC.email} sau completați cererea online. Administratorul vă confirmă data și ora.` },
    { id: "vizita", h: ru ? "Что взять с собой" : "Ce luați cu dumneavoastră", p: ru ? "Удостоверение личности, направление (если есть), результаты предыдущих исследований и список принимаемых лекарств." : "Actul de identitate, trimiterea (dacă o aveți), rezultatele investigațiilor anterioare și lista medicamentelor pe care le luați." },
    { id: "pregatire", h: ru ? "Подготовка к исследованиям" : "Pregătirea pentru investigații", p: ru ? "Большинство анализов крови сдаются натощак. Особые правила подготовки к МРТ, КТ, УЗИ и другим исследованиям указаны на странице каждой услуги." : "Majoritatea analizelor de sânge se fac pe stomacul gol. Regulile speciale pentru RMN, CT, ecografie și alte investigații sunt descrise pe pagina fiecărui serviciu." },
    { id: "rezultate", h: ru ? "Получение результатов" : "Primirea rezultatelor", p: ru ? "Результаты можно получить в клинике или по электронной почте. Для этого укажите e-mail при регистрации." : "Rezultatele le puteți ridica de la clinică sau primi prin e-mail – indicați adresa la înregistrare." },
    { id: "drepturi", h: ru ? "Права пациента" : "Drepturile pacientului", p: ru ? "Вы имеете право на уважительное отношение, полную информацию о своём здоровье, конфиденциальность и добровольное согласие на медицинские вмешательства." : "Aveți dreptul la respect, la informații complete despre starea sănătății, la confidențialitate și la consimțământ informat pentru orice intervenție medicală." },
    { id: "date-personale", h: ru ? "Защита персональных данных" : "Protecția datelor personale", p: ru ? "AnaliticMed S.R.L. обрабатывает персональные данные пациентов в соответствии с законодательством Республики Молдова и использует их только для оказания медицинских услуг." : "AnaliticMed S.R.L. prelucrează datele personale ale pacienților conform legislației Republicii Moldova și le folosește doar pentru prestarea serviciilor medicale." },
  ];
  return (
    <>
      <PageHeader crumb={ui.guide} title={ui.guide} sub={ru ? "Практическая информация перед визитом в клинику." : "Informații practice înainte de vizita la clinică."} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <nav className="hidden h-fit space-y-1 lg:sticky lg:top-40 lg:block" aria-label={ui.guide}>
            {blocks.map((b) => <a key={b.id} href={`#${b.id}`} className="block rounded-md px-3 py-2 text-sm hover:bg-accent">{b.h}</a>)}
          </nav>
          <div className="space-y-6">
            {blocks.map((b) => (
              <section key={b.id} id={b.id} className="scroll-mt-40 rounded-xl border p-6">
                <h2 className="text-xl">{b.h}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{b.p}</p>
              </section>
            ))}
            <Link to="/contacte" hash="programare" className="btn-primary">{ui.book}</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
