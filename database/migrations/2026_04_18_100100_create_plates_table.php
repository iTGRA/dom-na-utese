<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Архитектурные «пластины» для editorial-блоков 06 Architecture,
 * 06B Interior и 06C Courtyard.
 *
 * Каждая запись — одна фотопластина монографии с нумерацией (Pl. 01…),
 * подписью-caption и тоном (светлая/тёмная пластина для корректного
 * цвета plate-номера поверх фото).
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('plates', function (Blueprint $table) {
            $table->id();
            $table->enum('block', ['arch', 'interior', 'courtyard']);
            $table->string('number', 8);                        // '01', '02', '11', 'XI'
            $table->string('image')->nullable();
            $table->string('caption')->nullable();
            $table->string('alt')->nullable();
            $table->enum('tone', ['light', 'dark'])->default('light');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
            $table->index(['block', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plates');
    }
};
