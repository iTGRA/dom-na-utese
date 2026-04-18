<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Mail\LeadReceived;
use App\Models\Lead;
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

        // Persist первым делом — заявки не теряются даже при сбое SMTP.
        // Лог остаётся как второй страховой канал.
        $lead = Lead::create(array_merge(
            // `consent` валидируется, но не хранится — это только гейт.
            collect($data)->except('consent')->all(),
            [
                'ip' => $request->ip(),
                'user_agent' => substr((string) $request->userAgent(), 0, 255),
            ]
        ));

        Log::info('Lead received', ['id' => $lead->id] + $data);

        try {
            Mail::to(config('services.leads.recipient'))
                ->send(new LeadReceived($data));
        } catch (Throwable $e) {
            // Swallow transport errors — user-facing flow is success
            // regardless. Заявка уже в БД, оператор увидит её в /admin/leads.
            Log::error('Lead email dispatch failed', [
                'exception' => $e->getMessage(),
                'lead_id' => $lead->id,
                'lead_name' => $data['name'] ?? null,
            ]);
        }

        return redirect()->back()->with(
            'success',
            'Заявка принята. Менеджер свяжется с вами в ближайшее время.'
        );
    }
}
