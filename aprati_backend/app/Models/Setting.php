<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'group',
        'type',
        'label',
        'description'
    ];

    /**
     * Get settings grouped by their group.
     */
    public static function getGrouped()
    {
        return self::all()->groupBy('group');
    }

    /**
     * Get a setting value by key.
     */
    public static function getValue($key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }}
