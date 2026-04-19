<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Lead;

use App\Models\Lead;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Components\Cells\DateTimeSplit;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Color;
use Orchid\Support\Facades\Layout;

/**
 * Список всех заявок с сайта. Reverse-chrono, пагинация 50.
 *
 * Поля самой заявки (имя / телефон / email) редактировать нельзя —
 * они подписаны клиентом. Менеджер только двигает статус и пишет
 * заметки в детальном экране LeadShowScreen.
 */
class LeadListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'leads' => Lead::orderBy('created_at', 'desc')->paginate(50),
        ];
    }

    public function name(): ?string
    {
        return 'Заявки';
    }

    public function description(): ?string
    {
        return 'Заявки на приватный показ, оставленные на сайте.';
    }

    public function layout(): iterable
    {
        return [
            Layout::table('leads', [
                TD::make('created_at', 'Пришла')
                    ->usingComponent(DateTimeSplit::class)
                    ->sort(),

                TD::make('name', 'Имя')
                    ->render(fn (Lead $lead) => Link::make($lead->name ?: '—')
                        ->route('platform.dnu.leads.show', $lead->id)),

                TD::make('phone', 'Телефон'),

                TD::make('preferred_contact', 'Связь')
                    ->render(fn (Lead $lead) => Lead::PREFERRED_CONTACT_LABELS[$lead->preferred_contact] ?? $lead->preferred_contact),

                TD::make('source', 'Источник')
                    ->render(fn (Lead $lead) => '<span class="text-muted small">'
                        .(Lead::SOURCE_LABELS[$lead->source] ?? $lead->source)
                        .'</span>'),

                TD::make('lot_id', 'Лот')
                    ->align(TD::ALIGN_CENTER)
                    ->render(fn (Lead $lead) => $lead->lot_id
                        ? sprintf('%02d', $lead->lot_id)
                        : ''),

                TD::make('status', 'Статус')
                    ->render(function (Lead $lead) {
                        $label = Lead::STATUS_LABELS[$lead->status] ?? $lead->status;
                        $color = match ($lead->status) {
                            'new' => Color::PRIMARY,
                            'contacted' => Color::INFO,
                            'scheduled' => Color::WARNING,
                            'done' => Color::SUCCESS,
                            'cold' => Color::DARK,
                            default => Color::BASIC,
                        };

                        return "<span class=\"badge bg-{$color->value}\">{$label}</span>";
                    }),
            ]),
        ];
    }
}
