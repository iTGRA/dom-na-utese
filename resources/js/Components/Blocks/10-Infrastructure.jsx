/**
 * Блок 10 — Инфраструктура и сервис.
 *
 * ЖЁСТКОЕ ПРАВИЛО: иконок здесь НЕТ. Горизонтальный реестр строк —
 * «линия сильнее рамки», «число сильнее иконки» (DESIGN_SYSTEM.md §14).
 *
 * Контент — дословно из dom-na-utese-brief.txt §БЛОК 10. Описания
 * пишут о смысле, не о функции.
 */
const infra = [
    {
        num: '01',
        title: 'Подземный паркинг',
        body: 'Приезжаете в дождь и не мокнете. Лифт до квартиры.',
    },
    {
        num: '02',
        title: 'Управляющая компания',
        body: 'Уезжаете на месяц, возвращаетесь в тот же дом.',
    },
    {
        num: '03',
        title: 'Круглосуточная охрана',
        body: 'Закрытая территория, видеонаблюдение, контроль доступа.',
    },
    {
        num: '04',
        title: 'Кладовые',
        body: 'Сезонные вещи, велосипеды, лыжи не в квартире.',
    },
    {
        num: '05',
        title: 'Закрытый двор',
        body: 'Территория только для жителей дома.',
    },
    {
        num: '06',
        title: 'Лобби',
        body: 'Встреча гостей и приём посылок через консьержа.',
    },
];

export default function Infrastructure() {
    return (
        <section
            id="infrastructure"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    10 · Инфраструктура
                </p>
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-20 items-end mb-rhythm-lg md:mb-rhythm-lg-md">
                    <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] max-w-[16ch]">
                        Инфраструктура
                    </h2>
                    <p className="font-serif italic text-[17px] md:text-[22px] leading-[1.3] opacity-80 max-w-[34ch] md:pb-3">
                        Жизнь на&nbsp;просеках без быта на&nbsp;просеках.
                    </p>
                </div>

                {/* Горизонтальный реестр — строки в 2 колонки на desktop */}
                <div className="border-t border-handwriting/20">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {infra.map((row, i) => (
                            <div
                                key={row.num}
                                className={
                                    'py-6 md:py-8 border-b border-handwriting/15 grid grid-cols-[48px_1fr] md:grid-cols-[64px_1fr] gap-4 items-start ' +
                                    (i % 2 === 0 && i !== infra.length - 1
                                        ? 'md:border-r md:border-handwriting/15 md:pr-10'
                                        : '') +
                                    (i % 2 === 1 ? ' md:pl-10' : '')
                                }
                            >
                                <span className="font-sans text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase text-stamp tnum pt-[6px]">
                                    {row.num}
                                </span>
                                <div>
                                    <h3 className="font-serif text-[22px] md:text-[26px] leading-[1.15] font-medium mb-2">
                                        {row.title}
                                    </h3>
                                    <p className="font-serif text-[15px] md:text-[16px] leading-[1.55] opacity-80 max-w-[44ch]">
                                        {row.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
