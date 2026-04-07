<?php

use App\Models\App;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get(route('apps.select'))->assertRedirect('/login');
});

test('guests are redirected to the login page for apps list', function () {
    $this->get(route('apps'))->assertRedirect('/login');
});

test('authenticated users can visit app dashboard', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->get(route('app.dashboard', ['app' => $app]))->assertOk();
});
