<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Translation extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'locale',
        'group',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByLocale($query, $locale)
    {
        return $query->where('locale', $locale);
    }

    public function scopeByGroup($query, $group)
    {
        return $query->where('group', $group);
    }

    // Helper methods
    public static function getValue($key, $locale = null, $default = null)
    {
        $locale = $locale ?? app()->getLocale();

        $translation = static::where('key', $key)
            ->where('locale', $locale)
            ->where('is_active', true)
            ->first();

        return $translation ? $translation->value : ($default ?? $key);
    }

    public static function getGroupedTranslations($locale = null)
    {
        $locale = $locale ?? app()->getLocale();

        return static::active()
            ->byLocale($locale)
            ->get()
            ->groupBy('group')
            ->map(function ($translations) {
                return $translations->pluck('value', 'key');
            });
    }

    public static function getAllTranslations($locale = null)
    {
        $locale = $locale ?? app()->getLocale();

        return static::active()
            ->byLocale($locale)
            ->pluck('value', 'key')
            ->toArray();
    }
}
