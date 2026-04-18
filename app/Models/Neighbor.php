<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

/**
 * Сосед по берегу — исторический объект волжской линии просек.
 *
 * Полный справочник 14 объектов рендерится на /shore (Shore.jsx).
 * Один объект с `featured=true` — «Дача со Слонами» — используется
 * в блоке 05 Dacha.jsx главной страницы.
 *
 * `tag` — категория сохранности:
 *   federal   — Объект культурного наследия федерального значения
 *   regional  — Региональный памятник архитектуры
 *   preserved — сохранилась, но без формального охранного статуса
 *   lost      — утрачена
 *   other     — иное / требует уточнения
 */
class Neighbor extends Model
{
    use AsSource, Attachable, Filterable, HasFactory;

    protected $fillable = [
        'title',
        'owner',
        'date_label',
        'year',
        'address',
        'style',
        'status_label',
        'tag',
        'description',
        'short_description',
        'image',
        'featured',
        'sort_order',
    ];

    protected $casts = [
        'year' => 'integer',
        'featured' => 'boolean',
        'sort_order' => 'integer',
    ];
}
