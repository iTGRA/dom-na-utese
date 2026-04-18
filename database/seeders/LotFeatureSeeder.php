<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\LotFeature;
use Illuminate\Database\Seeder;

/**
 * 5 строк состава лота для блока 07. Дословно из 07-Lot.jsx.
 */
class LotFeatureSeeder extends Seeder
{
    public function run(): void
    {
        $features = [
            ['title' => 'Квартира',            'description' => 'Свободная планировка, потолки 3,5–4 м',          'sort_order' => 10],
            ['title' => 'Летняя терраса',      'description' => 'Собственная зелёная терраса на уровне квартиры', 'sort_order' => 20],
            ['title' => 'Балкон-терраса',      'description' => 'Панорамный балкон, обращённый к Волге',          'sort_order' => 30],
            ['title' => 'Подземный паркинг',   'description' => '2 машиноместа в лоте',                           'sort_order' => 40],
            ['title' => 'Кладовая',            'description' => 'Индивидуальная кладовая в цокольной зоне',       'sort_order' => 50],
        ];

        foreach ($features as $f) {
            LotFeature::updateOrCreate(['title' => $f['title']], $f);
        }
    }
}
