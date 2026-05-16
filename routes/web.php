<?php
use App\Http\Controllers\Auth\LoginController;
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
