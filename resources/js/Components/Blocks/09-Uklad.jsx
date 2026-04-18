/**
 * Блок 09 — Уклад. День на берегу.
 *
 * Главный эмоциональный блок сайта. Единственный блок с «потоком»
 * текста (проза, не буллеты). Диагональ paper ↔ ink: текст-paper /
 * фото / фото / текст-ink. Факты — caps-строкой внизу.
 *
 * Текст — дословно из dom-na-utese-brief.txt §БЛОК 9.
 *
 * Фото на desktop — шахматка 2x2: 16/18/22/30 из public/images/visual.
 *
 * Plate-номера (2026-04-18, сквозная нумерация из блока 06):
 *   Pl. 11 — утро (16.jpg)
 *   Pl. 12 — день (18.jpg)
 *   Pl. 13 — закат (22.jpg)
 *   Pl. 14 — зима  (30.jpg)
 *
 * Подписи italic (editorial) — короткая цитата + атмосферный маркер.
 */

// Локальная Plate-компонента, зеркаль блока 06. Опционально принимает
// тёмный tone для кадров на ink-фоне.
function Plate({ num, tone = 'paper' }) {
    const toneClasses =
        tone === 'paper'
            ? 'text-paper/80'
            : 'text-handwriting/55';
    return (
        <span
            className={`absolute top-3 right-3 md:top-4 md:right-4 font-sans text-[10px] font-bold tracking-[0.15em] uppercase ${toneClasses} select-none pointer-events-none`}
            aria-hidden="true"
        >
            Pl.&nbsp;{String(num).padStart(2, '0')}
        </span>
    );
}

export default function Uklad() {
    return (
        <section id="uklad" className="bg-paper text-handwriting">
            {/* 09a — Утро · текст на paper */}
            <div className="snap-slide bg-paper py-[80px] md:py-[140px]">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div>
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-4">
                            09 · Уклад
                        </p>
                        <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-3">
                            Уклад
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.3] opacity-80 mb-10">
                            День на берегу.
                        </p>
                        <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] max-w-[520px]">
                            Утро начинается с террасы. Волга внизу ещё в&nbsp;тумане, слышно
                            теплоходы. Через пятнадцать минут — кофе и&nbsp;работа.
                        </p>
                    </div>
                    <div>
                        <figure className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                            <img
                                src="/images/visual/16.jpg"
                                alt="Утро на террасе. Волга внизу в тумане."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            <Plate num={11} tone="paper" />
                        </figure>
                        <p className="mt-3 md:mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                            Pl.&nbsp;11&nbsp;— Волга внизу ещё в&nbsp;тумане, слышно теплоходы.
                        </p>
                    </div>
                </div>
            </div>

            {/* 09b — День · фото-доминанта */}
            <div className="snap-slide bg-paper-deep py-[80px] md:py-[140px]">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div className="md:order-1">
                        <figure className="relative aspect-[4/5] overflow-hidden bg-paper-light">
                            <img
                                src="/images/visual/18.jpg"
                                alt="Дорога в город. Загородный парк рядом с домом."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            <Plate num={12} tone="paper" />
                        </figure>
                        <p className="mt-3 md:mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                            Pl.&nbsp;12&nbsp;— Десять минут до&nbsp;Ленинградской.
                        </p>
                    </div>
                    <div className="md:order-2">
                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-stamp mb-4">
                            День
                        </p>
                        <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] max-w-[520px]">
                            Обед в&nbsp;центре города — десять минут до&nbsp;Ленинградской, двенадцать
                            до&nbsp;Волжского проспекта.
                        </p>
                    </div>
                </div>
            </div>

            {/* 09c — Закат · tea */}
            <div className="snap-slide bg-paper py-[80px] md:py-[140px]">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div>
                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-tea mb-4">
                            Закат
                        </p>
                        <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] max-w-[520px] mb-6">
                            Возвращение к&nbsp;закату над Жигулёвскими воротами. Вечером — прогулка
                            вдоль берега, мимо дачи Сипиной и&nbsp;Загородного парка.
                        </p>
                    </div>
                    <div>
                        <figure className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                            <img
                                src="/images/visual/22.jpg"
                                alt="Закат над Жигулёвскими воротами."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            <Plate num={13} tone="paper" />
                        </figure>
                        <p className="mt-3 md:mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                            Pl.&nbsp;13&nbsp;— Закат над Жигулёвскими воротами.
                        </p>
                    </div>
                </div>
            </div>

            {/* 09d — Зима · ink */}
            <div className="snap-slide bg-ink text-paper py-[80px] md:py-[140px]">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div className="md:order-1">
                        <figure className="relative aspect-[4/5] overflow-hidden bg-ink-deep">
                            <img
                                src="/images/visual/30.jpg"
                                alt="Зимний лес над Волгой."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            <Plate num={14} tone="paper" />
                        </figure>
                        <p className="mt-3 md:mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-paper/75">
                            Pl.&nbsp;14&nbsp;— Над водой стоит тишина, которой в&nbsp;центре не&nbsp;бывает.
                        </p>
                    </div>
                    <div className="md:order-2">
                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-tea mb-4">
                            Зима
                        </p>
                        <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] max-w-[520px] opacity-90">
                            Зимой лес <em>замирает</em>, и над водой стоит тишина, которой
                            в&nbsp;центре не бывает.
                        </p>
                    </div>
                </div>
            </div>

            {/* Факт-строка */}
            <div className="bg-paper border-t border-handwriting/15 py-10">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                    <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase text-handwriting/70 leading-[1.8]">
                        Центр Самары — 10 минут на автомобиле
                        <span className="mx-2 text-stamp">·</span>
                        Загородный парк — в шаговой доступности
                        <span className="mx-2 text-stamp">·</span>
                        Спуск к Волге — с территории дома
                        <span className="mx-2 text-stamp">·</span>
                        Круглогодичное содержание от УК
                    </p>
                </div>
            </div>
        </section>
    );
}
