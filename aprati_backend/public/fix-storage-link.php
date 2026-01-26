<?php
/**
 * Storage Link Fix - Manual symlink creation for shared hosting
 * This fixes image loading issues by creating the storage symlink
 */

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

echo "<h1>Storage Link Diagnostic & Fix</h1>";
echo "<style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .success { color: green; font-weight: bold; }
    .error { color: red; font-weight: bold; }
    .warning { color: orange; font-weight: bold; }
    .info { color: blue; }
    pre { background: #fff; padding: 15px; border-radius: 5px; overflow-x: auto; }
    .section { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
</style>";

echo "<div class='section'>";
echo "<h2>📁 Directory Structure</h2>";
echo "<pre>";
echo "Laravel Root: $laravelRoot\n";
echo "Public Dir: $laravelRoot/public\n";
echo "Storage Dir: $laravelRoot/storage/app/public\n";
echo "</pre>";
echo "</div>";

// Check directories
echo "<div class='section'>";
echo "<h2>🔍 Directory Checks</h2>";

$publicDir = $laravelRoot . '/public';
$storagePublicDir = $laravelRoot . '/storage/app/public';
$publicStorageLink = $publicDir . '/storage';

echo "<ul>";

// Check public directory
if (is_dir($publicDir)) {
    echo "<li class='success'>✅ Public directory exists: $publicDir</li>";
} else {
    echo "<li class='error'>❌ Public directory NOT found: $publicDir</li>";
}

// Check storage/app/public
if (is_dir($storagePublicDir)) {
    echo "<li class='success'>✅ Storage public directory exists: $storagePublicDir</li>";
    
    // List contents
    $contents = scandir($storagePublicDir);
    $folders = array_filter($contents, function($item) use ($storagePublicDir) {
        return $item !== '.' && $item !== '..' && is_dir($storagePublicDir . '/' . $item);
    });
    
    if (!empty($folders)) {
        echo "<li class='info'>📂 Folders in storage/app/public: " . implode(', ', $folders) . "</li>";
    } else {
        echo "<li class='warning'>⚠️ No folders found in storage/app/public</li>";
    }
} else {
    echo "<li class='error'>❌ Storage public directory NOT found: $storagePublicDir</li>";
}

// Check public/storage symlink
if (file_exists($publicStorageLink)) {
    if (is_link($publicStorageLink)) {
        $target = readlink($publicStorageLink);
        echo "<li class='success'>✅ Symlink exists: $publicStorageLink → $target</li>";
        
        if (realpath($publicStorageLink) === realpath($storagePublicDir)) {
            echo "<li class='success'>✅ Symlink points to correct location</li>";
        } else {
            echo "<li class='error'>❌ Symlink points to WRONG location</li>";
            echo "<li class='info'>Expected: $storagePublicDir</li>";
            echo "<li class='info'>Actual: " . realpath($publicStorageLink) . "</li>";
        }
    } else {
        echo "<li class='warning'>⚠️ public/storage exists but is NOT a symlink (it's a real directory)</li>";
        echo "<li class='warning'>This might cause issues. Should be a symlink to storage/app/public</li>";
    }
} else {
    echo "<li class='error'>❌ public/storage does NOT exist</li>";
}

echo "</ul>";
echo "</div>";

// Check actual image files
echo "<div class='section'>";
echo "<h2>🖼️ Image Files Check</h2>";

if (is_dir($storagePublicDir)) {
    $brandLogosDir = $storagePublicDir . '/brands/logos';
    $productImagesDir = $storagePublicDir . '/products';
    
    echo "<h3>Brand Logos:</h3><ul>";
    if (is_dir($brandLogosDir)) {
        $logos = array_diff(scandir($brandLogosDir), ['.', '..']);
        if (!empty($logos)) {
            foreach ($logos as $logo) {
                $size = filesize($brandLogosDir . '/' . $logo);
                echo "<li>✅ $logo (" . number_format($size) . " bytes)</li>";
            }
        } else {
            echo "<li class='warning'>⚠️ No logo files found in $brandLogosDir</li>";
        }
    } else {
        echo "<li class='error'>❌ Directory not found: $brandLogosDir</li>";
    }
    echo "</ul>";
    
    echo "<h3>Product Images:</h3><ul>";
    if (is_dir($productImagesDir)) {
        $images = array_diff(scandir($productImagesDir), ['.', '..']);
        if (!empty($images)) {
            $count = count($images);
            echo "<li>✅ Found $count product images</li>";
        } else {
            echo "<li class='warning'>⚠️ No product images found</li>";
        }
    } else {
        echo "<li class='error'>❌ Directory not found: $productImagesDir</li>";
    }
    echo "</ul>";
}

echo "</div>";

// Try to fix
echo "<div class='section'>";
echo "<h2>🔧 Automatic Fix</h2>";

if (!file_exists($publicStorageLink)) {
    echo "<p>Attempting to create symlink...</p>";
    
    // Try symlink
    if (@symlink($storagePublicDir, $publicStorageLink)) {
        echo "<p class='success'>✅ SUCCESS! Symlink created!</p>";
    } else {
        echo "<p class='error'>❌ Could not create symlink (probably disabled on shared hosting)</p>";
        
        // Alternative: Copy files
        echo "<h3>Alternative Solution: Copy Files</h3>";
        echo "<p>Since symlinks are disabled, we can copy files instead:</p>";
        echo "<pre>";
        echo "Option 1: Use cPanel File Manager\n";
        echo "  Copy from: $storagePublicDir/*\n";
        echo "  Copy to: $publicStorageLink/\n\n";
        
        echo "Option 2: Create manual copy script (see below)\n";
        echo "</pre>";
        
        // Create copy button
        echo "<form method='post'>";
        echo "<button type='submit' name='copy_files' style='background:#4CAF50;color:white;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;font-size:16px;'>📋 Copy Files Now</button>";
        echo "</form>";
        
        if (isset($_POST['copy_files'])) {
            echo "<hr>";
            echo "<h3>Copying files...</h3>";
            echo "<pre>";
            
            function recursiveCopy($src, $dst) {
                if (!file_exists($dst)) {
                    mkdir($dst, 0755, true);
                }
                
                $dir = opendir($src);
                $count = 0;
                
                while(($file = readdir($dir)) !== false) {
                    if ($file != '.' && $file != '..') {
                        if (is_dir($src . '/' . $file)) {
                            $count += recursiveCopy($src . '/' . $file, $dst . '/' . $file);
                        } else {
                            if (copy($src . '/' . $file, $dst . '/' . $file)) {
                                echo "✅ Copied: $file\n";
                                $count++;
                            } else {
                                echo "❌ Failed: $file\n";
                            }
                        }
                    }
                }
                
                closedir($dir);
                return $count;
            }
            
            $copied = recursiveCopy($storagePublicDir, $publicStorageLink);
            echo "\n<strong>Total files copied: $copied</strong>\n";
            echo "</pre>";
            
            echo "<p class='success'>✅ Files copied! Try accessing images now.</p>";
        }
    }
} else {
    echo "<p class='success'>✅ Storage link already exists</p>";
}

echo "</div>";

// Test URLs
echo "<div class='section'>";
echo "<h2>🧪 Test Image URLs</h2>";
echo "<p>Try accessing these URLs directly:</p>";
echo "<ul>";

// Get actual image from database
require_once $laravelRoot . '/vendor/autoload.php';
$app = require_once $laravelRoot . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

try {
    $brands = \App\Models\Brand::where('is_active', true)->limit(3)->get();
    
    foreach ($brands as $brand) {
        if ($brand->logo) {
            $url = url('storage/' . $brand->logo);
            echo "<li><a href='$url' target='_blank'>$brand->name Logo</a> - $url</li>";
        }
    }
} catch (Exception $e) {
    echo "<li class='error'>Could not fetch brand data: " . $e->getMessage() . "</li>";
}

echo "</ul>";
echo "</div>";

echo "<div class='section'>";
echo "<p><strong>Next Steps:</strong></p>";
echo "<ol>";
echo "<li>If symlink was created: Refresh your test page</li>";
echo "<li>If files were copied: Refresh your test page</li>";
echo "<li>If nothing worked: Contact hosting support to enable symlinks</li>";
echo "</ol>";
echo "</div>";
?>
