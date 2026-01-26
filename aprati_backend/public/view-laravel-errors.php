<?php
/**
 * View Laravel Error Logs
 */
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Laravel Error Logs</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #ff6b6b; font-size: 12px; }
        .error { color: #ff6b6b; }
        .warning { color: #ffd93d; }
        .info { color: #6bcfff; }
        pre { background: #000; padding: 15px; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; }
        .line { padding: 5px; border-bottom: 1px solid #333; }
    </style>
</head>
<body>
<h1>📋 Laravel Error Logs</h1>
<pre>
<?php

$logFile = __DIR__ . '/../storage/logs/laravel.log';

if (file_exists($logFile)) {
    echo "<span class='info'>✅ Log file found: $logFile</span>\n";
    echo "<span class='info'>File size: " . number_format(filesize($logFile)) . " bytes</span>\n\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "Last 100 lines:\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    $lines = file($logFile);
    $lastLines = array_slice($lines, -100);
    
    foreach ($lastLines as $i => $line) {
        $line = htmlspecialchars($line);
        if (strpos($line, 'ERROR') !== false) {
            echo "<span class='error'>$line</span>";
        } elseif (strpos($line, 'WARNING') !== false) {
            echo "<span class='warning'>$line</span>";
        } else {
            echo $line;
        }
    }
} else {
    echo "<span class='error'>❌ Log file not found at: $logFile</span>\n";
    
    // Check if storage directory exists
    $storageDir = __DIR__ . '/../storage/logs';
    if (!is_dir($storageDir)) {
        echo "<span class='error'>❌ Storage logs directory doesn't exist: $storageDir</span>\n";
        echo "<span class='info'>💡 Create the directory and set proper permissions</span>\n";
    } else {
        echo "<span class='info'>✅ Storage logs directory exists</span>\n";
        echo "<span class='info'>📁 Directory contents:</span>\n";
        $files = scandir($storageDir);
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                echo "  - $file\n";
            }
        }
    }
}

?>
</pre>
</body>
</html>
