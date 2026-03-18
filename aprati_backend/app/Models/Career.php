<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_job',
        'career_information',
        'job_description',
        'job_requirements',
        'salary_range',
        'position',
        'location',
        'job_type',
        'department',
        'status'
    ];
}
