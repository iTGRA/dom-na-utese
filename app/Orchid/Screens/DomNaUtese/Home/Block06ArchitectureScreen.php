<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Home;

use App\Models\Plate;
use Illuminate\Http\Request;
use Orchid\Screen\Fields\Matrix;
use Orchid\Support\Facades\Layout;

/**
 * Блок 06 · Архитектура — экстерьер.
 *
 * Тексты блока + CRUD архитектурных пластин (block=arch).
 */
class Block06ArchitectureScreen extends AbstractBlockScreen
{
    protected function groupKey(): string
    {
        return 'block06';
    }

    protected function plateBlockKey(): string
    {
        return 'arch';
    }

    public function name(): ?string
    {
        return '06 · Архитектура (экстерьер)';
    }

    public function description(): ?string
    {
        return 'Тексты блока и управление фотопластинами Pl. 01–10.';
    }

    protected function extraQuery(): array
    {
        return [
            'plates' => Plate::where('block', $this->plateBlockKey())
                ->orderBy('sort_order')
                ->get(['number', 'image', 'caption', 'alt', 'tone', 'sort_order'])
                ->toArray(),
        ];
    }

    protected function extraLayouts(): iterable
    {
        return [
            Layout::rows([
                Matrix::make('plates')
                    ->title('Фотопластины блока')
                    ->columns([
                        'Номер (Pl.)' => 'number',
                        'Путь к картинке' => 'image',
                        'Подпись' => 'caption',
                        'Alt (для доступности)' => 'alt',
                        'Тон (light/dark)' => 'tone',
                        'Порядок' => 'sort_order',
                    ]),
            ]),
        ];
    }

    protected function onAfterSave(Request $request): void
    {
        $plates = $request->input('plates', []);

        if (! is_array($plates)) {
            return;
        }

        Plate::where('block', $this->plateBlockKey())->delete();

        $order = 10;
        foreach ($plates as $row) {
            if (! is_array($row)) {
                continue;
            }
            $number = trim((string) ($row['number'] ?? ''));
            if ($number === '') {
                continue;
            }

            $tone = in_array($row['tone'] ?? 'light', ['light', 'dark'], true)
                ? $row['tone']
                : 'light';

            Plate::create([
                'block' => $this->plateBlockKey(),
                'number' => $number,
                'image' => $row['image'] ?? null,
                'caption' => $row['caption'] ?? null,
                'alt' => $row['alt'] ?? null,
                'tone' => $tone,
                'sort_order' => (int) ($row['sort_order'] ?? $order),
            ]);

            $order += 10;
        }
    }
}
