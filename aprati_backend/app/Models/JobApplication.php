<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'career_id',
        'full_name',
        'email',
        'phone_number',
        'telegram_number',
        'cover_letter',
        'cv_file_path',
        'status'
    ];

    public function career()
    {
        return $this->belongsTo(Career::class);
    }
}
