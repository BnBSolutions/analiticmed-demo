import type { L } from "@/lib/i18n";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";
import heroMri from "@/assets/hero-mri.jpg";
import lab from "@/assets/lab.jpg";
import checkup from "@/assets/checkup.jpg";

export const CLINIC = {
  name: "AnaliticMed",
  legal: "AnaliticMed S.R.L.",
  phone: "0 620 00 020",
  phoneHref: "tel:+37362000020",
  email: "clinica@analiticmed.md",
  city: { ro: "mun. Bălți, Republica Moldova", ru: "мун. Бельцы, Республика Молдова" } as L,
  hours: [
    { d: { ro: "Luni – Vineri", ru: "Понедельник – Пятница" }, h: "08:00 – 18:00" },
    { d: { ro: "Sâmbătă", ru: "Суббота" }, h: "08:00 – 14:00" },
    { d: { ro: "Duminică", ru: "Воскресенье" }, h: { ro: "Închis", ru: "Выходной" } },
  ] as { d: L; h: string | L }[],
  mapSrc: "https://www.google.com/maps?q=AnaliticMed+B%C4%83l%C8%9Bi&output=embed",
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/analiticmed" },
    { name: "Instagram", href: "https://www.instagram.com/analiticmed" },
  ],
};

export type Diagnostic = {
  slug: string;
  name: L;
  short: L;
  desc: L;
  uses: L[];
  prep: L[];
  duration: L;
};

