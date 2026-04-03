<?php

namespace App\Http\Requests\Settings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ApiTokenStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'expires_at' => ['nullable', 'date', 'after_or_equal:today'],
            'abilities' => ['required', 'array', 'min:1'],
            'abilities.*' => Rule::in(['route', 'zone:create', 'zone:update', 'zone:delete', 'recipient:create', 'recipient:update', 'recipient:delete']),
        ];
    }
}
