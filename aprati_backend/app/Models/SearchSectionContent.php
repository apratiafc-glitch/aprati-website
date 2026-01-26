<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchSectionContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'image_url',
        'description',
        'background_color',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    /**
     * Get the active search section content
     */
    public static function getActive()
    {
        return self::where('is_active', true)
                   ->orderBy('sort_order', 'asc')
                   ->first();
    }

    /**
     * Get default search section content when no active content exists
     */
    public static function getDefault()
    {
        return [
            'title' => 'Advanced Product Search',
            'subtitle' => 'Search by part number and filter products based on key technical parameters',
            'image_url' => null,
            'description' => null,
            'background_color' => '#f9fafb',
            'is_active' => true,
            'sort_order' => 0
        ];
    }

    /**
     * Scope to get only active content
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by sort order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }
}
