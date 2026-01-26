<?php
/**
 * Direct API endpoint bypassing Laravel routing
 * This serves the information sections directly
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    require __DIR__ . '/../vendor/autoload.php';
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();

    $sections = App\Models\InformationSection::active()
        ->ordered()
        ->get()
        ->map(function ($section) {
            return [
                'id' => $section->id,
                'title' => $section->title,
                'description' => $section->description,
                'image_url' => $section->image_path 
                    ? asset('storage/' . $section->image_path) 
                    : asset('images/default-info.svg'),
                'is_active' => $section->is_active,
                'sort_order' => $section->sort_order,
                'created_at' => $section->created_at->format('Y-m-d H:i:s'),
            ];
        });

    echo json_encode([
        'success' => true,
        'data' => $sections,
        'count' => $sections->count(),
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ], JSON_PRETTY_PRINT);
}
