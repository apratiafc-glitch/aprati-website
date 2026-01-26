<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Visitor extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'user_agent',
        'page_url',
        'referer',
        'session_id',
        'country',
        'city',
        'device_type',
        'browser',
        'operating_system',
        'visited_at',
        'is_unique',
        'visit_duration',
    ];

    protected $casts = [
        'visited_at' => 'datetime',
        'is_unique' => 'boolean',
    ];

    /**
     * Scope for unique visitors
     */
    public function scopeUnique($query)
    {
        return $query->where('is_unique', true);
    }

    /**
     * Scope for today's visitors
     */
    public function scopeToday($query)
    {
        return $query->whereDate('visited_at', Carbon::today());
    }

    /**
     * Scope for this week's visitors
     */
    public function scopeThisWeek($query)
    {
        return $query->whereBetween('visited_at', [
            Carbon::now()->startOfWeek(),
            Carbon::now()->endOfWeek()
        ]);
    }

    /**
     * Scope for this month's visitors
     */
    public function scopeThisMonth($query)
    {
        return $query->whereMonth('visited_at', Carbon::now()->month)
                     ->whereYear('visited_at', Carbon::now()->year);
    }

    /**
     * Get popular pages
     */
    public static function getPopularPages($limit = 10)
    {
        return self::selectRaw('page_url, COUNT(*) as visit_count')
                   ->groupBy('page_url')
                   ->orderByDesc('visit_count')
                   ->limit($limit)
                   ->get();
    }

    /**
     * Get visitor statistics
     */
    public static function getStats()
    {
        return [
            'total_visits' => self::count(),
            'unique_visitors' => self::unique()->count(),
            'today_visits' => self::today()->count(),
            'today_unique' => self::today()->unique()->count(),
            'this_week_visits' => self::thisWeek()->count(),
            'this_month_visits' => self::thisMonth()->count(),
            'average_daily_visits' => self::thisMonth()->count() / max(Carbon::now()->day, 1),
        ];
    }

    /**
     * Get device statistics
     */
    public static function getDeviceStats()
    {
        return self::selectRaw('device_type, COUNT(*) as count')
                   ->whereNotNull('device_type')
                   ->groupBy('device_type')
                   ->orderByDesc('count')
                   ->get();
    }

    /**
     * Get browser statistics
     */
    public static function getBrowserStats()
    {
        return self::selectRaw('browser, COUNT(*) as count')
                   ->whereNotNull('browser')
                   ->groupBy('browser')
                   ->orderByDesc('count')
                   ->limit(10)
                   ->get();
    }

    /**
     * Get country statistics
     */
    public static function getCountryStats()
    {
        return self::selectRaw('country, COUNT(*) as count')
                   ->whereNotNull('country')
                   ->groupBy('country')
                   ->orderByDesc('count')
                   ->limit(10)
                   ->get();
    }

    /**
     * Get daily visits for the last 30 days
     */
    public static function getDailyVisits($days = 30)
    {
        return self::selectRaw('DATE(visited_at) as date, COUNT(*) as visits, COUNT(DISTINCT ip_address) as unique_visits')
                   ->where('visited_at', '>=', Carbon::now()->subDays($days))
                   ->groupBy('date')
                   ->orderBy('date')
                   ->get();
    }
}
