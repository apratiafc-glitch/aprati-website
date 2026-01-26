# ✅ cPanel Upload Checklist - Fix API 404 & CORS Errors

## Problem
All API endpoints return 404 and CORS errors because Laravel isn't running.

## Root Cause
Missing critical files on production server:
- ❌ `index.php` - Laravel entry point
- ❌ `vendor/` - Composer dependencies (you said it exists in backend somewhere)

---

## Step 1: Upload index.php ⚡ CRITICAL
**Location:** `/home/apratifoodscom/public_html/sdev.apratifoods.asia/index.php`

### Via cPanel File Manager:
1. Open cPanel File Manager
2. Navigate to: `/public_html/sdev.apratifoods.asia/`
3. Click **Upload** button
4. Select: `d:\xammp\htdocs\aprati_web_backup\aprati_backend\public\index.php`
5. Wait for upload to complete
6. Verify file exists (should be ~4-5 KB)

**File to upload:** `aprati_backend\public\index.php`

---

## Step 2: Find Vendor Folder Location 🔍

### Upload explore-server-files.php:
1. Open cPanel File Manager
2. Navigate to: `/public_html/sdev.apratifoods.asia/`
3. Click **Upload**
4. Select: `d:\xammp\htdocs\aprati_web_backup\aprati_backend\public\explore-server-files.php`
5. Visit: `https://sdev.apratifoods.asia/explore-server-files.php`

This will show you exactly where your vendor folder is located.

**Possible locations it will check:**
- `/home/apratifoodscom/public_html/sdev.apratifoods.asia/../vendor`
- `/home/apratifoodscom/backend/vendor`
- `/home/apratifoodscom/aprati_backend/vendor`

---

## Step 3: Verify .htaccess Exists

**Location:** `/home/apratifoodscom/public_html/sdev.apratifoods.asia/.htaccess`

Should contain:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

Or Laravel's standard rewrite rules.

---

## Step 4: Run Cache Commands (After index.php uploaded)

### Via Browser:
1. Visit: `https://sdev.apratifoods.asia/run-artisan-via-browser.php?key=aprati2025`
2. Run these commands in order:
   - `cache:clear`
   - `route:cache`
   - `config:cache`
   - `view:cache`

---

## Step 5: Test API Endpoint

Visit directly in browser:
```
https://sdev.apratifoods.asia/api/brands
```

**Expected result:** JSON response with brands data

**If still 404:** vendor folder path is wrong in index.php (we'll fix after you find vendor location)

---

## Step 6: Fix CORS (If needed)

Once API responds, if CORS errors persist, check:

**File:** `aprati_backend/config/cors.php`

Should have:
```php
'allowed_origins' => ['*'],  // Or ['http://localhost:3001', 'https://sdev.apratifoods.asia']
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

---

## Quick Status Check

After uploading index.php and finding vendor, test:

1. **Homepage:** `https://sdev.apratifoods.asia/` (should load)
2. **API Test:** `https://sdev.apratifoods.asia/api/brands` (should return JSON)
3. **Server Check:** `https://sdev.apratifoods.asia/server-config-check.php` (should show ✅ for index.php and vendor)

---

## Files on Your Local Machine to Upload

1. **index.php** (required): `aprati_backend\public\index.php`
2. **explore-server-files.php** (diagnostic): `aprati_backend\public\explore-server-files.php`
3. **run-artisan-via-browser.php** (already uploaded): Should already be there
4. **check-errors.php** (already uploaded): Should already be there

---

## Expected Timeline

- Upload index.php: 1 minute
- Find vendor location: 2 minutes
- Run cache commands: 2 minutes
- **Total: ~5 minutes to fix**

---

## Troubleshooting

### If API still returns 404 after index.php upload:
1. Check explore-server-files.php output for vendor location
2. Tell me where vendor is found
3. I'll update index.php paths to point to correct vendor location

### If you see "500 Internal Server Error":
- Check PHP error logs in cPanel
- Visit `https://sdev.apratifoods.asia/check-errors.php` to see detailed errors

### If CORS errors persist after API works:
- Visit run-artisan-via-browser.php and run `config:clear`
- Check that cors.php has `allowed_origins => ['*']`
