/**
 * Button — единственная кнопочная абстракция сайта.
 *
 * Варианты (см. DESIGN_SYSTEM.md §5.1):
 *   primary       фон stamp, текст paper — главный CTA «Приватный показ»
 *   secondary     transparent, 1px handwriting — вспомогательные действия
 *   on-ink        фон paper, текст stamp — кнопка на ночных блоках (05, 11)
 *   ghost-on-ink  transparent, 1px paper — вторая кнопка на ночных блоках
 *
 * Стрелка ».btn__arrow" — обязательна на primary CTA, translateX(4px) на hover.
 *
 * Без скруглений, без box-shadow. Editorial строгость.
 *
 * Props:
 *   variant     'primary' | 'secondary' | 'on-ink' | 'ghost-on-ink' (default 'primary')
 *   as          'button' | 'a' (default 'button')
 *   arrow       boolean — показать ' →' (default true для primary, false для остальных)
 *   fullWidth   boolean
 */
export default function Button({
    children,
    variant = 'primary',
    as = 'button',
    arrow,
    fullWidth = false,
    className = '',
    ...rest
}) {
    const showArrow = arrow ?? variant === 'primary';

    const baseClasses =
        'group inline-flex items-center justify-center gap-2 font-sans font-bold ' +
        'tracking-[0.1em] uppercase text-[13px] px-7 py-[14px] ' +
        'transition-all duration-[240ms] ease-(--ease-standard) ' +
        'border border-transparent cursor-pointer select-none ' +
        'disabled:opacity-40 disabled:cursor-not-allowed ' +
        'active:translate-y-0 active:brightness-95';

    const variantClasses = {
        primary:
            'bg-stamp text-paper hover:bg-stamp-hover hover:-translate-y-[1px]',
        secondary:
            'bg-transparent text-handwriting border-handwriting ' +
            'hover:bg-handwriting hover:text-paper',
        'on-ink':
            'bg-paper text-stamp hover:bg-tea hover:text-handwriting',
        'ghost-on-ink':
            'bg-transparent text-paper border-paper ' +
            'hover:bg-paper hover:text-ink',
    }[variant];

    const widthClass = fullWidth ? 'w-full' : '';

    const Tag = as;

    return (
        <Tag className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`} {...rest}>
            <span>{children}</span>
            {showArrow && (
                <span
                    aria-hidden="true"
                    className="btn__arrow inline-block transition-transform duration-[240ms] ease-(--ease-standard) group-hover:translate-x-1"
                >
                    →
                </span>
            )}
        </Tag>
    );
}
