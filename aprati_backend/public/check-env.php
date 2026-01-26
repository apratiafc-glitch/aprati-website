<?php
/**
 * ENV File Diagnostic Script
 * Checks if .env file exists and contains APP_KEY
 */

echo "=== ENV File Diagnostic ===\n\n";

// Try multiple possible locations for Laravel backend
$possibleRoots = [
    dirname(__DIR__) . '/aprati_backend',  // Same level as check-env.php
    dirname(__DIR__),                       // One level up from public
    __DIR__ . '/../aprati_backend',        // Relative to public folder
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
];

echo "### Searching for Laravel backend ###\n";
$laravelRoot = null;
foreach ($possibleRoots as $path) {
    $envPath = $path . '/.env';
    echo "Checking: $path\n";
    if (file_exists($envPath)) {
        echo "  ✓ Found .env file!\n";
        $laravelRoot = $path;
        break;
    } else {
        echo "  ✗ Not found\n";
    }
}
echo "\n";

if (!$laravelRoot) {
    echo "❌ Could not locate Laravel backend folder\n";
    echo "Current script location: " . __DIR__ . "\n";
    exit;
}

$envPath = $laravelRoot . '/.env';
echo "Laravel Root: $laravelRoot\n";
echo "Using .env path: $envPath\n\n";

// Check if .env file exists
echo "### Checking .env file ###\n";
if (file_exists($envPath)) {
    echo "✓ .env file EXISTS\n\n";
    
    // Check file permissions
    $perms = substr(sprintf('%o', fileperms($envPath)), -4);
    echo "File permissions: $perms\n";
    
    if (is_readable($envPath)) {
        echo "✓ .env file is READABLE\n\n";
        
        // Read the file
        $envContent = file_get_contents($envPath);
        
        // Check for APP_KEY
        echo "### Checking APP_KEY ###\n";
        if (preg_match('/^APP_KEY=(.+)$/m', $envContent, $matches)) {
            $appKey = trim($matches[1]);
            if (empty($appKey)) {
                echo "❌ APP_KEY exists but is EMPTY\n";
                echo "Line found: APP_KEY=\n\n";
            } else {
                echo "✓ APP_KEY is SET\n";
                echo "Value: " . substr($appKey, 0, 20) . "...\n";
                echo "Length: " . strlen($appKey) . " characters\n\n";
            }
        } else {
            echo "❌ APP_KEY line NOT FOUND in .env file\n\n";
        }
        
        // Check other important settings
        echo "### Other Settings ###\n";
        $settings = ['APP_ENV', 'APP_DEBUG', 'APP_URL', 'DB_CONNECTION'];
        foreach ($settings as $setting) {
            if (preg_match("/^$setting=(.*)$/m", $envContent, $matches)) {
                $value = trim($matches[1]);
                echo "$setting = " . ($value ?: '(empty)') . "\n";
            } else {
                echo "$setting = (not found)\n";
            }
        }
        echo "\n";
        
        // Try to load Laravel's config
        echo "### Testing Laravel Bootstrap ###\n";
        $bootstrapPath = $laravelRoot . '/bootstrap/app.php';
        if (file_exists($bootstrapPath)) {
            echo "✓ bootstrap/app.php exists\n";
            try {
                require_once $bootstrapPath;
                echo "✓ Laravel bootstrap loaded successfully\n";
                
                // Try to get config value
                if (function_exists('config')) {
                    $configAppKey = config('app.key');
                    if ($configAppKey) {
                        echo "✓ config('app.key') returns: " . substr($configAppKey, 0, 20) . "...\n";
                    } else {
                        echo "❌ config('app.key') is EMPTY\n";
                    }
                }
            } catch (Exception $e) {
                echo "❌ Error loading Laravel: " . $e->getMessage() . "\n";
            }
        } else {
            echo "❌ bootstrap/app.php NOT FOUND\n";
        }
        
    } else {
        echo "❌ .env file is NOT READABLE\n";
        echo "Check file permissions (should be 644)\n";
    }
} else {
    echo "❌ .env file DOES NOT EXIST\n";
    echo "Please upload .env file to: $envPath\n";
}

echo "\n=== Diagnostic Complete ===\n";
