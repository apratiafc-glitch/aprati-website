<?php
/**
 * Cache Clearing Script
 * 
 * This script clears Laravel caches when SSH access is not available.
 * Upload to: /home/apratifoodscom/public_html/sdev.apratifoods.asia/clear-cache.php
 * Access at: https://sdev.apratifoods.asia/clear-cache.php
 * 
 * IMPORTANT: Delete this file after use for security!
 */

// Security: Only allow from specific IPs or add a secret key
$allowed_ips = ['127.0.0.1', '::1']; // Add your IP here
$secret = isset($_GET['secret']) ? $_GET['secret'] : '';

// Uncomment to enable IP restriction:
// if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
//     die('Access denied');
// }

// Or uncomment to use secret key:
// if ($secret !== 'your-secret-key-here') {
//     die('Invalid secret key');
// }

header('Content-Type: text/plain');

echo "=== Laravel Cache Clear Script ===\n\n";

// Check multiple possible locations for Laravel (backend first)
$possibleRoots = [
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
    dirname(__DIR__) . '/aprati_backend',
    dirname(__DIR__),
    '/home/apratifoodscom/public_html',
];

echo "### Searching for Laravel Installation ###\n";
$laravel_dir = null;
foreach ($possibleRoots as $path) {
    $testArtisan = $path . '/artisan';
    echo "Checking: $path\n";
    if (file_exists($testArtisan)) {
        echo "  ✓ Found artisan!\n";
        $laravel_dir = $path;
        break;
    } else {
        echo "  ✗ No artisan\n";
    }
}

if (!$laravel_dir) {
    die("\n❌ ERROR: Could not locate Laravel installation\n");
}

// Check if exec is enabled
if (!function_exists('exec')) {
    die("\n❌ ERROR: exec() function is disabled on this server\nContact your hosting provider to enable it.\n");
}

// Verify vendor folder exists
$vendorPath = $laravel_dir . '/vendor';
echo "### Checking Dependencies ###\n";
echo "Vendor path: $vendorPath\n";
if (!is_dir($vendorPath)) {
    die("❌ ERROR: Vendor folder not found at $vendorPath\nPlease move vendor folder to correct location.\n");
}
echo "✓ Vendor folder found\n\n";

chdir($laravel_dir);
echo "Working directory: " . getcwd() . "\n\n";

// Function to run artisan command
function runArtisan($command) {
    echo "Running: php artisan $command\n";
    echo str_repeat('-', 50) . "\n";
    flush();
    
    $output = [];
    $return = -1;
    @exec("php artisan $command 2>&1", $output, $return);
    
    foreach ($output as $line) {
        echo $line . "\n";
    }
    
    echo "\nReturn code: $return\n";
    echo str_repeat('=', 50) . "\n\n";
    
    return $return === 0;
}

// Clear caches
$commands = [
    'config:clear' => 'Configuration cache',
    'cache:clear' => 'Application cache',
    'route:clear' => 'Route cache',
    'view:clear' => 'View cache',
];

$results = [];

foreach ($commands as $cmd => $label) {
    echo "\n### Clearing $label ###\n\n";
    $results[$label] = runArtisan($cmd);
}

// Summary
echo "\n\n=== SUMMARY ===\n\n";
foreach ($results as $label => $success) {
    $status = $success ? '✓ SUCCESS' : '✗ FAILED';
    echo "$status - $label\n";
}

// Check if APP_KEY is set
echo "\n\n=== Configuration Check ===\n\n";
echo "Checking APP_KEY...\n";
$output = [];
exec("php artisan tinker --execute=\"echo config('app.key') ? 'APP_KEY is set' : 'APP_KEY is EMPTY';\"", $output);
echo implode("\n", $output) . "\n";

echo "\n\n=== DONE ===\n\n";
echo "🎉 All caches cleared!\n\n";
echo "⚠️  IMPORTANT: Delete this file now for security!\n";
echo "    File location: " . __FILE__ . "\n";

// Optional: Auto-delete this file (uncomment if you want)
// unlink(__FILE__);
// echo "\n✓ This file has been automatically deleted.\n";
?>
