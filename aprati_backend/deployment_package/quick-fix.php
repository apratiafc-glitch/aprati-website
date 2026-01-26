<?php
echo "Running Laravel optimization...\n";
$commands = [
    'php artisan config:clear',
    'php artisan route:clear',
    'php artisan cache:clear',
    'php artisan view:clear',
    'php artisan route:cache',
    'php artisan config:cache',
];
foreach ($commands as $cmd) {
    echo "$ $cmd\n";
    system($cmd);
}
echo "\nDone! Test your API endpoints now.\n";
