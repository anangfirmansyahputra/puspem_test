<?php

use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->prefix("dashboard")->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('complaints', ComplaintController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
