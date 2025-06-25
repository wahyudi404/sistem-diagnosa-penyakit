<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataTrainingController;
use App\Http\Controllers\DiagnosaController;
use App\Http\Controllers\GejalaController;
use App\Http\Controllers\PenyakitController;
use App\Http\Controllers\RekapController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // halaman yg hanya bisa diakses oleh admin
    Route::middleware(['admin'])->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('users', UserController::class)->except(['show', 'create']);
        Route::resource('penyakit', PenyakitController::class)->except(['create']);
        Route::resource('gejala', GejalaController::class)->except(['create']);
        Route::resource('data-training', DataTrainingController::class)->only(['index', 'create', 'store']);
    });

    // halaman yg bisa diakses oleh admin dan pengguna
    Route::get('/diagnosa', [DiagnosaController::class, 'index'])->name('diagnosa');
    Route::get('/diagnosa/hasil', [DiagnosaController::class, 'showHasil'])->name('diagnosa.hasil');
    Route::post('/diagnosa/hasil', [DiagnosaController::class, 'prosesDiagnosa'])->name('diagnosa.hasil');

    Route::get('/rekap', [RekapController::class, 'index'])->name('rekap.index');
    Route::post('/rekap', [RekapController::class, 'store'])->name('rekap.store');
    Route::delete('/rekap/{rekap}', [RekapController::class, 'destroy'])->name('rekap.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
