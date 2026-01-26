<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class JobApplicationController extends Controller
{
    /**
     * Get all job applications for admin
     */
    public function index(Request $request)
    {
        try {
            $query = JobApplication::with('career')
                ->orderBy('applied_at', 'desc');

            // Filter by status
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            // Filter by career
            if ($request->filled('career_id')) {
                $query->where('career_id', $request->career_id);
            }

            // Search by name or email
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            }

            $applications = $query->paginate($request->get('per_page', 15));

            return response()->json([
                'success' => true,
                'data' => $applications->items(),
                'meta' => [
                    'current_page' => $applications->currentPage(),
                    'last_page' => $applications->lastPage(),
                    'per_page' => $applications->perPage(),
                    'total' => $applications->total(),
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching job applications: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch job applications'
            ], 500);
        }
    }

    /**
     * Get application statistics
     */
    public function statistics()
    {
        try {
            $stats = [
                'total' => JobApplication::count(),
                'pending' => JobApplication::where('status', 'pending')->count(),
                'reviewed' => JobApplication::where('status', 'reviewed')->count(),
                'shortlisted' => JobApplication::where('status', 'shortlisted')->count(),
                'hired' => JobApplication::where('status', 'hired')->count(),
                'rejected' => JobApplication::where('status', 'rejected')->count(),
                'recent_applications' => JobApplication::where('applied_at', '>=', now()->subDays(7))->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching application statistics: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch statistics'
            ], 500);
        }
    }

    /**
     * Get a specific job application
     */
    public function show($id)
    {
        try {
            $application = JobApplication::with('career')->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $application
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching job application: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Job application not found'
            ], 404);
        }
    }

    /**
     * Update application status
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed,shortlisted,rejected,hired',
            'admin_notes' => 'nullable|string|max:1000'
        ]);

        try {
            $application = JobApplication::findOrFail($id);
            
            $application->update([
                'status' => $request->status,
                'admin_notes' => $request->admin_notes
            ]);

            Log::info('Job application status updated', [
                'application_id' => $id,
                'old_status' => $application->getOriginal('status'),
                'new_status' => $request->status,
                'admin_notes' => $request->admin_notes
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Application status updated successfully',
                'data' => $application->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating application status: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to update application status'
            ], 500);
        }
    }

    /**
     * Download CV file
     */
    public function downloadCV($id)
    {
        try {
            $application = JobApplication::findOrFail($id);
            
            if (!$application->cv_file_path) {
                return response()->json([
                    'success' => false,
                    'error' => 'No CV file found for this application'
                ], 404);
            }

            $filePath = storage_path('app/public/' . $application->cv_file_path);
            
            if (!file_exists($filePath)) {
                return response()->json([
                    'success' => false,
                    'error' => 'CV file not found on server'
                ], 404);
            }

            Log::info('CV downloaded', [
                'application_id' => $id,
                'file_path' => $application->cv_file_path,
                'applicant' => $application->full_name
            ]);

            return response()->download($filePath, $application->cv_original_name);
        } catch (\Exception $e) {
            Log::error('Error downloading CV: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to download CV'
            ], 500);
        }
    }

    /**
     * View CV file in browser (for preview)
     */
    public function viewCV(Request $request, $id)
    {
        try {
            // Check for token in query parameter for iframe access
            $token = $request->query('token');
            if ($token) {
                $user = \Laravel\Sanctum\PersonalAccessToken::findToken($token)?->tokenable;
                if (!$user || $user->role !== 'admin') {
                    return response()->json([
                        'success' => false,
                        'error' => 'Unauthorized access'
                    ], 403);
                }
            }

            $application = JobApplication::findOrFail($id);
            
            if (!$application->cv_file_path) {
                return response()->json([
                    'success' => false,
                    'error' => 'No CV file found for this application'
                ], 404);
            }

            $filePath = storage_path('app/public/' . $application->cv_file_path);
            
            if (!file_exists($filePath)) {
                return response()->json([
                    'success' => false,
                    'error' => 'CV file not found on server'
                ], 404);
            }

            $mimeType = mime_content_type($filePath);

            Log::info('CV viewed', [
                'application_id' => $id,
                'file_path' => $application->cv_file_path,
                'applicant' => $application->full_name,
                'mime_type' => $mimeType
            ]);

            return response()->file($filePath, [
                'Content-Type' => $mimeType,
                'Content-Disposition' => 'inline; filename="' . $application->cv_original_name . '"'
            ]);
        } catch (\Exception $e) {
            Log::error('Error viewing CV: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to view CV'
            ], 500);
        }
    }

    /**
     * Delete job application
     */
    public function destroy($id)
    {
        try {
            $application = JobApplication::findOrFail($id);
            
            // Delete CV file if exists
            if ($application->cv_file_path && Storage::disk('public')->exists($application->cv_file_path)) {
                Storage::disk('public')->delete($application->cv_file_path);
            }

            $applicantName = $application->full_name;
            $application->delete();

            Log::info('Job application deleted', [
                'application_id' => $id,
                'applicant' => $applicantName
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Application deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting job application: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete application'
            ], 500);
        }
    }

    /**
     * Get recent applications (for notifications)
     */
    public function recent()
    {
        try {
            $applications = JobApplication::with('career')
                ->where('applied_at', '>=', now()->subDays(1))
                ->orderBy('applied_at', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $applications
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching recent applications: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch recent applications'
            ], 500);
        }
    }
}
