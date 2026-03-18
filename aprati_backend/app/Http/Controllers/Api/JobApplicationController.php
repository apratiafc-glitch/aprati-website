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
            if (
                isset($settings['telegram_bot_token'], $settings['telegram_chat_id']) &&
                $settings['telegram_bot_token'] && $settings['telegram_chat_id']
            ) {
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
                            ->post("https://api.telegram.org/bot{$settings['telegram_bot_token']}/sendDocument", [
                                'chat_id' => $settings['telegram_chat_id'],
                                'caption' => $telegramMsg,
                                'parse_mode' => 'HTML'
                            ]);
                    } else {
                        // Fallback to text if file is missing
                        $response = Http::withoutVerifying()->post("https://api.telegram.org/bot{$settings['telegram_bot_token']}/sendMessage", [
                            'chat_id' => $settings['telegram_chat_id'],
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
