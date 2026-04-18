<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Таблица лотов клубного дома «Дом на Утёсе».
 *
 * Девять квартир — по три на этаже. Поля площади оставлены строковыми,
 * чтобы контент-менеджер мог вводить как «~180 м²», «160–180 м²» или
 * «148 м²» без дробления на три числовых колонки.
 *
 * Поле `status` — категорийное: доступен / в резерве / продан. Используется
 * на карточках блока 08 Plans.jsx для стилизации chip-а.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('lots', function (Blueprint $table) {
            $table->id();
            $table->string('number', 2)->unique();              // '01'..'09'
            $table->unsignedTinyInteger('floor');               // 1..3
            $table->string('area_total', 32)->nullable();       // '~180 м²' свободный формат
            $table->string('area_apartment', 32)->nullable();   // '~120 м²'
            $table->string('area_summer_terrace', 32)->nullable();
            $table->string('area_balcony_terrace', 32)->nullable();
            $table->string('view', 64);                         // 'Волга', 'Жигулёвские ворота', 'Закат'
            $table->enum('status', ['available', 'reserved', 'sold'])->default('available');
            $table->string('plan_image')->nullable();           // путь к планировке
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lots');
    }
};
