<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Plank\Mediable\Exceptions\MediaUrlException;
use Plank\Mediable\Mediable;
use Plank\Mediable\MediableInterface;

class App extends Model implements MediableInterface
{
    use HasApiTokens, HasFactory, Mediable;

    protected $fillable = ['name', 'description', 'mx_name', 'mx_ip4', 'mx_ip6', 'website', 'webhook_route', 'address_prefix'];

    protected $attributes = [
        'name' => '',
        'description' => '',
        'mx_name' => '',
        'mx_ip4' => '',
        'website' => '',
        'webhook_route' => '',
        'address_prefix' => '',
    ];

    protected $appends = [
        'avatar_url',
    ];

    public function getAvatarUrlAttribute(): ?string
    {
        try {
            $media = $this->firstMedia('avatar');

            return $media?->getUrl();
        } catch (MediaUrlException) {
            return null;
        }
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_apps');
    }

    public function zones(): HasMany
    {
        return $this->hasMany(Zone::class);
    }
}
