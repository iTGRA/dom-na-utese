import Button from '../UI/Button';
import { useLeadForm } from '../../hooks/useLeadForm';
import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 11 — Дом построен.
 *
 * Главный триггер срочности в сегменте. Full-bleed живое фото,
 * ink тон, tea акцент. Второй главный CTA сайта.
 *
 * Тексты редактируются через Orchid (Home → Block 11). H2 содержит
 * акцент «<em class="text-tea">построен</em>» — чтобы редактор мог его
 * выделить, разнесли на два ключа: `h2` (префикс) + специально
 * осмысленного italic-хвоста нет, держим просто точку.
 * В первой итерации фазы 2 акцентируем слово «построен» хардкодом внутри
 * h2, чтобы не ломать editorial-контраст.
 */
export default function Built() {
    const { openLeadForm } = useLeadForm();

    const rubric = useSetting('block11.rubric', '11 · Доказательства');
    const h2 = useSetting('block11.h2', 'Дом построен.');
    const body = useSetting(
        'block11.body',
        'Мы не показываем рендеры и планы реализации. Дом стоит на своём месте. На приватном показе вы увидите реальные виды из окон, пройдёте по настоящим квартирам, подниметесь на террасы.'
    );
    const ctaLabel = useSetting('block11.cta_label', 'Записаться на показ');
    const image = useSetting('block11.image', '/images/visual/26.jpg');

    // В оригинале h2 был разорван на «Дом» + tea-«построен». Чтобы сохранить
    // tea-акцент и при этом дать редактору свободу — выкидываем последнее
    // слово из h2 и подкрашиваем его в tea. Если точка рядом — она живёт
    // рядом с акцентированным словом.
    const match = h2.match(/^(.+?\s)(\S+?)([.!?…]*)\s*$/);
    let before = h2;
    let accent = '';
    let tail = '';
    if (match) {
        before = match[1];
        accent = match[2];
        tail = match[3];
    }

    const subtitle = 'Приезжайте посмотреть своими глазами.';

    return (
        <section
            id="built"
            className="snap-slide relative bg-ink text-paper overflow-hidden"
            style={{ minHeight: '100svh' }}
        >
            <img
                src={image}
                alt="Готовый дом на утёсе. Фасад, сданный в 2024 году."
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />

            <div className="relative z-[1] min-h-[100svh] flex flex-col justify-end max-w-[1320px] mx-auto px-5 md:px-10 py-rhythm-xl md:py-rhythm-xl-md">
                <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-tea mb-rhythm-sm md:mb-rhythm-sm-md">
                    {rubric}
                </p>
                <h2 className="font-serif text-[42px] md:text-[84px] xl:text-[110px] leading-[0.95] font-medium tracking-[-0.02em] mb-rhythm-sm md:mb-rhythm-sm-md max-w-[10ch]">
                    {accent ? (
                        <>
                            {before}
                            <em className="text-tea">{accent}</em>
                            {tail}
                        </>
                    ) : (
                        h2
                    )}
                </h2>
                <p className="font-serif italic text-[17px] md:text-[24px] leading-[1.35] opacity-90 mb-rhythm-md md:mb-rhythm-md-md max-w-[32ch]">
                    {subtitle}
                </p>
                <p className="font-serif text-[15px] md:text-[17px] leading-[1.65] opacity-85 max-w-[600px] mb-rhythm-md md:mb-rhythm-md-md">
                    {body}
                </p>
                <div>
                    <Button
                        variant="on-ink"
                        onClick={() => openLeadForm({ source: 'built' })}
                    >
                        {ctaLabel}
                    </Button>
                </div>
            </div>
        </section>
    );
}
