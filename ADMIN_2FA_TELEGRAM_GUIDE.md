# Admin Two-Factor Authentication (2FA) with Telegram OTP

## 🔐 Overview
Admin accounts are now protected with Two-Factor Authentication (2FA) using Telegram OTP codes. When an admin logs in, they receive a 6-digit verification code on Telegram.

## ✨ Features Implemented

### Backend
1. **Database Fields** - OTP storage and expiration tracking
2. **Telegram Service** - Send OTP messages via Telegram Bot API
3. **Admin Login Flow** - Generate and verify OTP codes
4. **Security Features**:
   - OTP expires in 5 minutes
   - One-time use codes
   - Hashed OTP storage
   - Login attempt logging

### Frontend
5. **Admin Login Page** - Two-step authentication flow
6. **OTP Input** - User-friendly 6-digit code entry
7. **Timer Display** - Shows countdown for code expiration

## 🚀 Setup Instructions

### Step 1: Run Database Migration

```bash
cd aprati_backend
php artisan migrate
```

This adds these fields to the `users` table:
- `telegram_chat_id` - Admin's Telegram chat ID
- `otp_code` - Hashed OTP code
- `otp_expires_at` - Expiration timestamp
- `two_factor_enabled` - 2FA status flag

### Step 2: Get Admin's Telegram Chat ID

You need each admin's Telegram chat ID. Here are 3 ways to get it:

#### Option A: Using @userinfobot (Easiest)
1. Open Telegram and search for [@userinfobot](https://t.me/userinfobot)
2. Start a chat with the bot
3. The bot will reply with your chat ID
4. Save this number (e.g., `123456789`)

#### Option B: Using Your Bot
1. Have the admin message your bot: `/start`
2. Check bot updates:
   ```bash
   curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
3. Find the `chat.id` in the response

#### Option C: Using a Helper Script
Create `get-chat-id.php` in your backend:

```php
<?php
require __DIR__.'/vendor/autoload.php';

$botToken = 'YOUR_BOT_TOKEN';
$url = "https://api.telegram.org/bot{$botToken}/getUpdates";

$response = file_get_contents($url);
$data = json_decode($response, true);

if (isset($data['result']) && count($data['result']) > 0) {
    foreach ($data['result'] as $update) {
        if (isset($update['message']['chat'])) {
            $chat = $update['message']['chat'];
            echo "User: {$chat['first_name']} {$chat['last_name']}\n";
            echo "Username: @{$chat['username']}\n";
            echo "Chat ID: {$chat['id']}\n\n";
        }
    }
} else {
    echo "No messages found. Please send a message to your bot first.\n";
}
```

Run: `php get-chat-id.php`

### Step 3: Update Admin Record

Update the admin user with their Telegram chat ID:

```sql
UPDATE users 
SET telegram_chat_id = '123456789' 
WHERE email = 'admin@aprati.com' AND role = 'admin';
```

Or using Laravel Tinker:
```bash
php artisan tinker
```
```php
$admin = User::where('email', 'admin@aprati.com')->first();
$admin->telegram_chat_id = '123456789';
$admin->save();
```

### Step 4: Test the Flow

1. Go to: `https://sdev.apratifoods.asia/admin/login`
2. Enter admin email and password
3. Click "Sign in"
4. Check Telegram for the OTP code
5. Enter the 6-digit code
6. You're logged in!

## 🔧 Configuration

### Environment Variables (.env)

```env
# Your Telegram bot token (required)
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# Your bot username (optional, for display)
TELEGRAM_BOT_USERNAME=ApratiFoodsBot
```

### Enable/Disable 2FA Per Admin

2FA is automatically enabled when an admin has a `telegram_chat_id`. To disable:

```sql
UPDATE users SET telegram_chat_id = NULL WHERE email = 'admin@aprati.com';
```

## 📱 User Experience

### Admin Login Flow

#### Without 2FA (No Telegram configured):
1. Enter email and password → Login immediately

#### With 2FA (Telegram configured):
1. Enter email and password
2. Receive OTP on Telegram
3. Enter 6-digit code
4. Login successful

### OTP Message Format

```
🔐 Admin Login Verification

Hello Admin Name,

Your login verification code is:

📱 123456

⏰ This code will expire in 5 minutes.

⚠️ If you didn't request this code, please secure your account immediately.

🌐 Aprati Foods Cambodia - Admin Portal
```

## 🔒 Security Features

### OTP Security
- ✅ **Hashed Storage** - OTP codes are hashed before storing
- ✅ **Time-Limited** - Codes expire after 5 minutes
- ✅ **Single Use** - Code is deleted after verification
- ✅ **Rate Limited** - API endpoints have rate limiting

### Login Security
- ✅ **Password Check First** - OTP only sent after valid credentials
- ✅ **Role Verification** - Only admins can use admin login
- ✅ **Activity Logging** - All admin logins are logged
- ✅ **Failed Attempt Tracking** - Failed OTP attempts logged

### Telegram Security
- ✅ **Official API** - Uses official Telegram Bot API
- ✅ **HTTPS Only** - All API calls over HTTPS
- ✅ **Chat ID Verification** - Only sends to configured chat IDs
- ✅ **Error Handling** - Graceful fallback if Telegram fails

## 🧪 Testing

### Test OTP Generation
```bash
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aprati.com","password":"admin123"}'
```

Expected Response:
```json
{
  "success": true,
  "message": "OTP sent to your Telegram",
  "requires_otp": true,
  "user_id": 1,
  "telegram_sent": true
}
```

### Test OTP Verification
```bash
curl -X POST http://localhost:8000/api/admin/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"user_id":1,"otp_code":"123456"}'
```

Expected Response:
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "user": {...},
    "token": "1|xxx...",
    "token_type": "Bearer"
  }
}
```

## 🐛 Troubleshooting

### "OTP sent but not received on Telegram"

**Check:**
1. Bot token is correct in `.env`
2. Admin has the correct `telegram_chat_id`
3. Admin has started a chat with the bot (send `/start`)
4. Bot is not blocked by the admin

**Debug:**
```php
php artisan tinker
```
```php
$service = new \App\Services\TelegramService();
$service->sendMessage('YOUR_CHAT_ID', 'Test message');
```

### "Failed to send OTP"

**Check Laravel logs:**
```bash
tail -f storage/logs/laravel.log
```

**Common causes:**
- Invalid bot token
- Invalid chat_id
- Network/firewall issues
- Bot blocked by user

### "OTP expired" error

The OTP code expires after 5 minutes. Request a new code by logging in again.

### "No OTP request found"

This means the OTP was already used or expired. Start the login process again.

## 📊 API Endpoints

### POST `/api/admin/login`
Initiate admin login and send OTP if 2FA enabled.

**Request:**
```json
{
  "email": "admin@aprati.com",
  "password": "admin123"
}
```

**Response (with 2FA):**
```json
{
  "success": true,
  "message": "OTP sent to your Telegram",
  "requires_otp": true,
  "user_id": 1,
  "telegram_sent": true
}
```

**Response (without 2FA):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "requires_otp": false,
  "data": {
    "user": {...},
    "token": "1|xxx...",
    "token_type": "Bearer"
  }
}
```

