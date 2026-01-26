# Telegram Login Setup Guide

## 📱 How to Enable Telegram Login

### Step 1: Create a Telegram Bot

1. **Open Telegram** and search for [@BotFather](https://t.me/botfather)
2. **Start a chat** with BotFather and send `/newbot`
3. **Choose a name** for your bot (e.g., "Aprati Foods Login")
4. **Choose a username** for your bot (must end with `bot`, e.g., `ApratiFoodsBot`)
5. **Save the token** BotFather gives you (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Configure Bot for Login

1. Send `/setdomain` to BotFather
2. Select your bot
3. Enter your domain: `sdev.apratifoods.asia`
4. Confirm the domain

### Step 3: Update Backend Configuration

Add these to your `.env` file:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_BOT_USERNAME=ApratiFoodsBot
```

Replace with your actual bot token and username from BotFather.

### Step 4: Run Database Migration

```bash
cd aprati_backend
php artisan migrate
```

This adds the necessary Telegram fields to your `users` table.

### Step 5: Test the Login

1. Go to your login page: `https://sdev.apratifoods.asia/auth/login`
2. You should see a "Login with Telegram" button
3. Click it to authenticate with Telegram
4. You'll be automatically logged in!

## 🔧 How It Works

1. **User clicks "Login with Telegram"**
2. **Telegram widget opens** asking for permission
3. **User authorizes** the bot in Telegram
4. **Telegram sends encrypted data** back to your site
5. **Backend verifies** the data authenticity using bot token
6. **User is created/logged in** automatically

## ✅ Security Features

- ✅ **Data verification** using HMAC-SHA256
- ✅ **Time-based validation** (data expires after 24 hours)
- ✅ **Unique Telegram ID** prevents duplicate accounts
- ✅ **Secure token generation** for session management
- ✅ **No password storage** for Telegram users

## 📋 Database Structure

New fields added to `users` table:
- `telegram_id` - Unique Telegram user ID
- `telegram_username` - Telegram @username
- `telegram_first_name` - User's first name
- `telegram_last_name` - User's last name
- `telegram_photo_url` - Profile photo URL
- `auth_provider` - Either 'email' or 'telegram'

## 🎨 Frontend Component

The `TelegramLogin.vue` component is automatically added to your login page:

```vue
<TelegramLogin 
  @login-success="handleSuccess"
  @login-error="handleError"
/>
```

## 🔐 User Experience

### For New Users:
1. Click "Login with Telegram"
2. Authorize in Telegram app
3. Account created automatically
4. Logged in instantly

### For Existing Telegram Users:
1. Click "Login with Telegram"
2. Instantly logged in (no password needed)

### For Email Users:
- Can still use email/password login
- Can optionally link Telegram later

## 🚀 Production Deployment

1. **Ensure HTTPS** is enabled (required for Telegram Login)
2. **Update domain** in BotFather to production domain
3. **Update `.env`** with bot credentials
4. **Upload files** to cPanel
5. **Run migration** via cPanel Terminal or phpMyAdmin

## 🧪 Testing

### Test Endpoints:

**Get Bot Info:**
```bash
curl https://sdev.apratifoods.asia/api/auth/telegram/bot-info
```

**Expected Response:**
```json
{
  "success": true,
  "bot_username": "ApratiFoodsBot",
  "enabled": true
}
```

## ❓ Troubleshooting

### "Telegram login is not configured" message:
- Check if `TELEGRAM_BOT_TOKEN` and `TELEGRAM_BOT_USERNAME` are set in `.env`
- Restart your Laravel server after updating `.env`

### Login button doesn't work:
- Check browser console for errors
- Ensure HTTPS is enabled
- Verify domain is set correctly in BotFather

### "Invalid Telegram authentication data" error:
- Check if bot token is correct
- Ensure data hasn't expired (24-hour limit)
- Verify BotFather domain matches your site

### Users can't authorize:
- Make sure `/setdomain` is configured in BotFather
- Check if your domain has HTTPS
- Try clearing browser cache

## 🔄 Migration for Existing Users

Existing users can continue using email/password login. To link Telegram:

1. Add a "Link Telegram" button in user profile
2. Follow same authorization flow
3. Update user record with Telegram data

## 📝 API Endpoints

### POST `/api/auth/telegram`
Authenticate user with Telegram data.

**Request Body:**
```json
{
  "id": 123456789,
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "photo_url": "https://...",
  "auth_date": 1702512345,
  "hash": "abc123..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged in successfully via Telegram",
  "token": "1|xyz...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@telegram.user",
    "role": "user",
    "telegram_username": "johndoe",
    "telegram_photo_url": "https://...",
    "auth_provider": "telegram"
  }
}
```

### GET `/api/auth/telegram/bot-info`
Get Telegram bot configuration status.

**Response:**
```json
{
  "success": true,
  "bot_username": "ApratiFoodsBot",
  "enabled": true
}
```

## 🎯 Benefits

✅ **One-click login** - No password to remember
✅ **Fast registration** - Instant account creation
✅ **Secure** - Verified by Telegram
✅ **Mobile-friendly** - Perfect for mobile users
✅ **No email verification** - Already verified by Telegram
✅ **Profile photos** - Automatic avatar from Telegram

---

## 📱 Bot Commands (Optional)

You can add commands to your bot in BotFather:

```
/start - Welcome message
/help - Get help
/login - Login to website
```

## 🌐 Multi-language Support (Future)

Telegram provides user language preference. You can use it for automatic language detection:

```php
$user->language_code // e.g., 'en', 'km', 'th'
```

---

**Need help?** Contact the development team or check the [Telegram Bot API documentation](https://core.telegram.org/bots).
