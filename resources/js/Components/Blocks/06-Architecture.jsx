import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 06 — Архитектура.
 *
 * Переработан 2026-04-18 в духе архитектурной монографии Phaidon / Taschen.
 * Асимметричный разворот: рубрика → диптих (широкая пластина + малая деталь) →
 * текстовый остров → full-bleed пластина → материалы + portrait → контакт-лист.
 *
 * Плиты имеют сквозную нумерацию Pl. 01–Pl. 10. Тексты и список материалов
 * редактируются через Orchid (Home → Block 06). Пластины лежат отдельно
 * в таблице `plates` (block='arch'), приходят сюда массивом через prop.
 * Если массив пустой — используется хардкод (fallbackArchPlates).
 *
 * Mapping: каждая плита ищется по `number` ('01'…'10'). Позиции в layout'е
 * жёстко заданы (Pl.01 диптих, Pl.02 узкая, Pl.03 full-bleed, Pl.04 portrait,
 * Pl.05–10 contact sheet) — плиты с отсутствующим `image` пропускаются.
 */

function Plate({ num, position = 'tr', tone = 'paper' }) {
    const positionClasses = {
        tr: 'top-3 right-3 md:top-4 md:right-4',
        tl: 'top-3 left-3 md:top-4 md:left-4',
        bl: 'bottom-3 left-3 md:bottom-4 md:left-4',
        br: 'bottom-3 right-3 md:bottom-4 md:right-4',
    }[position];
    const toneClasses =
        tone === 'paper'
            ? 'text-paper/75'
            : 'text-handwriting/50';
    return (
        <span
            className={`absolute ${positionClasses} font-sans text-[10px] font-bold tracking-[0.15em] uppercase ${toneClasses} select-none pointer-events-none`}
            aria-hidden="true"
        >
            Pl.&nbsp;{String(num).padStart(2, '0')}
        </span>
    );
}

// Fallback — массив плит, как было захардкожено до Фазы 2.
// Используется когда props.plates.arch пустой (миграция не накатана / БД сброшена).
const fallbackArchPlates = [
    { number: '01', image: '/images/visual/01.jpg', alt: 'Парадный вид дома с юго-запада.', caption: 'Pl.\u00a001\u00a0— Вид с\u00a0юго-запада, раннее утро.' },
    { number: '02', image: '/images/visual/03.jpg', alt: 'Фасад в деталях.', caption: 'Pl.\u00a002\u00a0— Фасад в\u00a0деталях.' },
    { number: '03', image: '/images/visual/07.jpg', alt: 'Терраса выходит к Волге. Вечерний свет на фасаде.', caption: 'Pl.\u00a003\u00a0— Терраса выходит к\u00a0Волге. Вечерний ритм фасада.' },
    { number: '04', image: '/images/visual/09.jpg', alt: 'Материальная деталь. Макро-кадр.', caption: 'Pl.\u00a004\u00a0— Деталь, крупный план. Каждому решению в\u00a0списке рифмуется ритм на\u00a0фасаде.' },
    { number: '05', image: '/images/visual/02.jpg', alt: 'Фрагмент фасада.' },
    { number: '06', image: '/images/visual/05.jpg', alt: 'Интерьерный ритм.' },
    { number: '07', image: '/images/visual/12.jpg', alt: 'Лестница.' },
    { number: '08', image: '/images/visual/15.jpg', alt: 'Окно.' },
    { number: '09', image: '/images/visual/17.jpg', alt: 'Фактура камня.' },
    { number: '10', image: '/images/visual/19.jpg', alt: 'Входная группа.' },
];

const fallbackMaterials = [
    'Панорамное остекление в пол Schüco',
    'Потолки 3,5–4 метра',
    'Натуральные фасадные материалы',
    'Тёплая архитектурная подсветка',
    'Закрытый двор на эксплуатируемой кровле подземного паркинга',
];

