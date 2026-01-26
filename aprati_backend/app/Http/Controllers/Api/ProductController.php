<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of products (public access)
     */
    public function index(Request $request)
    {
        try {
            $query = Product::with(['brand', 'variants'])->active();

            // Filter by brand if provided
            if ($request->has('brand_id') && $request->brand_id) {
                $query->byBrand($request->brand_id);
            }

            // Filter by category if provided
            if ($request->has('category') && $request->category) {
                $query->byCategory($request->category);
            }

            // Search functionality
            if ($request->has('search') && $request->search) {
                $query->search($request->search);
            }

            // Featured products filter
            if ($request->has('featured') && $request->featured) {
                $query->featured();
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortDirection = $request->get('sort_direction', 'desc');
            $query->orderBy($sortBy, $sortDirection);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $products = $query->paginate($perPage);

            // Filter out products with inactive brands (done in PHP to avoid MySQL temp table issues)
            $filteredProducts = collect($products->items())->filter(function ($product) {
                return $product->brand && $product->brand->is_active;
            })->values()->all();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'products' => $filteredProducts,
                    'pagination' => [
                        'current_page' => $products->currentPage(),
                        'last_page' => $products->lastPage(),
                        'per_page' => $products->perPage(),
                        'total' => $products->total(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch products',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Display a listing of products for admin
     */
    public function adminIndex(Request $request)
    {
        try {
            $query = Product::with(['brand', 'variants']);

            // Filter by brand if provided
            if ($request->has('brand_id') && $request->brand_id) {
                $query->byBrand($request->brand_id);
            }

            // Filter by status
            if ($request->has('status')) {
                if ($request->status === 'active') {
                    $query->where('is_active', true);
                } elseif ($request->status === 'inactive') {
                    $query->where('is_active', false);
                }
            }

            // Search functionality
            if ($request->has('search') && $request->search) {
                $query->search($request->search);
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortDirection = $request->get('sort_direction', 'desc');
            $query->orderBy($sortBy, $sortDirection);

            // Include soft deleted if requested
            if ($request->has('include_deleted') && $request->include_deleted) {
                $query->withTrashed();
            }

            // Pagination
            $perPage = $request->get('per_page', 15);
            $products = $query->paginate($perPage);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'products' => $products->items(),
                    'pagination' => [
                        'current_page' => $products->currentPage(),
                        'last_page' => $products->lastPage(),
                        'per_page' => $products->perPage(),
                        'total' => $products->total(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch products',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Store a newly created product
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'brand_id' => 'required|exists:brands,id',
                'name' => 'required|string|max:255',
                'sku' => 'nullable|string|max:100|unique:products,sku,NULL,id,deleted_at,NULL',
                'part_number' => 'nullable|string|max:100',
                'description' => 'nullable|string',
                'short_description' => 'nullable|string|max:500',
                'price' => 'required|numeric|min:0',
                'cost_price' => 'nullable|numeric|min:0',
                'stock_quantity' => 'nullable|integer|min:0',
                'min_stock_level' => 'nullable|integer|min:0',
                'max_stock_level' => 'nullable|integer|min:0',
                'weight' => 'nullable|numeric|min:0',
                'category' => 'nullable|string|max:100',
                'subcategory' => 'nullable|string|max:100',
                'images' => 'nullable|array',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'technical_specs' => 'nullable|array',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'tags' => 'nullable|array',
                'tags.*' => 'string|max:50'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $productData = $request->all();

            // Generate slug if not provided
            if (empty($productData['slug'])) {
                $productData['slug'] = Str::slug($productData['name']);

                // Ensure slug is unique
                $originalSlug = $productData['slug'];
                $counter = 1;
                while (Product::where('slug', $productData['slug'])->exists()) {
                    $productData['slug'] = $originalSlug . '-' . $counter;
                    $counter++;
                }
            }

            // Handle image uploads
            $imagePaths = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $image->storeAs('products', $filename, 'public');
                    $imagePaths[] = '/storage/products/' . $filename;
                }
            }

            if (!empty($imagePaths)) {
                $productData['images'] = $imagePaths;
            }

            // Set defaults
            $productData['is_active'] = $productData['is_active'] ?? true;
            $productData['is_featured'] = $productData['is_featured'] ?? false;
            $productData['stock_quantity'] = $productData['stock_quantity'] ?? 0;

            $product = Product::create($productData);
            $product->load('brand');

            return response()->json([
                'status' => 'success',
                'message' => 'Product created successfully',
                'data' => ['product' => $product]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create product',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Display the specified product (public access)
     */
    public function show(Product $product)
    {
        try {
            // Load brand to check status
            $product->load('brand');

            if (!$product->is_active || ($product->brand && !$product->brand->is_active)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product not found'
                ], 404);
            }

            $product->load(['brand', 'activeVariants']);

            return response()->json([
                'status' => 'success',
                'data' => ['product' => $product]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch product',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Display the specified product for admin
     */
    public function adminShow(Product $product)
    {
        try {
            $product->load(['brand', 'variants']);

            return response()->json([
                'status' => 'success',
                'data' => ['product' => $product]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch product',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Update the specified product
     */
    public function update(Request $request, Product $product)
    {
        try {
            $validator = Validator::make($request->all(), [
                'brand_id' => 'required|exists:brands,id',
                'name' => 'required|string|max:255',
                'sku' => 'nullable|string|max:100|unique:products,sku,' . $product->id . ',id,deleted_at,NULL',
                'part_number' => 'nullable|string|max:100',
                'description' => 'nullable|string',
                'short_description' => 'nullable|string|max:500',
                'price' => 'required|numeric|min:0',
                'cost_price' => 'nullable|numeric|min:0',
                'stock_quantity' => 'nullable|integer|min:0',
                'min_stock_level' => 'nullable|integer|min:0',
                'max_stock_level' => 'nullable|integer|min:0',
                'weight' => 'nullable|numeric|min:0',
                'category' => 'nullable|string|max:100',
                'subcategory' => 'nullable|string|max:100',
                'images' => 'nullable|array',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'existing_images' => 'nullable|array',
                'existing_images.*' => 'nullable|string',
                'technical_specs' => 'nullable|array',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'tags' => 'nullable|array',
                'tags.*' => 'string|max:50'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $productData = $request->except(['images', 'existing_images']);

            // Handle image updates
            $imagePaths = [];

            // Keep existing images if provided
            if ($request->has('existing_images') && is_array($request->existing_images)) {
                $imagePaths = array_filter($request->existing_images, function ($img) {
                    return !empty($img);
                });
            }

            // Add newly uploaded images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    $image->storeAs('products', $filename, 'public');
                    $imagePaths[] = '/storage/products/' . $filename;
                }
            }

            // Update images array if we have any images
            if (!empty($imagePaths)) {
                $productData['images'] = array_values($imagePaths);
            }

            \Log::info('Product Update - Images:', [
                'product_id' => $product->id,
                'has_file_images' => $request->hasFile('images'),
                'has_existing_images' => $request->has('existing_images'),
                'final_images' => $imagePaths
            ]);

            // Update slug if name changed
            if ($request->filled('name') && $request->name !== $product->name) {
                if (empty($productData['slug'])) {
                    $productData['slug'] = Str::slug($productData['name']);

                    // Ensure slug is unique
                    $originalSlug = $productData['slug'];
                    $counter = 1;
                    while (Product::where('slug', $productData['slug'])->where('id', '!=', $product->id)->exists()) {
                        $productData['slug'] = $originalSlug . '-' . $counter;
                        $counter++;
                    }
                }
            }

            $product->update($productData);
            $product->load('brand');

            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully',
                'data' => ['product' => $product]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Remove the specified product
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete product',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Toggle product status
     */
    public function toggleStatus(Product $product)
    {
        try {
            $product->update(['is_active' => !$product->is_active]);

            return response()->json([
                'status' => 'success',
                'message' => 'Product status updated successfully',
                'data' => ['product' => $product]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product status',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get product categories
     */
    public function categories()
    {
        try {
            $categories = Product::whereNotNull('category')
                ->where('category', '!=', '')
                ->distinct()
                ->pluck('category')
                ->sort()
                ->values();

            return response()->json([
                'status' => 'success',
                'data' => ['categories' => $categories]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch categories',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Search products
     */
    public function search(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'query' => 'required|string|min:2',
                'brand_id' => 'nullable|exists:brands,id',
                'category' => 'nullable|string',
                'min_price' => 'nullable|numeric|min:0',
                'max_price' => 'nullable|numeric|min:0',
                'in_stock' => 'nullable|boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $query = Product::with(['brand', 'variants'])->active();

            // Text search
            $query->search($request->query);

            // Additional filters
            if ($request->filled('brand_id')) {
                $query->byBrand($request->brand_id);
            }

            if ($request->filled('category')) {
                $query->byCategory($request->category);
            }

            if ($request->filled('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }

            if ($request->filled('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            if ($request->filled('in_stock') && $request->in_stock) {
                $query->where('stock_quantity', '>', 0);
            }

            $products = $query->limit(20)->get();

            return response()->json([
                'status' => 'success',
                'data' => ['products' => $products]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to search products',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}
