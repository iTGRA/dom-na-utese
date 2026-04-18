<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

/**
 * Лот — один из 9 квартир клубного дома.
 *
 * Используется:
 *   - HomeController::index — отдаёт props.lots в блок 08 Plans.jsx
 *   - LotListScreen / LotEditScreen — CRUD в админке
 *
 * Поля площади — строковые, чтобы сохранить форматирование клиента
 * («~180 м²», «160–180 м²»). Planирующие изменения сортировки правятся
 * через поле sort_order.
 */
class Lot extends Model
{
    use AsSource, Attachable, Filterable, HasFactory;

    protected $fillable = [
        'number',
        'floor',
        'area_total',
        'area_apartment',
        'area_summer_terrace',
        'area_balcony_terrace',
        'view',
        'status',
        'plan_image',
        'description',
        'sort_order',
    ];

    protected $casts = [
        'floor' => 'integer',
        'sort_order' => 'integer',
    ];
}
