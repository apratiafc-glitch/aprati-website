<?php
/**
 * Deploy php.ini to increase upload limits
 * Last resort for servers that don't read .htaccess or .user.ini
 * Access: https://sdev.apratifoods.asia/deploy-php-ini.php?key=aprati2026
 */

if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('Access Denied');
}

$content = <<<INI
upload_max_filesize = 10M
post_max_size = 10M
memory_limit = 256M
max_execution_time = 300
file_uploads = On
INI;

$files = [
    __DIR__ . '/php.ini',
    __DIR__ . '/aprati_backend/php.ini',
    __DIR__ . '/aprati_backend/public/php.ini'
];

echo "<h1>Deploying php.ini</h1>";

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
