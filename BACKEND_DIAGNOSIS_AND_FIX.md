# Backend API 500 Error - Diagnosis and Fix

## Problem Summary
The frontend is correctly configured to connect to `https://sdev.apratifoods.asia/api`, but the backend API returns **500 Internal Server Error**.

## Root Cause Analysis

### ✅ Working Components:
1. **Frontend Configuration**: Correctly set to `https://sdev.apratifoods.asia/api`
2. **Base URL**: `https://sdev.apratifoods.asia` responds with Status 200
3. **Laravel Routes**: API routes exist and are properly configured
4. **Local Laravel**: Works locally (Laravel 12.25.0)
5. **Database**: MySQL connection configured and migrations are mostly complete

### ❌ Issue Identified:
The production server at `https://sdev.apratifoods.asia/api/brands` returns:
- **HTTP 500 Internal Server Error**
- HTML error page instead of JSON response
- Error message: "The server encountered an internal error or misconfiguration"

## Most Likely Causes:

### 1. **Pending Database Migrations** (Critical)
Several migrations are pending:
```
2025_09_01_020301_modify_brands_slug_unique_constraint
2025_09_01_031151_create_about_contents_table
2025_09_04_063320_add_image_url_to_about_contents_table
2025_09_04_082645_create_privacy_contents_table
2025_09_05_062753_create_categories_table
2025_09_05_062838_add_category_id_to_products_table
2025_09_08_030135_drop_unique_constraint_from_sku_in_products_table
2025_09_08_030136_create_favicon_settings_table
2025_09_08_083841_create_translations_table
```

### 2. **Laravel Environment Issues**
- APP_ENV=production, APP_DEBUG=false (errors hidden)
- Database connection might be failing on production
- .env file might not be loaded properly

### 3. **File Permissions**
- storage/ folder permissions might be incorrect
- bootstrap/cache/ might not be writable
- .env file might not be readable

### 4. **Missing .htaccess Configuration**
- The production .htaccess might not be correctly set up
- Laravel bootstrap might not be loading properly

## Solutions in Priority Order:

### IMMEDIATE FIX #1: Run Pending Migrations on Production

**Option A: Via cPanel Terminal (Recommended)**
```bash
cd /home/apratifoodscom/public_html/aprati_backend
php artisan migrate --force
```

**Option B: Via Web Interface**
1. Access: `https://sdev.apratifoods.asia/run-migrations.php`
2. Or upload a migration runner script

### IMMEDIATE FIX #2: Enable Debug Mode Temporarily

Edit `/home/apratifoodscom/public_html/aprati_backend/.env`:
```env
APP_DEBUG=true
LOG_LEVEL=debug
```

Then check the actual error at:
- `https://sdev.apratifoods.asia/api/brands`

**IMPORTANT**: Set back to `APP_DEBUG=false` after fixing!

### FIX #3: Check and Fix Permissions

Via cPanel File Manager or Terminal:
```bash
cd /home/apratifoodscom/public_html/aprati_backend
chmod -R 775 storage
chmod -R 775 bootstrap/cache
chown -R username:username storage bootstrap/cache
```

### FIX #4: Verify Database Connection on Production

Create `test-db-connection.php` in the public directory:
```php
<?php
require_once '../aprati_backend/vendor/autoload.php';

$app = require_once '../aprati_backend/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

try {
    DB::connection()->getPdo();
    echo "✅ Database connected successfully\n";
    echo "Database: " . env('DB_DATABASE') . "\n";
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage();
}
```

### FIX #5: Clear All Laravel Caches

```bash
cd /home/apratifoodscom/public_html/aprati_backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### FIX #6: Check Laravel Error Logs

Check production logs:
```bash
tail -n 100 /home/apratifoodscom/public_html/aprati_backend/storage/logs/laravel.log
```

Or create a log viewer:
```php
<?php
$logPath = '../aprati_backend/storage/logs/laravel.log';
if (file_exists($logPath)) {
    $lines = file($logPath);
    $lastLines = array_slice($lines, -50);
    echo "<pre>" . htmlspecialchars(implode('', $lastLines)) . "</pre>";
}
```

## Quick Diagnostic Steps:

### Step 1: Check if Laravel is Loading
Access: `https://sdev.apratifoods.asia/check-env.php`
- Should show Laravel environment details

### Step 2: Test Database Connection
Access: `https://sdev.apratifoods.asia/api-test.php`
- Should show database connection status

### Step 3: Check API Routes
Access: `https://sdev.apratifoods.asia/check-routes.php`
- Should list all available API routes

## Files to Create for Debugging:

### 1. create-migration-runner.php
```php
<?php
// Run this from browser to execute migrations
$password = $_GET['password'] ?? '';

if ($password !== 'aprati2025secure') {
    die('Unauthorized');
}

$basePath = __DIR__ . '/../aprati_backend';
chdir($basePath);

echo "<h2>Running Migrations</h2>";
echo "<pre>";
system('php artisan migrate --force 2>&1');
echo "</pre>";
```

### 2. show-api-error.php
```php
<?php
// Temporarily enable errors to see what's wrong
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../aprati_backend/vendor/autoload.php';

try {
    $app = require_once '../aprati_backend/bootstrap/app.php';
    $kernel = $app->make('Illuminate\Contracts\Http\Kernel');
    
    $request = Illuminate\Http\Request::create('/api/brands', 'GET');
    $response = $kernel->handle($request);
    
    echo "Status: " . $response->getStatusCode() . "\n";
    echo "Content: " . $response->getContent();
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
    echo "Trace:\n" . $e->getTraceAsString();
}
```

## Expected Results After Fixes:

✅ `https://sdev.apratifoods.asia/api/brands` should return:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Aprati",
      "slug": "aprati",
      ...
    }
  ]
}
```

## Prevention for Future:

1. **Always run migrations** when deploying
2. **Check logs** before enabling production mode
3. **Test API endpoints** before setting APP_DEBUG=false
4. **Keep database backups** before migrations
5. **Use proper deployment scripts** that include:
   - composer install
   - php artisan migrate --force
   - php artisan config:cache
   - php artisan route:cache

## Next Steps:

1. **Enable debug mode** on production (.env: APP_DEBUG=true)
2. **Check the actual error** at https://sdev.apratifoods.asia/api/brands
3. **Run pending migrations** on production
4. **Verify database connection**
5. **Test API endpoint** again
6. **Disable debug mode** (APP_DEBUG=false)

Would you like me to create the diagnostic scripts for you to upload to production?
