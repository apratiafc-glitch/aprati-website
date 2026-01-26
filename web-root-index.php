<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Laravel is in aprati_backend subdirectory
$laravelRoot = __DIR__ . '/aprati_backend';

// Verify Laravel installation exists
if (!file_exists($laravelRoot . '/vendor/autoload.php')) {
    header('Content-Type: application/json');
    http_response_code(500);
    die(json_encode([
        'error' => 'Composer autoload not found',
        'expected_path' => $laravelRoot . '/vendor/autoload.php',
        'current_dir' => __DIR__,
        'laravel_root' => $laravelRoot,
    ], JSON_PRETTY_PRINT));
}

if (!file_exists($laravelRoot . '/bootstrap/app.php')) {
    header('Content-Type: application/json');
    http_response_code(500);
    die(json_encode([
        'error' => 'Laravel bootstrap not found',
        'expected_path' => $laravelRoot . '/bootstrap/app.php',
    ], JSON_PRETTY_PRINT));
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $laravelRoot . '/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require $laravelRoot . '/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
$app = require_once $laravelRoot . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
