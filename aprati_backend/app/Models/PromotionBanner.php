<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PromotionBanner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'subtitle',
        'image_url',
        'background_color',
        'button_text',
        'button_link',
        'text_color',
        'is_active',
        'display_order',
        'styling_options',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'styling_options' => 'array',
        'display_order' => 'integer',
    ];

    /**
     * Get the full URL for the image
     */
    public function getFormattedImageUrlAttribute()
    {
        if (empty($this->image_url)) {
            return null;
        }

        if (str_starts_with($this->image_url, 'http')) {
            return $this->image_url;
        }

        // If it starts with /storage/, strip it to avoid double slash if config has it
        // But usually we just want to ensure it's relative to root or absolute

        // Return relative path for frontend to handle with base URL
        return $this->image_url;
    }

    /**
     * Scope to get active banners
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('display_order')->orderBy('updated_at', 'desc');
    }
}
