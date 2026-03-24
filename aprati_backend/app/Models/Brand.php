<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'logo', 'cover_image', 'is_active', 'sort_order', 'established_year'];

    protected $appends = ['logo_url', 'cover_image_url'];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getLogoUrlAttribute()
    {
        if (!$this->logo) {
            return null;
        }
        if (str_starts_with($this->logo, 'http')) {
            return $this->logo;
        }
        return config('app.url') . $this->logo . '?v=3';
    }

    public function getCoverImageUrlAttribute()
    {
        if (!$this->cover_image) {
            return null;
        }
        if (str_starts_with($this->cover_image, 'http')) {
            return $this->cover_image;
        }
        return config('app.url') . $this->cover_image . '?v=3';
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}

