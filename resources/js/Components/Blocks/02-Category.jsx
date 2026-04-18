import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 02 — Категория в одном абзаце.
 *
 * Белый/бумажный фон, крупная типографика. 2/7/3 сетка:
 *   метка-рубрика · текст · вертикальный portrait-кадр.
 *
 * Контент из Orchid (Home → Block 02). `block02.facts` — одна строка,
 * значения разделены запятой; разбиваем и рендерим как caps-factline.
 *
 * H2 и lead содержат разметку <em> — мы держим копирайт HTML-таким, как
 * он был захардкожен. В админке редактор получит простой textarea.
 * Если этого окажется мало — позже перейдём на rich-text поле,
 * но для старта фаза 2 кладёт plain-text и рендерит как есть.
 */
export default function Category() {
    const rubric = useSetting('block02.rubric', '02 · Категория');
    const h2 = useSetting(
        'block02.h2',
        'На исторической полосе самарских просек — от\u00a0Постникова оврага до\u00a0Барбашиной поляны — сто\u00a0лет стояли только частные дачи.'
    );
    const leadRaw = useSetting(
        'block02.lead',
        'Клубного дома здесь не было никогда. Дом на Утёсе — девять лотов на первой линии Волги, построенных в 2024 году на той же береговой линии, где с 1877 года стоят виллы Головкина, Соколовых, Сурошникова, Курлиной.'
    );
    const factsRaw = useSetting(
        'block02.facts',
        '9 лотов, 8 соседей, потолки 3,5–4 м, панорамное остекление, подземный паркинг, управляющая компания'
    );
    const image = useSetting('block02.image', '/images/visual/20.jpg');
    const caption = useSetting('block02.caption', 'Дом на\u00a0Утёсе, 4-я просека, 2026.');

    const facts = factsRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

    return (
        <section
            id="category"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                {/* Метка-рубрика: 2 колонки */}
                <div className="md:col-span-2">
                    <div className="md:sticky md:top-24">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            {rubric}
                        </p>
                        <span className="block w-8 h-[1px] bg-handwriting/30" />
                    </div>
                </div>

                {/* Тело: 7 колонок */}
                <div className="md:col-span-7">
                    <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.05] font-medium tracking-[-0.01em] mb-rhythm-md md:mb-rhythm-md-md max-w-[22ch]">
                        {h2}
                    </h2>

                    <p className="font-serif text-[17px] md:text-[20px] leading-[1.6] max-w-[640px] mb-rhythm-md md:mb-rhythm-md-md">
                        {leadRaw}
                    </p>

                    {facts.length > 0 && (
                        <div className="mt-rhythm-lg md:mt-rhythm-lg-md pt-rhythm-sm border-t border-handwriting/15">
                            <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase text-handwriting/75 leading-[1.8]">
                                {facts.map((f, i) => (
                                    <span key={i}>
                                        {f}
                                        {i < facts.length - 1 && (
                                            <span className="mx-2 text-stamp">·</span>
                                        )}
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}
                </div>

                {/* Вертикальный portrait-кадр: 3 колонки */}
                <div className="md:col-span-3">
                    <figure className="max-w-[60%] sm:max-w-[50%] md:max-w-full">
                        <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
                            <img
                                src={image}
                                alt="Силуэт дома со стороны Волги."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <figcaption className="mt-3 font-serif italic text-[12px] md:text-[13px] leading-[1.45] text-handwriting/75">
                            {caption}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
