<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecipientRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'description' => ['required'],
            'zone_id' => ['required', 'exists:zones'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
