import Button from '../UI/Button';
import { useLeadForm } from '../../hooks/useLeadForm';
import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 01 — Hero.
 *
 * Full-bleed фото Волги с утёса (client explicit: /images/visual/14.jpg).
 * Минимум текста поверх. Якоря в четырёх углах (editorial-композиция).
 *
 * Контент редактируется через Orchid (Home → Block 01). Все тексты и
 * фоновое фото читаются из shared `settings` с fallback-ом на исходный
 * копирайт (дефолты = буквально то, что было захардкожено до Фазы 2).
 *
 * LCP: фото preloaded в app.blade.php + fetchpriority=high + не lazy.
 */
export default function Hero() {
    const { openLeadForm } = useLeadForm();

    const kicker = useSetting('block01.kicker', 'Клубный дом на первой линии Волги');
    const h1Before = useSetting('block01.h1_before', 'Дом');
    const h1Italic = useSetting('block01.h1_italic', 'на Утёсе');
    const subtitle = useSetting('block01.subtitle', 'На одной линии с историей.');
    const ctaPrimary = useSetting('block01.cta_primary', 'Приватный показ');
    const ctaSecondary = useSetting('block01.cta_secondary', 'О доме ↓');
    const fact1 = useSetting('block01.fact_1', '9 лотов');
    const fact2 = useSetting('block01.fact_2', 'первая линия Волги');
    const fact3 = useSetting('block01.fact_3', 'потолки 3,5–4 м');
    const fact4 = useSetting('block01.fact_4', 'дом сдан');
    const image = useSetting('block01.image', '/images/visual/14.jpg');

    const facts = [fact1, fact2, fact3, fact4].filter(Boolean);

    return (
        <section
            id="hero"
            className="relative snap-slide w-full overflow-hidden bg-ink text-paper"
            style={{ minHeight: '100svh' }}
        >
            {/* Full-bleed image */}
            <img
                src={image}
                alt="Волга с утёса на закате. Жигулёвские ворота на горизонте."
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark editorial overlay — усиливает текст, не даёт баннерного «premium» вайба */}
            <div className="absolute inset-0 bg-ink/50" aria-hidden="true" />

            <div className="relative z-[1] min-h-[100svh] flex flex-col justify-end max-w-[1320px] mx-auto px-5 md:px-10 pt-rhythm-xl md:pt-rhythm-xl-md pb-rhythm-xl md:pb-rhythm-xl-md">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-paper mb-rhythm-sm md:mb-rhythm-sm-md [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                    {kicker}
                </p>

                <h1 className="font-serif text-[52px] md:text-[96px] xl:text-[120px] leading-[0.9] font-medium tracking-[-0.02em] max-w-[10ch] md:max-w-none mb-rhythm-sm md:mb-rhythm-sm-md">
                    {h1Before} <em className="not-italic md:italic">{h1Italic}</em>
                </h1>
                <p className="font-serif italic text-[18px] md:text-[26px] leading-[1.3] max-w-[480px] opacity-90 mb-rhythm-md md:mb-rhythm-md-md">
                    {subtitle}
                </p>

                <div className="border-t border-paper/20 pt-rhythm-sm md:pt-rhythm-sm-md">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
                            <Button
                                variant="on-ink"
                                onClick={() => openLeadForm({ source: 'hero' })}
                            >
                                {ctaPrimary}
                            </Button>
                            <Button
                                variant="ghost-on-ink"
                                as="a"
                                href="#category"
                                arrow={false}
                            >
                                {ctaSecondary}
                            </Button>
                        </div>

                        <p className="md:text-right font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase opacity-80 leading-[1.7]">
                            {facts.map((f, i) => (
                                <span key={i}>
                                    {f}
                                    {i < facts.length - 1 && (
                                        <span className="mx-2 md:mx-3 text-paper/40" aria-hidden="true">✦</span>
                                    )}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
