import { useRouterState } from "@tanstack/react-router";

export type Lang = "ro" | "ru";
export type L = { ro: string; ru: string };

export const SITE_URL = "https://analiticmed.md";

export function langOf(search: unknown): Lang {
  return (search as { lang?: string } | undefined)?.lang === "ru" ? "ru" : "ro";
}

export function useLang(): Lang {
  return useRouterState({ select: (s) => langOf(s.location.search) });
}

export const tr = (l: L, lang: Lang) => l[lang];

export function useT() {
  const lang = useLang();
  return { lang, t: (l: L) => l[lang], ui: ui[lang] };
}

type Seo = { ro: { title: string; desc: string }; ru: { title: string; desc: string } };

/** Head metadata with unique title/description and RO/RU hreflang alternates. */
export function seo(
  search: unknown,
  path: string,
  s: Seo,
  jsonLd?: Record<string, unknown> | Record<string, unknown>[],
) {
  const lang = langOf(search);
  const { title, desc } = s[lang];
  const ro = SITE_URL + path;
  const ru = `${SITE_URL}${path}?lang=ru`;
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: lang === "ru" ? "ru_MD" : "ro_MD" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: lang === "ru" ? ru : ro },
      { rel: "alternate", hrefLang: "ro", href: ro },
      { rel: "alternate", hrefLang: "ru", href: ru },
      { rel: "alternate", hrefLang: "x-default", href: ro },
    ],
    scripts: jsonLd
      ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }]
      : [],
  };
}

export const ui = {
  ro: {
    book: "Fă o programare",
    bookShort: "Programează-te",
    search: "Caută serviciu, specialitate...",
    noResults: "Nimic găsit",
    services: "Servicii",
    allServices: "Toate serviciile",
    doctors: "Medici",
    lab: "Laborator",
    checkup: "Check-up",
    guide: "Ghidul pacientului",
    news: "Noutăți",
    about: "Despre clinică",
    contacts: "Contacte",
    home: "Acasă",
    menu: "Meniu",
    homeTests: "Analize la domiciliu",
    readMore: "Citește mai mult",
    more: "Detalii",
  },
  ru: {
    book: "Записаться на приём",
    bookShort: "Записаться",
    search: "Поиск услуги, специальности...",
    noResults: "Ничего не найдено",
    services: "Услуги",
    allServices: "Все услуги",
    doctors: "Врачи",
    lab: "Лаборатория",
    checkup: "Check-up",
    guide: "Гид пациента",
    news: "Новости",
    about: "О клинике",
    contacts: "Контакты",
    home: "Главная",
    menu: "Меню",
    homeTests: "Анализы на дому",
    readMore: "Читать далее",
    more: "Подробнее",
  },
};
