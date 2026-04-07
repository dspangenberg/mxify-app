<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AppRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'website' => ['required', 'url'],
            'mx_name' => ['required', 'string'],
            'mx_ip4' => ['required', 'ipv4'],
            'mx_ip6' => ['nullable', 'ipv6'],
            'address_prefix' => ['nullable', 'string'],
            'webhook_route' => ['nullable', 'string'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
