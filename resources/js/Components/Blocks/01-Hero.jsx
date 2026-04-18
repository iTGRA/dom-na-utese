import Button from '../UI/Button';
import { useLeadForm } from '../../hooks/useLeadForm';

/**
 * Блок 01 — Hero.
 *
 * Full-bleed фото Волги с утёса (client explicit: /images/visual/14.jpg).
 * Минимум текста поверх. Якоря в четырёх углах (editorial-композиция).
 *
 * Тексты — дословно из dom-na-utese-brief.txt §БЛОК 1 и concept.txt.
 *
 * LCP: фото preloaded в app.blade.php + fetchpriority=high + не lazy.
 */
export default function Hero() {
    const { openLeadForm } = useLeadForm();

    return (
        <section
            id="hero"
            className="relative snap-slide w-full overflow-hidden bg-ink text-paper"
            style={{ minHeight: '100svh' }}
        >
            {/* Full-bleed image */}
            <img
                src="/images/visual/14.jpg"
                alt="Волга с утёса на закате. Жигулёвские ворота на горизонте."
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark editorial overlay — усиливает текст, не даёт баннерного «premium» вайба */}
            <div className="absolute inset-0 bg-ink/50" aria-hidden="true" />

            {/* Top-corner rubrics убраны по запросу клиента 2026-04-18 —
                Hero теперь чистая ink-композиция без editorial-углов,
                весь смысловой вес — в нижнем стеке. */}

            {/* CENTER content — компактная нижняя композиция.
                flex-col + justify-end прижимает стек к низу экрана.
                Воздух между элементами сокращён (kicker → H1 rhythm-sm,
                subtitle → divider rhythm-md) — монолит «Дом на Утёсе +
                На одной линии с историей» стоит близко к CTA-линии,
                а tea-кикер плотно над H1. */}
            <div className="relative z-[1] min-h-[100svh] flex flex-col justify-end max-w-[1320px] mx-auto px-5 md:px-10 pt-rhythm-xl md:pt-rhythm-xl-md pb-rhythm-xl md:pb-rhythm-xl-md">
                {/* Группа 1 — кикер, близко к H1 (rhythm-sm).
                    Было text-tea — оранжевый на мутном hero-кадре
                    читался плохо. Paper (бежевый) + [text-shadow] дают
                    крепкий контраст на любом фото, оставаясь editorial. */}
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-paper mb-rhythm-sm md:mb-rhythm-sm-md [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                    Клубный дом на первой линии Волги
                </p>

                {/* Группа 2 — H1 + italic subtitle.
                    H1 → subtitle: rhythm-sm (связанная пара).
                    subtitle → делитель CTA: rhythm-md (тесная editorial пауза). */}
                <h1 className="font-serif text-[52px] md:text-[96px] xl:text-[120px] leading-[0.9] font-medium tracking-[-0.02em] max-w-[10ch] md:max-w-none mb-rhythm-sm md:mb-rhythm-sm-md">
                    Дом <em className="not-italic md:italic">на Утёсе</em>
                </h1>
                <p className="font-serif italic text-[18px] md:text-[26px] leading-[1.3] max-w-[480px] opacity-90 mb-rhythm-md md:mb-rhythm-md-md">
                    На одной линии с историей.
                </p>

                {/* Группа 3 — CTAs слева, factline справа на том же уровне.
                    1px paper-делитель сверху. pt-rhythm-sm — rubric-like
                    парный разрыв после линии до CTA. */}
                <div className="border-t border-paper/20 pt-rhythm-sm md:pt-rhythm-sm-md">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
                        {/* CTAs — слева */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
                            <Button
                                variant="on-ink"
                                onClick={() => openLeadForm({ source: 'hero' })}
                            >
                                Приватный показ
                            </Button>
                            <Button
                                variant="ghost-on-ink"
                                as="a"
                                href="#category"
                                arrow={false}
                            >
                                О доме ↓
                            </Button>
                        </div>

                        {/* Factline — справа, на уровне CTA. Разделители —
                            тонкая four-pointed звёздочка ✦ paper/40,
                            editorial-нейтрально (не tea-акцент). */}
                        <p className="md:text-right font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase opacity-80 leading-[1.7]">
                            9 лотов
                            <span className="mx-2 md:mx-3 text-paper/40" aria-hidden="true">✦</span>
                            первая линия Волги
                            <span className="mx-2 md:mx-3 text-paper/40" aria-hidden="true">✦</span>
                            потолки 3,5–4 м
                            <span className="mx-2 md:mx-3 text-paper/40" aria-hidden="true">✦</span>
                            дом сдан
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
