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
            className="snap-slide bg-paper text-handwriting py-[96px] md:py-[160px]"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-4">
                    03 · Место
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16 md:mb-24">
                    {/* Текст — 7 колонок */}
                    <div className="md:col-span-7">
                        <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-4">
                            Самарская Ривьера
                        </h2>
                        <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.3] opacity-80 mb-10 max-w-[28ch]">
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

                        <div className="mt-10">
                            <a
                                href="/shore"
                                className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-stamp link-underline"
                            >
                                Подробнее о берегу →
                            </a>
                        </div>
                    </div>

                    {/* SVG-схема берега — 5 колонок */}
                    <div className="md:col-span-5">
                        <figure className="md:sticky md:top-28">
                            <svg
                                viewBox="0 0 400 520"
                                className="w-full h-auto"
                                role="img"
                                aria-labelledby="shore-map-title"
                            >
                                <title id="shore-map-title">
                                    Схема волжского берега от Постникова оврага до Барбашиной
                                    поляны с девятью просеками и точкой «Дом на Утёсе».
                                </title>

                                {/* Фоновая текстура paper */}
                                <rect width="400" height="520" fill="#E5D9C3" />
                                {/* Вода */}
                                <rect x="0" y="0" width="80" height="520" fill="#D9D4C5" />
                                {/* Волга — извилистая линия */}
                                <path
                                    d="M 80 0 Q 95 80 85 160 Q 75 240 90 320 Q 105 400 80 520"
                                    fill="none"
                                    stroke="#1E1E1E"
                                    strokeWidth="1"
                                />
                                {/* Берег — вертикальная линия */}
                                <line
                                    x1="110"
                                    y1="20"
                                    x2="110"
                                    y2="500"
                                    stroke="#1E1E1E"
                                    strokeWidth="1"
                                />
                                {/* 9 просек и метки — от Постникова (вверху) к Барбашиной (внизу) */}
                                {[
                                    { y: 60, num: '1', label: 'Дача Сипиной · 1903' },
                                    { y: 110, num: '2', label: '' },
                                    { y: 160, num: '3', label: '' },
                                    { y: 215, num: '4', label: 'Дача со Слонами · 1908', bold: true },
                                    { y: 260, num: '5', label: 'Дом на Утёсе', here: true },
                                    { y: 305, num: '6', label: '' },
                                    { y: 350, num: '7', label: 'Сурошников · Курлина', bold: true },
                                    { y: 400, num: '8', label: 'Константинов' },
                                    { y: 450, num: '9', label: 'Соколовы · 1909', bold: true },
                                ].map((it) => (
                                    <g key={it.num}>
                                        <line
                                            x1="110"
                                            y1={it.y}
                                            x2={it.here ? 250 : 130}
                                            y2={it.y}
                                            stroke={it.here ? '#802F1D' : '#1E1E1E'}
                                            strokeWidth={it.here ? 1.5 : 1}
                                        />
                                        <circle
                                            cx="110"
                                            cy={it.y}
                                            r={it.here ? 5 : 2.5}
                                            fill={it.here ? '#802F1D' : '#1E1E1E'}
                                        />
                                        <text
                                            x="118"
                                            y={it.y - 8}
                                            fontFamily="Alegreya Sans SC, sans-serif"
                                            fontSize="9"
                                            fontWeight="700"
                                            letterSpacing="1.2"
                                            fill={it.here ? '#802F1D' : '#1E1E1E'}
                                        >
                                            {it.num}-Я ПРОСЕКА
                                        </text>
                                        {it.label && (
                                            <text
                                                x={it.here ? 258 : 138}
                                                y={it.y + 4}
                                                fontFamily="Piazzolla, Georgia, serif"
                                                fontSize={it.here ? 13 : 10}
                                                fontWeight={it.here ? 700 : it.bold ? 500 : 400}
                                                fontStyle={it.here ? 'italic' : 'normal'}
                                                fill={it.here ? '#802F1D' : '#1E1E1E'}
                                            >
                                                {it.label}
                                            </text>
                                        )}
                                    </g>
                                ))}
                                {/* Подпись вверху — Постников овраг */}
                                <text x="110" y="20" fontFamily="Alegreya Sans SC, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.2" fill="#1E1E1E">
                                    ↑ ПОСТНИКОВ ОВРАГ · 1858
                                </text>
                                {/* Подпись внизу — Барбашина поляна */}
                                <text x="110" y="515" fontFamily="Alegreya Sans SC, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.2" fill="#1E1E1E">
                                    ↓ БАРБАШИНА ПОЛЯНА
                                </text>
                                {/* Водная метка */}
                                <text x="20" y="260" fontFamily="Piazzolla, Georgia, serif" fontStyle="italic" fontSize="12" fill="#1E1E1E" opacity="0.5" transform="rotate(-90 20 260)">
                                    Волга
                                </text>
                            </svg>
                            <figcaption className="mt-3 font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-handwriting/60">
                                10 км берега · 9 просек · точка «Дом на Утёсе»
                            </figcaption>
                        </figure>
                    </div>
                </div>

                {/* Факт-блок 3 цифр — горизонтально на всех экранах, editorial-разделители */}
                <div className="border-t border-handwriting/15 pt-10 md:pt-12">
                    <div className="flex flex-row items-start justify-between gap-3 sm:gap-6 md:gap-12">
                        <div className="flex-1 min-w-0">
                            <p className="font-serif text-[40px] sm:text-[56px] md:text-[72px] xl:text-[84px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                1877
                            </p>
                            <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                Год открытия берега
                            </p>
                        </div>
                        <span className="self-stretch w-px bg-handwriting/20 shrink-0" aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                            <p className="font-serif text-[40px] sm:text-[56px] md:text-[72px] xl:text-[84px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                10 <span className="text-[22px] sm:text-[28px] md:text-[40px]">км</span>
                            </p>
                            <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                Длина полосы
                            </p>
                        </div>
                        <span className="self-stretch w-px bg-handwriting/20 shrink-0" aria-hidden="true" />
                        <div className="flex-1 min-w-0">
                            <p className="font-serif text-[40px] sm:text-[56px] md:text-[72px] xl:text-[84px] leading-[0.9] font-medium text-stamp tnum mb-2 md:mb-3">
                                0
                            </p>
                            <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase opacity-70 leading-[1.35]">
                                Клубных домов на первой линии до сегодняшнего дня
                            </p>
                        </div>
                    </div>

                    {/* Мостик на справочник берега */}
                    <p className="mt-10 md:mt-12 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-handwriting/70 leading-[1.6]">
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
        </section>
    );
}
