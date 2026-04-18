<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

use App\Models\UkladTile;
use Illuminate\Http\Request;
use Orchid\Screen\Fields\Matrix;
use Orchid\Support\Facades\Layout;

/**
 * Блок 09 · Уклад — 4 плитки (утро / день / закат / зима).
 *
 * Фиксированный список. Клиент редактирует цитату и картинку каждой плитки.
 * Добавлять/удалять плитки не рекомендуется — фронт рассчитывает на 4.
 */
class Block09UkladScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block09';
    }

    public function name(): ?string
    {
        return '09 · Уклад';
    }

    public function description(): ?string
    {
        return 'Четыре времени суток/сезоны: цитаты и фотографии.';
    }

    protected function extraQuery(): array
    {
        return [
            'tiles' => UkladTile::orderBy('sort_order')
                ->get(['key', 'title', 'quote', 'image', 'tone', 'sort_order'])
                ->toArray(),
        ];
    }

    protected function extraLayouts(): iterable
    {
        return [
            Layout::rows([
                Matrix::make('tiles')
                    ->title('Четыре плитки уклада')
                    ->columns([
                        'Ключ (morning/day/sunset/winter)' => 'key',
                        'Заголовок' => 'title',
                        'Цитата' => 'quote',
                        'Путь к картинке' => 'image',
                        'Тон (paper/ink)' => 'tone',
                        'Порядок' => 'sort_order',
                    ]),
            ]),
        ];
    }

    protected function onAfterSave(Request $request): void
    {
        $tiles = $request->input('tiles', []);
        if (! is_array($tiles)) {
            return;
        }

        UkladTile::query()->delete();

        $order = 10;
        foreach ($tiles as $row) {
            if (! is_array($row)) {
                continue;
            }
            $key = trim((string) ($row['key'] ?? ''));
            if ($key === '') {
                continue;
            }

            $tone = in_array($row['tone'] ?? 'paper', ['paper', 'ink'], true)
                ? $row['tone']
                : 'paper';

            UkladTile::create([
                'key' => $key,
                'title' => (string) ($row['title'] ?? ''),
                'quote' => (string) ($row['quote'] ?? ''),
                'image' => $row['image'] ?? null,
                'tone' => $tone,
                'sort_order' => (int) ($row['sort_order'] ?? $order),
            ]);

            $order += 10;
        }
    }
}
