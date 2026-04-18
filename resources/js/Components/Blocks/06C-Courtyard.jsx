/**
 * Блок 06C — Двор и периметр.
 *
 * Третий архитектурный спред. Фокус — общее пространство: закрытый двор,
 * кровля паркинга как эксплуатируемая терраса, подсветка, периметр.
 * Более плотный «контакт-листовый» ритм: две большие плиты + серия из
 * четырёх миниатюр, без full-bleed пика (пик уже был в 06 и 06B).
 *
 * Plate numbering continuity: Pl. 15–20.
 *
 * Факты — из brief §6 (закрытый двор, эксплуатируемая кровля паркинга,
 * подсветка) и §10 (подземный паркинг, охрана, лифт до квартиры).
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

export default function Courtyard() {
    return (
        <section
            id="courtyard"
            className="snap-slide bg-paper text-handwriting pt-[96px] md:pt-[160px] pb-[96px] md:pb-[128px] overflow-hidden"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                {/* Рубрика + заголовок, сдвинутые вправо — асимметрия */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-24">
                    <div className="md:col-span-5 md:col-start-2">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-6">
                            Акт III · Территория
                        </p>
                        <h2 className="font-serif text-[34px] md:text-[52px] xl:text-[60px] leading-[1.02] font-medium tracking-[-0.01em] mb-5">
                            Закрытый двор <em>на&nbsp;кровле</em> паркинга.
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[20px] leading-[1.4] opacity-80 max-w-[30ch]">
                            Частная территория девяти соседей — за&nbsp;периметром.
                        </p>
                    </div>
                </div>

                {/* Две большие плиты side-by-side (6/6), разного ратио —
                    намеренно неровный ритм: левая шире, правая выше. */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
                    <figure className="md:col-span-7 relative">
                        <div className="aspect-[4/3] overflow-hidden bg-dust/40">
                            <img
                                src="/images/visual/08.jpg"
                                alt="Двор дома на эксплуатируемой кровле подземного паркинга."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="15" />
                        </div>
                    </figure>
                    <figure className="md:col-span-5 relative">
                        <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-dust/40">
                            <img
                                src="/images/visual/10.jpg"
                                alt="Периметр дома, тёплая архитектурная подсветка."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="16" />
                        </div>
                    </figure>
                </div>
                <p className="font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70 mb-24 md:mb-32">
                    Pl.&nbsp;15 — двор. &nbsp;·&nbsp;
                    Pl.&nbsp;16 — периметр на&nbsp;закате.
                </p>

                {/* Двухколоночный layout: текстовый блок слева (5/12),
                    pull-quote справа (7/12) — editorial paired with typography */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-24 md:mb-32">
                    <div className="md:col-span-5 font-serif text-[16px] md:text-[18px] leading-[1.65] space-y-5">
                        <p>
                            Территория внутри периметра — только для&nbsp;жителей
                            дома. Сверху подземного паркинга — эксплуатируемая
                            кровля: двор, дорожки, посадки.
                        </p>
                        <p>
                            Приезжаешь в&nbsp;дождь — не&nbsp;мокнешь. Лифт из&nbsp;паркинга
                            поднимает прямо до&nbsp;квартиры. Уезжаешь на&nbsp;месяц —
                            возвращаешься в&nbsp;тот&nbsp;же дом.
                        </p>
                    </div>
                    <div className="md:col-span-7 md:border-l md:border-handwriting/15 md:pl-10">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-5">
                            Эксплуатируемая кровля
                        </p>
                        <p className="font-serif italic text-[22px] md:text-[30px] xl:text-[36px] leading-[1.2] max-w-[22ch]">
                            Жизнь на&nbsp;просеках — без&nbsp;быта на&nbsp;просеках.
                        </p>
                    </div>
                </div>

                {/* Контакт-лист — 4 миниатюры в ряд, horizontal-snap на mobile */}
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-6">
                    Фрагменты. Ритмы. Входы.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 [scroll-snap-type:x_proximity] md:[scroll-snap-type:none] overflow-x-auto md:overflow-visible -mx-5 md:mx-0 px-5 md:px-0">
                    {[
                        { num: '17', src: '/images/visual/36.jpg', alt: 'Вход в лобби.' },
                        { num: '18', src: '/images/visual/04.jpg', alt: 'Въезд в подземный паркинг.' },
                        { num: '19', src: '/images/visual/06.jpg', alt: 'Лестница у лобби.' },
                        { num: '20', src: '/images/visual/37.jpg', alt: 'Периметр вечером.' },
                    ].map((p) => (
                        <figure
                            key={p.num}
                            className="shrink-0 w-[62%] md:w-auto [scroll-snap-align:start] relative"
                        >
                            <div className="aspect-square overflow-hidden bg-dust/40">
                                <img
                                    src={p.src}
                                    alt={p.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute top-2 right-2">
                                <Plate n={p.num} />
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
