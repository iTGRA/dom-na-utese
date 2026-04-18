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

            {/* Corners — в общем max-w-[1320px] wrapper, чтобы верхняя rubric
                и нижний H1 выравнивались по одной левой оси. Top-offset
                увеличен до 96/112px — rubric должен находиться НИЖЕ
                fixed header (52–64px), с editorial breathing. */}
            <div className="absolute inset-x-0 top-[96px] md:top-[112px] z-[1] pointer-events-none">
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 flex justify-between items-start gap-6">
                    <div className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase opacity-80 pointer-events-auto">
                        Самара · Просеки · первая линия Волги
                    </div>
                    <div className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase opacity-70 text-right pointer-events-auto">
                        2026 · Дом сдан
                    </div>
                </div>
            </div>

            {/* CENTER content — композиция перестроена в три визуальных
                «груза»: (1) tea-рубрика, (2) монолит H1 + italic subtitle,
                (3) факт-строка + CTAs. Между группами — крупный воздух. */}
            <div className="relative z-[1] min-h-[100svh] flex flex-col justify-end max-w-[1320px] mx-auto px-5 md:px-10 pb-[72px] md:pb-[96px] pt-[160px] md:pt-[200px]">
                {/* Группа 1 — tea-рубрика */}
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase text-tea mb-16 md:mb-24">
                    Клубный дом на первой линии Волги
                </p>

                {/* Группа 2 — заголовок-монолит */}
                <h1 className="font-serif text-[52px] md:text-[96px] xl:text-[120px] leading-[0.9] font-medium tracking-[-0.02em] max-w-[10ch] md:max-w-none mb-6 md:mb-8">
                    Дом <em className="not-italic md:italic">на Утёсе</em>
                </h1>
                <p className="font-serif italic text-[18px] md:text-[26px] leading-[1.3] max-w-[480px] opacity-90 mb-20 md:mb-28">
                    На одной линии с историей.
                </p>

                {/* Группа 3 — CTAs слева, factline справа на том же уровне.
                    1px paper-делитель сверху отделяет «служебную зону» от
                    лирического монолита. На mobile — стек: CTAs сверху,
                    factline подписью снизу (flex-col-reverse не используем,
                    чтобы порядок чтения совпадал с DOM). */}
                <div className="border-t border-paper/20 pt-6 md:pt-8">
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
