# 🔍 Frontend API Connection Status Report

## 📊 Current Status

### ✅ Frontend Configuration: **CORRECT**
```dotenv
API_BASE_URL=https://sdev.apratifoods.asia/api
STORAGE_BASE_URL=https://sdev.apratifoods.asia
```

**Files checked:**
- ✅ `.env` - Configured correctly
- ✅ `nuxt.config.ts` - Runtime config set properly
- ✅ `useApi.js` - Hard-coded API base matches
- ✅ `useAuth.js` - Authentication flow configured

### ❌ Backend API: **500 ERROR**

**Test Results:**
- ✅ Base URL (`https://sdev.apratifoods.asia`) → **200 OK**
- ❌ API Endpoint (`https://sdev.apratifoods.asia/api/brands`) → **500 Internal Server Error**

**Error Response:**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html><head>
<title>500 Internal Server Error</title>
</head><body>
<h1>Internal Server Error</h1>
<p>The server encountered an internal error or misconfiguration...</p>
</body></html>
```

---

## 🎯 Problem Identified

**The frontend IS connecting to the correct API URL**, but the backend Laravel application is returning 500 errors.

### Root Causes (Most Likely):

1. **Pending Database Migrations** (14 migrations not run)
2. **Laravel Environment Issues** (APP_DEBUG=false hides errors)
3. **File Permissions** (storage/ or bootstrap/cache/ not writable)
4. **Database Connection Failure** on production server

---

## 🛠️ Solution Steps

### IMMEDIATE ACTION: Diagnose the Backend

I've created 2 diagnostic tools for you to upload to production:

#### **Tool 1: API Error Diagnostics** 
📁 File: `aprati_backend/public/diagnose-api-error.php`
🔗 Access: `https://sdev.apratifoods.asia/diagnose-api-error.php?password=aprati2025secure`

**What it does:**
- ✅ Locates Laravel installation
- ✅ Checks .env configuration
- ✅ Tests database connection
- ✅ Simulates API request to /api/brands
- ✅ Shows Laravel error logs
- ✅ Checks file permissions
- ✅ Provides detailed error output

#### **Tool 2: Migration Runner**
📁 File: `aprati_backend/public/run-migrations-secure.php`
🔗 Access: `https://sdev.apratifoods.asia/run-migrations-secure.php?password=aprati2025secure`

**What it does:**
- ✅ Shows current migration status
- ✅ Runs pending migrations
- ✅ Displays migration results
- ✅ Checks database connection
- ✅ Verifies .env configuration

---

## 📋 Step-by-Step Fix Guide

### Step 1: Upload Diagnostic Tools

**Upload these files to your production server:**

1. **Via cPanel File Manager:**
   - Navigate to: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`
   - Upload `diagnose-api-error.php`
   - Upload `run-migrations-secure.php`

2. **Or via FTP/SFTP:**
   - Connect to your server
   - Upload to the document root

### Step 2: Run API Diagnostics

1. **Open in browser:**
   ```
   https://sdev.apratifoods.asia/diagnose-api-error.php?password=aprati2025secure
   ```

2. **Check the results:**
   - ✅ Is Laravel found?
   - ✅ Is .env configured?
   - ✅ Does database connect?
   - ❌ What error does /api/brands return?

3. **Note the error** shown in Step 5 (API Endpoint Test)

### Step 3: Run Pending Migrations

1. **Open in browser:**
   ```
   https://sdev.apratifoods.asia/run-migrations-secure.php?password=aprati2025secure
   ```

2. **Review pending migrations** (should show 14 pending)

3. **Click "Run Pending Migrations"** button

4. **Verify success** - all migrations should show "Ran"

### Step 4: Test API Again

1. **Refresh the diagnostic tool:**
   ```
   https://sdev.apratifoods.asia/diagnose-api-error.php?password=aprati2025secure
   ```

2. **Check Step 5** - API should now return 200 OK with JSON data:
   ```json
   {
     "success": true,
     "data": [...]
   }
   ```

### Step 5: Test Frontend Connection

1. **Open your frontend:**
   ```
   https://sdev.apratifoods.asia/
   ```

2. **Check browser console** (F12 → Console)
   - Should see: `📡 API Request: { endpoint: '/brands', ... }`
   - No 500 errors

3. **Navigate to brands page:**
   ```
   https://sdev.apratifoods.asia/brands
   ```

4. **Verify** brands are loading from API

---

## 🔧 Alternative Fixes (If Migrations Don't Help)

### Fix 1: Enable Debug Mode Temporarily

**Edit .env on production:**
```env
APP_DEBUG=true
LOG_LEVEL=debug
```

Then access `https://sdev.apratifoods.asia/api/brands` to see the actual error.

