<?php

namespace Database\Factories;

use App\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ZoneFactory extends Factory
{
    protected $model = Zone::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'webhook_url' => $this->faker->url(),
            'is_dns_created' => $this->faker->boolean(),
            'dns_checked_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
