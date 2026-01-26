<?php
/**
 * Fix localhost URLs in database - Web accessible version
 * Access via: https://sdev.apratifoods.asia/fix-urls.php
 * DELETE THIS FILE AFTER USE FOR SECURITY!
 */

// Security: Only allow access from specific IP or with password
$password = 'fix2024'; // Change this!
if (!isset($_GET['pass']) || $_GET['pass'] !== $password) {
    die('Access denied. Add ?pass=fix2024 to URL');
}

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

header('Content-Type: text/html; charset=utf-8');
echo '<!DOCTYPE html><html><head><title>Fix URLs</title></head><body>';
echo '<h1>🔧 Fixing localhost URLs in database...</h1><pre>';

$fixes = [
    ['table' => 'about_contents', 'column' => 'image_url'],
    ['table' => 'management_posts', 'column' => 'image_url'],
    ['table' => 'information_sections', 'column' => 'image_url'],
    ['table' => 'products', 'column' => 'image_url'],
    ['table' => 'brands', 'column' => 'logo_url'],
];

$totalFixed = 0;

foreach ($fixes as $fix) {
    $table = $fix['table'];
    $column = $fix['column'];
    
    echo "\nChecking table: {$table}, column: {$column}\n";
    
    try {
        if (!DB::getSchemaBuilder()->hasTable($table)) {
            echo "  ⚠️ Table does not exist, skipping...\n";
            continue;
        }
        
        if (!DB::getSchemaBuilder()->hasColumn($table, $column)) {
            echo "  ⚠️ Column does not exist, skipping...\n";
            continue;
        }
        
        // Fix localhost URLs
        $count = DB::table($table)
            ->where($column, 'LIKE', '%127.0.0.1:8000%')
            ->orWhere($column, 'LIKE', '%localhost%')
            ->update([
                $column => DB::raw("REPLACE(REPLACE({$column}, 'http://127.0.0.1:8000', 'https://sdev.apratifoods.asia'), 'http://localhost', 'https://sdev.apratifoods.asia')")
            ]);
        
        if ($count > 0) {
            echo "  ✅ Fixed {$count} rows\n";
            $totalFixed += $count;
        } else {
            echo "  ✓ No localhost URLs found\n";
        }
        
    } catch (\Exception $e) {
        echo "  ❌ Error: " . $e->getMessage() . "\n";
    }
}

echo "\n\n✅ COMPLETE! Fixed {$totalFixed} total URLs\n";
echo "\n⚠️ IMPORTANT: DELETE THIS FILE NOW FOR SECURITY!\n";
echo '</pre></body></html>';
