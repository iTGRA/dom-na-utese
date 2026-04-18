/**
 * Блок 05 — Дача со Слонами.
 *
 * Ночной блок. Ink фон, tea акцент (stamp на ink «мутнеет»).
 * 5/7 инверсия — крупное фото слева, текст справа.
 *
 * Текст — дословно из dom-na-utese-brief.txt §БЛОК 5.
 * Контент-менеджер может перезаписать и текст, и фото через админку
 * (Neighbor с featured=true). Сейчас — fallback на статический текст
 * и /images/visual/11.jpg, если Neighbor не пришёл или не загружен.
 */
const fallbackBody = [
    'Федеральный памятник архитектуры. Построена в 1908–1909 годах по проекту самого Константина Головкина — купца, художника, археолога и одного из первых автомобилистов Самары. Фигуры слонов рассчитаны на обзор с проплывающих пароходов: берег был парадной витриной самарского купечества.',
    'Три года реставрации. 7 сентября 2024 года дача открыта для посетителей — по средам, пятницам и субботам.',
];

const fallbackCaption = 'Дача К.П. Головкина · 1908–1909 · 4-я просека';

export default function Dacha({ neighbor = null }) {
    // Если пришёл живой объект из БД — берём его описание и картинку.
    // Иначе — fallback из брифа.
    const imageSrc = neighbor?.image || '/images/visual/11.jpg';
    const imageAlt = neighbor
        ? `${neighbor.title}. ${neighbor.address || ''}. ${neighbor.statusLabel || ''}`.trim()
        : 'Дача со Слонами. 4-я просека, Самара. Федеральный памятник архитектуры, модерн.';

    const caption = neighbor
        ? [neighbor.title?.replace(' — «Дача со Слонами»', ''), neighbor.dateLabel, neighbor.address]
              .filter(Boolean)
              .join(' · ')
        : fallbackCaption;

    // Разбиваем длинное описание по абзацам (разделитель — два перевода строки или склеенный текст).
    let bodyParagraphs = fallbackBody;
    if (neighbor?.description) {
        const split = neighbor.description.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
        bodyParagraphs = split.length > 1 ? split : [neighbor.description];
    }

    return (
        <section
            id="dacha"
            className="snap-slide bg-ink text-paper py-[96px] md:py-[160px]"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
                {/* Фото — 5 колонок */}
                <figure className="md:col-span-5 md:order-1">
                    <div className="aspect-[4/5] overflow-hidden bg-ink-deep">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <figcaption className="mt-3 font-sans text-[10px] font-bold tracking-[0.1em] uppercase opacity-60">
                        {caption}
                    </figcaption>
                </figure>

                {/* Текст — 7 колонок */}
                <div className="md:col-span-7 md:order-2">
                    <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-tea mb-4">
                        05 · Главный сосед
                    </p>
                    <h2 className="font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em] mb-4">
                        Дача со&nbsp;Слонами<span className="text-tea">.</span>
                    </h2>
                    <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.3] opacity-85 mb-10 max-w-[26ch]">
                        В пятнадцати минутах пешком.
                    </p>

                    <div className="space-y-5 font-serif text-[15px] md:text-[17px] leading-[1.65] max-w-[640px] opacity-90">
                        {bodyParagraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    <blockquote className="mt-10 pt-6 border-t border-paper/15 font-serif italic text-[22px] md:text-[28px] leading-[1.4] text-tea max-w-[32ch]">
                        Та же высота, с которой Головкин проектировал слонов — чтобы их было
                        видно с&nbsp;пароходов.
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
