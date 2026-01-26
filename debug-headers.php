<?php
/**
 * Debug Request Headers
 * Access: https://sdev.apratifoods.asia/debug-headers.php?key=aprati2026
 */

if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('Access Denied');
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization');

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT FOUND';

echo json_encode([
    'status' => 'success',
    'message' => 'Header Debug',
    'authorization_received' => $authHeader !== 'NOT FOUND',
    'authorization_value_preview' => substr($authHeader, 0, 15) . '...',
    'all_headers' => $headers,
    'server_auth_vars' => [
        'HTTP_AUTHORIZATION' => $_SERVER['HTTP_AUTHORIZATION'] ?? null,
        'REDIRECT_HTTP_AUTHORIZATION' => $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? null,
        'PHP_AUTH_USER' => $_SERVER['PHP_AUTH_USER'] ?? null,
    ]
], JSON_PRETTY_PRINT);
