<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Neighbor;

use App\Models\Neighbor;
use Orchid\Screen\Action;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Components\Cells\DateTimeSplit;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;

/**
 * Список 14 исторических объектов волжского берега.
 *
 * Сортировка по `sort_order`. Звёздочка — признак featured: один
 * объект, который отображается в блоке 05 Dacha.jsx на главной.
 */
class NeighborListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'neighbors' => Neighbor::orderBy('sort_order')->paginate(30),
        ];
    }

    public function name(): ?string
    {
        return 'Соседи по берегу';
    }

    public function description(): ?string
    {
        return 'Справочник 14 исторических объектов волжского берега.';
    }

    /**
     * @return Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Link::make('Добавить объект')
                ->icon('bs.plus-circle')
                ->route('platform.dnu.neighbors.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('neighbors', [
                TD::make('sort_order', '№')
                    ->sort()
                    ->align(TD::ALIGN_CENTER)
                    ->width('60px'),

                TD::make('title', 'Название')
                    ->render(fn (Neighbor $n) => Link::make($n->title)
                        ->route('platform.dnu.neighbors.edit', $n->id)),

                TD::make('date_label', 'Годы'),

                TD::make('tag', 'Категория')
                    ->render(function (Neighbor $n) {
                        [$label, $color] = match ($n->tag) {
                            'federal' => ['Федеральный памятник', Color::DANGER],
                            'regional' => ['Региональный', Color::WARNING],
                            'preserved' => ['Сохранился', Color::SUCCESS],
                            'lost' => ['Утрачен', Color::DARK],
                            default => ['Иное', Color::INFO],
                        };

                        return "<span class=\"badge bg-{$color->value}\">{$label}</span>";
                    }),

                TD::make('featured', 'На главной')
                    ->align(TD::ALIGN_CENTER)
                    ->render(fn (Neighbor $n) => $n->featured
                        ? '<span title="Отображается в блоке Дача со Слонами на главной">★</span>'
                        : ''),

                TD::make('updated_at', 'Обновлён')
                    ->usingComponent(DateTimeSplit::class)
                    ->align(TD::ALIGN_RIGHT)
                    ->sort(),
            ]),
        ];
    }
}
