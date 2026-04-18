<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

/**
 * Посев настроек сайта с пустыми value и понятными label/hint.
 *
 * Пустые значения — это фича: Footer и meta-теги при пустом value
 * остаются на plaintext-фолбэках, клиент заполняет их через /admin/settings.
 *
 * Исключение: meta.og_title и meta.og_description — содержат дефолты из
 * BRIEF.md, чтобы сайт стартовал с разумными социальными превью.
 */
class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // === Контакты ===
            [
                'key' => 'contact.phone',
                'group' => 'contact',
                'label' => 'Телефон',
                'hint' => 'Формат: +7 (XXX) XXX-XX-XX',
                'input_type' => 'text',
                'sort_order' => 10,
            ],
            [
                'key' => 'contact.whatsapp',
                'group' => 'contact',
                'label' => 'WhatsApp',
                'hint' => 'Номер без знака «плюс» — например, 79161234567',
                'input_type' => 'text',
                'sort_order' => 20,
            ],
            [
                'key' => 'contact.telegram',
                'group' => 'contact',
                'label' => 'Telegram (username)',
                'hint' => 'Без «собаки»: dom_na_utese',
                'input_type' => 'text',
                'sort_order' => 30,
            ],
            [
                'key' => 'contact.email',
                'group' => 'contact',
                'label' => 'Email',
                'hint' => 'Куда писать гостям: info@dom-na-utese.ru',
                'input_type' => 'email',
                'sort_order' => 40,
            ],
            [
                'key' => 'contact.office_address',
                'group' => 'contact',
                'label' => 'Адрес офиса продаж',
                'hint' => 'Полный адрес, как его увидит клиент в футере',
                'input_type' => 'textarea',
                'sort_order' => 50,
            ],

            // === Юридическое ===
            [
                'key' => 'legal.entity_name',
                'group' => 'legal',
                'label' => 'Юридическое лицо',
                'hint' => 'Например: ООО «Дом на Утёсе» или ИП Иванов И.И.',
                'input_type' => 'text',
                'sort_order' => 10,
            ],
            [
                'key' => 'legal.inn',
                'group' => 'legal',
                'label' => 'ИНН',
                'hint' => '10 или 12 цифр',
                'input_type' => 'text',
                'sort_order' => 20,
            ],
            [
                'key' => 'legal.ogrn',
                'group' => 'legal',
                'label' => 'ОГРН',
                'hint' => '13 или 15 цифр',
                'input_type' => 'text',
                'sort_order' => 30,
            ],
            [
                'key' => 'legal.declaration_url',
                'group' => 'legal',
                'label' => 'Проектная декларация',
                'hint' => 'Ссылка на наш.дом.рф',
                'input_type' => 'url',
                'sort_order' => 40,
            ],
            [
                'key' => 'legal.privacy_url',
                'group' => 'legal',
                'label' => 'Политика конфиденциальности',
                'hint' => 'Ссылка на PDF или страницу политики',
                'input_type' => 'url',
                'sort_order' => 50,
            ],

            // === Мета и аналитика ===
            [
                'key' => 'meta.og_title',
                'value' => 'Дом на Утёсе — клубный дом на первой линии Волги',
                'group' => 'meta',
                'label' => 'Title для соцсетей',
                'hint' => 'Заголовок при шаринге ссылки в мессенджерах и соцсетях',
                'input_type' => 'text',
                'sort_order' => 10,
            ],
            [
                'key' => 'meta.og_description',
                'value' => 'Девять лотов на волжском утёсе на Просеках. Дом сдан в 2024. Потолки 3,5–4 м, панорамное остекление, подземный паркинг, управляющая компания. Приватный показ по записи.',
                'group' => 'meta',
                'label' => 'Описание для соцсетей',
                'hint' => '1–2 предложения. Попадает в превью при шаринге.',
                'input_type' => 'textarea',
                'sort_order' => 20,
            ],
            [
                'key' => 'meta.analytics_yandex',
                'group' => 'meta',
                'label' => 'ID счётчика Яндекс.Метрики',
                'hint' => 'Только цифры — например, 98765432',
                'input_type' => 'text',
                'sort_order' => 30,
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                array_merge(['value' => null], $setting)
            );
        }

        SiteSetting::flushCache();
    }
}
