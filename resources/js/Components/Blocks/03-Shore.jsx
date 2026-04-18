/**
 * Блок 03 — Берег. Самарская Ривьера.
 *
 * 7/5 сетка: слева текст «Сделать место героем», справа — SVG-схема
 * 10 км берега от 1-й до 9-й просеки с отметкой «ЗДЕСЬ МЫ».
 *
 * Тексты — дословно из dom-na-utese-brief.txt §БЛОК 3.
 *
 * Факт-блок 3 цифр (1877 · 10 км · 0) — внизу, editorial стрипом.
 */
export default function Shore() {
    return (
        <section
            id="place"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    03 · Место
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
                    {/* Текст + factline — 7 колонок. Линия-разделитель и три
                        цифры (1877 · 10 км · 0) живут внутри той же колонки,
                        под текстом — editorial-приём: разделитель только под
                        абзацами, не через всю ширину страницы. */}
                    <div className="md:col-span-7">
                        <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-rhythm-sm md:mb-rhythm-sm-md">
                            Самарская Ривьера
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.3] opacity-80 mb-rhythm-md md:mb-rhythm-md-md max-w-[28ch]">
                            Десять километров волжского берега, которые никогда не были
                            общественной землёй.
                        </p>

                        <div className="space-y-5 font-serif text-[15px] md:text-[17px] leading-[1.65] max-w-[640px]">
                            <p>
                                Просеки — это не район, это линия. Десять километров
                                высокого левого берега от Постникова оврага до Барбашиной
                                поляны, поросших сосновым и дубовым лесом. В 1877 году
                                Городская Управа нарезала здесь 93 участка и отдала их в
                                частную аренду на 99 лет.
                            </p>
                            <p>
                                За следующие тридцать лет берег застроили купеческие династии,
                                которые строили Самару: Головкины, Шихобаловы, Соколовы,
                                Сурошниковы, Курлины, Субботины. Они выбирали этот берег не
                                под показную роскошь. Константин Головкин, построивший здесь
                                Дачу со Слонами, описывал соседские владения как{' '}
                                <em>единственные по красоте на всём течении Волги от Нижнего
                                Новгорода до Астрахани</em>.
                            </p>
                            <p>
                                Полоса до сих пор застроена частными домами. Здесь нет жилых
                                комплексов. Строительство невозможно — свободной первой линии
                                не осталось.
                            </p>
                        </div>

                        <div className="mt-rhythm-md md:mt-rhythm-md-md">
                            <a
                                href="/shore"
                                className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-stamp link-underline"
                            >
                                Подробнее о берегу →
                            </a>
                        </div>

                        {/* Factline — 3 цифры. Линия над ним только в ширину
                            текстовой колонки (не full-width страницы).
                            mt-rhythm-lg: editorial пауза до факт-строки. */}
                        <div className="mt-rhythm-lg md:mt-rhythm-lg-md border-t border-handwriting/15 pt-rhythm-md md:pt-rhythm-md-md">
                            <div className="flex flex-row items-start justify-between gap-3 sm:gap-6 md:gap-10">
                                <div className="flex-1 min-w-0">
                                    <p className="font-serif text-[36px] sm:text-[48px] md:text-[60px] xl:text-[72px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                        1877
                                    </p>
                                    <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                        Год открытия берега
                                    </p>
                                </div>
                                <span className="self-stretch w-px bg-handwriting/20 shrink-0" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-serif text-[36px] sm:text-[48px] md:text-[60px] xl:text-[72px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                        10 <span className="text-[20px] sm:text-[26px] md:text-[34px]">км</span>
                                    </p>
                                    <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                        Длина полосы
                                    </p>
                                </div>
                                <span className="self-stretch w-px bg-handwriting/20 shrink-0" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-serif text-[36px] sm:text-[48px] md:text-[60px] xl:text-[72px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                        0
                                    </p>
                                    <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                        Клубных домов на первой линии до сегодняшнего дня
                                    </p>
                                </div>
                            </div>

                            {/* Мостик на справочник берега */}
                            <p className="mt-rhythm-md md:mt-rhythm-md-md font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-handwriting/70 leading-[1.6]">
                                Восемь соседей по&nbsp;берегу — на&nbsp;странице{' '}
                                <a
                                    href="/shore#neighbors"
                                    className="text-stamp link-underline"
                                >
                                    Берег&nbsp;→
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Карта берега — 5 колонок, ink-тонированная, скошенный левый край */}
                    <div className="md:col-span-5">
                        <figure className="md:sticky md:top-28">
                            <img
                                src="/images/map/shore-map-1600.jpg"
                                srcSet="/images/map/shore-map-1600.jpg 1600w, /images/map/shore-map-3200.jpg 3200w"
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
