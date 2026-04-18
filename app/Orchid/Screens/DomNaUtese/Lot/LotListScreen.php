<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Lot;

use App\Models\Lot;
use Orchid\Screen\Action;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Actions\Menu;
use Orchid\Screen\Components\Cells\DateTimeSplit;
use Orchid\Screen\Layouts\Table;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;

/**
 * Список всех девяти лотов клубного дома.
 *
 * Редко меняющийся набор — но статусы (доступен / в резерве / продан)
 * контент-менеджер двигает после каждой новой брони. Строка ведёт
 * на LotEditScreen.
 */
class LotListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'lots' => Lot::orderBy('sort_order')->paginate(20),
        ];
    }

    public function name(): ?string
    {
        return 'Лоты';
    }

    public function description(): ?string
    {
        return 'Девять квартир клубного дома. Статус лота сразу виден на сайте.';
    }

    /**
     * @return Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Link::make('Добавить лот')
                ->icon('bs.plus-circle')
                ->route('platform.dnu.lots.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('lots', [
                TD::make('number', 'Номер')
                    ->sort()
                    ->render(fn (Lot $lot) => Link::make($lot->number)
                        ->route('platform.dnu.lots.edit', $lot->id)),

                TD::make('floor', 'Этаж')
                    ->sort()
                    ->align(TD::ALIGN_CENTER),

                TD::make('area_total', 'Общая площадь'),

                TD::make('view', 'Видовая сторона'),

                TD::make('status', 'Статус')
                    ->render(function (Lot $lot) {
                        [$label, $color] = match ($lot->status) {
                            'available' => ['Доступен', Color::SUCCESS],
                            'reserved' => ['В резерве', Color::WARNING],
                            'sold' => ['Продан', Color::DARK],
                            default => [$lot->status, Color::INFO],
                        };

                        return "<span class=\"badge bg-{$color->value}\">{$label}</span>";
                    }),

                TD::make('sort_order', 'Порядок')
                    ->sort()
                    ->align(TD::ALIGN_CENTER),

                TD::make('updated_at', 'Обновлён')
                    ->usingComponent(DateTimeSplit::class)
                    ->align(TD::ALIGN_RIGHT)
                    ->sort(),
            ]),
        ];
    }
}
