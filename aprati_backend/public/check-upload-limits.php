<?php
// Check PHP upload configuration
echo "<h2>PHP Upload Configuration</h2>";
echo "<pre>";
echo "upload_max_filesize: " . ini_get('upload_max_filesize') . "\n";
echo "post_max_size: " . ini_get('post_max_size') . "\n";
echo "max_file_uploads: " . ini_get('max_file_uploads') . "\n";
echo "memory_limit: " . ini_get('memory_limit') . "\n";
echo "max_execution_time: " . ini_get('max_execution_time') . " seconds\n";
echo "max_input_time: " . ini_get('max_input_time') . " seconds\n";
echo "</pre>";

echo "<h2>Storage Directory Permissions</h2>";
echo "<pre>";
$storagePath = dirname(__DIR__) . '/storage/app/public';
if (file_exists($storagePath)) {
    echo "Storage path exists: Yes\n";
    echo "Storage path: $storagePath\n";
    echo "Is writable: " . (is_writable($storagePath) ? 'Yes' : 'No') . "\n";
    echo "Permissions: " . substr(sprintf('%o', fileperms($storagePath)), -4) . "\n";
} else {
    echo "Storage path exists: No\n";
    echo "Storage path: $storagePath\n";
}
echo "</pre>";
