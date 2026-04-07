<?php

namespace Database\Factories;

use App\Models\App;
use App\Models\User;
use App\Models\UserApp;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class UserAppFactory extends Factory
{
    protected $model = UserApp::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'app_id' => App::factory(),
            'user_id' => User::factory(),
        ];
    }
}
