<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommercialController;
use App\Http\Controllers\LivreurController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SecteurController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VilleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('villes', VilleController::class);
    Route::resource('secteurs', SecteurController::class);
    Route::resource('commerciaux', CommercialController::class)->parameters(['commerciaux' => 'commercial']);
    Route::resource('clients', ClientController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('brands', BrandController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('livreurs', LivreurController::class);

    Route::resource('users', UserController::class);

    // API route pour récupérer les secteurs par ville
    Route::get('/api/secteurs-by-ville', [ClientController::class, 'getSecteursByVille'])->name('api.secteurs-by-ville');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
