import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 09 — Уклад. День на берегу.
 *
 * Главный эмоциональный блок сайта. Диагональ paper ↔ ink, 4 плитки:
 * утро · день · закат · зима. Факты — caps-строкой внизу.
 *
 * Тексты редактируются через Orchid (Home → Block 09). Плитки приходят
 * массивом UkladTile через props.uklad (ключи 'morning'/'day'/'sunset'/'winter').
 * Если props пустые — используется fallback (4 плитки из оригинала).
 *
 * Plate-номера сохранены по оригинальной нумерации Pl.11–14 (визуальная
 * «цитата» блока 06, хоть и пересекается с Interior — это сознательная
 * editorial-рифма, не опечатка).
 */

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

const fallbackUklad = [
    {
        key: 'morning',
        title: 'Утро начинается с террасы. Волга внизу ещё в\u00a0тумане, слышно теплоходы. Через пятнадцать минут — кофе и\u00a0работа.',
        quote: 'Pl.\u00a011\u00a0— Волга внизу ещё в\u00a0тумане, слышно теплоходы.',
        image: '/images/visual/16.jpg',
        tone: 'paper',
    },
    {
        key: 'day',
        title: 'Обед в\u00a0центре города — десять минут до\u00a0Ленинградской, двенадцать до\u00a0Волжского проспекта.',
        quote: 'Pl.\u00a012\u00a0— Десять минут до\u00a0Ленинградской.',
        image: '/images/visual/18.jpg',
        tone: 'paper',
    },
    {
        key: 'sunset',
        title: 'Возвращение к\u00a0закату над Жигулёвскими воротами. Вечером — прогулка вдоль берега, мимо дачи Сипиной и\u00a0Загородного парка.',
        quote: 'Pl.\u00a013\u00a0— Закат над Жигулёвскими воротами.',
        image: '/images/visual/22.jpg',
        tone: 'paper',
    },
    {
        key: 'winter',
        title: 'Зимой лес замирает, и над водой стоит тишина, которой в\u00a0центре не бывает.',
        quote: 'Pl.\u00a014\u00a0— Над водой стоит тишина, которой в\u00a0центре не\u00a0бывает.',
        image: '/images/visual/30.jpg',
        tone: 'ink',
    },
];

// Фиксированные caps-рубрики в углу каждой секции и видимые заголовки
// подсекций (День/Закат/Зима) — editorial, не контент-настройка.
const panelLabels = {
    morning: { heading: null, align: 'left' },
    day: { heading: 'День', align: 'right' },
    sunset: { heading: 'Закат', align: 'left' },
    winter: { heading: 'Зима', align: 'right' },
};

export default function Uklad({ uklad = [] }) {
    const rubric = useSetting('block09.rubric', '09 · Уклад');
    const h2 = useSetting('block09.h2', 'Уклад');
    const subtitle = useSetting('block09.subtitle', 'День на берегу.');
    const factline1 = useSetting('block09.factline_1', 'Центр Самары — 10 минут на автомобиле');
    const factline2 = useSetting('block09.factline_2', 'Загородный парк — в шаговой доступности');
    const factline3 = useSetting('block09.factline_3', 'Спуск к Волге — с территории дома');
    const factline4 = useSetting('block09.factline_4', 'Круглогодичное содержание от УК');
    const factlines = [factline1, factline2, factline3, factline4].filter(Boolean);

    const source = uklad && uklad.length ? uklad : fallbackUklad;
    const byKey = {};
    for (const t of source) byKey[t.key] = t;
    for (const t of fallbackUklad) {
        if (!byKey[t.key]) byKey[t.key] = t;
    }

    const morning = byKey['morning'];
    const day = byKey['day'];
    const sunset = byKey['sunset'];
    const winter = byKey['winter'];

    // Plate-номера привязаны к позиции в сцене (11/12/13/14), не к плитке.
    return (
        <section id="uklad" className="bg-paper text-handwriting">
            {/* 09a — Утро · текст на paper */}
            <div className="snap-slide bg-paper py-rhythm-xl md:py-rhythm-xl-md">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div>
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            {rubric}
                        </p>
                        <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-rhythm-xs md:mb-rhythm-xs-md">
                            {h2}
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.3] opacity-80 mb-rhythm-md md:mb-rhythm-md-md">
                            {subtitle}
                        </p>
                        <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] max-w-[520px]">
                            {morning?.title}
                        </p>
                    </div>
                    <div>
                        <figure className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                            {morning?.image && (
                                <img
                                    src={morning.image}
                                    alt="Утро на террасе. Волга внизу в тумане."
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <Plate num={11} tone="paper" />
                        </figure>
                        <p className="mt-3 md:mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                            {morning?.quote}
                        </p>
                    </div>
                </div>
            </div>

            {/* 09b — День · фото-доминанта */}
            <div className="snap-slide bg-paper-deep py-rhythm-xl md:py-rhythm-xl-md">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div className="md:order-1">
                        <figure className="relative aspect-[4/5] overflow-hidden bg-paper-light">
                            {day?.image && (
                                <img
                                    src={day.image}
                                    alt="Дорога в город. Загородный парк рядом с домом."
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <Plate num={12} tone="paper" />
                        </figure>
                        <p className="mt-3 md:mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                            {day?.quote}
                        </p>
                    </div>
                    <div className="md:order-2">
                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            {panelLabels.day.heading}
                        </p>
                        <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] max-w-[520px]">
                            {day?.title}
                        </p>
                    </div>
                </div>
            </div>

            {/* 09c — Закат */}
            <div className="snap-slide bg-paper py-rhythm-xl md:py-rhythm-xl-md">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div>
                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-tea mb-rhythm-sm md:mb-rhythm-sm-md">
                            {panelLabels.sunset.heading}
                        </p>
                        <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] max-w-[520px] mb-rhythm-sm md:mb-rhythm-sm-md">
                            {sunset?.title}
                        </p>
                    </div>
                    <div>
                        <figure className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                            {sunset?.image && (
                                <img
                                    src={sunset.image}
                                    alt="Закат над Жигулёвскими воротами."
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <Plate num={13} tone="paper" />
                        </figure>
                        <p className="mt-3 md:mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                            {sunset?.quote}
                        </p>
                    </div>
                </div>
            </div>

            {/* 09d — Зима · ink */}
            <div className="snap-slide bg-ink text-paper py-rhythm-xl md:py-rhythm-xl-md">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div className="md:order-1">
                        <figure className="relative aspect-[4/5] overflow-hidden bg-ink-deep">
                            {winter?.image && (
                                <img
                                    src={winter.image}
                                    alt="Зимний лес над Волгой."
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <Plate num={14} tone="paper" />
                        </figure>
                        <p className="mt-3 md:mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-paper/75">
                            {winter?.quote}
                        </p>
                    </div>
                    <div className="md:order-2">
                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-tea mb-rhythm-sm md:mb-rhythm-sm-md">
                            {panelLabels.winter.heading}
                        </p>
                        <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] max-w-[520px] opacity-90">
                            {winter?.title}
                        </p>
                    </div>
                </div>
            </div>

            {/* Факт-строка */}
            {factlines.length > 0 && (
                <div className="bg-paper border-t border-handwriting/15 py-rhythm-md md:py-rhythm-md-md">
                    <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase text-handwriting/70 leading-[1.8]">
                            {factlines.map((f, i) => (
                                <span key={i}>
                                    {f}
                                    {i < factlines.length - 1 && (
                                        <span className="mx-2 text-stamp">·</span>
                                    )}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