export const diagnostics: Diagnostic[] = [
  {
    slug: "rmn",
    name: { ro: "Rezonanță magnetică (RMN)", ru: "Магнитно-резонансная томография (МРТ)" },
    short: { ro: "Imagini detaliate ale țesuturilor moi, fără radiații", ru: "Детальные снимки мягких тканей без облучения" },
    desc: {
      ro: "Imagistica prin rezonanță magnetică folosește un câmp magnetic și unde radio pentru a obține imagini de înaltă rezoluție ale creierului, coloanei vertebrale, articulațiilor și organelor interne. Investigația nu implică radiații ionizante.",
      ru: "МРТ использует магнитное поле и радиоволны для получения снимков высокого разрешения головного мозга, позвоночника, суставов и внутренних органов. Исследование не связано с ионизирующим излучением.",
    },
    uses: [
      { ro: "Afecțiuni ale creierului și ale sistemului nervos", ru: "Заболевания головного мозга и нервной системы" },
      { ro: "Hernii de disc și patologii ale coloanei", ru: "Грыжи диска и патологии позвоночника" },
      { ro: "Leziuni ale articulațiilor, ligamentelor și mușchilor", ru: "Повреждения суставов, связок и мышц" },
      { ro: "Evaluarea organelor abdominale și pelvine", ru: "Оценка органов брюшной полости и малого таза" },
    ],
    prep: [
      { ro: "Îndepărtați obiectele metalice, bijuteriile și cardurile bancare", ru: "Снимите металлические предметы, украшения, уберите банковские карты" },
      { ro: "Anunțați medicul despre implanturi, stimulator cardiac sau sarcină", ru: "Сообщите врачу об имплантах, кардиостимуляторе или беременности" },
      { ro: "Pentru RMN abdominal – fără mâncare cu 4–6 ore înainte", ru: "Для МРТ брюшной полости – не есть за 4–6 часов" },
      { ro: "Aduceți investigațiile anterioare, dacă le aveți", ru: "Возьмите с собой предыдущие исследования, если они есть" },
    ],
    duration: { ro: "20–60 minute", ru: "20–60 минут" },
  },
  {
    slug: "tomografie-computerizata",
    name: { ro: "Tomografie computerizată (CT)", ru: "Компьютерная томография (КТ)" },
    short: { ro: "Examinare rapidă, în secțiuni, a organelor și oaselor", ru: "Быстрое послойное исследование органов и костей" },
    desc: {
      ro: "Tomografia computerizată obține imagini în secțiuni ale corpului cu ajutorul razelor X. Este o metodă rapidă și precisă, utilă pentru oase, plămâni, vase de sânge și organe interne.",
      ru: "Компьютерная томография получает послойные изображения тела с помощью рентгеновских лучей. Быстрый и точный метод для исследования костей, лёгких, сосудов и внутренних органов.",
    },
    uses: [
      { ro: "Patologii pulmonare și ale toracelui", ru: "Патологии лёгких и грудной клетки" },
      { ro: "Traumatisme și fracturi complexe", ru: "Травмы и сложные переломы" },
      { ro: "Evaluarea sinusurilor și a capului", ru: "Исследование пазух и головы" },
      { ro: "Investigații abdominale și ale vaselor", ru: "Исследование брюшной полости и сосудов" },
    ],
    prep: [
      { ro: "Pentru CT cu contrast – fără mâncare cu 4 ore înainte", ru: "Для КТ с контрастом – не есть за 4 часа" },
      { ro: "Aduceți rezultatul creatininei pentru investigația cu contrast", ru: "Для исследования с контрастом возьмите анализ на креатинин" },
      { ro: "Anunțați despre sarcină sau alergii", ru: "Сообщите о беременности или аллергиях" },
    ],
    duration: { ro: "10–30 minute", ru: "10–30 минут" },
  },
  {
    slug: "radiografie-digitala",
    name: { ro: "Radiografie digitală cu fluoroscopie", ru: "Цифровая рентгенография с рентгеноскопией" },
    short: { ro: "Imagini radiologice clare cu doză redusă", ru: "Чёткие рентгеновские снимки при сниженной дозе" },
    desc: {
      ro: "Radiografia digitală oferă imagini clare ale oaselor și ale toracelui cu o doză redusă de iradiere. Fluoroscopia permite examinarea organelor în mișcare, în timp real.",
      ru: "Цифровая рентгенография даёт чёткие изображения костей и грудной клетки при сниженной дозе облучения. Рентгеноскопия позволяет исследовать органы в движении в реальном времени.",
    },
    uses: [
      { ro: "Fracturi și afecțiuni osoase", ru: "Переломы и заболевания костей" },
      { ro: "Radiografie pulmonară", ru: "Рентгенография лёгких" },
      { ro: "Examinarea tractului digestiv prin fluoroscopie", ru: "Исследование ЖКТ методом рентгеноскопии" },
    ],
    prep: [
      { ro: "Pentru majoritatea radiografiilor nu este necesară pregătire", ru: "Для большинства снимков подготовка не требуется" },
      { ro: "Pentru fluoroscopia digestivă – pe stomacul gol", ru: "Для рентгеноскопии ЖКТ – натощак" },
      { ro: "Anunțați despre o posibilă sarcină", ru: "Сообщите о возможной беременности" },
    ],
    duration: { ro: "5–20 minute", ru: "5–20 минут" },
  },
  {
    slug: "ecografie",
    name: { ro: "Ecografie (USG)", ru: "Ультразвуковое исследование (УЗИ)" },
    short: { ro: "Investigație sigură, nedureroasă, pentru adulți și copii", ru: "Безопасное, безболезненное исследование для взрослых и детей" },
    desc: {
      ro: "Ecografia folosește ultrasunete pentru examinarea organelor interne, a vaselor și a țesuturilor moi. Este sigură, inclusiv în sarcină și la copii.",
      ru: "УЗИ использует ультразвук для исследования внутренних органов, сосудов и мягких тканей. Безопасно, в том числе при беременности и для детей.",
    },
    uses: [
      { ro: "Organe abdominale, rinichi, tiroidă", ru: "Органы брюшной полости, почки, щитовидная железа" },
      { ro: "Ecografie ginecologică și obstetricală", ru: "Гинекологическое и акушерское УЗИ" },
      { ro: "Doppler vascular și ecocardiografie", ru: "Допплерография сосудов и эхокардиография" },
    ],
    prep: [
      { ro: "Ecografia abdominală – pe stomacul gol, 6–8 ore", ru: "УЗИ брюшной полости – натощак 6–8 часов" },
      { ro: "Ecografia pelvină – cu vezica urinară plină", ru: "УЗИ малого таза – с наполненным мочевым пузырём" },
    ],
    duration: { ro: "15–40 minute", ru: "15–40 минут" },
  },
  {
    slug: "electroencefalografie",
    name: { ro: "Electroencefalografie (EEG)", ru: "Электроэнцефалография (ЭЭГ)" },
    short: { ro: "Înregistrarea activității electrice a creierului", ru: "Запись электрической активности мозга" },
    desc: {
      ro: "EEG înregistrează activitatea electrică a creierului prin electrozi plasați pe scalp. Este o investigație nedureroasă, folosită în neurologie la adulți și copii.",
      ru: "ЭЭГ регистрирует электрическую активность мозга с помощью электродов на коже головы. Безболезненное исследование, применяемое в неврологии у взрослых и детей.",
    },
    uses: [
      { ro: "Epilepsie și crize convulsive", ru: "Эпилепсия и судорожные приступы" },
      { ro: "Tulburări de somn și amețeli", ru: "Нарушения сна и головокружения" },
      { ro: "Evaluarea după traumatisme cranio-cerebrale", ru: "Оценка после черепно-мозговых травм" },
    ],
    prep: [
      { ro: "Spălați părul în ziua precedentă, fără produse de styling", ru: "Вымойте голову накануне, без средств для укладки" },
      { ro: "Nu consumați cafea sau energizante cu 12 ore înainte", ru: "Не употребляйте кофе и энергетики за 12 часов" },
    ],
    duration: { ro: "30–60 minute", ru: "30–60 минут" },
  },
  {
    slug: "spirometrie",
    name: { ro: "Spirometrie", ru: "Спирометрия" },
    short: { ro: "Evaluarea funcției respiratorii", ru: "Оценка функции внешнего дыхания" },
    desc: {
      ro: "Spirometria măsoară volumul și viteza aerului inspirat și expirat. Ajută la diagnosticarea și monitorizarea astmului și a bronhopneumopatiei obstructive.",
      ru: "Спирометрия измеряет объём и скорость вдыхаемого и выдыхаемого воздуха. Помогает диагностировать и контролировать астму и ХОБЛ.",
    },
    uses: [
      { ro: "Astm bronșic", ru: "Бронхиальная астма" },
      { ro: "BPOC și tuse cronică", ru: "ХОБЛ и хронический кашель" },
      { ro: "Evaluare preoperatorie", ru: "Предоперационное обследование" },
    ],
    prep: [
      { ro: "Nu fumați cu cel puțin 4 ore înainte", ru: "Не курите минимум за 4 часа" },
      { ro: "Evitați efortul fizic intens și mesele copioase", ru: "Избегайте физических нагрузок и обильной еды" },
    ],
    duration: { ro: "15–20 minute", ru: "15–20 минут" },
  },
  {
    slug: "osteodensitometrie",
    name: { ro: "Osteodensitometrie", ru: "Остеоденситометрия" },
    short: { ro: "Măsurarea densității osoase", ru: "Измерение плотности костной ткани" },
    desc: {
      ro: "Osteodensitometria măsoară densitatea minerală a oaselor și permite depistarea timpurie a osteoporozei și evaluarea riscului de fracturi.",
      ru: "Остеоденситометрия измеряет минеральную плотность костей и позволяет рано выявить остеопороз и оценить риск переломов.",
    },
    uses: [
      { ro: "Depistarea osteoporozei", ru: "Выявление остеопороза" },
      { ro: "Femei în menopauză", ru: "Женщины в период менопаузы" },
      { ro: "Monitorizarea tratamentului", ru: "Контроль эффективности лечения" },
    ],
    prep: [
      { ro: "Nu luați suplimente de calciu cu 24 de ore înainte", ru: "Не принимайте препараты кальция за 24 часа" },
      { ro: "Purtați haine fără elemente metalice", ru: "Наденьте одежду без металлических элементов" },
    ],
    duration: { ro: "10–20 minute", ru: "10–20 минут" },
  },
];

