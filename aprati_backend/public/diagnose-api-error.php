<?php
/**
 * API Error Diagnostic Tool
 * Access via: https://sdev.apratifoods.asia/diagnose-api-error.php?password=aprati2025secure
 */

// Password protection
$password = $_GET['password'] ?? '';

if ($password !== 'aprati2025secure') {
    header('HTTP/1.1 403 Forbidden');
    die('Unauthorized');
}

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>API Error Diagnostic</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 10px;
        }
        h2 {
            color: #2196F3;
            margin-top: 30px;
            border-left: 4px solid #2196F3;
            padding-left: 10px;
        }
        pre {
            background: #f8f8f8;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            border: 1px solid #ddd;
            font-size: 13px;
        }
        .success {
            color: #4CAF50;
            font-weight: bold;
        }
        .error {
            color: #f44336;
            font-weight: bold;
        }
        .warning {
            color: #ff9800;
            font-weight: bold;
        }
        .info {
            color: #2196F3;
            font-weight: bold;
        }
        .section {
            margin: 20px 0;
            padding: 20px;
            background: #fafafa;
            border-radius: 4px;
            border-left: 4px solid #4CAF50;
        }
        .error-section {
            border-left-color: #f44336;
        }
        .warning-section {
            border-left-color: #ff9800;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #4CAF50;
            color: white;
            font-weight: bold;
        }
        tr:hover {
            background: #f5f5f5;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: bold;
        }
        .badge-success {
            background: #4CAF50;
            color: white;
        }
        .badge-error {
            background: #f44336;
            color: white;
        }
        .badge-warning {
            background: #ff9800;
            color: white;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>🔍 API Error Diagnostic Tool</h1>
    <p><span class="info">Timestamp:</span> <?= date('Y-m-d H:i:s') ?></p>

<?php

// ==========================================
// 1. Find Laravel Root
// ==========================================
echo "<h2>📁 Step 1: Locating Laravel Application</h2>";

$possibleRoots = [
    __DIR__ . '/../aprati_backend',
    __DIR__ . '/../../aprati_backend',
    __DIR__ . '/aprati_backend',
    '/home/apratifoodscom/public_html/aprati_backend',
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
];

$laravelRoot = null;
echo "<div class='section'>";
echo "<table><tr><th>Path</th><th>Status</th></tr>";

foreach ($possibleRoots as $root) {
    $artisanExists = file_exists($root . '/artisan');
    $vendorExists = file_exists($root . '/vendor/autoload.php');
    $bootstrapExists = file_exists($root . '/bootstrap/app.php');
    
    if ($artisanExists && $vendorExists && $bootstrapExists) {
        echo "<tr><td>$root</td><td><span class='badge badge-success'>✅ FOUND</span></td></tr>";
        $laravelRoot = $root;
        break;
    } else {
        $missing = [];
        if (!$artisanExists) $missing[] = 'artisan';
        if (!$vendorExists) $missing[] = 'vendor';
        if (!$bootstrapExists) $missing[] = 'bootstrap';
        
        echo "<tr><td>$root</td><td><span class='badge badge-error'>❌ Missing: " . implode(', ', $missing) . "</span></td></tr>";
    }
}

echo "</table></div>";

if (!$laravelRoot) {
    echo "<div class='section error-section'><span class='error'>❌ CRITICAL: Cannot find Laravel installation!</span></div>";
    echo "</div></body></html>";
    exit;
}

echo "<div class='section'><span class='success'>✅ Laravel Found:</span> <code>$laravelRoot</code></div>";

// ==========================================
// 2. Check .env File
// ==========================================
echo "<h2>⚙️ Step 2: Environment Configuration</h2>";

$envPath = $laravelRoot . '/.env';
echo "<div class='section'>";

if (!file_exists($envPath)) {
    echo "<span class='error'>❌ .env file NOT FOUND at: $envPath</span>";
} else {
    echo "<span class='success'>✅ .env file exists</span><br>";
    
    $envContent = file_get_contents($envPath);
    $envLines = explode("\n", $envContent);
    
    // Check critical settings
    $criticalKeys = ['APP_KEY', 'APP_ENV', 'APP_DEBUG', 'APP_URL', 'DB_CONNECTION', 'DB_DATABASE', 'DB_USERNAME'];
    
    echo "<h3>Critical Settings:</h3>";
    echo "<table><tr><th>Key</th><th>Value</th><th>Status</th></tr>";
    
    foreach ($criticalKeys as $key) {
        $found = false;
        $value = '';
        
        foreach ($envLines as $line) {
            if (preg_match("/^$key=(.*)$/", trim($line), $matches)) {
                $found = true;
                $value = $matches[1];
                break;
            }
        }
        
        if ($found) {
            // Hide sensitive values
            $displayValue = $value;
            if (in_array($key, ['APP_KEY', 'DB_PASSWORD']) && !empty($value)) {
                $displayValue = '***hidden***';
            }
            
            if (empty($value)) {
                echo "<tr><td>$key</td><td>(empty)</td><td><span class='badge badge-warning'>⚠️ EMPTY</span></td></tr>";
            } else {
                echo "<tr><td>$key</td><td>$displayValue</td><td><span class='badge badge-success'>✅ SET</span></td></tr>";
            }
        } else {
            echo "<tr><td>$key</td><td>-</td><td><span class='badge badge-error'>❌ MISSING</span></td></tr>";
        }
    }
    
    echo "</table>";
}

echo "</div>";

// ==========================================
// 3. Bootstrap Laravel and Test
// ==========================================
echo "<h2>🚀 Step 3: Bootstrapping Laravel</h2>";
echo "<div class='section'>";

try {
    require_once $laravelRoot . '/vendor/autoload.php';
    echo "<span class='success'>✅ Composer autoloader loaded</span><br>";
    
    $app = require_once $laravelRoot . '/bootstrap/app.php';
    echo "<span class='success'>✅ Laravel application bootstrapped</span><br>";
    
    $kernel = $app->make('Illuminate\Contracts\Http\Kernel');
    echo "<span class='success'>✅ HTTP Kernel created</span><br>";
    
} catch (Exception $e) {
    echo "<span class='error'>❌ Bootstrap failed:</span><br>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
    echo "<pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
    echo "</div></div></body></html>";
    exit;
}

echo "</div>";

// ==========================================
// 4. Test Database Connection
// ==========================================
echo "<h2>🗄️ Step 4: Database Connection Test</h2>";
echo "<div class='section'>";

try {
    $pdo = DB::connection()->getPdo();
    echo "<span class='success'>✅ Database connected successfully!</span><br>";
    echo "Driver: " . DB::connection()->getDriverName() . "<br>";
    echo "Database: " . DB::connection()->getDatabaseName() . "<br>";
    
    // Test query
    $tables = DB::select('SHOW TABLES');
    echo "Tables count: " . count($tables) . "<br>";
    
} catch (Exception $e) {
    echo "<span class='error'>❌ Database connection failed:</span><br>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
}

echo "</div>";

// ==========================================
// 5. Test API Endpoint
// ==========================================
echo "<h2>🌐 Step 5: API Endpoint Test (/api/brands)</h2>";
echo "<div class='section'>";

try {
    // Create a request to /api/brands
    $request = Illuminate\Http\Request::create('/api/brands', 'GET');
    
    echo "<span class='info'>Testing GET /api/brands...</span><br><br>";
    
    $response = $kernel->handle($request);
    
    $statusCode = $response->getStatusCode();
    $content = $response->getContent();
    
    echo "<strong>HTTP Status:</strong> ";
    if ($statusCode === 200) {
        echo "<span class='badge badge-success'>$statusCode OK</span><br><br>";
    } else {
        echo "<span class='badge badge-error'>$statusCode ERROR</span><br><br>";
    }
    
    echo "<strong>Response Headers:</strong>";
    echo "<pre>";
    foreach ($response->headers->all() as $key => $values) {
        echo "$key: " . implode(', ', $values) . "\n";
    }
    echo "</pre>";
    
    echo "<strong>Response Body:</strong>";
    echo "<pre>";
    
    // Try to format JSON
    $json = json_decode($content, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo htmlspecialchars(json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    } else {
        echo htmlspecialchars(substr($content, 0, 2000));
        if (strlen($content) > 2000) {
            echo "\n\n... (truncated, total length: " . strlen($content) . " bytes)";
        }
    }
    echo "</pre>";
    
    // Success or error analysis
    if ($statusCode === 200) {
        echo "<div style='background: #e8f5e9; padding: 15px; border-radius: 4px; margin-top: 15px;'>";
        echo "<span class='success'>✅ API ENDPOINT IS WORKING!</span><br>";
        echo "The /api/brands endpoint returned a successful response.";
        echo "</div>";
    } else {
        echo "<div style='background: #ffebee; padding: 15px; border-radius: 4px; margin-top: 15px;'>";
        echo "<span class='error'>❌ API ENDPOINT RETURNED ERROR</span><br>";
        echo "Status code: $statusCode<br>";
        echo "Please check the response body above for details.";
        echo "</div>";
    }
    
} catch (Exception $e) {
    echo "<span class='error'>❌ API test failed with exception:</span><br>";
    echo "<pre>";
    echo "Message: " . htmlspecialchars($e->getMessage()) . "\n\n";
    echo "File: " . htmlspecialchars($e->getFile()) . ":" . $e->getLine() . "\n\n";
    echo "Trace:\n" . htmlspecialchars($e->getTraceAsString());
    echo "</pre>";
}

echo "</div>";

// ==========================================
// 6. Check Laravel Logs
// ==========================================
echo "<h2>📝 Step 6: Recent Laravel Logs</h2>";
echo "<div class='section'>";

$logPath = $laravelRoot . '/storage/logs/laravel.log';

if (file_exists($logPath)) {
    echo "<span class='success'>✅ Log file exists</span><br>";
    echo "Path: <code>$logPath</code><br>";
    echo "Size: " . number_format(filesize($logPath)) . " bytes<br><br>";
    
    $lines = file($logPath);
    if ($lines) {
        $lastLines = array_slice($lines, -100);
        
        echo "<strong>Last 100 lines:</strong>";
        echo "<pre style='max-height: 400px; overflow-y: scroll;'>";
        echo htmlspecialchars(implode('', $lastLines));
        echo "</pre>";
    } else {
        echo "<span class='info'>Log file is empty</span>";
    }
} else {
    echo "<span class='warning'>⚠️ Log file not found at: $logPath</span>";
}

echo "</div>";

// ==========================================
// 7. File Permissions Check
// ==========================================
echo "<h2>🔒 Step 7: File Permissions</h2>";
echo "<div class='section'>";

$dirsToCheck = [
    'storage',
    'storage/logs',
    'storage/framework',
    'storage/framework/cache',
    'storage/framework/sessions',
    'storage/framework/views',
    'bootstrap/cache',
];

echo "<table><tr><th>Directory</th><th>Exists</th><th>Writable</th><th>Permissions</th></tr>";

foreach ($dirsToCheck as $dir) {
    $path = $laravelRoot . '/' . $dir;
    $exists = file_exists($path);
    $writable = is_writable($path);
    $perms = $exists ? substr(sprintf('%o', fileperms($path)), -4) : '-';
    
    $statusBadge = $exists && $writable ? 
        "<span class='badge badge-success'>✅ OK</span>" : 
        "<span class='badge badge-error'>❌ ISSUE</span>";
    
    echo "<tr>";
    echo "<td>$dir</td>";
    echo "<td>" . ($exists ? '✅' : '❌') . "</td>";
    echo "<td>" . ($writable ? '✅' : '❌') . "</td>";
    echo "<td>$perms</td>";
    echo "</tr>";
}

echo "</table>";
echo "</div>";

// ==========================================
// 8. Summary and Recommendations
// ==========================================
echo "<h2>📊 Summary and Recommendations</h2>";
echo "<div class='section'>";

echo "<h3>Status Summary:</h3>";
echo "<ul>";
echo "<li>Laravel Location: <span class='success'>✅</span></li>";
echo "<li>.env Configuration: " . (file_exists($envPath) ? "<span class='success'>✅</span>" : "<span class='error'>❌</span>") . "</li>";
echo "<li>Database Connection: (see step 4)</li>";
echo "<li>API Endpoint: (see step 5)</li>";
echo "</ul>";

echo "<h3>Next Steps:</h3>";
echo "<ol>";
echo "<li>Review the API endpoint test results in Step 5</li>";
echo "<li>Check Laravel logs in Step 6 for any errors</li>";
echo "<li>Verify file permissions in Step 7</li>";
echo "<li>If issues persist, run database migrations via <a href='run-migrations-secure.php?password=$password'>Migration Runner</a></li>";
echo "</ol>";

echo "</div>";

?>

</div>
</body>
</html>
