<?php
/**
 * Server Structure Diagnostic
 * Access: https://sdev.apratifoods.asia/check-structure.php?key=aprati2026
 */

// Security check
if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('<h1>Access Denied</h1><p>Add ?key=aprati2026 to the URL</p>');
}

header('Content-Type: text/html; charset=utf-8');

?>
<!DOCTYPE html>
<html>

<head>
    <title>Server Structure Diagnostic</title>
    <style>
        body {
            font-family: Arial;
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background: #f5f5f5;
        }

        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }

        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }

        .good {
            color: #27ae60;
            font-weight: bold;
        }

        .bad {
            color: #e74c3c;
            font-weight: bold;
        }

        .info {
            background: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }

        th,
        td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }

        th {
            background: #3498db;
            color: white;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🔍 Server Structure Diagnostic</h1>

        <?php
        echo "<h2>📂 Current File Location</h2>";
        echo "<table>";
        echo "<tr><th>Property</th><th>Value</th></tr>";
        echo "<tr><td>__FILE__</td><td><code>" . __FILE__ . "</code></td></tr>";
        echo "<tr><td>__DIR__</td><td><code>" . __DIR__ . "</code></td></tr>";
        echo "<tr><td>\$_SERVER['DOCUMENT_ROOT']</td><td><code>" . $_SERVER['DOCUMENT_ROOT'] . "</code></td></tr>";
        echo "<tr><td>\$_SERVER['SCRIPT_FILENAME']</td><td><code>" . $_SERVER['SCRIPT_FILENAME'] . "</code></td></tr>";
        echo "<tr><td>\$_SERVER['REQUEST_URI']</td><td><code>" . $_SERVER['REQUEST_URI'] . "</code></td></tr>";
        echo "</table>";

        $docRoot = $_SERVER['DOCUMENT_ROOT'];

        echo "<h2>📄 .htaccess Files Found</h2>";
        echo "<table>";
        echo "<tr><th>Location</th><th>Exists</th><th>Size</th><th>Modified</th></tr>";

        $htaccessLocations = [
            $docRoot . '/.htaccess',
            $docRoot . '/public/.htaccess',
            $docRoot . '/aprati_backend/.htaccess',
            $docRoot . '/aprati_backend/public/.htaccess',
            __DIR__ . '/.htaccess',
        ];

        foreach ($htaccessLocations as $path) {
            echo "<tr>";
            echo "<td><code>" . htmlspecialchars($path) . "</code></td>";
            if (file_exists($path)) {
                echo "<td class='good'>✅ YES</td>";
                echo "<td>" . filesize($path) . " bytes</td>";
                echo "<td>" . date('Y-m-d H:i:s', filemtime($path)) . "</td>";

                echo "</tr><tr><td colspan='4'>";
                echo "<details><summary>View Content</summary>";
                echo "<pre>" . htmlspecialchars(file_get_contents($path)) . "</pre>";
                echo "</details>";
                echo "</td>";
            } else {
                echo "<td class='bad'>❌ NO</td>";
                echo "<td>-</td>";
                echo "<td>-</td>";
            }
            echo "</tr>";
        }
        echo "</table>";

        echo "<h2>🌐 Web Root Structure</h2>";
        echo "<pre>";

        function listDirectory($dir, $prefix = '', $depth = 0)
        {
            if ($depth > 2)
                return; // Limit depth
        
            $items = @scandir($dir);
            if (!$items)
                return;

            foreach ($items as $item) {
                if ($item === '.' || $item === '..')
                    continue;

                $path = $dir . '/' . $item;
                $isDir = is_dir($path);

                echo $prefix . ($isDir ? '📁 ' : '📄 ') . $item;

                if ($item === '.htaccess') {
                    echo " <-- IMPORTANT!";
                }

                echo "\n";

                if ($isDir && $depth < 2) {
                    listDirectory($path, $prefix . '  ', $depth + 1);
                }
            }
        }

        listDirectory($docRoot);

        echo "</pre>";

        echo "<h2>🔧 Diagnosis</h2>";
        echo "<div class='info'>";

        $rootHtaccess = $docRoot . '/.htaccess';
        $publicHtaccess = $docRoot . '/aprati_backend/public/.htaccess';

        if (file_exists($rootHtaccess)) {
            echo "<p><strong class='good'>✅ Found .htaccess in web root:</strong> <code>$rootHtaccess</code></p>";
            echo "<p>This is the .htaccess file that Apache is using!</p>";

            $content = file_get_contents($rootHtaccess);
            if (strpos($content, 'index.php') !== false) {
                echo "<p class='good'>✅ Contains 'index.php' - likely correct</p>";
            } else {
                echo "<p class='bad'>❌ Does NOT contain 'index.php' - needs fixing!</p>";
            }
        } else {
            echo "<p class='bad'>❌ No .htaccess in web root: <code>$rootHtaccess</code></p>";
        }

        if (file_exists($publicHtaccess)) {
            echo "<p><strong>ℹ️ Found .htaccess in Laravel public folder:</strong> <code>$publicHtaccess</code></p>";
            echo "<p>This is NOT being used because it's not in the document root!</p>";
        }

        echo "<p><strong>⚠️ Action Required:</strong> The correct .htaccess needs to be placed at: <code>$rootHtaccess</code></p>";

        echo "</div>";
        ?>

        <p><strong>DELETE THIS FILE after diagnosis:</strong> <code>check-structure.php</code></p>
    </div>
</body>

</html>