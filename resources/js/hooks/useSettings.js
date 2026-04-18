import { usePage } from '@inertiajs/react';

/**
 * useSettings — читает весь словарь контент-настроек, разшаренных
 * Inertia middleware (HandleInertiaRequests::share → 'settings').
 *
 * Ключи имеют вид `{group}.{field}` — например `block01.kicker`,
 * `block06.materials_list`, `contacts.phone`. Возвращает всегда объект,
 * даже если shared-data пустой (на случай изолированных тестов).
 *
 * @returns {Record<string, string|null>}
 */
export function useSettings() {
    const page = usePage();
    return (page && page.props && page.props.settings) || {};
}

/**
 * useSetting — безопасное чтение одного ключа с fallback.
 * Считает null / undefined / пустую строку отсутствующим значением —
 * в этом случае возвращает fallback. Это даёт «хардкод = дефолт»:
 * редактор в админке удаляет значение → сайт возвращается к исходному
 * тексту из кода, не ломается и не показывает пустоту.
 *
 * @param {string} key       — ключ в формате `{group}.{field}`
 * @param {string} [fallback] — дефолтное значение, если ключа нет
 * @returns {string}
 */
export function useSetting(key, fallback = '') {
    const settings = useSettings();
    const value = settings[key];
    if (value === null || value === undefined || value === '') {
        return fallback;
    }
    return value;
}
