<?php
/**
 * Vendor Directory Checker
 * Checks for Laravel vendor directory and provides solutions
 * 
 * Usage: https://sdev.apratifoods.asia/check-vendor.php?password=aprati2025secure
 */

$PASSWORD = 'aprati2025secure';

// Password protection
if (!isset($_GET['password']) || $_GET['password'] !== $PASSWORD) {
    die('❌ Unauthorized Access');
}

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vendor Directory Checker - Aprati Foods</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { 
            color: #333; 
            margin-bottom: 10px; 
            font-size: 32px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 15px;
        }
        .subtitle { color: #666; margin-bottom: 30px; font-size: 16px; }
        .status { 
            padding: 15px; 
            margin: 15px 0; 
            border-radius: 8px; 
            font-weight: 500;
        }
        .success { background: #d4edda; color: #155724; border-left: 4px solid #28a745; }
        .error { background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545; }
        .info { background: #d1ecf1; color: #0c5460; border-left: 4px solid #17a2b8; }
        .warning { background: #fff3cd; color: #856404; border-left: 4px solid #ffc107; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: #f8f9fa;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #dee2e6;
        }
        th {
            background: #e9ecef;
            font-weight: bold;
        }
        .step {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #667eea;
            border-radius: 4px;
        }
        .step-number {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: #667eea;
            color: white;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            font-weight: bold;
        }
        pre {
            background: #282c34;
            color: #abb2bf;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.5;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📦 Vendor Directory Checker</h1>
        <p class="subtitle">Checks for Laravel dependencies and framework files</p>

<?php

// Find Laravel root directory
function findLaravelRoot() {
    $paths = [
        dirname(__DIR__) . '/aprati_backend',  // Laravel in aprati_backend subfolder
        '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
        dirname(dirname(dirname(__DIR__))),
        dirname($_SERVER['DOCUMENT_ROOT']),
        '/home/apratifoodscom/public_html',
    ];
    
    foreach ($paths as $path) {
        $realPath = realpath($path);
        if ($realPath && file_exists($realPath . '/artisan')) {
            return $realPath;
        }
    }
    return false;
}

$laravelRoot = findLaravelRoot();

if (!$laravelRoot) {
    echo '<div class="status error">❌ <strong>Error:</strong> Cannot find Laravel installation</div>';
    exit;
}

echo '<div class="status success">✅ <strong>Laravel Root Found:</strong> ' . htmlspecialchars($laravelRoot) . '</div>';

// Check critical directories and files
$checks = [
    'vendor/' => [
        'path' => $laravelRoot . '/vendor',
        'type' => 'directory',
        'critical' => true,
        'description' => 'Composer dependencies (Laravel framework)'
    ],
    'vendor/autoload.php' => [
        'path' => $laravelRoot . '/vendor/autoload.php',
        'type' => 'file',
        'critical' => true,
        'description' => 'Composer autoloader'
    ],
    'vendor/laravel/' => [
        'path' => $laravelRoot . '/vendor/laravel',
        'type' => 'directory',
        'critical' => true,
        'description' => 'Laravel framework directory'
    ],
    'vendor/laravel/framework/' => [
        'path' => $laravelRoot . '/vendor/laravel/framework',
        'type' => 'directory',
        'critical' => true,
        'description' => 'Laravel framework core'
    ],
    'composer.json' => [
        'path' => $laravelRoot . '/composer.json',
        'type' => 'file',
        'critical' => true,
        'description' => 'Composer dependencies configuration'
    ],
    'composer.lock' => [
        'path' => $laravelRoot . '/composer.lock',
        'type' => 'file',
        'critical' => false,
        'description' => 'Composer lock file (version control)'
    ],
    'app/' => [
        'path' => $laravelRoot . '/app',
        'type' => 'directory',
        'critical' => true,
        'description' => 'Application code'
    ],
    'bootstrap/' => [
        'path' => $laravelRoot . '/bootstrap',
        'type' => 'directory',
        'critical' => true,
        'description' => 'Bootstrap files'
    ],
    'config/' => [
        'path' => $laravelRoot . '/config',
        'type' => 'directory',
        'critical' => true,
        'description' => 'Configuration files'
    ],
    'routes/' => [
        'path' => $laravelRoot . '/routes',
        'type' => 'directory',
        'critical' => true,
        'description' => 'Route definitions'
    ],
];

echo '<h2 style="margin-top: 30px; color: #333;">📋 Laravel Installation Check</h2>';
echo '<table>';
echo '<tr><th>Component</th><th>Status</th><th>Type</th><th>Description</th></tr>';

$hasErrors = false;
$missingCritical = [];

foreach ($checks as $name => $check) {
    $exists = ($check['type'] === 'directory') ? is_dir($check['path']) : file_exists($check['path']);
    $icon = $exists ? '✅' : '❌';
    $statusClass = $exists ? 'success' : ($check['critical'] ? 'error' : 'warning');
    
    if (!$exists && $check['critical']) {
        $hasErrors = true;
        $missingCritical[] = $name;
    }
    
    echo '<tr>';
    echo '<td><strong>' . htmlspecialchars($name) . '</strong></td>';
    echo '<td>' . $icon . ' ' . ($exists ? 'Found' : '<span style="color: #dc3545;">Missing</span>') . '</td>';
    echo '<td>' . ucfirst($check['type']) . '</td>';
    echo '<td>' . htmlspecialchars($check['description']) . '</td>';
    echo '</tr>';
}

echo '</table>';

// Check vendor directory size if it exists
if (is_dir($laravelRoot . '/vendor')) {
    $vendorSize = 0;
    $vendorCount = 0;
    
    try {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($laravelRoot . '/vendor', RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $file) {
            if ($file->isFile()) {
                $vendorSize += $file->getSize();
                $vendorCount++;
            }
        }
    } catch (Exception $e) {
        // Ignore errors
    }
    
    $sizeInMB = round($vendorSize / 1024 / 1024, 2);
    
    echo '<div class="status info">';
    echo '<strong>📊 Vendor Directory Stats:</strong><br>';
    echo '• Size: ' . $sizeInMB . ' MB<br>';
    echo '• Files: ' . number_format($vendorCount) . '<br>';
    echo '</div>';
    
    if ($sizeInMB < 10) {
        echo '<div class="status warning">⚠️ <strong>Warning:</strong> Vendor directory seems too small (' . $sizeInMB . ' MB). Normal Laravel vendor is 30-80 MB.</div>';
    }
}

// Show solutions based on findings
if ($hasErrors) {
    echo '<div class="status error">❌ <strong>Critical files/directories are missing!</strong></div>';
    echo '<div class="status error"><strong>Missing Critical Components:</strong><br>• ' . implode('<br>• ', $missingCritical) . '</div>';
    
    echo '<h2 style="margin-top: 30px; color: #333;">🔧 Solutions</h2>';
    
    if (!is_dir($laravelRoot . '/vendor')) {
        echo '<div class="step">';
        echo '<span class="step-number">1</span>';
        echo '<strong>Upload vendor directory from local development</strong><br>';
        echo 'The <code>vendor/</code> directory from your local Laravel installation must be uploaded to:<br>';
        echo '<code>' . htmlspecialchars($laravelRoot) . '/vendor/</code>';
        echo '</div>';
        
        echo '<div class="status warning">';
        echo '⚠️ <strong>Important:</strong> The vendor directory is typically 30-80 MB and contains thousands of files.<br>';
        echo 'Recommended upload methods:<br>';
        echo '• <strong>Method 1:</strong> Compress locally as <code>vendor.zip</code>, upload via cPanel File Manager, then extract<br>';
        echo '• <strong>Method 2:</strong> Use FTP client with resume capability (FileZilla)<br>';
        echo '• <strong>Method 3:</strong> Use cPanel Terminal with SSH access to run <code>composer install</code><br>';
        echo '</div>';
        
        echo '<div class="step">';
        echo '<span class="step-number">2</span>';
        echo '<strong>Alternative: Run Composer Install via SSH</strong><br>';
        echo 'If you have SSH access, run these commands:';
        echo '<pre>cd ' . htmlspecialchars($laravelRoot) . '
composer install --no-dev --optimize-autoloader</pre>';
        echo '</div>';
        
        echo '<h3 style="margin-top: 20px; color: #333;">📦 How to Compress vendor Locally (Windows PowerShell)</h3>';
        echo '<pre>cd d:\\xammp\\htdocs\\aprati_web_backup\\aprati_backend
Compress-Archive -Path vendor -DestinationPath vendor.zip</pre>';
        
        echo '<p style="margin: 10px 0;">Then upload <code>vendor.zip</code> via cPanel File Manager and extract it.</p>';
    }
    
    if (!file_exists($laravelRoot . '/composer.json')) {
        echo '<div class="step">';
        echo '<span class="step-number">3</span>';
        echo '<strong>Upload composer.json</strong><br>';
        echo 'This file is required for Laravel to work. Upload from your local project.';
        echo '</div>';
    }
} else {
    echo '<div class="status success">✅ <strong>All critical files are present!</strong></div>';
    echo '<div class="status info">ℹ️ You can now proceed with running migrations and testing your application.</div>';
}

// Check PHP version and extensions
echo '<h2 style="margin-top: 30px; color: #333;">🔧 PHP Environment</h2>';
echo '<table>';
echo '<tr><th>Requirement</th><th>Status</th><th>Value</th></tr>';

$phpChecks = [
    'PHP Version >= 8.1' => [
        'status' => version_compare(PHP_VERSION, '8.1.0', '>='),
        'value' => PHP_VERSION
    ],
    'PDO Extension' => [
        'status' => extension_loaded('pdo'),
        'value' => extension_loaded('pdo') ? 'Loaded' : 'Missing'
    ],
    'PDO MySQL' => [
        'status' => extension_loaded('pdo_mysql'),
        'value' => extension_loaded('pdo_mysql') ? 'Loaded' : 'Missing'
    ],
    'Mbstring Extension' => [
        'status' => extension_loaded('mbstring'),
        'value' => extension_loaded('mbstring') ? 'Loaded' : 'Missing'
    ],
    'OpenSSL Extension' => [
        'status' => extension_loaded('openssl'),
        'value' => extension_loaded('openssl') ? 'Loaded' : 'Missing'
    ],
    'Tokenizer Extension' => [
        'status' => extension_loaded('tokenizer'),
        'value' => extension_loaded('tokenizer') ? 'Loaded' : 'Missing'
    ],
    'XML Extension' => [
        'status' => extension_loaded('xml'),
        'value' => extension_loaded('xml') ? 'Loaded' : 'Missing'
    ],
];

foreach ($phpChecks as $name => $check) {
    $icon = $check['status'] ? '✅' : '❌';
    echo '<tr>';
    echo '<td><strong>' . htmlspecialchars($name) . '</strong></td>';
    echo '<td>' . $icon . '</td>';
    echo '<td>' . htmlspecialchars($check['value']) . '</td>';
    echo '</tr>';
}

echo '</table>';

?>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <strong>Note:</strong> Laravel requires the vendor directory with all Composer dependencies to function. 
            This directory is typically excluded from version control and must be uploaded separately or installed via Composer.
        </div>
    </div>
</body>
</html>
