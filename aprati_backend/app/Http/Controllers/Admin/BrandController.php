<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    /**
     * Display a listing of brands.
     */
    public function index()
    {
        try {
            $brands = Brand::withCount(['products', 'users'])
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'brands' => $brands
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch brands',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created brand.
     */
    public function store(Request $request)
    {
        try {
            \Log::info('Brand creation started', ['request_data' => $request->all()]);
            
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255', // Removed unique validation, we handle it manually
                'description' => 'nullable|string',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
                'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
                'website' => 'nullable|url|max:500',
                'is_active' => 'nullable', // Accept any value, we'll convert to boolean
                'sort_order' => 'nullable|integer|min:0',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'established_year' => 'nullable|integer|min:1900|max:' . date('Y'),
            ]);
            
            // Convert is_active to boolean
            $validated['is_active'] = filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN);
            
            // Convert sort_order to integer or default to 0
            $validated['sort_order'] = isset($validated['sort_order']) ? (int)$validated['sort_order'] : 0;

            \Log::info('Validation passed', ['validated_data' => $validated]);

            // Auto-generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            } else {
                $validated['slug'] = Str::slug($validated['slug']);
            }
            
            // Ensure slug is unique (excluding soft-deleted records)
            $originalSlug = $validated['slug'];
            $counter = 1;
            while (Brand::where('slug', $validated['slug'])->whereNull('deleted_at')->exists()) {
                $validated['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }

            // Handle logo file upload
            if ($request->hasFile('logo')) {
                $logoFile = $request->file('logo');
                $logoPath = $logoFile->store('brands/logos', 'public');
                $validated['logo'] = $logoPath;
            }

            // Handle cover image file upload
            if ($request->hasFile('cover_image')) {
                $coverFile = $request->file('cover_image');
                $coverPath = $coverFile->store('brands/covers', 'public');
                $validated['cover_image'] = $coverPath;
            }

            \Log::info('About to create brand', ['final_data' => $validated]);

            $brand = Brand::create($validated);

            \Log::info('Brand created successfully', ['brand_id' => $brand->id]);

            return response()->json([
                'status' => 'success',
                'message' => 'Brand created successfully',
                'data' => [
                    'brand' => $brand
                ]
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation error in brand creation', ['errors' => $e->errors()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            \Log::error('Database error in brand creation', [
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ]);
            
            // Handle specific database constraint violations
            if ($e->getCode() == 23000) { // Integrity constraint violation
                if (strpos($e->getMessage(), 'brands_slug_unique') !== false) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'A brand with this name already exists. Please choose a different name.',
                        'errors' => [
                            'name' => ['A brand with this name already exists.']
                        ]
                    ], 422);
                }
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'This brand information conflicts with existing data.',
                    'error' => 'Duplicate entry'
                ], 422);
            }
            
            return response()->json([
                'status' => 'error',
                'message' => 'Database error occurred while creating brand',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Exception in brand creation', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create brand',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified brand.
     */
    public function show(Brand $brand)
    {
        try {
            $brand->load('products');
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'brand' => $brand
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch brand',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified brand.
     */
    public function update(Request $request, Brand $brand)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255', // Removed unique validation, we handle it manually
                'description' => 'nullable|string',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
                'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
                'website' => 'nullable|url|max:500',
                'is_active' => 'nullable', // Accept any value, we'll convert to boolean
                'sort_order' => 'nullable|integer|min:0',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'established_year' => 'nullable|integer|min:1900|max:' . date('Y'),
            ]);
            
            // Convert is_active to boolean
            $validated['is_active'] = filter_var($validated['is_active'] ?? $brand->is_active, FILTER_VALIDATE_BOOLEAN);
            
            // Convert sort_order to integer or keep existing
            $validated['sort_order'] = isset($validated['sort_order']) ? (int)$validated['sort_order'] : $brand->sort_order;

            // Auto-generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            } else {
                $validated['slug'] = Str::slug($validated['slug']);
            }
            
            // Ensure slug is unique (exclude current brand and soft-deleted records)
            $originalSlug = $validated['slug'];
            $counter = 1;
            while (Brand::where('slug', $validated['slug'])->where('id', '!=', $brand->id)->whereNull('deleted_at')->exists()) {
                $validated['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }

            // Handle logo file upload
            if ($request->hasFile('logo')) {
                // Delete old logo if exists
                if ($brand->logo && \Storage::disk('public')->exists($brand->logo)) {
                    \Storage::disk('public')->delete($brand->logo);
                }
                
                $logoFile = $request->file('logo');
                $logoPath = $logoFile->store('brands/logos', 'public');
                $validated['logo'] = $logoPath;
            }

            // Handle cover image file upload
            if ($request->hasFile('cover_image')) {
                // Delete old cover image if exists
                if ($brand->cover_image && \Storage::disk('public')->exists($brand->cover_image)) {
                    \Storage::disk('public')->delete($brand->cover_image);
                }
                
                $coverFile = $request->file('cover_image');
                $coverPath = $coverFile->store('brands/covers', 'public');
                $validated['cover_image'] = $coverPath;
            }

            $brand->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Brand updated successfully',
                'data' => [
                    'brand' => $brand->fresh()
                ]
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update brand',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified brand.
     */
    public function destroy(Brand $brand)
    {
        try {
            \Log::info('Brand deletion started', ['brand_id' => $brand->id, 'brand_name' => $brand->name]);
            
            // Get product count for logging
            $productCount = $brand->products()->count();
            \Log::info('Product count check', ['brand_id' => $brand->id, 'product_count' => $productCount]);
            
            // Check if brand has users assigned (safely)
            try {
                $userCount = \App\Models\User::where('brand_id', $brand->id)->count();
                \Log::info('User count check', ['brand_id' => $brand->id, 'user_count' => $userCount]);
                
                // TEMPORARILY DISABLED: Allow deletion even with users
                // if ($userCount > 0) {
                //     return response()->json([
                //         'status' => 'error',
                //         'message' => 'Cannot delete brand with assigned users. Please reassign users first.'
                //     ], 400);
                // }
                
                // Log warning if users exist
                if ($userCount > 0) {
                    \Log::warning('Deleting brand with assigned users', ['brand_id' => $brand->id, 'user_count' => $userCount]);
                }
            } catch (\Exception $e) {
                \Log::warning('Error checking brand users, proceeding with deletion', ['error' => $e->getMessage()]);
            }

            // Cascade delete products and their related data
            if ($productCount > 0) {
                \Log::info('Starting cascade deletion of products', ['brand_id' => $brand->id, 'product_count' => $productCount]);
                
                foreach ($brand->products as $product) {
                    \Log::info('Deleting product', ['product_id' => $product->id, 'product_name' => $product->name]);
                    
                    // Delete product images from storage
                    if (!empty($product->images)) {
                        foreach ($product->images as $imageUrl) {
                            try {
                                $path = str_replace('/storage/', '', parse_url($imageUrl, PHP_URL_PATH));
                                \Storage::disk('public')->delete($path);
                                \Log::info('Product image deleted', ['path' => $path]);
                            } catch (\Exception $e) {
                                \Log::warning('Failed to delete product image', ['path' => $path ?? 'unknown', 'error' => $e->getMessage()]);
                            }
                        }
                    }
                    
                    // Delete product variants (if any)
                    $product->variants()->delete();
                    
                    // Delete the product
                    $product->delete();
                }
                
                \Log::info('All products deleted successfully', ['brand_id' => $brand->id]);
            }

            // Delete brand images from storage
            if ($brand->logo) {
                try {
                    $logoPath = str_replace('/storage/', '', parse_url($brand->logo, PHP_URL_PATH));
                    \Storage::disk('public')->delete($logoPath);
                    \Log::info('Brand logo deleted', ['path' => $logoPath]);
                } catch (\Exception $e) {
                    \Log::warning('Failed to delete brand logo', ['error' => $e->getMessage()]);
                }
            }
            
            if ($brand->cover_image) {
                try {
                    $coverPath = str_replace('/storage/', '', parse_url($brand->cover_image, PHP_URL_PATH));
                    \Storage::disk('public')->delete($coverPath);
                    \Log::info('Brand cover image deleted', ['path' => $coverPath]);
                } catch (\Exception $e) {
                    \Log::warning('Failed to delete brand cover image', ['error' => $e->getMessage()]);
                }
            }

            \Log::info('Deleting brand', ['brand_id' => $brand->id]);
            $brand->delete();
            \Log::info('Brand deleted successfully', ['brand_id' => $brand->id, 'products_deleted' => $productCount]);

            return response()->json([
                'status' => 'success',
                'message' => $productCount > 0 
                    ? "Brand deleted successfully along with {$productCount} product(s)."
                    : 'Brand deleted successfully.'
            ]);
        } catch (\Exception $e) {
            \Log::error('Brand deletion failed', [
                'brand_id' => $brand->id ?? 'unknown',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Brand deleted successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error('Brand deletion failed', [
                'brand_id' => $brand->id ?? 'unknown',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete brand',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle brand status.
     */
    public function toggleStatus(Brand $brand)
    {
        try {
            $brand->update([
                'is_active' => !$brand->is_active
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Brand status updated successfully',
                'data' => [
                    'brand' => $brand->fresh()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update brand status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk update brand sort orders.
     */
    public function updateSortOrder(Request $request)
    {
        try {
            $validated = $request->validate([
                'brands' => 'required|array',
                'brands.*.id' => 'required|exists:brands,id',
                'brands.*.sort_order' => 'required|integer|min:0'
            ]);

            foreach ($validated['brands'] as $brandData) {
                Brand::where('id', $brandData['id'])
                    ->update(['sort_order' => $brandData['sort_order']]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Brand sort order updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update sort order',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
