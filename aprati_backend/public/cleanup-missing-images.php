<?php
/**
 * Clean up Information Sections with missing image files
 * This will identify and optionally fix records pointing to non-existent files
 */

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\InformationSection;

echo "<!DOCTYPE html><html><head><title>Cleanup Missing Images</title>";
echo "<style>body{font-family:Arial,sans-serif;padding:20px;} .error{color:red;background:#ffe6e6;padding:10px;margin:10px 0;} .info{color:blue;background:#e6f3ff;padding:10px;margin:10px 0;} button{background:#4CAF50;color:white;padding:10px 20px;border:none;cursor:pointer;margin:5px;} button.danger{background:#f44336;}</style>";
echo "</head><body>";
echo "<h1>🧹 Cleanup Information Sections</h1>";

$sections = InformationSection::all();
$storagePath = storage_path('app/public/information-sections');
$broken = [];

foreach ($sections as $section) {
    if ($section->image_path) {
        $fullPath = $storagePath . '/' . basename($section->image_path);
        if (!file_exists($fullPath)) {
            $broken[] = [
                'section' => $section,
                'missing_file' => basename($section->image_path)
            ];
        }
    }
}

if (empty($broken)) {
    echo "<div class='info'>✅ All information sections have valid image files!</div>";
} else {
    echo "<div class='error'>";
    echo "<h2>⚠️ Found " . count($broken) . " section(s) with missing images:</h2>";
    echo "<table border='1' cellpadding='10' style='border-collapse:collapse;'>";
    echo "<tr><th>ID</th><th>Title</th><th>Missing File</th><th>Action</th></tr>";
    
    foreach ($broken as $item) {
        $section = $item['section'];
        echo "<tr>";
        echo "<td>{$section->id}</td>";
        echo "<td>{$section->title}</td>";
        echo "<td>{$item['missing_file']}</td>";
        echo "<td>";
        echo "<form method='POST' style='display:inline;'>";
        echo "<input type='hidden' name='action' value='clear_image'>";
        echo "<input type='hidden' name='section_id' value='{$section->id}'>";
        echo "<button type='submit' class='danger'>Clear Image Path</button>";
        echo "</form>";
        echo " or ";
        echo "<a href='/admin/information-sections'>Re-upload Image</a>";
        echo "</td>";
        echo "</tr>";
    }
    echo "</table>";
    echo "</div>";
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'clear_image' && isset($_POST['section_id'])) {
        $section = InformationSection::find($_POST['section_id']);
        if ($section) {
            $section->update(['image_path' => null]);
            echo "<div class='info'>✅ Cleared image path for: {$section->title}</div>";
            echo "<script>setTimeout(() => window.location.reload(), 1000);</script>";
        }
    }
}

echo "<hr>";
echo "<h2>Options:</h2>";
echo "<ul>";
echo "<li><strong>Clear Image Path:</strong> Removes the broken image reference (section will show placeholder)</li>";
echo "<li><strong>Re-upload Image:</strong> Go to admin panel and upload a new image for that section</li>";
echo "</ul>";

echo "</body></html>";
