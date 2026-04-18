<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

/**
 * Плитка «Уклад» — одно время суток/сезон: утро, день, закат, зима.
 */
class UkladTile extends Model
{
    use AsSource, Filterable, HasFactory;

    protected $fillable = [
        'key',
        'title',
        'quote',
        'image',
        'tone',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}
