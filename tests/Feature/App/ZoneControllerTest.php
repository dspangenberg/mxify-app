<?php

use App\Models\App;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('zones index page displays zones', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Zone::factory()->count(3)->create(['app_id' => $app->id]);

    $this->actingAs($user);

    $this->get(route('app.zones.index', ['app' => $app]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('zones.data', fn ($zones) => count($zones) === 3)
        );
});

test('zones index page shows empty state', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->get(route('app.zones.index', ['app' => $app]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('zones.data', [])
        );
});

test('zone create page shows form', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->get(route('app.zones.create', ['app' => $app]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('zone.id', null)
            ->where('zone.name', '')
        );
});

test('can create zone', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->post(route('app.zones.store', ['app' => $app]), [
        'name' => 'testzone.com',
        'webhook_url' => 'https://webhook.example.com',
        'description' => 'Test zone',
    ])->assertRedirect(route('app.zones.index', ['app' => $app]));

    $this->assertDatabaseHas('zones', [
        'name' => 'testzone.com',
        'webhook_url' => 'https://webhook.example.com',
        'description' => 'Test zone',
        'app_id' => $app->id,
    ]);
});

test('store validates required fields', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->post(route('app.zones.store', ['app' => $app]), [])
        ->assertSessionHasErrors(['name', 'webhook_url']);
});

test('store validates unique zone name per app', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    Zone::factory()->create([
        'app_id' => $app->id,
        'name' => 'existingzone.com',
    ]);

    $this->actingAs($user);

    $this->post(route('app.zones.store', ['app' => $app]), [
        'name' => 'existingzone.com',
        'webhook_url' => 'https://webhook.example.com',
    ])->assertSessionHasErrors(['name']);
});

test('store validates webhook URL format', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $this->actingAs($user);

    $this->post(route('app.zones.store', ['app' => $app]), [
        'name' => 'testzone.com',
        'webhook_url' => 'not-a-valid-url',
    ])->assertSessionHasErrors(['webhook_url']);
});

test('zone edit page shows form with zone data', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $zone = Zone::factory()->create(['app_id' => $app->id]);

    $this->actingAs($user);

    $this->get(route('app.zones.edit', ['app' => $app, 'zone' => $zone]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('zone.id', $zone->id)
            ->where('zone.name', $zone->name)
        );
});

test('can update zone', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $zone = Zone::factory()->create(['app_id' => $app->id]);

    $this->actingAs($user);

    $this->put(route('app.zones.update', ['app' => $app, 'zone' => $zone]), [
        'name' => $zone->name,
        'webhook_url' => 'https://updated.example.com',
        'description' => 'Updated description',
    ])->assertRedirect(route('app.zones.index', ['app' => $app]));

    $this->assertDatabaseHas('zones', [
        'id' => $zone->id,
        'webhook_url' => 'https://updated.example.com',
        'description' => 'Updated description',
    ]);
});

test('update validates required fields', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $zone = Zone::factory()->create(['app_id' => $app->id]);

    $this->actingAs($user);

    $this->put(route('app.zones.update', ['app' => $app, 'zone' => $zone]), [])
        ->assertSessionHasErrors(['name', 'webhook_url']);
});

test('can delete zone', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);

    $zone = Zone::factory()->create(['app_id' => $app->id]);

    $this->actingAs($user);

    $this->delete(route('app.zones.delete', ['app' => $app, 'zone' => $zone]))
        ->assertRedirectBack();

    $this->assertDatabaseMissing('zones', ['id' => $zone->id]);
});
