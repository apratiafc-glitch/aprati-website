<?php
/**
 * Cache Clearer for cPanel environments
 * Access via: https://sdev.apratifoods.asia/clear-all-cache.php
 */

// Security: Add a secret key to prevent unauthorized access
$SECRET_KEY = 'aprati2024secure'; // Change this!

if (!isset($_GET['key']) || $_GET['key'] !== $SECRET_KEY) {
    die('❌ Unauthorized access. Add ?key=YOUR_SECRET_KEY to the URL');
}

echo "<!DOCTYPE html>
<html>
<head>
    <title>Cache Clearer - Aprati Foods</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            margin: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        h1 { color: #667eea; margin-bottom: 30px; }
        .result { 
            padding: 15px; 
            margin: 10px 0; 
            border-radius: 8px;
            font-family: monospace;
        }
        .success { background: #d4edda; color: #155724; border-left: 4px solid #28a745; }
        .error { background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545; }
        .info { background: #d1ecf1; color: #0c5460; border-left: 4px solid #17a2b8; }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
        }
        .btn:hover { background: #764ba2; }
    </style>
</head>
<body>
    <div class='container'>
        <h1>🧹 Cache Clearer</h1>";

// Change to Laravel root directory
chdir(__DIR__ . '/..');

$results = [];

// Clear route cache
try {
    $output = shell_exec('php artisan route:clear 2>&1');
    if ($output !== null) {
        $results[] = ['type' => 'success', 'message' => '✅ Route cache cleared', 'output' => $output];
    } else {
        $results[] = ['type' => 'error', 'message' => '❌ Could not clear route cache (shell_exec disabled)', 'output' => 'Try manually deleting: bootstrap/cache/routes-v7.php'];
    }
} catch (Exception $e) {
    $results[] = ['type' => 'error', 'message' => '❌ Route cache error: ' . $e->getMessage()];
}

// Clear config cache
try {
    $output = shell_exec('php artisan config:clear 2>&1');
    if ($output !== null) {
        $results[] = ['type' => 'success', 'message' => '✅ Config cache cleared', 'output' => $output];
    } else {
        $results[] = ['type' => 'error', 'message' => '❌ Could not clear config cache (shell_exec disabled)', 'output' => 'Try manually deleting: bootstrap/cache/config.php'];
    }
} catch (Exception $e) {
    $results[] = ['type' => 'error', 'message' => '❌ Config cache error: ' . $e->getMessage()];
}

// Clear application cache
try {
    $output = shell_exec('php artisan cache:clear 2>&1');
    if ($output !== null) {
        $results[] = ['type' => 'success', 'message' => '✅ Application cache cleared', 'output' => $output];
    } else {
        $results[] = ['type' => 'info', 'message' => 'ℹ️ Could not clear app cache (shell_exec disabled)'];
    }
} catch (Exception $e) {
    $results[] = ['type' => 'error', 'message' => '❌ App cache error: ' . $e->getMessage()];
}

// Clear view cache
try {
    $output = shell_exec('php artisan view:clear 2>&1');
    if ($output !== null) {
        $results[] = ['type' => 'success', 'message' => '✅ View cache cleared', 'output' => $output];
    } else {
        $results[] = ['type' => 'info', 'message' => 'ℹ️ Could not clear view cache (shell_exec disabled)'];
    }
} catch (Exception $e) {
    $results[] = ['type' => 'error', 'message' => '❌ View cache error: ' . $e->getMessage()];
}

// Manual cache file deletion if shell_exec is disabled
if (!function_exists('shell_exec') || shell_exec('echo test') === null) {
    $results[] = ['type' => 'info', 'message' => 'ℹ️ shell_exec is disabled, attempting manual cache deletion...'];
    
    // Delete cache files manually
    $cacheFiles = [
        'bootstrap/cache/routes-v7.php',
        'bootstrap/cache/config.php',
        'bootstrap/cache/services.php',
        'bootstrap/cache/packages.php',
    ];
    
    foreach ($cacheFiles as $file) {
        $fullPath = __DIR__ . '/../' . $file;
        if (file_exists($fullPath)) {
            if (unlink($fullPath)) {
                $results[] = ['type' => 'success', 'message' => "✅ Deleted: $file"];
            } else {
                $results[] = ['type' => 'error', 'message' => "❌ Could not delete: $file"];
            }
        }
    }
    
    // Clear storage/framework/cache
    $cacheDir = __DIR__ . '/../storage/framework/cache/data';
    if (is_dir($cacheDir)) {
        $files = glob($cacheDir . '/*');
        $deleted = 0;
        foreach ($files as $file) {
            if (is_file($file) && unlink($file)) {
                $deleted++;
            }
        }
        $results[] = ['type' => 'success', 'message' => "✅ Deleted $deleted cache files from storage/framework/cache"];
    }
}

// Display results
foreach ($results as $result) {
    echo "<div class='result {$result['type']}'>";
    echo "<strong>{$result['message']}</strong>";
    if (isset($result['output']) && !empty($result['output'])) {
        echo "<pre style='margin-top: 10px; white-space: pre-wrap;'>" . htmlspecialchars($result['output']) . "</pre>";
    }
    echo "</div>";
}

echo "<div class='result info'>
        <strong>✅ Cache clearing complete!</strong><br>
        <small>Timestamp: " . date('Y-m-d H:i:s') . "</small>
      </div>";

echo "<a href='/admin-diagnostic.html?t=" . time() . "' class='btn'>Run Diagnostics</a>";
echo " <a href='/' class='btn' style='background: #28a745;'>Go to Homepage</a>";

echo "</div></body></html>";

// Security note
echo "<script>
console.log('⚠️ SECURITY: Remember to delete this file after use or change the SECRET_KEY!');
alert('⚠️ IMPORTANT: For security, delete clear-all-cache.php after use or change the SECRET_KEY in the file!');
</script>";
?>
