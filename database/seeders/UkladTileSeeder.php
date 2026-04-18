<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\UkladTile;
use Illuminate\Database\Seeder;

/**
 * 4 плитки «Уклад»: утро / день / закат / зима.
 * Цитаты — дословно из текущего 09-Uklad.jsx.
 */
class UkladTileSeeder extends Seeder
{
    public function run(): void
    {
        $tiles = [
            [
                'key' => 'morning',
                'title' => 'Утро',
                'quote' => 'Утро начинается с террасы. Волга внизу ещё в тумане, слышно теплоходы. Через пятнадцать минут — кофе и работа.',
                'image' => '/images/visual/16.jpg',
                'tone' => 'paper',
                'sort_order' => 10,
            ],
            [
                'key' => 'day',
                'title' => 'День',
                'quote' => 'Обед в центре города — десять минут до Ленинградской, двенадцать до Волжского проспекта.',
                'image' => '/images/visual/18.jpg',
                'tone' => 'paper',
                'sort_order' => 20,
            ],
            [
                'key' => 'sunset',
                'title' => 'Закат',
                'quote' => 'Возвращение к закату над Жигулёвскими воротами. Вечером — прогулка вдоль берега, мимо дачи Сипиной и Загородного парка.',
                'image' => '/images/visual/22.jpg',
                'tone' => 'paper',
                'sort_order' => 30,
            ],
            [
                'key' => 'winter',
                'title' => 'Зима',
                'quote' => 'Зимой лес замирает, и над водой стоит тишина, которой в центре не бывает.',
                'image' => '/images/visual/30.jpg',
                'tone' => 'ink',
                'sort_order' => 40,
            ],
        ];

        foreach ($tiles as $tile) {
            UkladTile::updateOrCreate(['key' => $tile['key']], $tile);
        }
    }
}
