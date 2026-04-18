<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Lead notification email to the project manager.
 *
 * Rendered from resources/views/emails/lead.blade.php. Subject carries
 * the lead source label so the recipient can triage at a glance.
 */
class LeadReceived extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param  array<string, mixed>  $lead
     */
    public function __construct(public array $lead)
    {
    }

    public function envelope(): Envelope
    {
        $sourceLabels = [
            'hero' => 'Первый экран',
            'built' => 'Блок «Дом построен»',
            'final' => 'Финальная форма',
            'lot-card' => 'Карточка лота №'.($this->lead['lot_id'] ?? '—'),
            'header' => 'Шапка сайта',
        ];

        $label = $sourceLabels[$this->lead['source'] ?? ''] ?? 'Сайт';

        return new Envelope(
            subject: "Новая заявка — Дом на Утёсе · {$label}",
        );
    }

    public function content(): Content
    {
        $contactLabels = [
            'phone' => 'Звонок',
            'whatsapp' => 'WhatsApp',
            'telegram' => 'Telegram',
        ];

        $sourceLabels = [
            'hero' => 'Первый экран',
            'built' => 'Блок «Дом построен»',
            'final' => 'Финальная форма',
            'lot-card' => 'Карточка лота',
            'header' => 'Шапка сайта',
        ];

        return new Content(
            view: 'emails.lead',
            with: [
                'name' => $this->lead['name'] ?? '—',
                'phone' => $this->lead['phone'] ?? '—',
                'email' => $this->lead['email'] ?? null,
                'contactLabel' => $contactLabels[$this->lead['preferred_contact'] ?? ''] ?? '—',
                'sourceLabel' => $sourceLabels[$this->lead['source'] ?? ''] ?? 'Сайт',
                'lotId' => $this->lead['lot_id'] ?? null,
                'timestamp' => now()->setTimezone('Europe/Samara')->format('d.m.Y H:i'),
            ],
        );
    }
}
