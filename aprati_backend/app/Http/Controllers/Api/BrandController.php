<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Admin should see ALL brands (active and inactive)
        // Public API route uses slug-based routing and filters separately
        $brands = \App\Models\Brand::withCount('products')->get();

        $response = response()->json([
            'status' => 'success',
            'data' => [
                'brands' => $brands
            ]
        ]);
        return $response;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:brands,slug',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:5120', // 5MB
            'cover_image' => 'nullable|image|max:10240', // 10MB
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'established_year' => 'nullable|integer'
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('brands/logos', 'public');
            $validated['logo'] = '/storage/' . $path;
        }

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('brands/covers', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        $brand = Brand::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $brand,
            'message' => 'Brand created successfully'
        ], 201);
    }

    public function show(Brand $brand)
    {
        return response()->json([
            'status' => 'success',
            'data' => $brand
        ]);
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:brands,slug,' . $brand->id,
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:5120',
            'cover_image' => 'nullable|image|max:10240',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'established_year' => 'nullable|integer'
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('brands/logos', 'public');
            $validated['logo'] = '/storage/' . $path;
        }

        if ($request->hasFile('cover_image')) {
            $path = $request->file('cover_image')->store('brands/covers', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        $brand->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $brand,
            'message' => 'Brand updated successfully'
        ]);
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Brand deleted successfully'
        ]);
    }
}
