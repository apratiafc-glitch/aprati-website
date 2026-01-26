<?php

/**
 * Laravel Application Entry Point
 * 
 * This file bootstraps Laravel from outside the aprati_backend folder
 * Allows running Laravel API while keeping frontend files in document root
 */

define('LARAVEL_START', microtime(true));

// Try multiple possible locations for Laravel backend
$possiblePaths = [
    __DIR__ . '/aprati_backend',                                          // Same level (CORRECT for your server)
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend', // Absolute path (backup)
    __DIR__ . '/../aprati_backend',                                       // One level up
    '/home/apratifoodscom/public_html/aprati_backend',                   // Root absolute
    dirname(__DIR__) . '/aprati_backend',                                // Alternative up
];

$laravelPath = null;
foreach ($possiblePaths as $path) {
    if (file_exists($path . '/vendor/autoload.php') && file_exists($path . '/bootstrap/app.php')) {
        $laravelPath = $path;
        break;
    }
}

// If Laravel not found, show diagnostic error
if ($laravelPath === null) {
    header('Content-Type: application/json');
    http_response_code(500);
    die(json_encode([
        'success' => false,
        'error' => 'Laravel backend not found',
        'message' => 'Cannot locate aprati_backend folder',
        'searched_paths' => $possiblePaths,
        'current_dir' => __DIR__,
        'hint' => 'Upload aprati_backend folder or adjust paths'
    ], JSON_PRETTY_PRINT));
}

// Register the Composer autoloader
require $laravelPath . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once $laravelPath . '/bootstrap/app.php';

// Handle the request
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
