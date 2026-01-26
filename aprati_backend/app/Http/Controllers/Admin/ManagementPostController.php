<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManagementPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ManagementPostController extends Controller
{
    /**
     * Get all management posts (admin endpoint)
     */
    public function index()
    {
        try {
            $posts = ManagementPost::orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $posts,
                'message' => 'Management posts retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching management posts: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch management posts'
            ], 500);
        }
    }

    /**
     * Store a new management post
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean'
        ]);

        try {
            $post = ManagementPost::create([
                'name' => $request->name,
                'position' => $request->position ?? 'Management',
                'description' => $request->description,
                'department' => $request->department,
                'email' => $request->email,
                'bio' => $request->bio,
                'image_url' => $request->image_url,
                'is_active' => $request->boolean('is_active', true)
            ]);

            Log::info('Management post created', [
                'post_id' => $post->id,
                'name' => $post->name,
                'position' => $post->position
            ]);

            return response()->json([
                'success' => true,
                'data' => $post,
                'message' => 'Management post created successfully'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating management post: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to create management post'
            ], 500);
        }
    }

    /**
     * Show a specific management post
     */
    public function show($id)
    {
        try {
            $post = ManagementPost::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $post,
                'message' => 'Management post retrieved successfully'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Management post not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error fetching management post: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch management post'
            ], 500);
        }
    }

    /**
     * Update a management post
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean'
        ]);

        try {
            $post = ManagementPost::findOrFail($id);
            
            $post->update([
                'name' => $request->name,
                'position' => $request->position ?? $post->position ?? 'Management',
                'description' => $request->description,
                'department' => $request->department ?? $post->department,
                'email' => $request->email ?? $post->email,
                'bio' => $request->bio ?? $post->bio,
                'image_url' => $request->image_url ?? $post->image_url,
                'is_active' => $request->boolean('is_active', true)
            ]);

            Log::info('Management post updated', [
                'post_id' => $post->id,
                'name' => $post->name,
                'position' => $post->position
            ]);

            return response()->json([
                'success' => true,
                'data' => $post,
                'message' => 'Management post updated successfully'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Management post not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error updating management post: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to update management post'
            ], 500);
        }
    }

    /**
     * Toggle post status
     */
    public function toggleStatus($id)
    {
        try {
            $post = ManagementPost::findOrFail($id);
            $post->update(['is_active' => !$post->is_active]);

            Log::info('Management post status toggled', [
                'post_id' => $post->id,
                'name' => $post->name,
                'new_status' => $post->is_active ? 'active' : 'inactive'
            ]);

            return response()->json([
                'success' => true,
                'data' => $post,
                'message' => 'Post status updated successfully'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Management post not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error toggling post status: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to update post status'
            ], 500);
        }
    }

    /**
     * Upload image for management post
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048' // 2MB max
        ]);

        try {
            $image = $request->file('image');
            
            // Generate unique filename
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            
            // Store in public/management-posts directory
            $path = $image->storeAs('management-posts', $filename, 'public');
            
            // Get the full URL
            $imageUrl = asset('storage/' . $path);

            Log::info('Management post image uploaded', [
                'filename' => $filename,
                'path' => $path,
                'url' => $imageUrl
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'image_url' => $imageUrl,
                    'filename' => $filename,
                    'path' => $path
                ],
                'message' => 'Image uploaded successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error uploading management post image: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to upload image'
            ], 500);
        }
    }

    /**
     * Delete a management post
     */
    public function destroy($id)
    {
        try {
            $post = ManagementPost::findOrFail($id);
            $postName = $post->name;
            
            $post->delete();

            Log::info('Management post deleted', [
                'post_id' => $id,
                'name' => $postName
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Management post deleted successfully'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Management post not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting management post: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete management post'
            ], 500);
        }
    }
}
