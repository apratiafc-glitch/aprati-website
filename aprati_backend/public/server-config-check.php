<?php
header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Configuration Check</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
        .success { color: #4ec9b0; }
        .error { color: #f48771; }
        .warning { color: #dcdcaa; }
        .info { color: #9cdcfe; }
        h1 { color: #4ec9b0; border-bottom: 2px solid #4ec9b0; padding-bottom: 10px; }
        h2 { color: #569cd6; margin-top: 30px; }
        .box { background: #252526; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #007acc; }
        table { border-collapse: collapse; width: 100%; margin: 10px 0; }
        td, th { padding: 8px; text-align: left; border-bottom: 1px solid #333; }
        th { color: #569cd6; }
        pre { background: #1e1e1e; padding: 10px; overflow-x: auto; border: 1px solid #333; }
    </style>
</head>
<body>
    <h1>🔍 Server Configuration Diagnostic</h1>
    <p>Checking why API routes are returning 404...</p>

<?php
function checkStatus($condition, $successMsg, $errorMsg) {
    if ($condition) {
        echo "<div class='box success'>✅ $successMsg</div>";
        return true;
    } else {
        echo "<div class='box error'>❌ $errorMsg</div>";
        return false;
    }
}

function checkWarning($condition, $msg) {
    if (!$condition) {
        echo "<div class='box warning'>⚠️ $msg</div>";
    }
}

echo "<h2>1. PHP Environment</h2>";
echo "<table>";
echo "<tr><th>Setting</th><th>Value</th></tr>";
echo "<tr><td>PHP Version</td><td>" . PHP_VERSION . "</td></tr>";
echo "<tr><td>Server Software</td><td>" . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . "</td></tr>";
echo "<tr><td>Document Root</td><td>" . ($_SERVER['DOCUMENT_ROOT'] ?? 'Unknown') . "</td></tr>";
echo "<tr><td>Script Filename</td><td>" . (__FILE__) . "</td></tr>";
echo "<tr><td>Current Directory</td><td>" . getcwd() . "</td></tr>";
echo "<tr><td>PHP SAPI</td><td>" . php_sapi_name() . "</td></tr>";
echo "</table>";

echo "<h2>2. File Structure Check</h2>";

$currentDir = __DIR__;
$parentDir = dirname($currentDir);

checkStatus(
    file_exists($currentDir . '/index.php'),
    "index.php found in current directory",
    "index.php NOT FOUND in current directory - CRITICAL!"
);

checkStatus(
    file_exists($parentDir . '/artisan'),
    "Laravel artisan found in parent directory (correct structure)",
    "Laravel artisan NOT FOUND in parent directory"
);

checkStatus(
    file_exists($parentDir . '/bootstrap/app.php'),
    "Laravel bootstrap found (correct structure)",
    "Laravel bootstrap NOT FOUND"
);

checkStatus(
    file_exists($currentDir . '/.htaccess'),
    ".htaccess file exists",
    ".htaccess file MISSING - Routes will NOT work!"
);

if (file_exists($currentDir . '/.htaccess')) {
    echo "<div class='box info'>";
    echo "<strong>.htaccess contents:</strong>";
    echo "<pre>" . htmlspecialchars(file_get_contents($currentDir . '/.htaccess')) . "</pre>";
    echo "</div>";
}

echo "<h2>3. Laravel Bootstrap Test</h2>";

try {
    if (file_exists($parentDir . '/vendor/autoload.php')) {
        echo "<div class='box success'>✅ Composer autoload found</div>";
        
        require $parentDir . '/vendor/autoload.php';
        
        if (file_exists($parentDir . '/bootstrap/app.php')) {
            $app = require_once $parentDir . '/bootstrap/app.php';
            echo "<div class='box success'>✅ Laravel application bootstrapped successfully</div>";
            
            // Try to get kernel
            $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
            echo "<div class='box success'>✅ HTTP Kernel created</div>";
            
            // Check if we can access routes
            $routes = Route::getRoutes();
            $apiRoutes = [];
            foreach ($routes as $route) {
                $uri = $route->uri();
                if (strpos($uri, 'api/') === 0) {
                    $apiRoutes[] = $uri;
                }
            }
            
            echo "<div class='box info'>";
            echo "<strong>Found " . count($apiRoutes) . " API routes:</strong><br>";
            if (count($apiRoutes) > 0) {
                echo "<ul>";
                foreach (array_slice($apiRoutes, 0, 10) as $route) {
                    echo "<li>$route</li>";
                }
                if (count($apiRoutes) > 10) {
                    echo "<li>... and " . (count($apiRoutes) - 10) . " more</li>";
                }
                echo "</ul>";
            } else {
                echo "<span class='error'>❌ NO API ROUTES FOUND!</span>";
            }
            echo "</div>";
            
        } else {
            echo "<div class='box error'>❌ Cannot find bootstrap/app.php</div>";
        }
    } else {
        echo "<div class='box error'>❌ Composer autoload NOT found</div>";
    }
} catch (Exception $e) {
    echo "<div class='box error'>❌ Laravel bootstrap failed: " . htmlspecialchars($e->getMessage()) . "</div>";
}

echo "<h2>4. Apache/Nginx Module Check</h2>";

if (function_exists('apache_get_modules')) {
    $modules = apache_get_modules();
    $hasRewrite = in_array('mod_rewrite', $modules);
    
    checkStatus(
        $hasRewrite,
        "mod_rewrite is ENABLED",
        "mod_rewrite is NOT ENABLED - Routes will NOT work!"
    );
    
    echo "<div class='box info'>";
    echo "<strong>Loaded Apache modules:</strong><br>";
    echo implode(', ', $modules);
    echo "</div>";
} else {
    echo "<div class='box warning'>⚠️ Cannot check Apache modules (may be Nginx or CGI)</div>";
}

echo "<h2>5. Directory Permissions</h2>";

$checkPaths = [
    $parentDir . '/storage' => 'storage',
    $parentDir . '/storage/logs' => 'storage/logs',
    $parentDir . '/storage/framework' => 'storage/framework',
    $parentDir . '/bootstrap/cache' => 'bootstrap/cache',
];

foreach ($checkPaths as $path => $name) {
    if (file_exists($path)) {
        $perms = substr(sprintf('%o', fileperms($path)), -4);
        $writable = is_writable($path);
        
        if ($writable && ($perms >= '0755')) {
            echo "<div class='box success'>✅ $name: $perms (writable)</div>";
        } else {
            echo "<div class='box error'>❌ $name: $perms (writable: " . ($writable ? 'yes' : 'no') . ")</div>";
        }
    } else {
        echo "<div class='box error'>❌ $name: NOT FOUND</div>";
    }
}

echo "<h2>6. Environment File Check</h2>";

$envPath = $parentDir . '/.env';
if (file_exists($envPath)) {
    echo "<div class='box success'>✅ .env file exists</div>";
    
    $envContent = file_get_contents($envPath);
    $appUrl = '';
    $appEnv = '';
    $appDebug = '';
    
    if (preg_match('/^APP_URL=(.*)$/m', $envContent, $matches)) {
        $appUrl = trim($matches[1]);
    }
    if (preg_match('/^APP_ENV=(.*)$/m', $envContent, $matches)) {
        $appEnv = trim($matches[1]);
    }
    if (preg_match('/^APP_DEBUG=(.*)$/m', $envContent, $matches)) {
        $appDebug = trim($matches[1]);
    }
    
    echo "<table>";
    echo "<tr><td>APP_URL</td><td>" . htmlspecialchars($appUrl) . "</td></tr>";
    echo "<tr><td>APP_ENV</td><td>" . htmlspecialchars($appEnv) . "</td></tr>";
    echo "<tr><td>APP_DEBUG</td><td>" . htmlspecialchars($appDebug) . "</td></tr>";
    echo "</table>";
} else {
    echo "<div class='box error'>❌ .env file NOT FOUND</div>";
}

echo "<h2>7. Request Information</h2>";
echo "<table>";
echo "<tr><th>Variable</th><th>Value</th></tr>";
echo "<tr><td>REQUEST_URI</td><td>" . ($_SERVER['REQUEST_URI'] ?? 'N/A') . "</td></tr>";
echo "<tr><td>SCRIPT_NAME</td><td>" . ($_SERVER['SCRIPT_NAME'] ?? 'N/A') . "</td></tr>";
echo "<tr><td>PHP_SELF</td><td>" . ($_SERVER['PHP_SELF'] ?? 'N/A') . "</td></tr>";
echo "<tr><td>HTTP_HOST</td><td>" . ($_SERVER['HTTP_HOST'] ?? 'N/A') . "</td></tr>";
echo "<tr><td>SERVER_NAME</td><td>" . ($_SERVER['SERVER_NAME'] ?? 'N/A') . "</td></tr>";
echo "</table>";

echo "<h2>8. Test Laravel Index.php</h2>";

$indexPath = $currentDir . '/index.php';
if (file_exists($indexPath)) {
    echo "<div class='box info'>";
    echo "<strong>Testing if index.php can be accessed:</strong><br>";
    echo "Visit: <a href='/index.php' target='_blank' style='color: #4ec9b0;'>https://" . $_SERVER['HTTP_HOST'] . "/index.php</a><br>";
    echo "If this works but /api/brands doesn't, your .htaccess is not being processed.";
    echo "</div>";
} else {
    echo "<div class='box error'>❌ index.php not found!</div>";
}

echo "<h2>9. DIAGNOSIS SUMMARY</h2>";

$issues = [];
$critical = [];

if (!file_exists($currentDir . '/index.php')) {
    $critical[] = "index.php is missing from public directory";
}
if (!file_exists($currentDir . '/.htaccess')) {
    $critical[] = ".htaccess is missing - URL rewriting won't work";
}
if (!file_exists($parentDir . '/vendor/autoload.php')) {
    $critical[] = "Composer dependencies not installed (run: composer install)";
}

if (function_exists('apache_get_modules')) {
    $modules = apache_get_modules();
    if (!in_array('mod_rewrite', $modules)) {
        $critical[] = "mod_rewrite is not enabled in Apache";
    }
}

if (count($critical) > 0) {
    echo "<div class='box error'>";
    echo "<strong>🚨 CRITICAL ISSUES FOUND:</strong><br><ul>";
    foreach ($critical as $issue) {
        echo "<li>$issue</li>";
    }
    echo "</ul></div>";
} else {
    echo "<div class='box success'>";
    echo "<strong>✅ No critical issues detected</strong><br>";
    echo "If API routes still don't work, the problem is likely:<br>";
    echo "<ul>";
    echo "<li>Routes not cached (run: php artisan route:cache)</li>";
    echo "<li>AllowOverride not set to 'All' in Apache config</li>";
    echo "<li>Document root doesn't point to the 'public' folder</li>";
    echo "</ul>";
    echo "</div>";
}

echo "<h2>10. RECOMMENDED ACTIONS</h2>";
echo "<div class='box info'>";
echo "<ol>";
echo "<li><strong>Clear and recache routes:</strong><br><code>php artisan route:clear && php artisan route:cache</code></li>";
echo "<li><strong>Clear config cache:</strong><br><code>php artisan config:clear && php artisan config:cache</code></li>";
echo "<li><strong>Check Apache configuration:</strong> Ensure AllowOverride All is set</li>";
echo "<li><strong>Verify document root:</strong> Must point to 'public' folder, not Laravel root</li>";
echo "<li><strong>Test direct index.php access:</strong> Visit /index.php/api/brands</li>";
echo "</ol>";
echo "</div>";

?>

    <p style="margin-top: 50px; color: #666; border-top: 1px solid #333; padding-top: 20px;">
        Generated: <?php echo date('Y-m-d H:i:s'); ?>
    </p>
</body>
</html>
