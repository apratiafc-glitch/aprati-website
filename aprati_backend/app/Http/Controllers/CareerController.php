<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class CareerController extends Controller
{
    /**
     * Display a listing of careers (public endpoint)
     */
    public function index(): JsonResponse
    {
        try {
            $careers = Career::active()
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $careers,
                'message' => 'Careers retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving careers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of all careers (admin endpoint)
     */
    public function adminIndex(): JsonResponse
    {
        try {
            $careers = Career::withCount([
                'applications',
                'applications as pending_applications_count' => function($query) {
                    $query->where('status', 'pending');
                },
                'applications as reviewed_applications_count' => function($query) {
                    $query->where('status', 'reviewed');
                },
                'applications as accepted_applications_count' => function($query) {
                    $query->where('status', 'accepted');
                },
                'applications as rejected_applications_count' => function($query) {
                    $query->where('status', 'rejected');
                }
            ])
            ->orderBy('created_at', 'desc')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $careers,
                'message' => 'All careers retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving careers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created career (admin only)
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title_job' => 'required|string|max:255',
                'career_information' => 'required|string',
                'job_description' => 'required|string',
                'job_requirements' => 'required|string',
                'salary_range' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'location' => 'nullable|string|max:255',
                'job_type' => 'nullable|string|in:Full-time,Part-time,Contract,Internship',
                'department' => 'nullable|string|max:255',
                'status' => 'nullable|string|in:active,inactive,closed'
            ]);

            // Set defaults
            $validated['job_type'] = $validated['job_type'] ?? 'Full-time';
            $validated['status'] = $validated['status'] ?? 'active';

            $career = Career::create($validated);

            return response()->json([
                'success' => true,
                'data' => $career,
                'message' => 'Career created successfully'
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating career',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified career
     */
    public function show(Career $career): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $career,
                'message' => 'Career retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving career',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified career (admin only)
     */
    public function update(Request $request, Career $career): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title_job' => 'sometimes|required|string|max:255',
                'career_information' => 'sometimes|required|string',
                'job_description' => 'sometimes|required|string',
                'job_requirements' => 'sometimes|required|string',
                'salary_range' => 'sometimes|required|string|max:255',
                'position' => 'sometimes|required|string|max:255',
                'location' => 'nullable|string|max:255',
                'job_type' => 'nullable|string|in:Full-time,Part-time,Contract,Internship',
                'department' => 'nullable|string|max:255',
                'status' => 'nullable|string|in:active,inactive,closed'
            ]);

            $career->update($validated);

            return response()->json([
                'success' => true,
                'data' => $career->fresh(),
                'message' => 'Career updated successfully'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating career',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified career (admin only)
     */
    public function destroy(Career $career): JsonResponse
    {
        try {
            $career->delete();

            return response()->json([
                'success' => true,
                'message' => 'Career deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting career',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get careers by department
     */
    public function byDepartment(string $department): JsonResponse
    {
        try {
            $careers = Career::active()
                ->byDepartment($department)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $careers,
                'message' => "Careers for {$department} department retrieved successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving careers by department',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
