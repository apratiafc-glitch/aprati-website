# API 404 ERROR - DIAGNOSIS AND FIX

## 🔍 CURRENT SITUATION

Your production website at **https://sdev.apratifoods.asia/** is:
- ✅ Homepage loads correctly
- ✅ Frontend is working
- ❌ All API endpoints return 404 errors

### Failing Endpoints:
- `/api/information-sections`
- `/api/header-settings`
- `/api/footer-settings`
- `/api/brands`
- `/api/admin-profile-image`
- `/api/hero-image`
- `/api/hero-content`

## 📦 FILES CREATED FOR YOU

### 1. **direct-api-test.html**
   - Upload to: `public/direct-api-test.html`
   - Access: https://sdev.apratifoods.asia/direct-api-test.html
   - Purpose: Visual browser-based API testing

### 2. **api-test.php**
   - Upload to: `public/api-test.php`
   - Access: https://sdev.apratifoods.asia/api-test.php
   - Purpose: Basic PHP/server connectivity test

### 3. **fix-routes-production.php**
   - Upload to: `aprati_backend/fix-routes-production.php` (root, not public)
   - Run via SSH: `php fix-routes-production.php`
   - Purpose: Clear and recache all Laravel routes

### 4. **check-api-endpoints.php**
   - Upload to: `aprati_backend/check-api-endpoints.php` (root, not public)
   - Run via SSH: `php check-api-endpoints.php`
   - Purpose: Complete diagnostic of all routes and database

### 5. **server-diagnostic.sh**
   - Upload to: `aprati_backend/server-diagnostic.sh` (root, not public)
   - Run via SSH: `bash server-diagnostic.sh`
   - Purpose: Check server configuration (Apache, permissions, etc.)

### 6. **api-fix-deployment.zip**
   - Location: `aprati_backend/api-fix-deployment.zip`
   - Contents: All above files packaged together
   - Purpose: Easy upload package for server

## 🚀 STEP-BY-STEP FIX INSTRUCTIONS

### Option A: Quick Web Test (No SSH Required)

1. **Upload test files to server:**
   - Upload `public/direct-api-test.html` to your server's public folder
   - Upload `public/api-test.php` to your server's public folder

2. **Test in browser:**
   - Visit: https://sdev.apratifoods.asia/direct-api-test.html
   - Click "Test All Endpoints"
   - This will show you exactly which endpoints are failing

### Option B: Complete Fix (SSH Access Required)

1. **Connect to your server via SSH**

2. **Navigate to Laravel root directory:**
   ```bash
   cd /path/to/aprati_backend
   ```

3. **Run the fix script:**
   ```bash
   php fix-routes-production.php
   ```

4. **Verify routes are working:**
   ```bash
   php artisan route:list --path=api | grep brands
   ```
   Should show: `GET|HEAD  api/brands`

5. **Test API endpoint:**
   ```bash
   curl https://sdev.apratifoods.asia/api/brands
   ```
   Should return JSON with brand data

### Option C: cPanel File Manager (No SSH)

1. **Upload via cPanel File Manager:**
   - Go to cPanel → File Manager
   - Navigate to `public_html` or your Laravel public directory
   - Upload `direct-api-test.html` and `api-test.php`
   
2. **Clear cache via PHP script:**
   - Create a file named `clear-cache.php` in the root directory with:
   ```php
   <?php
   require __DIR__.'/vendor/autoload.php';
   $app = require_once __DIR__.'/bootstrap/app.php';
   
   Artisan::call('config:clear');
   Artisan::call('route:clear');
   Artisan::call('cache:clear');
   Artisan::call('route:cache');
   Artisan::call('config:cache');
   
   echo "Cache cleared and rebuilt!";
   ```
   
3. **Access via browser:**
   - Visit: https://sdev.apratifoods.asia/clear-cache.php
   - Should show: "Cache cleared and rebuilt!"

## ⚠️ COMMON ISSUES AND SOLUTIONS

### Issue 1: Document Root Points to Wrong Directory
**Symptom:** All pages show 404
**Solution:**
- Document root MUST point to: `/path/to/aprati_backend/public`
- NOT to: `/path/to/aprati_backend`
- Update in Apache/Nginx configuration

### Issue 2: mod_rewrite Not Enabled (Apache)
**Symptom:** Routes work locally but not on server
**Solution:**
```bash
sudo a2enmod rewrite
sudo service apache2 restart
```

### Issue 3: .htaccess Not Working
**Symptom:** index.php works but routes don't
**Solution:**
- Enable `AllowOverride All` in Apache config
- Check if `.htaccess` exists in public directory

### Issue 4: File Permissions
**Symptom:** 500 Internal Server Error
**Solution:**
```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Issue 5: Cached Routes Outdated
**Symptom:** Some routes work, others don't
**Solution:**
```bash
php artisan route:clear
php artisan route:cache
```

## 🔬 DIAGNOSTIC STEPS

### 1. Check if Laravel is accessible:
```bash
curl https://sdev.apratifoods.asia/
```
✅ Should return your homepage HTML

### 2. Check if PHP is processing:
```bash
curl https://sdev.apratifoods.asia/api-test.php
```
✅ Should return JSON with server info

### 3. Check if routes are registered:
```bash
php artisan route:list --path=api
```
✅ Should show all /api/* routes

### 4. Test specific API endpoint:
```bash
curl -v https://sdev.apratifoods.asia/api/brands
```
✅ Should return JSON with brand data (or empty array if no brands)
❌ If 404: Routes not cached or wrong document root

### 5. Check Laravel logs:
```bash
tail -f storage/logs/laravel.log
```
Look for errors related to routing or authentication

## 📋 CHECKLIST BEFORE DEPLOYMENT

- [ ] `.env` file exists and has correct APP_URL
- [ ] `APP_KEY` is set in `.env`
- [ ] Database connection works
- [ ] `storage` and `bootstrap/cache` are writable (755)
- [ ] `.htaccess` exists in `public` directory
- [ ] Document root points to `public` directory
- [ ] `mod_rewrite` enabled (Apache) or proper Nginx config
- [ ] Routes are cached: `php artisan route:cache`
- [ ] Config is cached: `php artisan config:cache`
- [ ] All migrations run: `php artisan migrate`

## 🎯 EXPECTED BEHAVIOR AFTER FIX

When you visit: https://sdev.apratifoods.asia/api/brands

You should see:
```json
{
  "success": true,
  "data": [...]
}
```

NOT:
```html
<!DOCTYPE html>
<html>
<head><title>404 Not Found</title></head>
...
```

## 💡 NEXT STEPS

1. **Upload and run diagnostic:**
   - Upload `direct-api-test.html` to server
   - Visit https://sdev.apratifoods.asia/direct-api-test.html
   - Share screenshot of results

2. **If you have SSH access:**
   - Run `php fix-routes-production.php`
   - Run `php check-api-endpoints.php`
   - Share output

3. **If issues persist:**
   - Check Apache/Nginx error logs
   - Verify document root configuration
   - Confirm `.htaccess` is being read

## 📞 SUPPORT

If you need help:
1. Run the diagnostic tools
2. Check Laravel logs: `storage/logs/laravel.log`
3. Check Apache logs: `/var/log/apache2/error.log`
4. Share screenshots or error messages

---

**Last Updated:** December 15, 2025
**Environment:** Production Server (https://sdev.apratifoods.asia/)
**Framework:** Laravel 11 with Nuxt.js 4 Frontend
