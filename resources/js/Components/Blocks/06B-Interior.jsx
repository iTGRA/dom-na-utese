/**
 * Блок 06B — Свет и пропорции.
 *
 * Продолжение архитектурной монографии после блока 06 (экстерьер).
 * Фокус смещается внутрь: панорамное остекление, пропорции, свет.
 * Тот же Phaidon-ритм, что в 06 — нечётный диптих, текстовый остров,
 * full-bleed пик, портрет со списком.
 *
 * Plate numbering continuity с 06 Architecture: Pl. 11–14.
 *
 * Факты — только из docs/design-system/dom-na-utese-brief.txt §6.
 * Interior-specific edits отмечены комментарием.
 *
 * Изображения — клиент может свапать через Visual/ замену по именам.
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

export default function Interior() {
    return (
        <section
            id="interior"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md overflow-hidden"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                {/* Рубрика + заголовок */}
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    Акт III · Свет
                </p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-rhythm-lg md:mb-rhythm-lg-md">
                    <h2 className="md:col-span-8 font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em]">
                        Окна в пол.<br />
                        Потолки <em>до четырёх метров</em>.
                    </h2>
                    <p className="md:col-span-4 md:pt-4 font-serif italic text-[17px] md:text-[20px] leading-[1.4] opacity-80 max-w-[26ch]">
                        Панорамное остекление Schüco. Дом проектировался под виды.
                    </p>
                </div>

                {/* Диптих Pl. 11 (9/12 wide) + Pl. 12 (3/12 portrait) */}
                <div className="grid grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
                    <figure className="col-span-9 relative">
                        <div className="aspect-[16/10] overflow-hidden bg-dust/40">
                            <img
                                src="/images/visual/23.jpg"
                                alt="Интерьер лота. Панорамное остекление в пол, вид на Волгу."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="11" />
                        </div>
                    </figure>
                    <figure className="col-span-3 relative">
                        <div className="aspect-[3/4] overflow-hidden bg-dust/40">
                            <img
                                src="/images/visual/27.jpg"
                                alt="Деталь интерьера — встреча остекления с потолком."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="12" />
                        </div>
                    </figure>
                </div>
                <p className="font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70 mb-rhythm-lg md:mb-rhythm-lg-md">
                    Pl.&nbsp;11 — день, вид на Жигулёвские ворота из гостиной. &nbsp;·&nbsp;
                    Pl.&nbsp;12 — встреча остекления с&nbsp;потолком.
                </p>

                {/* Текстовый остров — editorial пауза */}
                <div className="max-w-[560px] mx-auto text-center mb-rhythm-lg md:mb-rhythm-lg-md font-serif text-[17px] md:text-[19px] leading-[1.65]">
                    <p className="mb-5">
                        Жилые этажи начинаются на той же высоте, с&nbsp;которой
                        Константин Головкин проектировал слонов —&nbsp;чтобы их было
                        видно с&nbsp;пароходов.
                    </p>
                    <p>
                        Окна — <em>в пол</em>. Потолки три с&nbsp;половиной и&nbsp;четыре метра.
                        Днём свет идёт снизу, от&nbsp;воды; вечером дом теплеет изнутри
                        собственной архитектурной подсветкой.
                    </p>
                </div>

                {/* Pl. 13 — full-bleed (вырывается за контейнер, 75vh) */}
                <figure className="relative w-screen left-1/2 -translate-x-1/2 mb-6 md:mb-8">
                    <div className="h-[60vh] md:h-[75vh] min-h-[420px] md:min-h-[560px] overflow-hidden bg-ink">
                        <img
                            src="/images/visual/33.jpg"
                            alt="Интерьер на закате. Панорамное остекление, тёплая архитектурная подсветка."
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute top-4 right-5 md:top-6 md:right-10">
                        <Plate n="13" tone="dark" />
                    </div>
                </figure>
                <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                    <p className="font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70 mb-rhythm-lg md:mb-rhythm-lg-md">
                        Pl.&nbsp;13 — закат через остекление. Тёплая архитектурная подсветка
                        включается от&nbsp;сумерек.
                    </p>
                </div>

                {/* Список характеристик (5/12) + Pl. 14 портрет (7/12) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                    <div className="md:col-span-5">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            Характеристики
                        </p>
                        <dl className="space-y-5 font-serif text-[15px] md:text-[17px] leading-[1.5]">
                            <div className="flex items-baseline gap-4 border-b border-handwriting/15 pb-4">
                                <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase opacity-60 w-[48px] shrink-0">01</dt>
                                <dd className="flex-1">Панорамное остекление Schüco — в&nbsp;пол</dd>
                            </div>
                            <div className="flex items-baseline gap-4 border-b border-handwriting/15 pb-4">
                                <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase opacity-60 w-[48px] shrink-0">02</dt>
                                <dd className="flex-1">Потолки 3,5–4&nbsp;метра</dd>
                            </div>
                            <div className="flex items-baseline gap-4 border-b border-handwriting/15 pb-4">
                                <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase opacity-60 w-[48px] shrink-0">03</dt>
                                <dd className="flex-1">Свободная планировка под&nbsp;сценарий жителя</dd>
                            </div>
                            <div className="flex items-baseline gap-4 border-b border-handwriting/15 pb-4">
                                <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase opacity-60 w-[48px] shrink-0">04</dt>
                                <dd className="flex-1">Тёплая архитектурная подсветка</dd>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase opacity-60 w-[48px] shrink-0">05</dt>
                                <dd className="flex-1">Лаконичный фасад без&nbsp;декоративной избыточности</dd>
                            </div>
                        </dl>
                    </div>

                    <figure className="md:col-span-7 md:ml-[8%] relative">
                        <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-dust/40">
                            <img
                                src="/images/visual/24.jpg"
                                alt="Интерьер жилого этажа. Пропорции комнаты рассчитаны под горизонт Волги."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="14" />
                        </div>
                        <figcaption className="mt-3 font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70">
                            Pl.&nbsp;14 — комната, сориентированная под горизонт.
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
