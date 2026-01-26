<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'is_active',
        'sort_order',
        'color'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    /**
     * Boot method to auto-generate slug
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = static::generateUniqueSlug($category->name);
            }
            
            // Generate random color if not provided
            if (empty($category->color)) {
                $colors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray'];
                $category->color = $colors[array_rand($colors)];
            }
        });

        static::updating(function ($category) {
            if ($category->isDirty('name') && empty($category->slug)) {
                $category->slug = static::generateUniqueSlug($category->name);
            }
        });
    }

    /**
     * Generate a unique slug
     */
    private static function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Relationship: Parent category
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * Relationship: Child categories
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('sort_order')->orderBy('name');
    }

    /**
     * Relationship: All child categories recursively
     */
    public function allChildren()
    {
        return $this->children()->with('allChildren');
    }

    /**
     * Relationship: Products in this category
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    /**
     * Scope: Active categories only
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: Top-level categories (no parent)
     */
    public function scopeTopLevel($query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Scope: Ordered by sort_order and name
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    /**
     * Get the full category path (Parent > Child)
     */
    public function getFullPathAttribute()
    {
        if ($this->parent) {
            return $this->parent->full_path . ' > ' . $this->name;
        }
        
        return $this->name;
    }

    /**
     * Get products count including child categories
     */
    public function getProductsCountAttribute()
    {
        $count = $this->products()->count();
        
        foreach ($this->children as $child) {
            $count += $child->products_count;
        }
        
        return $count;
    }

    /**
     * Check if category has children
     */
    public function hasChildren()
    {
        return $this->children()->count() > 0;
    }

    /**
     * Get all ancestor categories
     */
    public function getAncestors()
    {
        $ancestors = collect();
        $parent = $this->parent;
        
        while ($parent) {
            $ancestors->prepend($parent);
            $parent = $parent->parent;
        }
        
        return $ancestors;
    }

    /**
     * Get all descendant categories
     */
    public function getDescendants()
    {
        $descendants = collect();
        
        foreach ($this->children as $child) {
            $descendants->push($child);
            $descendants = $descendants->merge($child->getDescendants());
        }
        
        return $descendants;
    }

    /**
     * Convert to array for API responses
     */
    public function toApiArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'parent_id' => $this->parent_id,
            'parent' => $this->parent ? [
                'id' => $this->parent->id,
                'name' => $this->parent->name,
                'slug' => $this->parent->slug
            ] : null,
            'children_count' => $this->children()->count(),
            'products_count' => $this->products()->count(),
            'is_active' => $this->is_active,
            'sort_order' => $this->sort_order,
            'color' => $this->color,
            'full_path' => $this->full_path,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
