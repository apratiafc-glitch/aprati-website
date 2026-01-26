<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeaderSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class HeaderSettingController extends Controller
{
    public function index()
    {
        $settings = HeaderSetting::active()
            ->ordered()
            ->get()
            ->groupBy('group');

        return response()->json([
            'status' => 'success',
            'data' => $settings
        ]);
    }

    public function getAllSettings()
    {
        $settings = HeaderSetting::getAllSettings();
        
        return response()->json([
            'status' => 'success',
            'data' => $settings
        ]);
    }

    public function show($key)
    {
        $setting = HeaderSetting::where('key', $key)->where('is_active', true)->first();

        if (!$setting) {
            return response()->json([
                'status' => 'error',
                'message' => 'Setting not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $setting
        ]);
    }

    public function update(Request $request, $key)
    {
        $setting = HeaderSetting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'status' => 'error',
                'message' => 'Setting not found'
            ], 404);
        }

        $rules = [
            'value' => 'required|string|max:1000',
        ];

        // Add specific validation based on setting type
        switch ($setting->type) {
            case 'email':
                $rules['value'] = 'required|email|max:255';
                break;
            case 'url':
                $rules['value'] = 'required|url|max:255';
                break;
            case 'boolean':
                $rules['value'] = 'required|in:true,false,1,0';
                break;
            case 'number':
                $rules['value'] = 'required|numeric';
                break;
        }

        $request->validate($rules);

        $setting->update([
            'value' => $request->value
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Setting updated successfully',
            'data' => $setting->fresh()
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'key' => 'required|string|exists:header_settings,key'
        ]);

        $setting = HeaderSetting::where('key', $request->key)->first();

        if (!$setting || $setting->type !== 'image') {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid setting or setting is not an image type'
            ], 400);
        }

        try {
            // Delete old image if exists
            if ($setting->value && $setting->value !== '/images/logo.png') {
                $oldImagePath = str_replace('/storage/', '', $setting->value);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Store new image
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('header', $imageName, 'public');

            // Update setting
            $setting->update([
                'value' => '/storage/' . $imagePath
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Image uploaded successfully',
                'data' => [
                    'setting' => $setting->fresh(),
                    'image_url' => asset('storage/' . $imagePath)
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to upload image: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required|string|unique:header_settings,key|max:100',
            'value' => 'required|string|max:1000',
            'type' => 'required|string|in:text,textarea,email,url,number,boolean,image,select',
            'group' => 'required|string|max:50',
            'label' => 'required|string|max:100',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $setting = HeaderSetting::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Setting created successfully',
            'data' => $setting
        ], 201);
    }

    public function destroy($key)
    {
        $setting = HeaderSetting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'status' => 'error',
                'message' => 'Setting not found'
            ], 404);
        }

        // Delete associated image if exists
        if ($setting->type === 'image' && $setting->value && $setting->value !== '/images/logo.png') {
            $imagePath = str_replace('/storage/', '', $setting->value);
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $setting->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Setting deleted successfully'
        ]);
    }

    public function toggle($key)
    {
        $setting = HeaderSetting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'status' => 'error',
                'message' => 'Setting not found'
            ], 404);
        }

        $setting->update([
            'is_active' => !$setting->is_active
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Setting status updated successfully',
            'data' => $setting->fresh()
        ]);
    }
}
