<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => User::ROLE_USER, // Default role
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        if (!$user->is_active) {
            return response()->json([
                'status' => 'error',
                'message' => 'Account is deactivated',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'user' => $user->load('brand'),
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ]);
    }

    /**
     * Admin login (only for admin users)
     */
    public function adminLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        if (!$user->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account is deactivated',
            ], 403);
        }

        // Check if user is admin
        if ($user->role !== User::ROLE_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Admin privileges required.',
            ], 403);
        }

        // Check if admin has Telegram chat_id configured for 2FA
        if ($user->telegram_chat_id) {
            // Generate OTP code
            $otpCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            
            // Save OTP to database (expires in 5 minutes)
            $user->otp_code = Hash::make($otpCode);
            $user->otp_expires_at = now()->addMinutes(5);
            $user->save();

            // Send OTP to Telegram
            $telegramService = app(\App\Services\TelegramService::class);
            $sent = $telegramService->sendOTP($user->telegram_chat_id, $otpCode, $user->name);

            if (!$sent) {
                \Log::error('Failed to send OTP to admin', [
                    'user_id' => $user->id,
                    'telegram_chat_id' => $user->telegram_chat_id
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'OTP sent to your Telegram',
                'requires_otp' => true,
                'user_id' => $user->id,
                'telegram_sent' => $sent,
            ]);
        }

        // No 2FA configured, login directly (backward compatibility)
        $token = $user->createToken('admin_auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Admin login successful',
            'requires_otp' => false,
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ]);
    }

    /**
     * Verify OTP and complete admin login
     */
    public function verifyAdminOTP(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required', 'exists:users,id'],
            'otp_code' => ['required', 'string', 'size:6'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::findOrFail($request->user_id);

        // Check if user is admin
        if ($user->role !== User::ROLE_ADMIN) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied',
            ], 403);
        }

        // Check if OTP exists and not expired
        if (!$user->otp_code || !$user->otp_expires_at) {
            return response()->json([
                'success' => false,
                'message' => 'No OTP request found. Please login again.',
            ], 400);
        }

        if (now()->isAfter($user->otp_expires_at)) {
            $user->otp_code = null;
            $user->otp_expires_at = null;
            $user->save();

            return response()->json([
                'success' => false,
                'message' => 'OTP expired. Please login again.',
            ], 400);
        }

        // Verify OTP
        if (!Hash::check($request->otp_code, $user->otp_code)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OTP code',
            ], 401);
        }

        // Clear OTP
        $user->otp_code = null;
        $user->otp_expires_at = null;
        $user->save();

        // Generate token
        $token = $user->createToken('admin_auth_token')->plainTextToken;

        // Log successful admin login
        \Log::info('Admin logged in with 2FA', [
            'user_id' => $user->id,
            'email' => $user->email,
            'ip' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Admin login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully',
        ]);
    }

    /**
     * Get authenticated user
     */
    public function me(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $request->user()->load('brand'),
            ],
        ]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user->update($request->only(['name', 'email', 'phone', 'address']));

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => [
                'user' => $user->fresh(),
            ],
        ]);
    }

    /**
     * Change password
     */
    public function changePassword(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'current_password' => ['required'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Current password is incorrect',
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Password changed successfully',
        ]);
    }
}
