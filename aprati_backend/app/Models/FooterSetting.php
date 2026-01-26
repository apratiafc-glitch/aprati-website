<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
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
            // Contact Information
            [
                'key' => 'contact_address_line1',
                'value' => '123 Business District',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Address Line 1',
                'sort_order' => 1
            ],
            [
                'key' => 'contact_address_line2',
                'value' => 'Food Industry Zone',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Address Line 2',
                'sort_order' => 2
            ],
            [
                'key' => 'contact_address_line3',
                'value' => 'City, Country 12345',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Address Line 3',
                'sort_order' => 3
            ],
            [
                'key' => 'contact_phone',
                'value' => '+1 (555) 123-4567',
                'type' => 'phone',
                'group' => 'contact',
                'label' => 'Phone Number',
                'sort_order' => 4
            ],
            [
                'key' => 'contact_email',
                'value' => 'info@apratifood.com',
                'type' => 'email',
                'group' => 'contact',
                'label' => 'Email Address',
                'sort_order' => 5
            ],

            // Business Hours
            [
                'key' => 'business_hours_monday_friday',
                'value' => '8:00 AM - 6:00 PM',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Monday - Friday Hours',
                'sort_order' => 6
            ],
            [
                'key' => 'business_hours_saturday',
                'value' => '9:00 AM - 4:00 PM',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Saturday Hours',
                'sort_order' => 7
            ],
            [
                'key' => 'business_hours_sunday',
                'value' => 'Closed',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Sunday Hours',
                'sort_order' => 8
            ],

            // Social Media Links
            [
                'key' => 'social_facebook',
                'value' => 'https://facebook.com/apratifood',
                'type' => 'url',
                'group' => 'social',
                'label' => 'Facebook URL',
                'sort_order' => 1
            ],
            [
                'key' => 'social_twitter',
                'value' => 'https://twitter.com/apratifood',
                'type' => 'url',
                'group' => 'social',
                'label' => 'Twitter URL',
                'sort_order' => 2
            ],
            [
                'key' => 'social_instagram',
                'value' => 'https://instagram.com/apratifood',
                'type' => 'url',
                'group' => 'social',
                'label' => 'Instagram URL',
                'sort_order' => 3
            ],
            [
                'key' => 'social_linkedin',
                'value' => 'https://linkedin.com/company/apratifood',
                'type' => 'url',
                'group' => 'social',
                'label' => 'LinkedIn URL',
                'sort_order' => 4
            ],

            // Company Information
            [
                'key' => 'company_logo',
                'value' => '/images/logo-white.png',
                'type' => 'image',
                'group' => 'company',
                'label' => 'Footer Logo',
                'sort_order' => 1
            ],
            [
                'key' => 'company_description',
                'value' => 'Enhanced introduction website with advanced product search, career management, and comprehensive inventory system for the modern food industry.',
                'type' => 'textarea',
                'group' => 'company',
                'label' => 'Company Description',
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
