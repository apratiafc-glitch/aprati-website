<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class HeroSlideController extends Controller
{
    /**
     * Get active hero slides for public display
     * Returns all active slides sorted by display_order
     */
    public function getActiveSlides()
    {
        try {
            $slides = HeroSlide::where('is_active', true)
                ->orderBy('display_order', 'asc')
                ->get();

            Log::info('Hero slides retrieved', [
                'count' => $slides->count(),
                'slides' => $slides->toArray()
            ]);

            return response()->json([
                'success' => true,
                'data' => $slides,
                'message' => 'Hero slides retrieved successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to retrieve hero slides', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hero slides',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of all hero slides (Admin only)
     */
    public function index()
    {
        try {
            $slides = HeroSlide::orderBy('display_order', 'asc')->get();

            return response()->json([
                'success' => true,
                'data' => $slides
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve hero slides',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created hero slide (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:500',
            'subtitle' => 'nullable|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_alt' => 'nullable|string|max:255',
            'badge_text' => 'nullable|string|max:255',
            'badge_color' => 'nullable|string|max:255',
            'overlay_class' => 'nullable|string|max:255',
            'primary_button_text' => 'nullable|string|max:100',
            'primary_button_link' => 'nullable|string|max:255',
            'primary_button_class' => 'nullable|string|max:500',
            'secondary_button_text' => 'nullable|string|max:100',
            'secondary_button_link' => 'nullable|string|max:255',
            'secondary_button_class' => 'nullable|string|max:500',
            'is_active' => 'nullable|boolean',
            'display_order' => 'nullable|integer|min:0'
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
                $filename = time() . '_hero_slide_' . $image->getClientOriginalName();
                $path = $image->storeAs('hero-slides', $filename, 'public');
                $imageUrl = '/storage/' . $path;
            }

            // Get the next display order if not provided
            $displayOrder = $request->display_order ?? HeroSlide::max('display_order') + 1;

            $slide = HeroSlide::create([
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'image_url' => $imageUrl,
                'image_alt' => $request->image_alt ?? $request->title,
                'badge_text' => $request->badge_text,
                'badge_color' => $request->badge_color ?? 'bg-blue-600 shadow-blue-500/50',
                'overlay_class' => $request->overlay_class ?? 'bg-blue-600/30',
                'primary_button_text' => $request->primary_button_text,
                'primary_button_link' => $request->primary_button_link,
                'primary_button_class' => $request->primary_button_class,
                'secondary_button_text' => $request->secondary_button_text,
                'secondary_button_link' => $request->secondary_button_link,
                'secondary_button_class' => $request->secondary_button_class,
                'is_active' => $request->is_active ?? true,
                'display_order' => $displayOrder,
            ]);

            Log::info('Hero slide created', ['slide' => $slide]);

            return response()->json([
                'success' => true,
                'message' => 'Hero slide created successfully',
                'data' => $slide
            ], 201);
        } catch (\Exception $e) {
            Log::error('Failed to create hero slide', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create hero slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified hero slide
     */
    public function show($id)
    {
        try {
            $slide = HeroSlide::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $slide
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hero slide not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified hero slide (Admin only)
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:500',
            'subtitle' => 'nullable|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_alt' => 'nullable|string|max:255',
            'badge_text' => 'nullable|string|max:255',
            'badge_color' => 'nullable|string|max:255',
            'overlay_class' => 'nullable|string|max:255',
            'primary_button_text' => 'nullable|string|max:100',
            'primary_button_link' => 'nullable|string|max:255',
            'primary_button_class' => 'nullable|string|max:500',
            'secondary_button_text' => 'nullable|string|max:100',
            'secondary_button_link' => 'nullable|string|max:255',
            'secondary_button_class' => 'nullable|string|max:500',
            'is_active' => 'nullable|boolean',
            'display_order' => 'nullable|integer|min:0'
        ]);

        if ($validator->fails()) {
            Log::error('Hero Slide Validation Failed', [
                'errors' => $validator->errors()->toArray(),
                'inputs' => $request->except(['image'])
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $slide = HeroSlide::findOrFail($id);

            // Handle file upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($slide->image_url) {
                    $oldPath = str_replace('/storage/', '', $slide->image_url);
                    Storage::disk('public')->delete($oldPath);
                }

                $image = $request->file('image');
                $filename = time() . '_hero_slide_' . $image->getClientOriginalName();
                $path = $image->storeAs('hero-slides', $filename, 'public');
                $slide->image_url = '/storage/' . $path;
            }

            $slide->update([
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'image_alt' => $request->image_alt ?? $request->title,
                'badge_text' => $request->badge_text,
                'badge_color' => $request->badge_color,
                'overlay_class' => $request->overlay_class,
                'primary_button_text' => $request->primary_button_text,
                'primary_button_link' => $request->primary_button_link,
                'primary_button_class' => $request->primary_button_class,
                'secondary_button_text' => $request->secondary_button_text,
                'secondary_button_link' => $request->secondary_button_link,
                'secondary_button_class' => $request->secondary_button_class,
                'is_active' => $request->has('is_active') ? $request->is_active : $slide->is_active,
                'display_order' => $request->display_order ?? $slide->display_order,
            ]);

            Log::info('Hero slide updated', ['slide' => $slide]);

            return response()->json([
                'success' => true,
                'message' => 'Hero slide updated successfully',
                'data' => $slide
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update hero slide', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update hero slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status of a hero slide
     */
    public function toggleActive($id)
    {
        try {
            $slide = HeroSlide::findOrFail($id);
            $slide->is_active = !$slide->is_active;
            $slide->save();

            return response()->json([
                'success' => true,
                'message' => 'Hero slide status updated',
                'data' => $slide
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle hero slide status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update display order of hero slides
     */
    public function updateOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'slides' => 'required|array',
            'slides.*.id' => 'required|exists:hero_slides,id',
            'slides.*.display_order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            foreach ($request->slides as $slideData) {
                HeroSlide::where('id', $slideData['id'])
                    ->update(['display_order' => $slideData['display_order']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Display order updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update display order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified hero slide (Admin only)
     */
    public function destroy($id)
    {
        try {
            $slide = HeroSlide::findOrFail($id);

            // Delete image file if exists
            if ($slide->image_url) {
                $path = str_replace('/storage/', '', $slide->image_url);
                Storage::disk('public')->delete($path);
            }

            $slide->delete();

            Log::info('Hero slide deleted', ['id' => $id]);

            return response()->json([
                'success' => true,
                'message' => 'Hero slide deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to delete hero slide', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete hero slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
