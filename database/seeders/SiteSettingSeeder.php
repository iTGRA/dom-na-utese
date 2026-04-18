<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

/**
 * Посев настроек сайта.
 *
 * Группы:
 *   contact / legal / meta         — футер, юр-инфо, соцпревью
 *   block01 … block12              — тексты и картинки блоков главной
 *
 * По блокам главной дефолтные value подтянуты дословно из текущих
 * Components/Blocks/*.jsx. Пока фронт не переведён на props,
 * поля редактируются в админке, но визуально блоки читают их только
 * после следующей итерации (frontend-rewiring).
 */
class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [];

        // ============================================================
        // CONTACT / LEGAL / META — уже были, сохраняем как есть
        // ============================================================
        $settings = array_merge($settings, [
            [
                'key' => 'contact.phone',
                'group' => 'contact',
                'label' => 'Телефон',
                'hint' => 'Формат: +7 (XXX) XXX-XX-XX',
                'input_type' => 'text',
                'sort_order' => 10,
            ],
            [
                'key' => 'contact.whatsapp',
                'group' => 'contact',
                'label' => 'WhatsApp',
                'hint' => 'Номер без знака «плюс» — например, 79161234567',
                'input_type' => 'text',
                'sort_order' => 20,
            ],
            [
                'key' => 'contact.telegram',
                'group' => 'contact',
                'label' => 'Telegram (username)',
                'hint' => 'Без «собаки»: dom_na_utese',
                'input_type' => 'text',
                'sort_order' => 30,
            ],
            [
                'key' => 'contact.email',
                'group' => 'contact',
                'label' => 'Email',
                'hint' => 'Куда писать гостям: info@dom-na-utese.ru',
                'input_type' => 'email',
                'sort_order' => 40,
            ],
            [
                'key' => 'contact.office_address',
                'group' => 'contact',
                'label' => 'Адрес офиса продаж',
                'hint' => 'Полный адрес, как его увидит клиент в футере',
                'input_type' => 'textarea',
                'sort_order' => 50,
            ],
            [
                'key' => 'legal.entity_name',
                'group' => 'legal',
                'label' => 'Юридическое лицо',
                'hint' => 'Например: ООО «Дом на Утёсе» или ИП Иванов И.И.',
                'input_type' => 'text',
                'sort_order' => 10,
            ],
            [
                'key' => 'legal.inn',
                'group' => 'legal',
                'label' => 'ИНН',
                'hint' => '10 или 12 цифр',
                'input_type' => 'text',
                'sort_order' => 20,
            ],
            [
                'key' => 'legal.ogrn',
                'group' => 'legal',
                'label' => 'ОГРН',
                'hint' => '13 или 15 цифр',
                'input_type' => 'text',
                'sort_order' => 30,
            ],
            [
                'key' => 'legal.declaration_url',
                'group' => 'legal',
                'label' => 'Проектная декларация',
                'hint' => 'Ссылка на наш.дом.рф',
                'input_type' => 'url',
                'sort_order' => 40,
            ],
            [
                'key' => 'legal.privacy_url',
                'group' => 'legal',
                'label' => 'Политика конфиденциальности',
                'hint' => 'Ссылка на PDF или страницу политики',
                'input_type' => 'url',
                'sort_order' => 50,
            ],
            [
                'key' => 'meta.og_title',
                'value' => 'Дом на Утёсе — клубный дом на первой линии Волги',
                'group' => 'meta',
                'label' => 'Title для соцсетей',
                'hint' => 'Заголовок при шаринге ссылки в мессенджерах и соцсетях',
                'input_type' => 'text',
                'sort_order' => 10,
            ],
            [
                'key' => 'meta.og_description',
                'value' => 'Девять лотов на волжском утёсе на Просеках. Дом сдан в 2024. Потолки 3,5–4 м, панорамное остекление, подземный паркинг, управляющая компания. Приватный показ по записи.',
                'group' => 'meta',
                'label' => 'Описание для соцсетей',
                'hint' => '1–2 предложения. Попадает в превью при шаринге.',
                'input_type' => 'textarea',
                'sort_order' => 20,
            ],
            [
                'key' => 'meta.analytics_yandex',
                'group' => 'meta',
                'label' => 'ID счётчика Яндекс.Метрики',
                'hint' => 'Только цифры — например, 98765432',
                'input_type' => 'text',
                'sort_order' => 30,
            ],
        ]);

        // ============================================================
        // BLOCK 01 · Hero
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block01.kicker', 'value' => 'Клубный дом на первой линии Волги', 'group' => 'block01', 'label' => 'Надзаголовок (кикер)', 'hint' => 'Маленькая строка над главным заголовком', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block01.h1_before', 'value' => 'Дом', 'group' => 'block01', 'label' => 'Заголовок — первая часть', 'hint' => 'Слово «Дом» (обычное начертание)', 'input_type' => 'text', 'sort_order' => 20],
            ['key' => 'block01.h1_italic', 'value' => 'на Утёсе', 'group' => 'block01', 'label' => 'Заголовок — вторая часть (курсивом)', 'hint' => 'Часть заголовка, которая будет выделена курсивом', 'input_type' => 'text', 'sort_order' => 30],
            ['key' => 'block01.subtitle', 'value' => 'На одной линии с историей.', 'group' => 'block01', 'label' => 'Подзаголовок', 'hint' => 'Одна строка под главным заголовком', 'input_type' => 'text', 'sort_order' => 40],
            ['key' => 'block01.cta_primary', 'value' => 'Приватный показ', 'group' => 'block01', 'label' => 'Главная кнопка', 'hint' => 'Открывает форму заявки', 'input_type' => 'text', 'sort_order' => 50],
            ['key' => 'block01.cta_secondary', 'value' => 'О доме ↓', 'group' => 'block01', 'label' => 'Вторая кнопка', 'hint' => 'Скролл к следующему блоку', 'input_type' => 'text', 'sort_order' => 60],
            ['key' => 'block01.fact_1', 'value' => '9 лотов', 'group' => 'block01', 'label' => 'Факт 1', 'hint' => 'Короткая строка в нижней линии', 'input_type' => 'text', 'sort_order' => 70],
            ['key' => 'block01.fact_2', 'value' => 'первая линия Волги', 'group' => 'block01', 'label' => 'Факт 2', 'input_type' => 'text', 'sort_order' => 80],
            ['key' => 'block01.fact_3', 'value' => 'потолки 3,5–4 м', 'group' => 'block01', 'label' => 'Факт 3', 'input_type' => 'text', 'sort_order' => 90],
            ['key' => 'block01.fact_4', 'value' => 'дом сдан', 'group' => 'block01', 'label' => 'Факт 4', 'input_type' => 'text', 'sort_order' => 100],
            ['key' => 'block01.image', 'value' => '/images/visual/14.jpg', 'group' => 'block01', 'label' => 'Главная картинка (фон)', 'hint' => 'Full-bleed фото. Желательно горизонтальное, 2000+ px по ширине.', 'input_type' => 'image', 'sort_order' => 110],
        ]);

        // ============================================================
        // BLOCK 02 · Категория
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block02.rubric', 'value' => '02 · Категория', 'group' => 'block02', 'label' => 'Рубрика (тип блока)', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block02.h2', 'value' => 'На исторической полосе самарских просек — от Постникова оврага до Барбашиной поляны — сто лет стояли только частные дачи.', 'group' => 'block02', 'label' => 'Заголовок', 'input_type' => 'textarea', 'sort_order' => 20],
            ['key' => 'block02.lead', 'value' => 'Клубного дома здесь не было никогда. Дом на Утёсе — девять лотов на первой линии Волги, построенных в 2024 году на той же береговой линии, где с 1877 года стоят виллы Головкина, Соколовых, Сурошникова, Курлиной.', 'group' => 'block02', 'label' => 'Основной текст', 'input_type' => 'textarea', 'sort_order' => 30],
            ['key' => 'block02.facts', 'value' => '9 лотов, 8 соседей, потолки 3,5–4 м, панорамное остекление, подземный паркинг, управляющая компания', 'group' => 'block02', 'label' => 'Факты через запятую', 'hint' => 'Строка с фактами — через запятую, разделители нарисуются сами', 'input_type' => 'textarea', 'sort_order' => 40],
            ['key' => 'block02.image', 'value' => '/images/visual/20.jpg', 'group' => 'block02', 'label' => 'Вертикальное фото', 'hint' => 'Portrait-кадр (3:4) справа от текста', 'input_type' => 'image', 'sort_order' => 50],
            ['key' => 'block02.caption', 'value' => 'Дом на Утёсе, 4-я просека, 2026.', 'group' => 'block02', 'label' => 'Подпись под фото', 'input_type' => 'text', 'sort_order' => 60],
        ]);

        // ============================================================
        // BLOCK 03 · Берег
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block03.rubric', 'value' => '03 · Место', 'group' => 'block03', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block03.h2', 'value' => 'Самарская Ривьера', 'group' => 'block03', 'label' => 'Заголовок', 'input_type' => 'text', 'sort_order' => 20],
            ['key' => 'block03.subtitle', 'value' => 'Десять километров волжского берега, которые никогда не были общественной землёй.', 'group' => 'block03', 'label' => 'Подзаголовок (курсив)', 'input_type' => 'textarea', 'sort_order' => 30],
            ['key' => 'block03.p1', 'value' => 'Просеки — это не район, это линия. Десять километров высокого левого берега от Постникова оврага до Барбашиной поляны, поросших сосновым и дубовым лесом. В 1877 году Городская Управа нарезала здесь 93 участка и отдала их в частную аренду на 99 лет.', 'group' => 'block03', 'label' => 'Абзац 1', 'input_type' => 'textarea', 'sort_order' => 40],
            ['key' => 'block03.p2', 'value' => 'За следующие тридцать лет берег застроили купеческие династии, которые строили Самару: Головкины, Шихобаловы, Соколовы, Сурошниковы, Курлины, Субботины. Они выбирали этот берег не под показную роскошь. Константин Головкин, построивший здесь Дачу со Слонами, описывал соседские владения как единственные по красоте на всём течении Волги от Нижнего Новгорода до Астрахани.', 'group' => 'block03', 'label' => 'Абзац 2', 'input_type' => 'textarea', 'sort_order' => 50],
            ['key' => 'block03.p3', 'value' => 'Полоса до сих пор застроена частными домами. Здесь нет жилых комплексов. Строительство невозможно — свободной первой линии не осталось.', 'group' => 'block03', 'label' => 'Абзац 3', 'input_type' => 'textarea', 'sort_order' => 60],
            ['key' => 'block03.cta', 'value' => 'Подробнее о берегу →', 'group' => 'block03', 'label' => 'Ссылка на страницу /shore', 'input_type' => 'text', 'sort_order' => 70],
            ['key' => 'block03.map_image', 'value' => '/images/map/shore-map-1600.jpg', 'group' => 'block03', 'label' => 'Картинка-карта берега', 'input_type' => 'image', 'sort_order' => 80],
            ['key' => 'block03.fact1_value', 'value' => '1877', 'group' => 'block03', 'label' => 'Цифра 1 (значение)', 'input_type' => 'text', 'sort_order' => 90],
            ['key' => 'block03.fact1_label', 'value' => 'Год открытия берега', 'group' => 'block03', 'label' => 'Цифра 1 (подпись)', 'input_type' => 'text', 'sort_order' => 100],
            ['key' => 'block03.fact2_value', 'value' => '10 км', 'group' => 'block03', 'label' => 'Цифра 2 (значение)', 'input_type' => 'text', 'sort_order' => 110],
            ['key' => 'block03.fact2_label', 'value' => 'Длина полосы', 'group' => 'block03', 'label' => 'Цифра 2 (подпись)', 'input_type' => 'text', 'sort_order' => 120],
            ['key' => 'block03.fact3_value', 'value' => '0', 'group' => 'block03', 'label' => 'Цифра 3 (значение)', 'input_type' => 'text', 'sort_order' => 130],
            ['key' => 'block03.fact3_label', 'value' => 'Клубных домов на первой линии до сегодняшнего дня', 'group' => 'block03', 'label' => 'Цифра 3 (подпись)', 'input_type' => 'text', 'sort_order' => 140],
            ['key' => 'block03.bridge', 'value' => 'Восемь соседей по берегу — на странице Берег →', 'group' => 'block03', 'label' => 'Строка-мостик на /shore', 'input_type' => 'textarea', 'sort_order' => 150],
        ]);

        // ============================================================
        // BLOCK 06 · Архитектура
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block06.rubric', 'value' => 'Акт III · Архитектура', 'group' => 'block06', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block06.h2', 'value' => 'Дом проектировался под виды и под ритм берега.', 'group' => 'block06', 'label' => 'Заголовок', 'input_type' => 'textarea', 'sort_order' => 20],
            ['key' => 'block06.subtitle', 'value' => '', 'group' => 'block06', 'label' => 'Подзаголовок', 'hint' => 'Не используется в блоке 06, оставьте пустым', 'input_type' => 'text', 'sort_order' => 30],
            ['key' => 'block06.text_island', 'value' => "Три этажа над утёсом. Лаконичный фасад без декоративной избыточности.\n\nМатериалы выбирались так, чтобы дом не спорил с ландшафтом, а становился его продолжением.", 'group' => 'block06', 'label' => 'Текст-остров по центру', 'hint' => 'Абзацы разделяйте пустой строкой', 'input_type' => 'textarea', 'sort_order' => 40],
            ['key' => 'block06.materials_title', 'value' => 'Материалы', 'group' => 'block06', 'label' => 'Заголовок списка материалов', 'input_type' => 'text', 'sort_order' => 50],
            ['key' => 'block06.materials_list', 'value' => "Панорамное остекление в пол Schüco\nПотолки 3,5–4 метра\nНатуральные фасадные материалы\nТёплая архитектурная подсветка\nЗакрытый двор на эксплуатируемой кровле подземного паркинга", 'group' => 'block06', 'label' => 'Список материалов', 'hint' => 'Каждый пункт — с новой строки', 'input_type' => 'textarea', 'sort_order' => 60],
        ]);

        // ============================================================
        // BLOCK 06B · Интерьер
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block06b.rubric', 'value' => 'Акт III · Свет', 'group' => 'block06b', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block06b.h2', 'value' => "Окна в пол.\nПотолки до четырёх метров.", 'group' => 'block06b', 'label' => 'Заголовок', 'hint' => 'Перенос строки — Enter', 'input_type' => 'textarea', 'sort_order' => 20],
            ['key' => 'block06b.subtitle', 'value' => 'Панорамное остекление Schüco. Дом проектировался под виды.', 'group' => 'block06b', 'label' => 'Подзаголовок', 'input_type' => 'textarea', 'sort_order' => 30],
            ['key' => 'block06b.text_island', 'value' => "Жилые этажи начинаются на той же высоте, с которой Константин Головкин проектировал слонов — чтобы их было видно с пароходов.\n\nОкна — в пол. Потолки три с половиной и четыре метра. Днём свет идёт снизу, от воды; вечером дом теплеет изнутри собственной архитектурной подсветкой.", 'group' => 'block06b', 'label' => 'Текст-остров', 'input_type' => 'textarea', 'sort_order' => 40],
            ['key' => 'block06b.materials_title', 'value' => 'Характеристики', 'group' => 'block06b', 'label' => 'Заголовок списка', 'input_type' => 'text', 'sort_order' => 50],
            ['key' => 'block06b.materials_list', 'value' => "Панорамное остекление Schüco — в пол\nПотолки 3,5–4 метра\nСвободная планировка под сценарий жителя\nТёплая архитектурная подсветка\nЛаконичный фасад без декоративной избыточности", 'group' => 'block06b', 'label' => 'Список характеристик', 'input_type' => 'textarea', 'sort_order' => 60],
        ]);

        // ============================================================
        // BLOCK 06C · Двор
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block06c.rubric', 'value' => 'Акт III · Территория', 'group' => 'block06c', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block06c.h2', 'value' => 'Закрытый двор на кровле паркинга.', 'group' => 'block06c', 'label' => 'Заголовок', 'input_type' => 'textarea', 'sort_order' => 20],
            ['key' => 'block06c.subtitle', 'value' => 'Частная территория девяти соседей — за периметром.', 'group' => 'block06c', 'label' => 'Подзаголовок', 'input_type' => 'textarea', 'sort_order' => 30],
            ['key' => 'block06c.text_island', 'value' => "Территория внутри периметра — только для жителей дома. Сверху подземного паркинга — эксплуатируемая кровля: двор, дорожки, посадки.\n\nПриезжаешь в дождь — не мокнешь. Лифт из паркинга поднимает прямо до квартиры. Уезжаешь на месяц — возвращаешься в тот же дом.", 'group' => 'block06c', 'label' => 'Текст-остров', 'input_type' => 'textarea', 'sort_order' => 40],
            ['key' => 'block06c.materials_title', 'value' => 'Эксплуатируемая кровля', 'group' => 'block06c', 'label' => 'Заголовок пул-квоуты', 'input_type' => 'text', 'sort_order' => 50],
            ['key' => 'block06c.materials_list', 'value' => 'Жизнь на просеках — без быта на просеках.', 'group' => 'block06c', 'label' => 'Пул-квоута', 'hint' => 'Одна короткая фраза — появляется большим курсивом', 'input_type' => 'textarea', 'sort_order' => 60],
        ]);

        // ============================================================
        // BLOCK 07 · Лот
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block07.rubric', 'value' => '07 · Лот', 'group' => 'block07', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block07.h2', 'value' => 'Вы получаете не квартиру, а полный набор.', 'group' => 'block07', 'label' => 'Заголовок', 'input_type' => 'textarea', 'sort_order' => 20],
            ['key' => 'block07.subtitle', 'value' => 'Девять одинаковых по структуре комплектов.', 'group' => 'block07', 'label' => 'Подзаголовок (курсив)', 'input_type' => 'text', 'sort_order' => 30],
            ['key' => 'block07.description', 'value' => 'Каждый из девяти лотов — это не квартира, а полный набор. Вы не доплачиваете за паркоместа, кладовую, террасу. Всё это уже включено.', 'group' => 'block07', 'label' => 'Описание', 'input_type' => 'textarea', 'sort_order' => 40],
            ['key' => 'block07.factline', 'value' => 'Девять лотов. Девять видов на Волгу. Восемь соседей.', 'group' => 'block07', 'label' => 'Строка фактов', 'input_type' => 'text', 'sort_order' => 50],
        ]);

        // ============================================================
        // BLOCK 08 · Планировки
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block08.rubric', 'value' => '08 · Планировки', 'group' => 'block08', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block08.h2', 'value' => 'Девять лотов', 'group' => 'block08', 'label' => 'Заголовок', 'input_type' => 'text', 'sort_order' => 20],
            ['key' => 'block08.subtitle', 'value' => 'Свободная планировка под ваш сценарий жизни.', 'group' => 'block08', 'label' => 'Подзаголовок', 'input_type' => 'text', 'sort_order' => 30],
            ['key' => 'block08.description', 'value' => 'Цен нет. Есть только «запросить условия».', 'group' => 'block08', 'label' => 'Примечание справа от заголовка', 'input_type' => 'textarea', 'sort_order' => 40],
        ]);

        // ============================================================
        // BLOCK 09 · Уклад
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block09.rubric', 'value' => '09 · Уклад', 'group' => 'block09', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block09.h2', 'value' => 'Уклад', 'group' => 'block09', 'label' => 'Заголовок', 'input_type' => 'text', 'sort_order' => 20],
            ['key' => 'block09.subtitle', 'value' => 'День на берегу.', 'group' => 'block09', 'label' => 'Подзаголовок', 'input_type' => 'text', 'sort_order' => 30],
            ['key' => 'block09.factline_1', 'value' => 'Центр Самары — 10 минут на автомобиле', 'group' => 'block09', 'label' => 'Факт 1 (нижняя строка)', 'input_type' => 'text', 'sort_order' => 40],
            ['key' => 'block09.factline_2', 'value' => 'Загородный парк — в шаговой доступности', 'group' => 'block09', 'label' => 'Факт 2', 'input_type' => 'text', 'sort_order' => 50],
            ['key' => 'block09.factline_3', 'value' => 'Спуск к Волге — с территории дома', 'group' => 'block09', 'label' => 'Факт 3', 'input_type' => 'text', 'sort_order' => 60],
            ['key' => 'block09.factline_4', 'value' => 'Круглогодичное содержание от УК', 'group' => 'block09', 'label' => 'Факт 4', 'input_type' => 'text', 'sort_order' => 70],
        ]);

        // ============================================================
        // BLOCK 10 · Инфраструктура
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block10.rubric', 'value' => '10 · Инфраструктура', 'group' => 'block10', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block10.h2', 'value' => 'Инфраструктура', 'group' => 'block10', 'label' => 'Заголовок', 'input_type' => 'text', 'sort_order' => 20],
            ['key' => 'block10.subtitle', 'value' => 'Жизнь на просеках без быта на просеках.', 'group' => 'block10', 'label' => 'Подзаголовок', 'input_type' => 'text', 'sort_order' => 30],
        ]);

        // ============================================================
        // BLOCK 11 · Дом построен
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block11.rubric', 'value' => '11 · Доказательства', 'group' => 'block11', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block11.h2', 'value' => 'Дом построен.', 'group' => 'block11', 'label' => 'Заголовок', 'hint' => 'Слово «построен» будет выделено цветом автоматически', 'input_type' => 'text', 'sort_order' => 20],
            ['key' => 'block11.body', 'value' => "Приезжайте посмотреть своими глазами.\n\nМы не показываем рендеры и планы реализации. Дом стоит на своём месте. На приватном показе вы увидите реальные виды из окон, пройдёте по настоящим квартирам, подниметесь на террасы.", 'group' => 'block11', 'label' => 'Основной текст', 'hint' => 'Первый абзац — курсив. Разделите пустой строкой.', 'input_type' => 'textarea', 'sort_order' => 30],
            ['key' => 'block11.cta_label', 'value' => 'Записаться на показ', 'group' => 'block11', 'label' => 'Надпись на кнопке', 'input_type' => 'text', 'sort_order' => 40],
            ['key' => 'block11.image', 'value' => '/images/visual/26.jpg', 'group' => 'block11', 'label' => 'Full-bleed фото', 'input_type' => 'image', 'sort_order' => 50],
        ]);

        // ============================================================
        // BLOCK 12 · Финальный CTA
        // ============================================================
        $settings = array_merge($settings, [
            ['key' => 'block12.rubric', 'value' => '12 · Приватный показ', 'group' => 'block12', 'label' => 'Рубрика', 'input_type' => 'text', 'sort_order' => 10],
            ['key' => 'block12.h2', 'value' => 'Приватный показ', 'group' => 'block12', 'label' => 'Заголовок', 'input_type' => 'text', 'sort_order' => 20],
            ['key' => 'block12.body', 'value' => "Мы показываем дом лично.\n\nОставьте заявку — менеджер свяжется, согласует время и приедет за вами.", 'group' => 'block12', 'label' => 'Текст', 'hint' => 'Первый абзац — курсив', 'input_type' => 'textarea', 'sort_order' => 30],
            ['key' => 'block12.form_submit_label', 'value' => 'Записаться', 'group' => 'block12', 'label' => 'Надпись на кнопке отправки', 'input_type' => 'text', 'sort_order' => 40],
            ['key' => 'block12.privacy_note', 'value' => 'Согласен на обработку персональных данных', 'group' => 'block12', 'label' => 'Текст чек-бокса согласия', 'input_type' => 'text', 'sort_order' => 50],
        ]);

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                array_merge(['value' => null], $setting)
            );
        }

        SiteSetting::flushCache();
    }
}
