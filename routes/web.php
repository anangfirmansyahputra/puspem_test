<?php

use App\Http\Controllers\AdminComplaintController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\ReporterDashboardController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\TimelineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", [TimelineController::class, 'index'])->name('home');

Route::middleware(['auth', 'role:REPORTER'])->prefix("dashboard")->group(function () {
    Route::get('/', ReporterDashboardController::class)->name('dashboard');
    Route::resource('complaints', ComplaintController::class);
    Route::get("/responses", [ResponseController::class, 'index'])->name('responses.index');
    Route::get("/responses/{id}", [ResponseController::class, 'showResponse'])->name('responses.show');
    Route::post("/responses/{id}", [ResponseController::class, 'feedback'])->name('responses.feedback');
    Route::post("/closed/{id}", [ResponseController::class, 'closed'])->name('responses.closed');
});

Route::middleware(['auth', 'role:ADMIN'])->prefix("admin")->group(function () {
    Route::get('/', AdminDashboardController::class)->name('admin');

    Route::get("/complaints", [AdminComplaintController::class, 'index'])->name('admin.complaints.index');
    Route::get("/complaints/{id}", [AdminComplaintController::class, 'show'])->name('admin.complaints.show');
    Route::post("/complaints/{id}", [AdminComplaintController::class, 'complaintResponses'])->name('admin.response');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
