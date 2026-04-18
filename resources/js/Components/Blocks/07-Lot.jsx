/**
 * Блок 07 — Лот.
 *
 * Гигантская «9» 280pt (160pt mobile) + таблица состава лота (7/5).
 * Метафора брифа: «девять одинаковых по структуре комплектов».
 *
 * Текст — дословно из dom-na-utese-brief.txt §БЛОК 7.
 */
const lotComposition = [
    {
        label: 'Квартира',
        value: 'Свободная планировка, потолки 3,5–4 м',
        meta: 'Метраж уточняется у менеджера',
    },
    {
        label: 'Летняя терраса',
        value: 'Собственная зелёная терраса на уровне квартиры',
    },
    {
        label: 'Балкон-терраса',
        value: 'Панорамный балкон, обращённый к Волге',
    },
    {
        label: 'Подземный паркинг',
        value: '2 машиноместа в лоте',
    },
    {
        label: 'Кладовая',
        value: 'Индивидуальная кладовая в цокольной зоне',
    },
];

export default function Lot() {
    return (
        <section
            id="lot"
            className="snap-slide bg-paper text-handwriting py-[96px] md:py-[160px]"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-4">
                    07 · Лот
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
                    {/* Гигантская «9» — 5 колонок */}
                    <div className="md:col-span-5">
                        <div className="relative">
                            <span
                                className="block font-serif font-medium text-stamp leading-[0.8] tracking-[-0.04em] tnum"
                                style={{ fontSize: 'clamp(160px, 34vw, 280px)' }}
                                aria-hidden="true"
                            >
                                9
                            </span>
                            <span className="absolute top-0 right-0 md:top-4 md:right-2 font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-handwriting/60 max-w-[12ch] text-right">
                                Больше таких не будет
                            </span>
                        </div>

                        <p className="mt-6 md:mt-10 font-serif italic text-[17px] md:text-[22px] leading-[1.3] max-w-[30ch]">
                            Девять одинаковых по&nbsp;структуре комплектов.
                        </p>
                    </div>

                    {/* Таблица состава — 7 колонок */}
                    <div className="md:col-span-7">
                        <h2 className="font-serif text-[30px] md:text-[42px] leading-[1.05] font-medium tracking-[-0.005em] mb-6 max-w-[22ch]">
                            Вы получаете не квартиру, а полный набор.
                        </h2>
                        <p className="font-serif text-[15px] md:text-[17px] leading-[1.65] mb-10 max-w-[520px]">
                            Каждый из девяти лотов — это не квартира, а полный набор. Вы не
                            доплачиваете за паркоместа, кладовую, террасу. Всё это уже включено.
                        </p>

                        <dl className="border-t border-handwriting/20">
                            {lotComposition.map((row, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-4 border-b border-handwriting/15"
                                >
                                    <dt className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-handwriting/60 pt-[3px]">
                                        {row.label}
                                    </dt>
                                    <dd className="font-serif text-[15px] md:text-[17px] leading-[1.45]">
                                        {row.value}
                                        {row.meta && (
                                            <span className="block font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/50 mt-1">
                                                {row.meta}
                                            </span>
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {/* Эмоциональный factline — горизонтально на всех экранах */}
                        <div className="mt-10 md:mt-12 pt-6 border-t border-handwriting/15 flex flex-row items-baseline justify-between gap-3 sm:gap-6 md:gap-10">
                            <div className="flex-1 min-w-0">
                                <p className="font-serif italic text-[18px] sm:text-[22px] md:text-[28px] leading-[1.1] text-stamp tnum">
                                    9
                                </p>
                                <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.12em] uppercase opacity-70 mt-1">
                                    лотов
                                </p>
                            </div>
                            <span className="self-stretch w-px bg-handwriting/20 shrink-0" aria-hidden="true" />
                            <div className="flex-1 min-w-0">
                                <p className="font-serif italic text-[18px] sm:text-[22px] md:text-[28px] leading-[1.1] text-stamp tnum">
                                    9
                                </p>
                                <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.12em] uppercase opacity-70 mt-1">
                                    видов на&nbsp;Волгу
                                </p>
                            </div>
                            <span className="self-stretch w-px bg-handwriting/20 shrink-0" aria-hidden="true" />
                            <div className="flex-1 min-w-0">
                                <p className="font-serif italic text-[18px] sm:text-[22px] md:text-[28px] leading-[1.1] text-stamp tnum">
                                    8
                                </p>
                                <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.12em] uppercase opacity-70 mt-1">
                                    соседей
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
