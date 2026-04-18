<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Mail\LeadReceived;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

/**
 * Lead capture controller.
 *
 * Accepts the "Приватный показ" form from the landing, logs the payload
 * (source of truth — never lost, even if SMTP goes down), and dispatches
 * a notification email to config('services.leads.recipient').
 *
 * CRM integration (amoCRM/Bitrix/Telegram) is intentionally out of scope
 * on this stage — see docs/MAIN_PROMPT.md §CONVERSION-ENGINEER and the
 * client's decision to defer CRM to a later iteration.
 */
class LeadController extends Controller
{
    public function store(StoreLeadRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Persist lead to log BEFORE mail attempt — never lose a lead to
        // transport failure. `storage/logs/laravel.log` is the source of
        // truth until the Orchid admin + Lead Eloquent model land.
        Log::info('Lead received', $data);

        try {
            Mail::to(config('services.leads.recipient'))
                ->send(new LeadReceived($data));
        } catch (Throwable $e) {
            // Swallow transport errors — user-facing flow is success
            // regardless. Operator sees the lead in laravel.log anyway.
            Log::error('Lead email dispatch failed', [
                'exception' => $e->getMessage(),
                'lead_name' => $data['name'] ?? null,
            ]);
        }

        return redirect()->back()->with(
            'success',
            'Заявка принята. Менеджер свяжется с вами в ближайшее время.'
        );
    }
}
