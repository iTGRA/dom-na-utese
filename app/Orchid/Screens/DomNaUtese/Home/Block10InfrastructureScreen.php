<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

use App\Models\InfrastructureCard;
use Illuminate\Http\Request;
use Orchid\Screen\Fields\Matrix;
use Orchid\Support\Facades\Layout;

/**
 * Блок 10 · Инфраструктура.
 *
 * Заголовок / подзаголовок + CRUD 6 карточек (номер, заголовок, описание).
 * Карточки правятся через Matrix — удобно для фиксированного списка.
 */
class Block10InfrastructureScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block10';
    }

    public function name(): ?string
    {
        return '10 · Инфраструктура';
    }

    public function description(): ?string
    {
        return 'Шапка блока + управление 6 карточек инфраструктуры.';
    }

    protected function extraQuery(): array
    {
        return [
            'cards' => InfrastructureCard::orderBy('sort_order')
                ->get(['number', 'title', 'description', 'sort_order'])
                ->toArray(),
        ];
    }

    protected function extraLayouts(): iterable
    {
        return [
            Layout::rows([
                Matrix::make('cards')
                    ->title('Карточки инфраструктуры')
                    ->columns([
                        'Номер' => 'number',
                        'Заголовок' => 'title',
                        'Описание' => 'description',
                        'Порядок' => 'sort_order',
                    ]),
            ]),
        ];
    }

    protected function onAfterSave(Request $request): void
    {
        $cards = $request->input('cards', []);

        if (! is_array($cards)) {
            return;
        }

        // Полная пересинхронизация списка: удаляем старое, вставляем новое.
        InfrastructureCard::query()->delete();

        $order = 10;
        foreach ($cards as $row) {
            if (! is_array($row)) {
                continue;
            }
            $number = trim((string) ($row['number'] ?? ''));
            $title = trim((string) ($row['title'] ?? ''));
            $description = trim((string) ($row['description'] ?? ''));

            if ($number === '' && $title === '') {
                continue;
            }

            InfrastructureCard::create([
                'number' => $number,
                'title' => $title,
                'description' => $description,
                'sort_order' => (int) ($row['sort_order'] ?? $order),
            ]);

            $order += 10;
        }
    }
}
