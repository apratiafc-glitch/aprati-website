<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InformationSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image_path',
        'is_active',
        'sort_order',
        'created_by'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationship with User (admin who created it)
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Scope for active information sections
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for ordered sections
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    // Get full image URL
    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            return asset('storage/' . $this->image_path);
        }
        return asset('images/default-info.svg');
    }
}
