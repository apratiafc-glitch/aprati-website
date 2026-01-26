<?php
header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server File Explorer</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Courier New', monospace; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            color: #fff;
        }
        .container { 
            max-width: 1400px; 
            margin: 0 auto; 
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
            padding: 30px;
        }
        h1 { color: #4fc3f7; border-bottom: 3px solid #4fc3f7; padding-bottom: 10px; margin-bottom: 20px; }
        h2 { color: #81c784; margin-top: 30px; margin-bottom: 15px; }
        .box { background: rgba(255,255,255,0.1); padding: 15px; margin: 10px 0; border-radius: 8px; }
        .file-tree { font-family: monospace; font-size: 13px; line-height: 1.8; }
        .folder { color: #ffd54f; font-weight: bold; cursor: pointer; }
        .file { color: #81c784; }
        .missing { color: #e57373; }
        .size { color: #aaa; font-size: 11px; margin-left: 10px; }
        .indent { margin-left: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); }
        th { background: rgba(79,195,247,0.3); color: #4fc3f7; }
        pre { background: rgba(0,0,0,0.5); padding: 10px; overflow-x: auto; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🗂️ Server File Explorer</h1>
        <p style="margin-bottom: 20px;">Exploring your server file structure</p>

        <?php
        function formatSize($bytes) {
            if ($bytes >= 1073741824) return number_format($bytes / 1073741824, 2) . ' GB';
            if ($bytes >= 1048576) return number_format($bytes / 1048576, 2) . ' MB';
            if ($bytes >= 1024) return number_format($bytes / 1024, 2) . ' KB';
            return $bytes . ' B';
        }

        function listDirectory($path, $name = null, $level = 0) {
            if (!is_dir($path)) {
                return;
            }
            
            $displayName = $name ?: basename($path);
            $indent = str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;', $level);
            
            echo $indent . "📁 <span class='folder'>$displayName/</span><br>";
            
            try {
                $items = @scandir($path);
                if ($items === false) {
                    echo $indent . "&nbsp;&nbsp;&nbsp;&nbsp;<span class='missing'>❌ Permission denied</span><br>";
                    return;
                }
                
                $files = [];
                $dirs = [];
                
                foreach ($items as $item) {
                    if ($item === '.' || $item === '..') continue;
                    
                    $fullPath = $path . '/' . $item;
                    
                    if (is_dir($fullPath)) {
                        $dirs[] = $item;
                    } else {
                        $files[] = $item;
                    }
                }
                
                // Show directories first
                foreach ($dirs as $dir) {
                    $fullPath = $path . '/' . $dir;
                    $indent2 = str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;', $level + 1);
                    
                    // Don't recurse into these
                    if (in_array($dir, ['node_modules', 'storage', '.git', 'tests'])) {
                        echo $indent2 . "📁 <span class='folder'>$dir/</span> <span class='size'>(skipped)</span><br>";
                    } else {
                        listDirectory($fullPath, $dir, $level + 1);
                    }
                }
                
                // Show files
                foreach ($files as $file) {
                    $fullPath = $path . '/' . $file;
                    $size = @filesize($fullPath);
                    $sizeStr = $size !== false ? formatSize($size) : 'unknown';
                    $indent2 = str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;', $level + 1);
                    echo $indent2 . "📄 <span class='file'>$file</span> <span class='size'>($sizeStr)</span><br>";
                }
                
            } catch (Exception $e) {
                echo $indent . "&nbsp;&nbsp;&nbsp;&nbsp;<span class='missing'>Error: " . htmlspecialchars($e->getMessage()) . "</span><br>";
            }
        }

        // Current location
        echo "<h2>📍 Current Location</h2>";
        echo "<div class='box'>";
        echo "<strong>Current directory:</strong> " . __DIR__ . "<br>";
        echo "<strong>Parent directory:</strong> " . dirname(__DIR__) . "<br>";
        echo "<strong>Document root:</strong> " . ($_SERVER['DOCUMENT_ROOT'] ?? 'N/A');
        echo "</div>";

        // Show current directory structure
        echo "<h2>📂 Current Directory (" . basename(__DIR__) . ")</h2>";
        echo "<div class='box file-tree'>";
        listDirectory(__DIR__, null, 0);
        echo "</div>";

        // Show parent directory structure
        echo "<h2>📂 Parent Directory (Laravel Root)</h2>";
        $parentDir = dirname(__DIR__);
        echo "<div class='box file-tree'>";
        listDirectory($parentDir, basename($parentDir), 0);
        echo "</div>";

        // Check for critical Laravel files
        echo "<h2>🔍 Critical Files Check</h2>";
        
        // Find backend directory
        $backendDirs = [
            $parentDir,
            dirname($parentDir) . '/backend',
            dirname($parentDir) . '/aprati_backend',
            '/home/apratifoodscom/backend',
            '/home/apratifoodscom/aprati_backend',
        ];
        
        $backendDir = $parentDir;
        foreach ($backendDirs as $dir) {
            if (file_exists($dir . '/artisan') && file_exists($dir . '/bootstrap/app.php')) {
                $backendDir = $dir;
                break;
            }
        }
        
        $criticalFiles = [
            'index.php' => __DIR__ . '/index.php',
            '.htaccess' => __DIR__ . '/.htaccess',
            'vendor/autoload.php' => $backendDir . '/vendor/autoload.php',
            'bootstrap/app.php' => $backendDir . '/bootstrap/app.php',
            'artisan' => $backendDir . '/artisan',
            '.env' => $backendDir . '/.env',
            'composer.json' => $backendDir . '/composer.json',
        ];
        
        echo "<table>";
        echo "<tr><th>File</th><th>Path</th><th>Status</th><th>Size</th></tr>";
        
        foreach ($criticalFiles as $name => $path) {
            $exists = file_exists($path);
            $size = $exists ? formatSize(filesize($path)) : '-';
            $status = $exists ? "<span style='color: #81c784;'>✅ Exists</span>" : "<span style='color: #e57373;'>❌ Missing</span>";
            
            echo "<tr>";
            echo "<td><strong>$name</strong></td>";
            echo "<td style='font-size: 11px;'>$path</td>";
            echo "<td>$status</td>";
            echo "<td>$size</td>";
            echo "</tr>";
        }
        echo "</table>";

        // Check vendor folder in multiple locations
        echo "<h2>📦 Vendor Folder Check</h2>";
        
        $possibleVendorPaths = [
            'Parent directory' => $parentDir . '/vendor',
            'Backend in parent' => dirname($parentDir) . '/backend/vendor',
            'Aprati backend' => dirname($parentDir) . '/aprati_backend/vendor',
            'Absolute backend' => '/home/apratifoodscom/backend/vendor',
            'Absolute aprati_backend' => '/home/apratifoodscom/aprati_backend/vendor',
        ];
        
        $vendorPath = null;
        $vendorLocation = null;
        
        echo "<div class='box'>";
        echo "<strong>Searching for vendor folder...</strong><br><br>";
        
        foreach ($possibleVendorPaths as $name => $path) {
            $exists = is_dir($path);
            $icon = $exists ? '✅' : '❌';
            echo "$icon <strong>$name:</strong> $path<br>";
            
            if ($exists && $vendorPath === null) {
                $vendorPath = $path;
                $vendorLocation = $name;
            }
        }
        echo "</div>";
        
        if ($vendorPath) {
            echo "<div class='box' style='background: rgba(129,199,132,0.2); border-left: 4px solid #81c784;'>";
            echo "✅ <strong>Vendor folder FOUND!</strong><br><br>";
            echo "Location: $vendorLocation<br>";
            echo "Path: $vendorPath<br>";
            
            // Count packages
            $packages = glob($vendorPath . '/*/*', GLOB_ONLYDIR);
            echo "Packages: " . count($packages) . "<br>";
            
            // Check autoload
            if (file_exists($vendorPath . '/autoload.php')) {
                echo "Autoload: ✅ Found<br>";
            } else {
                echo "Autoload: ❌ Missing<br>";
            }
            
            echo "</div>";
        } else {
            echo "<div class='box' style='background: rgba(229,115,115,0.2); border-left: 4px solid #e57373;'>";
            echo "❌ <strong>Vendor folder NOT FOUND in any location!</strong><br><br>";
            echo "This folder contains all Composer dependencies and is REQUIRED for Laravel to work.<br>";
            echo "Please upload vendor folder or run 'composer install' on the server.";
            echo "</div>";
        }

        // Show what's in parent directory
        echo "<h2>📋 Parent Directory Contents</h2>";
        echo "<div class='box'>";
        echo "<strong>Path:</strong> $parentDir<br><br>";
        
        $parentItems = @scandir($parentDir);
        if ($parentItems) {
            echo "<strong>Contents:</strong><br>";
            echo "<div class='file-tree'>";
            foreach ($parentItems as $item) {
                if ($item === '.' || $item === '..') continue;
                $fullPath = $parentDir . '/' . $item;
                $type = is_dir($fullPath) ? '📁' : '📄';
                $size = is_file($fullPath) ? ' (' . formatSize(filesize($fullPath)) . ')' : '';
                echo "$type $item$size<br>";
            }
            echo "</div>";
        } else {
            echo "<span class='missing'>Cannot read directory</span>";
        }
        echo "</div>";

        // Summary and recommendations
        echo "<h2>💡 Summary</h2>";
        
        $hasIndex = file_exists(__DIR__ . '/index.php');
        $hasVendor = is_dir($parentDir . '/vendor');
        $hasBootstrap = file_exists($parentDir . '/bootstrap/app.php');
        
        if ($hasIndex && $hasVendor && $hasBootstrap) {
            echo "<div class='box' style='background: rgba(129,199,132,0.2); border-left: 4px solid #81c784;'>";
            echo "🎉 <strong>All critical files present!</strong><br>";
            echo "Your Laravel installation should be working.<br><br>";
            echo "If you're still getting 404 errors, run cache commands:<br>";
            echo "- php artisan route:cache<br>";
            echo "- php artisan config:cache";
            echo "</div>";
        } else {
            echo "<div class='box' style='background: rgba(229,115,115,0.2); border-left: 4px solid #e57373;'>";
            echo "🚨 <strong>Missing critical files:</strong><br><ul style='margin: 10px 0 0 20px;'>";
            if (!$hasIndex) echo "<li>index.php - Laravel entry point</li>";
            if (!$hasVendor) echo "<li>vendor/ - Composer dependencies</li>";
            if (!$hasBootstrap) echo "<li>bootstrap/app.php - Laravel bootstrap</li>";
            echo "</ul>";
            echo "</div>";
        }
        ?>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.2); opacity: 0.7;">
            <small>Generated: <?php echo date('Y-m-d H:i:s'); ?></small>
        </div>
    </div>
</body>
</html>
