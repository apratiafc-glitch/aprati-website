<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagementPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'bio',
        'email',
        'department',
        'image',
        'is_active',
        'sort_order'
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

        return \Illuminate\Support\Facades\Storage::disk('public')->url(str_replace('/storage/', '', $this->image));
    }
}
