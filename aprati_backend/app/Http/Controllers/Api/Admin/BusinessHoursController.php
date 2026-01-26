<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BusinessHours;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BusinessHoursController extends Controller
{
    /**
     * Display a listing of business hours.
     */
    public function index()
    {
        try {
            $businessHours = BusinessHours::ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $businessHours,
                'message' => 'Business hours retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve business hours',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created business hour entry.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'label' => 'required|string|max:255',
                'description' => 'nullable|string',
                'day_of_week' => 'required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday,weekdays,weekends,all',
                'open_time' => 'nullable|date_format:H:i',
                'close_time' => 'nullable|date_format:H:i',
                'timezone' => 'nullable|string|max:10',
                'is_24_hours' => 'boolean',
                'is_closed' => 'boolean',
                'special_note' => 'nullable|string',
                'sort_order' => 'integer|min:0',
                'is_active' => 'boolean',
                'metadata' => 'nullable|array'
            ]);

            // Convert time format if needed
            if (isset($validated['open_time']) && $validated['open_time']) {
                $validated['open_time'] = $validated['open_time'] . ':00';
            }
            if (isset($validated['close_time']) && $validated['close_time']) {
                $validated['close_time'] = $validated['close_time'] . ':00';
            }

            $businessHours = BusinessHours::create($validated);

            return response()->json([
                'success' => true,
                'data' => $businessHours,
                'message' => 'Business hours created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create business hours',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified business hours.
     */
    public function show(BusinessHours $businessHours)
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $businessHours,
                'message' => 'Business hours retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve business hours',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified business hours.
     */
    public function update(Request $request, BusinessHours $businessHours)
    {
        try {
            $validated = $request->validate([
                'label' => 'required|string|max:255',
                'description' => 'nullable|string',
                'day_of_week' => 'required|string|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday,weekdays,weekends,all',
                'open_time' => 'nullable|date_format:H:i',
                'close_time' => 'nullable|date_format:H:i',
                'timezone' => 'nullable|string|max:10',
                'is_24_hours' => 'boolean',
                'is_closed' => 'boolean',
                'special_note' => 'nullable|string',
                'sort_order' => 'integer|min:0',
                'is_active' => 'boolean',
                'metadata' => 'nullable|array'
            ]);

            // Convert time format if needed
            if (isset($validated['open_time']) && $validated['open_time']) {
                $validated['open_time'] = $validated['open_time'] . ':00';
            }
            if (isset($validated['close_time']) && $validated['close_time']) {
                $validated['close_time'] = $validated['close_time'] . ':00';
            }

            $businessHours->update($validated);

            return response()->json([
                'success' => true,
                'data' => $businessHours->fresh(),
                'message' => 'Business hours updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update business hours',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified business hours.
     */
    public function destroy(BusinessHours $businessHours)
    {
        try {
            $businessHours->delete();

            return response()->json([
                'success' => true,
                'message' => 'Business hours deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete business hours',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle the active status of business hours.
     */
    public function toggleStatus(BusinessHours $businessHours)
    {
        try {
            $businessHours->update([
                'is_active' => !$businessHours->is_active
            ]);

            return response()->json([
                'success' => true,
                'data' => $businessHours->fresh(),
                'message' => 'Business hours status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update business hours status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create default business hours templates.
     */
    public function createDefaults()
    {
        try {
            $templates = BusinessHours::getDefaultTemplates();
            $created = [];

            foreach ($templates as $template) {
                // Check if a similar template already exists
                $existing = BusinessHours::where('label', $template['label'])->first();
                
                if (!$existing) {
                    $created[] = BusinessHours::create($template);
                }
            }

            return response()->json([
                'success' => true,
                'data' => $created,
                'message' => count($created) . ' default business hours templates created successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create default business hours',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active business hours for public display.
     */
    public function getPublicHours()
    {
        try {
            $businessHours = BusinessHours::active()
                ->ordered()
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'label' => $item->display_label,
                        'description' => $item->description,
                        'day_of_week' => $item->day_of_week,
                        'formatted_hours' => $item->formatted_hours,
                        'special_note' => $item->special_note,
                        'timezone' => $item->timezone,
                        'is_open_now' => $item->isOpenNow(),
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $businessHours,
                'message' => 'Public business hours retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve public business hours',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get today's business hours.
     */
    public function getTodaysHours()
    {
        try {
            $todaysHours = BusinessHours::getTodaysHours();

            return response()->json([
                'success' => true,
                'data' => $todaysHours,
                'message' => "Today's business hours retrieved successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Failed to retrieve today's business hours",
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
