<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryArticleController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KontakController;
use Illuminate\Support\Facades\Route;

Route::get('/', [BlogController::class, 'home'])->name('home');
Route::get('/blog/{blog:slug}', [BlogController::class, 'show'])->name('show');
Route::get('/kontak', [KontakController::class, 'card'])->name('kontak');
Route::get('/kategori/{category}', [CategoryArticleController::class, 'card'])->name('category.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [HomeController::class, 'dashboard'])->name('dashboard');

    Route::get('dashboard/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::post('dashboard/blog/store', [BlogController::class, 'store'])->name('blog.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
