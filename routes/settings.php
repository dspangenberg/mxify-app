<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile')->name('app.settings');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('app.profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('app.profile.update')->middleware([HandlePrecognitiveRequests::class]);
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('app.profile.destroy');
    Route::post('settings/profile/verification-notification', [ProfileController::class, 'resendVerificationEmail'])->name('verification.send');

    Route::post('settings/profile/clear-pending-mail-address',
        [ProfileController::class, 'clearPendingMailAddress'])->name('app.profile.clear-pending-mail-address');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('app.password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('app.password.update')->middleware([HandlePrecognitiveRequests::class]);

    Route::get('settings/api-tokens', [PasswordController::class, 'edit'])->name('app.api-tokens.edit');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('app.appearance');
});
