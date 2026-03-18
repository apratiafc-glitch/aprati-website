<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;

class AboutContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = AboutContent::query();

        // If it's a public request, only show active content
        if (!$request->bearerToken()) {
            $query->where('is_active', true);
        }

        $contents = $query->orderBy('sort_order')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $contents
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer'
        ]);

        $aboutContent = AboutContent::create($validated);

        return response()->json([
            'success' => true,
            'data' => $aboutContent,
            'message' => 'About content created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(AboutContent $aboutContent)
    {
        return response()->json([
            'success' => true,
            'data' => $aboutContent
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AboutContent $aboutContent)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'image_url' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer'
        ]);

        if ($request->has('image_url') && $aboutContent->image_url && $aboutContent->image_url !== $request->image_url) {
            // Extract relative path from stored URL if it's not the same
            $oldPath = str_replace('/storage/', '', $aboutContent->image_url);
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($oldPath)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
        }

        $aboutContent->update($validated);

        return response()->json([
            'success' => true,
            'data' => $aboutContent,
            'message' => 'About content updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AboutContent $aboutContent)
    {
        if ($aboutContent->image_url) {
            $path = str_replace('/storage/', '', $aboutContent->image_url);
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($path)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
            }
        }

        $aboutContent->delete();

        return response()->json([
            'success' => true,
            'message' => 'About content deleted successfully'
        ]);
    }

    /**
     * Upload an image for about content.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // 5MB
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('about-content', 'public');
            return response()->json([
                'success' => true,
                'url' => '/storage/' . $path,
                'message' => 'Image uploaded successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No image uploaded'
        ], 400);
    }
}
