<?php

use App\Models\App;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

test('api tokens index page displays tokens', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $token = $app->createToken('Test Token', ['zone:read']);

    $this->get(route('app.api-tokens.index', ['app' => $app]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('tokens.data', fn ($tokens) => count($tokens) === 1)
        );
});

test('api tokens index page shows empty state', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $this->get(route('app.api-tokens.index', ['app' => $app]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('tokens.data', [])
        );
});

test('api token create page shows form', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $this->get(route('app.api-tokens.create', ['app' => $app]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('token.name', '')
            ->where('token.abilities', [])
        );
});

test('can create api token', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $this->post(route('app.api-tokens.store', ['app' => $app]), [
        'name' => 'My API Token',
        'abilities' => ['zone:read', 'zone:create'],
    ])->assertRedirect(route('app.api-tokens.index', ['app' => $app]));

    $this->assertDatabaseHas('personal_access_tokens', [
        'name' => 'My API Token',
        'tokenable_type' => App::class,
        'tokenable_id' => $app->id,
    ]);
});

test('can create api token with expiration', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $this->post(route('app.api-tokens.store', ['app' => $app]), [
        'name' => 'Expiring Token',
        'abilities' => ['zone:read'],
        'expires_at' => '2030-12-31',
    ])->assertRedirect(route('app.api-tokens.index', ['app' => $app]));

    $this->assertDatabaseHas('personal_access_tokens', [
        'name' => 'Expiring Token',
        'tokenable_type' => App::class,
        'tokenable_id' => $app->id,
    ]);
});

test('store validates required fields', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $this->post(route('app.api-tokens.store', ['app' => $app]), [])
        ->assertSessionHasErrors(['name', 'abilities']);
});

test('store validates abilities are valid', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $this->post(route('app.api-tokens.store', ['app' => $app]), [
        'name' => 'Test Token',
        'abilities' => ['invalid-ability'],
    ])->assertSessionHasErrors(['abilities.0']);
});

test('store validates abilities is not empty', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $this->post(route('app.api-tokens.store', ['app' => $app]), [
        'name' => 'Test Token',
        'abilities' => [],
    ])->assertSessionHasErrors(['abilities']);
});

test('can delete api token', function () {
    $user = User::factory()->create();
    $app = App::factory()->create();
    $user->apps()->attach($app);
    Sanctum::actingAs($user);

    $token = $app->createToken('Test Token', ['zone:read']);
    $tokenId = $token->accessToken->id;

    $this->delete(route('app.api-tokens.delete', ['app' => $app, 'token' => $tokenId]))
        ->assertRedirect(route('app.api-tokens.index', ['app' => $app]));

    $this->assertDatabaseMissing('personal_access_tokens', ['id' => $tokenId]);
});
