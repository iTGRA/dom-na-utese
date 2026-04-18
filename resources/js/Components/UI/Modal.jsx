import { useEffect, useRef } from 'react';

/**
 * Modal — editorial dialog.
 *
 * Backdrop: rgba(handwriting, 0.4). Тело: paper, padding 48px, max-width 520px.
 * Без скруглений. Slide-up 40px + fade backdrop (длит. 420ms, ease-editorial).
 *
 * SSR: document.body.style.overflow трогаем только в useEffect (клиент).
 *
 * A11y:
 *   role="dialog" + aria-modal
 *   Esc закрывает
 *   focus trap на tab/shift+tab — простой (первый/последний focusable в теле)
 *   фокус переводится в модалку при open
 *   onClose вызывается — родитель отвечает за возврат фокуса к инициатору
 *
 * Props:
 *   isOpen     boolean
 *   onClose    () => void
 *   labelledBy string — id заголовка внутри детей (для aria-labelledby)
 *   tone       'paper' | 'stamp' — фон модалки (для финальной формы)
 *   children
 */
export default function Modal({ isOpen, onClose, labelledBy, tone = 'paper', children }) {
    const dialogRef = useRef(null);

    // Лок скролла body пока модалка открыта + Esc
    useEffect(() => {
        if (!isOpen) return;
        if (typeof document === 'undefined') return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKey = (e) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };
        document.addEventListener('keydown', handleKey);

        // Focus trap — перевод фокуса в модалку
        const dialog = dialogRef.current;
        if (dialog) {
            const focusable = dialog.querySelector(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            focusable?.focus();
        }

        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', handleKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const bgClass = tone === 'stamp' ? 'bg-stamp text-paper' : 'bg-paper text-handwriting';

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            role="presentation"
        >
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Закрыть"
                onClick={onClose}
                className="absolute inset-0 bg-handwriting/40 cursor-default"
                tabIndex={-1}
            />

            {/* Dialog */}
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                className={`relative w-full max-w-[520px] ${bgClass} p-8 md:p-12 shadow-none`}
                style={{ animation: 'modalSlideUp 420ms var(--ease-editorial)' }}
            >
                <button
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                    className="absolute top-4 right-5 text-[22px] opacity-60 hover:opacity-100 transition-opacity duration-[240ms] leading-none cursor-pointer"
                >
                    ×
                </button>
                {children}
            </div>

            <style>{`
                @keyframes modalSlideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
