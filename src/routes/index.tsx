import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, ChevronLeft, ChevronRight, FileText, FlaskConical, Home, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroMri from "@/assets/hero-mri.jpg";
import labImg from "@/assets/lab.jpg";
import homeImg from "@/assets/home-collection.jpg";
import checkupImg from "@/assets/checkup.jpg";
import { articles, CLINIC, diagnostics, doctors, reviews, specialties } from "@/data/site";
import { seo, useT } from "@/lib/i18n";
import { clinicSchema } from "@/lib/schema";
import { Arrow, Section, SectionTitle } from "@/components/site/ui";
import { BookingForm } from "@/components/site/BookingForm";

export const Route = createFileRoute("/")({
  head: ({ match }) =>
    seo(match.search, "/", {
      ro: { title: "AnaliticMed Bălți – clinică medicală și laborator de diagnostic", desc: "RMN, CT, ecografie, analize de laborator și consultații la peste 20 de specialități în Bălți. Programare online și recoltare la domiciliu." },
      ru: { title: "AnaliticMed Бельцы – медицинская клиника и лаборатория", desc: "МРТ, КТ, УЗИ, лабораторные анализы и консультации более 20 специалистов в Бельцах. Онлайн-запись и забор анализов на дому." },
    }, clinicSchema),
  component: Index,
});

