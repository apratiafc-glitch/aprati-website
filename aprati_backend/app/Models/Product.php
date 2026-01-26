<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'brand_id',
        'name',
        'slug',
        'sku',
        'part_number',
        'description',
        'short_description',
        'price',
        'cost_price',
        'stock_quantity',
        'min_stock_level',
        'max_stock_level',
        'weight',
        'dimensions',
        'category', // Legacy string category
        'subcategory', // Legacy string subcategory
        'category_id', // New relationship to categories table
        'technical_specs',
        'images',
        'is_active',
        'is_featured',
        'meta_title',
        'meta_description',
        'tags',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'weight' => 'decimal:2',
        'stock_quantity' => 'integer',
        'min_stock_level' => 'integer',
        'max_stock_level' => 'integer',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'technical_specs' => 'array',
        'images' => 'array',
        'dimensions' => 'array',
        'tags' => 'array',
    ];

    /**
     * Get the brand that owns the product
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Get the category that owns the product
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get the variants for this product
     */
    public function variants()
    {
        return $this->hasMany(ProductVariant::class)->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Get active variants for this product
     */
    public function activeVariants()
    {
        return $this->hasMany(ProductVariant::class)->active()->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Get the default variant for this product
     */
    public function defaultVariant()
    {
        return $this->hasOne(ProductVariant::class)->where('is_default', true);
    }

    /**
     * Get inventory movements for this product
     */
    public function inventoryMovements()
    {
        return $this->hasMany(InventoryMovement::class);
    }

    /**
     * Scope to get active products
     * Simplified to avoid MySQL temp table issues on servers with limited /tmp space
     * Brand active status is checked in the controller via eager loading
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get featured products
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope to search products by multiple criteria
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('sku', 'like', "%{$search}%")
                ->orWhere('part_number', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%");
        });
    }

    /**
     * Scope to filter by brand
     */
    public function scopeByBrand($query, $brandId)
    {
        return $query->where('brand_id', $brandId);
    }

    /**
     * Scope to filter by category
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Check if product is in stock
     */
    public function isInStock(): bool
    {
        return $this->stock_quantity > 0;
    }

    /**
     * Check if product is low stock
     */
    public function isLowStock(): bool
    {
        return $this->stock_quantity <= $this->min_stock_level;
    }

    /**
     * Get route key name for route model binding
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Retrieve the model for a bound value.
     */
    public function resolveRouteBinding($value, $field = null)
    {
        // First try to find by slug
        $product = $this->where('slug', $value)->first();

        // If not found and value is numeric, try to find by ID
        if (!$product && is_numeric($value)) {
            $product = $this->where('id', $value)->first();
        }

        return $product;
    }

    /**
     * Boot method to handle model events
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = \Str::slug($product->name);
            }
        });

        static::updating(function ($product) {
            if ($product->isDirty('name') && empty($product->slug)) {
                $product->slug = \Str::slug($product->name);
            }
        });
    }
}
