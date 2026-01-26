<?php
// Direct test of information sections without Laravel routing
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    // Load Laravel
    require __DIR__.'/../vendor/autoload.php';
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

    // Try to get information sections
    $sections = \App\Models\InformationSection::active()
        ->ordered()
        ->get()
        ->map(function ($section) {
            return [
                'id' => $section->id,
                'title' => $section->title,
                'description' => $section->description,
                'image_url' => $section->image_path ? asset('storage/' . $section->image_path) : asset('images/default-info.svg'),
                'is_active' => $section->is_active,
                'sort_order' => $section->sort_order,
                'created_at' => $section->created_at->format('Y-m-d H:i:s'),
            ];
        });

    echo json_encode([
        'success' => true,
        'message' => 'Direct test successful',
        'count' => $sections->count(),
        'data' => $sections
    ], JSON_PRETTY_PRINT);

} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => explode("\n", $e->getTraceAsString())
    ], JSON_PRETTY_PRINT);
}
