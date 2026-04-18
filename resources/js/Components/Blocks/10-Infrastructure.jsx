import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 10 — Инфраструктура и сервис.
 *
 * ЖЁСТКОЕ ПРАВИЛО: иконок здесь НЕТ. Горизонтальный реестр строк —
 * «линия сильнее рамки», «число сильнее иконки».
 *
 * Тексты (rubric/h2/subtitle) редактируются через Orchid (Home → Block 10).
 * Карточки — массив InfrastructureCard (number, title, description) через
 * props.infra. Если props пустые — используется fallback (6 карточек).
 */

const fallbackInfra = [
    { number: '01', title: 'Подземный паркинг', description: 'Приезжаете в дождь и не мокнете. Лифт до квартиры.' },
    { number: '02', title: 'Управляющая компания', description: 'Уезжаете на месяц, возвращаетесь в тот же дом.' },
    { number: '03', title: 'Круглосуточная охрана', description: 'Закрытая территория, видеонаблюдение, контроль доступа.' },
    { number: '04', title: 'Кладовые', description: 'Сезонные вещи, велосипеды, лыжи не в квартире.' },
    { number: '05', title: 'Закрытый двор', description: 'Территория только для жителей дома.' },
    { number: '06', title: 'Лобби', description: 'Встреча гостей и приём посылок через консьержа.' },
];

export default function Infrastructure({ infra = [] }) {
    const rubric = useSetting('block10.rubric', '10 · Инфраструктура');
    const h2 = useSetting('block10.h2', 'Инфраструктура');
    const subtitle = useSetting('block10.subtitle', 'Жизнь на\u00a0просеках без быта на\u00a0просеках.');

    const items = infra && infra.length ? infra : fallbackInfra;

    return (
        <section
            id="infrastructure"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    {rubric}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-20 items-end mb-rhythm-lg md:mb-rhythm-lg-md">
                    <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] max-w-[16ch]">
                        {h2}
                    </h2>
                    <p className="font-serif italic text-[17px] md:text-[22px] leading-[1.3] opacity-80 max-w-[34ch] md:pb-3">
                        {subtitle}
                    </p>
                </div>

                {/* Горизонтальный реестр — строки в 2 колонки на desktop */}
                <div className="border-t border-handwriting/20">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {items.map((row, i) => (
                            <div
                                key={row.id || row.number || i}
                                className={
                                    'py-6 md:py-8 border-b border-handwriting/15 grid grid-cols-[48px_1fr] md:grid-cols-[64px_1fr] gap-4 items-start ' +
                                    (i % 2 === 0 && i !== items.length - 1
                                        ? 'md:border-r md:border-handwriting/15 md:pr-10'
                                        : '') +
                                    (i % 2 === 1 ? ' md:pl-10' : '')
                                }
                            >
                                <span className="font-sans text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase text-stamp tnum pt-[6px]">
                                    {row.number}
                                </span>
                                <div>
                                    <h3 className="font-serif text-[22px] md:text-[26px] leading-[1.15] font-medium mb-2">
                                        {row.title}
                                    </h3>
                                    <p className="font-serif text-[15px] md:text-[16px] leading-[1.55] opacity-80 max-w-[44ch]">
                                        {row.description}
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
