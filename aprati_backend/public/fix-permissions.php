<?php
/**
 * File Permission Checker & Fixer
 * Upload to: /public_html/sdev.apratifoods.asia/
 * Access: https://sdev.apratifoods.asia/fix-permissions.php?password=aprati2025secure
 * 
 * Checks and fixes file permissions for Laravel application
 */

// Security
$REQUIRED_PASSWORD = 'aprati2025secure';
if (!isset($_GET['password']) || $_GET['password'] !== $REQUIRED_PASSWORD) {
    die('❌ Access Denied. Add ?password=aprati2025secure to URL');
}

set_time_limit(300);
error_reporting(E_ALL);
ini_set('display_errors', 1);

$action = $_GET['action'] ?? 'check';

?>
<!DOCTYPE html>
<html>
<head>
    <title>Permission Fixer</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #333; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .warning { background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        table th, table td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 14px; }
        table th { background: #007bff; color: white; }
        .perm-ok { background: #d4edda; }
        .perm-bad { background: #f8d7da; }
        .btn { display: inline-block; padding: 10px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 5px; border: none; cursor: pointer; }
        .btn:hover { background: #218838; }
        .btn-primary { background: #007bff; }
        .btn-primary:hover { background: #0056b3; }
        .btn-danger { background: #dc3545; }
        .btn-danger:hover { background: #c82333; }
        code { background: #f8f9fa; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
        .menu { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .menu-item { background: #007bff; color: white; padding: 15px; text-align: center; border-radius: 5px; text-decoration: none; display: block; }
        .menu-item:hover { background: #0056b3; }
    </style>
</head>
<body>
<div class="container">
    <h1>🔐 Laravel File Permission Manager</h1>
    <p><a href="fix-api-errors.php?password=<?php echo $REQUIRED_PASSWORD; ?>" class="btn btn-primary">← Back to Fix Tool</a></p>

<?php

// Find Laravel root
function findLaravelRoot() {
    $currentDir = __DIR__;
    $docRoot = $_SERVER['DOCUMENT_ROOT'] ?? $currentDir;
    
    $paths = [
        dirname(__DIR__) . '/aprati_backend',                        // PRIORITY: Sibling aprati_backend subfolder
        '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend', // Full path
        $currentDir . '/..',                                         // Parent of current (most common)
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

// Get permission string
function getPermissionString($path) {
    if (!file_exists($path)) {
        return 'N/A (not found)';
    }
    
    $perms = fileperms($path);
    $info = '';
    
    // Owner
    $info .= (($perms & 0x0100) ? 'r' : '-');
    $info .= (($perms & 0x0080) ? 'w' : '-');
    $info .= (($perms & 0x0040) ? 'x' : '-');
    
    // Group
    $info .= (($perms & 0x0020) ? 'r' : '-');
    $info .= (($perms & 0x0010) ? 'w' : '-');
    $info .= (($perms & 0x0008) ? 'x' : '-');
    
    // World
    $info .= (($perms & 0x0004) ? 'r' : '-');
    $info .= (($perms & 0x0002) ? 'w' : '-');
    $info .= (($perms & 0x0001) ? 'x' : '-');
    
    return sprintf('%04o', $perms & 0777) . ' (' . $info . ')';
}

// Check if path is writable
function checkWritable($path) {
    if (!file_exists($path)) {
        return false;
    }
    return is_writable($path);
}

// Required directory permissions for Laravel
$requiredPermissions = [
    'storage' => [
        'permission' => 0775,
        'description' => 'Storage directory for logs, cache, sessions',
        'critical' => true,
        'recursive' => true
    ],
    'storage/app' => [
        'permission' => 0775,
        'description' => 'Application storage',
        'critical' => true,
        'recursive' => true
    ],
    'storage/app/public' => [
        'permission' => 0775,
        'description' => 'Public storage (images, uploads)',
        'critical' => true,
        'recursive' => true
    ],
    'storage/framework' => [
        'permission' => 0775,
        'description' => 'Framework cache and sessions',
        'critical' => true,
        'recursive' => true
    ],
    'storage/framework/cache' => [
        'permission' => 0775,
        'description' => 'Cache storage',
        'critical' => true,
        'recursive' => true
    ],
    'storage/framework/sessions' => [
        'permission' => 0775,
        'description' => 'Session storage',
        'critical' => true,
        'recursive' => true
    ],
    'storage/framework/views' => [
        'permission' => 0775,
        'description' => 'Compiled views',
        'critical' => true,
        'recursive' => true
    ],
    'storage/logs' => [
        'permission' => 0775,
        'description' => 'Application logs',
        'critical' => true,
        'recursive' => true
    ],
    'bootstrap/cache' => [
        'permission' => 0775,
        'description' => 'Bootstrap cache',
        'critical' => true,
        'recursive' => true
    ],
    'public/storage' => [
        'permission' => 0755,
        'description' => 'Public storage symlink',
        'critical' => false,
        'recursive' => false
    ],
];

// Required file permissions
$requiredFilePermissions = [
    '.env' => [
        'permission' => 0644,
        'description' => 'Environment configuration',
        'critical' => true
    ],
    'artisan' => [
        'permission' => 0755,
        'description' => 'Artisan CLI tool',
        'critical' => false
    ],
];

try {
    $laravelRoot = findLaravelRoot();
    
    if (!$laravelRoot) {
        throw new Exception("Cannot find Laravel installation");
    }
    
    echo "<div class='success'>✅ Laravel found at: <code>$laravelRoot</code></div>";
    
    // Check Current User
    echo "<div class='info'>";
    echo "<strong>📊 Server Information:</strong><br>";
    echo "PHP User: <code>" . get_current_user() . "</code><br>";
    echo "PHP Version: <code>" . PHP_VERSION . "</code><br>";
    echo "Server Software: <code>" . ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . "</code><br>";
    
    if (function_exists('posix_getpwuid') && function_exists('posix_geteuid')) {
        $processUser = posix_getpwuid(posix_geteuid());
        echo "Process User: <code>" . $processUser['name'] . "</code><br>";
    }
    
    echo "</div>";
    
    if ($action === 'check') {
        echo "<h2>📋 Current Permissions Status</h2>";
        
        echo "<h3>🗂️ Directory Permissions</h3>";
        echo "<table>";
        echo "<tr><th>Path</th><th>Current</th><th>Required</th><th>Writable</th><th>Status</th><th>Description</th></tr>";
        
        $hasIssues = false;
        
        foreach ($requiredPermissions as $path => $config) {
            $fullPath = $laravelRoot . '/' . $path;
            $exists = file_exists($fullPath);
            $current = $exists ? getPermissionString($fullPath) : 'Not Found';
            $required = sprintf('%04o', $config['permission']);
            $writable = $exists ? (checkWritable($fullPath) ? '✅ Yes' : '❌ No') : '❌ N/A';
            
            $currentPerm = $exists ? (fileperms($fullPath) & 0777) : 0;
            $isOk = $exists && ($currentPerm >= $config['permission']);
            
            if (!$isOk && $config['critical']) {
                $hasIssues = true;
            }
            
            $statusClass = $isOk ? 'perm-ok' : 'perm-bad';
            $statusIcon = $isOk ? '✅ OK' : ($config['critical'] ? '❌ FIX REQUIRED' : '⚠️ Recommended');
            
            echo "<tr class='$statusClass'>";
            echo "<td><code>$path</code></td>";
            echo "<td>$current</td>";
            echo "<td>$required</td>";
            echo "<td>$writable</td>";
            echo "<td><strong>$statusIcon</strong></td>";
            echo "<td>{$config['description']}</td>";
            echo "</tr>";
        }
        
        echo "</table>";
        
        echo "<h3>📄 File Permissions</h3>";
        echo "<table>";
        echo "<tr><th>File</th><th>Current</th><th>Required</th><th>Status</th><th>Description</th></tr>";
        
        foreach ($requiredFilePermissions as $file => $config) {
            $fullPath = $laravelRoot . '/' . $file;
            $exists = file_exists($fullPath);
            $current = $exists ? getPermissionString($fullPath) : 'Not Found';
            $required = sprintf('%04o', $config['permission']);
            
            $currentPerm = $exists ? (fileperms($fullPath) & 0777) : 0;
            $isOk = $exists && ($currentPerm >= $config['permission']);
            
            if (!$isOk && $config['critical']) {
                $hasIssues = true;
            }
            
            $statusClass = $isOk ? 'perm-ok' : 'perm-bad';
            $statusIcon = $isOk ? '✅ OK' : ($config['critical'] ? '❌ FIX REQUIRED' : '⚠️ Recommended');
            
            echo "<tr class='$statusClass'>";
            echo "<td><code>$file</code></td>";
            echo "<td>$current</td>";
            echo "<td>$required</td>";
            echo "<td><strong>$statusIcon</strong></td>";
            echo "<td>{$config['description']}</td>";
            echo "</tr>";
        }
        
        echo "</table>";
        
        if ($hasIssues) {
            echo "<div class='error'>";
            echo "<h3>⚠️ Permission Issues Detected</h3>";
            echo "<p>Some critical directories/files have incorrect permissions that will cause Laravel to fail.</p>";
            echo "<a href='?password=$REQUIRED_PASSWORD&action=fix' class='btn btn-danger' style='font-size: 18px; padding: 15px 30px;'>🔧 Fix All Permissions</a>";
            echo "</div>";
        } else {
            echo "<div class='success'>";
            echo "<h3>✅ All Permissions Are Correct!</h3>";
            echo "<p>Your Laravel application has the correct file permissions.</p>";
            echo "</div>";
        }
        
        // Show manual commands for SSH/Terminal
        echo "<div class='info'>";
        echo "<h3>📋 Manual Fix Commands (SSH/Terminal)</h3>";
        echo "<p>If you need to fix permissions via SSH or cPanel Terminal, run these commands:</p>";
        echo "<pre>";
        echo "cd $laravelRoot\n\n";
        echo "# Fix storage permissions\n";
        echo "chmod -R 775 storage\n";
        echo "chmod -R 775 bootstrap/cache\n\n";
        echo "# Fix ownership (replace 'username' with your cPanel username)\n";
        echo "# chown -R username:username storage\n";
        echo "# chown -R username:username bootstrap/cache\n";
        echo "</pre>";
        echo "</div>";
        
    } elseif ($action === 'fix') {
        echo "<h2>🔧 Fixing Permissions</h2>";
        
        $fixed = [];
        $failed = [];
        
        // Fix directories
        foreach ($requiredPermissions as $path => $config) {
            $fullPath = $laravelRoot . '/' . $path;
            
            if (!file_exists($fullPath)) {
                // Try to create directory
                if (@mkdir($fullPath, $config['permission'], true)) {
                    $fixed[] = "$path (created)";
                } else {
                    $failed[] = "$path (cannot create)";
                }
                continue;
            }
            
            // Set permission
            if ($config['recursive'] && is_dir($fullPath)) {
                // Recursive chmod
                $iterator = new RecursiveIteratorIterator(
                    new RecursiveDirectoryIterator($fullPath, RecursiveDirectoryIterator::SKIP_DOTS),
                    RecursiveIteratorIterator::SELF_FIRST
                );
                
                $count = 0;
                foreach ($iterator as $item) {
                    if (@chmod($item, $config['permission'])) {
                        $count++;
                    }
                }
                
                if (@chmod($fullPath, $config['permission'])) {
                    $fixed[] = "$path (recursive, $count files)";
                } else {
                    $failed[] = "$path (recursive)";
                }
            } else {
                if (@chmod($fullPath, $config['permission'])) {
                    $fixed[] = $path;
                } else {
                    $failed[] = $path;
                }
            }
        }
        
        // Fix files
        foreach ($requiredFilePermissions as $file => $config) {
            $fullPath = $laravelRoot . '/' . $file;
            
            if (!file_exists($fullPath)) {
                $failed[] = "$file (not found)";
                continue;
            }
            
            if (@chmod($fullPath, $config['permission'])) {
                $fixed[] = $file;
            } else {
                $failed[] = $file;
            }
        }
        
        // Show results
        if (count($fixed) > 0) {
            echo "<div class='success'>";
            echo "<h3>✅ Fixed Permissions</h3>";
            echo "<ul>";
            foreach ($fixed as $item) {
                echo "<li>$item</li>";
            }
            echo "</ul>";
            echo "</div>";
        }
        
        if (count($failed) > 0) {
            echo "<div class='error'>";
            echo "<h3>❌ Failed to Fix</h3>";
            echo "<ul>";
            foreach ($failed as $item) {
                echo "<li>$item</li>";
            }
            echo "</ul>";
            echo "<p><strong>Possible causes:</strong></p>";
            echo "<ul>";
            echo "<li>PHP user doesn't have permission to change file permissions</li>";
            echo "<li>Files are owned by a different user</li>";
            echo "<li>Server restrictions (safe_mode, open_basedir)</li>";
            echo "</ul>";
            echo "<p><strong>Solution:</strong> Use SSH/Terminal or cPanel File Manager to fix permissions manually.</p>";
            echo "</div>";
        }
        
        echo "<a href='?password=$REQUIRED_PASSWORD&action=check' class='btn'>🔍 Check Permissions Again</a>";
    }
    
} catch (Exception $e) {
    echo "<div class='error'>❌ Error: " . $e->getMessage() . "</div>";
}

?>

    <div class="warning">
        <strong>⚠️ Security Notice:</strong> Delete this file after fixing permissions!
    </div>
</div>
</body>
</html>
