<!DOCTYPE html>
<html>
<head>
    <title>Frontend Files Diagnostic</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #f5f5f5; }
        .status { padding: 10px; margin: 5px 0; border-radius: 5px; }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .warning { background: #fff3cd; color: #856404; }
        h1 { color: #333; }
        pre { background: #fff; padding: 10px; border: 1px solid #ddd; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>🔍 Frontend Files Diagnostic</h1>
    
    <?php
    $publicPath = __DIR__;
    
    echo "<h2>📁 Public Path</h2>";
    echo "<pre>$publicPath</pre>";
    
    echo "<h2>📄 Critical Files Check</h2>";
    
    $files = [
        '200.html' => '200.html',
        'index.html' => 'index.html',
        '404.html' => '404.html',
        '_payload.json' => '_payload.json',
        'Main JS Entry' => '_nuxt/D-fVgYib.js',
        'Main CSS' => '_nuxt/entry.BDTBZ547.css',
    ];
    
    foreach ($files as $label => $file) {
        $fullPath = $publicPath . '/' . $file;
        $exists = file_exists($fullPath);
        $size = $exists ? filesize($fullPath) : 0;
        $class = $exists ? 'success' : 'error';
        $status = $exists ? "✅ EXISTS ($size bytes)" : "❌ MISSING";
        
        echo "<div class='status $class'><strong>$label:</strong> $status<br><small>$fullPath</small></div>";
    }
    
    echo "<h2>📂 _nuxt Folder</h2>";
    $nuxtPath = $publicPath . '/_nuxt';
    if (is_dir($nuxtPath)) {
        $files = glob($nuxtPath . '/*');
        $fileCount = count($files);
        echo "<div class='status success'>✅ _nuxt folder exists with $fileCount files</div>";
        
        // Show first 10 files
        echo "<pre>";
        foreach (array_slice($files, 0, 10) as $file) {
            echo basename($file) . " (" . filesize($file) . " bytes)\n";
        }
        if ($fileCount > 10) {
            echo "... and " . ($fileCount - 10) . " more files\n";
        }
        echo "</pre>";
    } else {
        echo "<div class='status error'>❌ _nuxt folder NOT FOUND</div>";
    }
    
    echo "<h2>🔐 Routes Check</h2>";
    $routesPath = dirname($publicPath) . '/routes/web.php';
    if (file_exists($routesPath)) {
        echo "<div class='status success'>✅ routes/web.php exists (" . filesize($routesPath) . " bytes)</div>";
    } else {
        echo "<div class='status error'>❌ routes/web.php NOT FOUND at: $routesPath</div>";
    }
    
    echo "<h2>📝 200.html Content Preview</h2>";
    $html200 = file_get_contents($publicPath . '/200.html');
    if ($html200) {
        // Extract script src to verify correct build ID
        preg_match('/src="\/_nuxt\/([^"]+)"/', $html200, $matches);
        $scriptFile = $matches[1] ?? 'NOT FOUND';
        echo "<div class='status " . (strpos($html200, 'D-fVgYib.js') !== false ? 'success' : 'warning') . "'>";
        echo "Main entry point: <code>$scriptFile</code>";
        echo "</div>";
        
        echo "<pre>" . htmlspecialchars(substr($html200, 0, 500)) . "...</pre>";
    } else {
        echo "<div class='status error'>❌ Could not read 200.html</div>";
    }
    
    echo "<h2>🌐 Test Asset URLs</h2>";
    echo "<div class='status warning'>Try accessing these URLs directly:</div>";
    $baseUrl = 'https://sdev.apratifoods.asia';
    echo "<ul>";
    echo "<li><a href='$baseUrl/200.html' target='_blank'>$baseUrl/200.html</a></li>";
    echo "<li><a href='$baseUrl/_nuxt/D-fVgYib.js' target='_blank'>$baseUrl/_nuxt/D-fVgYib.js</a></li>";
    echo "<li><a href='$baseUrl/_nuxt/entry.BDTBZ547.css' target='_blank'>$baseUrl/_nuxt/entry.BDTBZ547.css</a></li>";
    echo "</ul>";
    ?>
    
    <h2>✅ Next Steps</h2>
    <div class="status warning">
        <ol>
            <li>Check all critical files show as "EXISTS"</li>
            <li>Click the test URLs above to verify they load (not 404)</li>
            <li>Clear browser cache (Ctrl+Shift+Delete)</li>
            <li>Visit <a href="https://sdev.apratifoods.asia/clear-all-cache.php?key=aprati2024secure">clear-all-cache.php</a></li>
            <li>Hard refresh admin page (Ctrl+F5)</li>
        </ol>
    </div>
</body>
</html>
