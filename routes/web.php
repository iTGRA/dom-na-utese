<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\ShoreController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public routes — Дом на Утёсе landing
|--------------------------------------------------------------------------
|
| One-page editorial monograph + `/shore` long-read + lead capture POST.
| No auth middleware. All three routes live in `web.php` (not `api.php`)
| so Inertia + CSRF work naturally with the React form.
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/shore', [ShoreController::class, 'index'])->name('shore');

Route::post('/api/lead', [LeadController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('lead.store');
