#!/usr/bin/env php
<?php

echo "=================================================\n";
echo "LARAVEL CACHE CLEAR & ROUTE FIX\n";
echo "=================================================\n\n";

$commands = [
    'php artisan config:clear' => 'Clearing config cache',
    'php artisan route:clear' => 'Clearing route cache',
    'php artisan cache:clear' => 'Clearing application cache',
    'php artisan view:clear' => 'Clearing view cache',
    'php artisan optimize:clear' => 'Clearing all optimization caches',
    'php artisan route:cache' => 'Caching routes for production',
    'php artisan config:cache' => 'Caching config for production',
];

foreach ($commands as $command => $description) {
    echo "➜ $description...\n";
    echo "  Command: $command\n";
    
    $output = [];
    $returnCode = 0;
    exec($command . ' 2>&1', $output, $returnCode);
    
    if ($returnCode === 0) {
        echo "  ✅ Success\n";
    } else {
        echo "  ❌ Failed (Code: $returnCode)\n";
        if (!empty($output)) {
            echo "  Output: " . implode("\n  ", $output) . "\n";
        }
    }
    echo "\n";
}

echo "\n=================================================\n";
echo "TESTING API ROUTES\n";
echo "=================================================\n\n";

// Test if artisan can list routes
echo "➜ Listing API routes...\n";
$output = [];
exec('php artisan route:list --path=api --columns=method,uri,name 2>&1', $output);
echo implode("\n", $output) . "\n\n";

echo "\n=================================================\n";
echo "RECOMMENDATIONS FOR PRODUCTION SERVER\n";
echo "=================================================\n\n";

echo "1. Upload this script to your server and run:\n";
echo "   php fix-routes-production.php\n\n";

echo "2. Verify .htaccess in public directory exists\n\n";

echo "3. Check Apache/Nginx configuration:\n";
echo "   - Document root should point to: /path/to/aprati_backend/public\n";
echo "   - mod_rewrite must be enabled (Apache)\n";
echo "   - AllowOverride All must be set (Apache)\n\n";

echo "4. Verify file permissions:\n";
echo "   chmod -R 755 storage bootstrap/cache\n";
echo "   chown -R www-data:www-data storage bootstrap/cache\n\n";

echo "5. Test API endpoint manually:\n";
echo "   curl https://sdev.apratifoods.asia/api/brands\n\n";

echo "6. Check Laravel logs:\n";
echo "   tail -f storage/logs/laravel.log\n\n";

echo "=================================================\n";
echo "COMPLETE\n";
echo "=================================================\n";
