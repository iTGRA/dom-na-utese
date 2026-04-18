<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Строки состава лота для блока 07.
 * 5 строк: Квартира, Летняя терраса, Балкон-терраса, Паркинг, Кладовая.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('lot_features', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description', 255);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lot_features');
    }
};
