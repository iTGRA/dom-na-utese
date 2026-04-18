<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * 4 плитки «Уклад»: утро / день / закат / зима.
 * Литературная цитата + фото + тональность фона (paper/ink).
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('uklad_tiles', function (Blueprint $table) {
            $table->id();
            $table->string('key', 16);                          // morning|day|sunset|winter
            $table->string('title', 64);
            $table->text('quote');
            $table->string('image')->nullable();
            $table->enum('tone', ['paper', 'ink'])->default('paper');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('uklad_tiles');
    }
};
