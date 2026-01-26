<?php
/**
 * Find Laravel Directories
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/html; charset=utf-8');

echo "<html><head><title>Find Laravel</title>";
echo "<style>body{font-family:monospace;padding:20px;background:#f5f5f5;}
.ok{color:green;} .error{color:red;} .path{background:#fff;padding:10px;border-radius:5px;margin:10px 0;}</style>";
echo "</head><body><h1>🔍 Find Laravel Structure</h1>";

$currentDir = __DIR__;
echo "<h2>Current Directory:</h2>";
echo "<div class='path'>$currentDir</div>";

echo "<h2>Parent Directories:</h2>";
$parent1 = dirname($currentDir);
$parent2 = dirname($parent1);
$parent3 = dirname($parent2);

echo "<div class='path'>Level 1: $parent1</div>";
echo "<div class='path'>Level 2: $parent2</div>";
echo "<div class='path'>Level 3: $parent3</div>";

echo "<h2>Looking for Laravel Files:</h2>";

// Check different possible locations
$possiblePaths = [
    $currentDir . '/../routes/web.php',
    $parent1 . '/routes/web.php',
    $parent2 . '/routes/web.php',
    $parent3 . '/routes/web.php',
    $currentDir . '/../../routes/web.php',
];

foreach ($possiblePaths as $path) {
    $realPath = realpath($path);
    $exists = file_exists($path);
    echo "<p><strong>$path:</strong> <span class='" . ($exists ? 'ok' : 'error') . "'>";
    echo $exists ? "✅ EXISTS" : "❌ NOT FOUND";
    if ($realPath) echo " (Real: $realPath)";
    echo "</span></p>";
}

echo "<h2>Directory Contents:</h2>";

// List what's actually in parent directories
$dirs = [$currentDir, $parent1, $parent2];
foreach ($dirs as $dir) {
    if (is_dir($dir)) {
        echo "<h3>$dir:</h3>";
        $contents = @scandir($dir);
        if ($contents) {
            echo "<ul>";
            foreach ($contents as $item) {
                if ($item != '.' && $item != '..') {
                    $isDir = is_dir($dir . '/' . $item);
                    echo "<li>" . ($isDir ? "📁 " : "📄 ") . $item . "</li>";
                }
            }
            echo "</ul>";
        }
    }
}

echo "</body></html>";
?>
