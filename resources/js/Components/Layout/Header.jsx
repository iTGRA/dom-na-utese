import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import { useLeadForm } from '../../hooks/useLeadForm';

/**
 * Header — sticky editorial navigation.
 *
 * Desktop: logo слева, 4 якорные ссылки (МЕСТО · АРХИТЕКТУРА · ЛОТ · ТЕАМ) —
 * Alegreya SC uppercase, 11px — + CTA «Приватный показ» компактно справа.
 * Mobile: logo + компактный CTA «Показ» + бургер.
 *
 * 1px handwriting линия снизу — editorial divider.
 *
 * SSR: window scrollY читаем только в useEffect.
 */
export default function Header() {
    const { openLeadForm } = useLeadForm();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Закрывать меню при открытии формы
    useEffect(() => {
        if (menuOpen && typeof document !== 'undefined') {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [menuOpen]);

    const navItems = [
        { href: '#place', label: 'Место' },
        { href: '#architecture', label: 'Архитектура' },
        { href: '#lot', label: 'Лот' },
        { href: '#uklad', label: 'Уклад' },
    ];

    return (
        <>
            <header
                className={
                    'sticky top-0 left-0 right-0 z-[100] bg-paper ' +
                    'border-b border-handwriting/15 ' +
                    'transition-shadow duration-[240ms] ' +
                    (scrolled ? 'shadow-[0_1px_0_0_rgba(30,30,30,0.08)]' : '')
                }
            >
                <div className="max-w-[1320px] mx-auto px-5 md:px-10 h-[52px] md:h-16 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <a
                        href="/"
                        className="font-sans text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase text-handwriting"
                    >
                        Дом на&nbsp;Утёсе
                    </a>

                    {/* Desktop nav */}
                    <nav aria-label="Разделы страницы" className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-handwriting/80 hover:text-stamp transition-colors duration-[240ms]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* CTA + mobile toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => openLeadForm({ source: 'header' })}
                            className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase bg-stamp text-paper px-3 py-[8px] md:px-5 md:py-[10px] hover:bg-stamp-hover transition-colors duration-[240ms]"
                        >
                            <span className="hidden md:inline">Приватный показ</span>
                            <span className="md:hidden">Показ</span>
                        </button>
                        <button
                            type="button"
                            aria-expanded={menuOpen}
                            aria-label="Открыть меню"
                            onClick={() => setMenuOpen((v) => !v)}
                            className="md:hidden font-sans text-[18px] text-handwriting px-1"
                        >
                            {menuOpen ? '×' : '≡'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile fullscreen menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-[999] bg-ink text-paper md:hidden flex flex-col">
                    <div className="h-[52px] flex items-center justify-between px-5 border-b border-paper/15">
                        <span className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase">
                            Меню
                        </span>
                        <button
                            type="button"
                            aria-label="Закрыть меню"
                            onClick={() => setMenuOpen(false)}
                            className="text-[22px] leading-none"
                        >
                            ×
                        </button>
                    </div>
                    <nav
                        aria-label="Разделы страницы"
                        className="flex-1 flex flex-col justify-center px-5 gap-6"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="font-serif text-[32px] leading-[1.3] text-paper"
                            >
                                {item.label}
                            </a>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                openLeadForm({ source: 'header' });
                            }}
                            className="font-serif italic text-[32px] leading-[1.3] text-tea text-left"
                        >
                            Приватный показ
                        </button>
                    </nav>
                    <div className="px-5 py-6 border-t border-paper/15 opacity-70">
                        <p className="font-sans text-[10px] font-bold tracking-[0.12em] uppercase">
                            Самара · Просеки · первая линия Волги
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
