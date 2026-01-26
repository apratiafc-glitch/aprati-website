<?php
/**
 * Test CORS Preflight
 * Access: d:\xammp\htdocs\aprati_web_backup\test-cors-local.php (Run via CLI)
 */

$url = 'https://sdev.apratifoods.asia/api/admin/login';
$origin = 'http://localhost:3000';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "OPTIONS");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_NOBODY, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Origin: $origin",
    "Access-Control-Request-Method: POST",
    "Access-Control-Request-Headers: Content-Type, Authorization"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Testing CORS Options Request for: $url\n";
echo "Origin: $origin\n";
echo "HTTP Status: $httpCode\n\n";
echo "Response Headers:\n";
echo $response;

if ($httpCode == 200 || $httpCode == 204) {
    if (stripos($response, "Access-Control-Allow-Origin: $origin") !== false) {
        echo "\n✅ CORS Configured Correctly!\n";
    } else {
        echo "\n❌ CORS Headers Missing or Incorrect.\n";
    }
} else {
    echo "\n❌ Preflight Request Failed (Blocked/Error).\n";
}
