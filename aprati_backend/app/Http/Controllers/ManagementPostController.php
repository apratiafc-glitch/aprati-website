<?php

namespace App\Http\Controllers;

use App\Models\ManagementPost;
use Illuminate\Http\Request;

class ManagementPostController extends Controller
{
    /**
     * Get all active management posts (public endpoint)
     */
    public function index()
    {
        try {
            $posts = ManagementPost::active()
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $posts,
                'message' => 'Management posts retrieved successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching management posts: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch management posts'
            ], 500);
        }
    }

    /**
     * Get a specific management post
     */
    public function show($id)
    {
        try {
            $post = ManagementPost::active()->findOrFail($id);

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
            \Log::error('Error fetching management post: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch management post'
            ], 500);
        }
    }
}
