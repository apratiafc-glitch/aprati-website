<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'image_url',
        'image_alt',
        'badge_text',
        'badge_color',
        'overlay_class',
        'primary_button_text',
        'primary_button_link',
        'primary_button_class',
        'secondary_button_text',
        'secondary_button_link',
        'secondary_button_class',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    protected $appends = ['formatted_image_url'];

    /**
     * Get formatted image URL with full path
     */
    public function getFormattedImageUrlAttribute()
    {
        if (!$this->image_url) {
            return null;
        }

        // If already a full URL, return as is
        if (str_starts_with($this->image_url, 'http')) {
            return $this->image_url;
        }

        // Otherwise, prepend the app URL
        return url($this->image_url);
    }

    /**
     * Scope to get only active slides
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by display order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order', 'asc');
    }
}
