<?php
/**
 * Manual File Copy - Copy storage files to public folder
 * Since symlinks don't work on this hosting, we'll copy files directly
 */

set_time_limit(300); // 5 minutes

// Find Laravel root
$possibleRoots = [
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
    dirname(__DIR__),
    realpath(__DIR__ . '/..')
];

$laravelRoot = null;
foreach ($possibleRoots as $root) {
    if (file_exists($root . '/artisan')) {
        $laravelRoot = $root;
        break;
    }
}

if (!$laravelRoot) {
    die("❌ ERROR: Could not find Laravel root directory");
}

$storageSource = $laravelRoot . '/storage/app/public';
$publicDestination = $laravelRoot . '/public/storage';

echo "<!DOCTYPE html><html><head><title>Copy Storage Files</title>";
echo "<style>
    body { font-family: Arial; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1000px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1 { color: #667eea; }
    .success { color: green; }
    .error { color: red; }
    .warning { color: orange; }
    .progress { background: #e0e0e0; height: 30px; border-radius: 15px; margin: 20px 0; overflow: hidden; }
    .progress-bar { background: linear-gradient(90deg, #667eea, #764ba2); height: 100%; text-align: center; line-height: 30px; color: white; font-weight: bold; transition: width 0.3s; }
    .file-list { max-height: 400px; overflow-y: auto; background: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 12px; }
    button { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 15px 30px; border-radius: 25px; cursor: pointer; font-size: 16px; font-weight: bold; margin: 10px 5px; }
    button:hover { opacity: 0.9; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
    .stat-box { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 10px; text-align: center; }
    .stat-number { font-size: 2em; font-weight: bold; }
    .stat-label { font-size: 0.9em; opacity: 0.9; }
</style></head><body><div class='container'>";

echo "<h1>📋 Copy Storage Files</h1>";

function recursiveCopy($src, $dst, &$filesCopied = 0, &$errors = [], &$log = []) {
    if (!file_exists($dst)) {
        mkdir($dst, 0755, true);
        $log[] = "📁 Created directory: $dst";
    }
    
    $dir = @opendir($src);
    if (!$dir) {
        $errors[] = "Failed to open directory: $src";
        return 0;
    }
    
    while (($file = readdir($dir)) !== false) {
        if ($file === '.' || $file === '..') continue;
        
        $srcPath = $src . '/' . $file;
        $dstPath = $dst . '/' . $file;
        
        if (is_dir($srcPath)) {
            recursiveCopy($srcPath, $dstPath, $filesCopied, $errors, $log);
        } else {
            if (@copy($srcPath, $dstPath)) {
                $filesCopied++;
                $size = filesize($srcPath);
                $log[] = "✅ $file (" . number_format($size) . " bytes)";
            } else {
                $errors[] = "Failed to copy: $file";
                $log[] = "❌ Failed: $file";
            }
        }
    }
    
    closedir($dir);
    return $filesCopied;
}

if (isset($_POST['copy_now'])) {
    echo "<h2>🚀 Copying Files...</h2>";
    
    $filesCopied = 0;
    $errors = [];
    $log = [];
    
    $startTime = microtime(true);
    
    // Remove existing destination if it's a symlink
    if (is_link($publicDestination)) {
        unlink($publicDestination);
        echo "<p class='warning'>⚠️ Removed existing symlink</p>";
    }
    
    recursiveCopy($storageSource, $publicDestination, $filesCopied, $errors, $log);
    
    $endTime = microtime(true);
    $duration = round($endTime - $startTime, 2);
    
    echo "<div class='stats'>";
    echo "<div class='stat-box'><div class='stat-number'>$filesCopied</div><div class='stat-label'>Files Copied</div></div>";
    echo "<div class='stat-box'><div class='stat-number'>" . count($errors) . "</div><div class='stat-label'>Errors</div></div>";
    echo "<div class='stat-box'><div class='stat-number'>{$duration}s</div><div class='stat-label'>Duration</div></div>";
    echo "</div>";
    
    if ($filesCopied > 0) {
        echo "<p class='success'><strong>✅ SUCCESS! Copied $filesCopied files in {$duration} seconds</strong></p>";
    }
    
    if (!empty($errors)) {
        echo "<h3 class='error'>❌ Errors:</h3><ul>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul>";
    }
    
    echo "<h3>📝 Copy Log:</h3>";
    echo "<div class='file-list'>";
    foreach ($log as $entry) {
        echo $entry . "<br>";
    }
    echo "</div>";
    
    echo "<h3>🧪 Test Images:</h3>";
    echo "<div style='display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0;'>";
    
    // Get some actual image paths
    require_once $laravelRoot . '/vendor/autoload.php';
    $app = require_once $laravelRoot . '/bootstrap/app.php';
    $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
    
    try {
        $brands = \App\Models\Brand::where('is_active', true)->limit(4)->get();
        foreach ($brands as $brand) {
            if ($brand->logo) {
                $url = url('storage/' . $brand->logo);
                echo "<div style='text-align:center;'>";
                echo "<img src='$url?t=" . time() . "' style='max-width:100%; height:auto; border-radius:8px;' onerror='this.style.border=\"2px solid red\"' onload='this.style.border=\"2px solid green\"'>";
                echo "<div style='font-size:12px; margin-top:5px;'>$brand->name</div>";
                echo "</div>";
            }
        }
    } catch (Exception $e) {
        echo "<p class='error'>Could not load test images: " . $e->getMessage() . "</p>";
    }
    
    echo "</div>";
    
    echo "<p><a href='test-images-complete.html'><button type='button'>🖼️ View Full Image Test</button></a></p>";
    
} else {
    // Show copy form
    echo "<h2>📂 Source & Destination</h2>";
    echo "<table style='width:100%; margin:20px 0;'>";
    echo "<tr><td><strong>Source:</strong></td><td>$storageSource</td></tr>";
    echo "<tr><td><strong>Destination:</strong></td><td>$publicDestination</td></tr>";
    echo "</table>";
    
    // Check what exists
    echo "<h3>📋 Pre-Copy Check:</h3><ul>";
    
    if (is_dir($storageSource)) {
        $sourceContents = array_diff(scandir($storageSource), ['.', '..']);
        echo "<li class='success'>✅ Source directory exists with " . count($sourceContents) . " items</li>";
        echo "<li style='color:#666; font-size:12px;'>Folders: " . implode(', ', $sourceContents) . "</li>";
    } else {
        echo "<li class='error'>❌ Source directory not found!</li>";
    }
    
    if (file_exists($publicDestination)) {
        if (is_link($publicDestination)) {
            echo "<li class='warning'>⚠️ Destination exists as SYMLINK (will be replaced with real folder)</li>";
        } else {
            $destContents = array_diff(scandir($publicDestination), ['.', '..']);
            echo "<li class='warning'>⚠️ Destination already exists with " . count($destContents) . " items (will be overwritten)</li>";
        }
    } else {
        echo "<li class='success'>✅ Destination doesn't exist (will be created)</li>";
    }
    
    echo "</ul>";
    
    echo "<form method='post'>";
    echo "<button type='submit' name='copy_now'>📋 Copy All Files Now</button>";
    echo "</form>";
    
    echo "<p style='color:#666; font-size:14px; margin-top:20px;'>⚠️ This will copy all files from storage/app/public to public/storage<br>";
    echo "If destination already exists, files will be overwritten.<br>";
    echo "This may take 30-60 seconds depending on file count.</p>";
}

echo "</div></body></html>";
?>
