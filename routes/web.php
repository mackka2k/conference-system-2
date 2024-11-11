<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ConferenceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/user/update-role', [UserController::class, 'updateRole'])->name('user.updateRole');

Route::get('/conferences', [ConferenceController::class, 'index'])->name('conferences.index');

Route::post('/conferences/{conference}/register', [RegistrationController::class, 'register'])
    ->name('conferences.register')
    ->middleware('auth');

Route::get('/conferences/{conference}/registered-users', [RegistrationController::class, 'showRegisteredUsers'])
    ->name('conferences.registeredUsers')
    ->middleware('auth');

Route::get('/conferences/create', [ConferenceController::class, 'create'])
    ->name('conferences.create')
    ->middleware('auth');

Route::post('/conferences', [ConferenceController::class, 'store'])
    ->name('conferences.store')
    ->middleware('auth');

// Route to show the conference
Route::get('/conferences/{conference}/edit', [ConferenceController::class, 'edit'])
    ->name('conferences.edit')
    ->middleware('auth');

// Route to update the conference
Route::put('/conferences/{conference}', [ConferenceController::class, 'update'])
    ->name('conferences.update')
    ->middleware('auth');

Route::delete('/conferences/{conference}', [ConferenceController::class, 'destroy'])
    ->name('conferences.destroy')
    ->middleware('auth');

Route::get('/admin/users', [AdminController::class, 'getAllUsers'])
    ->name('admin.getAllUsers')
    ->middleware('auth');

require __DIR__ . '/auth.php';
