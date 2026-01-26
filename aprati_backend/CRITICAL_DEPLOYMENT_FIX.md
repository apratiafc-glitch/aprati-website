# 🚨 CRITICAL DEPLOYMENT FIX REQUIRED

## Problem Identified:
Your server at `/home/apratifoodscom/public_html/sdev.apratifoods.asia` is **MISSING critical Laravel files!**

### Missing Files:
- ❌ `index.php` (CRITICAL - Laravel entry point)
- ❌ `vendor/` folder (CRITICAL - Composer dependencies)
- ❌ Possibly other public assets

---

## ✅ SOLUTION: Proper Deployment

### Current Server Structure (WRONG):
```
/home/apratifoodscom/public_html/
└── sdev.apratifoods.asia/          ← Document root
    ├── server-config-check.php     ← This file works
    ├── .htaccess                   ← Exists but no index.php to route to!
    └── (missing index.php)         ← CRITICAL!
```

### Required Structure (CORRECT):
```
/home/apratifoodscom/
├── aprati_backend/                 ← Laravel root (NOT public)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── storage/
│   ├── vendor/                     ← Composer dependencies
│   ├── .env
│   ├── artisan
│   └── composer.json
│
└── public_html/
    └── sdev.apratifoods.asia/      ← Document root (public folder)
        ├── index.php               ← Laravel entry point
        ├── .htaccess
        ├── favicon.ico
        └── (other public assets)
```

---

## 🚀 DEPLOYMENT STEPS

### Option 1: Upload Files via cPanel/FTP (RECOMMENDED)

#### Step 1: Upload Laravel Backend Files
1. **Upload entire `aprati_backend` folder to:**
   ```
   /home/apratifoodscom/aprati_backend
   ```
   (NOT inside public_html!)

2. **Upload public folder contents to:**
   ```
   /home/apratifoodscom/public_html/sdev.apratifoods.asia/
   ```
   Files to upload:
   - `index.php` ← **MOST CRITICAL**
   - `.htaccess`
   - `favicon.ico`
   - Any CSS/JS/images in public folder

#### Step 2: Install Composer Dependencies (via SSH)
```bash
cd /home/apratifoodscom/aprati_backend
composer install --optimize-autoloader --no-dev
```

**No SSH? Use cPanel Terminal or upload vendor folder:**
- Zip your local `vendor` folder
- Upload to server at `/home/apratifoodscom/aprati_backend/vendor`

#### Step 3: Set Permissions
```bash
cd /home/apratifoodscom/aprati_backend
chmod -R 755 storage bootstrap/cache
chmod -R 775 storage
chmod 644 .env
```

#### Step 4: Update index.php Path
The `index.php` in public folder needs to point to correct paths:

Edit: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/index.php`

Change:
```php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
```

To:
```php
require __DIR__.'/../../aprati_backend/vendor/autoload.php';
$app = require_once __DIR__.'/../../aprati_backend/bootstrap/app.php';
```

#### Step 5: Clear and Cache
```bash
cd /home/apratifoodscom/aprati_backend
php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan config:cache
php artisan route:cache
```

---

### Option 2: Quick Fix (Upload index.php Only)

If you just need a quick fix, upload this modified `index.php`:

**File: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/index.php`**

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Adjust paths for your server structure
$maintenancePath = __DIR__.'/../../aprati_backend/storage/framework/maintenance.php';
$autoloadPath = __DIR__.'/../../aprati_backend/vendor/autoload.php';
$bootstrapPath = __DIR__.'/../../aprati_backend/bootstrap/app.php';

// Determine if the application is in maintenance mode...
if (file_exists($maintenancePath)) {
    require $maintenancePath;
}

// Register the Composer autoloader...
if (!file_exists($autoloadPath)) {
    die('ERROR: Composer autoload not found. Please run "composer install" on the server.');
}
require $autoloadPath;

// Bootstrap Laravel and handle the request...
if (!file_exists($bootstrapPath)) {
    die('ERROR: Laravel bootstrap not found. Check file structure.');
}

/** @var Application $app */
$app = require_once $bootstrapPath;

$app->handleRequest(Request::capture());
```

---

## 📋 VERIFICATION CHECKLIST

After deployment, verify:

- [ ] File exists: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/index.php`
- [ ] Folder exists: `/home/apratifoodscom/aprati_backend/vendor`
- [ ] Visit: https://sdev.apratifoods.asia/ (should load without errors)
- [ ] Visit: https://sdev.apratifoods.asia/api/brands (should return JSON)
- [ ] Run server-config-check.php again (should show ✅ for index.php)

---

## 🎯 QUICK DEPLOYMENT PACKAGE

I'll create a ready-to-upload package with the correct index.php file.

**Files to upload:**

1. **index.php** → Upload to: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`
2. **vendor.zip** → Upload and extract to: `/home/apratifoodscom/aprati_backend/`
3. **run-cache-commands.php** → Upload to `/home/apratifoodscom/aprati_backend/` and visit via browser

---

## ❓ FAQ

**Q: Why is index.php missing?**
A: Your deployment only uploaded some public files, not all of them.

**Q: Can I just upload index.php?**
A: Yes, but you also need the vendor folder with Composer dependencies.

**Q: I don't have SSH access, how do I run composer?**
A: Zip your local `vendor` folder and upload it to the server.

**Q: How do I know the correct path structure?**
A: The diagnostic shows `artisan` is in the parent directory, so paths should be `../../aprati_backend/`

---

## 🆘 IMMEDIATE ACTION

**Upload this index.php file NOW:**

Location: Create this at `/home/apratifoodscom/public_html/sdev.apratifoods.asia/index.php`

[See index.php content above in Option 2]

Then re-run: https://sdev.apratifoods.asia/server-config-check.php

---

**Last Updated:** 2025-12-15
**Status:** CRITICAL - Site won't work without index.php
