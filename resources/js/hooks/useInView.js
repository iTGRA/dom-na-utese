import { useEffect, useRef, useState } from 'react';

/**
 * SSR-safe Intersection Observer hook.
 *
 * Возвращает { ref, inView }. Когда элемент становится видимым на
 * указанный threshold — inView становится true (и остаётся true, если
 * once=true).
 *
 * SSR: IntersectionObserver существует только в браузере — hook
 * полностью завёрнут в useEffect, так что на сервере тихо возвращает
 * inView=false и рендер идёт без анимации (reveal CSS подхватится, как
 * только hydration завершится и IO стартует).
 *
 * @param {object} [opts]
 * @param {number} [opts.threshold=0.2] — доля элемента в viewport для триггера.
 * @param {string} [opts.rootMargin='0px']
 * @param {boolean} [opts.once=true] — отключиться после первого попадания.
 */
export default function useInView({ threshold = 0.2, rootMargin = '0px', once = true } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        // Guard: старые браузеры или SSR — сразу показываем элемент
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setInView(false);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, inView };
}
