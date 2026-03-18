<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ManagementPost;
use Illuminate\Http\Request;

class ManagementPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ManagementPost::query();

        // If it's a public request, only show active posts
        if (!$request->bearerToken()) {
            $query->where('is_active', true);
        }

        $posts = $query->orderBy('sort_order')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'bio' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'department' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer'
        ]);

        $post = ManagementPost::create($validated);

        return response()->json([
            'success' => true,
            'data' => $post,
            'message' => 'Management post created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ManagementPost $managementPost)
    {
        return response()->json([
            'success' => true,
            'data' => $managementPost
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ManagementPost $managementPost)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'bio' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'department' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer'
        ]);

        if ($request->has('image') && $managementPost->image && $managementPost->image !== $request->image) {
            $oldPath = str_replace('/storage/', '', $managementPost->image);
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($oldPath)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
        }

        $managementPost->update($validated);

        return response()->json([
            'success' => true,
            'data' => $managementPost,
            'message' => 'Management post updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ManagementPost $managementPost)
    {
        if ($managementPost->image) {
            $path = str_replace('/storage/', '', $managementPost->image);
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($path)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
            }
        }

        $managementPost->delete();

        return response()->json([
            'success' => true,
            'message' => 'Management post deleted successfully'
        ]);
    }

    /**
     * Toggle the active status of the specified resource.
     */
    public function toggleStatus(ManagementPost $managementPost)
    {
        $managementPost->update([
            'is_active' => !$managementPost->is_active
        ]);

        return response()->json([
            'success' => true,
            'data' => $managementPost,
            'message' => 'Status toggled successfully'
        ]);
    }

    /**
     * Upload an image for management posts.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // 5MB
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('management/images', 'public');
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
