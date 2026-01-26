<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByDepartment($query, $department)
    {
        return $query->where('department', $department);
    }

    /**
     * Get the job applications for this career.
     */
    public function applications()
    {
        return $this->hasMany(JobApplication::class, 'career_id');
    }

    /**
     * Get pending applications for this career.
     */
    public function pendingApplications()
    {
        return $this->hasMany(JobApplication::class, 'career_id')->where('status', 'pending');
    }

    /**
     * Get recent applications (last 7 days) for this career.
     */
    public function recentApplications()
    {
        return $this->hasMany(JobApplication::class, 'career_id')
                    ->where('created_at', '>=', now()->subDays(7));
    }
}
