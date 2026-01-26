<?php
/**
 * PHP Router - Alternative to .htaccess routing
 * Handles both frontend and API requests
 */

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$requestUri = strtok($requestUri, '?'); // Remove query string
$requestUri = rtrim($requestUri, '/'); // Remove trailing slash

// Route API requests to Laravel
if (strpos($requestUri, '/api/') === 0 || 
    strpos($requestUri, '/storage/') === 0 || 
    strpos($requestUri, '/admin-api/') === 0) {
    
    // Block direct access to aprati_backend (except through API)
    if (strpos($requestUri, '/aprati_backend/') === 0) {
        http_response_code(403);
        die('Access Denied');
    }
    
    // Load Laravel
    require __DIR__ . '/laravel-bootstrap.php';
    exit;
}

// Serve static files directly
$filePath = __DIR__ . $requestUri;
if (is_file($filePath)) {
    // Let Apache serve the file
    return false;
}

// Serve frontend HTML (Nuxt static files)
$htmlFile = __DIR__ . $requestUri . '.html';
if (is_file($htmlFile)) {
    readfile($htmlFile);
    exit;
}

// Fallback to index.html for client-side routing
if (is_file(__DIR__ . '/index.html')) {
    readfile(__DIR__ . '/index.html');
} else {
    http_response_code(404);
    echo '404 - File not found';
}
