<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

use App\Models\LotFeature;
use Illuminate\Http\Request;
use Orchid\Screen\Fields\Matrix;
use Orchid\Support\Facades\Layout;

/**
 * Блок 07 · Лот — состав лота.
 * Тексты блока + CRUD строк состава (5 штук: Квартира, Террасы, Паркинг, Кладовая).
 */
class Block07LotScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block07';
    }

    public function name(): ?string
    {
        return '07 · Лот (состав)';
    }

    public function description(): ?string
    {
        return 'Текст блока и строки состава лота — что входит в каждый из девяти комплектов.';
    }

    protected function extraQuery(): array
    {
        return [
            'features' => LotFeature::orderBy('sort_order')
                ->get(['title', 'description', 'sort_order'])
                ->toArray(),
        ];
    }

    protected function extraLayouts(): iterable
    {
        return [
            Layout::rows([
                Matrix::make('features')
                    ->title('Строки состава лота')
                    ->columns([
                        'Что' => 'title',
                        'Описание' => 'description',
                        'Порядок' => 'sort_order',
                    ]),
            ]),
        ];
    }

    protected function onAfterSave(Request $request): void
    {
        $features = $request->input('features', []);
        if (! is_array($features)) {
            return;
        }

        LotFeature::query()->delete();

        $order = 10;
        foreach ($features as $row) {
            if (! is_array($row)) {
                continue;
            }
            $title = trim((string) ($row['title'] ?? ''));
            if ($title === '') {
                continue;
            }

            LotFeature::create([
                'title' => $title,
                'description' => (string) ($row['description'] ?? ''),
                'sort_order' => (int) ($row['sort_order'] ?? $order),
            ]);

            $order += 10;
        }
    }
}
