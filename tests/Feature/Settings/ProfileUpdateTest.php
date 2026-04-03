<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

test('profile page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/settings/profile');

    $response->assertOk();
});

test('profile information can be updated', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/settings/profile');

    $user->refresh();

    expect($user->name)->toBe('Test User');
    expect($user->email)->toBe('test@example.com');
    expect($user->email_verified_at)->toBeNull();
});

test('email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => 'Test User',
            'email' => $user->email,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/settings/profile');

    expect($user->refresh()->email_verified_at)->not->toBeNull();
});

test('changing email address sets pending_email', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => $user->name,
            'email' => 'newemail@example.com',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/settings/profile');

    $user->refresh();

    expect($user->email)->toBe($user->getOriginal('email'));
    expect($user->pending_email)->toBe('newemail@example.com');
});

test('avatar can be uploaded', function () {
    Storage::fake('media');
    $user = User::factory()->create();

    $file = UploadedFile::fake()->image('avatar.jpg', 200, 200);

    $response = $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $file,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/settings/profile');

    $user->refresh();
    expect($user->avatar_url)->not->toBeNull();
    expect($user->hasMedia('avatar'))->toBeTrue();
});

test('avatar can be removed', function () {
    Storage::fake('media');
    $user = User::factory()->create();

    $file = UploadedFile::fake()->image('avatar.jpg', 200, 200);

    $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $file,
        ]);

    $user->refresh();
    expect($user->hasMedia('avatar'))->toBeTrue();

    $response = $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => $user->name,
            'email' => $user->email,
            'remove_avatar' => true,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/settings/profile');

    $user->refresh();
    expect($user->hasMedia('avatar'))->toBeFalse();
});

test('avatar upload accepts valid mime types', function (string $extension) {
    Storage::fake('media');
    $user = User::factory()->create();

    $file = UploadedFile::fake()->image("avatar.{$extension}", 200, 200);

    $response = $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $file,
        ]);

    $response->assertSessionHasNoErrors();
    expect($user->fresh()->hasMedia('avatar'))->toBeTrue();
})->with([
    'png' => 'png',
    'jpg' => 'jpg',
    'jpeg' => 'jpeg',
]);

test('avatar upload rejects invalid mime types', function () {
    Storage::fake('media');
    $user = User::factory()->create();

    $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

    $response = $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $file,
        ]);

    $response->assertSessionHasErrors('avatar');
});

test('pending email can be cleared', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->patch('/settings/profile', [
            'name' => $user->name,
            'email' => 'pending@example.com',
        ]);

    $user->refresh();
    expect($user->pending_email)->toBe('pending@example.com');

    $response = $this
        ->actingAs($user)
        ->post('/settings/profile/clear-pending-mail-address');

    $response->assertRedirect();

    $user->refresh();
    expect($user->pending_email)->toBeNull();
});

test('user can delete their account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->delete('/settings/profile', [
            'password' => 'password',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/');

    $this->assertGuest();
    expect($user->fresh())->toBeNull();
});

test('correct password must be provided to delete account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from('/settings/profile')
        ->delete('/settings/profile', [
            'password' => 'wrong-password',
        ]);

    $response
        ->assertSessionHasErrors('password')
        ->assertRedirect('/settings/profile');

    expect($user->fresh())->not->toBeNull();
});
