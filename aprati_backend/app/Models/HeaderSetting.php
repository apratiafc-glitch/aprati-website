<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
        'label',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByGroup($query, $group)
    {
        return $query->where('group', $group);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('key');
    }

    // Helper methods
    public static function getValue($key, $default = null)
    {
        $setting = static::where('key', $key)->where('is_active', true)->first();
        return $setting ? $setting->value : $default;
    }

    public static function getGroupSettings($group)
    {
        return static::active()
            ->byGroup($group)
            ->ordered()
            ->pluck('value', 'key')
            ->toArray();
    }

    public static function getAllSettings()
    {
        return static::active()
            ->ordered()
            ->get()
            ->groupBy('group')
            ->map(function ($settings) {
                return $settings->pluck('value', 'key')->toArray();
            })
            ->toArray();
    }

    // Create default settings
    public static function createDefaults()
    {
        $defaults = [
            // Branding Information
            [
                'key' => 'header_logo',
                'value' => '/images/logo.png',
                'type' => 'image',
                'group' => 'branding',
                'label' => 'Header Logo',
                'sort_order' => 1
            ],
            [
                'key' => 'company_name',
                'value' => 'Aprati Foods Cambodia',
                'type' => 'text',
                'group' => 'branding',
                'label' => 'Company Name',
                'sort_order' => 2
            ],
            [
                'key' => 'tagline',
                'value' => 'Premium Quality Food Products',
                'type' => 'text',
                'group' => 'branding',
                'label' => 'Company Tagline',
                'sort_order' => 3
            ],

            // Search Settings
            [
                'key' => 'search_placeholder',
                'value' => 'Search products...',
                'type' => 'text',
                'group' => 'search',
                'label' => 'Search Placeholder Text',
                'sort_order' => 1
            ],
            [
                'key' => 'enable_search',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'search',
                'label' => 'Enable Search',
                'sort_order' => 2
            ]
        ];

        foreach ($defaults as $setting) {
            static::firstOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
