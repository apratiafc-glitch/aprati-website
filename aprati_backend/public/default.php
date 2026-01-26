<?php
/**
 * Main Router with Error Handling
 */

// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Get the path from either URL or query string
$requestUri = $_GET['path'] ?? $_SERVER['REQUEST_URI'] ?? '/';
$requestUri = strtok($requestUri, '?');
$requestUri = rtrim($requestUri, '/');

// API routing
if (strpos($requestUri, '/api/') === 0 || 
    strpos($requestUri, '/storage/') === 0 || 
    strpos($requestUri, '/admin-api/') === 0) {
    
    try {
        // Check if Laravel files exist
        $laravelPath = __DIR__ . '/aprati_backend';
        
        if (!file_exists($laravelPath . '/vendor/autoload.php')) {
            die('❌ Error: Laravel vendor folder not found at: ' . $laravelPath . '/vendor/');
        }
        
        if (!file_exists($laravelPath . '/.env')) {
            die('❌ Error: .env file not found at: ' . $laravelPath . '/.env<br>Please upload your .env file!');
        }
        
        require __DIR__ . '/laravel-bootstrap.php';
        exit;
        
    } catch (Exception $e) {
        http_response_code(500);
        echo '<h1>Laravel Error</h1>';
        echo '<pre>' . htmlspecialchars($e->getMessage()) . '</pre>';
        echo '<pre>' . htmlspecialchars($e->getTraceAsString()) . '</pre>';
        exit;
    }
}

// Homepage or frontend routes
if (is_file(__DIR__ . '/index.html')) {
    readfile(__DIR__ . '/index.html');
} else {
    echo '404 - index.html not found';
}
