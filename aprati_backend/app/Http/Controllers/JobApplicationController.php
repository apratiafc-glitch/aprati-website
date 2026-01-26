<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of job applications (Admin only)
     */
    public function index(Request $request)
    {
        $query = JobApplication::with('career');

        // Filter by career
        if ($request->has('career_id') && $request->career_id) {
            $query->where('career_id', $request->career_id);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('full_name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('phone_number', 'LIKE', "%{$search}%");
            });
        }

        $applications = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $applications
        ]);
    }

    /**
     * Store a newly created job application via career route
     */
    public function apply(Request $request, $careerId)
    {
        try {
            Log::info('Job application apply method called', [
                'career_id' => $careerId,
                'request_data' => $request->except(['cv_file']), // Exclude file from logging
                'has_cv_file' => $request->hasFile('cv_file'),
                'content_type' => $request->header('Content-Type')
            ]);
            
            // Simple validation first
            if (!$request->has('full_name') || !$request->has('email')) {
                return response()->json([
                    'success' => false,
                    'error' => 'Missing required fields: full_name, email'
                ], 400);
            }
            
            // Check if career exists
            $career = Career::find($careerId);
            if (!$career) {
                return response()->json([
                    'success' => false,
                    'error' => 'Career not found'
                ], 404);
            }
            
            Log::info('Career found', ['career' => $career->toArray()]);
            
            $request->merge(['career_id' => $careerId]);
            return $this->store($request);
            
        } catch (\Exception $e) {
            Log::error('Apply method error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'error' => 'Apply method failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created job application
     */
    public function store(Request $request)
    {
        try {
            Log::info('Store method called', [
                'career_id' => $request->career_id,
                'has_cv_file' => $request->hasFile('cv_file')
            ]);
            
            // Basic validation first - without file
            $basicValidator = Validator::make($request->all(), [
                'career_id' => 'required|exists:careers,id',
                'full_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone_number' => 'required|string|max:20',
                'telegram_number' => 'nullable|string|max:50',
                'cover_letter' => 'nullable|string|max:2000',
            ]);

            if ($basicValidator->fails()) {
                Log::error('Basic validation failed', ['errors' => $basicValidator->errors()]);
                return response()->json([
                    'success' => false,
                    'error' => 'Basic validation failed',
                    'errors' => $basicValidator->errors()
                ], 422);
            }
            
            Log::info('Basic validation passed');
            
            // File validation
            if (!$request->hasFile('cv_file')) {
                return response()->json([
                    'success' => false,
                    'error' => 'CV file is required'
                ], 422);
            }
            
            $cvFile = $request->file('cv_file');
            Log::info('CV file details', [
                'original_name' => $cvFile->getClientOriginalName(),
                'size' => $cvFile->getSize(),
                'mime_type' => $cvFile->getMimeType(),
                'is_valid' => $cvFile->isValid()
            ]);
            
            // Validate file
            if (!$cvFile->isValid()) {
                return response()->json([
                    'success' => false,
                    'error' => 'Invalid CV file'
                ], 422);
            }
            
            // Check file size (5MB max)
            if ($cvFile->getSize() > 5 * 1024 * 1024) {
                return response()->json([
                    'success' => false,
                    'error' => 'CV file size must be less than 5MB'
                ], 422);
            }
            
            // Check file type
            $allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!in_array($cvFile->getMimeType(), $allowedMimes)) {
                return response()->json([
                    'success' => false,
                    'error' => 'CV file must be PDF, DOC, or DOCX format'
                ], 422);
            }
            
            Log::info('File validation passed');

            // Check if the career exists and is active
            $career = Career::where('id', $request->career_id)
                          ->where('status', 'active')
                          ->first();

            if (!$career) {
                return response()->json([
                    'success' => false,
                    'error' => 'Job position is no longer available'
                ], 404);
            }
            
            Log::info('Career validation passed');

            // Handle CV file upload
            $originalName = $cvFile->getClientOriginalName();
            $fileName = time() . '_' . str_replace(' ', '_', $originalName);
            
            Log::info('Attempting file upload', [
                'original_name' => $originalName,
                'new_filename' => $fileName,
                'storage_path' => 'cv_files/' . $fileName
            ]);
            
            // Ensure directory exists
            if (!Storage::disk('public')->exists('cv_files')) {
                Storage::disk('public')->makeDirectory('cv_files');
                Log::info('Created cv_files directory');
            }
            
            $cvPath = $cvFile->storeAs('cv_files', $fileName, 'public');
            Log::info('File uploaded successfully', ['path' => $cvPath]);

            // Create job application
            $applicationData = [
                'career_id' => $request->career_id,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'telegram_number' => $request->telegram_number,
                'cover_letter' => $request->cover_letter,
                'cv_file_path' => $cvPath,
                'cv_original_name' => $originalName,
                'status' => JobApplication::STATUS_PENDING,
                'applied_at' => now(),
            ];
            
            Log::info('Creating job application', ['data' => $applicationData]);
            
            $application = JobApplication::create($applicationData);
            Log::info('Job application created', ['id' => $application->id]);

            // Load the career relationship
            $application->load('career');

            // TODO: Send notification to admin when new application is submitted
            // This could be implemented with:
            // - Laravel Notifications (email/database notifications)
            // - Queue jobs for sending emails/SMS to admin
            // - Real-time notifications via WebSocket/Pusher
            // - Slack/Discord webhook notifications
            // - Browser push notifications
            
            Log::info('New job application notification should be sent to admin', [
                'application_id' => $application->id,
                'applicant' => $application->full_name,
                'position' => $application->career->title_job
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Application submitted successfully!',
                'data' => $application
            ], 201);

        } catch (\Exception $e) {
            Log::error('Job application error: ' . $e->getMessage());
            Log::error('Request data: ' . json_encode($request->except(['cv_file'])));
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to submit application: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified job application
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
            return response()->json([
                'success' => false,
                'error' => 'Application not found'
            ], 404);
        }
    }

    /**
     * Update the status of a job application (Admin only)
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,reviewed,shortlisted,rejected,hired',
            'admin_notes' => 'nullable|string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $application = JobApplication::findOrFail($id);
            
            $application->update([
                'status' => $request->status,
                'admin_notes' => $request->admin_notes
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Application status updated successfully',
                'data' => $application
            ]);

        } catch (\Exception $e) {
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
            
            if (!Storage::disk('public')->exists($application->cv_file_path)) {
                return response()->json([
                    'success' => false,
                    'error' => 'CV file not found'
                ], 404);
            }

            return Storage::disk('public')->download(
                $application->cv_file_path,
                $application->cv_original_name
            );

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to download CV'
            ], 500);
        }
    }

    /**
     * Delete a job application (Admin only)
     */
    public function destroy($id)
    {
        try {
            $application = JobApplication::findOrFail($id);
            
            // Delete CV file
            if ($application->cv_file_path && Storage::disk('public')->exists($application->cv_file_path)) {
                Storage::disk('public')->delete($application->cv_file_path);
            }

            $application->delete();

            return response()->json([
                'success' => true,
                'message' => 'Application deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete application'
            ], 500);
        }
    }

    /**
     * Get application statistics
     */
    public function getStats()
    {
        try {
            $stats = [
                'total' => JobApplication::count(),
                'pending' => JobApplication::where('status', 'pending')->count(),
                'reviewed' => JobApplication::where('status', 'reviewed')->count(),
                'shortlisted' => JobApplication::where('status', 'shortlisted')->count(),
                'hired' => JobApplication::where('status', 'hired')->count(),
                'rejected' => JobApplication::where('status', 'rejected')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch statistics'
            ], 500);
        }
    }
}
