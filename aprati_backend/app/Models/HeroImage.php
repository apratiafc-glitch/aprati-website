<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroImage extends Model
{
    protected $fillable = [
        'image_url',
        'alt_text',
        'title',
        'description',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    /**
     * Get the active hero image
     */
    public static function getActive()
    {
        return self::where('is_active', true)
                   ->orderBy('sort_order')
                   ->first();
    }
}
