import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 06B — Свет и пропорции.
 *
 * Продолжение архитектурной монографии. Plate nums Pl.11–14.
 * Тексты редактируются через Orchid (Home → Block 06B). Пластины —
 * props.plates (Plate, block='interior', number '11'…'14').
 */

function Plate({ n, tone = 'light' }) {
    const color = tone === 'light' ? 'text-handwriting/50' : 'text-paper/60';
    return (
        <span
            className={
                'font-sans text-[10px] font-bold tracking-[0.18em] uppercase ' +
                color
            }
        >
            Pl.&nbsp;{n}
        </span>
    );
}

// Fallback-массив плит
const fallbackInteriorPlates = [
    { number: '11', image: '/images/visual/23.jpg', alt: 'Интерьер лота. Панорамное остекление в пол, вид на Волгу.' },
    { number: '12', image: '/images/visual/27.jpg', alt: 'Деталь интерьера — встреча остекления с потолком.' },
    { number: '13', image: '/images/visual/33.jpg', alt: 'Интерьер на закате. Панорамное остекление, тёплая архитектурная подсветка.' },
    { number: '14', image: '/images/visual/24.jpg', alt: 'Интерьер жилого этажа. Пропорции комнаты рассчитаны под горизонт Волги.', caption: 'Pl.\u00a014 — комната, сориентированная под горизонт.' },
];

const fallbackMaterials = [
    'Панорамное остекление Schüco — в\u00a0пол',
    'Потолки 3,5–4\u00a0метра',
    'Свободная планировка под\u00a0сценарий жителя',
    'Тёплая архитектурная подсветка',
    'Лаконичный фасад без\u00a0декоративной избыточности',
];

