/**
 * Блок 06 — Архитектура.
 *
 * 5/7 сетка + мозаика 2x2 макро-кадров (кладка, окно, свет, фактура).
 * Материалы и решения — короткой строкой, без пояснений.
 *
 * Текст — дословно из dom-na-utese-brief.txt §БЛОК 6.
 *
 * Фото мозаики — editorial подбор из public/images/visual: 04/06/08/10.
 */
const materials = [
    'Панорамное остекление в пол Schüco',
    'Потолки 3,5–4 метра',
    'Натуральные фасадные материалы',
    'Тёплая архитектурная подсветка',
    'Закрытый двор на эксплуатируемой кровле подземного паркинга',
];

const mosaic = [
    { src: '/images/visual/04.jpg', alt: 'Фасадная кладка, макро-кадр.' },
    { src: '/images/visual/06.jpg', alt: 'Панорамное окно Schüco, ночь.' },
    { src: '/images/visual/08.jpg', alt: 'Свет архитектурной подсветки.' },
    { src: '/images/visual/10.jpg', alt: 'Фактура дерева и камня.' },
];

export default function Architecture() {
    return (
        <section
            id="architecture"
            className="snap-slide bg-paper text-handwriting py-[96px] md:py-[160px]"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
                {/* Текст — 5 колонок */}
                <div className="md:col-span-5">
                    <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-4">
                        06 · Архитектура
                    </p>
                    <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-4">
                        Архитектура
                    </h2>
                    <p className="font-serif italic text-[17px] md:text-[22px] leading-[1.3] opacity-80 mb-10 max-w-[28ch]">
                        Дом проектировался под виды и под ритм берега.
                    </p>
                    <p className="font-serif text-[15px] md:text-[17px] leading-[1.65] mb-10 max-w-[480px]">
                        Три этажа над утёсом. Лаконичный фасад без декоративной избыточности.
                        Материалы выбирались так, чтобы дом не спорил с ландшафтом, а
                        становился его продолжением.
                    </p>

                    <ul className="border-t border-handwriting/15">
                        {materials.map((m, i) => (
                            <li
                                key={i}
                                className="py-4 border-b border-handwriting/15 flex gap-4 items-baseline"
                            >
                                <span className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-stamp tnum shrink-0 w-6">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="font-serif text-[15px] md:text-[17px] leading-[1.4]">
                                    {m}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Мозаика — 7 колонок, 2x2 без gutter (editorial tile) */}
                <div className="md:col-span-7">
                    <div className="grid grid-cols-2 gap-0">
                        {mosaic.map((m) => (
                            <div key={m.src} className="aspect-square overflow-hidden bg-paper-deep">
                                <img
                                    src={m.src}
                                    alt={m.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
