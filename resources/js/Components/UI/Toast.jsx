import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

/**
 * Toast — editorial notification.
 *
 * Слушает `flash.success` / `flash.error` из Inertia shared props
 * (см. app/Http/Middleware/HandleInertiaRequests.php::share).
 * Показывает один toast, автозакрытие через 6000ms.
 *
 * SSR: рендерим null на сервере — не смешиваем с hydration. На клиенте
 * после mount подхватываем flash-prop.
 */
export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState('success');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (flash?.success) {
            setMode('success');
            setMessage(flash.success);
            setVisible(true);
        } else if (flash?.error) {
            setMode('error');
            setMessage(flash.error);
            setVisible(true);
        }
    }, [flash?.success, flash?.error]);

    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(() => setVisible(false), 6000);
        return () => clearTimeout(t);
    }, [visible]);

    if (!visible) return null;

    const styles =
        mode === 'success'
            ? 'bg-handwriting text-paper'
            : 'bg-paper-deep text-handwriting border-l-[3px] border-error';

    return (
        <div
            role="status"
            aria-live="polite"
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[1500] ${styles} px-6 py-4 max-w-[420px] font-serif text-[15px] leading-snug shadow-none`}
        >
            <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Закрыть"
                className="ml-4 float-right opacity-60 hover:opacity-100 leading-none"
            >
                ×
            </button>
            <span className="inline-block pr-6">
                {mode === 'success' && <span className="text-tea mr-2" aria-hidden="true">✓</span>}
                {mode === 'error' && <span className="text-error mr-2" aria-hidden="true">!</span>}
                {message}
            </span>
        </div>
    );
}
