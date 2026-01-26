<?php
/**
 * Deployment Helper for cPanel (No Terminal Access)
 * 
 * Upload this file to: public/deploy.php
 * Access via: https://sdev.apratifoods.asia/deploy.php
 * 
 * IMPORTANT: Delete this file after deployment for security!
 */

// Security check - change this password
define('DEPLOY_PASSWORD', 'aprati2025secure');

// Check password
if (!isset($_GET['password']) || $_GET['password'] !== DEPLOY_PASSWORD) {
    die('❌ Access Denied! Add ?password=aprati2025secure to URL');
}

echo '<!DOCTYPE html>
<html>
<head>
    <title>Aprati Foods Deployment</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
        .success { color: #4CAF50; background: #e8f5e9; padding: 10px; margin: 10px 0; border-radius: 4px; }
        .error { color: #f44336; background: #ffebee; padding: 10px; margin: 10px 0; border-radius: 4px; }
        .info { color: #2196F3; background: #e3f2fd; padding: 10px; margin: 10px 0; border-radius: 4px; }
        .warning { color: #ff9800; background: #fff3e0; padding: 10px; margin: 10px 0; border-radius: 4px; font-weight: bold; }
        pre { background: #263238; color: #aed581; padding: 15px; border-radius: 4px; overflow-x: auto; }
        .action { background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 5px; text-decoration: none; display: inline-block; }
        .action:hover { background: #45a049; }
    </style>
</head>
<body>
<div class="container">
    <h1>🚀 Aprati Foods Deployment Helper</h1>';

// Find Laravel base path (try multiple methods)
function findBasePath() {
    // Method 1: Check aprati_backend folder in same directory (new structure)
    $basePath = __DIR__ . '/aprati_backend';
    if (file_exists($basePath . '/artisan')) {
        return $basePath;
    }
    
    // Method 2: Go up from public directory (old structure)
    $basePath = dirname(__DIR__);
    if (file_exists($basePath . '/artisan')) {
        return $basePath;
    }
    
    // Method 3: Check if we're already in base
    if (file_exists(__DIR__ . '/../artisan')) {
        return realpath(__DIR__ . '/..');
    }
    
    // Method 3: Search parent directories
    $current = __DIR__;
    for ($i = 0; $i < 5; $i++) {
        $parent = dirname($current);
        if (file_exists($parent . '/artisan')) {
            return $parent;
        }
        $current = $parent;
    }
    
    return dirname(__DIR__);
}

$basePath = findBasePath();
chdir($basePath);

// Function to run artisan command
function runArtisan($command) {
    global $basePath;
    $artisan = $basePath . '/artisan';
    
    if (!file_exists($artisan)) {
        return [
            'success' => false, 
            'output' => "Artisan not found!\nSearched: $artisan\nBase path: $basePath\nCurrent dir: " . getcwd()
        ];
    }
    
    // Try shell_exec first
    if (function_exists('shell_exec')) {
        $phpPath = PHP_BINARY ?: 'php';
        $fullCommand = "$phpPath \"$artisan\" $command 2>&1";
        $output = shell_exec($fullCommand);
        
        return [
            'success' => true,
            'output' => $output ?: 'Command executed (no output)'
        ];
    }
    
    // Fallback: Try to manually execute some commands
    if (strpos($command, 'cache:clear') !== false || strpos($command, ':clear') !== false) {
        return runManualCacheClear($command);
    }
    
    return [
        'success' => false,
        'output' => 'shell_exec is disabled. Please enable it in php.ini or use cPanel terminal.'
    ];
}

// Manual cache clearing for when shell_exec is disabled
function runManualCacheClear($command) {
    global $basePath;
    $cleared = [];
    
    try {
        if (strpos($command, 'config:clear') !== false) {
            $cacheFile = $basePath . '/bootstrap/cache/config.php';
            if (file_exists($cacheFile)) {
                unlink($cacheFile);
                $cleared[] = 'Config cache deleted';
            }
        }
        
        if (strpos($command, 'route:clear') !== false) {
            $cacheFile = $basePath . '/bootstrap/cache/routes-v7.php';
            if (file_exists($cacheFile)) {
                unlink($cacheFile);
                $cleared[] = 'Route cache deleted';
            }
        }
        
        if (strpos($command, 'view:clear') !== false) {
            $viewPath = $basePath . '/storage/framework/views';
            if (is_dir($viewPath)) {
                $files = glob($viewPath . '/*');
                foreach ($files as $file) {
                    if (is_file($file)) unlink($file);
                }
                $cleared[] = 'View cache cleared';
            }
        }
        
        if (strpos($command, 'cache:clear') !== false) {
            $cachePath = $basePath . '/storage/framework/cache/data';
            if (is_dir($cachePath)) {
                $files = glob($cachePath . '/*/*');
                foreach ($files as $file) {
                    if (is_file($file)) unlink($file);
                }
                $cleared[] = 'Application cache cleared';
            }
        }
        
        return [
            'success' => true,
            'output' => implode("\n", $cleared) ?: 'No cache files to clear'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'output' => 'Error: ' . $e->getMessage()
        ];
    }
}

// Get action
$action = $_GET['action'] ?? 'menu';

switch ($action) {
    case 'menu':
        echo '<div class="info">Select an action to perform:</div>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=diagnose" class="action" style="background: #f44336;">🔍 Diagnose 500 Error</a><br>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=clear_cache" class="action">1. Clear All Cache</a>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=optimize" class="action">2. Optimize for Production</a>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=storage_link" class="action">3. Create Storage Link</a>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=migrate" class="action">4. Run Migrations</a>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=info" class="action">5. System Info</a>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=permissions" class="action">6. Check Permissions</a>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=fix_env" class="action">7. Check/Fix .env</a>';
        break;
    
    case 'clear_cache':
        echo '<h2>🧹 Clearing All Cache...</h2>';
        
        $commands = [
            'config:clear' => 'Configuration cache',
            'route:clear' => 'Route cache',
            'view:clear' => 'View cache',
            'cache:clear' => 'Application cache'
        ];
        
        foreach ($commands as $cmd => $label) {
            echo "<div class='info'>Clearing $label...</div>";
            $result = runArtisan($cmd);
            if ($result['success']) {
                echo "<div class='success'>✅ $label cleared</div>";
                if ($result['output']) echo "<pre>{$result['output']}</pre>";
            } else {
                echo "<div class='error'>❌ Failed: {$result['output']}</div>";
            }
        }
        
        echo '<div class="success">✅ All cache cleared successfully!</div>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
        break;
    
    case 'optimize':
        echo '<h2>⚡ Optimizing for Production...</h2>';
        
        $commands = [
            'config:cache' => 'Cache configuration',
            'route:cache' => 'Cache routes',
            'view:cache' => 'Cache views'
        ];
        
        foreach ($commands as $cmd => $label) {
            echo "<div class='info'>$label...</div>";
            $result = runArtisan($cmd);
            if ($result['success']) {
                echo "<div class='success'>✅ $label completed</div>";
                if ($result['output']) echo "<pre>{$result['output']}</pre>";
            } else {
                echo "<div class='error'>❌ Failed: {$result['output']}</div>";
            }
        }
        
        echo '<div class="success">✅ Optimization complete!</div>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
        break;
    
    case 'storage_link':
        echo '<h2>🔗 Creating Storage Link...</h2>';
        $result = runArtisan('storage:link');
        
        if ($result['success']) {
            echo "<div class='success'>✅ Storage link created</div>";
            if ($result['output']) echo "<pre>{$result['output']}</pre>";
        } else {
            echo "<div class='error'>❌ Failed: {$result['output']}</div>";
        }
        
        echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
        break;
    
    case 'migrate':
        echo '<h2>📊 Running Database Migrations...</h2>';
        echo '<div class="warning">⚠️ WARNING: This will modify your database!</div>';
        
        if (isset($_GET['confirm'])) {
            $result = runArtisan('migrate --force');
            
            if ($result['success']) {
                echo "<div class='success'>✅ Migrations completed</div>";
                echo "<pre>{$result['output']}</pre>";
            } else {
                echo "<div class='error'>❌ Migration failed: {$result['output']}</div>";
            }
        } else {
            echo '<div class="info">Are you sure you want to run migrations?</div>';
            echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=migrate&confirm=yes" class="action" style="background: #f44336;">Yes, Run Migrations</a>';
        }
        
        echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
        break;
    
    case 'permissions':
        echo '<h2>🔐 Checking Permissions...</h2>';
        
        $directories = [
            'storage' => $basePath . '/storage',
            'bootstrap/cache' => $basePath . '/bootstrap/cache',
            'public' => $basePath . '/public'
        ];
        
        foreach ($directories as $name => $path) {
            $writable = is_writable($path);
            $perms = substr(sprintf('%o', fileperms($path)), -4);
            
            if ($writable) {
                echo "<div class='success'>✅ $name/ - Writable (Permissions: $perms)</div>";
            } else {
                echo "<div class='error'>❌ $name/ - NOT Writable (Permissions: $perms) - Needs 755 or 775</div>";
            }
        }
        
        echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
        break;
    
    case 'diagnose':
        echo '<h2>🔍 Diagnosing 500 Error...</h2>';
        
        $issues = [];
        $fixes = [];
        
        // Check .env
        $envPath = $basePath . '/.env';
        if (!file_exists($envPath)) {
            $issues[] = '❌ .env file is MISSING!';
            $fixes[] = 'Copy .env.example to .env';
            echo '<div class="error">❌ CRITICAL: .env file not found!</div>';
        } else {
            echo '<div class="success">✅ .env file exists</div>';
            
            // Check APP_KEY
            $envContent = file_get_contents($envPath);
            if (strpos($envContent, 'APP_KEY=') === false || strpos($envContent, 'APP_KEY=base64:') === false) {
                $issues[] = '❌ APP_KEY is missing or invalid!';
                $fixes[] = 'Generate APP_KEY';
                echo '<div class="error">❌ CRITICAL: APP_KEY not set properly!</div>';
            } else {
                echo '<div class="success">✅ APP_KEY is set</div>';
            }
            
            // Check required env vars
            $required = ['DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD'];
            foreach ($required as $var) {
                if (strpos($envContent, $var . '=') === false) {
                    $issues[] = "⚠️ $var not set";
                    echo "<div class='warning'>⚠️ $var not configured</div>";
                }
            }
        }
        
        // Check permissions
        $checkDirs = ['storage', 'bootstrap/cache'];
        foreach ($checkDirs as $dir) {
            $path = $basePath . '/' . $dir;
            if (!is_writable($path)) {
                $issues[] = "❌ $dir not writable";
                $fixes[] = "Set $dir to 755 permissions";
                echo "<div class='error'>❌ $dir is NOT writable</div>";
            } else {
                echo "<div class='success'>✅ $dir is writable</div>";
            }
        }
        
        // Check vendor
        if (!is_dir($basePath . '/vendor')) {
            $issues[] = '❌ vendor/ directory missing!';
            $fixes[] = 'Run: composer install';
            echo '<div class="error">❌ CRITICAL: vendor/ directory not found! Run composer install.</div>';
        } else {
            echo '<div class="success">✅ vendor/ directory exists</div>';
        }
        
        // Check Laravel bootstrap
        if (!file_exists($basePath . '/bootstrap/app.php')) {
            $issues[] = '❌ bootstrap/app.php missing!';
            echo '<div class="error">❌ CRITICAL: bootstrap/app.php not found!</div>';
        } else {
            echo '<div class="success">✅ bootstrap/app.php exists</div>';
        }
        
        // Check logs
        $logPath = $basePath . '/storage/logs/laravel.log';
        if (file_exists($logPath)) {
            $logContent = file_get_contents($logPath);
            $lines = explode("\n", $logContent);
            $recentErrors = array_slice(array_reverse($lines), 0, 20);
            
            echo '<div class="warning"><strong>📄 Recent Log Entries (last 20 lines):</strong></div>';
            echo '<pre style="max-height: 300px; overflow-y: auto;">' . htmlspecialchars(implode("\n", array_reverse($recentErrors))) . '</pre>';
        } else {
            echo '<div class="info">ℹ️ No log file found yet</div>';
        }
        
        // Summary
        if (count($issues) > 0) {
            echo '<div class="error"><h3>🔴 Issues Found:</h3><ul>';
            foreach ($issues as $issue) {
                echo "<li>$issue</li>";
            }
            echo '</ul></div>';
            
            echo '<div class="info"><h3>🔧 Suggested Fixes:</h3><ul>';
            foreach ($fixes as $fix) {
                echo "<li>$fix</li>";
            }
            echo '</ul></div>';
        } else {
            echo '<div class="success"><h3>✅ No obvious issues found!</h3></div>';
            echo '<div class="info">The 500 error might be database-related. Check the logs above.</div>';
        }
        
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=fix_env" class="action">Try Auto-Fix .env</a>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
        break;
    
    case 'fix_env':
        echo '<h2>🔧 Checking/Fixing .env File...</h2>';
        
        $envPath = $basePath . '/.env';
        $envExamplePath = $basePath . '/.env.example';
        
        // Check if .env exists
        if (!file_exists($envPath)) {
            if (file_exists($envExamplePath)) {
                copy($envExamplePath, $envPath);
                echo '<div class="success">✅ Created .env from .env.example</div>';
            } else {
                echo '<div class="error">❌ Neither .env nor .env.example found!</div>';
                echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
                break;
            }
        }
        
        // Check and generate APP_KEY if missing
        $envContent = file_get_contents($envPath);
        if (strpos($envContent, 'APP_KEY=base64:') === false) {
            echo '<div class="info">Generating APP_KEY...</div>';
            $key = 'base64:' . base64_encode(random_bytes(32));
            
            if (preg_match('/APP_KEY=.*\n/', $envContent)) {
                $envContent = preg_replace('/APP_KEY=.*\n/', "APP_KEY=$key\n", $envContent);
            } else {
                $envContent = preg_replace('/APP_KEY=/', "APP_KEY=$key", $envContent);
            }
            
            file_put_contents($envPath, $envContent);
            echo "<div class='success'>✅ Generated new APP_KEY: $key</div>";
        } else {
            echo '<div class="success">✅ APP_KEY already set</div>';
        }
        
        // Display .env status
        echo '<div class="info"><strong>.env Configuration:</strong></div>';
        $lines = explode("\n", $envContent);
        $important = ['APP_NAME', 'APP_ENV', 'APP_DEBUG', 'APP_URL', 'DB_CONNECTION', 'DB_HOST', 'DB_DATABASE', 'DB_USERNAME'];
        
        echo '<pre style="max-height: 400px; overflow-y: auto;">';
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line) || strpos($line, '#') === 0) continue;
            
            foreach ($important as $key) {
                if (strpos($line, $key . '=') === 0) {
                    // Mask passwords
                    if (strpos($line, 'PASSWORD') !== false) {
                        echo htmlspecialchars(preg_replace('/=(.*)/', '=******', $line)) . "\n";
                    } else {
                        echo htmlspecialchars($line) . "\n";
                    }
                    break;
                }
            }
        }
        echo '</pre>';
        
        echo '<div class="warning">⚠️ Make sure to update DB credentials in .env file!</div>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '&action=clear_cache" class="action">Clear Cache</a>';
        echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
        break;
    
    case 'info':
        echo '<h2>ℹ️ System Information</h2>';
        
        echo '<div class="info"><strong>PHP Version:</strong> ' . PHP_VERSION . '</div>';
        echo '<div class="info"><strong>Laravel Path:</strong> ' . $basePath . '</div>';
        echo '<div class="info"><strong>Document Root:</strong> ' . $_SERVER['DOCUMENT_ROOT'] . '</div>';
        echo '<div class="info"><strong>Server Software:</strong> ' . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . '</div>';
        
        // Check .env
        $envPath = $basePath . '/.env';
        if (file_exists($envPath)) {
            echo '<div class="success">✅ .env file exists</div>';
        } else {
            echo '<div class="error">❌ .env file missing!</div>';
        }
        
        // Check frontend files
        $frontendPath = $basePath . '/public/frontend';
        if (is_dir($frontendPath)) {
            $files = count(glob($frontendPath . '/*.html'));
            echo "<div class='success'>✅ Frontend files found ($files HTML files)</div>";
        } else {
            echo '<div class="error">❌ Frontend directory missing!</div>';
        }
        
        // Check _nuxt assets
        $nuxtPath = $basePath . '/public/_nuxt';
        if (is_dir($nuxtPath)) {
            $files = count(glob($nuxtPath . '/*'));
            echo "<div class='success'>✅ Assets found ($files files in _nuxt/)</div>";
        } else {
            echo '<div class="error">❌ _nuxt/ directory missing!</div>';
        }
        
        echo '<a href="?password=' . DEPLOY_PASSWORD . '" class="action">← Back to Menu</a>';
        break;
}

echo '
    <hr style="margin-top: 30px;">
    <div class="warning">
        🔒 SECURITY WARNING: Delete this file after deployment!<br>
        Run: <code>rm public/deploy.php</code>
    </div>
</div>
</body>
</html>';
?>
