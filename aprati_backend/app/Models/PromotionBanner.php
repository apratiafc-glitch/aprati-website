<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromotionBanner extends Model
{
    use HasFactory;

    protected $table = 'promotion_banners';

    protected $fillable = [
        'title',
        'subtitle',
        'image_path',
        'background_color',
        'text_color',
        'button_text',
        'button_link',
        'is_active',
    ];

    protected $appends = ['image_url'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getImageUrlAttribute()
    {
        if (!$this->image_path) {
            return null;
        }
        if (str_starts_with($this->image_path, 'http')) {
            return $this->image_path;
        }
        // Assuming storage link is set up correctly
        return '/storage/' . $this->image_path;
    }
}
