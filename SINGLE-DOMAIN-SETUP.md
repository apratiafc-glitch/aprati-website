# Single Domain Deployment Instructions

## Your Current Structure:
```
/home/apratifoodscom/public_html/
├── aprati_backend/           ← Laravel application (uploaded here)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── public/              ← Contains frontend files
│   │   ├── _nuxt/          ← CSS/JS
│   │   ├── frontend/       ← HTML files
│   │   ├── laravel-bootstrap.php
│   │   └── .htaccess-single-domain
│   ├── routes/
│   ├── storage/
│   └── vendor/
└── sdev.apratifoods.asia/   ← Document root (current)
```

## Setup Steps:

### Step 1: Copy Files to Document Root
In cPanel File Manager:

1. Navigate to `/home/apratifoodscom/public_html/aprati_backend/public/`

2. **Copy these folders** to `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`:
   - `_nuxt/` folder → Copy entire folder
   - `frontend/` folder → Copy entire folder
   - `images/` folder → Copy if exists

3. **Copy these files** to `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`:
   - `laravel-bootstrap.php`
   - `deploy.php`
   - `check-upload.php`
   - `robots.txt`
   - Any other files in public/ (favicon, etc.)

### Step 2: Setup .htaccess
In `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`:

1. Rename existing `.htaccess` to `.htaccess.backup` (if exists)
2. Copy `.htaccess-single-domain` to this folder
3. Rename it to `.htaccess`

### Step 3: Configure .env
1. Navigate to `/home/apratifoodscom/public_html/aprati_backend/`
2. Copy `.env.example` to `.env`
3. Edit `.env`:
```env
APP_URL=https://sdev.apratifoods.asia

DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### Step 4: Generate APP_KEY
Visit: `https://sdev.apratifoods.asia/deploy.php?password=aprati2025secure`

Click: **"7. Check/Fix .env"** → This will auto-generate APP_KEY

### Step 5: Set Permissions
In File Manager at `/home/apratifoodscom/public_html/aprati_backend/`:

1. Right-click `storage/` → Permissions → `755` ✓ Recurse
2. Right-click `bootstrap/cache/` → Permissions → `755` ✓ Recurse

### Step 6: Test Your Site

**Test Frontend:**
- Visit: `https://sdev.apratifoods.asia/`
- Should see homepage with styling ✅

**Test API:**
- Visit: `https://sdev.apratifoods.asia/api/brands`
- Should return JSON data ✅

**Test Admin:**
- Visit: `https://sdev.apratifoods.asia/admin`
- Should load admin panel ✅

## How It Works:

### URL Routing:
```
https://sdev.apratifoods.asia/              → frontend/index.html
https://sdev.apratifoods.asia/brands        → frontend/brands/index.html
https://sdev.apratifoods.asia/_nuxt/*.css   → Direct static file
https://sdev.apratifoods.asia/api/*         → laravel-bootstrap.php → Laravel API
https://sdev.apratifoods.asia/storage/*     → laravel-bootstrap.php → Laravel storage
```

### File Structure After Setup:
```
sdev.apratifoods.asia/ (document root)
├── _nuxt/                    ← Frontend assets (CSS/JS)
├── frontend/                 ← Frontend HTML files
│   ├── index.html
│   ├── about/
│   ├── brands/
│   └── ...
├── laravel-bootstrap.php     ← Laravel entry point
├── .htaccess                 ← Routing rules
├── deploy.php
└── check-upload.php
```

## Troubleshooting:

### Problem: 500 Error
**Solution:**
1. Check `.htaccess` syntax
2. Visit `deploy.php?password=aprati2025secure&action=diagnose`
3. Check APP_KEY is set in .env

### Problem: API returns 404
**Solution:**
1. Verify `laravel-bootstrap.php` exists in document root
2. Check .htaccess routing rules
3. Clear cache: `deploy.php` → "Clear All Cache"

### Problem: Frontend loads but no styling
**Solution:**
1. Check `_nuxt/` folder is copied to document root
2. Open browser DevTools → Network tab
3. See which CSS files are 404
4. Copy missing files from `aprati_backend/public/`

### Problem: Storage images not loading
**Solution:**
1. Create storage symlink via deploy.php
2. Or copy storage files manually

## Quick Commands via deploy.php:

1. **Generate APP_KEY:** Action 7
2. **Clear Cache:** Action 1
3. **Check Permissions:** Action 6
4. **Run Migrations:** Action 4
5. **Diagnose Issues:** Click "Diagnose 500 Error" button

## Security Checklist:

- [ ] Change deploy.php password
- [ ] Set APP_DEBUG=false in .env
- [ ] Set proper file permissions (755/644)
- [ ] Configure SSL certificate (HTTPS)
- [ ] Update database credentials
- [ ] Delete deploy.php after setup complete
- [ ] Change admin password

## Final Structure Overview:

**Frontend (Static):**
- Served from: `sdev.apratifoods.asia/` folder
- Routes: /, /brands, /products, etc.
- Files: HTML in frontend/, CSS/JS in _nuxt/

**Backend (Laravel API):**
- Served from: `aprati_backend/` folder
- Routes: /api/*, /storage/*, /admin-api/*
- Entry: `laravel-bootstrap.php`

Both running on: **https://sdev.apratifoods.asia** ✅

---

Need help? Check error logs in cPanel or use deploy.php diagnostic tools!
