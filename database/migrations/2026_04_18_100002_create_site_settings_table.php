<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Key/value-хранилище настроек сайта.
 *
 * Записи создаются сидом с пустым `value`, понятными `label` и `hint`,
 * сгруппированы по `group` (contact | legal | meta). Контент-менеджер
 * заполняет значения через единый экран /admin/settings.
 *
 * Чтение — через `SiteSetting::cached()`, которое возвращает `[key => value]`
 * и кэшируется forever. Сохранение в Screen чистит кэш.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 64)->unique();                // 'contact.phone', 'legal.inn'
            $table->text('value')->nullable();
            $table->string('group', 32);                        // 'contact', 'legal', 'meta'
            $table->string('label', 128);                       // 'Телефон для связи'
            $table->string('hint', 255)->nullable();            // 'Формат: +7 (XXX) XXX-XX-XX'
            $table->string('input_type', 16)->default('text');  // 'text', 'email', 'url', 'textarea'
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
