<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validation for the "Приватный показ" lead form.
 *
 * Fields match the React form contract in Components/LeadFormModal.jsx
 * and Components/Blocks/12-FinalCTA.jsx. Any change here must be mirrored
 * on the frontend in the same commit.
 */
class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:1', 'max:120'],
            'phone' => ['required', 'string', 'min:7', 'max:20', 'regex:/^[\d\s\+\-\(\)]+$/'],
            'email' => ['nullable', 'email:rfc', 'max:180'],
            'preferred_contact' => ['required', 'in:phone,whatsapp,telegram'],
            'consent' => ['required', 'accepted'],
            'source' => ['required', 'in:hero,built,final,lot-card,header'],
            'lot_id' => ['nullable', 'integer', 'min:1', 'max:9'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Укажите имя',
            'name.max' => 'Имя слишком длинное',
            'phone.required' => 'Укажите телефон для связи',
            'phone.min' => 'Проверьте формат телефона',
            'phone.regex' => 'В номере должны быть только цифры, пробелы, +, −',
            'email.email' => 'Проверьте адрес электронной почты',
            'preferred_contact.required' => 'Выберите удобный способ связи',
            'preferred_contact.in' => 'Выберите один из предложенных способов',
            'consent.accepted' => 'Нужно согласие на обработку персональных данных',
        ];
    }
}
