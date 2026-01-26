# Production .env Configuration Fix

## Problem Identified
All API endpoints returning 500 errors because:
1. **APP_KEY is empty** - Laravel requires APP_KEY for encryption, sessions, cookies
2. **Database configured for local MySQL** instead of production database

## Solution Steps

### Step 1: Generate APP_KEY
Run this command in the Laravel root directory:
```bash
php artisan key:generate
```

This will automatically update the `.env` file with a new APP_KEY.

### Step 2: Update Database Configuration
Update these lines in `aprati_backend/.env`:

```env
# Change from:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

# To your production database:
DB_CONNECTION=sqlsrv
DB_HOST=your_database_host
DB_PORT=1433
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### Step 3: Clear Laravel Caches
After updating .env, run:
```bash
cd /home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### Step 4: Verify
Access the config-test.html page again:
https://sdev.apratifoods.asia/config-test.html

All tests should now return 200 OK instead of 500 errors.

## Why This Fixes the Issue

**APP_KEY:**
- Laravel uses APP_KEY for:
  - Encrypting cookies and session data
  - Generating secure hashes
  - CSRF token generation
  - Sanctum token encryption
- Without APP_KEY, Laravel throws exceptions on any request using these features

**Database:**
- Your API endpoints query the database
- If database connection fails, all endpoints return 500 errors
- Need to point to production SQL Server, not local MySQL

## Quick Check Commands

Test database connection:
```bash
php artisan tinker
>>> DB::connection()->getPdo();
```

If you see an error, database config is wrong.

Check if APP_KEY exists:
```bash
php artisan tinker
>>> config('app.key');
```

Should return a base64 string, not empty.

## Frontend is Fine
The frontend configuration and code are CORRECT. The URLs being called are correct:
- ✅ `https://sdev.apratifoods.asia/api/hero-content`
- ✅ `https://sdev.apratifoods.asia/api/brands`
- etc.

The problem is the Laravel backend cannot process these requests due to missing APP_KEY and wrong database config.
