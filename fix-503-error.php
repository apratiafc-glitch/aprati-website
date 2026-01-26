<?php
/**
 * 503 Error Fix Script
 * Upload this to your web root and access via browser
 * URL: https://sdev.apratifoods.asia/fix-503-error.php?key=aprati2026
 */

// Security check
if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('Access Denied');
}

echo "<h1>🔧 503 Error Diagnostic & Fix</h1>";
echo "<hr>";

// Check 1: PHP Version
echo "<h2>1. PHP Version</h2>";
echo "<p>PHP Version: <strong>" . phpversion() . "</strong></p>";
echo "<p>✅ Expected: 8.0 or higher for Laravel</p>";
echo "<hr>";

// Check 2: Memory Limit
echo "<h2>2. PHP Configuration</h2>";
echo "<ul>";
echo "<li>Memory Limit: <strong>" . ini_get('memory_limit') . "</strong></li>";
echo "<li>Max Execution Time: <strong>" . ini_get('max_execution_time') . "s</strong></li>";
echo "<li>Upload Max Filesize: <strong>" . ini_get('upload_max_filesize') . "</strong></li>";
echo "<li>Post Max Size: <strong>" . ini_get('post_max_size') . "</strong></li>";
echo "</ul>";
echo "<hr>";

// Check 3: .user.ini files
echo "<h2>3. .user.ini Files Status</h2>";
$userIniFiles = [
    __DIR__ . '/.user.ini',
    __DIR__ . '/../aprati_backend/.user.ini',
    __DIR__ . '/../aprati_backend/public/.user.ini',
];

foreach ($userIniFiles as $file) {
    if (file_exists($file)) {
        echo "<p style='color: orange'>⚠️ Found: $file</p>";
        echo "<pre>" . htmlspecialchars(file_get_contents($file)) . "</pre>";
    } else {
        echo "<p style='color: green'>✅ Not found: $file</p>";
    }
}
echo "<hr>";

// Check 4: Laravel directories
echo "<h2>4. Laravel Directory Check</h2>";
$backendPath = __DIR__ . '/../aprati_backend';
$dirs = [
    'vendor' => $backendPath . '/vendor',
    'storage' => $backendPath . '/storage',
    'bootstrap/cache' => $backendPath . '/bootstrap/cache',
    'public' => $backendPath . '/public',
    '.env' => $backendPath . '/.env',
];

foreach ($dirs as $name => $path) {
    if (file_exists($path)) {
        $perms = substr(sprintf('%o', fileperms($path)), -4);
        echo "<p style='color: green'>✅ $name exists (Permissions: $perms)</p>";
    } else {
        echo "<p style='color: red'>❌ $name NOT FOUND: $path</p>";
    }
}
echo "<hr>";

// Check 5: Try to test Laravel bootstrap
echo "<h2>5. Laravel Bootstrap Test</h2>";
try {
    if (file_exists($backendPath . '/vendor/autoload.php')) {
        require_once $backendPath . '/vendor/autoload.php';
        echo "<p style='color: green'>✅ Autoload loaded successfully</p>";
        
        if (file_exists($backendPath . '/bootstrap/app.php')) {
            $app = require_once $backendPath . '/bootstrap/app.php';
            echo "<p style='color: green'>✅ Laravel app bootstrapped successfully</p>";
            echo "<p>Laravel Version: <strong>" . app()->version() . "</strong></p>";
        } else {
            echo "<p style='color: red'>❌ bootstrap/app.php not found</p>";
        }
    } else {
        echo "<p style='color: red'>❌ vendor/autoload.php not found - run composer install</p>";
    }
} catch (Exception $e) {
    echo "<p style='color: red'>❌ Error bootstrapping Laravel:</p>";
    echo "<pre style='color: red'>" . htmlspecialchars($e->getMessage()) . "</pre>";
    echo "<pre style='color: #666'>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
}
echo "<hr>";

// Check 6: Clear caches (if possible)
echo "<h2>6. Clear Laravel Caches</h2>";
echo "<form method='post'>";
echo "<button type='submit' name='clear_cache' style='padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer;'>Clear All Caches</button>";
echo "</form>";

if (isset($_POST['clear_cache'])) {
    chdir($backendPath);
    echo "<pre>";
    echo "Clearing config cache...\n";
    system('php artisan config:clear 2>&1');
    echo "\nClearing route cache...\n";
    system('php artisan route:clear 2>&1');
    echo "\nClearing view cache...\n";
    system('php artisan view:clear 2>&1');
    echo "\nClearing application cache...\n";
    system('php artisan cache:clear 2>&1');
    echo "</pre>";
    echo "<p style='color: green'>✅ Cache clearing commands executed</p>";
}
echo "<hr>";

// Check 7: Test API endpoint
echo "<h2>7. Test API Endpoint</h2>";
echo "<p><a href='/api/brands' target='_blank' style='padding: 10px 20px; background: #2196F3; color: white; text-decoration: none; border-radius: 4px;'>Test /api/brands</a></p>";
echo "<p><a href='/api/products' target='_blank' style='padding: 10px 20px; background: #2196F3; color: white; text-decoration: none; border-radius: 4px;'>Test /api/products</a></p>";
echo "<hr>";

// Check 8: Laravel logs
echo "<h2>8. Recent Laravel Error Logs</h2>";
$logPath = $backendPath . '/storage/logs/laravel.log';
if (file_exists($logPath)) {
    $logContent = file_get_contents($logPath);
    $lines = explode("\n", $logContent);
    $lastLines = array_slice($lines, -50);
    echo "<pre style='background: #f5f5f5; padding: 15px; overflow: auto; max-height: 400px;'>" . htmlspecialchars(implode("\n", $lastLines)) . "</pre>";
} else {
    echo "<p style='color: orange'>⚠️ Log file not found: $logPath</p>";
}

echo "<hr>";
echo "<h3>🎯 Next Steps Based on Results:</h3>";
echo "<ol>";
echo "<li>If .user.ini files exist and contain problematic values → Rename or fix them</li>";
echo "<li>If Laravel bootstrap fails → Check .env file and file permissions</li>";
echo "<li>If error logs show database errors → Check database connection in .env</li>";
echo "<li>If cache issues → Click 'Clear All Caches' button above</li>";
echo "<li>Check cPanel Error Logs for PHP-FPM specific errors</li>";
echo "</ol>";
