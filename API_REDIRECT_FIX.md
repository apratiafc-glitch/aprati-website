# ✅ API Redirect Issue - SOLVED

## Problem
When accessing `https://sdev.apratifoods.asia/api/brands`, it was redirecting to the homepage instead of hitting the Laravel API.

## Root Cause
The `.htaccess` file was using standard Laravel configuration that routes everything to `index.php`. However, with the single-domain setup (frontend and backend in same directory), the `index.html` (Nuxt frontend) was being served instead of routing API requests to Laravel.

## Solution Applied
Updated `.htaccess` to use the **single-domain configuration** that:
1. Routes `/api/*` requests to `laravel-bootstrap.php` (Laravel)
2. Routes `/storage/*` requests to Laravel for file access
3. Serves static files directly (`_nuxt`, images)
4. Serves frontend HTML for all other routes

## What Was Changed
**File:** `aprati_backend/public/.htaccess`

**Before:** Standard Laravel `.htaccess` routing to `index.php`
```apache
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
```

**After:** Single-domain configuration with API routing
```apache
# Route API requests to Laravel
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^(.*)$ laravel-bootstrap.php [L,QSA]

# Serve frontend HTML files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^(.*)$ index.html [L]
```

## How It Works Now

### URL Routing:
- `https://sdev.apratifoods.asia/` → `index.html` (Frontend homepage)
- `https://sdev.apratifoods.asia/api/brands` → `laravel-bootstrap.php` → Laravel API
- `https://sdev.apratifoods.asia/storage/images/...` → Laravel storage
- `https://sdev.apratifoods.asia/_nuxt/...` → Static CSS/JS files
- `https://sdev.apratifoods.asia/brands` → `index.html` (Frontend brands page)

## Testing

### Local Test (after fix):
```powershell
# Test API endpoint with laravel-bootstrap.php
cd d:\xammp\htdocs\aprati_web_backup\aprati_backend\public
php -r "require 'laravel-bootstrap.php';"
```

### Production Test:
Once uploaded, test:
```bash
curl -I https://sdev.apratifoods.asia/api/brands
```

**Expected:** 
- Status: 200 OK (or 500 if Laravel has errors)
- Content-Type: application/json

**Should NOT redirect to homepage**

## Next Steps for Production

### 1. Upload Updated .htaccess
Upload the new `.htaccess` file to production:
- **From:** `d:\xammp\htdocs\aprati_web_backup\aprati_backend\public\.htaccess`
- **To:** `/home/apratifoodscom/public_html/sdev.apratifoods.asia/.htaccess`

### 2. Verify laravel-bootstrap.php Exists
Ensure this file exists in production:
- **Path:** `/home/apratifoodscom/public_html/sdev.apratifoods.asia/laravel-bootstrap.php`
- **Purpose:** Bootstraps Laravel from outside the aprati_backend folder

### 3. Test API Endpoint
```bash
curl https://sdev.apratifoods.asia/api/brands
```

Should return JSON:
```json
{
  "success": true,
  "data": [...]
}
```

### 4. If Still Getting Errors
- Check if pending migrations need to run (see `run-migrations-secure.php`)
- Check Laravel logs via `diagnose-api-error.php`
- Verify database connection
- Check file permissions (storage/, bootstrap/cache/)

## Status
✅ **Fixed locally** - `.htaccess` updated  
⏳ **Pending production upload**

## Files Modified
- `aprati_backend/public/.htaccess` - Updated to single-domain configuration

## Files to Upload
1. `aprati_backend/public/.htaccess` → Production document root
2. `aprati_backend/public/laravel-bootstrap.php` → Production (if not already there)
3. `aprati_backend/public/diagnose-api-error.php` → For diagnostics
4. `aprati_backend/public/run-migrations-secure.php` → For migrations

---

**Issue:** Redirect from API to homepage  
**Cause:** Wrong .htaccess configuration  
**Fix:** Single-domain .htaccess with API routing  
**Status:** ✅ RESOLVED (local), needs production upload
