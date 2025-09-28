<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryArticleController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IklanController;
use App\Http\Controllers\KontakController;
use Illuminate\Support\Facades\Route;

Route::get('/', [BlogController::class, 'home'])->name('home');
Route::get('/blog/{blog:slug}', [BlogController::class, 'show'])->name('show');
Route::get('/kontak', [KontakController::class, 'card'])->name('kontak');
Route::get('/kategori/{category}', [BlogController::class, 'card'])->name('category.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
    Route::get('dashboard/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::post('dashboard/blog/store', [BlogController::class, 'store'])->name('blog.store');
    Route::put('dashboard/blog/update/{blog:slug}', [BlogController::class, 'update'])->name('blog.update');
});

//super_admin
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard/advertisements', [IklanController::class, 'index'])->name('iklan.index');
    Route::post('dashboard/advertisements/store', [IklanController::class, 'store'])->name('iklan.store');
    Route::put('dashboard/advertisements/{iklan}', [IklanController::class, 'update'])->name('iklan.update');
    Route::delete('dashboard/advertisements/{iklan}', [IklanController::class, 'destroy'])->name('iklan.delete');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('/{blog:slug}/{time}', [BlogController::class, 'show'])->name('show2');
