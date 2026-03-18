<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InformationSection;
use Illuminate\Http\Request;

class InformationSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections = InformationSection::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $sections
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $section = InformationSection::create($validated);

        return response()->json([
            'success' => true,
            'data' => $section,
            'message' => 'Information section created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(InformationSection $informationSection)
    {
        return response()->json([
            'success' => true,
            'data' => $informationSection
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InformationSection $informationSection)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'image' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        if ($request->has('image') && $informationSection->image && $informationSection->image !== $request->image) {
            $oldPath = str_replace('/storage/', '', $informationSection->image);
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($oldPath)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
        }

        $informationSection->update($validated);

        return response()->json([
            'success' => true,
            'data' => $informationSection,
            'message' => 'Information section updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InformationSection $informationSection)
    {
        if ($informationSection->image) {
            $path = str_replace('/storage/', '', $informationSection->image);
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists($path)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
            }
        }

        $informationSection->delete();

        return response()->json([
            'success' => true,
            'message' => 'Information section deleted successfully'
        ]);
    }

    /**
     * Upload image for information section.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/storage/information-sections');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }

            $image->move($destinationPath, $name);
            $url = '/storage/information-sections/' . $name;

            return response()->json([
                'success' => true,
                'url' => $url,
                'message' => 'Image uploaded successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Image upload failed'
        ], 400);
    }
}
