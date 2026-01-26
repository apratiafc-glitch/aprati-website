<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PromotionBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PromotionBannerController extends Controller
{
    /**
     * Display a listing of active banners (public).
     */
    public function index()
    {
        try {
            $banners = PromotionBanner::active()->get();
            return response()->json([
                'status' => 'success',
                'data' => $banners
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch banners'
            ], 500);
        }
    }

    /**
     * Display a listing of all banners (admin).
     */
    public function adminIndex()
    {
        try {
            $banners = PromotionBanner::orderBy('display_order')->orderBy('updated_at', 'desc')->get();
            return response()->json([
                'status' => 'success',
                'data' => $banners
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch banners'
            ], 500);
        }
    }

    /**
     * Store a newly created banner.
     */
    public function store(Request $request)
    {
        try {
            // Debug: Log incoming request data
            \Log::info('=== PROMOTION BANNER CREATE REQUEST ===');
            \Log::info('Request All:', $request->all());
            \Log::info('Has File (image):', ['hasFile' => $request->hasFile('image')]);
            \Log::info('All Files:', $request->allFiles());

            // Simple, clear validation
            $rules = [
                'title' => 'nullable|string|max:255',
                'subtitle' => 'nullable|string|max:255',
                'background_color' => 'nullable|string|max:50',
                'text_color' => 'nullable|string|max:50',
                'button_text' => 'nullable|string|max:50',
                'button_link' => 'nullable|string|max:255',
            ];

            // Only validate image if it's present
            if ($request->hasFile('image')) {
                $rules['image'] = 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240';
            } else {
                // No image provided - this is required for new banners
                \Log::error('No image file provided for new banner');
                return response()->json([
                    'status' => 'error',
                    'message' => 'Image is required for new banners',
                    'errors' => ['image' => ['The image field is required.']]
                ], 422);
            }

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                \Log::error('Validation Failed:', $validator->errors()->toArray());
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Handle image upload
            $path = '';
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('banners', $filename, 'public');
                $path = '/storage/banners/' . $filename;
                \Log::info('Image uploaded:', ['path' => $path]);
            }

            $count = PromotionBanner::count();

            // Prepare data with proper type conversion
            $data = [
                'title' => $request->input('title'),
                'subtitle' => $request->input('subtitle'),
                'image_url' => $path,
                'background_color' => $request->input('background_color', '#EF4444'),
                'text_color' => $request->input('text_color', 'text-white'),
                'button_text' => $request->input('button_text'),
                'button_link' => $request->input('button_link'),
                'display_order' => $count + 1,
            ];

            // Handle is_active with proper conversion
            $isActive = $request->input('is_active', '1');
            $data['is_active'] = in_array($isActive, ['1', 'true', true, 1], true);

            \Log::info('Creating banner with data:', $data);

            $banner = PromotionBanner::create($data);

            \Log::info('Banner created successfully:', ['id' => $banner->id]);

            return response()->json([
                'status' => 'success',
                'message' => 'Banner created successfully',
                'data' => $banner
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Failed to create banner:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create banner: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified banner.
     */
    public function update(Request $request, $id)
    {
        try {
            $banner = PromotionBanner::findOrFail($id);

            // Debug: Log incoming request data
            \Log::info('=== PROMOTION BANNER UPDATE REQUEST ===');
            \Log::info('Banner ID: ' . $id);
            \Log::info('Request All:', $request->all());
            \Log::info('Has File (image):', ['hasFile' => $request->hasFile('image')]);
            \Log::info('All Files:', $request->allFiles());

            // Simple, clear validation
            $rules = [
                'title' => 'nullable|string|max:255',
                'subtitle' => 'nullable|string|max:255',
                'background_color' => 'nullable|string|max:50',
                'text_color' => 'nullable|string|max:50',
                'button_text' => 'nullable|string|max:50',
                'button_link' => 'nullable|string|max:255',
            ];

            // Only validate image if it's being uploaded
            if ($request->hasFile('image')) {
                $rules['image'] = 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240';
            }

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                \Log::error('Validation Failed:', $validator->errors()->toArray());
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Handle image upload if new image provided
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($banner->image_url && str_contains($banner->image_url, '/storage/')) {
                    $oldPath = str_replace('/storage/', 'public/', $banner->image_url);
                    if (Storage::exists($oldPath)) {
                        Storage::delete($oldPath);
                        \Log::info('Deleted old image:', ['path' => $oldPath]);
                    }
                }

                $file = $request->file('image');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('banners', $filename, 'public');
                $banner->image_url = '/storage/banners/' . $filename;
                \Log::info('New image uploaded:', ['path' => $banner->image_url]);
            }

            // Prepare update data
            $updateData = [];

            if ($request->has('title')) {
                $updateData['title'] = $request->input('title');
            }
            if ($request->has('subtitle')) {
                $updateData['subtitle'] = $request->input('subtitle');
            }
            if ($request->has('background_color')) {
                $updateData['background_color'] = $request->input('background_color');
            }
            if ($request->has('text_color')) {
                $updateData['text_color'] = $request->input('text_color');
            }
            if ($request->has('button_text')) {
                $updateData['button_text'] = $request->input('button_text');
            }
            if ($request->has('button_link')) {
                $updateData['button_link'] = $request->input('button_link');
            }

            // Handle is_active with proper conversion
            if ($request->has('is_active')) {
                $isActive = $request->input('is_active');
                $updateData['is_active'] = in_array($isActive, ['1', 'true', true, 1], true);
            }

            \Log::info('Updating banner with data:', $updateData);

            $banner->update($updateData);

            \Log::info('Banner updated successfully:', ['id' => $banner->id]);

            return response()->json([
                'status' => 'success',
                'message' => 'Banner updated successfully',
                'data' => $banner->fresh()
            ]);

        } catch (\Exception $e) {
            \Log::error('Failed to update banner:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update banner: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified banner.
     */
    public function destroy($id)
    {
        try {
            $banner = PromotionBanner::findOrFail($id);

            // Delete image if exists
            if ($banner->image_url && str_contains($banner->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', 'public/', $banner->image_url);
                if (Storage::exists($oldPath)) {
                    Storage::delete($oldPath);
                }
            }

            $banner->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Banner deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete banner'
            ], 500);
        }
    }

    /**
     * Toggle active status
     */
    public function toggleActive($id)
    {
        try {
            $banner = PromotionBanner::findOrFail($id);
            $banner->update(['is_active' => !$banner->is_active]);

            return response()->json([
                'status' => 'success',
                'message' => 'Banner status updated',
                'data' => $banner
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to toggle status'
            ], 500);
        }
    }
}
