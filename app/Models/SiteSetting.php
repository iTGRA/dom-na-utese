<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

/**
 * Key/value-настройки сайта.
 *
 * Группы:
 *   contact — телефон, WhatsApp, Telegram, email, адрес офиса продаж
 *   legal   — юр. лицо, ИНН, ОГРН, ссылки на декларацию и privacy
 *   meta    — title / description для соцсетей, ID Я.Метрики
 *
 * Чтение — только через `SiteSetting::cached()` (массив key => value,
 * закэшировано навсегда). Изменение через SiteSettingsScreen чистит кэш.
 */
class SiteSetting extends Model
{
    use AsSource, Filterable, HasFactory;

    protected $fillable = [
        'key',
        'value',
        'group',
        'label',
        'hint',
        'input_type',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    public const CACHE_KEY = 'site_settings';

    /**
     * Плоский массив key => value, закэшированный forever.
     * Используется в HandleInertiaRequests::share() и контроллерах.
     */
    public static function cached(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, fn () => self::query()
            ->pluck('value', 'key')
            ->toArray());
    }

    /**
     * Получить значение по ключу с fallback.
     */
    public static function get(string $key, ?string $default = null): ?string
    {
        $all = self::cached();

        return $all[$key] ?? $default;
    }

    /**
     * Сбросить кэш. Вызывать из SiteSettingsScreen::save().
     */
    public static function flushCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}
