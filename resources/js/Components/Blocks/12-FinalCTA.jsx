import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Field from '../UI/Field';
import Button from '../UI/Button';
import { useSetting } from '../../hooks/useSettings';

/**
 * Блок 12 — Финальный CTA.
 *
 * Stamp фон, форма inline. Контакты строкой ниже. Тексты редактируются
 * через Orchid (Home → Block 12). Контакты (телефон/whatsapp/telegram/email)
 * живут в `contacts.*` site-settings — эту фазу не трогаем, держим старые
 * ссылки-заглушки.
 */
export default function FinalCTA() {
    const rubric = useSetting('block12.rubric', '12 · Приватный показ');
    const h2 = useSetting('block12.h2', 'Приватный показ');
    const body = useSetting(
        'block12.body',
        'Оставьте заявку — менеджер свяжется, согласует время и приедет за вами.'
    );
    const submitLabel = useSetting('block12.form_submit_label', 'Записаться');
    const privacyNote = useSetting('block12.privacy_note', 'Согласен на обработку персональных данных');

    const subtitle = 'Мы показываем дом лично.';

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        phone: '',
        email: '',
        preferred_contact: 'phone',
        consent: false,
        source: 'final',
        lot_id: null,
    });

    useEffect(() => {
        if (wasSuccessful) {
            reset('name', 'phone', 'email');
            setData('consent', false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();
        post('/api/lead', {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const contactOptions = [
        { key: 'phone', label: 'Звонок' },
        { key: 'whatsapp', label: 'WhatsApp' },
        { key: 'telegram', label: 'Telegram' },
    ];

    return (
        <section
            id="final-cta"
            className="snap-slide bg-stamp text-paper py-rhythm-xl md:py-rhythm-xl-md"
        >
            <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                {/* Левая колонка */}
                <div className="md:col-span-7">
                    <p className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-paper/80 mb-rhythm-sm md:mb-rhythm-sm-md">
                        {rubric}
                    </p>
                    <h2 className="font-serif text-[42px] md:text-[72px] xl:text-[84px] leading-[0.98] font-medium tracking-[-0.02em] mb-rhythm-sm md:mb-rhythm-sm-md max-w-[14ch]">
                        {h2}
                    </h2>
                    <p className="font-serif italic text-[17px] md:text-[22px] leading-[1.3] opacity-90 mb-rhythm-md md:mb-rhythm-md-md max-w-[38ch]">
                        {subtitle}
                    </p>
                    <p className="font-serif text-[15px] md:text-[17px] leading-[1.65] max-w-[500px] mb-rhythm-md md:mb-rhythm-md-md opacity-95">
                        {body}
                    </p>

                    <div className="border-t border-paper/25 pt-rhythm-md md:pt-rhythm-md-md mt-rhythm-md md:mt-rhythm-md-md">
                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-paper/70 mb-rhythm-sm md:mb-rhythm-sm-md">
                            Или напрямую
                        </p>
                        <ul className="grid grid-cols-2 gap-y-3 font-serif text-[15px] md:text-[17px] leading-[1.4]">
                            <li><a href="tel:+70000000000" className="link-underline">Телефон</a></li>
                            <li><a href="https://wa.me/" target="_blank" rel="noopener" className="link-underline">WhatsApp</a></li>
                            <li><a href="https://t.me/" target="_blank" rel="noopener" className="link-underline">Telegram</a></li>
                            <li><a href="mailto:info@dom-na-utese.ru" className="link-underline">info@dom-na-utese.ru</a></li>
                        </ul>
                        <p className="mt-6 font-sans text-[10px] font-bold tracking-[0.1em] uppercase text-paper/70">
                            Адрес офиса продаж · Самара, Волжский проспект
                        </p>
                    </div>
                </div>

                {/* Правая колонка — форма */}
                <div className="md:col-span-5">
                    <form onSubmit={submit} noValidate className="bg-stamp/0">
                        <Field
                            label="Имя"
                            name="name"
                            tone="stamp"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ваше имя"
                            autoComplete="name"
                            error={errors.name}
                            required
                        />
                        <Field
                            label="Телефон"
                            name="phone"
                            type="tel"
                            tone="stamp"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="+7"
                            autoComplete="tel"
                            error={errors.phone}
                            required
                        />
                        <Field
                            label="E-mail"
                            name="email"
                            type="email"
                            tone="stamp"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Необязательно"
                            autoComplete="email"
                            error={errors.email}
                        />

                        <div className="field">
                            <span className="field__label text-paper opacity-80">
                                Как удобно связаться?
                            </span>
                            <div className="flex flex-wrap gap-2 mt-1" role="radiogroup">
                                {contactOptions.map((opt) => {
                                    const active = data.preferred_contact === opt.key;
                                    return (
                                        <button
                                            type="button"
                                            key={opt.key}
                                            role="radio"
                                            aria-checked={active}
                                            onClick={() => setData('preferred_contact', opt.key)}
                                            className={
                                                'px-3 py-[6px] text-[10px] font-sans font-bold tracking-[0.12em] uppercase ' +
                                                'border transition-colors duration-[240ms] cursor-pointer ' +
                                                (active
                                                    ? 'border-paper bg-paper text-stamp'
                                                    : 'border-paper/40 text-paper hover:border-paper')
                                            }
                                        >
                                            {opt.label}
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.preferred_contact && (
                                <span className="field__error mt-2">
                                    {errors.preferred_contact}
                                </span>
                            )}
                        </div>

                        <label className="flex items-start gap-3 mb-8 mt-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={data.consent}
                                onChange={(e) => setData('consent', e.target.checked)}
                                className="mt-[6px] accent-paper"
                            />
                            <span className="font-serif text-[14px] leading-[1.4] opacity-90">
                                {privacyNote}
                            </span>
                        </label>
                        {errors.consent && (
                            <div className="field__error -mt-6 mb-4">{errors.consent}</div>
                        )}

                        <Button variant="on-ink" type="submit" fullWidth disabled={processing}>
                            {processing ? 'Сохраняем вашу заявку…' : submitLabel}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
