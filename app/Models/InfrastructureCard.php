<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

/**
 * Карточка инфраструктуры для блока 10. Без иконок — только номер,
 * заголовок, описание «о смысле».
 */
class InfrastructureCard extends Model
{
    use AsSource, Filterable, HasFactory;

    protected $fillable = [
        'number',
        'title',
        'description',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}
