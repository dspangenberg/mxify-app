<?php

namespace App\Http\Requests\App;

use Illuminate\Foundation\Http\FormRequest;

class RecipientRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'description' => ['required'],
            'zone_id' => ['required', 'exists:zones,id'],
            'token' => ['required', 'string', 'max:32'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
