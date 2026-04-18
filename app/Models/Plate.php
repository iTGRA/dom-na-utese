<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

/**
 * Архитектурная пластина (фото + подпись) для блоков 06, 06B, 06C.
 *
 * block:   arch | interior | courtyard
 * number:  плашка «Pl. XX» — editorial-маркер в углу фото
 * tone:    light (для paper-фона) или dark (для ink full-bleed)
 */
class Plate extends Model
{
    use AsSource, Filterable, HasFactory;

    protected $fillable = [
        'block',
        'number',
        'image',
        'caption',
        'alt',
        'tone',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}
