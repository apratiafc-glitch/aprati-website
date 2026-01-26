<?php
$url = 'https://sdev.apratifoods.asia/api/admin/login';
$origin = 'http://localhost:3000';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "OPTIONS");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true); // We need headers to check for Access-Control-Allow-Origin
curl_setopt($ch, CURLOPT_NOBODY, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Origin: $origin", "Access-Control-Request-Method: POST"]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
echo "HTTP_STATUS:$httpCode\n";
if (stripos($response, "Access-Control-Allow-Origin") !== false) {
    echo "CORS_HEADER:FOUND\n";
} else {
    echo "CORS_HEADER:MISSING\n";
}
