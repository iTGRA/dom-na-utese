import Button from '../UI/Button';
import { useLeadForm } from '../../hooks/useLeadForm';

/**
 * Блок 11 — Дом построен.
 *
 * Главный триггер срочности в сегменте. Full-bleed живое фото,
 * ink тон, tea акцент. Второй главный CTA сайта — «Записаться на показ».
 *
 * Текст — дословно из dom-na-utese-brief.txt §БЛОК 11.
 */
export default function Built() {
    const { openLeadForm } = useLeadForm();
    return (
        <section
            id="built"
            className="snap-slide relative bg-ink text-paper overflow-hidden"
            style={{ minHeight: '100svh' }}
        >
            {/* Full-bleed фото */}
            <img
                src="/images/visual/26.jpg"
                alt="Готовый дом на утёсе. Фасад, сданный в 2024 году."
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />

            <div className="relative z-[1] min-h-[100svh] flex flex-col justify-end max-w-[1320px] mx-auto px-5 md:px-10 py-rhythm-xl md:py-rhythm-xl-md">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-tea mb-rhythm-sm md:mb-rhythm-sm-md">
                    11 · Доказательства
                </p>
                <h2 className="font-serif text-[42px] md:text-[84px] xl:text-[110px] leading-[0.95] font-medium tracking-[-0.02em] mb-rhythm-sm md:mb-rhythm-sm-md max-w-[10ch]">
                    Дом <em className="text-tea">построен</em>.
                </h2>
                <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.35] opacity-90 mb-rhythm-md md:mb-rhythm-md-md max-w-[32ch]">
                    Приезжайте посмотреть своими глазами.
                </p>
                <p className="font-serif text-[15px] md:text-[17px] leading-[1.65] opacity-85 max-w-[600px] mb-rhythm-md md:mb-rhythm-md-md">
                    Мы не показываем рендеры и планы реализации. Дом стоит на своём месте.
                    На приватном показе вы увидите реальные виды из окон, пройдёте по
                    настоящим квартирам, подниметесь на террасы.
                </p>
                <div>
                    <Button
                        variant="on-ink"
                        onClick={() => openLeadForm({ source: 'built' })}
                    >
                        Записаться на показ
                    </Button>
                </div>
            </div>
        </section>
    );
}
