<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;


#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly ?string $avatar_url,
        public readonly ?string $pending_email,
        public readonly bool $is_admin,
        public readonly ?int $current_app_id,
    ) {
    }
}
