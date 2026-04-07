<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Zone extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'webhook_url',
        'is_dns_created',
        'dns_checked_at',
    ];

    protected $attributes = [
        'name' => '',
        'description' => '',
        'webhook_url' => '',
        'is_dns_created' => false,
    ];

    protected function casts(): array
    {
        return [
            'dns_checked_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }

    protected $appends = [
        'real_webhook_url',
    ];

    public function getRealWebhookUrlAttribute(): ?string
    {
        return $this->app ? $this->webhook_url . '/' . $this->app->webhook_route : $this->webhook_url;
    }

    public function app(): BelongsTo
    {
        return $this->belongsTo(App::class);
    }

    public function recipient(): HasMany
    {
        return $this->hasMany(Recipient::class);
    }
}
