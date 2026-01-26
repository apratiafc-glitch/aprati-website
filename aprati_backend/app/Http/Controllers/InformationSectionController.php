<?php

namespace App\Http\Controllers;

use App\Models\InformationSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class InformationSectionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    /**
     * Display a listing of information sections.
     */
    public function index()
    {
        $sections = InformationSection::active()
            ->ordered()
            ->with('creator:id,name')
            ->get()
            ->map(function ($section) {
                return [
                    'id' => $section->id,
                    'title' => $section->title,
                    'description' => $section->description,
                    'image_url' => $section->image_url,
                    'is_active' => $section->is_active,
                    'sort_order' => $section->sort_order,
                    'created_by' => $section->creator->name ?? 'Unknown',
                    'created_at' => $section->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $sections
        ]);
    }

    /**
     * Store a newly created information section.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
            $data = $request->only(['title', 'description', 'is_active', 'sort_order']);
            $data['created_by'] = auth()->id();
            $data['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : true;
            $data['sort_order'] = $request->input('sort_order', 0);

            // Handle image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->store('information-sections', 'public');
                $data['image_path'] = $imagePath;
            }

            $section = InformationSection::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Information section created successfully',
                'data' => [
                    'id' => $section->id,
                    'title' => $section->title,
                    'description' => $section->description,
                    'image_url' => $section->image_url,
                    'is_active' => $section->is_active,
                    'sort_order' => $section->sort_order,
                    'created_at' => $section->created_at->format('Y-m-d H:i:s')
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create information section',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified information section.
     */
    public function show(InformationSection $informationSection)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $informationSection->id,
                'title' => $informationSection->title,
                'description' => $informationSection->description,
                'image_url' => $informationSection->image_url,
                'is_active' => $informationSection->is_active,
                'sort_order' => $informationSection->sort_order,
                'created_by' => $informationSection->creator->name ?? 'Unknown',
                'created_at' => $informationSection->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $informationSection->updated_at->format('Y-m-d H:i:s')
            ]
        ]);
    }

    /**
     * Update the specified information section.
     */
    public function update(Request $request, InformationSection $informationSection)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
            $data = $request->only(['title', 'description', 'is_active', 'sort_order']);
            $data['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : $informationSection->is_active;
            $data['sort_order'] = $request->input('sort_order', $informationSection->sort_order);

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($informationSection->image_path) {
                    Storage::disk('public')->delete($informationSection->image_path);
                }

                $image = $request->file('image');
                $imagePath = $image->store('information-sections', 'public');
                $data['image_path'] = $imagePath;
            }

            $informationSection->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Information section updated successfully',
                'data' => [
                    'id' => $informationSection->id,
                    'title' => $informationSection->title,
                    'description' => $informationSection->description,
                    'image_url' => $informationSection->image_url,
                    'is_active' => $informationSection->is_active,
                    'sort_order' => $informationSection->sort_order,
                    'updated_at' => $informationSection->updated_at->format('Y-m-d H:i:s')
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update information section',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified information section.
     */
    public function destroy(InformationSection $informationSection)
    {
        try {
            // Delete associated image if exists
            if ($informationSection->image_path) {
                Storage::disk('public')->delete($informationSection->image_path);
            }

            $informationSection->delete();

            return response()->json([
                'success' => true,
                'message' => 'Information section deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete information section',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all information sections for admin (including inactive ones).
     */
    public function adminIndex()
    {
        $sections = InformationSection::with('creator:id,name')
            ->ordered()
            ->get()
            ->map(function ($section) {
                return [
                    'id' => $section->id,
                    'title' => $section->title,
                    'description' => $section->description,
                    'image_url' => $section->image_url,
                    'is_active' => $section->is_active,
                    'sort_order' => $section->sort_order,
                    'created_by' => $section->creator->name ?? 'Unknown',
                    'created_at' => $section->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $section->updated_at->format('Y-m-d H:i:s')
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $sections
        ]);
    }

    /**
     * Toggle active status of information section.
     */
    public function toggleStatus(InformationSection $informationSection)
    {
        try {
            $informationSection->update([
                'is_active' => !$informationSection->is_active
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Information section status updated successfully',
                'data' => [
                    'id' => $informationSection->id,
                    'is_active' => $informationSection->is_active
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update information section status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
