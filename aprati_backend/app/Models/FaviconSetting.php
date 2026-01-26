<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaviconSetting extends Model
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
            // Primary Favicon
            [
                'key' => 'primary_favicon',
                'value' => '/images/web.ico',
                'type' => 'image',
                'group' => 'favicon',
                'label' => 'Primary Favicon',
                'sort_order' => 1
            ],
            [
                'key' => 'company_favicon',
                'value' => '/images/Companylogo.ico',
                'type' => 'image',
                'group' => 'favicon',
                'label' => 'Company Favicon',
                'sort_order' => 2
            ],
            [
                'key' => 'favicon_title',
                'value' => 'Aprati Foods Cambodia',
                'type' => 'text',
                'group' => 'favicon',
                'label' => 'Browser Tab Title',
                'sort_order' => 3
            ],
            [
                'key' => 'favicon_description',
                'value' => 'Premium Quality Food Products',
                'type' => 'text',
                'group' => 'favicon',
                'label' => 'Favicon Description',
                'sort_order' => 4
            ],
            [
                'key' => 'enable_apple_touch',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'favicon',
                'label' => 'Enable Apple Touch Icon',
                'sort_order' => 5
            ],
            [
                'key' => 'enable_multiple_sizes',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'favicon',
                'label' => 'Enable Multiple Favicon Sizes',
                'sort_order' => 6
            ]
        ];

        foreach ($defaults as $setting) {
            static::firstOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }

    // Get favicon configuration for frontend
    public static function getFaviconConfig()
    {
        $settings = static::active()
            ->byGroup('favicon')
            ->ordered()
            ->pluck('value', 'key')
            ->toArray();

        return [
            'primary_favicon' => $settings['primary_favicon'] ?? '/images/web.ico',
            'company_favicon' => $settings['company_favicon'] ?? '/images/Companylogo.ico',
            'title' => $settings['favicon_title'] ?? 'Aprati Foods Cambodia',
            'description' => $settings['favicon_description'] ?? 'Premium Quality Food Products',
            'enable_apple_touch' => filter_var($settings['enable_apple_touch'] ?? 'true', FILTER_VALIDATE_BOOLEAN),
            'enable_multiple_sizes' => filter_var($settings['enable_multiple_sizes'] ?? 'true', FILTER_VALIDATE_BOOLEAN),
        ];
    }
}
