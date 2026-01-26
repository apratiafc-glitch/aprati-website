# Fix for API Prefix Errors (500 Internal Server Error)

## Problem Diagnosis
The frontend is making requests to URLs **without** the `/api` prefix:
- ❌ `https://sdev.apratifoods.asia/hero-content` (500 Error)
- ❌ `https://sdev.apratifoods.asia/footer-settings` (500 Error)  
- ❌ `https://sdev.apratifoods.asia/header-settings` (500 Error)
- ❌ `https://sdev.apratifoods.asia/admin-profile-image` (500 Error)

These should be:
- ✅ `https://sdev.apratifoods.asia/api/hero-content`
- ✅ `https://sdev.apratifoods.asia/api/footer-settings`
- ✅ `https://sdev.apratifoods.asia/api/header-settings`
- ✅ `https://sdev.apratifoods.asia/api/admin-profile-image`

## Root Cause
The `index.vue` file is using `$fetch` with `runtimeConfig.public.apiBase` but the API prefix is not being applied consistently because `$fetch` is being called **directly** instead of through the `useApi` composable which properly handles the API base URL.

## Solution

### Option 1: Use the useApi Composable (RECOMMENDED)
Replace all direct `$fetch` calls with the `useApi()` composable:

**Before (❌ WRONG):**
```javascript
const response = await $fetch(`${runtimeConfig.public.apiBase}/hero-content`, {...})
```

**After (✅ CORRECT):**
```javascript
const api = useApi()
const response = await api.request('/hero-content')
```

### Option 2: Ensure apiBase is Always Used
If you must use `$fetch`, ensure the full API base URL is used:

**Check nuxt.config.ts:**
```typescript
runtimeConfig: {
  public: {
    apiBase: '/api',  // ✅ Should be relative path
    apiBaseUrl: ''    // ✅ Should be empty or full domain
  }
}
```

## Files That Need to be Fixed

### 1. app/pages/index.vue
**Lines to fix:**
- Line ~1242: `await $fetch(\`${runtimeConfig.public.apiBase}/information-sections?t=${Date.now()}\`, {...})`
- Line ~1295: `await $fetch(\`${runtimeConfig.public.apiBase}/brands?t=${Date.now()}\`, {...})`
- Line ~1315: `await $fetch(\`${runtimeConfig.public.apiBase}/brands/${brand.slug}/products?active=1&t=${Date.now()}\`, {...})`
- Line ~1375: `await $fetch(\`${runtimeConfig.public.apiBase}/hero-image\`, {...})`
- Line ~1410: `await $fetch(\`${runtimeConfig.public.apiBase}/hero-content\`, {...})`

### 2. app/components/AppHeader.vue (if exists)
Check for:
- `/header-settings`
- `/admin-profile-image`

### 3. app/components/AppFooter.vue (if exists)
Check for:
- `/footer-settings`

## Quick Fix Script

Run this in PowerShell from the frontend directory:

```powershell
# Navigate to frontend
cd D:\xammp\htdocs\aprati_web_backup\aprati_frontend

# Rebuild with correct configuration
npm run generate

# Check the build output
Get-ChildItem -Path "../aprati_backend/.output/public/_nuxt/" -Filter "*.js" | ForEach-Object {
    Write-Host "Generated: $($_.Name) - $($_.Length) bytes"
}
```

## Verification Steps

1. **Check page source** at https://sdev.apratifoods.asia/
   - Look for JavaScript file names (should be D2WnqWw3.js or similar with hashes)
   - If file names are old, files weren't uploaded correctly

2. **Test in incognito mode**
   - Open fresh incognito window
   - Visit https://sdev.apratifoods.asia/
   - Check console for errors
   - If errors persist, it's not a cache issue

3. **Test direct API endpoints**
   - ✅ https://sdev.apratifoods.asia/api/brands (should return JSON)
   - ✅ https://sdev.apratifoods.asia/api/hero-content (should return JSON)
   - ❌ https://sdev.apratifoods.asia/hero-content (should return 404)

4. **Check .htaccess uploaded**
   - Root .htaccess should be at `/sdev.apratifoods.asia/.htaccess`
   - Should contain: `RewriteRule ^api/(.*)$ /aprati_backend/public/index.php [L,QSA]`

## Expected Behavior After Fix

All console errors should show URLs WITH `/api`:
```
✅ GET https://sdev.apratifoods.asia/api/hero-content 200 OK
✅ GET https://sdev.apratifoods.asia/api/footer-settings 200 OK
✅ GET https://sdev.apratifoods.asia/api/header-settings 200 OK
✅ GET https://sdev.apratifoods.asia/api/admin-profile-image 200 OK
```

## If Errors Persist

1. **Clear all caches:**
   ```powershell
   # Clear browser cache completely
   # Or use Ctrl+Shift+Delete in browser
   ```

2. **Re-upload frontend files:**
   ```powershell
   # Ensure you're uploading from the correct directory
   # Source: D:\xammp\htdocs\aprati_web_backup\aprati_backend\.output\public\
   # Destination: /home/apratifoodscom/public_html/sdev.apratifoods.asia/
   ```

3. **Check Laravel backend:**
   ```php
   // Visit https://sdev.apratifoods.asia/test-frontend-backend.html
   // All endpoints should show ✅
   ```

## Contact Points

- Frontend Build: `npm run generate` in `aprati_frontend/`
- Output Location: `aprati_backend/.output/public/`
- Upload Destination: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`
- API Base URL: `/api` (relative)
- Laravel Root: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend/`