### POST `/api/admin/verify-otp`
Verify OTP code and complete admin login.

**Request:**
```json
{
  "user_id": 1,
  "otp_code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "user": {...},
    "token": "1|xxx...",
    "token_type": "Bearer"
  }
}
```

## 🎯 Best Practices

### For Admins:
1. ✅ Keep your Telegram account secure
2. ✅ Don't share OTP codes with anyone
3. ✅ Report suspicious login attempts
4. ✅ Use a strong password + 2FA

### For Developers:
1. ✅ Keep `TELEGRAM_BOT_TOKEN` secret
2. ✅ Never commit `.env` to version control
3. ✅ Monitor failed OTP attempts
4. ✅ Set up alerts for suspicious activity
5. ✅ Regularly rotate bot tokens

### For Production:
1. ✅ Use HTTPS only
2. ✅ Enable rate limiting
3. ✅ Set up log monitoring
4. ✅ Backup admin chat IDs
5. ✅ Document recovery procedures

## 🔄 Backup Access

### If Telegram is unavailable:

**Option 1: Temporarily disable 2FA for an admin**
```sql
UPDATE users SET telegram_chat_id = NULL WHERE id = 1;
```

**Option 2: Create emergency admin account**
```bash
php artisan tinker
```
```php
$admin = User::create([
    'name' => 'Emergency Admin',
    'email' => 'emergency@aprati.com',
    'password' => Hash::make('secure-password-here'),
    'role' => 'admin',
    'telegram_chat_id' => null
]);
```

## 📈 Statistics & Monitoring

### Track 2FA Usage
```sql
SELECT 
    COUNT(*) as total_admins,
    SUM(CASE WHEN telegram_chat_id IS NOT NULL THEN 1 ELSE 0 END) as with_2fa,
    SUM(CASE WHEN telegram_chat_id IS NULL THEN 1 ELSE 0 END) as without_2fa
FROM users 
WHERE role = 'admin';
```

### Recent OTP Requests
Check Laravel logs for:
- `Admin logged in with 2FA`
- `Failed to send OTP to admin`
- `Invalid OTP attempt`

## 🆘 Emergency Procedures

### If Bot Token Compromised:
1. Create new bot with @BotFather
2. Update `TELEGRAM_BOT_TOKEN` in `.env`
3. Clear config cache: `php artisan config:clear`
4. Test with one admin first

### If Admin Loses Telegram Access:
1. Verify admin identity (in person/video call)
2. Temporarily disable 2FA for that admin
3. Admin logs in and updates Telegram
4. Re-enable 2FA

---

## 📞 Support

For issues or questions:
- Check logs: `storage/logs/laravel.log`
- Review this documentation
- Contact development team

**Security Notice:** Never share OTP codes, bot tokens, or chat IDs with unauthorized persons!
