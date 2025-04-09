<?php

use App\Http\Controllers\AuthReporterController;
use Illuminate\Support\Facades\Route;

Route::get("/register", [AuthReporterController::class, 'showRegister'])->name('register');
Route::post("/register", [AuthReporterController::class, 'register'])->name('register');
Route::get("/login", [AuthReporterController::class, 'showLogin'])->name('login');
Route::post("/login", [AuthReporterController::class, 'login'])->name('login');
Route::post("/logout", [AuthReporterController::class, "logout"])->name('logout');
