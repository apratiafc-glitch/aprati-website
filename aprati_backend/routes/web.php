<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Login route for authentication redirects - serve Nuxt app
Route::get('/login', function () {
    // Files are now in public/ directory
    $publicPath = public_path();
    
    // Try index.html (Nuxt SPA entry point)
    $indexPath = $publicPath . '/index.html';
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }
    
    // Fallback to 200.html if it exists
    $fallbackPath = $publicPath . '/200.html';
    if (file_exists($fallbackPath)) {
        return response()->file($fallbackPath);
    }
    
    return response()->json(['error' => 'Frontend not built'], 404);
})->name('login');

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'Laravel API is working!', 'timestamp' => now()]);
});

// Serve Nuxt frontend for all other non-API routes
Route::get('/{any}', function (\Illuminate\Http\Request $request) {
    // Don't handle API routes - let them 404 properly so API routes can handle them
    $uri = $request->path();
    $excludedPrefixes = ['api', 'storage', 'admin-access', 'sanctum', '_nuxt', '_payload'];
    
    foreach ($excludedPrefixes as $prefix) {
        if (str_starts_with($uri, $prefix . '/') || $uri === $prefix) {
            abort(404);
        }
    }
    
    // Files are now in public/ directory
    $publicPath = public_path();
    
    // Try index.html (Nuxt SPA entry point)
    $indexPath = $publicPath . '/index.html';
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }
    
    // Fallback to 200.html if it exists
    $fallbackPath = $publicPath . '/200.html';
    if (file_exists($fallbackPath)) {
        return response()->file($fallbackPath);
    }
    
    // Debug info
    return response()->json([
        'error' => 'Frontend not built',
        'public_path' => $publicPath,
        'checked_paths' => [
            'index.html' => $indexPath,
            '200.html' => $fallbackPath
        ],
        'files_exist' => [
            'index.html' => file_exists($indexPath),
            '200.html' => file_exists($fallbackPath)
        ]
    ], 404);
})->where('any', '.*');

// Auth routes (no middleware needed for login)
Route::post('/api/auth/login', [AuthController::class, 'login']);
Route::post('/api/login', [AuthController::class, 'login']); // Add this for frontend compatibility
Route::post('/api/auth/register', [AuthController::class, 'register']);

// Note: Admin brand routes are now handled in api.php
// All admin routes should be in the API routes file for consistency
