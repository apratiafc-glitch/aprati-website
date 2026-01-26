<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_REVIEWED = 'reviewed';
    const STATUS_SHORTLISTED = 'shortlisted';
    const STATUS_REJECTED = 'rejected';
    const STATUS_HIRED = 'hired';

    protected $fillable = [
        'career_id',
        'full_name',
        'email',
        'phone_number',
        'telegram_number',
        'cover_letter',
        'cv_file_path',
        'cv_original_name',
        'status',
        'admin_notes',
        'applied_at',
    ];

    protected $casts = [
        'applied_at' => 'datetime',
    ];

    /**
     * Get the career this application belongs to
     */
    public function career()
    {
        return $this->belongsTo(Career::class);
    }

    /**
     * Get available statuses
     */
    public static function getAvailableStatuses(): array
    {
        return [
            self::STATUS_PENDING => 'Pending Review',
            self::STATUS_REVIEWED => 'Under Review',
            self::STATUS_SHORTLISTED => 'Shortlisted',
            self::STATUS_REJECTED => 'Rejected',
            self::STATUS_HIRED => 'Hired',
        ];
    }

    /**
     * Scope to get pending applications
     */
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Scope to get applications by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Check if application is pending
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if application is hired
     */
    public function isHired(): bool
    {
        return $this->status === self::STATUS_HIRED;
    }

    /**
     * Check if application is rejected
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    /**
     * Get the CV file URL
     */
    public function getCvUrlAttribute()
    {
        return $this->cv_file_path ? asset('storage/' . $this->cv_file_path) : null;
    }
}
