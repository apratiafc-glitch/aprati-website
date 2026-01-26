<!DOCTYPE html>
<html>
<head>
    <title>🔧 Backend Bootstrap Diagnostic</title>
    <style>
        body {
            font-family: 'Consolas', 'Courier New', monospace;
            background: #0d1117;
            color: #c9d1d9;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #161b22;
            border-radius: 12px;
            padding: 30px;
            border: 1px solid #30363d;
        }
        h1 {
            color: #58a6ff;
            margin-bottom: 30px;
            border-bottom: 2px solid #21262d;
            padding-bottom: 15px;
        }
        h2 {
            color: #7ee787;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        .section {
            background: #0d1117;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #58a6ff;
        }
        .success {
            color: #7ee787;
            font-weight: bold;
        }
        .error {
            color: #ff7b72;
            font-weight: bold;
        }
        .warning {
            color: #f0883e;
            font-weight: bold;
        }
        .info {
            color: #79c0ff;
        }
        pre {
            background: #0d1117;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            border: 1px solid #30363d;
            color: #7ee787;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #21262d;
        }
        th {
            background: #21262d;
            color: #58a6ff;
            font-weight: bold;
        }
        tr:hover {
            background: #161b22;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
        }
        .badge-success {
            background: #238636;
            color: white;
        }
        .badge-error {
            background: #da3633;
            color: white;
        }
        .badge-warning {
            background: #9e6a03;
            color: white;
        }
        .code-block {
            background: #0d1117;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            border-left: 3px solid #58a6ff;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Backend Bootstrap Diagnostic</h1>
        
        <?php
        echo '<div class="section">';
        echo '<h2>📍 Current Location</h2>';
        echo "<div class='code-block'>";
        echo "<strong>Script Directory:</strong> " . __DIR__ . "<br>";
        echo "<strong>Document Root:</strong> " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
        echo "<strong>Script Name:</strong> " . $_SERVER['SCRIPT_NAME'] . "<br>";
        echo "</div>";
        echo '</div>';

        // Check for laravel-bootstrap.php
        echo '<div class="section">';
        echo '<h2>📄 File Checks</h2>';
        
        $filesToCheck = [
            'laravel-bootstrap.php',
            '.htaccess',
            'index.html',
            'index.php'
        ];
        
        echo '<table>';
        echo '<tr><th>File</th><th>Exists</th><th>Size</th><th>Writable</th></tr>';
        
        foreach ($filesToCheck as $file) {
            $path = __DIR__ . '/' . $file;
            $exists = file_exists($path);
            $size = $exists ? filesize($path) : 'N/A';
            $writable = $exists ? (is_writable($path) ? 'Yes' : 'No') : 'N/A';
            
            echo '<tr>';
            echo "<td>{$file}</td>";
            echo "<td>" . ($exists ? "<span class='badge badge-success'>✓ Yes</span>" : "<span class='badge badge-error'>✗ No</span>") . "</td>";
            echo "<td>{$size}</td>";
            echo "<td>{$writable}</td>";
            echo '</tr>';
        }
        
        echo '</table>';
        echo '</div>';

        // Search for Laravel backend
        echo '<div class="section">';
        echo '<h2>🔍 Searching for Laravel Backend</h2>';
        
        $possiblePaths = [
            __DIR__ . '/aprati_backend',
            __DIR__ . '/../aprati_backend',
            '/home/apratifoodscom/public_html/aprati_backend',
            '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
            dirname(__DIR__) . '/aprati_backend',
        ];
        
        echo '<table>';
        echo '<tr><th>Path</th><th>Exists</th><th>Has vendor/</th><th>Has bootstrap/</th><th>Status</th></tr>';
        
        $laravelFound = null;
        
        foreach ($possiblePaths as $path) {
            $exists = is_dir($path);
            $hasVendor = file_exists($path . '/vendor/autoload.php');
            $hasBootstrap = file_exists($path . '/bootstrap/app.php');
            $isValid = $exists && $hasVendor && $hasBootstrap;
            
            if ($isValid && !$laravelFound) {
                $laravelFound = $path;
            }
            
            echo '<tr>';
            echo "<td style='font-family: monospace; font-size: 12px;'>{$path}</td>";
            echo "<td>" . ($exists ? "<span class='success'>✓</span>" : "<span class='error'>✗</span>") . "</td>";
            echo "<td>" . ($hasVendor ? "<span class='success'>✓</span>" : "<span class='error'>✗</span>") . "</td>";
            echo "<td>" . ($hasBootstrap ? "<span class='success'>✓</span>" : "<span class='error'>✗</span>") . "</td>";
            echo "<td>" . ($isValid ? "<span class='badge badge-success'>✓ VALID</span>" : "<span class='badge badge-error'>✗ INVALID</span>") . "</td>";
            echo '</tr>';
        }
        
        echo '</table>';
        
        if ($laravelFound) {
            echo "<div style='background: #1f6feb; color: white; padding: 15px; border-radius: 6px; margin-top: 20px;'>";
            echo "<strong class='success'>✅ Laravel Backend Found!</strong><br>";
            echo "<strong>Location:</strong> <code style='background: rgba(0,0,0,0.3); padding: 3px 8px; border-radius: 3px;'>{$laravelFound}</code>";
            echo "</div>";
        } else {
            echo "<div style='background: #da3633; color: white; padding: 15px; border-radius: 6px; margin-top: 20px;'>";
            echo "<strong class='error'>❌ Laravel Backend NOT Found!</strong><br>";
            echo "Please upload the aprati_backend folder to the server.";
            echo "</div>";
        }
        
        echo '</div>';

        // Check .htaccess content
        echo '<div class="section">';
        echo '<h2>⚙️ .htaccess Configuration</h2>';
        
        $htaccessPath = __DIR__ . '/.htaccess';
        if (file_exists($htaccessPath)) {
            $htaccessContent = file_get_contents($htaccessPath);
            
            // Check for important rules
            $hasApiRoute = strpos($htaccessContent, '/api/') !== false;
            $hasLaravelBootstrap = strpos($htaccessContent, 'laravel-bootstrap.php') !== false;
            $hasRewriteEngine = strpos($htaccessContent, 'RewriteEngine On') !== false;
            
            echo '<table>';
            echo '<tr><th>Check</th><th>Status</th></tr>';
            echo '<tr><td>RewriteEngine On</td><td>' . ($hasRewriteEngine ? "<span class='badge badge-success'>✓ Yes</span>" : "<span class='badge badge-error'>✗ No</span>") . '</td></tr>';
            echo '<tr><td>API Route Rule</td><td>' . ($hasApiRoute ? "<span class='badge badge-success'>✓ Yes</span>" : "<span class='badge badge-error'>✗ No</span>") . '</td></tr>';
            echo '<tr><td>Laravel Bootstrap</td><td>' . ($hasLaravelBootstrap ? "<span class='badge badge-success'>✓ Yes</span>" : "<span class='badge badge-error'>✗ No</span>") . '</td></tr>';
            echo '</table>';
            
            echo '<details style="margin-top: 15px;">';
            echo '<summary style="cursor: pointer; color: #58a6ff; font-weight: bold;">View .htaccess Content</summary>';
            echo '<pre style="margin-top: 10px;">' . htmlspecialchars($htaccessContent) . '</pre>';
            echo '</details>';
        } else {
            echo "<span class='badge badge-error'>✗ .htaccess file not found!</span>";
        }
        
        echo '</div>';

        // Test Laravel Bootstrap
        if ($laravelFound) {
            echo '<div class="section">';
            echo '<h2>🚀 Test Laravel Bootstrap</h2>';
            
            try {
                require_once $laravelFound . '/vendor/autoload.php';
                echo "<span class='badge badge-success'>✓ Composer Autoloader Loaded</span><br><br>";
                
                $app = require_once $laravelFound . '/bootstrap/app.php';
                echo "<span class='badge badge-success'>✓ Laravel Application Bootstrapped</span><br><br>";
                
                $kernel = $app->make('Illuminate\Contracts\Http\Kernel');
                echo "<span class='badge badge-success'>✓ HTTP Kernel Created</span><br><br>";
                
                // Test a simple request
                $request = \Illuminate\Http\Request::create('/api/brands', 'GET');
                $response = $kernel->handle($request);
                
                echo "<strong>Test Request:</strong> GET /api/brands<br>";
                echo "<strong>Response Status:</strong> " . $response->getStatusCode() . "<br>";
                echo "<strong>Content Type:</strong> " . $response->headers->get('Content-Type') . "<br><br>";
                
                $content = $response->getContent();
                if (json_decode($content)) {
                    echo "<span class='badge badge-success'>✓ Valid JSON Response</span><br><br>";
                    echo "<strong>Response Preview:</strong><br>";
                    echo "<pre style='max-height: 300px; overflow-y: auto;'>" . htmlspecialchars(substr($content, 0, 1000)) . "</pre>";
                } else {
                    echo "<span class='badge badge-error'>✗ Not JSON Response</span>";
                }
                
            } catch (Exception $e) {
                echo "<span class='badge badge-error'>✗ Error: " . $e->getMessage() . "</span><br><br>";
                echo "<pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
            }
            
            echo '</div>';
        }

        // Recommendations
        echo '<div class="section">';
        echo '<h2>💡 Recommendations</h2>';
        
        if (!$laravelFound) {
            echo "<div class='error'>❌ CRITICAL: Laravel backend not found!</div>";
            echo "<p>Actions needed:</p>";
            echo "<ol>";
            echo "<li>Upload aprati_backend folder to: /home/apratifoodscom/public_html/</li>";
            echo "<li>Ensure folder contains: vendor/, bootstrap/, app/, etc.</li>";
            echo "<li>Run: composer install (if vendor/ is missing)</li>";
            echo "</ol>";
        } elseif (!file_exists(__DIR__ . '/laravel-bootstrap.php')) {
            echo "<div class='error'>❌ laravel-bootstrap.php is missing!</div>";
            echo "<p>Upload laravel-bootstrap.php to: " . __DIR__ . "</p>";
        } elseif (!file_exists(__DIR__ . '/.htaccess')) {
            echo "<div class='error'>❌ .htaccess is missing!</div>";
            echo "<p>Upload .htaccess to: " . __DIR__ . "</p>";
        } else {
            echo "<div class='success'>✅ All files appear to be in place!</div>";
            echo "<p>If API still returns HTML:</p>";
            echo "<ol>";
            echo "<li>Clear browser cache (Ctrl+Shift+Delete)</li>";
            echo "<li>Try accessing with cache buster: /api/brands?t=" . time() . "</li>";
            echo "<li>Check Apache error logs</li>";
            echo "<li>Ensure mod_rewrite is enabled</li>";
            echo "</ol>";
        }
        
        echo '</div>';
        ?>
    </div>
</body>
</html>
