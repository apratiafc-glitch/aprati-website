# API Redirect Fix - Quick Upload Guide

## 🎯 Problem
`https://sdev.apratifoods.asia/api/brands` redirects to homepage instead of returning JSON

## ✅ Solution
Updated `.htaccess` to properly route API requests to Laravel

---

## 📦 Quick Fix (Manual Upload)

### Step 1: Download These Files
From your local: `d:\xammp\htdocs\aprati_web_backup\aprati_backend\public\`

1. `.htaccess` ⭐ (MAIN FIX)
2. `laravel-bootstrap.php`
3. `diagnose-api-error.php` (optional diagnostic)
4. `run-migrations-secure.php` (optional migration tool)

### Step 2: Upload to Production
**Via cPanel File Manager:**

1. Login to cPanel
2. Open File Manager
3. Navigate to: `/public_html/sdev.apratifoods.asia/`
4. **BACKUP FIRST:** Rename existing `.htaccess` to `.htaccess.backup`
5. Upload the new `.htaccess` file
6. Upload other files (if not already there)

### Step 3: Test
Open in browser:
```
https://sdev.apratifoods.asia/api/brands
```

**Expected:** JSON data showing brands
```json
{
  "success": true,
  "data": [...]
}
```

**Should NOT:** Redirect to homepage ❌

---

## 🔧 If Still Not Working

### Option 1: Run Diagnostics
Visit: `https://sdev.apratifoods.asia/diagnose-api-error.php?password=aprati2025secure`

Check Step 5 - API Endpoint Test

### Option 2: Run Migrations
Visit: `https://sdev.apratifoods.asia/run-migrations-secure.php?password=aprati2025secure`

Click "Run Pending Migrations"

---

## 📝 What Changed in .htaccess

**Before (causing redirect):**
```apache
# Everything goes to index.php (which doesn't handle API)
RewriteRule ^ index.php [L]
```

**After (API routing fixed):**
```apache
# API requests go to Laravel
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^(.*)$ laravel-bootstrap.php [L,QSA]

# Other requests go to frontend
RewriteRule ^(.*)$ index.html [L]
```

---

## 🚀 Automated Package (Optional)

Run: `create-api-fix-package.bat`

This creates a ZIP file with all necessary files and instructions.

---

## ✅ Verification Checklist

- [ ] Backed up old `.htaccess`
- [ ] Uploaded new `.htaccess`
- [ ] Verified `laravel-bootstrap.php` exists
- [ ] Tested API endpoint (should return JSON)
- [ ] Frontend still works (homepage loads)
- [ ] Deleted diagnostic files (after fixing)

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Still redirects to homepage | Clear browser cache, check .htaccess uploaded correctly |
| 500 error | Run migrations, check Laravel logs |
| 404 error | Verify laravel-bootstrap.php exists in same directory |
| Blank page | Check file permissions, PHP errors enabled |

---

**Quick Test Command:**
```bash
curl -I https://sdev.apratifoods.asia/api/brands
```

Should show:
- `HTTP/2 200 OK` or `HTTP/2 500` (not 301/302 redirect)
- `Content-Type: application/json`

---

**Ready?** Upload the `.htaccess` file now! 🚀
