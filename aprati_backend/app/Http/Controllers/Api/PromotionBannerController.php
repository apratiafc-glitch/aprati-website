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
     * Display a listing of the resource (Admin).
     */
    public function index(Request $request)
    {
        $query = PromotionBanner::query();

        $query->orderBy('is_active', 'desc')->orderBy('created_at', 'desc');

        $banners = $query->get();

        return response()->json([
            'status' => 'success',
            'data' => $banners
        ]);
    }

    /**
     * Public listing for homepage.
     */
    public function publicIndex()
    {
        $banners = PromotionBanner::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $banners
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240', // 10MB
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string',
            'background_color' => 'nullable|string',
            'text_color' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'is_active' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('banners', 'public');
        }

        $banner = PromotionBanner::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'image_path' => $path,
            'background_color' => $request->background_color ?? '#EF4444',
            'text_color' => $request->text_color ?? 'text-white',
            'button_text' => $request->button_text,
            'button_link' => $request->button_link,
            'is_active' => $request->has('is_active') ? filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN) : true,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Banner created successfully',
            'data' => $banner
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $banner = PromotionBanner::find($id);
        if (!$banner) {
            return response()->json(['status' => 'error', 'message' => 'Banner not found'], 404);
        }
        return response()->json(['status' => 'success', 'data' => $banner]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $banner = PromotionBanner::find($id);

        if (!$banner) {
            return response()->json(['status' => 'error', 'message' => 'Banner not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string',
            'background_color' => 'nullable|string',
            'text_color' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'is_active' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('image')) {
            // Delete old image
            if ($banner->image_path && Storage::disk('public')->exists($banner->image_path)) {
                Storage::disk('public')->delete($banner->image_path);
            }

            $path = $request->file('image')->store('banners', 'public');
            $banner->image_path = $path;
        }

        if ($request->has('title'))
            $banner->title = $request->title;
        if ($request->has('subtitle'))
            $banner->subtitle = $request->subtitle;
        if ($request->has('background_color'))
            $banner->background_color = $request->background_color;
        if ($request->has('text_color'))
            $banner->text_color = $request->text_color;
        if ($request->has('button_text'))
            $banner->button_text = $request->button_text;
        if ($request->has('button_link'))
            $banner->button_link = $request->button_link;
        if ($request->has('is_active')) {
            $banner->is_active = filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN);
        }

        $banner->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Banner updated successfully',
            'data' => $banner
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $banner = PromotionBanner::find($id);

        if (!$banner) {
            return response()->json(['status' => 'error', 'message' => 'Banner not found'], 404);
        }

        // Delete image
        if ($banner->image_path && Storage::disk('public')->exists($banner->image_path)) {
            Storage::disk('public')->delete($banner->image_path);
        }

        $banner->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Banner deleted successfully'
        ]);
    }

    public function toggleActive($id)
    {
        $banner = PromotionBanner::find($id);
        if (!$banner) {
            return response()->json(['status' => 'error', 'message' => 'Banner not found'], 404);
        }

        $banner->is_active = !$banner->is_active;
        $banner->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Banner status updated',
            'data' => $banner
        ]);
    }
}
