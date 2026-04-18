/**
 * Блок 06 — Архитектура.
 *
 * Переработан 2026-04-18 в духе архитектурной монографии Phaidon / Taschen.
 * Асимметричный разворот: рубрика → диптих (широкая пластина + малая деталь) →
 * текстовый остров → full-bleed пластина → материалы + portrait → контакт-лист.
 *
 * Плиты имеют сквозную нумерацию Pl. 01–Pl. 10 и курсивные подписи под каждой
 * группой. Тексты — из dom-na-utese-brief.txt §БЛОК 6, но пересобраны под
 * книжный ритм, с коротким текстовым «островом» посередине.
 *
 * Фото-маппинг (art-director's cut, 2026-04-18):
 *   Pl. 01 — 01.jpg   парадный экстерьер, wide
 *   Pl. 02 — 03.jpg   portrait деталь фасада
 *   Pl. 03 — 07.jpg   full-bleed, видовой/атмосферный
 *   Pl. 04 — 09.jpg   materialный макро-кадр (portrait) рядом со списком
 *   Pl. 05 — 02.jpg
 *   Pl. 06 — 05.jpg
 *   Pl. 07 — 12.jpg
 *   Pl. 08 — 15.jpg
 *   Pl. 09 — 17.jpg
 *   Pl. 10 — 19.jpg
 *
 * Mobile-адаптация:
 *   - Диптих (Pl.01/Pl.02) стекается: Pl.02 — narrow 60% справа
 *   - Full-bleed Pl.03 остаётся полноэкранной, высота 60vh
 *   - Материалы + Pl.04: список сверху, фото — 75% ширины снизу со смещением
 *   - Контакт-лист — horizontal scroll + scroll-snap
 */

// Plate-numbering component — маленький музейный маркер в углу фотопластины.
// Alegreya Sans SC 700, uppercase, 10pt, letter-spacing 0.15em, tea-color
// при opacity 0.5 — ровно как в книжном фото-альбоме.
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

const materials = [
    'Панорамное остекление в пол Schüco',
    'Потолки 3,5–4 метра',
    'Натуральные фасадные материалы',
    'Тёплая архитектурная подсветка',
    'Закрытый двор на эксплуатируемой кровле подземного паркинга',
];

const contactSheet = [
    { num: 5, src: '/images/visual/02.jpg', alt: 'Фрагмент фасада.' },
    { num: 6, src: '/images/visual/05.jpg', alt: 'Интерьерный ритм.' },
    { num: 7, src: '/images/visual/12.jpg', alt: 'Лестница.' },
    { num: 8, src: '/images/visual/15.jpg', alt: 'Окно.' },
    { num: 9, src: '/images/visual/17.jpg', alt: 'Фактура камня.' },
    { num: 10, src: '/images/visual/19.jpg', alt: 'Входная группа.' },
];

