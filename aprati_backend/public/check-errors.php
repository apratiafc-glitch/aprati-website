<?php
header('Content-Type: text/html; charset=UTF-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel Error Checker</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Courier New', monospace; 
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            padding: 20px;
            color: #fff;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
            padding: 30px;
            backdrop-filter: blur(10px);
        }
        h1 { 
            color: #4fc3f7; 
            margin-bottom: 20px;
            font-size: 28px;
            border-bottom: 3px solid #4fc3f7;
            padding-bottom: 10px;
        }
        h2 { 
            color: #81c784; 
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 20px;
        }
        .box { 
            background: rgba(255,255,255,0.1); 
            padding: 15px; 
            margin: 10px 0; 
            border-radius: 8px;
            border-left: 4px solid #4fc3f7;
        }
        .success { 
            border-left-color: #81c784; 
            background: rgba(129,199,132,0.2);
        }
        .error { 
            border-left-color: #e57373; 
            background: rgba(229,115,115,0.2);
        }
        .warning { 
            border-left-color: #ffd54f; 
            background: rgba(255,213,79,0.2);
        }
        .info { 
            border-left-color: #4fc3f7; 
            background: rgba(79,195,247,0.2);
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 10px 0;
            background: rgba(0,0,0,0.3);
        }
        th, td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        th { 
            background: rgba(79,195,247,0.3); 
            color: #4fc3f7;
            font-weight: bold;
        }
        pre { 
            background: rgba(0,0,0,0.5); 
            padding: 15px; 
            overflow-x: auto;
            border-radius: 5px;
            border: 1px solid rgba(255,255,255,0.1);
            font-size: 12px;
            line-height: 1.4;
        }
        .icon { font-size: 20px; margin-right: 8px; }
        .path-test { 
            margin: 5px 0;
            padding: 8px;
            background: rgba(0,0,0,0.3);
            border-radius: 4px;
        }
        .found { color: #81c784; }
        .missing { color: #e57373; }
        button {
            background: #4fc3f7;
            color: #000;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            margin: 10px 5px 10px 0;
        }
        button:hover { background: #81c784; }
    </style>
</head>
<body>
    <div class="container">
        <h1><span class="icon">🔍</span>Laravel Error Checker</h1>
        <p style="margin-bottom: 20px;">Comprehensive diagnostic for Laravel deployment issues</p>

        <?php
        $errors = [];
        $warnings = [];
        $success = [];
        
        // Current location info
        echo "<h2>📍 Current Location</h2>";
        echo "<table>";
        echo "<tr><th>Property</th><th>Value</th></tr>";
        echo "<tr><td>Current File</td><td>" . __FILE__ . "</td></tr>";
        echo "<tr><td>Current Directory</td><td>" . __DIR__ . "</td></tr>";
        echo "<tr><td>Document Root</td><td>" . ($_SERVER['DOCUMENT_ROOT'] ?? 'N/A') . "</td></tr>";
        echo "<tr><td>Script Name</td><td>" . ($_SERVER['SCRIPT_NAME'] ?? 'N/A') . "</td></tr>";
        echo "<tr><td>Request URI</td><td>" . ($_SERVER['REQUEST_URI'] ?? 'N/A') . "</td></tr>";
        echo "<tr><td>Server Name</td><td>" . ($_SERVER['SERVER_NAME'] ?? 'N/A') . "</td></tr>";
        echo "</table>";

        // Test possible Laravel root paths
        echo "<h2>🔎 Testing Laravel Root Paths</h2>";
        
        $possibleRoots = [
            'Standard (../)' => __DIR__.'/..',
            'Backend in parent (../../backend)' => __DIR__.'/../../backend',
            'Backend named (../../aprati_backend)' => __DIR__.'/../../aprati_backend',
            'Absolute backend path' => '/home/apratifoodscom/backend',
            'Absolute aprati_backend path' => '/home/apratifoodscom/aprati_backend',
            'Parent HTML (../../public_html)' => dirname(__DIR__).'/..',
        ];
        
        $foundRoot = null;
        
        foreach ($possibleRoots as $name => $path) {
            echo "<div class='path-test'>";
            echo "<strong>$name:</strong> <code>$path</code><br>";
            
            $autoload = $path . '/vendor/autoload.php';
            $bootstrap = $path . '/bootstrap/app.php';
            $artisan = $path . '/artisan';
            $env = $path . '/.env';
            
            echo "<div style='margin-left: 20px; margin-top: 5px;'>";
            echo file_exists($autoload) ? "<span class='found'>✅ autoload.php</span>" : "<span class='missing'>❌ autoload.php</span>";
            echo " | ";
            echo file_exists($bootstrap) ? "<span class='found'>✅ bootstrap/app.php</span>" : "<span class='missing'>❌ bootstrap/app.php</span>";
            echo " | ";
            echo file_exists($artisan) ? "<span class='found'>✅ artisan</span>" : "<span class='missing'>❌ artisan</span>";
            echo " | ";
            echo file_exists($env) ? "<span class='found'>✅ .env</span>" : "<span class='missing'>❌ .env</span>";
            echo "</div>";
            
            if (file_exists($autoload) && file_exists($bootstrap)) {
                echo "<div style='margin-top: 5px;'><strong class='found'>✨ This is the correct Laravel root!</strong></div>";
                if ($foundRoot === null) {
                    $foundRoot = $path;
                }
            }
            
            echo "</div>";
        }

        // If we found a root, test Laravel bootstrap
        if ($foundRoot) {
            echo "<div class='box success'>";
            echo "<span class='icon'>✅</span><strong>Laravel Root Found:</strong> $foundRoot";
            echo "</div>";
            
            echo "<h2>🚀 Testing Laravel Bootstrap</h2>";
            
            try {
                require_once $foundRoot . '/vendor/autoload.php';
                echo "<div class='box success'><span class='icon'>✅</span>Composer autoload loaded successfully</div>";
                
                $app = require_once $foundRoot . '/bootstrap/app.php';
                echo "<div class='box success'><span class='icon'>✅</span>Laravel application bootstrapped successfully</div>";
                
                // Try to get routes
                try {
                    $routes = Route::getRoutes();
                    $apiRoutes = [];
                    
                    foreach ($routes as $route) {
                        $uri = $route->uri();
                        if (strpos($uri, 'api/') === 0) {
                            $apiRoutes[$uri] = [
                                'methods' => implode('|', $route->methods()),
                                'action' => $route->getActionName(),
                            ];
                        }
                    }
                    
                    echo "<div class='box success'>";
                    echo "<span class='icon'>✅</span><strong>Found " . count($apiRoutes) . " API routes</strong><br>";
                    
                    if (count($apiRoutes) > 0) {
                        echo "<details style='margin-top: 10px;'>";
                        echo "<summary style='cursor: pointer; color: #4fc3f7;'>View API Routes</summary>";
                        echo "<table style='margin-top: 10px;'>";
                        echo "<tr><th>URI</th><th>Methods</th><th>Action</th></tr>";
                        
                        $count = 0;
                        foreach ($apiRoutes as $uri => $info) {
                            if ($count++ < 20) { // Show first 20
                                echo "<tr>";
                                echo "<td>/$uri</td>";
                                echo "<td>{$info['methods']}</td>";
                                echo "<td style='font-size: 10px;'>{$info['action']}</td>";
                                echo "</tr>";
                            }
                        }
                        
                        if (count($apiRoutes) > 20) {
                            echo "<tr><td colspan='3'>... and " . (count($apiRoutes) - 20) . " more routes</td></tr>";
                        }
                        
                        echo "</table>";
                        echo "</details>";
                    }
                    echo "</div>";
                    
                    // Check specific important routes
                    $importantRoutes = ['api/brands', 'api/information-sections', 'api/header-settings'];
                    echo "<h3 style='color: #4fc3f7; margin-top: 20px;'>Critical Routes Check:</h3>";
                    
                    foreach ($importantRoutes as $route) {
                        if (isset($apiRoutes[$route])) {
                            echo "<div class='box success'><span class='icon'>✅</span>/$route is registered</div>";
                        } else {
                            echo "<div class='box error'><span class='icon'>❌</span>/$route is NOT registered</div>";
                        }
                    }
                    
                } catch (Exception $e) {
                    echo "<div class='box error'><span class='icon'>❌</span><strong>Route loading failed:</strong> " . htmlspecialchars($e->getMessage()) . "</div>";
                }
                
                // Check database connection
                echo "<h2>💾 Database Connection</h2>";
                try {
                    DB::connection()->getPdo();
                    echo "<div class='box success'><span class='icon'>✅</span>Database connection successful</div>";
                    
                    // Check important tables
                    $tables = ['brands', 'information_sections', 'users', 'settings'];
                    echo "<table>";
                    echo "<tr><th>Table</th><th>Records</th><th>Status</th></tr>";
                    
                    foreach ($tables as $table) {
                        try {
                            $count = DB::table($table)->count();
                            echo "<tr><td>$table</td><td>$count</td><td><span class='found'>✅ Exists</span></td></tr>";
                        } catch (Exception $e) {
                            echo "<tr><td>$table</td><td>-</td><td><span class='missing'>❌ Missing</span></td></tr>";
                        }
                    }
                    echo "</table>";
                    
                } catch (Exception $e) {
                    echo "<div class='box error'><span class='icon'>❌</span><strong>Database connection failed:</strong> " . htmlspecialchars($e->getMessage()) . "</div>";
                }
                
            } catch (Exception $e) {
                echo "<div class='box error'>";
                echo "<span class='icon'>❌</span><strong>Laravel bootstrap failed:</strong><br>";
                echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
                echo "<pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
                echo "</div>";
            }
            
        } else {
            echo "<div class='box error'>";
            echo "<span class='icon'>❌</span><strong>CRITICAL: Laravel root not found!</strong><br>";
            echo "None of the tested paths contain a valid Laravel installation.";
            echo "</div>";
        }

        // Check index.php
        echo "<h2>📄 Index.php Check</h2>";
        
        $indexPath = __DIR__ . '/index.php';
        if (file_exists($indexPath)) {
            echo "<div class='box success'><span class='icon'>✅</span>index.php exists</div>";
            
            $indexContent = file_get_contents($indexPath);
            echo "<div class='box info'>";
            echo "<strong>Index.php content preview:</strong>";
            echo "<pre>" . htmlspecialchars(substr($indexContent, 0, 1000)) . (strlen($indexContent) > 1000 ? "\n\n... (truncated)" : "") . "</pre>";
            echo "</div>";
        } else {
            echo "<div class='box error'><span class='icon'>❌</span>index.php NOT FOUND at: $indexPath</div>";
        }

        // Check .htaccess
        echo "<h2>⚙️ .htaccess Check</h2>";
        
        $htaccessPath = __DIR__ . '/.htaccess';
        if (file_exists($htaccessPath)) {
            echo "<div class='box success'><span class='icon'>✅</span>.htaccess exists</div>";
            
            $htaccessContent = file_get_contents($htaccessPath);
            $hasRewriteEngine = stripos($htaccessContent, 'RewriteEngine On') !== false;
            $hasRewriteRule = stripos($htaccessContent, 'RewriteRule') !== false;
            
            if ($hasRewriteEngine && $hasRewriteRule) {
                echo "<div class='box success'><span class='icon'>✅</span>RewriteEngine and RewriteRule found</div>";
            } else {
                echo "<div class='box warning'><span class='icon'>⚠️</span>.htaccess may not be configured correctly</div>";
            }
            
            echo "<div class='box info'>";
            echo "<strong>.htaccess content:</strong>";
            echo "<pre>" . htmlspecialchars($htaccessContent) . "</pre>";
            echo "</div>";
        } else {
            echo "<div class='box error'><span class='icon'>❌</span>.htaccess NOT FOUND</div>";
        }

        // Environment info
        echo "<h2>🖥️ Server Environment</h2>";
        echo "<table>";
        echo "<tr><th>Setting</th><th>Value</th></tr>";
        echo "<tr><td>PHP Version</td><td>" . PHP_VERSION . "</td></tr>";
        echo "<tr><td>PHP SAPI</td><td>" . php_sapi_name() . "</td></tr>";
        echo "<tr><td>Server Software</td><td>" . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . "</td></tr>";
        echo "<tr><td>Memory Limit</td><td>" . ini_get('memory_limit') . "</td></tr>";
        echo "<tr><td>Max Execution Time</td><td>" . ini_get('max_execution_time') . "s</td></tr>";
        echo "<tr><td>Upload Max Filesize</td><td>" . ini_get('upload_max_filesize') . "</td></tr>";
        echo "</table>";

        // Final recommendations
        echo "<h2>💡 Recommendations</h2>";
        
        if ($foundRoot && file_exists($indexPath)) {
            echo "<div class='box success'>";
            echo "<span class='icon'>🎉</span><strong>Everything looks good!</strong><br>";
            echo "Your Laravel installation appears to be properly configured.<br><br>";
            echo "If you're still experiencing issues:<br>";
            echo "1. Clear Laravel caches<br>";
            echo "2. Check file permissions (storage, bootstrap/cache)<br>";
            echo "3. Verify .env configuration<br>";
            echo "4. Check Laravel logs at: storage/logs/laravel.log";
            echo "</div>";
        } else {
            echo "<div class='box error'>";
            echo "<span class='icon'>🚨</span><strong>Issues Found:</strong><br><ul style='margin-left: 20px; margin-top: 10px;'>";
            
            if (!$foundRoot) {
                echo "<li>Laravel root directory not found - upload your Laravel files!</li>";
            }
            if (!file_exists($indexPath)) {
                echo "<li>index.php is missing - copy from your local installation!</li>";
            }
            
            echo "</ul></div>";
            
            echo "<div class='box warning'>";
            echo "<strong>Required Actions:</strong><br>";
            echo "1. Upload Laravel files to: /home/apratifoodscom/aprati_backend/<br>";
            echo "2. Upload index.php to: " . __DIR__ . "/<br>";
            echo "3. Upload .htaccess to: " . __DIR__ . "/<br>";
            echo "4. Run: composer install (in Laravel root)<br>";
            echo "5. Set permissions: chmod -R 775 storage bootstrap/cache";
            echo "</div>";
        }

        echo "<h2>🔄 Quick Actions</h2>";
        echo "<button onclick='location.reload()'>🔄 Refresh Check</button>";
        echo "<button onclick='window.open(\"/api/brands\", \"_blank\")'>🧪 Test /api/brands</button>";
        echo "<button onclick='window.open(\"/\", \"_blank\")'>🏠 View Homepage</button>";
        ?>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.2); opacity: 0.7;">
            <small>Generated: <?php echo date('Y-m-d H:i:s'); ?> | PHP <?php echo PHP_VERSION; ?></small>
        </div>
    </div>
</body>
</html>
