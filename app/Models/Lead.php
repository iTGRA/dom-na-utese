<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

/**
 * Заявка на приватный показ.
 *
 * Создаётся в LeadController::store после валидации StoreLeadRequest.
 * В админке /admin/leads менеджер видит все заявки в reverse-chrono
 * порядке, отмечает статус (new → contacted → scheduled → done / cold)
 * и пишет служебные заметки в admin_notes.
 *
 * Контактные поля (name, phone, email, preferred_contact, source, lot_id)
 * не редактируются — это подписанные гостем данные.
 */
class Lead extends Model
{
    use AsSource, Filterable, HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'preferred_contact',
        'source',
        'lot_id',
        'status',
        'admin_notes',
        'ip',
        'user_agent',
    ];

    protected $casts = [
        'lot_id' => 'integer',
    ];

    /**
     * Человеко-читаемые лейблы для `status` — используются в UI.
     */
    public const STATUS_LABELS = [
        'new' => 'Новая',
        'contacted' => 'Связались',
        'scheduled' => 'Назначен показ',
        'done' => 'Завершена',
        'cold' => 'Отказ / холод',
    ];

    public const SOURCE_LABELS = [
        'hero' => 'Hero (блок 01)',
        'built' => 'Дом построен (блок 11)',
        'final' => 'Финальный CTA (блок 12)',
        'lot-card' => 'Карточка лота (блок 08)',
        'header' => 'Sticky header',
    ];

    public const PREFERRED_CONTACT_LABELS = [
        'phone' => 'Звонок',
        'whatsapp' => 'WhatsApp',
        'telegram' => 'Telegram',
    ];
}
