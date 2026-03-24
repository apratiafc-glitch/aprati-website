<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InformationSection extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'is_active'
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        return \Illuminate\Support\Facades\Storage::disk('public')->url(str_replace('/storage/', '', $this->image)) . '?v=3';
    }
}
