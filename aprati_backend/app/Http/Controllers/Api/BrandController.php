<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     * Cached for 5 minutes to improve performance
     */
    public function index(Request $request)
    {
        // Create cache key based on request parameters
        $cacheKey = 'brands_list_' . md5(json_encode($request->all()));
        
        // Cache for 5 minutes (300 seconds)
        $brands = \Cache::remember($cacheKey, 300, function () use ($request) {
            $query = Brand::query();

            // Filter by active status
            if ($request->has('active')) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Search functionality
            if ($request->has('search')) {
                $search = $request->get('search');
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // Order by sort_order and name
            $query->orderBy('sort_order')->orderBy('name');

            return $query->withCount('products')->get();
        });

        return response()->json([
            'status' => 'success',
            'data' => [
                'brands' => $brands,
            ],
        ])->header('X-Cache-Status', \Cache::has($cacheKey) ? 'HIT' : 'MISS');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255', 'unique:brands'],
            'description' => ['nullable', 'string'],
            'logo' => ['nullable', 'string'],
            'website' => ['nullable', 'url'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'established_year' => ['nullable', 'integer', 'min:1800', 'max:' . date('Y')],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $brand = Brand::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
            'logo' => $request->logo,
            'website' => $request->website,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => $request->get('sort_order', 0),
            'meta_title' => $request->meta_title,
            'meta_description' => $request->meta_description,
            'established_year' => $request->established_year,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Brand created successfully',
            'data' => [
                'brand' => $brand,
            ],
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        // Optimizing performance: Removed eager loading of products since they are fetched 
        // via a separate paginated endpoint (/api/brands/{slug}/products) by the frontend.
        // $brand->load(['products' => function ($query) {
        //     $query->active()->with(['category.parent'])->latest();
        // }]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'brand' => $brand,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'string', 'max:255', 'unique:brands,name,' . $brand->id],
            'description' => ['nullable', 'string'],
            'logo' => ['nullable', 'string'],
            'website' => ['nullable', 'url'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'established_year' => ['nullable', 'integer', 'min:1800', 'max:' . date('Y')],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $updateData = $request->only([
            'name', 'description', 'logo', 'website', 'is_active', 
            'sort_order', 'meta_title', 'meta_description', 'established_year'
        ]);

        if ($request->has('name') && $request->name !== $brand->name) {
            $updateData['slug'] = Str::slug($request->name);
        }

        $brand->update($updateData);

        return response()->json([
            'status' => 'success',
            'message' => 'Brand updated successfully',
            'data' => [
                'brand' => $brand->fresh(),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        try {
            // Get product count for response message
            $productCount = $brand->products()->count();
            
            // Cascade delete products and their related data
            if ($productCount > 0) {
                foreach ($brand->products as $product) {
                    // Delete product images from storage
                    if (!empty($product->images)) {
                        foreach ($product->images as $imageUrl) {
                            try {
                                $path = str_replace('/storage/', '', parse_url($imageUrl, PHP_URL_PATH));
                                \Storage::disk('public')->delete($path);
                            } catch (\Exception $e) {
                                \Log::warning('Failed to delete product image', ['path' => $path, 'error' => $e->getMessage()]);
                            }
                        }
                    }
                    
                    // Delete product variants
                    $product->variants()->delete();
                    
                    // Delete the product
                    $product->delete();
                }
            }
            
            // Delete brand images from storage
            if ($brand->logo) {
                try {
                    $logoPath = str_replace('/storage/', '', parse_url($brand->logo, PHP_URL_PATH));
                    \Storage::disk('public')->delete($logoPath);
                } catch (\Exception $e) {
                    \Log::warning('Failed to delete brand logo', ['path' => $logoPath, 'error' => $e->getMessage()]);
                }
            }
            
            if ($brand->cover_image) {
                try {
                    $coverPath = str_replace('/storage/', '', parse_url($brand->cover_image, PHP_URL_PATH));
                    \Storage::disk('public')->delete($coverPath);
                } catch (\Exception $e) {
                    \Log::warning('Failed to delete brand cover image', ['path' => $coverPath, 'error' => $e->getMessage()]);
                }
            }

            // Delete the brand
            $brand->delete();

            // Return appropriate success message
            $message = $productCount > 0 
                ? "Brand deleted successfully along with {$productCount} product(s)"
                : 'Brand deleted successfully';

            return response()->json([
                'status' => 'success',
                'message' => $message,
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete brand: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get brand products
     * Cached for 5 minutes to improve performance
     */
    public function products(Brand $brand, Request $request)
    {
        // Create cache key based on brand and request parameters
        $cacheKey = 'brand_' . $brand->id . '_products_' . md5(json_encode($request->all()));
        
        // Cache for 5 minutes (300 seconds)
        $products = \Cache::remember($cacheKey, 300, function () use ($brand, $request) {
            $query = $brand->products()->with(['category.parent', 'variants']);

            // Filter by active status
            if ($request->has('active')) {
                $query->where('is_active', $request->boolean('active'));
            }

            // Search functionality
            if ($request->has('search')) {
                $query->search($request->get('search'));
            }

            // Filter by category
            if ($request->has('category')) {
                $query->byCategory($request->get('category'));
            }

            // Filter by category ID
            if ($request->has('category_id')) {
                $query->where('category_id', $request->get('category_id'));
            }

            return $query->latest()->paginate($request->get('per_page', 15));
        });

        return response()->json([
            'status' => 'success',
            'data' => [
                'products' => $products,
            ],
        ])->header('X-Cache-Status', \Cache::has($cacheKey) ? 'HIT' : 'MISS');
    }
}
