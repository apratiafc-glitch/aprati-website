<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories
     */
    public function index(Request $request)
    {
        try {
            $query = Category::with(['parent', 'children']);

            // Filter by status
            if ($request->has('status')) {
                if ($request->status === 'active') {
                    $query->active();
                } elseif ($request->status === 'inactive') {
                    $query->where('is_active', false);
                }
            }

            // Search functionality
            if ($request->has('search') && !empty($request->search)) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // Filter by parent
            if ($request->has('parent_id')) {
                if ($request->parent_id === 'null' || $request->parent_id === '') {
                    $query->topLevel();
                } else {
                    $query->where('parent_id', $request->parent_id);
                }
            }

            // Default ordering
            $categories = $query->ordered()->get();

            // Transform for API response
            $categoriesData = $categories->map(function ($category) {
                return $category->toApiArray();
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'categories' => $categoriesData
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load categories: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created category
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:categories,name',
                'description' => 'nullable|string|max:1000',
                'parent_id' => 'nullable|exists:categories,id',
                'is_active' => 'boolean',
                'sort_order' => 'integer|min:0',
                'color' => 'nullable|string|max:50'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            // Validate parent relationship (prevent circular references)
            if ($request->parent_id) {
                $parent = Category::find($request->parent_id);
                if (!$parent) {
                    return response()->json([
                        'success' => false,
                        'error' => 'Parent category not found'
                    ], 404);
                }

                // Check if parent has its own parent (limit to 2 levels)
                if ($parent->parent_id) {
                    return response()->json([
                        'success' => false,
                        'error' => 'Cannot create more than 2 levels of categories'
                    ], 400);
                }
            }

            $categoryData = $request->only(['name', 'description', 'parent_id', 'is_active', 'sort_order', 'color']);
            $categoryData['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : true;
            $categoryData['sort_order'] = $request->input('sort_order', 0);

            $category = Category::create($categoryData);
            $category->load(['parent', 'children']);

            return response()->json([
                'success' => true,
                'message' => 'Category created successfully',
                'data' => [
                    'category' => $category->toApiArray()
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to create category: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified category
     */
    public function show(Category $category)
    {
        try {
            $category->load(['parent', 'children', 'products']);

            return response()->json([
                'success' => true,
                'data' => [
                    'category' => $category->toApiArray()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load category: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified category
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
                'description' => 'nullable|string|max:1000',
                'parent_id' => 'nullable|exists:categories,id',
                'is_active' => 'boolean',
                'sort_order' => 'integer|min:0',
                'color' => 'nullable|string|max:50'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            // Validate parent relationship
            if ($request->parent_id) {
                // Cannot set self as parent
                if ($request->parent_id == $category->id) {
                    return response()->json([
                        'success' => false,
                        'error' => 'Category cannot be its own parent'
                    ], 400);
                }

                // Check if requested parent is a child of current category
                $parent = Category::find($request->parent_id);
                if ($parent && $parent->parent_id == $category->id) {
                    return response()->json([
                        'success' => false,
                        'error' => 'Cannot set a child category as parent'
                    ], 400);
                }

                // Check depth limit
                if ($parent && $parent->parent_id) {
                    return response()->json([
                        'success' => false,
                        'error' => 'Cannot create more than 2 levels of categories'
                    ], 400);
                }
            }

            $categoryData = $request->only(['name', 'description', 'parent_id', 'is_active', 'sort_order', 'color']);
            if ($request->has('is_active')) {
                $categoryData['is_active'] = $request->boolean('is_active');
            }

            $category->update($categoryData);
            $category->load(['parent', 'children']);

            return response()->json([
                'success' => true,
                'message' => 'Category updated successfully',
                'data' => [
                    'category' => $category->toApiArray()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to update category: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified category
     */
    public function destroy(Category $category)
    {
        try {
            // Check if category has products
            $productsCount = $category->products()->count();
            if ($productsCount > 0) {
                return response()->json([
                    'success' => false,
                    'error' => "Cannot delete category with {$productsCount} products. Please move or delete the products first."
                ], 400);
            }

            // Check if category has children
            $childrenCount = $category->children()->count();
            if ($childrenCount > 0) {
                return response()->json([
                    'success' => false,
                    'error' => "Cannot delete category with {$childrenCount} subcategories. Please delete or move the subcategories first."
                ], 400);
            }

            $categoryName = $category->name;
            $category->delete();

            return response()->json([
                'success' => true,
                'message' => "Category '{$categoryName}' deleted successfully"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete category: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle category status
     */
    public function toggleStatus(Category $category)
    {
        try {
            $category->update([
                'is_active' => !$category->is_active
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Category status updated successfully',
                'data' => [
                    'category' => $category->toApiArray()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to update category status: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get category statistics
     */
    public function statistics()
    {
        try {
            $totalCategories = Category::count();
            $activeCategories = Category::active()->count();
            $topLevelCategories = Category::topLevel()->count();
            $categoriesWithProducts = Category::has('products')->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_categories' => $totalCategories,
                    'active_categories' => $activeCategories,
                    'inactive_categories' => $totalCategories - $activeCategories,
                    'top_level_categories' => $topLevelCategories,
                    'subcategories' => $totalCategories - $topLevelCategories,
                    'categories_with_products' => $categoriesWithProducts,
                    'empty_categories' => $totalCategories - $categoriesWithProducts
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get hierarchical category tree
     */
    public function tree()
    {
        try {
            $categories = Category::with(['children' => function ($query) {
                $query->active()->ordered();
            }])
            ->active()
            ->topLevel()
            ->ordered()
            ->get();

            $tree = $categories->map(function ($category) {
                return $this->buildCategoryTree($category);
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'tree' => $tree
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load category tree: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Build category tree recursively
     */
    private function buildCategoryTree($category)
    {
        $data = $category->toApiArray();
        
        if ($category->children && $category->children->count() > 0) {
            $data['children'] = $category->children->map(function ($child) {
                return $this->buildCategoryTree($child);
            });
        }

        return $data;
    }
}
