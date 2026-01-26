<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class HeroImageController extends Controller
{
    /**
     * Get the active hero image for public display
     */
    public function getActive()
    {
        try {
            $heroImage = HeroImage::getActive();
            
            if (!$heroImage) {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'image_url' => '/images/default-hero.svg',
                        'alt_text' => 'Aprati Food Company',
                        'title' => null,
                        'description' => null
                    ]
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $heroImage
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hero image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of all hero images (Admin only)
     */
    public function index()
    {
        try {
            $heroImages = HeroImage::orderBy('sort_order')->get();
            
            return response()->json([
                'success' => true,
                'data' => $heroImages
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hero images'
            ], 500);
        }
    }

    /**
     * Store a newly created hero image (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
            'alt_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
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
            // Handle file upload
            $imageUrl = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '_hero_' . $image->getClientOriginalName();
                $path = $image->storeAs('hero-images', $filename, 'public');
                $imageUrl = '/storage/' . $path;
            }

            // Convert is_active from string to boolean
            $isActive = $request->get('is_active') === '1' || $request->get('is_active') === 'true' || $request->get('is_active') === true;

            // If this is set as active, deactivate others
            if ($isActive) {
                HeroImage::where('is_active', true)->update(['is_active' => false]);
            }

            $heroImage = HeroImage::create([
                'image_url' => $imageUrl,
                'alt_text' => $request->alt_text,
                'title' => $request->title,
                'description' => $request->description,
                'is_active' => $isActive,
                'sort_order' => $request->get('sort_order', 0)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Hero image created successfully',
                'data' => $heroImage
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create hero image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified hero image
     */
    public function show(HeroImage $heroImage)
    {
        return response()->json([
            'success' => true,
            'data' => $heroImage
        ]);
    }

    /**
     * Update the specified hero image (Admin only)
     */
    public function update(Request $request, HeroImage $heroImage)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'alt_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
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
            $data = $request->only(['alt_text', 'title', 'description', 'is_active', 'sort_order']);

            // Handle file upload if provided
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($heroImage->image_url && str_starts_with($heroImage->image_url, '/storage/')) {
                    $oldPath = str_replace('/storage/', '', $heroImage->image_url);
                    Storage::disk('public')->delete($oldPath);
                }

                $image = $request->file('image');
                $filename = time() . '_hero_' . $image->getClientOriginalName();
                $path = $image->storeAs('hero-images', $filename, 'public');
                $data['image_url'] = '/storage/' . $path;
            }

            // If this is set as active, deactivate others
            if ($request->get('is_active', false) && !$heroImage->is_active) {
                HeroImage::where('is_active', true)->update(['is_active' => false]);
            }

            $heroImage->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Hero image updated successfully',
                'data' => $heroImage->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update hero image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified hero image (Admin only)
     */
    public function destroy(HeroImage $heroImage)
    {
        try {
            // Delete image file if exists
            if ($heroImage->image_url && str_starts_with($heroImage->image_url, '/storage/')) {
                $path = str_replace('/storage/', '', $heroImage->image_url);
                Storage::disk('public')->delete($path);
            }

            $heroImage->delete();

            return response()->json([
                'success' => true,
                'message' => 'Hero image deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete hero image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Set a hero image as active (Admin only)
     */
    public function setActive(HeroImage $heroImage)
    {
        try {
            // Deactivate all others
            HeroImage::where('is_active', true)->update(['is_active' => false]);
            
            // Activate this one
            $heroImage->update(['is_active' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Hero image set as active successfully',
                'data' => $heroImage->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to set hero image as active',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
