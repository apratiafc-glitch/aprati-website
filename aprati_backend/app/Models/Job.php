<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'department',
        'location',
        'employment_type',
        'experience_level',
        'salary_range',
        'description',
        'requirements',
        'benefits',
        'application_deadline',
        'is_active',
        'created_by',
    ];

    protected $casts = [
        'application_deadline' => 'date',
        'is_active' => 'boolean',
        'requirements' => 'array',
        'benefits' => 'array',
    ];

    /**
     * Get the user who created this job
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get job applications
     */
    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Scope to get active jobs
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
                    ->where('application_deadline', '>=', now());
    }

    /**
     * Check if job is still accepting applications
     */
    public function isAcceptingApplications(): bool
    {
        return $this->is_active && $this->application_deadline >= now();
    }

    /**
     * Get route key name for route model binding
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Boot method to handle model events
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($job) {
            if (empty($job->slug)) {
                $job->slug = \Str::slug($job->title);
            }
        });
    }
}
