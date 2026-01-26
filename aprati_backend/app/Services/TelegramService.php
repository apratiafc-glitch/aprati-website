<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    protected $botToken;
    protected $apiUrl;

    public function __construct()
    {
        $this->botToken = env('TELEGRAM_BOT_TOKEN');
        $this->apiUrl = "https://api.telegram.org/bot{$this->botToken}";
    }

    /**
     * Send a message to a Telegram chat
     */
    public function sendMessage(string $chatId, string $message, array $options = []): bool
    {
        if (!$this->botToken) {
            Log::error('Telegram bot token not configured');
            return false;
        }

        try {
            $response = Http::post("{$this->apiUrl}/sendMessage", array_merge([
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => 'HTML',
            ], $options));

            if ($response->successful()) {
                Log::info('Telegram message sent successfully', [
                    'chat_id' => $chatId,
                    'message_length' => strlen($message)
                ]);
                return true;
            }

            Log::error('Failed to send Telegram message', [
                'chat_id' => $chatId,
                'status' => $response->status(),
                'response' => $response->json()
            ]);
            return false;

        } catch (\Exception $e) {
            Log::error('Telegram API error', [
                'chat_id' => $chatId,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Send OTP code to admin
     */
    public function sendOTP(string $chatId, string $code, string $adminName): bool
    {
        $message = "🔐 <b>Admin Login Verification</b>\n\n";
        $message .= "Hello <b>{$adminName}</b>,\n\n";
        $message .= "Your login verification code is:\n\n";
        $message .= "📱 <code>{$code}</code>\n\n";
        $message .= "⏰ This code will expire in <b>5 minutes</b>.\n\n";
        $message .= "⚠️ If you didn't request this code, please secure your account immediately.\n\n";
        $message .= "🌐 <i>Aprati Foods Cambodia - Admin Portal</i>";

        return $this->sendMessage($chatId, $message);
    }

    /**
     * Send security alert
     */
    public function sendSecurityAlert(string $chatId, string $message): bool
    {
        $alert = "🚨 <b>Security Alert</b>\n\n";
        $alert .= $message;
        $alert .= "\n\n🌐 <i>Aprati Foods Cambodia</i>";

        return $this->sendMessage($chatId, $alert);
    }

    /**
     * Get chat info to verify chat_id
     */
    public function getChatInfo(string $chatId): ?array
    {
        try {
            $response = Http::get("{$this->apiUrl}/getChat", [
                'chat_id' => $chatId
            ]);

            if ($response->successful()) {
                return $response->json('result');
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Failed to get Telegram chat info', [
                'chat_id' => $chatId,
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    /**
     * Get bot info
     */
    public function getBotInfo(): ?array
    {
        try {
            $response = Http::get("{$this->apiUrl}/getMe");

            if ($response->successful()) {
                return $response->json('result');
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Failed to get bot info', [
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }
}
