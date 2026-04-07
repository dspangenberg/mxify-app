<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Password;
use Str;

use function Laravel\Prompts\text;

class CreateAdminCommand extends Command
{
    protected $signature = 'create:admin';

    protected $description = 'Command description';

    public function handle(): void
    {
        $user = User::get();
        if ($user->count() > 0) {
            $this->info('You can add additional users in the frontend.');

            return;
        }

        $name = text(
            label: 'What is your name?',
            required: 'Your name is required.'
        );

        $email = text(
            label: 'What is your email?',
            validate: ['name' => 'required|email|unique:users']
        );

        User::create([
            'name' => $name,
            'email' => $email,
            'is_admin' => true,
            'password' => Str::random(24),
        ]);

        Password::sendResetLink(
            ['email' => $email]
        );
    }
}
