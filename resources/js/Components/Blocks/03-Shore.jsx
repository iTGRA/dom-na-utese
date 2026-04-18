import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 03 — Берег. Самарская Ривьера.
 *
 * 7/5 сетка: слева текст «Сделать место героем», справа — карта-схема
 * 10 км берега от 1-й до 9-й просеки. Факты (1877 · 10 км · 0) —
 * внизу, editorial стрипом.
 *
 * Все тексты редактируются через Orchid (Home → Block 03). Картинка
 * карты — `block03.map_image` (если null, падаем на статический SVG/JPG).
 */
export default function Shore() {
    const rubric = useSetting('block03.rubric', '03 · Место');
    const h2 = useSetting('block03.h2', 'Самарская Ривьера');
    const subtitle = useSetting(
        'block03.subtitle',
        'Десять километров волжского берега, которые никогда не были общественной землёй.'
    );
    const p1 = useSetting(
        'block03.p1',
        'Просеки — это не район, это линия. Десять километров высокого левого берега от Постникова оврага до Барбашиной поляны, поросших сосновым и дубовым лесом. В 1877 году Городская Управа нарезала здесь 93 участка и отдала их в частную аренду на 99 лет.'
    );
    const p2 = useSetting(
        'block03.p2',
        'За следующие тридцать лет берег застроили купеческие династии, которые строили Самару: Головкины, Шихобаловы, Соколовы, Сурошниковы, Курлины, Субботины. Они выбирали этот берег не под показную роскошь. Константин Головкин, построивший здесь Дачу со Слонами, описывал соседские владения как единственные по красоте на всём течении Волги от Нижнего Новгорода до Астрахани.'
    );
    const p3 = useSetting(
        'block03.p3',
        'Полоса до сих пор застроена частными домами. Здесь нет жилых комплексов. Строительство невозможно — свободной первой линии не осталось.'
    );
    const cta = useSetting('block03.cta', 'Подробнее о берегу →');
    const mapImage = useSetting('block03.map_image', '/images/map/shore-map-1600.jpg');

    const fact1Value = useSetting('block03.fact1_value', '1877');
    const fact1Label = useSetting('block03.fact1_label', 'Год открытия берега');
    const fact2Value = useSetting('block03.fact2_value', '10 км');
    const fact2Label = useSetting('block03.fact2_label', 'Длина полосы');
    const fact3Value = useSetting('block03.fact3_value', '0');
    const fact3Label = useSetting('block03.fact3_label', 'Клубных домов на первой линии до сегодняшнего дня');

    const bridge = useSetting(
        'block03.bridge',
        'Восемь соседей по\u00a0берегу — на\u00a0странице'
    );

    // fact2_value может содержать число + единицу ("10 км"). Для editorial-
    // типографики (большие цифры + маленькая единица) вытаскиваем хвост
    // после первого пробела и рендерим меньшим кеглем.
    const [fact2Main, ...fact2Tail] = fact2Value.split(' ');
    const fact2Unit = fact2Tail.join(' ');

    return (
        <section
            id="place"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    {rubric}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
                    <div className="md:col-span-7">
                        <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-rhythm-sm md:mb-rhythm-sm-md">
                            {h2}
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.3] opacity-80 mb-rhythm-md md:mb-rhythm-md-md max-w-[28ch]">
                            {subtitle}
                        </p>

                        <div className="space-y-5 font-serif text-[15px] md:text-[17px] leading-[1.65] max-w-[640px]">
                            <p>{p1}</p>
                            <p>{p2}</p>
                            <p>{p3}</p>
                        </div>

                        <div className="mt-rhythm-md md:mt-rhythm-md-md">
                            <a
                                href="/shore"
                                className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-stamp link-underline"
                            >
                                {cta}
                            </a>
                        </div>

                        {/* Factline — 3 цифры */}
                        <div className="mt-rhythm-lg md:mt-rhythm-lg-md border-t border-handwriting/15 pt-rhythm-md md:pt-rhythm-md-md">
                            <div className="flex flex-row items-start justify-between gap-3 sm:gap-6 md:gap-10">
                                <div className="flex-1 min-w-0">
                                    <p className="font-serif text-[36px] sm:text-[48px] md:text-[60px] xl:text-[72px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                        {fact1Value}
                                    </p>
                                    <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                        {fact1Label}
                                    </p>
                                </div>
                                <span className="self-stretch w-px bg-handwriting/20 shrink-0" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-serif text-[36px] sm:text-[48px] md:text-[60px] xl:text-[72px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                        {fact2Main}
                                        {fact2Unit && (
                                            <> <span className="text-[20px] sm:text-[26px] md:text-[34px]">{fact2Unit}</span></>
                                        )}
                                    </p>
                                    <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                        {fact2Label}
                                    </p>
                                </div>
                                <span className="self-stretch w-px bg-handwriting/20 shrink-0" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-serif text-[36px] sm:text-[48px] md:text-[60px] xl:text-[72px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                        {fact3Value}
                                    </p>
                                    <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                        {fact3Label}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-rhythm-md md:mt-rhythm-md-md font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-handwriting/70 leading-[1.6]">
                                {bridge}{' '}
                                <a
                                    href="/shore#neighbors"
                                    className="text-stamp link-underline"
                                >
                                    Берег&nbsp;→
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Карта берега — 5 колонок */}
                    <div className="md:col-span-5">
                        <figure className="md:sticky md:top-28">
                            <img
                                src={mapImage}
                                srcSet={
                                    mapImage === '/images/map/shore-map-1600.jpg'
                                        ? '/images/map/shore-map-1600.jpg 1600w, /images/map/shore-map-3200.jpg 3200w'
                                        : undefined
                                }
                                sizes="(min-width: 768px) 42vw, 100vw"
                                alt="Волжский берег от Постникова оврага до Барбашиной поляны: 9 просек, сосновый лес, силуэты исторических дач и маркер «Дом на Утёсе» на 5-й просеке."
                                className="w-full h-auto block"
                                loading="lazy"
                                decoding="async"
                            />
                            <figcaption className="mt-3 font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/60">
                                10 км берега · 9 просек · точка «Дом на Утёсе»
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}
