<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Таблица «Соседи по берегу» — справочник 14 исторических объектов
 * волжского берега от Постникова оврага до Барбашиной поляны.
 *
 * Источник сидов — docs/design-system/dom-na-utese-concept.txt, Часть II.
 * Один объект (Дача Головкина — «Дача со Слонами») помечен `featured=true`
 * и используется в блоке 05 Dacha.jsx главной страницы.
 * Все 14 отображаются в полном справочнике на /shore.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('neighbors', function (Blueprint $table) {
            $table->id();
            $table->string('title');                            // 'Дача со Слонами'
            $table->string('owner')->nullable();                // 'Константин Павлович Головкин'
            $table->string('date_label', 64)->nullable();       // '1908–1909'
            $table->smallInteger('year')->nullable();           // 1908 — для сортировки
            $table->string('address', 128)->nullable();         // '4-я просека'
            $table->string('style', 128)->nullable();           // 'Модерн'
            $table->string('status_label')->nullable();         // 'Федеральный памятник'
            $table->enum('tag', ['federal', 'regional', 'preserved', 'lost', 'other'])->default('other');
            $table->text('description');                        // длинное описание
            $table->text('short_description')->nullable();      // 1-2 предложения для карточки
            $table->string('image')->nullable();
            $table->boolean('featured')->default(false);        // только у Дачи со Слонами = true
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('neighbors');
    }
};
