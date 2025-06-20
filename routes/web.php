<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [HomeController::class, 'dashboard'])->name('dashboard');

    Route::get('dashboard/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::post('dashboard/blog/store', [BlogController::class, 'store'])->name('blog.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
