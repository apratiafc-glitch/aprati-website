<?php
// Check Nuxt Build Files Diagnostic
header('Content-Type: application/json');

$baseDir = __DIR__;
$checks = [
    '200.html' => file_exists($baseDir . '/200.html'),
    'index.html' => file_exists($baseDir . '/index.html'),
    '404.html' => file_exists($baseDir . '/404.html'),
    '_nuxt folder' => is_dir($baseDir . '/_nuxt'),
    '_payload.json' => file_exists($baseDir . '/_payload.json'),
];

// Get file sizes if they exist
$fileInfo = [];
if ($checks['200.html']) {
    $fileInfo['200.html'] = [
        'exists' => true,
        'size' => filesize($baseDir . '/200.html'),
        'path' => $baseDir . '/200.html'
    ];
}
if ($checks['index.html']) {
    $fileInfo['index.html'] = [
        'exists' => true,
        'size' => filesize($baseDir . '/index.html'),
        'path' => $baseDir . '/index.html'
    ];
}

// Count files in _nuxt if it exists
if ($checks['_nuxt folder']) {
    $nuxtFiles = glob($baseDir . '/_nuxt/*');
    $fileInfo['_nuxt'] = [
        'exists' => true,
        'file_count' => count($nuxtFiles),
        'path' => $baseDir . '/_nuxt'
    ];
}

echo json_encode([
    'base_directory' => $baseDir,
    'public_path' => public_path(),
    'checks' => $checks,
    'file_info' => $fileInfo,
    'all_files_ready' => $checks['200.html'] && $checks['index.html'] && $checks['_nuxt folder']
], JSON_PRETTY_PRINT);
