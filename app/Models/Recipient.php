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
        'zone_id'
    ];

    protected string $sqidPrefix = '';

    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }

    protected $appends = [
        'email_address',
    ];

    public function getEmailAddressAttribute(): ?string
    {
        $app = $this->zone->app;
        return $app->address_prefix . $this->sqid . '@' . $this->zone->name;
    }

}
