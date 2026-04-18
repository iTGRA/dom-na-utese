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

            {/* Corners */}
            {/* TOP-LEFT: rubric */}
            <div className="absolute top-[24px] left-5 md:top-[40px] md:left-10 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase opacity-80">
                Самара · Просеки · первая линия Волги
            </div>
            {/* TOP-RIGHT: meta line */}
            <div className="absolute top-[24px] right-5 md:top-[40px] md:right-10 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase opacity-70 text-right">
                2024 · Дом сдан
            </div>

            {/* CENTER content */}
            <div className="relative z-[1] min-h-[100svh] flex flex-col justify-end max-w-[1320px] mx-auto px-5 md:px-10 pb-[96px] md:pb-[120px] pt-[120px]">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-tea mb-5 md:mb-6">
                    Клубный дом на первой линии Волги
                </p>
                <h1 className="font-serif text-[52px] md:text-[96px] xl:text-[110px] leading-[0.92] font-medium tracking-[-0.02em] max-w-[10ch] md:max-w-none mb-6 md:mb-8">
                    Дом <em className="not-italic md:italic">на Утёсе</em>
                </h1>
                <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.3] max-w-[480px] opacity-90 mb-10 md:mb-14">
                    На одной линии с историей.
                </p>

                {/* Факты — тонкая строка */}
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase opacity-75 mb-10 md:mb-12">
                    9 лотов
                    <span className="mx-2 text-tea">·</span>
                    первая линия Волги
                    <span className="mx-2 text-tea">·</span>
                    потолки 3,5–4 м
                    <span className="mx-2 text-tea">·</span>
                    дом сдан
                </p>

                {/* CTAs */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
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
            </div>
        </section>
    );
}
