# Quick Fix: Upload and Run on Server

## Problem
The APP_KEY was generated locally but needs to be on the production server.

## Solution: Upload These Files

### 1. Upload Updated .env File
Upload `aprati_backend/.env` to:
```
/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend/.env
```

The file now contains the generated APP_KEY.

### 2. Run These Commands on Server

**Option A: Via SSH**
```bash
cd /home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

**Option B: Via cPanel Terminal**
1. Open cPanel → Terminal
2. Run:
```bash
cd public_html/sdev.apratifoods.asia/aprati_backend
php artisan config:clear
php artisan cache:clear
```

**Option C: Create a PHP Script to Run**
Upload this file as `clear-cache.php` to `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`:

```php
<?php
chdir('aprati_backend');
echo "Clearing config...\n";
exec('php artisan config:clear 2>&1', $output1);
echo implode("\n", $output1) . "\n";

echo "Clearing cache...\n";
exec('php artisan cache:clear 2>&1', $output2);
echo implode("\n", $output2) . "\n";

echo "Clearing routes...\n";
exec('php artisan route:clear 2>&1', $output3);
echo implode("\n", $output3) . "\n";

echo "\nDone! Now delete this file for security.";
?>
```

Then access: `https://sdev.apratifoods.asia/clear-cache.php`

## 3. Test Again
After clearing caches, visit:
```
https://sdev.apratifoods.asia/config-test.html
```

All API tests should now return 200 OK instead of 500 errors.

## Why This Needs to Be Done on Server
- The local `.env` was updated with APP_KEY
- But the production server still has the old `.env` without APP_KEY
- Laravel caches configuration, so even after uploading, cache must be cleared

## If Still Not Working

Check if `.env` was uploaded correctly:
```bash
cat /home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend/.env | grep APP_KEY
```

Should show something like:
```
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=
```

If empty, the file didn't upload or got overwritten.