export const specialties: { slug: string; name: L }[] = [
  { slug: "cardiologie", name: { ro: "Cardiologie", ru: "Кардиология" } },
  { slug: "gastroenterologie", name: { ro: "Gastroenterologie", ru: "Гастроэнтерология" } },
  { slug: "urologie", name: { ro: "Urologie", ru: "Урология" } },
  { slug: "ginecologie", name: { ro: "Ginecologie", ru: "Гинекология" } },
  { slug: "pediatrie", name: { ro: "Pediatrie", ru: "Педиатрия" } },
  { slug: "neurologie", name: { ro: "Neurologie", ru: "Неврология" } },
  { slug: "endocrinologie", name: { ro: "Endocrinologie", ru: "Эндокринология" } },
  { slug: "dermatologie", name: { ro: "Dermatologie", ru: "Дерматология" } },
  { slug: "oftalmologie", name: { ro: "Oftalmologie", ru: "Офтальмология" } },
  { slug: "orl", name: { ro: "ORL (Otorinolaringologie)", ru: "ЛОР (Оториноларингология)" } },
  { slug: "pneumologie", name: { ro: "Pneumologie", ru: "Пульмонология" } },
  { slug: "reumatologie", name: { ro: "Reumatologie", ru: "Ревматология" } },
  { slug: "nefrologie", name: { ro: "Nefrologie", ru: "Нефрология" } },
  { slug: "ortopedie", name: { ro: "Ortopedie și traumatologie", ru: "Ортопедия и травматология" } },
  { slug: "chirurgie", name: { ro: "Chirurgie generală", ru: "Общая хирургия" } },
  { slug: "medicina-interna", name: { ro: "Medicină internă", ru: "Терапия" } },
  { slug: "alergologie", name: { ro: "Alergologie", ru: "Аллергология" } },
  { slug: "flebologie", name: { ro: "Flebologie", ru: "Флебология" } },
  { slug: "psihologie", name: { ro: "Psihologie", ru: "Психология" } },
  { slug: "imagistica", name: { ro: "Imagistică medicală", ru: "Лучевая диагностика" } },
];

