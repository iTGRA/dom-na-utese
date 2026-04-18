<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Lot;
use Illuminate\Database\Seeder;

/**
 * Плейсхолдер-9 лотов. Клиент доразметит реальные площади через админку.
 * Этаж: 1-3 ← лоты 1-3, 4-6, 7-9.
 * Виды: Волга / Жигулёвские ворота / Закат — чередование.
 * Два статуса-примера: lot-04 «reserved», lot-07 «sold», остальные «available».
 */
class LotSeeder extends Seeder
{
    public function run(): void
    {
        $views = ['Волга', 'Жигулёвские ворота', 'Закат'];

        foreach (range(1, 9) as $n) {
            Lot::updateOrCreate(
                ['number' => sprintf('%02d', $n)],
                [
                    'floor' => match (true) {
                        $n <= 3 => 1,
                        $n <= 6 => 2,
                        default => 3,
                    },
                    'area_total' => '~180 м²',
                    'area_apartment' => '~120 м²',
                    'area_summer_terrace' => '~35 м²',
                    'area_balcony_terrace' => '~25 м²',
                    'view' => $views[($n - 1) % 3],
                    'status' => match ($n) {
                        4 => 'reserved',
                        7 => 'sold',
                        default => 'available',
                    },
                    'description' => null,
                    'plan_image' => null,
                    'sort_order' => $n,
                ]
            );
        }
    }
}