export default function Architecture() {
    return (
        <section
            id="architecture"
            className="snap-slide bg-paper text-handwriting py-[96px] md:py-[140px] overflow-hidden"
        >
            {/* Шапка акта — воздух сверху, рубрика + заголовок */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-16 md:mb-24">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-6">
                    Акт III · Архитектура
                </p>
                <h2 className="font-serif text-[36px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] max-w-[18ch]">
                    Дом проектировался под&nbsp;виды и&nbsp;под&nbsp;ритм берега.
                </h2>
                <div className="mt-10 h-px w-full bg-handwriting/15" />
            </div>

            {/* ПЛАСТИНЫ I + II — диптих (widescreen 9/12 + narrow 3/12) */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-16 md:mb-24">
                <div className="grid grid-cols-12 gap-3 md:gap-4">
                    {/* Pl.01 — широкий экстерьер, 9 cols на desktop, 8 на mobile */}
                    <figure className="col-span-8 md:col-span-9 relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-paper-deep">
                        <img
                            src="/images/visual/01.jpg"
                            alt="Парадный вид дома с юго-запада."
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                        <Plate num={1} position="tr" tone="paper" />
                    </figure>

                    {/* Pl.02 — узкая portrait деталь, 3 cols на desktop, 4 на mobile */}
                    <figure className="col-span-4 md:col-span-3 relative aspect-[3/4] md:aspect-[3/4] overflow-hidden bg-paper-deep self-end md:self-auto">
                        <img
                            src="/images/visual/03.jpg"
                            alt="Фасад в деталях."
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                        <Plate num={2} position="tr" tone="paper" />
                    </figure>
                </div>

                {/* Подписи-дипписи */}
                <div className="mt-4 md:mt-5 grid grid-cols-12 gap-3 md:gap-4">
                    <p className="col-span-8 md:col-span-9 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                        Pl.&nbsp;01&nbsp;— Вид с&nbsp;юго-запада, раннее утро.
                    </p>
                    <p className="col-span-4 md:col-span-3 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                        Pl.&nbsp;02&nbsp;— Фасад в&nbsp;деталях.
                    </p>
                </div>
            </div>

            {/* ТЕКСТОВЫЙ ОСТРОВ — 2 абзаца, узкая колонка по центру */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-16 md:mb-28">
                <div className="max-w-[560px] mx-auto text-center">
                    <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] mb-6">
                        Три этажа над утёсом. Лаконичный фасад без&nbsp;декоративной
                        избыточности.
                    </p>
                    <p className="font-serif text-[17px] md:text-[19px] leading-[1.7] text-handwriting/85">
                        Материалы выбирались так, чтобы дом не&nbsp;спорил с&nbsp;ландшафтом,
                        а&nbsp;становился его&nbsp;продолжением.
                    </p>
                </div>
            </div>

            {/* ПЛАСТИНА III — full-bleed, вырывается за пределы контейнера */}
            <figure className="relative w-screen left-1/2 -translate-x-1/2 bg-paper-deep overflow-hidden mb-4 md:mb-5">
                <div className="relative h-[60vh] md:h-[75vh] min-h-[420px] md:min-h-[560px]">
                    <img
                        src="/images/visual/07.jpg"
                        alt="Терраса выходит к Волге. Вечерний свет на фасаде."
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                    />
                    <Plate num={3} position="tr" tone="paper" />
                </div>
            </figure>

            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-16 md:mb-28">
                <p className="font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                    Pl.&nbsp;03&nbsp;— Терраса выходит к&nbsp;Волге. Вечерний ритм фасада.
                </p>
            </div>

            {/* МАТЕРИАЛЫ + Pl.04 — 4/8 editorial grid */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 mb-16 md:mb-28">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
                    {/* Список материалов */}
                    <div className="md:col-span-5">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-6">
                            Материалы
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

                    {/* Pl.04 — portrait, макро-деталь, 7 cols, но с breathing slot слева */}
                    <div className="md:col-span-7">
                        {/* На mobile картинка занимает 75% ширины со сдвигом влево — editorial breathing */}
                        <div className="w-[75%] md:w-full ml-0">
                            <figure className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
                                <img
                                    src="/images/visual/09.jpg"
                                    alt="Материальная деталь. Макро-кадр."
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                                <Plate num={4} position="tr" tone="paper" />
                            </figure>
                            <p className="mt-4 font-serif italic text-[13px] md:text-[14px] leading-[1.5] text-handwriting/75">
                                Pl.&nbsp;04&nbsp;— Деталь, крупный план. Каждому решению в&nbsp;списке
                                рифмуется ритм на&nbsp;фасаде.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* КОНТАКТ-ЛИСТ — 6 кадров, на mobile — горизонтальный свайп */}
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-6">
                    Контакт-лист
                </p>

                {/* Desktop: 6-колоночная сетка. Mobile: horizontal scroll со snap */}
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
                            key={p.num}
                            className="
                                shrink-0 w-[42vw] sm:w-[32vw] md:w-auto
                                relative aspect-[4/5] overflow-hidden bg-paper-deep
                                [scroll-snap-align:start]
                            "
                        >
                            <img
                                src={p.src}
                                alt={p.alt}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            <Plate num={p.num} position="tr" tone="paper" />
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
