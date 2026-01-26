<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    // User roles constants
    const ROLE_ADMIN = 'admin';
    const ROLE_USER = 'user';
    const ROLE_BRAND_ADMIN = 'brand_admin';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'address',
        'profile_image',
        'is_active',
        'brand_id', // For brand admins
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    /**
     * Check if user is brand admin
     */
    public function isBrandAdmin(): bool
    {
        return $this->role === self::ROLE_BRAND_ADMIN;
    }

    /**
     * Check if user is normal user
     */
    public function isUser(): bool
    {
        return $this->role === self::ROLE_USER;
    }

    /**
     * Get the brand associated with brand admin
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Get user's job applications
     */
    public function jobApplications()
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Get available roles
     */
    public static function getAvailableRoles(): array
    {
        return [
            self::ROLE_ADMIN => 'Administrator',
            self::ROLE_BRAND_ADMIN => 'Brand Administrator',
            self::ROLE_USER => 'Normal User',
        ];
    }
}
