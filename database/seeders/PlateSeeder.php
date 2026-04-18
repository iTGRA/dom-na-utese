<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Plate;
use Illuminate\Database\Seeder;

/**
 * Посев 20 архитектурных пластин:
 *   - arch (Pl. 01-10)      блок 06 Architecture
 *   - interior (Pl. 11-14)  блок 06B Interior
 *   - courtyard (Pl. 15-20) блок 06C Courtyard
 *
 * Пути к фото — из текущих Components/Blocks/06*.jsx. Captions
 * дословно скопированы из figcaption внутри .jsx.
 */
class PlateSeeder extends Seeder
{
    public function run(): void
    {
        $plates = [
            // -------- ARCH (блок 06) --------
            ['block' => 'arch', 'number' => '01', 'image' => '/images/visual/01.jpg', 'alt' => 'Парадный вид дома с юго-запада.', 'caption' => 'Вид с юго-запада, раннее утро.', 'tone' => 'light', 'sort_order' => 10],
            ['block' => 'arch', 'number' => '02', 'image' => '/images/visual/03.jpg', 'alt' => 'Фасад в деталях.', 'caption' => 'Фасад в деталях.', 'tone' => 'light', 'sort_order' => 20],
            ['block' => 'arch', 'number' => '03', 'image' => '/images/visual/07.jpg', 'alt' => 'Терраса выходит к Волге. Вечерний свет на фасаде.', 'caption' => 'Терраса выходит к Волге. Вечерний ритм фасада.', 'tone' => 'light', 'sort_order' => 30],
            ['block' => 'arch', 'number' => '04', 'image' => '/images/visual/09.jpg', 'alt' => 'Материальная деталь. Макро-кадр.', 'caption' => 'Деталь, крупный план. Каждому решению в списке рифмуется ритм на фасаде.', 'tone' => 'light', 'sort_order' => 40],
            ['block' => 'arch', 'number' => '05', 'image' => '/images/visual/02.jpg', 'alt' => 'Фрагмент фасада.', 'caption' => 'Фрагмент фасада.', 'tone' => 'light', 'sort_order' => 50],
            ['block' => 'arch', 'number' => '06', 'image' => '/images/visual/05.jpg', 'alt' => 'Интерьерный ритм.', 'caption' => 'Интерьерный ритм.', 'tone' => 'light', 'sort_order' => 60],
            ['block' => 'arch', 'number' => '07', 'image' => '/images/visual/12.jpg', 'alt' => 'Лестница.', 'caption' => 'Лестница.', 'tone' => 'light', 'sort_order' => 70],
            ['block' => 'arch', 'number' => '08', 'image' => '/images/visual/15.jpg', 'alt' => 'Окно.', 'caption' => 'Окно.', 'tone' => 'light', 'sort_order' => 80],
            ['block' => 'arch', 'number' => '09', 'image' => '/images/visual/17.jpg', 'alt' => 'Фактура камня.', 'caption' => 'Фактура камня.', 'tone' => 'light', 'sort_order' => 90],
            ['block' => 'arch', 'number' => '10', 'image' => '/images/visual/19.jpg', 'alt' => 'Входная группа.', 'caption' => 'Входная группа.', 'tone' => 'light', 'sort_order' => 100],

            // -------- INTERIOR (блок 06B) --------
            ['block' => 'interior', 'number' => '11', 'image' => '/images/visual/23.jpg', 'alt' => 'Интерьер лота. Панорамное остекление в пол, вид на Волгу.', 'caption' => 'День, вид на Жигулёвские ворота из гостиной.', 'tone' => 'light', 'sort_order' => 10],
            ['block' => 'interior', 'number' => '12', 'image' => '/images/visual/27.jpg', 'alt' => 'Деталь интерьера — встреча остекления с потолком.', 'caption' => 'Встреча остекления с потолком.', 'tone' => 'light', 'sort_order' => 20],
            ['block' => 'interior', 'number' => '13', 'image' => '/images/visual/33.jpg', 'alt' => 'Интерьер на закате. Панорамное остекление, тёплая архитектурная подсветка.', 'caption' => 'Закат через остекление. Тёплая архитектурная подсветка включается от сумерек.', 'tone' => 'dark', 'sort_order' => 30],
            ['block' => 'interior', 'number' => '14', 'image' => '/images/visual/24.jpg', 'alt' => 'Интерьер жилого этажа. Пропорции комнаты рассчитаны под горизонт Волги.', 'caption' => 'Комната, сориентированная под горизонт.', 'tone' => 'light', 'sort_order' => 40],

            // -------- COURTYARD (блок 06C) --------
            ['block' => 'courtyard', 'number' => '15', 'image' => '/images/visual/08.jpg', 'alt' => 'Двор дома на эксплуатируемой кровле подземного паркинга.', 'caption' => 'Двор.', 'tone' => 'light', 'sort_order' => 10],
            ['block' => 'courtyard', 'number' => '16', 'image' => '/images/visual/10.jpg', 'alt' => 'Периметр дома, тёплая архитектурная подсветка.', 'caption' => 'Периметр на закате.', 'tone' => 'light', 'sort_order' => 20],
            ['block' => 'courtyard', 'number' => '17', 'image' => '/images/visual/36.jpg', 'alt' => 'Вход в лобби.', 'caption' => 'Вход в лобби.', 'tone' => 'light', 'sort_order' => 30],
            ['block' => 'courtyard', 'number' => '18', 'image' => '/images/visual/04.jpg', 'alt' => 'Въезд в подземный паркинг.', 'caption' => 'Въезд в подземный паркинг.', 'tone' => 'light', 'sort_order' => 40],
            ['block' => 'courtyard', 'number' => '19', 'image' => '/images/visual/06.jpg', 'alt' => 'Лестница у лобби.', 'caption' => 'Лестница у лобби.', 'tone' => 'light', 'sort_order' => 50],
            ['block' => 'courtyard', 'number' => '20', 'image' => '/images/visual/37.jpg', 'alt' => 'Периметр вечером.', 'caption' => 'Периметр вечером.', 'tone' => 'light', 'sort_order' => 60],
        ];

        foreach ($plates as $p) {
            Plate::updateOrCreate(
                ['block' => $p['block'], 'number' => $p['number']],
                $p
            );
        }
    }
}
