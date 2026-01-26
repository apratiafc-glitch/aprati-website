<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FooterSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FooterSettingController extends Controller
{
    public function index()
    {
        try {
            $settings = FooterSetting::ordered()
                ->get()
                ->groupBy('group');

            return response()->json([
                'status' => 'success',
                'data' => $settings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch footer settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $setting = FooterSetting::findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $setting
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Footer setting not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string|max:255|unique:footer_settings',
            'value' => 'nullable|string',
            'type' => 'required|in:text,url,email,phone,textarea',
            'group' => 'required|in:contact,social,company',
            'label' => 'required|string|max:255',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $setting = FooterSetting::create([
                'key' => $request->key,
                'value' => $request->value,
                'type' => $request->type,
                'group' => $request->group,
                'label' => $request->label,
                'sort_order' => $request->sort_order ?? 0,
                'is_active' => $request->is_active ?? true
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Footer setting created successfully',
                'data' => $setting
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create footer setting',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string|max:255|unique:footer_settings,key,' . $id,
            'value' => 'nullable|string',
            'type' => 'required|in:text,url,email,phone,textarea',
            'group' => 'required|in:contact,social,company',
            'label' => 'required|string|max:255',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $setting = FooterSetting::findOrFail($id);
            
            $setting->update([
                'key' => $request->key,
                'value' => $request->value,
                'type' => $request->type,
                'group' => $request->group,
                'label' => $request->label,
                'sort_order' => $request->sort_order ?? $setting->sort_order,
                'is_active' => $request->is_active ?? $setting->is_active
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Footer setting updated successfully',
                'data' => $setting
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update footer setting',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateBulk(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'settings' => 'required|array',
            'settings.*.id' => 'required|exists:footer_settings,id',
            'settings.*.value' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            foreach ($request->settings as $settingData) {
                FooterSetting::where('id', $settingData['id'])
                    ->update(['value' => $settingData['value']]);
            }

            $updatedSettings = FooterSetting::ordered()
                ->get()
                ->groupBy('group');

            return response()->json([
                'status' => 'success',
                'message' => 'Footer settings updated successfully',
                'data' => $updatedSettings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update footer settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $setting = FooterSetting::findOrFail($id);
            $setting->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Footer setting deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete footer setting',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleStatus($id)
    {
        try {
            $setting = FooterSetting::findOrFail($id);
            $setting->update([
                'is_active' => !$setting->is_active
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Footer setting status updated successfully',
                'data' => [
                    'id' => $setting->id,
                    'is_active' => $setting->is_active
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update footer setting status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getPublicSettings()
    {
        try {
            $settings = FooterSetting::getAllSettings();
            
            // If no settings exist, return empty structure
            if (empty($settings)) {
                $settings = [
                    'contact' => [],
                    'social' => [],
                    'company' => []
                ];
            }

            return response()->json([
                'status' => 'success',
                'data' => $settings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch public footer settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function uploadImage(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'key' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $image = $request->file('image');
            $key = $request->input('key');

            // Create storage directory if it doesn't exist
            $storagePath = storage_path('app/public/footer');
            if (!file_exists($storagePath)) {
                mkdir($storagePath, 0755, true);
            }

            // Generate unique filename
            $filename = time() . '_' . $key . '.' . $image->getClientOriginalExtension();
            
            // Store the image
            $path = $image->storeAs('footer', $filename, 'public');
            
            // Create the URL
            $url = '/storage/' . $path;

            // Update the footer setting
            $setting = FooterSetting::where('key', $key)->first();
            if ($setting) {
                // Delete old image if it exists
                if ($setting->value && $setting->value !== '/images/logo-white.png') {
                    $oldPath = storage_path('app/public' . str_replace('/storage/', '/', $setting->value));
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }
                
                $setting->value = $url;
                $setting->save();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Image uploaded successfully',
                'data' => [
                    'url' => $url,
                    'filename' => $filename
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to upload image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function initializeDefaults()
    {
        try {
            FooterSetting::createDefaults();

            return response()->json([
                'status' => 'success',
                'message' => 'Default footer settings created successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create default footer settings',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
