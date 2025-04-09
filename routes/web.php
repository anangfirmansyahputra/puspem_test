<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\TimelineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", [TimelineController::class, 'index'])->name('home');

Route::middleware(['auth'])->prefix("dashboard")->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('complaints', ComplaintController::class);
});

Route::middleware(['auth'])->prefix("admin")->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
