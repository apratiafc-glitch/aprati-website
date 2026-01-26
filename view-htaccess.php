<?php
/**
 * View Current .htaccess
 * Access: https://sdev.apratifoods.asia/view-htaccess.php?key=aprati2026
 */

// Security check
if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('<h1>Access Denied</h1><p>Add ?key=aprati2026 to the URL</p>');
}

header('Content-Type: text/html; charset=utf-8');

$htaccessPath = __DIR__ . '/.htaccess';

echo "<h1>📄 Current .htaccess File</h1>";
echo "<p><strong>Location:</strong> <code>" . htmlspecialchars($htaccessPath) . "</code></p>";

if (file_exists($htaccessPath)) {
    echo "<p><strong>Size:</strong> " . filesize($htaccessPath) . " bytes</p>";
    echo "<p><strong>Last Modified:</strong> " . date('Y-m-d H:i:s', filemtime($htaccessPath)) . "</p>";

    echo "<h2>Current Content:</h2>";
    echo "<pre style='background: #2c3e50; color: #ecf0f1; padding: 15px; border-radius: 5px; overflow-x: auto;'>";
    echo htmlspecialchars(file_get_contents($htaccessPath));
    echo "</pre>";
} else {
    echo "<p style='color: red;'>❌ .htaccess file not found!</p>";
}

echo "<hr>";
echo "<p><strong>DELETE THIS FILE:</strong> <code>view-htaccess.php</code></p>";
?>