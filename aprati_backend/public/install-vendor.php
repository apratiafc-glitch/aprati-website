<?php
/**
 * Automatic Vendor Installation Script
 * Runs composer install on the server
 */

set_time_limit(300); // 5 minutes

echo "=== Vendor Installation Script ===\n\n";

$laravelRoot = dirname(__DIR__);
$vendorPath = $laravelRoot . '/vendor';

echo "Laravel Root: $laravelRoot\n\n";

// Check if vendor already exists
if (is_dir($vendorPath)) {
    echo "✓ Vendor folder already exists\n";
    echo "To reinstall, delete the vendor folder first.\n\n";
    echo "=== Installation Complete ===\n";
    exit;
}

// Check if exec is enabled
echo "### Checking Server Capabilities ###\n";
if (function_exists('exec')) {
    echo "✓ exec() function available\n";
} else {
    echo "❌ exec() function is DISABLED\n";
    echo "Your hosting has disabled shell commands.\n\n";
    echo "Please upload vendor.zip manually:\n";
    echo "1. Upload to: /home/apratifoodscom/public_html/vendor.zip\n";
    echo "2. Extract using cPanel File Manager\n";
    echo "3. Verify at: https://sdev.apratifoods.asia/check-vendor.php\n\n";
    echo "=== Installation Cannot Proceed ===\n";
    exit;
}

// Find composer
echo "\n### Locating Composer ###\n";
flush();

$composerPaths = [
    '/usr/local/bin/composer',
    '/usr/bin/composer',
    'composer',
];

$composerCommand = null;
foreach ($composerPaths as $path) {
    echo "Checking $path... ";
    flush();
    
    $output = [];
    $return = -1;
    @exec("$path --version 2>&1", $output, $return);
    
    if ($return === 0 && !empty($output)) {
        $composerCommand = $path;
        echo "✓ FOUND\n";
        echo "Version: " . $output[0] . "\n\n";
        break;
    } else {
        echo "✗ not found\n";
    }
}

if (!$composerCommand) {
    echo "\n❌ ERROR: Composer not found on server\n\n";
    echo "Please upload vendor.zip manually:\n";
    echo "1. Upload to: /home/apratifoodscom/public_html/vendor.zip\n";
    echo "2. Extract using cPanel File Manager\n";
    echo "3. Verify at: https://sdev.apratifoods.asia/check-vendor.php\n\n";
    echo "=== Installation Cannot Proceed ===\n";
    exit;
}

// Check if composer.json exists
$composerJson = $laravelRoot . '/composer.json';
if (!file_exists($composerJson)) {
    echo "❌ ERROR: composer.json not found at $composerJson\n";
    exit;
}

echo "✓ composer.json found\n\n";

// Run composer install
echo "### Running Composer Install ###\n";
echo "This may take 2-5 minutes. Please wait...\n\n";
echo "Command: cd $laravelRoot && $composerCommand install --no-dev --optimize-autoloader\n\n";
echo "Output:\n";
echo str_repeat("-", 60) . "\n";

// Change to Laravel directory and run composer
chdir($laravelRoot);

// Use passthru to show real-time output
passthru("$composerCommand install --no-dev --optimize-autoloader 2>&1", $return);

echo "\n" . str_repeat("-", 60) . "\n\n";

if ($return === 0) {
    echo "✓ SUCCESS: Vendor dependencies installed!\n\n";
    
    // Verify installation
    if (is_dir($vendorPath) && file_exists($vendorPath . '/autoload.php')) {
        echo "✓ Vendor folder verified\n";
        echo "✓ Autoload file verified\n\n";
        
        echo "### Next Steps ###\n";
        echo "1. Visit: https://sdev.apratifoods.asia/clear-cache.php\n";
        echo "2. Test APIs: https://sdev.apratifoods.asia/config-test.html\n";
        echo "3. Delete this script for security\n";
    } else {
        echo "⚠️ WARNING: Vendor folder not found after installation\n";
        echo "Please check the output above for errors.\n";
    }
} else {
    echo "❌ ERROR: Composer install failed (exit code: $return)\n";
    echo "Please check the output above for error details.\n\n";
    echo "Alternative: Upload vendor.zip manually\n";
}

echo "\n=== Installation Complete ===\n";
