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

test('authenticated users without apps can visit the apps page', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('apps'))->assertOk();
});

test('authenticated users without apps are redirected to home from select', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('apps.select'))->assertRedirect('/');
});

test('authenticated users with apps can visit the apps page', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->get(route('apps'))->assertOk();
});

test('authenticated users with apps are redirected to first app from select', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->get(route('apps.select'))->assertRedirect(route('app.dashboard', ['app' => $app]));
});

test('authenticated users can visit app dashboard', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->get(route('app.dashboard', ['app' => $app]))->assertOk();
});
