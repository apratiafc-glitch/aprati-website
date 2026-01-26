<?php
/**
 * Deploy .user.ini to increase upload limits
 * Useful for servers running PHP-FPM/FastCGI where .htaccess php_value doesn't work
 * Access: https://sdev.apratifoods.asia/deploy-user-ini.php?key=aprati2026
 */

if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('Access Denied');
}

$content = <<<INI
upload_max_filesize = 10M
post_max_size = 10M
memory_limit = 256M
max_execution_time = 300
INI;

$files = [
    __DIR__ . '/.user.ini',
    __DIR__ . '/aprati_backend/.user.ini',
    __DIR__ . '/aprati_backend/public/.user.ini'
];

echo "<h1>Deploying .user.ini</h1>";

foreach ($files as $file) {
    if (file_put_contents($file, $content)) {
        echo "<p style='color: green'>✅ Created: $file</p>";
    } else {
        echo "<p style='color: red'>❌ Failed to create: $file (Check permissions)</p>";
    }
}

echo "<hr>";
echo "<h3>Now check the configuration again:</h3>";
echo "<a href='check-upload-config.php?key=aprati2026' target='_blank'>Check Upload Config</a>";
