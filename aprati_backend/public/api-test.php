<?php
// Simple API test without Laravel bootstrap
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

echo json_encode([
    'status' => 'success',
    'message' => 'API is reachable',
    'server_info' => [
        'php_version' => PHP_VERSION,
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'N/A',
        'request_uri' => $_SERVER['REQUEST_URI'] ?? 'N/A',
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'N/A',
        'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'N/A',
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'N/A',
    ],
    'laravel_check' => file_exists(__DIR__ . '/../bootstrap/app.php') ? 'Found' : 'Not Found',
    'index_php' => file_exists(__DIR__ . '/index.php') ? 'Found' : 'Not Found',
    'htaccess' => file_exists(__DIR__ . '/.htaccess') ? 'Found' : 'Not Found',
]);
