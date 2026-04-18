/**
 * Блок 04 — Соседи по времени.
 *
 * Horizontal scroll строкой на mobile, сетка 3x3 на desktop.
 * Девять архивных карточек: номер + дата + имя + адрес + стиль.
 *
 * В отсутствии исторических ч/б фото — editorial карточки без
 * изображений (музейная подпись доминирует). Клиент предоставит
 * архивные снимки позже; место под них зарезервировано через
 * прямоугольник-«архив» с опечаткой, как маркер.
 *
 * Тексты — дословно из dom-na-utese-brief.txt §БЛОК 4 (9 карточек).
 */
const neighbors = [
    {
        idx: '01',
        year: '1908–1909',
        title: 'Дача со Слонами',
        address: '4-я просека',
        tag: 'Федеральный памятник архитектуры',
        body: 'Константин Головкин. Открыта после реставрации в сентябре 2024 года.',
        featured: true,
    },
    {
        idx: '02',
        year: 'Начало XX века',
        title: 'Дача Сурошникова',
        address: '7-я просека',
        tag: 'Псевдомавританский стиль',
        body: 'Объект культурного наследия.',
    },
    {
        idx: '03',
        year: 'Начало XX века',
        title: 'Дача Курлиной',
        address: '7-я просека',
        tag: 'Советская история',
        body: 'Здесь жили Светлана Аллилуева в 1941-м и Юрий Гагарин в 1961-м.',
    },
    {
        idx: '04',
        year: '1909',
        title: 'Дача Ивана Соколова',
        address: '9-я просека',
        tag: 'Архитектор Александр Щербачёв',
        body: 'Башню украшают четыре сокола.',
    },
    {
        idx: '05',
        year: '1910-е',
        title: 'Дача Александра Соколова',
        address: '9-я просека',
        tag: 'Псевдомавританский стиль',
        body: 'Построена сыном как ответ отцовской даче.',
    },
    {
        idx: '06',
        year: '1903–1917',
        title: 'Дача Сипиной',
        address: '1-я просека',
        tag: 'Территория Загородного парка',
        body: 'Одна из немногих полностью дошедших до нас частных дач этой полосы.',
    },
    {
        idx: '07',
        year: '1858',
        title: 'Кумысолечебница Постникова',
        address: 'Постников овраг',
        tag: 'Вторая в мире, первая в России',
        body: 'Среди пациентов — Толстой, Чехов, Горький, Суриков.',
    },
    {
        idx: '08',
        year: '1958',
        title: 'Обкомовская дача',
        address: '1-я просека',
        tag: 'Архитектор Алексей Моргун',
        body: 'Юрий Гагарин отдыхал здесь после полёта 12 апреля 1961 года.',
    },
    {
        idx: '09',
        year: '1941–1943',
        title: 'Бункер Жукова',
        address: '7-я просека',
        tag: 'Глубина 26–28 метров',
        body: 'Открыт для экскурсий с 2017 года.',
    },
];

export default function Neighbors() {
    return (
        <section
            id="neighbors"
            className="snap-slide bg-paper text-handwriting py-[96px] md:py-[160px]"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-4">
                    04 · Соседи
                </p>
                <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-4 max-w-[16ch]">
                    Соседи по времени
                </h2>
                <p className="font-serif italic text-[17px] md:text-[22px] leading-[1.3] opacity-80 mb-12 md:mb-16 max-w-[46ch]">
                    Дом стоит в окружении памятников архитектуры, каждый из которых можно
                    дойти пешком.
                </p>

                {/* Mobile: horizontal scroll. Desktop: 3x3 grid */}
                <div
                    className="
                        flex flex-row gap-5 overflow-x-auto -mx-5 px-5 pb-6
                        md:mx-0 md:px-0 md:pb-0 md:overflow-visible
                        md:grid md:grid-cols-3 md:gap-8
                    "
                >
                    {neighbors.map((n) => (
                        <article
                            key={n.idx}
                            className={
                                'shrink-0 w-[280px] md:w-auto flex flex-col ' +
                                (n.featured ? 'md:col-span-1' : '')
                            }
                        >
                            {/* Архивный «placeholder» под фото — прямоугольник paper-deep с музейным маркером */}
                            <div
                                className="relative aspect-[4/5] bg-paper-deep mb-4"
                                aria-hidden="true"
                            >
                                <div className="absolute top-3 left-3 font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-handwriting/70">
                                    {n.idx} · {n.year}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
                                        <path
                                            d="M 10 60 L 30 40 L 45 50 L 65 25 L 70 30"
                                            stroke="#1E1E1E"
                                            strokeWidth="1.5"
                                            strokeLinecap="square"
                                        />
                                        <path
                                            d="M 10 70 L 70 70"
                                            stroke="#1E1E1E"
                                            strokeWidth="1"
                                        />
                                    </svg>
                                </div>
                                {n.featured && (
                                    <div className="absolute bottom-3 right-3 font-sans text-[9px] font-bold tracking-[0.14em] uppercase text-stamp">
                                        Главный сосед
                                    </div>
                                )}
                            </div>

                            <h3 className="font-serif text-[22px] md:text-[24px] leading-[1.15] font-medium mb-2">
                                {n.title}
                            </h3>
                            <p className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/60 mb-3">
                                {n.address}
                                <span className="mx-2 text-stamp">·</span>
                                {n.tag}
                            </p>
                            <p className="font-serif text-[14px] md:text-[15px] leading-[1.55] opacity-85">
                                {n.body}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-10 md:mt-12">
                    <a
                        href="/shore"
                        className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-stamp link-underline"
                    >
                        Справочник берега · 14 объектов →
                    </a>
                </div>
            </div>
        </section>
    );
}
