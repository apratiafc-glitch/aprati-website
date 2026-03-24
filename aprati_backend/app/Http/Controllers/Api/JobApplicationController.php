<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Career;
use App\Models\JobApplication;
use App\Models\NotificationSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of job applications (admin).
     */
    public function index(Request $request)
    {
        $query = JobApplication::with('career');

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by career
        if ($request->has('career_id') && $request->career_id) {
            $query->where('career_id', $request->career_id);
        }

        // Search by name or email
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $applications = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $applications
        ]);
    }

    /**
     * Display the specified job application.
     */
    public function show(JobApplication $jobApplication)
    {
        return response()->json([
            'success' => true,
            'data' => $jobApplication->load('career')
        ]);
    }

    /**
     * Update the status of a job application.
     */
    public function updateStatus(Request $request, JobApplication $jobApplication)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,reviewed,shortlisted,hired,rejected',
            'admin_notes' => 'nullable|string'
        ]);

        $jobApplication->update([
            'status' => $validated['status'],
            'admin_notes' => $validated['admin_notes'] ?? $jobApplication->admin_notes
        ]);

        return response()->json([
            'success' => true,
            'data' => $jobApplication,
            'message' => 'Application status updated successfully'
        ]);
    }

    /**
     * Remove the specified job application from storage.
     */
    public function destroy(JobApplication $jobApplication)
    {
        // Delete CV file if it exists
        if ($jobApplication->cv_file_path) {
            $path = str_replace('/storage/', '', $jobApplication->cv_file_path);
            Storage::disk('public')->delete($path);
        }

        $jobApplication->delete();

        return response()->json([
            'success' => true,
            'message' => 'Application deleted successfully'
        ]);
    }

    /**
     * Get job application statistics.
     */
    public function statistics()
    {
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
    }

    /**
     * Get recent applications (last 24 hours).
     */
    public function recent()
    {
        $recent = JobApplication::with('career')
            ->where('created_at', '>=', now()->subDay())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $recent
        ]);
    }

    /**
     * Download CV file.
     */
    public function downloadCv(JobApplication $jobApplication)
    {
        $path = str_replace('/storage/', '', $jobApplication->cv_file_path);
        
        if (!Storage::disk('public')->exists($path)) {
            return response()->json([
                'success' => false,
                'message' => 'CV file not found'
            ], 404);
        }

        return Storage::disk('public')->download($path, basename($jobApplication->cv_file_path));
    }

    /**
     * View CV file in browser.
     */
    public function viewCv(Request $request, JobApplication $jobApplication)
    {
        // Simple token check if provided in query (for direct iframe access if needed)
        // Note: Sanctum middleware is better for this, but keeping it flexible
        
        $path = str_replace('/storage/', '', $jobApplication->cv_file_path);
        
        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'CV file not found');
        }

        $file = Storage::disk('public')->get($path);
        $type = Storage::disk('public')->mimeType($path);

        return response($file, 200)->header('Content-Type', $type);
    }

    /**
     * Store a newly created job application in storage.
     */
    public function store(Request $request, Career $career)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
            'telegram_number' => 'nullable|string|max:255',
            'cover_letter' => 'nullable|string',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB max
        ]);

        if ($career->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'This job position is no longer accepting applications'
            ], 422);
        }

        try {
            // Handle CV file upload
            if ($request->hasFile('cv_file')) {
                $file = $request->file('cv_file');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('cvs', $filename, 'public');
                $cv_file_path = '/storage/' . $path;
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'CV file is required'
                ], 422);
            }

            // Create job application
            $jobApplication = JobApplication::create([
                'career_id' => $career->id,
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'phone_number' => $validated['phone_number'],
                'telegram_number' => $validated['telegram_number'] ?? null,
                'cover_letter' => $validated['cover_letter'] ?? null,
                'cv_file_path' => $cv_file_path,
                'status' => 'pending'
            ]);

            // Load career relationship for the notification
            $jobApplication->load('career');

            // --- Notifications ---
            $settings = NotificationSetting::all()->pluck('value', 'key');

            // 1. Telegram Notification
            $botToken = config('services.telegram.bot_token') ?: ($settings['telegram_bot_token'] ?? null);
            $chatId = config('services.telegram.chat_id') ?: ($settings['telegram_chat_id'] ?? null);

            if ($botToken && $chatId) {
                try {
                    $telegramMsg = "📢 <b>New Job Application Received</b>\n\n"
                        . "<b>Position:</b> " . htmlspecialchars($jobApplication->career->title_job) . "\n"
                        . "<b>Applicant:</b> " . htmlspecialchars($jobApplication->full_name) . "\n"
                        . "<b>Email:</b> " . htmlspecialchars($jobApplication->email) . "\n"
                        . "<b>Phone:</b> " . htmlspecialchars($jobApplication->phone_number) . "\n\n"
                        . "📄 <i>CV file is attached below</i>";

                    $filePath = storage_path('app/public/' . str_replace('/storage/', '', $jobApplication->cv_file_path));
                    
                    if (file_exists($filePath)) {
                        $response = Http::withoutVerifying()
                            ->attach('document', file_get_contents($filePath), basename($filePath))
                            ->post("https://api.telegram.org/bot{$botToken}/sendDocument", [
                                'chat_id' => $chatId,
                                'caption' => $telegramMsg,
                                'parse_mode' => 'HTML'
                            ]);
                    } else {
                        // Fallback to text if file is missing
                        $response = Http::withoutVerifying()->post("https://api.telegram.org/bot{$botToken}/sendMessage", [
                            'chat_id' => $chatId,
                            'text' => $telegramMsg . "\n\n(Note: CV file could not be attached directly)",
                            'parse_mode' => 'HTML'
                        ]);
                    }
                } catch (\Exception $tgEx) {
                    \Log::error('Telegram Notification Failed: ' . $tgEx->getMessage());
                }
            }

            return response()->json([
                'success' => true,
                'data' => $jobApplication,
                'message' => 'Your application has been submitted successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit application: ' . $e->getMessage()
            ], 500);
        }
    }
}
