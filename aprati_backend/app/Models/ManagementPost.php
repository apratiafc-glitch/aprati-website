<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagementPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'department',
        'email',
        'description',
        'bio',
        'image_url',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Scope to get only active posts
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get posts by department
     */
    public function scopeByDepartment($query, $department)
    {
        return $query->where('department', $department);
    }

    /**
     * Get the full image URL
     */
    public function getFullImageUrlAttribute()
    {
        if (!$this->image_url) {
            return null;
        }

        // If it's already a full URL, return as is
        if (str_starts_with($this->image_url, 'http')) {
            return $this->image_url;
        }

        // If it's a local path, prepend the app URL
        return url($this->image_url);
    }
}
