<?php

namespace App\Http\Requests\App;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ZoneRequest extends FormRequest
{
    public function rules(): array
    {
        $zone = $this->route('zone');
        $zoneId = $zone?->id;

        return [
            'name' => ['required', Rule::unique('zones', 'name')->ignore($zoneId)],
            'webhook_url' => ['required', 'url'],
            'description' => ['nullable', 'string'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