export default function Architecture({ plates = [] }) {
    const rubric = useSetting('block06.rubric', 'Акт III · Архитектура');
    const h2 = useSetting(
        'block06.h2',
        'Дом проектировался под\u00a0виды и\u00a0под\u00a0ритм берега.'
    );
    const textIslandP1 = useSetting(
        'block06.subtitle',
        'Три этажа над утёсом. Лаконичный фасад без\u00a0декоративной избыточности.'
    );
    const textIslandP2 = useSetting(
        'block06.text_island',
        'Материалы выбирались так, чтобы дом не\u00a0спорил с\u00a0ландшафтом, а\u00a0становился его\u00a0продолжением.'
    );
    const materialsTitle = useSetting('block06.materials_title', 'Материалы');
    const materialsListRaw = useSetting(
        'block06.materials_list',
        fallbackMaterials.join('\n')
    );
    const materials = materialsListRaw
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

    // Объединяем плиты из props с fallback-ом по ключу `number`, чтобы
    // каждая позиция (Pl.01…Pl.10) всегда что-то отрендерила.
    const source = plates && plates.length ? plates : fallbackArchPlates;
    const byNumber = {};
    for (const p of source) {
        byNumber[String(p.number).padStart(2, '0')] = p;
    }
    // Покрываем все 10 позиций: если в props чего-то нет — подтягиваем из fallback.
    for (const p of fallbackArchPlates) {
        if (!byNumber[p.number]) byNumber[p.number] = p;
    }

    const pl01 = byNumber['01'];
    const pl02 = byNumber['02'];
    const pl03 = byNumber['03'];
    const pl04 = byNumber['04'];
    const contactSheet = ['05', '06', '07', '08', '09', '10']
        .map((n) => byNumber[n])
        .filter((p) => p && p.image);

    return (
        <section
            id="architecture"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md overflow-hidden"
        >
            {/* Шапка акта */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-rhythm-lg md:mb-rhythm-lg-md">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    {rubric}
                </p>
                <h2 className="font-serif text-[36px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] max-w-[18ch]">
                    {h2}
                </h2>
                <div className="mt-rhythm-md md:mt-rhythm-md-md h-px w-full bg-handwriting/15" />
            </div>

            {/* Диптих Pl.01 + Pl.02 */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-rhythm-lg md:mb-rhythm-lg-md">
                <div className="grid grid-cols-12 gap-3 md:gap-4">
                    <figure className="col-span-8 md:col-span-9 relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-paper-deep">
                        {pl01?.image && (
                            <img
                                src={pl01.image}
                                alt={pl01.alt || 'Парадный вид дома с юго-запада.'}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        )}
                        <Plate num={1} position="tr" tone="paper" />
                    </figure>

                    <figure className="col-span-4 md:col-span-3 relative aspect-[3/4] md:aspect-[3/4] overflow-hidden bg-paper-deep self-end md:self-auto">
                        {pl02?.image && (
                            <img
                                src={pl02.image}
                                alt={pl02.alt || 'Фасад в деталях.'}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        )}
                        <Plate num={2} position="tr" tone="paper" />
                    </figure>
                </div>

                <div className="mt-4 md:mt-5 grid grid-cols-12 gap-3 md:gap-4">
                    <p className="col-span-8 md:col-span-9 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                        {pl01?.caption || 'Pl.\u00a001\u00a0— Вид с\u00a0юго-запада, раннее утро.'}
                    </p>
                    <p className="col-span-4 md:col-span-3 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                        {pl02?.caption || 'Pl.\u00a002\u00a0— Фасад в\u00a0деталях.'}
                    </p>
                </div>
            </div>

            {/* Текстовый остров */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-rhythm-lg md:mb-rhythm-lg-md">
                <div className="max-w-[560px] mx-auto text-center">
                    <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] mb-6">
                        {textIslandP1}
                    </p>
                    <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] text-handwriting/85">
                        {textIslandP2}
                    </p>
                </div>
            </div>

            {/* Pl.03 full-bleed */}
            <figure className="relative w-screen left-1/2 -translate-x-1/2 bg-paper-deep overflow-hidden mb-4 md:mb-5">
                <div className="relative h-[60vh] md:h-[75vh] min-h-[420px] md:min-h-[560px]">
                    {pl03?.image && (
                        <img
                            src={pl03.image}
                            alt={pl03.alt || 'Терраса выходит к Волге. Вечерний свет на фасаде.'}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <Plate num={3} position="tr" tone="paper" />
                </div>
            </figure>

            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-rhythm-lg md:mb-rhythm-lg-md">
                <p className="font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                    {pl03?.caption || 'Pl.\u00a003\u00a0— Терраса выходит к\u00a0Волге. Вечерний ритм фасада.'}
                </p>
            </div>

            {/* Материалы + Pl.04 */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-rhythm-lg md:mb-rhythm-lg-md">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
                    <div className="md:col-span-5">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            {materialsTitle}
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
                                    <span className="font-serif text-[15px] md:text-[17px] leading-[1.45]">
                                        {m}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-7">
                        <div className="w-[75%] md:w-full ml-0">
                            <figure className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
                                {pl04?.image && (
                                    <img
                                        src={pl04.image}
                                        alt={pl04.alt || 'Материальная деталь. Макро-кадр.'}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <Plate num={4} position="tr" tone="paper" />
                            </figure>
                            <p className="mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                                {pl04?.caption || 'Pl.\u00a004\u00a0— Деталь, крупный план. Каждому решению в\u00a0списке рифмуется ритм на\u00a0фасаде.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Контакт-лист Pl.05–10 */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    Контакт-лист
                </p>

                <div
                    className="
                        flex flex-row gap-3 md:gap-4 overflow-x-auto
                        -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0
                        md:overflow-visible md:grid md:grid-cols-6
                        [scroll-snap-type:x_mandatory] md:[scroll-snap-type:none]
                    "
                >
                    {contactSheet.map((p) => (
                        <figure
                            key={p.number}
                            className="
                                shrink-0 w-[42vw] sm:w-[32vw] md:w-auto
                                relative aspect-[4/5] overflow-hidden bg-paper-deep
                                [scroll-snap-align:start]
                            "
                        >
                            <img
                                src={p.image}
                                alt={p.alt || ''}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            <Plate num={parseInt(p.number, 10)} position="tr" tone="paper" />
                        </figure>
                    ))}
                </div>

                <p className="mt-5 md:mt-6 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                    Pl.&nbsp;05–10&nbsp;— Фрагменты. Ритмы. Фактуры. Шесть кадров,
                    прочитанных подряд как одна фраза.
                </p>
            </div>
        </section>
    );
}