export type Doctor = { id: string; title: L; spec: string; photo: string; alt: L };

/** Doctor names are not yet supplied by the clinic; cards show the role. */
export const doctors: Doctor[] = [
  { id: "d1", title: { ro: "Medic cardiolog", ru: "Врач-кардиолог" }, spec: "cardiologie", photo: doctor1, alt: { ro: "Medic cardiolog AnaliticMed în halat alb cu stetoscop", ru: "Врач-кардиолог AnaliticMed в белом халате со стетоскопом" } },
  { id: "d2", title: { ro: "Medic radiolog-imagist", ru: "Врач-рентгенолог" }, spec: "imagistica", photo: doctor2, alt: { ro: "Medic radiolog AnaliticMed în halat alb", ru: "Врач-рентгенолог AnaliticMed в белом халате" } },
  { id: "d3", title: { ro: "Medic pediatru", ru: "Врач-педиатр" }, spec: "pediatrie", photo: doctor3, alt: { ro: "Medic pediatru AnaliticMed în uniformă turcoaz", ru: "Врач-педиатр AnaliticMed в бирюзовой форме" } },
  { id: "d4", title: { ro: "Medic neurolog", ru: "Врач-невролог" }, spec: "neurologie", photo: doctor4, alt: { ro: "Medic neurolog AnaliticMed cu ochelari, în halat alb", ru: "Врач-невролог AnaliticMed в очках и белом халате" } },
  { id: "d5", title: { ro: "Medic ginecolog", ru: "Врач-гинеколог" }, spec: "ginecologie", photo: doctor1, alt: { ro: "Medic ginecolog AnaliticMed", ru: "Врач-гинеколог AnaliticMed" } },
  { id: "d6", title: { ro: "Medic gastroenterolog", ru: "Врач-гастроэнтеролог" }, spec: "gastroenterologie", photo: doctor2, alt: { ro: "Medic gastroenterolog AnaliticMed", ru: "Врач-гастроэнтеролог AnaliticMed" } },
  { id: "d7", title: { ro: "Medic endocrinolog", ru: "Врач-эндокринолог" }, spec: "endocrinologie", photo: doctor3, alt: { ro: "Medic endocrinolog AnaliticMed", ru: "Врач-эндокринолог AnaliticMed" } },
  { id: "d8", title: { ro: "Medic urolog", ru: "Врач-уролог" }, spec: "urologie", photo: doctor4, alt: { ro: "Medic urolog AnaliticMed", ru: "Врач-уролог AnaliticMed" } },
];

export const reviews: { name: string; text: L }[] = [
  { name: "Elena M.", text: { ro: "Am făcut RMN-ul rapid, fără cozi. Personalul a explicat totul clar, iar rezultatul l-am primit în aceeași zi.", ru: "МРТ сделали быстро, без очередей. Персонал всё понятно объяснил, результат получила в тот же день." } },
  { name: "Igor C.", text: { ro: "Recoltarea analizelor la domiciliu a fost o salvare pentru mama mea. Punctuali și foarte atenți.", ru: "Забор анализов на дому стал спасением для моей мамы. Пунктуально и очень внимательно." } },
  { name: "Natalia R.", text: { ro: "Medicul pediatru a fost foarte răbdător cu copilul. Recomand clinica tuturor părinților din Bălți.", ru: "Педиатр был очень терпелив с ребёнком. Рекомендую клинику всем родителям в Бельцах." } },
  { name: "Andrei P.", text: { ro: "Am făcut pachetul check-up complet într-o singură dimineață. Organizare foarte bună.", ru: "Прошёл полный check-up за одно утро. Отличная организация." } },
];

