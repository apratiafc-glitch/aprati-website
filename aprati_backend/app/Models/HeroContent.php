<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroContent extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'primary_button_text',
        'primary_button_link',
        'secondary_button_text',
        'secondary_button_link',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    /**
     * Get the active hero content
     */
    public static function getActive()
    {
        return self::where('is_active', true)
            ->orderBy('sort_order')
            ->first();
    }

    /**
     * Get default hero content
     */
    public static function getDefault()
    {
        return [
            'title' => 'Welcome to <span class="text-yellow-300">Aprati</span> Food Company',
            'subtitle' => 'Enhanced introduction website with advanced product search, career management, and comprehensive inventory system.',
            'primary_button_text' => 'Explore Our Brands',
            'primary_button_link' => '/brands',
            'secondary_button_text' => 'Join Our Team',
            'secondary_button_link' => '/careers'
        ];
    }
}
