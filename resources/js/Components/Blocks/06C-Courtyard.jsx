import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 06C — Двор и периметр.
 *
 * Третий архитектурный спред. Plate nums Pl.15–20.
 * Тексты редактируются через Orchid (Home → Block 06C). Пластины — props
 * (Plate, block='courtyard', number '15'…'20'). Поле `block06c.materials_list`
 * здесь используется как pull-quote (одна строка, не список).
 */

function Plate({ n, tone = 'light' }) {
    const color = tone === 'light' ? 'text-handwriting/50' : 'text-paper/60';
    return (
        <span
            className={
                'font-sans text-[10px] font-bold tracking-[0.18em] uppercase ' +
                color
            }
        >
            Pl.&nbsp;{n}
        </span>
    );
}

const fallbackCourtyardPlates = [
    { number: '15', image: '/images/visual/08.jpg', alt: 'Двор дома на эксплуатируемой кровле подземного паркинга.' },
    { number: '16', image: '/images/visual/10.jpg', alt: 'Периметр дома, тёплая архитектурная подсветка.' },
    { number: '17', image: '/images/visual/36.jpg', alt: 'Вход в лобби.' },
    { number: '18', image: '/images/visual/04.jpg', alt: 'Въезд в подземный паркинг.' },
    { number: '19', image: '/images/visual/06.jpg', alt: 'Лестница у лобби.' },
    { number: '20', image: '/images/visual/37.jpg', alt: 'Периметр вечером.' },
];

export default function Courtyard({ plates = [] }) {
    const rubric = useSetting('block06c.rubric', 'Акт III · Территория');
    const h2 = useSetting('block06c.h2', 'Закрытый двор на\u00a0кровле паркинга.');
    const subtitle = useSetting(
        'block06c.subtitle',
        'Частная территория девяти соседей — за\u00a0периметром.'
    );
    const textIsland = useSetting(
        'block06c.text_island',
        'Территория внутри периметра — только для\u00a0жителей дома. Сверху подземного паркинга — эксплуатируемая кровля: двор, дорожки, посадки.\n\nПриезжаешь в\u00a0дождь — не\u00a0мокнешь. Лифт из\u00a0паркинга поднимает прямо до\u00a0квартиры. Уезжаешь на\u00a0месяц — возвращаешься в\u00a0тот\u00a0же дом.'
    );
    const pullQuoteTitle = useSetting('block06c.materials_title', 'Эксплуатируемая кровля');
    const pullQuote = useSetting(
        'block06c.materials_list',
        'Жизнь на\u00a0просеках — без\u00a0быта на\u00a0просеках.'
    );

    const source = plates && plates.length ? plates : fallbackCourtyardPlates;
    const byNumber = {};
    for (const p of source) byNumber[String(p.number)] = p;
    for (const p of fallbackCourtyardPlates) {
        if (!byNumber[p.number]) byNumber[p.number] = p;
    }

    const pl15 = byNumber['15'];
    const pl16 = byNumber['16'];
    const contactSheet = ['17', '18', '19', '20']
        .map((n) => byNumber[n])
        .filter((p) => p && p.image);

    const islandParagraphs = textIsland
        .split(/\n\n+/)
        .map((s) => s.trim())
        .filter(Boolean);

    return (
        <section
            id="courtyard"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md overflow-hidden"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-rhythm-lg md:mb-rhythm-lg-md">
                    <div className="md:col-span-5 md:col-start-2">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            {rubric}
                        </p>
                        <h2 className="font-serif text-[34px] md:text-[52px] xl:text-[60px] leading-[1.02] font-medium tracking-[-0.01em] mb-rhythm-sm md:mb-rhythm-sm-md">
                            {h2}
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[20px] leading-[1.4] opacity-80 max-w-[30ch]">
                            {subtitle}
                        </p>
                    </div>
                </div>

                {/* Две большие плиты Pl.15 + Pl.16 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
                    <figure className="md:col-span-7 relative">
                        <div className="aspect-[4/3] overflow-hidden bg-dust/40">
                            {pl15?.image && (
                                <img
                                    src={pl15.image}
                                    alt={pl15.alt || 'Двор дома.'}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="15" />
                        </div>
                    </figure>
                    <figure className="md:col-span-5 relative">
                        <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-dust/40">
                            {pl16?.image && (
                                <img
                                    src={pl16.image}
                                    alt={pl16.alt || 'Периметр дома.'}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="16" />
                        </div>
                    </figure>
                </div>
                <p className="font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70 mb-rhythm-lg md:mb-rhythm-lg-md">
                    {pl15?.caption || 'Pl.\u00a015 — двор.'} &nbsp;·&nbsp;
                    {pl16?.caption || 'Pl.\u00a016 — периметр на\u00a0закате.'}
                </p>

                {/* Текст + pull-quote */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-rhythm-lg md:mb-rhythm-lg-md">
                    <div className="md:col-span-5 font-serif text-[16px] md:text-[18px] leading-[1.65] space-y-5">
                        {islandParagraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                    <div className="md:col-span-7 md:border-l md:border-handwriting/15 md:pl-10">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-5">
                            {pullQuoteTitle}
                        </p>
                        <p className="font-serif italic text-[22px] md:text-[30px] xl:text-[36px] leading-[1.2] max-w-[22ch]">
                            {pullQuote}
                        </p>
                    </div>
                </div>

                {/* Контакт-лист Pl.17–20 */}
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    Фрагменты. Ритмы. Входы.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 [scroll-snap-type:x_proximity] md:[scroll-snap-type:none] overflow-x-auto md:overflow-visible -mx-5 md:mx-0 px-5 md:px-0">
                    {contactSheet.map((p) => (
                        <figure
                            key={p.number}
                            className="shrink-0 w-[62%] md:w-auto [scroll-snap-align:start] relative"
                        >
                            <div className="aspect-square overflow-hidden bg-dust/40">
                                <img
                                    src={p.image}
                                    alt={p.alt || ''}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute top-2 right-2">
                                <Plate n={String(p.number)} />
                            </div>
                        </figure>
                    ))}
                </div>
                <p className="mt-6 font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70">
                    Pl.&nbsp;17–20 — входы, периметр, ритм подсветки.
                </p>
            </div>
        </section>
    );
}
