<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;

class AboutContentController extends Controller
{
    /**
     * Get all active about content sections.
     */
    public function index()
    {
        try {
            $contents = AboutContent::active()
                ->ordered()
                ->get()
                ->keyBy('key');

            return response()->json([
                'success' => true,
                'data' => $contents
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load about content'
            ], 500);
        }
    }

    /**
     * Get specific about content by key.
     */
    public function getByKey($key)
    {
        try {
            $content = AboutContent::active()
                ->byKey($key)
                ->first();

            if (!$content) {
                return response()->json([
                    'success' => false,
                    'error' => 'Content not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $content
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load content'
            ], 500);
        }
    }
}
