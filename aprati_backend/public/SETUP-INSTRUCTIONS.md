# Setup Instructions for External Public Directory

## Current Structure:
```
/home/apratifoodscom/public_html/
├── sdev.apratifoods.asia/  ← Your document root (public files here)
│   ├── index.php           ← Will be replaced with laravel-index.php
│   ├── .htaccess          ← Will be replaced with laravel-htaccess.txt
│   ├── _nuxt/             ← Frontend assets
│   ├── frontend/          ← Frontend HTML files
│   ├── images/            ← Images
│   ├── deploy.php
│   └── check-upload.php
└── aprati_backend/        ← Laravel application folder
    ├── app/
    ├── bootstrap/
    ├── config/
    ├── vendor/
    └── ...
```

## Step 1: Replace index.php

**In cPanel File Manager:**

1. Navigate to: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`

2. **Backup current index.php:**
   - Right-click `index.php`
   - Rename to `index.php.backup`

3. **Upload new index.php:**
   - Rename `laravel-index.php` to `index.php`
   - This file bootstraps Laravel from outside the aprati_backend folder

## Step 2: Replace .htaccess

1. In same directory: `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`

2. **Backup current .htaccess:**
   - Rename `.htaccess` to `.htaccess.backup`

3. **Create new .htaccess:**
   - Rename `laravel-htaccess.txt` to `.htaccess`

## Step 3: Create .env File

1. Navigate to: `/home/apratifoodscom/public_html/aprati_backend/`

2. Copy `.env.example` to `.env`

3. Edit `.env` and update:
```env
APP_URL=https://sdev.apratifoods.asia
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

## Step 4: Set Permissions

In `/home/apratifoodscom/public_html/aprati_backend/`:

1. Right-click `storage` → Permissions → `755` (check "Recurse")
2. Right-click `bootstrap/cache` → Permissions → `755` (check "Recurse")

## Step 5: Use deploy.php

Visit: `https://sdev.apratifoods.asia/deploy.php?password=aprati2025secure`

Run in order:
1. "7. Check/Fix .env" - Generate APP_KEY
2. "1. Clear All Cache"
3. "3. Create Storage Link"
4. "6. Check Permissions"

## Step 6: Test

1. **Homepage:** `https://sdev.apratifoods.asia/`
   - Should load with full styling ✅

2. **API Test:** `https://sdev.apratifoods.asia/api/brands`
   - Should return JSON data ✅

3. **Admin Panel:** `https://sdev.apratifoods.asia/admin`
   - Should redirect to admin-access ✅

## Troubleshooting

**500 Error?**
- Check `.env` file exists in aprati_backend/
- Run deploy.php → "7. Check/Fix .env"
- Check file permissions (755)

**API Not Working?**
- Verify `index.php` was replaced correctly
- Check vendor/ folder exists in aprati_backend/
- Clear cache with deploy.php

**Still No Styles?**
- Verify `_nuxt/` folder exists in document root
- Clear browser cache (Ctrl+Shift+R)
- Check `.htaccess` is not blocking assets

## File Locations Reference

**Frontend Files:** `/sdev.apratifoods.asia/`
- `index.php` - Laravel bootstrap
- `.htaccess` - URL rewriting
- `_nuxt/*` - CSS/JS assets
- `frontend/*` - HTML pages
- `images/*` - Static images

**Backend Files:** `/aprati_backend/`
- `app/*` - Laravel application
- `vendor/*` - Dependencies
- `storage/*` - Uploads & logs
- `.env` - Configuration

## Security

**After deployment, delete:**
- ✅ `deploy.php`
- ✅ `check-upload.php`
- ✅ `laravel-index.php` (rename to index.php first)
- ✅ `laravel-htaccess.txt` (rename to .htaccess first)
- ✅ `SETUP-INSTRUCTIONS.md`

---

**Need Help?** Check error logs in aprati_backend/storage/logs/laravel.log
