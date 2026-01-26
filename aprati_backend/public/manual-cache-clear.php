<?php
/**
 * Manual Cache Clear (No exec required)
 * Deletes Laravel cache files directly
 */

header('Content-Type: text/plain');

echo "=== Manual Cache Clear (No exec) ===\n\n";

// Find Laravel installation (check backend locations first)
$possibleRoots = [
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
    dirname(__DIR__) . '/aprati_backend',
    dirname(__DIR__),
    '/home/apratifoodscom/public_html',
];

echo "### Locating Laravel ###\n";
$laravelRoot = null;
foreach ($possibleRoots as $path) {
    if (file_exists($path . '/artisan')) {
        echo "✓ Found at: $path\n\n";
        $laravelRoot = $path;
        break;
    }
}

if (!$laravelRoot) {
    die("❌ Laravel not found\n");
}

// Function to recursively delete directory contents
function clearDirectory($dir) {
    if (!is_dir($dir)) {
        return "Directory not found";
    }
    
    $deleted = 0;
    $failed = 0;
    
    $items = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    
    foreach ($items as $item) {
        try {
            if ($item->isDir()) {
                if (@rmdir($item->getRealPath())) {
                    $deleted++;
                } else {
                    $failed++;
                }
            } else {
                if (@unlink($item->getRealPath())) {
                    $deleted++;
                } else {
                    $failed++;
                }
            }
        } catch (Exception $e) {
            $failed++;
        }
    }
    
    return "Deleted: $deleted | Failed: $failed";
}

// Clear bootstrap/cache
echo "### Clearing bootstrap/cache ###\n";
$bootstrapCache = $laravelRoot . '/bootstrap/cache';
if (is_dir($bootstrapCache)) {
    // Delete specific cache files
    $cacheFiles = [
        'config.php',
        'routes-v7.php',
        'routes.php',
        'services.php',
        'packages.php',
    ];
    
    foreach ($cacheFiles as $file) {
        $filePath = $bootstrapCache . '/' . $file;
        if (file_exists($filePath)) {
            if (@unlink($filePath)) {
                echo "  ✓ Deleted $file\n";
            } else {
                echo "  ✗ Failed to delete $file\n";
            }
        }
    }
} else {
    echo "  ⚠️ Directory not found\n";
}

echo "\n### Clearing storage/framework/cache ###\n";
$frameworkCache = $laravelRoot . '/storage/framework/cache';
if (is_dir($frameworkCache)) {
    $result = clearDirectory($frameworkCache . '/data');
    echo "  $result\n";
} else {
    echo "  ⚠️ Directory not found\n";
}

echo "\n### Clearing storage/framework/views ###\n";
$views = $laravelRoot . '/storage/framework/views';
if (is_dir($views)) {
    $result = clearDirectory($views);
    echo "  $result\n";
} else {
    echo "  ⚠️ Directory not found\n";
}

echo "\n### Clearing storage/framework/sessions ###\n";
$sessions = $laravelRoot . '/storage/framework/sessions';
if (is_dir($sessions)) {
    $result = clearDirectory($sessions);
    echo "  $result\n";
} else {
    echo "  ⚠️ Directory not found\n";
}

// Check .env APP_KEY
echo "\n### Checking Configuration ###\n";
$envPath = $laravelRoot . '/.env';
if (file_exists($envPath)) {
    $envContent = file_get_contents($envPath);
    if (preg_match('/^APP_KEY=(.+)$/m', $envContent, $matches)) {
        $key = trim($matches[1]);
        if (empty($key)) {
            echo "❌ APP_KEY is EMPTY in .env\n";
        } else {
            echo "✓ APP_KEY is set\n";
        }
    } else {
        echo "❌ APP_KEY not found in .env\n";
    }
} else {
    echo "❌ .env file not found\n";
}

// Check vendor
$vendorPath = $laravelRoot . '/vendor';
if (is_dir($vendorPath) && file_exists($vendorPath . '/autoload.php')) {
    echo "✓ Vendor folder exists\n";
} else {
    echo "❌ Vendor folder missing at: $vendorPath\n";
}

echo "\n=== Cache Clearing Complete ===\n";
echo "\nNext steps:\n";
echo "1. Test APIs: https://sdev.apratifoods.asia/config-test.html\n";
echo "2. If still errors, check: https://sdev.apratifoods.asia/api-error-diagnostic.php\n";
