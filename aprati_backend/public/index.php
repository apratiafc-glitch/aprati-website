<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Detect environment and set paths accordingly
// Try multiple possible Laravel root locations
$possibleRoots = [
    __DIR__.'/aprati_backend',                                      // When index.php is in web root
    __DIR__.'/..',                                                  // Standard: public/../
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend', // cPanel: absolute path
    __DIR__.'/../..',                                               // Parent: public/../../
    __DIR__.'/../../aprati_backend',                                // cPanel: ../../aprati_backend/
    '/home/apratifoodscom/aprati_backend',                          // Absolute cPanel path
];

$laravelRoot = null;
foreach ($possibleRoots as $root) {
    if (file_exists($root.'/vendor/autoload.php') && file_exists($root.'/bootstrap/app.php')) {
        $laravelRoot = $root;
        break;
    }
}

// If still not found, use default and let error handling show the issue
if ($laravelRoot === null) {
    $laravelRoot = __DIR__.'/..';
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $laravelRoot.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
if (!file_exists($autoloadPath = $laravelRoot.'/vendor/autoload.php')) {
    header('Content-Type: application/json');
    http_response_code(500);
    die(json_encode([
        'error' => 'Composer autoload not found',
        'message' => 'Please run "composer install" in the Laravel root directory',
        'expected_path' => $autoloadPath,
        'laravel_root' => $laravelRoot,
        'current_dir' => __DIR__
    ], JSON_PRETTY_PRINT));
}
require $autoloadPath;

// Bootstrap Laravel and handle the request...
if (!file_exists($bootstrapPath = $laravelRoot.'/bootstrap/app.php')) {
    header('Content-Type: application/json');
    http_response_code(500);
    die(json_encode([
        'error' => 'Laravel bootstrap not found',
        'message' => 'Check file structure',
        'expected_path' => $bootstrapPath,
    ], JSON_PRETTY_PRINT));
}

/** @var Application $app */
$app = require_once $bootstrapPath;

$app->handleRequest(Request::capture());
