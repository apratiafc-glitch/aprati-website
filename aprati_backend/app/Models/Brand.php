<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'logo',
        'cover_image',
        'website',
        'is_active',
        'sort_order',
        'meta_title',
        'meta_description',
        'established_year',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'established_year' => 'integer',
    ];

    protected $appends = ['logo_url', 'cover_image_url'];

    /**
     * Get the logo URL attribute
     */
    public function getLogoUrlAttribute()
    {
        if ($this->logo) {
            // If logo starts with http, it's an external URL
            if (str_starts_with($this->logo, 'http')) {
                return $this->logo;
            }
            // Otherwise, it's a local file - use backend URL
            return url('storage/' . $this->logo);
        }
        
        return null;
    }

    /**
     * Get the cover image URL attribute
     */
    public function getCoverImageUrlAttribute()
    {
        if ($this->cover_image) {
            // If cover_image starts with http, it's an external URL
            if (str_starts_with($this->cover_image, 'http')) {
                return $this->cover_image;
            }
            // Otherwise, it's a local file - use backend URL
            return url('storage/' . $this->cover_image);
        }
        
        return null;
    }

    /**
     * Get the products for the brand
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get brand admins
     */
    public function brandAdmins()
    {
        return $this->hasMany(User::class)->where('role', User::ROLE_BRAND_ADMIN);
    }

    /**
     * Get all users assigned to this brand
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Scope to get active brands
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get route key name for route model binding
     * Use slug for public routes and id for admin routes
     */
    public function getRouteKeyName()
    {
        // Check if this is an admin route
        if (request()->is('api/admin/*')) {
            return 'id';
        }
        
        return 'slug';
    }

    /**
     * Boot method to handle model events
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($brand) {
            if (empty($brand->slug)) {
                $brand->slug = \Str::slug($brand->name);
            }
        });

        static::updating(function ($brand) {
            if ($brand->isDirty('name') && empty($brand->slug)) {
                $brand->slug = \Str::slug($brand->name);
            }
        });
    }
}
