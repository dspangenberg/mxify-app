<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use RedExplosion\Sqids\Concerns\HasSqids;

class Recipient extends Model
{
    use HasFactory, HasSqids;

    protected $fillable = [
        'description',
        'zone_id',
        'token',
    ];

    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }

    protected $appends = [
        'email_address',
    ];

    public function getEmailAddressAttribute(): ?string
    {
        $zone = $this->zone;
        $app = $zone?->app;

        if (!$zone || !$app) {
            return null;
        }

        return $app->address_prefix.$this->sqid.'@'.$zone->name;
    }

}
