<?php

/*
 * opsc.core is licensed under the terms of the EUPL-1.2 license
 * Copyright (c) 2024-2025 by Danny Spangenberg (twiceware solutions e. K.)
 */

namespace App\Data;

use DateTime;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class RecipientData extends Data
{
    public function __construct(
        public readonly ?int $id,

        public readonly ?string $description,
        public readonly ?string $email_address,
        public readonly ?int $zone_id,
        public readonly ZoneData $zone,

        #[WithTransformer(DateTimeInterfaceTransformer::class, format: 'Y-m-d H:i:s')]
        public readonly ?DateTime $created_at = null,
    ) {}
}
