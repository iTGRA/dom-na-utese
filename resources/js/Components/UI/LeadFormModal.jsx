import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import Field from './Field';
import Button from './Button';
import { useLeadForm } from '../../hooks/useLeadForm';

/**
 * LeadFormModal — форма «Приватный показ».
 *
 * Единственная модалка с формой на всём сайте. Рендерится в Shell один раз,
 * открывается через useLeadForm() из любого CTA.
 *
 * Контракт полей — синхронизирован с StoreLeadRequest::rules:
 *   name              required string max:120
 *   phone             required string (digits/spaces/+/-/())
 *   email             nullable email
 *   preferred_contact required phone|whatsapp|telegram
 *   consent           required accepted
 *   source            required hero|built|final|lot-card|header
 *   lot_id            nullable integer 1..9
 *
 * Микрокопия — дословно из DESIGN_SYSTEM.md §15.
 */
export default function LeadFormModal() {
    const { isOpen, source, lotId, closeLeadForm } = useLeadForm();

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        phone: '',
        email: '',
        preferred_contact: 'phone',
        consent: false,
        source: source,
        lot_id: lotId,
    });

    // Синк source/lot_id, когда открывается с разных CTA
    useEffect(() => {
        setData((prev) => ({ ...prev, source, lot_id: lotId }));
        // Намеренно не добавляем setData в deps — это стабильный setter
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source, lotId, isOpen]);

    // Сброс формы и закрытие после успеха
    useEffect(() => {
        if (wasSuccessful && isOpen) {
            reset('name', 'phone', 'email');
            closeLeadForm();
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
        <Modal isOpen={isOpen} onClose={closeLeadForm} labelledBy="lead-form-title">
            <div className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase text-stamp mb-3">
                Приватный показ
            </div>
            <h2
                id="lead-form-title"
                className="font-serif text-[32px] md:text-[34px] leading-[1.15] font-medium mb-3"
            >
                Оставьте заявку.
            </h2>
            <p className="font-serif italic text-[16px] leading-[1.4] opacity-80 mb-8">
                Менеджер свяжется в течение часа, согласует время и приедет за вами.
            </p>

            <form onSubmit={submit} noValidate>
                <Field
                    label="Имя"
                    name="name"
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
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Необязательно"
                    autoComplete="email"
                    error={errors.email}
                />

                {/* preferred_contact — три чипа */}
                <div className="field">
                    <span className="field__label">Как удобно связаться?</span>
                    <div className="flex flex-wrap gap-2 mt-1" role="radiogroup" aria-label="Предпочтительный способ связи">
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
                                        'border transition-colors duration-[240ms] ease-(--ease-standard) cursor-pointer ' +
                                        (active
                                            ? 'border-stamp bg-stamp text-paper'
                                            : 'border-handwriting/30 text-handwriting hover:border-handwriting')
                                    }
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                    {errors.preferred_contact && (
                        <span className="field__error mt-2">{errors.preferred_contact}</span>
                    )}
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 mb-8 mt-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        name="consent"
                        checked={data.consent}
                        onChange={(e) => setData('consent', e.target.checked)}
                        className="mt-[6px] accent-stamp"
                    />
                    <span className="font-serif text-[14px] leading-[1.4] opacity-80">
                        Согласен на обработку персональных данных
                    </span>
                </label>
                {errors.consent && (
                    <div className="field__error -mt-6 mb-6">{errors.consent}</div>
                )}

                <Button type="submit" variant="primary" fullWidth disabled={processing}>
                    {processing ? 'Сохраняем вашу заявку…' : 'Записаться на показ'}
                </Button>
            </form>
        </Modal>
    );
}