function Index() {
  const { t, ui, lang } = useT();
  const ru = lang === "ru";
  return (
    <>
      <Hero />

      {/* Quick actions */}
      <div className="container-site -mt-2 md:-mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 rounded-xl border bg-card p-3 shadow-soft md:grid-cols-4 md:p-4">
          {[
            { icon: CalendarCheck, label: ru ? "Онлайн-запись" : "Programare online", to: "/contacte" as const, hash: "programare" },
            { icon: FlaskConical, label: ru ? "Лабораторные анализы" : "Analize de laborator", to: "/laborator" as const },
            { icon: Home, label: ui.homeTests, to: "/laborator" as const, hash: "domiciliu" },
            { icon: FileText, label: ru ? "Результаты анализов" : "Rezultatele analizelor", to: "/ghidul-pacientului" as const, hash: "rezultate" },
          ].map((a) => (
            <Link key={a.label} to={a.to} {...(a.hash ? { hash: a.hash } : {})} className="group flex items-center gap-3 rounded-lg p-3 transition hover:bg-accent">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-tint text-primary-dark"><a.icon className="size-5" /></span>
              <span className="text-sm font-semibold leading-tight">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <Section>
        <SectionTitle title={ru ? "Функциональная диагностика" : "Diagnostică funcțională"} sub={ru ? "Современное оборудование и опытные врачи-диагносты" : "Echipamente moderne și medici imagiști cu experiență"} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {diagnostics.map((d) => (
            <Link key={d.slug} to="/servicii/$slug" params={{ slug: d.slug }} className="card-link group items-start">
              <div>
                <h3 className="font-bold">{t(d.name)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(d.short)}</p>
              </div>
              <Arrow />
            </Link>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionTitle
          title={ru ? "Специальности" : "Specialități"}
          action={<Link to="/servicii" className="font-semibold text-primary-dark hover:text-primary">{ui.allServices} →</Link>}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((s) => (
            <Link key={s.slug} to="/medici" search={{ spec: s.slug }} className="card-link group py-4">
              <span className="font-semibold">{t(s.name)}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 rounded-2xl bg-primary p-8 text-primary-foreground md:grid-cols-4 md:p-12">
          {[
            { n: "20+", l: ru ? "специальностей" : "specialități medicale" },
            { n: "7", l: ru ? "видов диагностики" : "tipuri de investigații" },
            { n: "6", l: ru ? "дней в неделю" : "zile pe săptămână" },
            { n: "1", l: ru ? "звонок для записи" : "apel pentru programare" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-4xl font-bold md:text-5xl">{s.n}</p>
              <p className="mt-2 opacity-90">{s.l}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <Carousel
          title={ui.doctors}
          action={<Link to="/medici" className="font-semibold text-primary-dark hover:text-primary">{ru ? "Все врачи" : "Toți medicii"} →</Link>}
        >
          {doctors.map((d) => (
            <article key={d.id} className="w-64 shrink-0 snap-start overflow-hidden rounded-xl border bg-card">
              <img src={d.photo} alt={t(d.alt)} loading="lazy" width={768} height={960} className="aspect-[4/5] w-full object-cover" />
              <div className="p-4">
                <h3 className="font-bold">{t(d.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(specialties.find((s) => s.slug === d.spec)!.name)}</p>
                <Link to="/contacte" hash="programare" className="btn-outline mt-4 w-full py-2">{ui.bookShort}</Link>
              </div>
            </article>
          ))}
        </Carousel>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <BigBlock img={labImg} alt={ru ? "Лаборант работает с пробирками крови" : "Laborantă care lucrează cu eprubete de sânge"} title={ru ? "Лаборатория и анализы на дому" : "Laborator și analize la domiciliu"} text={ru ? "Широкий спектр анализов: общие, биохимические, гормональные, инфекционные. Медсестра может приехать к вам домой." : "Analize generale, biochimice, hormonale și infecțioase. Asistenta medicală poate veni la dumneavoastră acasă pentru recoltare."} to="/laborator" cta={ui.lab} />
          <BigBlock img={checkupImg} alt={ru ? "Врач измеряет давление пациенту" : "Medic care măsoară tensiunea unui pacient"} title={ru ? "Программы check-up" : "Pachete check-up complete"} text={ru ? "Комплексное обследование за одно посещение: анализы, диагностика и консультации врачей." : "Evaluare completă a sănătății într-o singură vizită: analize, investigații și consultații."} to="/check-up" cta={ui.checkup} />
        </div>
      </Section>

      <Section alt>
        <Carousel title={ru ? "Отзывы пациентов" : "Recenziile pacienților"}>
          {reviews.map((r) => (
            <figure key={r.name} className="w-80 shrink-0 snap-start rounded-xl border bg-card p-6">
              <Quote className="size-6 text-primary" aria-hidden />
              <blockquote className="mt-3 text-sm leading-relaxed">{t(r.text)}</blockquote>
              <figcaption className="mt-4 font-semibold">{r.name}</figcaption>
            </figure>
          ))}
        </Carousel>
      </Section>

      <Section>
        <SectionTitle title={ui.news} action={<Link to="/noutati" className="font-semibold text-primary-dark hover:text-primary">{ru ? "Все статьи" : "Toate articolele"} →</Link>} />
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.id} to="/noutati" hash={a.id} className="group overflow-hidden rounded-xl border bg-card transition hover:shadow-soft">
              <img src={a.image} alt={t(a.alt)} loading="lazy" width={1200} height={912} className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <time dateTime={a.date} className="text-xs font-medium text-muted-foreground">{new Date(a.date).toLocaleDateString(ru ? "ru-RU" : "ro-RO", { day: "numeric", month: "long", year: "numeric" })}</time>
                <h3 className="mt-2 font-bold group-hover:text-primary-dark">{t(a.title)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section alt id="programare">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl">{ui.book}</h2>
            <p className="mt-3 text-muted-foreground">{ru ? "Оставьте заявку – мы перезвоним и подберём удобное время." : "Lăsați o cerere – vă sunăm și stabilim ora potrivită."}</p>
            <a href={CLINIC.phoneHref} className="mt-6 inline-block text-2xl font-bold text-primary-dark">{CLINIC.phone}</a>
          </div>
          <BookingForm />
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-xl border p-6">
            <h2 className="text-2xl">{ui.contacts}</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div><dt className="text-muted-foreground">{ru ? "Адрес" : "Adresa"}</dt><dd className="font-semibold">{t(CLINIC.city)}</dd></div>
              <div><dt className="text-muted-foreground">{ru ? "Телефон" : "Telefon"}</dt><dd><a href={CLINIC.phoneHref} className="font-semibold hover:text-primary">{CLINIC.phone}</a></dd></div>
              <div><dt className="text-muted-foreground">E-mail</dt><dd><a href={`mailto:${CLINIC.email}`} className="font-semibold hover:text-primary">{CLINIC.email}</a></dd></div>
              <div>
                <dt className="text-muted-foreground">{ru ? "Часы работы" : "Program"}</dt>
                {CLINIC.hours.map((h) => <dd key={h.d.ro} className="font-semibold">{t(h.d)}: {typeof h.h === "string" ? h.h : t(h.h)}</dd>)}
              </div>
            </dl>
          </div>
          <iframe title={ru ? "Карта AnaliticMed в Бельцах" : "Harta AnaliticMed în Bălți"} src={CLINIC.mapSrc} loading="lazy" className="h-80 w-full rounded-xl border lg:h-full" />
        </div>
      </Section>
    </>
  );
}

function Hero() {
  const { ui, lang } = useT();
  const ru = lang === "ru";
  const slides = [
    { img: heroMri, alt: ru ? "Современный аппарат МРТ в клинике AnaliticMed" : "Aparat RMN modern în clinica AnaliticMed", title: ru ? "Диагностика и консультации в Бельцах" : "Diagnostică și consultații medicale în Bălți", sub: ru ? "МРТ, КТ, УЗИ и более 20 специальностей в одной клинике." : "RMN, CT, ecografie și peste 20 de specialități într-o singură clinică." },
    { img: labImg, alt: ru ? "Лаборант с образцами крови" : "Laborantă cu probe de sânge", title: ru ? "Точные лабораторные анализы" : "Analize de laborator precise", sub: ru ? "Результаты в короткие сроки, в том числе онлайн." : "Rezultate în timp scurt, transmise și electronic." },
    { img: homeImg, alt: ru ? "Медсестра берёт анализ крови на дому" : "Asistentă care recoltează sânge la domiciliul pacientului", title: ru ? "Анализы на дому" : "Recoltare de analize la domiciliu", sub: ru ? "Медсестра приедет к вам в удобное время." : "Asistenta medicală vine la dumneavoastră la ora potrivită." },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, [slides.length]);
  const s = slides[i]!;
  return (
    <section className="container-site pt-4 md:pt-6">
      <div className="grid overflow-hidden rounded-2xl bg-primary text-primary-foreground md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          {i === 0 ? <h1 className="text-3xl leading-tight md:text-5xl">{s.title}</h1> : <p className="text-3xl font-bold leading-tight md:text-5xl">{s.title}</p>}
          <p className="mt-4 max-w-md text-lg opacity-90">{s.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacte" hash="programare" className="btn-light">{ui.book}</Link>
            <Link to="/laborator" hash="domiciliu" className="btn-ghost-light">{ui.homeTests}</Link>
          </div>
          <div className="mt-10 flex gap-2" role="tablist">
            {slides.map((_, k) => (
              <button key={k} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full bg-primary-foreground transition-all ${k === i ? "w-10" : "w-5 opacity-40"}`} />
            ))}
          </div>
        </div>
        <img key={s.img} src={s.img} alt={s.alt} width={1200} height={912} className="h-64 w-full object-cover animate-in fade-in duration-500 md:h-full md:min-h-[460px]" />
      </div>
    </section>
  );
}

function Carousel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 300, behavior: "smooth" });
  return (
    <>
      <SectionTitle
        title={title}
        action={
          <div className="flex items-center gap-4">
            {action}
            <div className="flex gap-2">
              <button onClick={() => scroll(-1)} aria-label="Înapoi" className="grid size-10 place-items-center rounded-full border bg-background hover:border-primary"><ChevronLeft className="size-5" /></button>
              <button onClick={() => scroll(1)} aria-label="Înainte" className="grid size-10 place-items-center rounded-full border bg-background hover:border-primary"><ChevronRight className="size-5" /></button>
            </div>
          </div>
        }
      />
      <div ref={ref} className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">{children}</div>
    </>
  );
}

function BigBlock({ img, alt, title, text, to, cta }: { img: string; alt: string; title: string; text: string; to: "/laborator" | "/check-up"; cta: string }) {
  return (
    <Link to={to} className="group grid overflow-hidden rounded-2xl bg-tint sm:grid-cols-2">
      <img src={img} alt={alt} loading="lazy" width={1200} height={912} className="h-56 w-full object-cover sm:h-full" />
      <div className="flex flex-col justify-center p-6 md:p-8">
        <h3 className="text-xl">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{text}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-dark">{cta} <Arrow /></span>
      </div>
    </Link>
  );
}
