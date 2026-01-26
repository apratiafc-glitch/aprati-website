<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TelegramAuthController extends Controller
{
    /**
     * Telegram Bot Token - Set in .env as TELEGRAM_BOT_TOKEN
     */
    private $botToken;

    public function __construct()
    {
        $this->botToken = env('TELEGRAM_BOT_TOKEN');
    }

    /**
     * Authenticate user with Telegram
     */
    public function login(Request $request)
    {
        $request->validate([
            'id' => 'required|numeric',
            'first_name' => 'required|string',
            'last_name' => 'nullable|string',
            'username' => 'nullable|string',
            'photo_url' => 'nullable|string|url',
            'auth_date' => 'required|numeric',
            'hash' => 'required|string',
        ]);

        // Verify Telegram data authenticity
        if (!$this->verifyTelegramAuth($request->all())) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Telegram authentication data'
            ], 401);
        }

        // Find or create user
        $user = User::where('telegram_id', $request->id)->first();

        if (!$user) {
            // Create new user from Telegram data
            $user = User::create([
                'name' => trim($request->first_name . ' ' . ($request->last_name ?? '')),
                'email' => $request->username ? $request->username . '@telegram.user' : 'telegram_' . $request->id . '@telegram.user',
                'telegram_id' => $request->id,
                'telegram_username' => $request->username,
                'telegram_first_name' => $request->first_name,
                'telegram_last_name' => $request->last_name,
                'telegram_photo_url' => $request->photo_url,
                'auth_provider' => 'telegram',
                'password' => Hash::make(Str::random(32)), // Random password for Telegram users
                'role' => 'user', // Default role
            ]);
        } else {
            // Update existing user's Telegram info
            $user->update([
                'telegram_username' => $request->username,
                'telegram_first_name' => $request->first_name,
                'telegram_last_name' => $request->last_name,
                'telegram_photo_url' => $request->photo_url,
            ]);
        }

        // Generate authentication token
        $token = $user->createToken('telegram_auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Logged in successfully via Telegram',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'telegram_username' => $user->telegram_username,
                'telegram_photo_url' => $user->telegram_photo_url,
                'auth_provider' => $user->auth_provider,
            ]
        ]);
    }

    /**
     * Verify Telegram authentication data
     * Based on: https://core.telegram.org/widgets/login#checking-authorization
     */
    private function verifyTelegramAuth(array $authData): bool
    {
        if (!$this->botToken) {
            \Log::error('TELEGRAM_BOT_TOKEN not set in environment');
            return false;
        }

        $checkHash = $authData['hash'];
        unset($authData['hash']);

        $dataCheckArr = [];
        foreach ($authData as $key => $value) {
            if (!empty($value)) {
                $dataCheckArr[] = $key . '=' . $value;
            }
        }
        sort($dataCheckArr);

        $dataCheckString = implode("\n", $dataCheckArr);
        $secretKey = hash('sha256', $this->botToken, true);
        $hash = hash_hmac('sha256', $dataCheckString, $secretKey);

        // Check if auth_date is not too old (within 24 hours)
        if (time() - $authData['auth_date'] > 86400) {
            \Log::warning('Telegram auth data is too old', ['auth_date' => $authData['auth_date']]);
            return false;
        }

        return hash_equals($hash, $checkHash);
    }

    /**
     * Get bot info for frontend
     */
    public function getBotInfo()
    {
        return response()->json([
            'success' => true,
            'bot_username' => env('TELEGRAM_BOT_USERNAME', ''),
            'enabled' => !empty(env('TELEGRAM_BOT_TOKEN')) && !empty(env('TELEGRAM_BOT_USERNAME')),
        ]);
    }
}