export default function Interior({ plates = [] }) {
    const rubric = useSetting('block06b.rubric', 'Акт III · Свет');
    const h2 = useSetting('block06b.h2', 'Окна в пол. Потолки до четырёх метров.');
    const subtitle = useSetting(
        'block06b.subtitle',
        'Панорамное остекление Schüco. Дом проектировался под виды.'
    );
    const textIsland = useSetting(
        'block06b.text_island',
        'Жилые этажи начинаются на той же высоте, с которой Константин Головкин проектировал слонов — чтобы их было видно с пароходов.'
    );
    const materialsTitle = useSetting('block06b.materials_title', 'Характеристики');
    const materialsListRaw = useSetting(
        'block06b.materials_list',
        fallbackMaterials.join('\n')
    );
    const materials = materialsListRaw
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

    // Байдем по номерам
    const source = plates && plates.length ? plates : fallbackInteriorPlates;
    const byNumber = {};
    for (const p of source) byNumber[String(p.number)] = p;
    for (const p of fallbackInteriorPlates) {
        if (!byNumber[p.number]) byNumber[p.number] = p;
    }

    const pl11 = byNumber['11'];
    const pl12 = byNumber['12'];
    const pl13 = byNumber['13'];
    const pl14 = byNumber['14'];

    // H2 был в оригинале с <br/> и <em>. Здесь рендерим простую строку,
    // если в ней встречается «. » — вставляем разрыв (но оставляем простым).

    return (
        <section
            id="interior"
            className="snap-slide bg-paper text-handwriting py-rhythm-xl md:py-rhythm-xl-md overflow-hidden"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                {/* Рубрика + заголовок */}
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                    {rubric}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-rhythm-lg md:mb-rhythm-lg-md">
                    <h2 className="md:col-span-8 font-serif text-[34px] md:text-[56px] xl:text-[64px] leading-[1.02] font-medium tracking-[-0.01em]">
                        {h2}
                    </h2>
                    <p className="md:col-span-4 md:pt-4 font-serif italic text-[17px] md:text-[20px] leading-[1.4] opacity-80 max-w-[26ch]">
                        {subtitle}
                    </p>
                </div>

                {/* Диптих Pl.11 + Pl.12 */}
                <div className="grid grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
                    <figure className="col-span-9 relative">
                        <div className="aspect-[16/10] overflow-hidden bg-dust/40">
                            {pl11?.image && (
                                <img
                                    src={pl11.image}
                                    alt={pl11.alt || 'Интерьер лота. Панорамное остекление.'}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="11" />
                        </div>
                    </figure>
                    <figure className="col-span-3 relative">
                        <div className="aspect-[3/4] overflow-hidden bg-dust/40">
                            {pl12?.image && (
                                <img
                                    src={pl12.image}
                                    alt={pl12.alt || 'Деталь интерьера.'}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="12" />
                        </div>
                    </figure>
                </div>
                <p className="font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70 mb-rhythm-lg md:mb-rhythm-lg-md">
                    {pl11?.caption || 'Pl.\u00a011 — день, вид на Жигулёвские ворота из гостиной.'}
                    &nbsp;·&nbsp;
                    {pl12?.caption || 'Pl.\u00a012 — встреча остекления с\u00a0потолком.'}
                </p>

                {/* Текстовый остров */}
                <div className="max-w-[560px] mx-auto text-center mb-rhythm-lg md:mb-rhythm-lg-md font-serif text-[17px] md:text-[19px] leading-[1.65]">
                    <p className="mb-5">{textIsland}</p>
                    <p>
                        Окна — <em>в пол</em>. Потолки три с&nbsp;половиной и&nbsp;четыре метра.
                        Днём свет идёт снизу, от&nbsp;воды; вечером дом теплеет изнутри
                        собственной архитектурной подсветкой.
                    </p>
                </div>

                {/* Pl.13 full-bleed */}
                <figure className="relative w-screen left-1/2 -translate-x-1/2 mb-6 md:mb-8">
                    <div className="h-[60vh] md:h-[75vh] min-h-[420px] md:min-h-[560px] overflow-hidden bg-ink">
                        {pl13?.image && (
                            <img
                                src={pl13.image}
                                alt={pl13.alt || 'Интерьер на закате.'}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="absolute top-4 right-5 md:top-6 md:right-10">
                        <Plate n="13" tone="dark" />
                    </div>
                </figure>
                <div className="max-w-[1320px] mx-auto px-5 md:px-10">
                    <p className="font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70 mb-rhythm-lg md:mb-rhythm-lg-md">
                        {pl13?.caption || 'Pl.\u00a013 — закат через остекление. Тёплая архитектурная подсветка включается от\u00a0сумерек.'}
                    </p>
                </div>

                {/* Список + Pl.14 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                    <div className="md:col-span-5">
                        <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-stamp mb-rhythm-sm md:mb-rhythm-sm-md">
                            {materialsTitle}
                        </p>
                        <dl className="space-y-5 font-serif text-[15px] md:text-[17px] leading-[1.5]">
                            {materials.map((m, i) => {
                                const isLast = i === materials.length - 1;
                                return (
                                    <div
                                        key={i}
                                        className={
                                            'flex items-baseline gap-4 ' +
                                            (isLast ? '' : 'border-b border-handwriting/15 pb-4')
                                        }
                                    >
                                        <dt className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase opacity-60 w-[48px] shrink-0">
                                            {String(i + 1).padStart(2, '0')}
                                        </dt>
                                        <dd className="flex-1">{m}</dd>
                                    </div>
                                );
                            })}
                        </dl>
                    </div>

                    <figure className="md:col-span-7 md:ml-[8%] relative">
                        <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-dust/40">
                            {pl14?.image && (
                                <img
                                    src={pl14.image}
                                    alt={pl14.alt || 'Интерьер жилого этажа.'}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <div className="absolute top-3 right-3">
                            <Plate n="14" />
                        </div>
                        <figcaption className="mt-3 font-serif italic text-[13px] md:text-[14px] leading-[1.5] opacity-70">
                            {pl14?.caption || 'Pl.\u00a014 — комната, сориентированная под горизонт.'}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
