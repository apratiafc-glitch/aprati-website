<?php
/**
 * Directory Structure Checker
 * Shows what's actually in your Laravel directory
 * 
 * Usage: https://sdev.apratifoods.asia/check-structure.php?password=aprati2025secure
 */

$PASSWORD = 'aprati2025secure';

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
    <title>Directory Structure Checker - Aprati Foods</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container { 
            max-width: 1400px; 
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
            font-size: 13px;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #dee2e6;
        }
        th {
            background: #e9ecef;
            font-weight: bold;
            position: sticky;
            top: 0;
        }
        .dir { color: #0066cc; font-weight: bold; }
        .file { color: #333; }
        pre {
            background: #282c34;
            color: #abb2bf;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.5;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 5px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📁 Directory Structure Checker</h1>
        <p class="subtitle">Shows actual files and directories on your server</p>

<?php

function findLaravelRoot() {
    $paths = [
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
    echo '<div class="status error">❌ Cannot find Laravel installation</div>';
    exit;
}

echo '<div class="status success">✅ <strong>Laravel Root:</strong> ' . htmlspecialchars($laravelRoot) . '</div>';

// List all directories and files in Laravel root
echo '<h2 style="margin-top: 30px; color: #333;">📂 Contents of ' . htmlspecialchars($laravelRoot) . '</h2>';

$items = scandir($laravelRoot);
$directories = [];
$files = [];

foreach ($items as $item) {
    if ($item === '.' || $item === '..') continue;
    
    $fullPath = $laravelRoot . '/' . $item;
    $isDir = is_dir($fullPath);
    
    if ($isDir) {
        $fileCount = 0;
        try {
            $dirItems = scandir($fullPath);
            $fileCount = count($dirItems) - 2; // Exclude . and ..
        } catch (Exception $e) {
            $fileCount = '?';
        }
        
        $directories[] = [
            'name' => $item,
            'count' => $fileCount,
            'path' => $fullPath
        ];
    } else {
        $size = filesize($fullPath);
        $files[] = [
            'name' => $item,
            'size' => $size,
            'path' => $fullPath
        ];
    }
}

// Sort
sort($directories);
sort($files);

echo '<table>';
echo '<tr><th>Name</th><th>Type</th><th>Info</th><th>Expected</th></tr>';

// Check expected directories
$expectedDirs = ['vendor', 'app', 'config', 'routes', 'database', 'resources', 'bootstrap', 'public', 'storage', 'tests'];

foreach ($expectedDirs as $expected) {
    $found = false;
    $itemCount = '?';
    
    foreach ($directories as $dir) {
        if ($dir['name'] === $expected) {
            $found = true;
            $itemCount = $dir['count'];
            break;
        }
    }
    
    $icon = $found ? '✅' : '❌';
    $status = $found ? 'Found' : '<span style="color: #dc3545;">MISSING</span>';
    
    echo '<tr>';
    echo '<td class="dir">' . $icon . ' ' . htmlspecialchars($expected) . '/</td>';
    echo '<td>Directory</td>';
    echo '<td>' . ($found ? $itemCount . ' items' : '-') . '</td>';
    echo '<td>' . $status . '</td>';
    echo '</tr>';
}

// Check for unexpected vendor* or app* directories
foreach ($directories as $dir) {
    if (stripos($dir['name'], 'vendor') !== false || stripos($dir['name'], 'app') !== false) {
        if (!in_array($dir['name'], $expectedDirs)) {
            echo '<tr style="background: #fff3cd;">';
            echo '<td class="dir">⚠️ ' . htmlspecialchars($dir['name']) . '/</td>';
            echo '<td>Directory</td>';
            echo '<td>' . $dir['count'] . ' items</td>';
            echo '<td><strong>UNEXPECTED - Check extraction location!</strong></td>';
            echo '</tr>';
        }
    }
}

echo '</table>';

// Check if directories are nested incorrectly
$problemDirs = [];

// Check for nested extractions (e.g., vendor/vendor, app/app)
foreach (['vendor', 'app', 'config', 'routes'] as $dirName) {
    $dirPath = $laravelRoot . '/' . $dirName;
    if (is_dir($dirPath)) {
        $nestedPath = $dirPath . '/' . $dirName;
        if (is_dir($nestedPath)) {
            $problemDirs[] = $dirName . '/' . $dirName;
        }
    }
}

if (!empty($problemDirs)) {
    echo '<div class="status error">';
    echo '❌ <strong>Nested Directory Problem Detected!</strong><br>';
    echo 'Found: ' . implode(', ', $problemDirs) . '<br>';
    echo 'This means files were extracted into a subdirectory instead of the root.<br>';
    echo '<strong>Solution:</strong> Move files from nested directory to parent.';
    echo '</div>';
}

// Show solution if critical directories are missing
$missingCritical = [];
foreach (['vendor', 'app', 'config', 'routes'] as $critical) {
    $exists = false;
    foreach ($directories as $dir) {
        if ($dir['name'] === $critical) {
            $exists = true;
            break;
        }
    }
    if (!$exists) {
        $missingCritical[] = $critical;
    }
}

if (!empty($missingCritical)) {
    echo '<div class="status error">';
    echo '❌ <strong>Missing Directories:</strong> ' . implode(', ', $missingCritical);
    echo '</div>';
    
    echo '<h3 style="margin-top: 20px; color: #333;">🔧 Possible Causes:</h3>';
    echo '<div class="status warning">';
    echo '<strong>1. Files extracted to wrong location</strong><br>';
    echo '• Make sure you extracted to <code>/home/apratifoodscom/public_html/</code><br>';
    echo '• NOT to <code>/public_html/sdev.apratifoods.asia/</code><br><br>';
    
    echo '<strong>2. Extraction created nested directories</strong><br>';
    echo '• Check if files are in <code>public_html/vendor/vendor/</code> instead of <code>public_html/vendor/</code><br>';
    echo '• If so, move contents up one level<br><br>';
    
    echo '<strong>3. Upload incomplete</strong><br>';
    echo '• Check if ZIP files are still present (should be deleted after extraction)<br>';
    echo '• Re-upload and extract again';
    echo '</div>';
} else {
    echo '<div class="status success">✅ <strong>All critical directories are present!</strong></div>';
}

// Show all actual directories
echo '<h2 style="margin-top: 30px; color: #333;">📋 All Directories Found</h2>';
echo '<table>';
echo '<tr><th>Directory Name</th><th>Items Inside</th></tr>';

foreach ($directories as $dir) {
    echo '<tr>';
    echo '<td class="dir">' . htmlspecialchars($dir['name']) . '/</td>';
    echo '<td>' . $dir['count'] . '</td>';
    echo '</tr>';
}

echo '</table>';

// Check if files were uploaded to sdev.apratifoods.asia instead
$subdomainPath = $laravelRoot . '/sdev.apratifoods.asia';
if (is_dir($subdomainPath)) {
    echo '<h2 style="margin-top: 30px; color: #333;">🔍 Checking sdev.apratifoods.asia Directory</h2>';
    
    $subdomainItems = scandir($subdomainPath);
    $foundInSubdomain = [];
    
    foreach (['vendor', 'app', 'config', 'routes', 'database', 'resources'] as $criticalDir) {
        if (in_array($criticalDir, $subdomainItems) && is_dir($subdomainPath . '/' . $criticalDir)) {
            $foundInSubdomain[] = $criticalDir;
        }
    }
    
    if (!empty($foundInSubdomain)) {
        echo '<div class="status error">';
        echo '❌ <strong>FILES UPLOADED TO WRONG LOCATION!</strong><br>';
        echo 'Found these directories in <code>sdev.apratifoods.asia/</code>:<br>';
        echo '• ' . implode('<br>• ', $foundInSubdomain) . '<br><br>';
        echo '<strong>These need to be MOVED to:</strong> <code>/home/apratifoodscom/public_html/</code>';
        echo '</div>';
        
        echo '<h3 style="margin-top: 20px; color: #333;">📦 How to Fix:</h3>';
        echo '<div class="status warning">';
        echo '<strong>Option 1: Use cPanel File Manager</strong><br>';
        echo '1. Go to <code>/home/apratifoodscom/public_html/sdev.apratifoods.asia/</code><br>';
        echo '2. Select all these directories: ' . implode(', ', $foundInSubdomain) . '<br>';
        echo '3. Click "Move"<br>';
        echo '4. Enter destination: <code>/home/apratifoodscom/public_html/</code><br>';
        echo '5. Click "Move Files"<br><br>';
        
        echo '<strong>Option 2: Re-extract to correct location</strong><br>';
        echo '1. Delete the directories from <code>sdev.apratifoods.asia/</code><br>';
        echo '2. Upload ZIP files to <code>/home/apratifoodscom/public_html/</code><br>';
        echo '3. Extract them there (NOT in sdev.apratifoods.asia)<br>';
        echo '</div>';
    } else {
        echo '<div class="status info">ℹ️ No Laravel directories found in sdev.apratifoods.asia/</div>';
    }
    
    // Show what's in sdev.apratifoods.asia
    echo '<h3 style="margin-top: 20px; color: #333;">Contents of sdev.apratifoods.asia/</h3>';
    echo '<table>';
    echo '<tr><th>Item</th><th>Type</th></tr>';
    
    $count = 0;
    foreach ($subdomainItems as $item) {
        if ($item === '.' || $item === '..') continue;
        if ($count >= 20) {
            echo '<tr><td colspan="2"><em>... and more</em></td></tr>';
            break;
        }
        
        $itemPath = $subdomainPath . '/' . $item;
        $type = is_dir($itemPath) ? 'Directory' : 'File';
        $icon = is_dir($itemPath) ? '📁' : '📄';
        
        echo '<tr>';
        echo '<td>' . $icon . ' ' . htmlspecialchars($item) . '</td>';
        echo '<td>' . $type . '</td>';
        echo '</tr>';
        $count++;
    }
    
    echo '</table>';
}

?>

        <div style="margin-top: 30px;">
            <a href="check-vendor.php?password=<?php echo $PASSWORD; ?>" class="btn">🔍 Check Vendor</a>
            <a href="fix-api-errors.php?password=<?php echo $PASSWORD; ?>" class="btn">🔧 Diagnostic Tool</a>
        </div>
    </div>
</body>
</html>
