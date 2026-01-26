<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(Request $request)
    {
        try {
            $query = Product::with(['brand', 'category.parent', 'variants']);

            // Apply filters
            if ($request->has('brand_id') && $request->brand_id !== '') {
                $query->where('brand_id', $request->brand_id);
            }

            // Updated to use category_id for proper filtering
            if ($request->has('category_id') && $request->category_id !== '') {
                $query->where('category_id', $request->category_id);
            }

            // Keep legacy category filter for backward compatibility
            if ($request->has('category') && $request->category !== '') {
                $query->where('category', $request->category);
            }

            if ($request->has('search') && $request->search !== '') {
                $query->search($request->search);
            }

            if ($request->has('status') && $request->status !== '') {
                if ($request->status === 'active') {
                    $query->where('is_active', true);
                } elseif ($request->status === 'inactive') {
                    $query->where('is_active', false);
                } elseif ($request->status === 'featured') {
                    $query->where('is_featured', true);
                } elseif ($request->status === 'low_stock') {
                    $query->whereRaw('stock_quantity <= min_stock_level');
                }
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $products = $query->paginate($perPage);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'products' => $products
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch products', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        try {
            $brands = Brand::where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name']);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'brands' => $brands
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch form data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        try {
            Log::info('Product creation started', ['request_data' => $request->all()]);
            
            $validated = $request->validate([
                'brand_id' => 'required|exists:brands,id',
                'name' => 'required|string|max:255',
                'slug' => ['nullable', 'string', 'max:255', Rule::unique('products', 'slug')->whereNull('deleted_at')],
                'sku' => ['nullable', 'string', 'max:100'],
                'part_number' => 'nullable|string|max:100',
                'description' => 'nullable|string',
                'short_description' => 'nullable|string|max:500',
                'price' => 'nullable|numeric|min:0',
                'cost_price' => 'nullable|numeric|min:0',
                'stock_quantity' => 'nullable|integer|min:0',
                'min_stock_level' => 'nullable|integer|min:0',
                'max_stock_level' => 'nullable|integer|min:0',
                'weight' => 'nullable|numeric|min:0',
                'dimensions' => 'nullable|array',
                'category' => 'nullable|string|max:255',
                'subcategory' => 'nullable|string|max:255',
                'category_id' => 'nullable|exists:categories,id',
                'technical_specs' => 'nullable|array',
                'is_active' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'is_featured' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'tags' => 'nullable|array',
                'images' => 'nullable|array',
                'images.*' => 'file|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
                // Variant validation
                'variants' => 'nullable|array|min:1',
                'variants.*.name' => 'required|string|max:255',
                'variants.*.description' => 'nullable|string',
                'variants.*.price' => 'required|numeric|min:0',
                'variants.*.stock_quantity' => 'nullable|integer|min:0',
                'variants.*.is_default' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'variants.*.is_active' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
            ]);

            // Generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
                
                // If slug is empty (e.g., non-ASCII characters), generate a fallback
                if (empty($validated['slug'])) {
                    $validated['slug'] = 'product-' . time() . '-' . rand(1000, 9999);
                }
            } else {
                $validated['slug'] = Str::slug($validated['slug']);
                
                // If provided slug becomes empty after slugification, generate fallback
                if (empty($validated['slug'])) {
                    $validated['slug'] = 'product-' . time() . '-' . rand(1000, 9999);
                }
            }
            
            // Ensure slug is unique with automatic numbering
            $originalSlug = $validated['slug'];
            $counter = 1;
            while (Product::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }
            
            Log::info('Generated unique slug for product', ['original' => $originalSlug, 'final' => $validated['slug']]);

            // Generate unique SKU if not provided
            if (empty($validated['sku'])) {
                $validated['sku'] = 'SKU' . date('md') . rand(1000, 9999);
            }

            // Handle image uploads
            $imageUrls = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    if ($image->isValid()) {
                        $filename = time() . '_' . $index . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                        $path = $image->storeAs('products', $filename, 'public');
                        $imageUrls[] = Storage::url($path);
                        Log::info('Product image uploaded', ['path' => $path, 'url' => Storage::url($path)]);
                    }
                }
            }

            $validated['images'] = $imageUrls;

            // Convert string boolean values to actual booleans
            $validated['is_active'] = filter_var($validated['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN);
            $validated['is_featured'] = filter_var($validated['is_featured'] ?? false, FILTER_VALIDATE_BOOLEAN);

            // Handle variants data
            $variantsData = $validated['variants'] ?? null;
            unset($validated['variants']);

            // Convert boolean values in variants data
            if ($variantsData) {
                foreach ($variantsData as &$variant) {
                    $variant['is_default'] = filter_var($variant['is_default'] ?? false, FILTER_VALIDATE_BOOLEAN);
                    $variant['is_active'] = filter_var($variant['is_active'] ?? true, FILTER_VALIDATE_BOOLEAN);
                }
            }

            // Set default values
            $validated['stock_quantity'] = $validated['stock_quantity'] ?? 0;

            $product = Product::create($validated);
            
            // Create variants if provided
            if ($variantsData) {
                $this->createProductVariants($product, $variantsData);
            } else {
                // Create a default variant if none provided
                $product->variants()->create([
                    'name' => 'Original',
                    'description' => 'Classic flavor',
                    'price' => $validated['price'] ?? 0,
                    'stock_quantity' => $validated['stock_quantity'] ?? 0,
                    'is_default' => true,
                    'is_active' => true,
                    'sort_order' => 1,
                ]);
            }
            
            $product->load(['brand', 'variants']);

            Log::info('Product created successfully', ['product_id' => $product->id]);

            return response()->json([
                'status' => 'success',
                'message' => 'Product created successfully',
                'data' => [
                    'product' => $product
                ]
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Product validation failed', ['errors' => $e->errors()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Product creation failed', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        try {
            $product->load(['brand', 'variants', 'category.parent']);
            
            return response()->json([
                'status' => 'success',
                'data' => [
                    'product' => $product
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, Product $product)
    {
        try {
            Log::info('Product update started', ['product_id' => $product->id, 'request_data' => $request->all()]);
            
            $validated = $request->validate([
                'brand_id' => 'required|exists:brands,id',
                'name' => 'required|string|max:255',
                'slug' => ['nullable', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($product->id)->whereNull('deleted_at')],
                'sku' => ['nullable', 'string', 'max:100'],
                'part_number' => 'nullable|string|max:100',
                'description' => 'nullable|string',
                'short_description' => 'nullable|string|max:500',
                'price' => 'nullable|numeric|min:0',
                'cost_price' => 'nullable|numeric|min:0',
                'stock_quantity' => 'nullable|integer|min:0',
                'min_stock_level' => 'nullable|integer|min:0',
                'max_stock_level' => 'nullable|integer|min:0',
                'weight' => 'nullable|numeric|min:0',
                'dimensions' => 'nullable|array',
                'category' => 'nullable|string|max:255',
                'subcategory' => 'nullable|string|max:255',
                'category_id' => 'nullable|exists:categories,id',
                'technical_specs' => 'nullable|array',
                'is_active' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'is_featured' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'tags' => 'nullable|array',
                'new_images' => 'nullable|array',
                'new_images.*' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
                'remove_images' => 'nullable|array',
                'existing_images' => 'nullable|array',
                // Variant validation
                'variants' => 'nullable|array|min:1',
                'variants.*.name' => 'required|string|max:255',
                'variants.*.description' => 'nullable|string',
                'variants.*.price' => 'required|numeric|min:0',
                'variants.*.stock_quantity' => 'nullable|integer|min:0',
                'variants.*.is_default' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'variants.*.is_active' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'variants.*.id' => 'nullable|exists:product_variants,id',
            ]);

            // Generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
                
                // If slug is empty (e.g., non-ASCII characters), generate a fallback
                if (empty($validated['slug'])) {
                    $validated['slug'] = 'product-' . time() . '-' . rand(1000, 9999);
                }
                
                // Ensure slug is unique (excluding current product)
                $originalSlug = $validated['slug'];
                $counter = 1;
                while (Product::where('slug', $validated['slug'])->where('id', '!=', $product->id)->exists()) {
                    $validated['slug'] = $originalSlug . '-' . $counter;
                    $counter++;
                }
            }

            // Handle image updates
            $currentImages = $product->images ?? [];
            $finalImages = $validated['existing_images'] ?? [];

            Log::info('Image update process started', [
                'product_id' => $product->id,
                'current_images' => $currentImages,
                'existing_images_from_request' => $validated['existing_images'] ?? [],
                'remove_images' => $validated['remove_images'] ?? [],
                'has_new_images' => $request->hasFile('new_images')
            ]);

            // Remove deleted images from storage
            if (!empty($validated['remove_images'])) {
                foreach ($validated['remove_images'] as $imageToRemove) {
                    if (in_array($imageToRemove, $currentImages)) {
                        // Extract path from URL and delete from storage
                        $path = str_replace('/storage/', '', parse_url($imageToRemove, PHP_URL_PATH));
                        Storage::disk('public')->delete($path);
                        Log::info('Product image deleted', ['path' => $path]);
                    }
                }
            }

            // Add new images
            if ($request->hasFile('new_images')) {
                foreach ($request->file('new_images') as $index => $image) {
                    if ($image->isValid()) {
                        $filename = time() . '_' . $index . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
                        $path = $image->storeAs('products', $filename, 'public');
                        $finalImages[] = Storage::url($path);
                        Log::info('Product image uploaded', ['path' => $path, 'url' => Storage::url($path)]);
                    }
                }
            }

            Log::info('Final images array before save', ['final_images' => $finalImages]);

            // Convert string boolean values to actual booleans
            if (isset($validated['is_active'])) {
                $validated['is_active'] = filter_var($validated['is_active'], FILTER_VALIDATE_BOOLEAN);
            }
            if (isset($validated['is_featured'])) {
                $validated['is_featured'] = filter_var($validated['is_featured'], FILTER_VALIDATE_BOOLEAN);
            }

            // Remove fields that shouldn't be updated directly
            $variantsData = $validated['variants'] ?? null;
            unset($validated['new_images'], $validated['remove_images'], $validated['existing_images'], $validated['variants']);
            
            // Set the final images array AFTER unsetting the temporary fields
            $validated['images'] = $finalImages;

            // Convert boolean values in variants data
            if ($variantsData) {
                foreach ($variantsData as &$variant) {
                    if (isset($variant['is_default'])) {
                        $variant['is_default'] = filter_var($variant['is_default'], FILTER_VALIDATE_BOOLEAN);
                    }
                    if (isset($variant['is_active'])) {
                        $variant['is_active'] = filter_var($variant['is_active'], FILTER_VALIDATE_BOOLEAN);
                    }
                }
            }

            Log::info('About to update product', [
                'product_id' => $product->id,
                'validated_keys' => array_keys($validated),
                'images_in_validated' => $validated['images'] ?? 'NOT SET'
            ]);

            $product->update($validated);
            
            // Verify the update worked
            $product->refresh();
            Log::info('Product updated successfully', [
                'product_id' => $product->id,
                'images_after_update' => $product->images
            ]);
            
            // Handle variants update
            if ($variantsData) {
                $this->updateProductVariants($product, $variantsData);
            }
            
            $product->load(['brand', 'variants']);

            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully',
                'data' => [
                    'product' => $product
                ]
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Product validation failed', ['errors' => $e->errors()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Product update failed', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product)
    {
        try {
            Log::info('Product deletion started', ['product_id' => $product->id]);

            // Delete associated images from storage
            if (!empty($product->images)) {
                foreach ($product->images as $imageUrl) {
                    $path = str_replace('/storage/', '', parse_url($imageUrl, PHP_URL_PATH));
                    Storage::disk('public')->delete($path);
                    Log::info('Product image deleted', ['path' => $path]);
                }
            }

            $product->delete();

            Log::info('Product deleted successfully', ['product_id' => $product->id]);

            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Product deletion failed', ['error' => $e->getMessage()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get product statistics for dashboard
     */
    public function stats()
    {
        try {
            $stats = [
                'total_products' => Product::count(),
                'active_products' => Product::where('is_active', true)->count(),
                'featured_products' => Product::where('is_featured', true)->count(),
                'low_stock_products' => Product::whereRaw('stock_quantity <= min_stock_level')->count(),
                'out_of_stock_products' => Product::where('stock_quantity', 0)->count(),
                'total_inventory_value' => Product::where('is_active', true)->sum(\DB::raw('price * stock_quantity')),
                'categories' => Product::distinct('category')->whereNotNull('category')->pluck('category'),
            ];

            return response()->json([
                'status' => 'success',
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch product statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Helper method to create product variants
     */
    private function createProductVariants(Product $product, array $variantsData)
    {
        $hasDefault = false;
        
        foreach ($variantsData as $index => $variantData) {
            $isDefault = $variantData['is_default'] ?? false;
            
            // Ensure only one default variant
            if ($isDefault && $hasDefault) {
                $isDefault = false;
            }
            if ($isDefault) {
                $hasDefault = true;
            }
            
            $product->variants()->create([
                'name' => $variantData['name'],
                'description' => $variantData['description'] ?? '',
                'price' => $variantData['price'],
                'stock_quantity' => $variantData['stock_quantity'] ?? 0,
                'is_default' => $isDefault,
                'is_active' => $variantData['is_active'] ?? true,
                'sort_order' => $index + 1,
            ]);
        }
        
        // If no default was set, make the first variant default
        if (!$hasDefault && $product->variants()->count() > 0) {
            $product->variants()->first()->update(['is_default' => true]);
        }
    }

    /**
     * Helper method to update product variants
     */
    private function updateProductVariants(Product $product, array $variantsData)
    {
        Log::info('Updating product variants', ['product_id' => $product->id, 'variants_data' => $variantsData]);
        
        $existingVariantIds = [];
        $hasDefault = false;
        
        foreach ($variantsData as $index => $variantData) {
            $isDefault = $variantData['is_default'] ?? false;
            
            // Ensure only one default variant
            if ($isDefault && $hasDefault) {
                $isDefault = false;
            }
            if ($isDefault) {
                $hasDefault = true;
            }
            
            if (isset($variantData['id']) && $variantData['id']) {
                // Update existing variant
                $variant = $product->variants()->find($variantData['id']);
                if ($variant) {
                    Log::info('Updating existing variant', [
                        'variant_id' => $variant->id,
                        'old_price' => $variant->price,
                        'new_price' => $variantData['price']
                    ]);
                    
                    $variant->update([
                        'name' => $variantData['name'],
                        'description' => $variantData['description'] ?? '',
                        'price' => $variantData['price'],
                        'stock_quantity' => $variantData['stock_quantity'] ?? 0,
                        'is_default' => $isDefault,
                        'is_active' => $variantData['is_active'] ?? true,
                        'sort_order' => $index + 1,
                    ]);
                    $existingVariantIds[] = $variant->id;
                } else {
                    Log::warning('Variant not found for update', ['variant_id' => $variantData['id']]);
                }
            } else {
                // Create new variant
                Log::info('Creating new variant', ['price' => $variantData['price']]);
                
                $variant = $product->variants()->create([
                    'name' => $variantData['name'],
                    'description' => $variantData['description'] ?? '',
                    'price' => $variantData['price'],
                    'stock_quantity' => $variantData['stock_quantity'] ?? 0,
                    'is_default' => $isDefault,
                    'is_active' => $variantData['is_active'] ?? true,
                    'sort_order' => $index + 1,
                ]);
                $existingVariantIds[] = $variant->id;
            }
        }
        
        // Delete variants that are no longer in the list
        $product->variants()->whereNotIn('id', $existingVariantIds)->delete();
        
        // If no default was set, make the first variant default
        if (!$hasDefault && $product->variants()->count() > 0) {
            $product->variants()->first()->update(['is_default' => true]);
        }
        
        Log::info('Product variants update completed', ['product_id' => $product->id]);
    }

    /**
     * Store a new variant for a product
     */
    public function storeVariant(Request $request, Product $product)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'cost_price' => 'nullable|numeric|min:0',
                'stock_quantity' => 'nullable|integer|min:0',
                'is_default' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'is_active' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'sort_order' => 'nullable|integer'
            ]);

            // Convert boolean values
            $is_default = filter_var($request->get('is_default', false), FILTER_VALIDATE_BOOLEAN);
            $is_active = filter_var($request->get('is_active', true), FILTER_VALIDATE_BOOLEAN);

            // If setting as default, remove default from other variants
            if ($is_default) {
                $product->variants()->update(['is_default' => false]);
            }

            $variant = $product->variants()->create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'cost_price' => $request->cost_price ?? 0,
                'stock_quantity' => $request->stock_quantity ?? 0,
                'is_default' => $is_default,
                'is_active' => $is_active,
                'sort_order' => $request->sort_order ?? 0,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Variant created successfully',
                'data' => ['variant' => $variant]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create variant',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a product variant
     */
    public function updateVariant(Request $request, Product $product, ProductVariant $variant)
    {
        try {
            if ($variant->product_id !== $product->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Variant does not belong to this product'
                ], 404);
            }

            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'cost_price' => 'nullable|numeric|min:0',
                'stock_quantity' => 'nullable|integer|min:0',
                'is_default' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'is_active' => 'sometimes|in:0,1,true,false,"0","1","true","false"',
                'sort_order' => 'nullable|integer'
            ]);

            // Convert boolean values
            $is_default = filter_var($request->get('is_default', $variant->is_default), FILTER_VALIDATE_BOOLEAN);
            $is_active = filter_var($request->get('is_active', $variant->is_active), FILTER_VALIDATE_BOOLEAN);

            // If setting as default, remove default from other variants
            if ($is_default && !$variant->is_default) {
                $product->variants()->where('id', '!=', $variant->id)->update(['is_default' => false]);
            }

            $variant->update([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'cost_price' => $request->cost_price ?? $variant->cost_price,
                'stock_quantity' => $request->stock_quantity ?? $variant->stock_quantity,
                'is_default' => $is_default,
                'is_active' => $is_active,
                'sort_order' => $request->sort_order ?? $variant->sort_order,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Variant updated successfully',
                'data' => ['variant' => $variant]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update variant',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a product variant
     */
    public function deleteVariant(Product $product, ProductVariant $variant)
    {
        try {
            if ($variant->product_id !== $product->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Variant does not belong to this product'
                ], 404);
            }

            // Don't allow deleting the last variant
            if ($product->variants()->count() <= 1) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cannot delete the last variant. Product must have at least one variant.'
                ], 400);
            }

            // If deleting default variant, set another variant as default
            if ($variant->is_default) {
                $newDefault = $product->variants()->where('id', '!=', $variant->id)->first();
                if ($newDefault) {
                    $newDefault->update(['is_default' => true]);
                }
            }

            $variant->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Variant deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete variant',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
