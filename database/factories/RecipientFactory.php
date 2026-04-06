<?php

namespace Database\Factories;

use App\Models\Recipient;
use App\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RecipientFactory extends Factory
{
    protected $model = Recipient::class;

    public function definition(): array
    {
        return [
            'description' => $this->faker->text(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'zone_id' => Zone::factory(),
        ];
    }
}
