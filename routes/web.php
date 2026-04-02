<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('app/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('app.dashboard');

    Route::get('app/placeholder', function () {
        return Inertia::render('placeholder');
    })->name('app.placeholder');

});

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
