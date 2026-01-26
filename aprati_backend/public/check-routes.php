<?php
/**
 * Route Checker - Verify web.php configuration
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/html; charset=utf-8');

echo "<html><head><title>Route Checker</title>";
echo "<style>body{font-family:monospace;padding:20px;background:#f5f5f5;}
.ok{color:green;} .error{color:red;} pre{background:#fff;padding:15px;border-radius:8px;overflow:auto;}</style>";
echo "</head><body><h1>🔍 Route Checker</h1>";

$results = [
    'timestamp' => date('Y-m-d H:i:s'),
    'checks' => []
];

// Check if web.php exists
$webPhpPath = __DIR__ . '/../routes/web.php';
$exists = file_exists($webPhpPath);
$results['checks']['web_php_exists'] = $exists;

echo "<p><strong>web.php exists:</strong> <span class='" . ($exists ? 'ok' : 'error') . "'>" . ($exists ? 'YES ✅' : 'NO ❌') . "</span></p>";
echo "<p><strong>Path checked:</strong> $webPhpPath</p>";

// Read web.php content
if ($exists) {
    $content = @file_get_contents($webPhpPath);
    
    if ($content !== false) {
        // Check for sanctum route
        $hasSanctumRoute = strpos($content, '/sanctum/csrf-cookie') !== false;
        $hasSanctumExclusion = strpos($content, '|sanctum') !== false;
        
        echo "<p><strong>Contains Sanctum route:</strong> <span class='" . ($hasSanctumRoute ? 'ok' : 'error') . "'>" . ($hasSanctumRoute ? 'YES ✅' : 'NO ❌') . "</span></p>";
        echo "<p><strong>Has 'sanctum' exclusion:</strong> <span class='" . ($hasSanctumExclusion ? 'ok' : 'error') . "'>" . ($hasSanctumExclusion ? 'YES ✅' : 'NO ❌') . "</span></p>";
        
        // Show first 60 lines
        $lines = explode("\n", $content);
        echo "<h2>web.php Preview (first 60 lines):</h2>";
        echo "<pre>" . htmlspecialchars(implode("\n", array_slice($lines, 0, 60))) . "</pre>";
    } else {
        echo "<p class='error'>Could not read web.php</p>";
    }
}

// Test the sanctum endpoint directly
echo "<h2>Direct Sanctum Test:</h2>";
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://sdev.apratifoods.asia/sanctum/csrf-cookie');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, true);
    $response = @curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "<p><strong>HTTP Status:</strong> <span class='" . ($httpCode == 200 || $httpCode == 204 ? 'ok' : 'error') . "'>$httpCode</span></p>";
    echo "<pre>" . htmlspecialchars(substr($response, 0, 800)) . "</pre>";
} else {
    echo "<p class='error'>cURL not available</p>";
}

echo "<p><em>Generated at: " . date('Y-m-d H:i:s') . "</em></p>";
echo "</body></html>";
?>
