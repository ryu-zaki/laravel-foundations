<?php
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/api/hello', function () {
    return response()->json([
        'message' => 'Hello from the Laravel backend!',
    ]);
});

// Double check this isn't accidentally nested inside an auth middleware group!
Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
    });

Route::middleware('guest')->group(function () {
    Route::get('signup', [SignupController::class, 'create'])->name('signup');
    Route::post('signup', [SignupController::class, 'store']);
});

// Protected routes - require authentication
Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'show'])->name('profile');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('logout', [ProfileController::class, 'logout'])->name('logout');
});
