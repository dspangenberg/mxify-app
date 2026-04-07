<?php

use App\Http\Controllers\Admin\AppController;
use App\Http\Controllers\App\ApiTokenController;
use App\Http\Controllers\App\AppSelectController;
use App\Http\Controllers\App\RecipientController;
use App\Http\Controllers\App\ZoneController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('apps', [AppSelectController::class, 'index'])->name('apps');
    Route::get('select-app', AppSelectController::class)->name('apps.select');
    Route::post('apps/{app}/select', [AppSelectController::class, 'select'])->name('apps.select-action');
});

Route::middleware(['auth', 'verified', 'app.access'])->prefix('app/{app}')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('app.dashboard');

    Route::get('placeholder', function () {
        return Inertia::render('placeholder');
    })->name('app.placeholder');

    Route::get('zones', [ZoneController::class, 'index'])->name('app.zones.index');
    Route::put('zones/{zone}/check-dns', [ZoneController::class, 'checkDns'])->name('app.zones.check-dns');
    Route::get('zones/create', [ZoneController::class, 'create'])->name('app.zones.create');
    Route::get('zones/{zone}/edit', [ZoneController::class, 'edit'])->name('app.zones.edit');
    Route::put('zones/{zone}', [ZoneController::class, 'update'])->name('app.zones.update')->middleware([HandlePrecognitiveRequests::class]);
    Route::post('zones', [ZoneController::class, 'store'])->name('app.zones.store')->middleware([HandlePrecognitiveRequests::class]);
    Route::delete('zones/{zone}', [ZoneController::class, 'destroy'])->name('app.zones.delete');

    Route::get('api-tokens', [ApiTokenController::class, 'index'])->name('app.api-tokens.index');
    Route::get('api-tokens/create', [ApiTokenController::class, 'create'])->name('app.api-tokens.create');
    Route::post('api-tokens', [ApiTokenController::class, 'store'])->name('app.api-tokens.store')->middleware([HandlePrecognitiveRequests::class]);
    Route::delete('api-tokens/{token}', [ApiTokenController::class, 'destroy'])->name('app.api-tokens.delete');

    Route::get('recipients', [RecipientController::class, 'index'])->name('app.recipients.index');

});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {
    Route::get('apps', [AppController::class, 'index'])->name('admin.apps.index');
    Route::get('apps/create', [AppController::class, 'create'])->name('admin.apps.create');
    Route::get('apps/{app}/edit', [AppController::class, 'edit'])->name('admin.apps.edit');
    Route::put('apps/{app}', [AppController::class, 'update'])->name('admin.apps.update')->middleware([HandlePrecognitiveRequests::class]);
    Route::post('apps', [AppController::class, 'store'])->name('admin.apps.store')->middleware([HandlePrecognitiveRequests::class]);
    // Route::delete('apps/{zone}', [AppController::class, 'destroy'])->name('app.apps.delete');

    Route::get('users', function () {
        return Inertia::render('placeholder');
    })->name('admin.users.index');


});

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