**⚠️ IMPORTANT:** Set back to `APP_DEBUG=false` after fixing!

### Fix 2: Check Database Connection

**Via cPanel → PHP MyAdmin:**
1. Check if database `apratifoodscom_webtesing` exists
2. Verify user `apratifoodscom_dbusr` has access
3. Test connection with the password

**Via SSH/Terminal:**
```bash
cd /home/apratifoodscom/public_html/aprati_backend
php artisan db:show
```

### Fix 3: Fix File Permissions

**Via cPanel File Manager:**
1. Navigate to `/aprati_backend/storage/`
2. Right-click → Change Permissions
3. Set to `755` and check "Recurse into subdirectories"
4. Repeat for `/aprati_backend/bootstrap/cache/`

**Via SSH/Terminal:**
```bash
cd /home/apratifoodscom/public_html/aprati_backend
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### Fix 4: Clear Laravel Caches

**Via SSH/Terminal:**
```bash
cd /home/apratifoodscom/public_html/aprati_backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

**Via Web (create clear-cache.php):**
```php
<?php
chdir(__DIR__ . '/../aprati_backend');
echo shell_exec('php artisan config:clear');
echo shell_exec('php artisan cache:clear');
echo shell_exec('php artisan route:clear');
echo "Caches cleared!";
```

---

## ✅ Expected Results After Fix

### API Endpoint Test:
```bash
curl https://sdev.apratifoods.asia/api/brands
```

**Should return:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Aprati",
      "slug": "aprati",
      "logo_url": "...",
      "cover_image": "...",
      "description": "...",
      "is_active": true
    },
    {
      "id": 2,
      "name": "Frutati",
      ...
    },
    {
      "id": 3,
      "name": "Mocati",
      ...
    }
  ],
  "message": "Brands retrieved successfully"
}
```

### Frontend Console:
```
📡 API Request: { endpoint: '/brands', method: 'GET', authenticated: false }
✅ Brands loaded successfully
```

### Browser Network Tab:
```
GET https://sdev.apratifoods.asia/api/brands
Status: 200 OK
Response: application/json
```

---

## 📝 Summary

### What's Working:
- ✅ Frontend configuration is correct
- ✅ API URL is properly set
- ✅ Frontend code is ready to connect
- ✅ Base URL responds correctly

### What's Not Working:
- ❌ Backend API returns 500 errors
- ❌ Laravel application has issues
- ❌ Likely due to pending migrations or configuration

### Next Steps:
1. Upload the diagnostic tools to production
2. Run `diagnose-api-error.php` to see the exact error
3. Run `run-migrations-secure.php` to execute pending migrations
4. Test API endpoint again
5. Verify frontend loads data correctly

---

## 🔐 Security Notes

**Password for tools:** `aprati2025secure`

**After fixing, either:**
1. Delete the diagnostic files from production, OR
2. Rename them to something obscure, OR
3. Add IP restriction in .htaccess

---

## 📞 Need Help?

If the issue persists after running migrations:

1. Check the Laravel logs via the diagnostic tool
2. Look for specific error messages
3. Verify database credentials in .env
4. Ensure all required tables exist
5. Check PHP version compatibility (Laravel 12 requires PHP 8.2+)

---

**Created:** December 15, 2025  
**Status:** Ready for production deployment  
**Action Required:** Upload diagnostic tools and run migrations
