<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Models\AdminOtp;
use Carbon\Carbon;

class AuthController extends Controller
{
    /**
     * Redirect the user to Google's OAuth page.
     */
    public function googleRedirect()
    {
        $redirectUrl = env('GOOGLE_REDIRECT_URI', 'https://sdev.apratifoods.asia/api/auth/google/callback');
        
        return Socialite::driver('google')
            ->stateless()
            ->redirectUrl($redirectUrl)
            ->with(['prompt' => 'select_account'])
            ->redirect();
    }

    /**
     * Handle the callback from Google after authentication.
     * Verifies email is an admin, generates OTP, sends it via email.
     */
    public function googleCallback(Request $request)
    {
        $frontendUrl = env('FRONTEND_URL', 'https://sdev.apratifoods.asia');

        try {
            $redirectUrl = env('GOOGLE_REDIRECT_URI', 'https://sdev.apratifoods.asia/api/auth/google/callback');
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->redirectUrl($redirectUrl)
                ->user();
        } catch (\Exception $e) {
            Log::error('Google OAuth error: ' . $e->getMessage());
            return redirect($frontendUrl . '/admin-access?error=google_auth_failed');
        }

        // Find admin user by email
        $user = User::where('email', $googleUser->getEmail())
            ->where('role', 'admin')
            ->first();

        if (!$user) {
            return redirect($frontendUrl . '/admin-access?error=unauthorized');
        }

        // Update Google info if changed
        $user->update([
            'google_id' => $googleUser->getId(),
            'avatar' => $googleUser->getAvatar(),
        ]);

        // Delete any old unused OTPs for this user
        AdminOtp::where('user_id', $user->id)->delete();

        // Generate a 6-digit OTP
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Store OTP (expires in 10 minutes)
        AdminOtp::create([
            'user_id' => $user->id,
            'otp_code' => $otp,
            'expires_at' => Carbon::now()->addMinutes(2),
            'used' => false,
        ]);

        // Send OTP via email (or log it during local development)
        $this->sendOtpEmail($user, $otp);

        // Redirect to frontend OTP form with user_id
        return redirect($frontendUrl . '/admin-access?step=otp&user_id=' . $user->id);
    }

    /**
     * Verify the OTP code and return a Sanctum token on success.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'otp_code' => 'required|string|size:6',
        ]);

        $user = User::find($request->user_id);

        if (!$user || $user->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
            ], 403);
        }

        $otpRecord = AdminOtp::where('user_id', $user->id)
            ->where('otp_code', $request->otp_code)
            ->where('used', false)
            ->latest()
            ->first();

        if (!$otpRecord) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification code.',
            ], 422);
        }

        if ($otpRecord->isExpired()) {
            $otpRecord->delete();
            return response()->json([
                'success' => false,
                'message' => 'Verification code has expired. Please login again.',
            ], 422);
        }

        // Mark OTP as used
        $otpRecord->update(['used' => true]);

        // Revoke any existing tokens and issue a fresh one
        $user->tokens()->delete();
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'avatar' => $user->avatar,
                ],
            ],
        ]);
    }

    /**
     * Validate an existing Sanctum token.
     */
    public function validateToken(Request $request)
    {
        if (Auth::guard('sanctum')->check()) {
            $user = Auth::guard('sanctum')->user();

            if ($user->role === 'admin') {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'valid' => true,
                        'user' => $user,
                    ],
                ]);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid or expired token',
        ], 401);
    }
    
    /**
     * Log the user out (Revoke the token).
     */
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out.',
        ]);
    }

    /**
     * Send OTP to admin email.
     * In local/log mode, the OTP is written to storage/logs/laravel.log.
     */
    private function sendOtpEmail(User $user, string $otp): void
    {
        // Always log for debugging
        Log::info("Admin OTP for {$user->email}: {$otp}");

        try {
            Mail::send([], [], function ($message) use ($user, $otp) {
                $message->to($user->email, $user->name)
                    ->subject('Aprati Admin — Your Login Verification Code')
                    ->html(
                        '<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">'
                        . '<h2 style="color:#4f46e5;">Aprati Admin Login</h2>'
                        . '<p>Hello ' . htmlspecialchars($user->name) . ',</p>'
                        . '<p>Your one-time verification code is:</p>'
                        . '<div style="font-size:40px;font-weight:bold;letter-spacing:12px;color:#4f46e5;'
                        . 'background:#f0f0ff;padding:20px;text-align:center;border-radius:8px;margin:20px 0;">'
                        . $otp
                        . '</div>'
                        . '<p style="color:#666;">This code expires in <strong>10 minutes</strong>.</p>'
                        . '<p style="color:#999;font-size:12px;">If you did not request this code, ignore this email.</p>'
                        . '</div>'
                    );
            });
        } catch (\Exception $e) {
            Log::error("Failed to send OTP email: " . $e->getMessage());
            // OTP is still valid — user can check logs during local dev
        }
    }
}
