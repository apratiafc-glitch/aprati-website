<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FaviconSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class FaviconController extends Controller
{
    public function index()
    {
        $settings = FaviconSetting::active()
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
        $settings = FaviconSetting::getAllSettings();

        return response()->json([
            'status' => 'success',
            'data' => $settings
        ]);
    }

    public function getFaviconConfig()
    {
        $config = FaviconSetting::getFaviconConfig();

        return response()->json([
            'status' => 'success',
            'data' => $config
        ]);
    }

    public function show($key)
    {
        $setting = FaviconSetting::where('key', $key)->where('is_active', true)->first();

        if (!$setting) {
            return response()->json([
                'status' => 'error',
                'message' => 'Favicon setting not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $setting
        ]);
    }

    public function update(Request $request, $key)
    {
        $setting = FaviconSetting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'status' => 'error',
                'message' => 'Favicon setting not found'
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
            'message' => 'Favicon setting updated successfully',
            'data' => $setting->fresh()
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,ico,svg|max:2048',
            'key' => 'required|string|exists:favicon_settings,key'
        ]);

        $setting = FaviconSetting::where('key', $request->key)->first();

        if (!$setting || $setting->type !== 'image') {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid setting or setting is not an image type'
            ], 400);
        }

        try {
            // Delete old image if exists and it's not a default favicon
            if ($setting->value && !in_array($setting->value, ['/images/web.ico', '/images/Companylogo.ico'])) {
                $oldImagePath = str_replace('/storage/', '', $setting->value);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Store new image
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('favicon', $imageName, 'public');

            // Update setting
            $setting->update([
                'value' => '/storage/' . $imagePath
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Favicon image uploaded successfully',
                'data' => [
                    'setting' => $setting->fresh(),
                    'image_url' => asset('storage/' . $imagePath)
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to upload favicon image: ' . $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required|string|unique:favicon_settings,key|max:100',
            'value' => 'required|string|max:1000',
            'type' => 'required|string|in:text,textarea,email,url,number,boolean,image,select',
            'group' => 'required|string|max:50',
            'label' => 'required|string|max:100',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $setting = FaviconSetting::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Favicon setting created successfully',
            'data' => $setting
        ], 201);
    }

    public function destroy($key)
    {
        $setting = FaviconSetting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'status' => 'error',
                'message' => 'Favicon setting not found'
            ], 404);
        }

        // Delete associated image if exists and it's not a default favicon
        if ($setting->type === 'image' && $setting->value && !in_array($setting->value, ['/images/web.ico', '/images/Companylogo.ico'])) {
            $imagePath = str_replace('/storage/', '', $setting->value);
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $setting->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Favicon setting deleted successfully'
        ]);
    }

    public function toggle($key)
    {
        $setting = FaviconSetting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'status' => 'error',
                'message' => 'Favicon setting not found'
            ], 404);
        }

        $setting->update([
            'is_active' => !$setting->is_active
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Favicon setting status updated successfully',
            'data' => $setting->fresh()
        ]);
    }

    public function initializeDefaults()
    {
        try {
            FaviconSetting::createDefaults();

            return response()->json([
                'status' => 'success',
                'message' => 'Default favicon settings initialized successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to initialize default favicon settings: ' . $e->getMessage()
            ], 500);
        }
    }
}
