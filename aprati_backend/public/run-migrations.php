<?php
/**
 * Simple Migration Runner
 * Upload to: /public_html/sdev.apratifoods.asia/
 * Access: https://sdev.apratifoods.asia/run-migrations.php?password=aprati2025secure
 * 
 * Runs Laravel migrations without exec() function
 */

// Security
$REQUIRED_PASSWORD = 'aprati2025secure';
if (!isset($_GET['password']) || $_GET['password'] !== $REQUIRED_PASSWORD) {
    die('❌ Access Denied');
}

set_time_limit(300);
ini_set('memory_limit', '512M');
error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
<!DOCTYPE html>
<html>
<head>
    <title>Run Migrations</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .warning { background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin: 10px 0; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 12px; }
        code { background: #f8f9fa; padding: 2px 6px; border-radius: 3px; }
        .btn { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }
    </style>
</head>
<body>
<div class="container">
    <h1>🚀 Laravel Migration Runner</h1>

<?php

// Find Laravel root
function findLaravelRoot() {
    $currentDir = __DIR__;
    $docRoot = $_SERVER['DOCUMENT_ROOT'] ?? $currentDir;
    
    $paths = [
        dirname(__DIR__) . '/aprati_backend',                        // PRIORITY: Sibling aprati_backend subfolder
        '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend', // Full path
        $currentDir . '/..',                                         // Parent of current
        dirname($docRoot),                                           // Parent of document root
        $currentDir . '/../../aprati_backend',                       // Nested structure
        '/home/apratifoodscom/public_html',                         // Direct parent
        '/home/apratifoodscom/public_html/aprati_backend',          // Separate directory
        dirname(dirname($docRoot)) . '/aprati_backend',             // Two levels up
    ];
    
    foreach ($paths as $path) {
        $realPath = realpath($path);
        if (!$realPath) continue;
        
        $artisanPath = $realPath . '/artisan';
        $bootstrapPath = $realPath . '/bootstrap/app.php';
        
        if (file_exists($artisanPath) && file_exists($bootstrapPath)) {
            return $realPath;
        }
    }
    
    return null;
}

try {
    $laravelRoot = findLaravelRoot();
    
    if (!$laravelRoot) {
        throw new Exception("Cannot find Laravel installation");
    }
    
    echo "<div class='success'>✅ Laravel found at: $laravelRoot</div>";
    
    // Change to Laravel directory
    chdir($laravelRoot);
    
    // Load Composer autoloader first
    require_once $laravelRoot . '/vendor/autoload.php';
    
    // Bootstrap Laravel
    $app = require_once $laravelRoot . '/bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    
    echo "<div class='info'>🔄 Running migrations...</div>";
    
    // Capture output
    ob_start();
    
    try {
        // Run migrations programmatically
        $status = $kernel->call('migrate', [
            '--force' => true,
            '--no-interaction' => true,
        ]);
        
        $output = ob_get_clean();
        
        echo "<div class='success'>✅ Migrations completed!</div>";
        echo "<pre>$output</pre>";
        
        if ($status === 0) {
            echo "<div class='success'><strong>✓ All migrations ran successfully</strong></div>";
        } else {
            echo "<div class='warning'>⚠️ Migrations completed with status: $status</div>";
        }
        
        // Show what tables now exist
        echo "<h3>📊 Database Tables:</h3>";
        $db = $app->make('db');
        
        try {
            // SQL Server
            $tables = $db->select("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME");
            
            echo "<ul>";
            foreach ($tables as $table) {
                $tableName = $table->TABLE_NAME;
                $count = $db->table($tableName)->count();
                echo "<li><strong>$tableName</strong> ($count records)</li>";
            }
            echo "</ul>";
        } catch (Exception $e) {
            // MySQL fallback
            $tables = $db->select("SHOW TABLES");
            echo "<ul>";
            foreach ($tables as $table) {
                $tableName = array_values((array)$table)[0];
                $count = $db->table($tableName)->count();
                echo "<li><strong>$tableName</strong> ($count records)</li>";
            }
            echo "</ul>";
        }
        
    } catch (Exception $e) {
        $output = ob_get_clean();
        echo "<div class='error'>❌ Migration error: " . $e->getMessage() . "</div>";
        if (!empty($output)) {
            echo "<pre>$output</pre>";
        }
    }
    
    echo "<div class='warning'>⚠️ <strong>Security:</strong> Delete this file after use!</div>";
    
} catch (Exception $e) {
    echo "<div class='error'>❌ Error: " . $e->getMessage() . "</div>";
    
    echo "<div class='info'><strong>🔍 Diagnostic Information:</strong><br>";
    echo "Current directory: <code>" . __DIR__ . "</code><br>";
    echo "Document root: <code>" . ($_SERVER['DOCUMENT_ROOT'] ?? 'Not set') . "</code><br>";
    echo "</div>";
    
    echo "<div class='info'><strong>Checked these paths for Laravel installation:</strong>";
    
    $currentDir = __DIR__;
    $docRoot = $_SERVER['DOCUMENT_ROOT'] ?? $currentDir;
    
    $paths = [
        $currentDir . '/..',
        dirname($docRoot),
        $currentDir . '/../../aprati_backend',
        '/home/apratifoodscom/public_html',
        '/home/apratifoodscom/public_html/aprati_backend',
        dirname(dirname($docRoot)) . '/aprati_backend',
    ];
    
    echo "<table border='1' cellpadding='5' style='margin-top:10px;'>";
    echo "<tr><th>Path</th><th>Exists</th><th>Has artisan</th><th>Has bootstrap</th><th>Real Path</th></tr>";
    
    foreach ($paths as $path) {
        $exists = file_exists($path);
        $realPath = realpath($path);
        $hasArtisan = $realPath && file_exists($realPath . '/artisan');
        $hasBootstrap = $realPath && file_exists($realPath . '/bootstrap/app.php');
        
        $existsIcon = $exists ? '✓' : '✗';
        $artisanIcon = $hasArtisan ? '✓' : '✗';
        $bootstrapIcon = $hasBootstrap ? '✓' : '✗';
        
        echo "<tr>";
        echo "<td><code>$path</code></td>";
        echo "<td>$existsIcon</td>";
        echo "<td>$artisanIcon</td>";
        echo "<td>$bootstrapIcon</td>";
        echo "<td><small>" . ($realPath ?: 'N/A') . "</small></td>";
        echo "</tr>";
    }
    echo "</table>";
    echo "</div>";
    
    echo "<div class='warning'>";
    echo "<strong>💡 Solution:</strong><br>";
    echo "Laravel files must be uploaded to one of these locations with:<br>";
    echo "• <code>artisan</code> file in root<br>";
    echo "• <code>bootstrap/app.php</code> file present<br>";
    echo "• Recommended: Upload to <code>/home/apratifoodscom/public_html/</code> (parent of document root)";
    echo "</div>";
}

?>

    <p><a href="fix-api-errors.php?password=<?php echo $REQUIRED_PASSWORD; ?>" class="btn">← Back to Fix Tool</a></p>
</div>
</body>
</html>
