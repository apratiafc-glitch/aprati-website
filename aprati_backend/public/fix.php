<?php
/**
 * APRATI DEPLOYMENT REPAIR SCRIPT
 * This script fixes permissions and ensures the 'live_assets' folder is ready.
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Afc Aprati Diagnostic</h1>";

$folders = [
    'public/live_assets',
    'storage/app/public',
    'storage/app/public/hero-slides',
    'storage/app/public/products',
    'storage/app/public/banners',
];

foreach ($folders as $f) {
    if (!file_exists($f)) {
        if (mkdir($f, 0755, true)) {
            echo "✅ Created missing folder: $f<br>";
        } else {
            echo "❌ Failed to create folder: $f (Check parent permissions)<br>";
        }
    } else {
        chmod($f, 0755);
        echo "✅ Folder exists & fixed permissions (755): $f<br>";
    }
}

// Check for images and move them if they are in the wrong place
$source = 'storage/app/public';
$dest = 'public/live_assets';

function sync($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst, 0755, true);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) ) {
                sync($src . '/' . $file, $dst . '/' . $file);
            } else {
                copy($src . '/' . $file, $dst . '/' . $file);
                chmod($dst . '/' . $file, 0644);
            }
        }
    }
    closedir($dir);
}

echo "<h3>Synchronizing assets...</h3>";
sync($source, $dest);
echo "✅ Assets synchronized to public/live_assets<br>";

echo "<h3>Final Check:</h3>";
$test_file = 'public/live_assets/hero-slides';
if (file_exists($test_file)) {
    echo "✅ Success! Images are now in the public folder.<br>";
}

echo "<br><b style='color:green;'>Now refresh your website! If it works, DELETE this file (fix.php) for security.</b>";