export const articles: { id: string; date: string; image: string; title: L; excerpt: L; body: L; alt: L }[] = [
  {
    id: "pregatire-analize",
    date: "2026-10-20",
    image: lab,
    alt: { ro: "Laborantă care analizează eprubete cu probe de sânge", ru: "Лаборант исследует пробирки с образцами крови" },
    title: { ro: "Cum să vă pregătiți corect pentru analizele de sânge", ru: "Как правильно подготовиться к анализу крови" },
    excerpt: { ro: "Câteva reguli simple care fac rezultatele mai precise.", ru: "Несколько простых правил для более точных результатов." },
    body: {
      ro: "Majoritatea analizelor de sânge se recoltează dimineața, pe stomacul gol – ultima masă cu 8–12 ore înainte. Puteți bea apă plată. Evitați alcoolul și efortul fizic intens cu o zi înainte și nu fumați cu cel puțin o oră înainte de recoltare. Dacă urmați un tratament, anunțați medicul sau asistenta.",
      ru: "Большинство анализов крови сдают утром натощак – последний приём пищи за 8–12 часов. Можно пить чистую воду. За день избегайте алкоголя и интенсивных нагрузок, не курите минимум за час до забора. Если вы принимаете лекарства, сообщите врачу или медсестре.",
    },
  },
  {
    id: "rmn-sau-ct",
    date: "2026-10-05",
    image: heroMri,
    alt: { ro: "Aparat de rezonanță magnetică într-o sală luminoasă", ru: "Аппарат МРТ в светлом кабинете" },
    title: { ro: "RMN sau CT: care este diferența?", ru: "МРТ или КТ: в чём разница?" },
    excerpt: { ro: "Când recomandă medicul o investigație sau cealaltă.", ru: "Когда врач назначает то или иное исследование." },
    body: {
      ro: "RMN-ul este preferat pentru țesuturile moi – creier, coloană, articulații – și nu folosește radiații. CT-ul este mai rapid și foarte precis pentru oase, plămâni și situații urgente. Alegerea investigației o face medicul, în funcție de simptome și de zona examinată.",
      ru: "МРТ предпочтительна для мягких тканей – мозга, позвоночника, суставов – и не использует излучение. КТ быстрее и очень точна для костей, лёгких и экстренных случаев. Выбор исследования делает врач в зависимости от симптомов и зоны.",
    },
  },
  {
    id: "check-up-anual",
    date: "2026-09-18",
    image: checkup,
    alt: { ro: "Medic care măsoară tensiunea arterială unui pacient", ru: "Врач измеряет пациенту артериальное давление" },
    title: { ro: "De ce este important un check-up anual", ru: "Почему важен ежегодный check-up" },
    excerpt: { ro: "Prevenția costă mai puțin decât tratamentul.", ru: "Профилактика обходится дешевле лечения." },
    body: {
      ro: "Multe boli – hipertensiunea, diabetul, afecțiunile tiroidiene – evoluează mult timp fără simptome. Un check-up anual, cu analize de bază, ECG și consultație, permite depistarea lor timpurie și un tratament mai simplu.",
      ru: "Многие болезни – гипертония, диабет, заболевания щитовидной железы – долго протекают бессимптомно. Ежегодный check-up с базовыми анализами, ЭКГ и консультацией позволяет выявить их рано и упростить лечение.",
    },
  },
];

export const checkups: { name: L; items: L }[] = [
  { name: { ro: "Check-up general", ru: "Общий check-up" }, items: { ro: "Hemoleucogramă, biochimie de bază, sumarul urinei, ECG, consultația medicului internist", ru: "Общий анализ крови, базовая биохимия, анализ мочи, ЭКГ, консультация терапевта" } },
  { name: { ro: "Check-up cardiologic", ru: "Кардиологический check-up" }, items: { ro: "Profil lipidic, ECG, ecocardiografie, consultația cardiologului", ru: "Липидный профиль, ЭКГ, эхокардиография, консультация кардиолога" } },
  { name: { ro: "Check-up pentru femei", ru: "Check-up для женщин" }, items: { ro: "Analize hormonale, ecografie pelvină și mamară, consultația ginecologului", ru: "Гормональные анализы, УЗИ малого таза и молочных желёз, консультация гинеколога" } },
  { name: { ro: "Check-up pentru copii", ru: "Check-up для детей" }, items: { ro: "Analize de bază, ecografie abdominală, consultația pediatrului", ru: "Базовые анализы, УЗИ брюшной полости, консультация педиатра" } },
];
