<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Заявки на приватный показ (leads).
 *
 * Persist после валидации StoreLeadRequest — заявки больше не теряются
 * при сбоях SMTP. Админ видит все в /admin/leads с сортировкой по
 * дате подачи и может отмечать статус (новая → связались → назначен
 * показ → завершено / отказ).
 *
 * `lot_id` — НЕ foreign key: лотов может стать меньше 9, а номер
 * переданный с карточки остаётся историческим фактом заявки.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('phone', 20);
            $table->string('email', 180)->nullable();
            $table->enum('preferred_contact', ['phone', 'whatsapp', 'telegram']);
            $table->enum('source', ['hero', 'built', 'final', 'lot-card', 'header']);
            $table->unsignedTinyInteger('lot_id')->nullable();  // 1..9, ссылка на номер лота (не FK)
            $table->enum('status', ['new', 'contacted', 'scheduled', 'done', 'cold'])->default('new');
            $table->text('admin_notes')->nullable();
            $table->string('ip', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
