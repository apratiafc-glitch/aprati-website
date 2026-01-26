<?php
/**
 * Vendor Installation Check
 */

echo "=== Vendor Installation Check ===\n\n";

// Check multiple possible locations
$possibleRoots = [
    dirname(__DIR__) . '/aprati_backend',  // Backend subfolder
    dirname(__DIR__),                       // Parent folder (current structure)
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia',
    '/home/apratifoodscom/public_html',
];

echo "### Searching for Laravel Installation ###\n";
$laravelRoot = null;
$vendorPath = null;

foreach ($possibleRoots as $path) {
    $testVendorPath = $path . '/vendor';
    echo "Checking: $path\n";
    if (is_dir($testVendorPath)) {
        echo "  ✓ Found vendor folder!\n";
        $laravelRoot = $path;
        $vendorPath = $testVendorPath;
        break;
    } else {
        echo "  ✗ No vendor folder\n";
    }
}

if (!$laravelRoot) {
    echo "\n❌ Could not locate vendor folder in any expected location\n";
    echo "Searched locations above. Please upload vendor.zip to one of these paths.\n\n";
    echo "=== Check Complete ===\n";
    exit;
}

$autoloadPath = $vendorPath . '/autoload.php';

echo "\nLaravel Root: $laravelRoot\n";
echo "Vendor Path: $vendorPath\n\n";

echo "### Checking Vendor Folder ###\n";
if (is_dir($vendorPath)) {
    echo "✓ Vendor folder EXISTS\n";
    
    // Count subdirectories
    $dirs = array_filter(glob($vendorPath . '/*'), 'is_dir');
    echo "Subdirectories: " . count($dirs) . "\n\n";
    
    // Check autoload.php
    echo "### Checking Autoload ###\n";
    if (file_exists($autoloadPath)) {
        echo "✓ vendor/autoload.php EXISTS\n";
        
        // Try to load autoload
        try {
            require_once $autoloadPath;
            echo "✓ Autoload loaded successfully\n\n";
            
            // Check if Laravel classes are available
            echo "### Checking Laravel Classes ###\n";
            $classes = [
                'Illuminate\Foundation\Application',
                'Illuminate\Http\Request',
                'Illuminate\Support\Facades\Route',
                'Illuminate\Database\Capsule\Manager',
            ];
            
            foreach ($classes as $class) {
                if (class_exists($class)) {
                    echo "✓ $class - FOUND\n";
                } else {
                    echo "❌ $class - NOT FOUND\n";
                }
            }
            
        } catch (Exception $e) {
            echo "❌ Error loading autoload: " . $e->getMessage() . "\n";
        }
        
    } else {
        echo "❌ vendor/autoload.php NOT FOUND\n";
        echo "The vendor folder may not have been extracted properly.\n";
    }
    
} else {
    echo "❌ Vendor folder DOES NOT EXIST\n\n";
    
    // Check if composer is available
    echo "### Checking Composer ###\n";
    $composerPaths = [
        '/usr/local/bin/composer',
        '/usr/bin/composer',
        'composer',
    ];
    
    $composerFound = false;
    foreach ($composerPaths as $composerPath) {
        exec("$composerPath --version 2>&1", $output, $return);
        if ($return === 0) {
            echo "✓ Composer FOUND at: $composerPath\n";
            echo "Version: " . $output[0] . "\n\n";
            $composerFound = true;
            
            echo "### Auto-Install Option ###\n";
            echo "To install vendor dependencies automatically, visit:\n";
            echo "https://sdev.apratifoods.asia/install-vendor.php\n\n";
            break;
        }
    }
    
    if (!$composerFound) {
        echo "❌ Composer NOT FOUND on server\n\n";
    }
    
    echo "### Manual Upload Instructions ###\n";
    echo "1. Upload vendor.zip to: /home/apratifoodscom/public_html/\n";
    echo "2. Extract vendor.zip using cPanel File Manager\n";
    echo "3. Verify vendor folder exists at: $vendorPath\n";
    echo "4. Refresh this page to verify\n";
}

echo "\n=== Check Complete ===\n";
