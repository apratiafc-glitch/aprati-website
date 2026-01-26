<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HeroContentController extends Controller
{
    /**
     * Get the active hero content for public display
     */
    public function getActive()
    {
        try {
            $heroContent = HeroContent::getActive();
            
            if (!$heroContent) {
                return response()->json([
                    'success' => true,
                    'data' => HeroContent::getDefault()
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $heroContent
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hero content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of all hero contents (Admin only)
     */
    public function index()
    {
        try {
            $heroContents = HeroContent::orderBy('sort_order')->get();
            
            return response()->json([
                'success' => true,
                'data' => $heroContents
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hero contents'
            ], 500);
        }
    }

    /**
     * Store a newly created hero content (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:500',
            'subtitle' => 'nullable|string',
            'primary_button_text' => 'required|string|max:100',
            'primary_button_link' => 'required|string|max:255',
            'secondary_button_text' => 'required|string|max:100',
            'secondary_button_link' => 'required|string|max:255',
            'is_active' => 'nullable',
            'sort_order' => 'nullable|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Convert is_active from string to boolean
            $isActive = $request->get('is_active') === '1' || $request->get('is_active') === 'true' || $request->get('is_active') === true;

            // If this is set as active, deactivate others
            if ($isActive) {
                HeroContent::where('is_active', true)->update(['is_active' => false]);
            }

            $heroContent = HeroContent::create([
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'primary_button_text' => $request->primary_button_text,
                'primary_button_link' => $request->primary_button_link,
                'secondary_button_text' => $request->secondary_button_text,
                'secondary_button_link' => $request->secondary_button_link,
                'is_active' => $isActive,
                'sort_order' => $request->get('sort_order', 0)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Hero content created successfully',
                'data' => $heroContent
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create hero content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified hero content
     */
    public function show(HeroContent $heroContent)
    {
        return response()->json([
            'success' => true,
            'data' => $heroContent
        ]);
    }

    /**
     * Update the specified hero content (Admin only)
     */
    public function update(Request $request, HeroContent $heroContent)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:500',
            'subtitle' => 'nullable|string',
            'primary_button_text' => 'required|string|max:100',
            'primary_button_link' => 'required|string|max:255',
            'secondary_button_text' => 'required|string|max:100',
            'secondary_button_link' => 'required|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $request->only([
                'title', 'subtitle', 'primary_button_text', 'primary_button_link',
                'secondary_button_text', 'secondary_button_link', 'is_active', 'sort_order'
            ]);

            // If this is set as active, deactivate others
            if ($request->get('is_active', false) && !$heroContent->is_active) {
                HeroContent::where('is_active', true)->update(['is_active' => false]);
            }

            $heroContent->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Hero content updated successfully',
                'data' => $heroContent->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update hero content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified hero content (Admin only)
     */
    public function destroy(HeroContent $heroContent)
    {
        try {
            $heroContent->delete();

            return response()->json([
                'success' => true,
                'message' => 'Hero content deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete hero content',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Set a hero content as active (Admin only)
     */
    public function setActive(HeroContent $heroContent)
    {
        try {
            // Deactivate all others
            HeroContent::where('is_active', true)->update(['is_active' => false]);
            
            // Activate this one
            $heroContent->update(['is_active' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Hero content set as active successfully',
                'data' => $heroContent->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to set hero content as active',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
