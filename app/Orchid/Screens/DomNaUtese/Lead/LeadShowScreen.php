<?php

declare(strict_types=1);

namespace App\Orchid\Screens\DomNaUtese\Lead;

use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Orchid\Screen\Action;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

/**
 * Детальная карточка заявки.
 *
 * Все «клиентские» поля (name / phone / email / source) — read-only.
 * Менеджер меняет только `status` и `admin_notes`.
 *
 * Nullable $lead — обязательное условие Orchid 14.
 */
class LeadShowScreen extends Screen
{
    public ?Lead $lead = null;

    public function query(Lead $lead): iterable
    {
        $this->lead = $lead;

        return [
            'lead' => $lead,
        ];
    }

    public function name(): ?string
    {
        return 'Заявка #'.($this->lead?->id ?? '—');
    }

    public function description(): ?string
    {
        if (! $this->lead?->exists) {
            return null;
        }

        $sourceLabel = Lead::SOURCE_LABELS[$this->lead->source] ?? $this->lead->source;

        return "От {$this->lead->name} · {$sourceLabel} · {$this->lead->created_at->format('d.m.Y H:i')}";
    }

    /**
     * @return Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Сохранить статус')
                ->icon('bs.check-circle')
                ->method('save'),
        ];
    }

    public function layout(): iterable
    {
        $sourceLabel = Lead::SOURCE_LABELS[$this->lead?->source] ?? ($this->lead?->source ?? '');
        $contactLabel = Lead::PREFERRED_CONTACT_LABELS[$this->lead?->preferred_contact]
            ?? ($this->lead?->preferred_contact ?? '');

        return [
            Layout::rows([
                Input::make('lead.name')
                    ->title('Имя')
                    ->value($this->lead?->name)
                    ->readonly(),

                Input::make('lead.phone')
                    ->title('Телефон')
                    ->value($this->lead?->phone)
                    ->readonly(),

                Input::make('lead.email')
                    ->title('Email')
                    ->value($this->lead?->email)
                    ->readonly(),

                Input::make('contact_display')
                    ->title('Как удобно связаться')
                    ->value($contactLabel)
                    ->readonly(),

                Input::make('source_display')
                    ->title('Откуда пришла заявка')
                    ->value($sourceLabel)
                    ->readonly(),

                Input::make('lot_display')
                    ->title('Лот из карточки')
                    ->value($this->lead?->lot_id ? sprintf('Лот %02d', $this->lead->lot_id) : '—')
                    ->readonly(),

                Input::make('ip_display')
                    ->title('IP адрес')
                    ->value($this->lead?->ip ?? '')
                    ->readonly(),

                Input::make('ua_display')
                    ->title('User-agent')
                    ->value($this->lead?->user_agent ?? '')
                    ->readonly(),
            ])->title('Данные заявки (не редактируются)'),

            Layout::rows([
                Select::make('lead.status')
                    ->title('Статус заявки')
                    ->options(Lead::STATUS_LABELS)
                    ->required(),

                TextArea::make('lead.admin_notes')
                    ->title('Заметки менеджера')
                    ->rows(6)
                    ->help('Внутренние записи: когда звонили, что ответил гость, договорённости по показу.'),
            ])->title('Работа менеджера'),
        ];
    }

    public function save(Lead $lead, Request $request): RedirectResponse
    {
        $data = $request->validate([
            'lead.status' => ['required', 'in:new,contacted,scheduled,done,cold'],
            'lead.admin_notes' => ['nullable', 'string'],
        ]);

        // Обновляем только менеджерские поля — контактные данные неприкосновенны.
        $lead->fill([
            'status' => $data['lead']['status'],
            'admin_notes' => $data['lead']['admin_notes'] ?? null,
        ])->save();

        Toast::info('Статус заявки обновлён.');

        return redirect()->route('platform.dnu.leads.show', $lead->id);
    }
}
