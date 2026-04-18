<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\InfrastructureCard;
use Illuminate\Database\Seeder;

/**
 * 6 карточек инфраструктуры. Дословно из 10-Infrastructure.jsx.
 */
class InfrastructureCardSeeder extends Seeder
{
    public function run(): void
    {
        $cards = [
            ['number' => '01', 'title' => 'Подземный паркинг',       'description' => 'Приезжаете в дождь и не мокнете. Лифт до квартиры.', 'sort_order' => 10],
            ['number' => '02', 'title' => 'Управляющая компания',    'description' => 'Уезжаете на месяц, возвращаетесь в тот же дом.',    'sort_order' => 20],
            ['number' => '03', 'title' => 'Круглосуточная охрана',   'description' => 'Закрытая территория, видеонаблюдение, контроль доступа.', 'sort_order' => 30],
            ['number' => '04', 'title' => 'Кладовые',                'description' => 'Сезонные вещи, велосипеды, лыжи не в квартире.',   'sort_order' => 40],
            ['number' => '05', 'title' => 'Закрытый двор',           'description' => 'Территория только для жителей дома.',                'sort_order' => 50],
            ['number' => '06', 'title' => 'Лобби',                   'description' => 'Встреча гостей и приём посылок через консьержа.',   'sort_order' => 60],
        ];

        foreach ($cards as $card) {
            InfrastructureCard::updateOrCreate(['number' => $card['number']], $card);
        }
    }
}
