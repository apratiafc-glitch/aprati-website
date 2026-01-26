<?php
// Run Composer Install via Browser
// Visit: https://sdev.apratifoods.asia/run-composer.php?key=aprati2025

if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2025') {
    die('Access denied. Add ?key=aprati2025 to the URL');
}

set_time_limit(300); // 5 minutes

$laravelRoot = '/home/apratifoodscom/public_html/sdev.apratifoods.asia/..';

echo "<pre>";
echo "=== Running Composer Install ===\n\n";
echo "Laravel Root: $laravelRoot\n";
echo "Working Directory: " . getcwd() . "\n\n";

// Change to Laravel root
chdir($laravelRoot);

// Try to run composer
$commands = [
    'composer install --no-dev --optimize-autoloader',
    '/usr/local/bin/composer install --no-dev --optimize-autoloader',
    'php composer.phar install --no-dev --optimize-autoloader',
];

$success = false;
foreach ($commands as $command) {
    echo "Trying: $command\n";
    echo str_repeat('-', 80) . "\n";
    
    $output = [];
    $returnCode = 0;
    exec("$command 2>&1", $output, $returnCode);
    
    echo implode("\n", $output) . "\n\n";
    
    if ($returnCode === 0) {
        echo "✅ SUCCESS!\n";
        $success = true;
        break;
    } else {
        echo "❌ Failed with code: $returnCode\n\n";
    }
}

if (!$success) {
    echo "\n❌ All composer commands failed.\n";
    echo "\nPlease:\n";
    echo "1. ZIP your local vendor folder\n";
    echo "2. Upload vendor.zip to server\n";
    echo "3. Extract it to: $laravelRoot/vendor\n";
}

echo "\n=== Checking vendor folder ===\n";
if (file_exists("$laravelRoot/vendor/autoload.php")) {
    echo "✅ vendor/autoload.php EXISTS\n";
} else {
    echo "❌ vendor/autoload.php NOT FOUND\n";
}

echo "</pre>";
?>
