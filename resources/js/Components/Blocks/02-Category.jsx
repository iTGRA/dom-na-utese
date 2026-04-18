/**
 * Блок 02 — Категория в одном абзаце.
 *
 * Белый/бумажный фон, крупная типографика. 2/7/3 сетка:
 *   метка-рубрика · текст · вертикальный portrait-кадр.
 *
 * Вертикальный portrait (2026-04-18) — силуэт дома в сумерках или деталь
 * фасада, подпись italic снизу в духе архивного альбома. На mobile
 * стекается и прячется ниже текста, чтобы не ломать чтение лида.
 *
 * Текст — дословно из dom-na-utese-brief.txt §БЛОК 2.
 */
export default function Category() {
    return (
        <section
            id="category"
            className="snap-slide bg-paper text-handwriting py-[96px] md:py-[160px]"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                {/* Метка-рубрика: 2 колонки */}
                <div className="md:col-span-2">
                    <div className="md:sticky md:top-24">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-stamp mb-4">
                            02 · Категория
                        </p>
                        <span className="block w-8 h-[1px] bg-handwriting/30" />
                    </div>
                </div>

                {/* Тело: 7 колонок */}
                <div className="md:col-span-7">
                    <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.05] font-medium tracking-[-0.01em] mb-8 md:mb-12 max-w-[22ch]">
                        На исторической полосе самарских просек — от&nbsp;Постникова оврага
                        до&nbsp;Барбашиной поляны — сто&nbsp;лет стояли только частные дачи.
                    </h2>

                    <p className="font-serif text-[17px] md:text-[20px] leading-[1.6] max-w-[640px] mb-8">
                        Клубного дома здесь не было никогда.{' '}
                        <em className="text-stamp">Дом на Утёсе</em> — девять лотов на первой
                        линии Волги, построенных в 2024 году на той же береговой линии, где
                        с 1877 года стоят виллы Головкина, Соколовых, Сурошникова, Курлиной.
                    </p>

                    {/* Подзаголовочные факты — строкой */}
                    <div className="mt-12 md:mt-16 pt-6 border-t border-handwriting/15">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase text-handwriting/75 leading-[1.8]">
                            9 лотов
                            <span className="mx-2 text-stamp">·</span>
                            8 соседей
                            <span className="mx-2 text-stamp">·</span>
                            потолки 3,5–4 м
                            <span className="mx-2 text-stamp">·</span>
                            панорамное остекление
                            <span className="mx-2 text-stamp">·</span>
                            подземный паркинг
                            <span className="mx-2 text-stamp">·</span>
                            управляющая компания
                        </p>
                    </div>
                </div>

                {/* Вертикальный portrait-кадр: 3 колонки, скрыт от mobile под текстом */}
                <div className="md:col-span-3">
                    <figure className="max-w-[60%] sm:max-w-[50%] md:max-w-full">
                        <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
                            <img
                                src="/images/visual/20.jpg"
                                alt="Силуэт дома со стороны Волги."
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <figcaption className="mt-3 font-serif italic text-[12px] md:text-[13px] leading-[1.45] text-handwriting/75">
                            Дом на&nbsp;Утёсе, 4-я просека, 2026.
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
