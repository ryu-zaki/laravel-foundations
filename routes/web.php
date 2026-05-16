<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/api/hello', function () {
    return response()->json([
        'message' => 'Hello from the Laravel backend!',
    ]);
});
