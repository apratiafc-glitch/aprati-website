<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Carbon\Carbon;

class VisitorController extends Controller
{
    /**
     * Get visitor statistics
     */
    public function getStats()
    {
        try {
            $stats = Visitor::getStats();
            
            return response()->json([
                'status' => 'success',
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load visitor statistics'
            ], 500);
        }
    }

    /**
     * Get detailed analytics
     */
    public function getAnalytics(Request $request)
    {
        try {
            $days = $request->get('days', 30);
            
            $data = [
                'daily_visits' => Visitor::getDailyVisits($days),
                'popular_pages' => Visitor::getPopularPages(10),
                'device_stats' => Visitor::getDeviceStats(),
                'browser_stats' => Visitor::getBrowserStats(),
                'country_stats' => Visitor::getCountryStats(),
                'summary' => Visitor::getStats(),
            ];

            return response()->json([
                'status' => 'success',
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load analytics data'
            ], 500);
        }
    }

    /**
     * Get visitor list with pagination
     */
    public function index(Request $request)
    {
        try {
            $query = Visitor::query()->orderByDesc('visited_at');

            // Filter by date range
            if ($request->has('start_date')) {
                $query->whereDate('visited_at', '>=', $request->start_date);
            }

            if ($request->has('end_date')) {
                $query->whereDate('visited_at', '<=', $request->end_date);
            }

            // Filter by country
            if ($request->has('country') && $request->country) {
                $query->where('country', $request->country);
            }

            // Filter by device type
            if ($request->has('device_type') && $request->device_type) {
                $query->where('device_type', $request->device_type);
            }

            // Filter unique visitors only
            if ($request->has('unique_only') && $request->unique_only) {
                $query->where('is_unique', true);
            }

            $visitors = $query->paginate(50);

            return response()->json([
                'status' => 'success',
                'data' => $visitors
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load visitors'
            ], 500);
        }
    }

    /**
     * Get real-time visitor count
     */
    public function getRealTimeStats()
    {
        try {
            $now = Carbon::now();
            
            $data = [
                'visitors_last_hour' => Visitor::where('visited_at', '>=', $now->subHour())->count(),
                'visitors_last_5_minutes' => Visitor::where('visited_at', '>=', $now->subMinutes(5))->count(),
                'online_now' => Visitor::where('visited_at', '>=', $now->subMinutes(5))
                                      ->distinct('session_id')
                                      ->count(),
                'today_total' => Visitor::today()->count(),
                'today_unique' => Visitor::today()->unique()->count(),
            ];

            return response()->json([
                'status' => 'success',
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load real-time stats'
            ], 500);
        }
    }

    /**
     * Export visitor data
     */
    public function export(Request $request)
    {
        try {
            $format = $request->get('format', 'csv');
            $startDate = $request->get('start_date');
            $endDate = $request->get('end_date');

            $query = Visitor::query()->orderByDesc('visited_at');

            if ($startDate) {
                $query->whereDate('visited_at', '>=', $startDate);
            }

            if ($endDate) {
                $query->whereDate('visited_at', '<=', $endDate);
            }

            $visitors = $query->get();

            if ($format === 'json') {
                return response()->json([
                    'status' => 'success',
                    'data' => $visitors
                ]);
            }

            // CSV export
            $csvData = "IP Address,Page URL,Country,City,Device,Browser,OS,Visited At\n";
            foreach ($visitors as $visitor) {
                $csvData .= implode(',', [
                    $visitor->ip_address,
                    '"' . $visitor->page_url . '"',
                    $visitor->country ?? 'Unknown',
                    $visitor->city ?? 'Unknown',
                    $visitor->device_type ?? 'Unknown',
                    $visitor->browser ?? 'Unknown',
                    $visitor->operating_system ?? 'Unknown',
                    $visitor->visited_at->format('Y-m-d H:i:s')
                ]) . "\n";
            }

            return response($csvData)
                ->header('Content-Type', 'text/csv')
                ->header('Content-Disposition', 'attachment; filename="visitors-export.csv"');

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to export data'
            ], 500);
        }
    }
}
