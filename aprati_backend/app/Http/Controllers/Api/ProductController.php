<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = \App\Models\Product::with(['brand', 'category', 'variants'])->where('is_active', true);

        $query->when($request->search, function ($q, $search) {
            $q->whereNested(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        });

        if ($request->has('brand_id') && $request->brand_id) {
            $query->where('brand_id', $request->brand_id);
        }

        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Return structured response as expected by frontend
        $products = $query->orderBy('created_at', 'desc')->paginate((int) $request->input('per_page', 12));

        return response()->json([
            'status' => 'success',
            'data' => [
                'products' => $products->items(),
                'pagination' => [
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'total' => $products->total(),
                    'per_page' => $products->perPage()
                ]
            ]
        ]);
    }

    public function indexByBrand($brandSlug)
    {
        $brand = \App\Models\Brand::where('slug', $brandSlug)->firstOrFail();
        // Return structured response as expected by frontend
        $products = $brand->products()->with(['category', 'variants'])->where('is_active', true)->paginate(6);

        return response()->json([
            'status' => 'success',
            'data' => [
                'products' => $products
            ]
        ]);
    }

    public function adminIndex(Request $request)
    {
        $query = Product::with(['brand', 'category', 'variants']);

        // Apply filters
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        if ($request->has('brand_id') && $request->brand_id) {
            $query->where('brand_id', $request->brand_id);
        }

        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('status') && $request->status) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        $products = $query->paginate($request->input('per_page', 15));

        return response()->json([
            'status' => 'success',
            'data' => [
                'products' => $products
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:products,slug',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'variants' => 'nullable|array',
            'variants.*.name' => 'required|string',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.is_default' => 'nullable|boolean',
        ]);

        // Auto-generate slug from name if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

            // Make slug unique by appending number if necessary
            $originalSlug = $validated['slug'];
            $count = 1;
            while (Product::where('slug', $validated['slug'])->exists()) {
                $validated['slug'] = $originalSlug . '-' . $count;
                $count++;
            }
        }

        // Handle image upload if provided
        if ($request->hasFile('new_images')) {
            $files = $request->file('new_images');
            if (is_array($files) && count($files) > 0) {
                $path = $files[0]->store('products', 'public');
                $validated['image'] = '/storage/' . $path;
            }
        }

        $product = Product::create($validated);

        // Handle variants if provided
        if ($request->has('variants') && is_array($request->variants)) {
            foreach ($request->variants as $index => $variantData) {
                // If it's the first variant (index 0), use its price as the main product price
                if ($index == 0) {
                    $product->update(['price' => $variantData['price']]);
                }

                $product->variants()->create([
                    'name' => $variantData['name'] ?? 'Original',
                    'price' => $variantData['price'] ?? 0,
                    'is_default' => $index === 0, // First variant is default
                    'is_active' => true,
                ]);
            }
        }

        // Reload product with variants
        $product->load('variants', 'brand', 'category');

        return response()->json([
            'status' => 'success',
            'data' => $product,
            'message' => 'Product created successfully'
        ], 201);
    }

    public function show(Product $product)
    {
        return response()->json([
            'status' => 'success',
            'data' => $product->load(['brand', 'category', 'variants'])
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'brand_id' => 'sometimes|exists:brands,id',
            'category_id' => 'sometimes|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:products,slug,' . $product->id,
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
            'variants' => 'nullable|array',
            'variants.*.id' => 'nullable|exists:product_variants,id',
            'variants.*.name' => 'required|string',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.is_default' => 'nullable|boolean',
        ]);

        // Handle image upload if provided
        if ($request->hasFile('new_images')) {
            $files = $request->file('new_images');
            if (is_array($files) && count($files) > 0) {
                // Delete old image if exists
                if ($product->image) {
                    $oldPath = str_replace('/storage/', '', $product->image);
                    if (\Illuminate\Support\Facades\Storage::disk('public')->exists($oldPath)) {
                        \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
                    }
                }

                $path = $files[0]->store('products', 'public');
                $validated['image'] = '/storage/' . $path;
            }
        }

        $product->update($validated);

        // Handle variants if provided
        if ($request->has('variants') && is_array($request->variants)) {
            $existingVariantIds = [];

            foreach ($request->variants as $index => $variantData) {
                // If it's the first variant, sync its price to main product price
                if ($index == 0 && isset($variantData['price'])) {
                    $product->update(['price' => $variantData['price']]);
                }

                if (!empty($variantData['id'])) {
                    // Update existing variant
                    $variant = $product->variants()->find($variantData['id']);
                    if ($variant) {
                        $variant->update([
                            'name' => $variantData['name'],
                            'price' => $variantData['price'],
                            'is_default' => $index === 0,
                        ]);
                        $existingVariantIds[] = $variant->id;
                    }
                } else {
                    // Create new variant
                    $newVariant = $product->variants()->create([
                        'name' => $variantData['name'] ?? 'Original',
                        'price' => $variantData['price'] ?? 0,
                        'is_default' => $index === 0,
                        'is_active' => true,
                    ]);
                    $existingVariantIds[] = $newVariant->id;
                }
            }

            // Delete variants that weren't in the update
            $product->variants()->whereNotIn('id', $existingVariantIds)->delete();
        }

        // Reload product with variants
        $product->load('variants', 'brand', 'category');

        return response()->json([
            'status' => 'success',
            'data' => $product,
            'message' => 'Product updated successfully'
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted successfully'
        ]);
    }
}
