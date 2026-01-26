<?php
/**
 * Storage File Diagnostic for Information Sections
 * This script checks what image files exist and compares with database records
 */

// Include Laravel bootstrap
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\InformationSection;
use Illuminate\Support\Facades\Storage;

echo "<!DOCTYPE html><html><head><title>Storage Files Diagnostic</title>";
echo "<style>body{font-family:Arial,sans-serif;padding:20px;} table{border-collapse:collapse;width:100%;margin:20px 0;} th,td{border:1px solid #ddd;padding:12px;text-align:left;} th{background:#4CAF50;color:white;} .error{color:red;} .success{color:green;} .warning{color:orange;}</style>";
echo "</head><body>";
echo "<h1>📁 Information Sections Storage Diagnostic</h1>";

// 1. Check storage directory exists
echo "<h2>1. Storage Directory Check</h2>";
$storagePath = storage_path('app/public/information-sections');
$publicPath = public_path('storage/information-sections');
echo "<p><strong>Storage Path:</strong> $storagePath</p>";
echo "<p><strong>Public Path:</strong> $publicPath</p>";

if (is_dir($storagePath)) {
    echo "<p class='success'>✓ Storage directory exists</p>";
    $files = scandir($storagePath);
    $imageFiles = array_filter($files, function($file) {
        return !in_array($file, ['.', '..']) && preg_match('/\.(jpg|jpeg|png|gif|svg)$/i', $file);
    });
    echo "<p><strong>Files in storage:</strong> " . count($imageFiles) . "</p>";
    if (count($imageFiles) > 0) {
        echo "<ul>";
        foreach ($imageFiles as $file) {
            $size = filesize($storagePath . '/' . $file);
            echo "<li>$file (" . number_format($size / 1024, 2) . " KB)</li>";
        }
        echo "</ul>";
    }
} else {
    echo "<p class='error'>✗ Storage directory does not exist</p>";
}

if (is_link($publicPath)) {
    echo "<p class='success'>✓ Storage symlink exists</p>";
} else {
    echo "<p class='error'>✗ Storage symlink does not exist. Run: php artisan storage:link</p>";
}

// 2. Database records
echo "<h2>2. Database Records</h2>";
$sections = InformationSection::orderBy('created_at', 'desc')->get();
echo "<p><strong>Total sections in database:</strong> " . $sections->count() . "</p>";

echo "<table>";
echo "<tr><th>ID</th><th>Title</th><th>Image Path</th><th>File Exists</th><th>File Size</th><th>Generated URL</th></tr>";

foreach ($sections as $section) {
    $imagePath = $section->image_path;
    $fullPath = $storagePath . '/' . basename($imagePath);
    $exists = $imagePath && file_exists($fullPath);
    $size = $exists ? filesize($fullPath) : 0;
    
    echo "<tr>";
    echo "<td>{$section->id}</td>";
    echo "<td>{$section->title}</td>";
    echo "<td>" . ($imagePath ?: '<em>No image</em>') . "</td>";
    
    if ($exists) {
        echo "<td class='success'>✓ Exists</td>";
        echo "<td>" . number_format($size / 1024, 2) . " KB</td>";
    } else {
        echo "<td class='error'>✗ Missing</td>";
        echo "<td>-</td>";
    }
    
    echo "<td><a href='{$section->image_url}' target='_blank'>{$section->image_url}</a></td>";
    echo "</tr>";
}

echo "</table>";

// 3. Recommendations
echo "<h2>3. Recommendations</h2>";
$missingFiles = $sections->filter(function($section) use ($storagePath) {
    if (!$section->image_path) return false;
    $fullPath = $storagePath . '/' . basename($section->image_path);
    return !file_exists($fullPath);
})->count();

if ($missingFiles > 0) {
    echo "<div class='error'>";
    echo "<h3>⚠️ Missing Files Detected</h3>";
    echo "<p>$missingFiles section(s) reference image files that don't exist in storage.</p>";
    echo "<p><strong>Solutions:</strong></p>";
    echo "<ul>";
    echo "<li>If testing locally: Upload new images through the admin panel</li>";
    echo "<li>If on production: Copy the storage/app/public/information-sections folder from local to server</li>";
    echo "<li>Or: Re-upload images for affected sections</li>";
    echo "</ul>";
    echo "</div>";
}

// 4. URL Configuration Check
echo "<h2>4. URL Configuration</h2>";
echo "<p><strong>APP_URL:</strong> " . config('app.url') . "</p>";
echo "<p><strong>Asset URL:</strong> " . config('app.asset_url', 'Not set') . "</p>";
echo "<p><strong>Sample generated URL:</strong> " . asset('storage/information-sections/test.jpg') . "</p>";

echo "</body></html>";
