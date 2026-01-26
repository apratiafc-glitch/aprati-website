# 🚀 cPanel Deployment Guide (No Terminal Access)

## Step 1: Upload Files via FTP/File Manager

### Option A: Using cPanel File Manager
1. **Login to cPanel**
2. **Navigate to File Manager**
3. **Go to your domain's root** (usually `public_html/` or `www/`)
4. **Upload the entire `aprati_backend` folder**
5. **Extract if uploaded as ZIP**

### Option B: Using FTP Client (FileZilla/WinSCP)
1. **Connect via FTP** to your hosting
2. **Upload `aprati_backend` folder** to your domain root

## Step 2: Configure Document Root

### In cPanel:
1. Go to **Domains** section
2. Click **Manage** next to your domain (`sdev.apratifoods.asia`)
3. Change **Document Root** to: `aprati_backend/public`
4. Click **Save**

**Important:** The document root MUST point to `aprati_backend/public` NOT just `aprati_backend`

## Step 3: Configure .env File

1. **Navigate to** `aprati_backend/` folder
2. **Find** `.env.example` file
3. **Copy and rename** it to `.env`
4. **Edit** `.env` file with these settings:

```env
APP_NAME="Aprati Foods"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=https://sdev.apratifoods.asia

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# Session Configuration
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_DOMAIN=.apratifoods.asia

# Cache Configuration
CACHE_DRIVER=file
QUEUE_CONNECTION=sync

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=sdev.apratifoods.asia,apratifoods.asia
SESSION_SECURE_COOKIE=true
```

## Step 4: Generate Application Key

### Option 1: Using Browser (deploy.php)
1. **Upload** `aprati_backend/public/deploy.php` (already created)
2. **Visit:** `https://sdev.apratifoods.asia/deploy.php?password=aprati2025secure`
3. **Click** "5. System Info" to verify setup

### Option 2: Manual Key Generation
If deploy.php doesn't work, manually generate key:

1. Create file: `aprati_backend/public/generate-key.php`
```php
<?php
require __DIR__.'/../vendor/autoload.php';
$key = 'base64:'.base64_encode(random_bytes(32));
echo "Copy this key to your .env file:\n";
echo "APP_KEY=$key\n";
```

2. Visit: `https://sdev.apratifoods.asia/generate-key.php`
3. Copy the key to your `.env` file
4. Delete the file

## Step 5: Set Permissions

In cPanel File Manager, set these permissions:

1. **`aprati_backend/storage`** folder:
   - Right-click → Change Permissions → **755**
   - Check "Recurse into subdirectories"

2. **`aprati_backend/bootstrap/cache`** folder:
   - Right-click → Change Permissions → **755**

3. **`aprati_backend/public`** folder:
   - Right-click → Change Permissions → **755**

## Step 6: Run Deployment Script

1. **Visit:** `https://sdev.apratifoods.asia/deploy.php?password=aprati2025secure`

2. **Run actions in order:**
   - Click **"3. Create Storage Link"**
   - Click **"4. Run Migrations"** (confirm when asked)
   - Click **"2. Optimize for Production"**
   - Click **"6. Check Permissions"** (verify all green)

3. **Important:** After successful deployment, **DELETE** `deploy.php` for security!

## Step 7: Configure Database

### Create Database in cPanel:
1. Go to **MySQL Databases**
2. Create new database: `aprati_foods`
3. Create new user with strong password
4. Add user to database with **ALL PRIVILEGES**
5. Update `.env` with database credentials

## Step 8: Import Database (If Migrating)

If you have existing database:

1. Go to **phpMyAdmin** in cPanel
2. Select your database
3. Click **Import** tab
4. Upload your SQL dump file
5. Click **Go**

OR run migrations via deploy.php (creates fresh tables)

## Step 9: Verify Deployment

Visit these URLs to test:

1. **Homepage:** `https://sdev.apratifoods.asia/`
   - Should load with full styling ✅

2. **API Test:** `https://sdev.apratifoods.asia/api/brands`
   - Should return JSON data ✅

3. **Admin Panel:** `https://sdev.apratifoods.asia/admin`
   - Should redirect to admin-access page ✅

4. **Static Assets:** `https://sdev.apratifoods.asia/_nuxt/entry.*.css`
   - Should load CSS file ✅

## Step 10: Cleanup

**IMPORTANT - Delete these files after deployment:**

```bash
public/deploy.php          ← Security risk!
public/generate-key.php    ← If created
```

## Troubleshooting

### Problem: "500 Internal Server Error"
**Solution:**
1. Check `.env` file exists
2. Check APP_KEY is set
3. Set correct permissions (Step 5)
4. Check error logs in cPanel

### Problem: "No styles loading"
**Solution:**
1. Verify document root is `aprati_backend/public`
2. Check `_nuxt` folder exists in public/
3. Clear browser cache (Ctrl+Shift+R)

### Problem: "Database connection error"
**Solution:**
1. Check `.env` database credentials
2. Verify database user has privileges
3. Check DB_HOST (usually `localhost`)
4. Run deploy.php → "1. Clear All Cache"

### Problem: "419 CSRF Token Mismatch"
**Solution:**
1. Check SESSION_DOMAIN in `.env`
2. Run deploy.php → "1. Clear All Cache"
3. Clear browser cookies

### Problem: "Storage images not showing"
**Solution:**
1. Run deploy.php → "3. Create Storage Link"
2. Check permissions on `storage/` folder (755)

## Admin Access

**Default Admin Credentials:**
- Email: `admin@aprati.com`
- Password: `password123`

**⚠️ CHANGE IMMEDIATELY AFTER FIRST LOGIN!**

## Support Files Included

1. **`public/deploy.php`** - Deployment helper (delete after use)
2. **`.htaccess`** - Already configured for Laravel
3. **`public/frontend/`** - Nuxt static HTML files
4. **`public/_nuxt/`** - CSS/JS assets

## Final Checklist

- [ ] Files uploaded to server
- [ ] Document root set to `aprati_backend/public`
- [ ] `.env` file configured
- [ ] APP_KEY generated
- [ ] Permissions set (755 on storage, bootstrap/cache)
- [ ] Storage link created
- [ ] Database migrations run
- [ ] Cache optimized for production
- [ ] Website loads with styling
- [ ] API endpoints working
- [ ] Admin panel accessible
- [ ] **deploy.php DELETED**

## Security Notes

1. **Never commit `.env` to version control**
2. **Delete deploy.php after deployment**
3. **Change admin password immediately**
4. **Set APP_DEBUG=false in production**
5. **Use HTTPS only (SSL certificate)**
6. **Keep Laravel and packages updated**

---

**Need Help?**
Check cPanel error logs: `public_html/error_log`
