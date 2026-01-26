<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrivacyContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrivacyContentController extends Controller
{
    /**
     * Get all active privacy content sections for public view
     */
    public function index()
    {
        try {
            $sections = PrivacyContent::active()->ordered()->get();
            
            return response()->json([
                'success' => true,
                'data' => $sections
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load privacy content'
            ], 500);
        }
    }

    /**
     * Get all privacy content sections for admin view
     */
    public function adminIndex()
    {
        try {
            $sections = PrivacyContent::ordered()->get();
            
            return response()->json([
                'success' => true,
                'data' => $sections
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load privacy content'
            ], 500);
        }
    }

    /**
     * Show a specific privacy content section
     */
    public function show($id)
    {
        try {
            $section = PrivacyContent::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $section
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Privacy content section not found'
            ], 404);
        }
    }

    /**
     * Store a new privacy content section
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'language' => 'string|in:en,km',
                'is_active' => 'boolean',
                'sort_order' => 'integer|min:1'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $section = PrivacyContent::create([
                'title' => $request->title,
                'content' => $request->content,
                'language' => $request->input('language', 'en'),
                'is_active' => $request->boolean('is_active', true),
                'sort_order' => $request->integer('sort_order', 1)
            ]);

            return response()->json([
                'success' => true,
                'data' => $section,
                'message' => 'Privacy content section created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to create privacy content section'
            ], 500);
        }
    }

    /**
     * Update a privacy content section
     */
    public function update(Request $request, $id)
    {
        try {
            $section = PrivacyContent::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'language' => 'string|in:en,km',
                'is_active' => 'boolean',
                'sort_order' => 'integer|min:1'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $section->update([
                'title' => $request->title,
                'content' => $request->content,
                'language' => $request->input('language', 'en'),
                'is_active' => $request->boolean('is_active', true),
                'sort_order' => $request->integer('sort_order', 1)
            ]);

            return response()->json([
                'success' => true,
                'data' => $section,
                'message' => 'Privacy content section updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to update privacy content section'
            ], 500);
        }
    }

    /**
     * Delete a privacy content section
     */
    public function destroy($id)
    {
        try {
            $section = PrivacyContent::findOrFail($id);
            $section->delete();

            return response()->json([
                'success' => true,
                'message' => 'Privacy content section deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete privacy content section'
            ], 500);
        }
    }
}
