<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// ADJUSTED PATHS FOR CPANEL STRUCTURE
// Assuming structure:
// /home/apratifoodscom/aprati_backend/        <- Laravel root
// /home/apratifoodscom/public_html/sdev.apratifoods.asia/  <- This file

$laravelRoot = __DIR__.'/../../aprati_backend';

$maintenancePath = $laravelRoot.'/storage/framework/maintenance.php';
$autoloadPath = $laravelRoot.'/vendor/autoload.php';
$bootstrapPath = $laravelRoot.'/bootstrap/app.php';

// Determine if the application is in maintenance mode...
if (file_exists($maintenancePath)) {
    require $maintenancePath;
}

// Register the Composer autoloader...
if (!file_exists($autoloadPath)) {
    // Show helpful error message
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'error' => 'Composer autoload not found',
        'message' => 'Please run "composer install" in the Laravel root directory',
        'expected_path' => $autoloadPath,
        'current_dir' => __DIR__,
        'laravel_root' => $laravelRoot,
        'file_exists' => [
            'maintenance' => file_exists($maintenancePath),
            'autoload' => file_exists($autoloadPath),
            'bootstrap' => file_exists($bootstrapPath),
        ]
    ], JSON_PRETTY_PRINT);
    exit;
}

require $autoloadPath;

// Bootstrap Laravel and handle the request...
if (!file_exists($bootstrapPath)) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'error' => 'Laravel bootstrap not found',
        'message' => 'Check file structure',
        'expected_path' => $bootstrapPath,
    ], JSON_PRETTY_PRINT);
    exit;
}

/** @var Application $app */
$app = require_once $bootstrapPath;

$app->handleRequest(Request::capture());
