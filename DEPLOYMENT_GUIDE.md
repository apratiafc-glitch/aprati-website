# 🚀 Deployment Guide for cPanel
## Domain: https://sdev.apratifoods.asia

---

## 📦 Part 1: Prepare Your Files

### 1.1 Build Frontend (Nuxt.js)
```bash
cd D:\xammp\htdocs\aprati_web_backup\aprati_frontend
npm run build
```

This creates a `.output` folder with your production build.

### 1.2 Prepare Backend (Laravel)
```bash
cd D:\xammp\htdocs\aprati_web_backup\aprati_backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 📁 Part 2: Upload to cPanel

### Option A: Using cPanel File Manager
1. Login to cPanel
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain folder)
4. Create folder structure:
   ```
   /home/username/
   ├── public_html/          (Frontend + Laravel public folder)
   ├── aprati_backend/       (Laravel app files)
   └── aprati_frontend/      (Nuxt build files)
   ```

### Option B: Using FTP (Recommended)
1. Use FileZilla or any FTP client
2. Connect to your cPanel FTP
3. Upload files:
   - Upload `aprati_backend` folder (except `public` folder)
   - Upload `aprati_frontend/.output` folder
   - Upload Laravel's `public` folder contents to `public_html`

---

## 🗄️ Part 3: Database Setup

### 3.1 Create Database in cPanel
1. Go to **MySQL Databases** in cPanel
2. Create new database: `username_aprati`
3. Create database user: `username_aprati_user`
4. Set strong password
5. Add user to database with **ALL PRIVILEGES**

### 3.2 Import Database
1. Go to **phpMyAdmin** in cPanel
2. Select your database
3. Click **Import**
4. Upload your SQL dump file
5. Click **Go**

### 3.3 Get Database Credentials
Note down:
- Database Host: Usually `localhost`
- Database Name: `username_aprati`
- Database User: `username_aprati_user`
- Database Password: (your password)

---

## ⚙️ Part 4: Configure Environment

### 4.1 Laravel Backend (.env)

Create/edit `aprati_backend/.env`:

```env
APP_NAME="Aprati Foods"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=https://sdev.apratifoods.asia

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=username_aprati
DB_USERNAME=username_aprati_user
DB_PASSWORD=your_database_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=public
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

SANCTUM_STATEFUL_DOMAINS=sdev.apratifoods.asia
SESSION_DOMAIN=.apratifoods.asia

CORS_ALLOWED_ORIGINS=https://sdev.apratifoods.asia

# File Upload Settings
MAX_UPLOAD_SIZE=10240
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,gif,webp
ALLOWED_DOCUMENT_TYPES=pdf,doc,docx
```

### 4.2 Generate Application Key
```bash
php artisan key:generate
```

### 4.3 Create Storage Link
```bash
php artisan storage:link
```

---

## 🌐 Part 5: Configure Domain & SSL

### 5.1 Point Domain to cPanel
1. Go to your domain registrar
2. Update nameservers to your hosting provider's nameservers
3. Or add an A record pointing to your server IP

### 5.2 Install SSL Certificate (Free Let's Encrypt)
1. In cPanel, go to **SSL/TLS Status**
2. Find your domain: `sdev.apratifoods.asia`
3. Click **Run AutoSSL**
4. Wait for certificate installation

### 5.3 Force HTTPS
Create/edit `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Laravel API routes
    RewriteCond %{REQUEST_URI} ^/api/
    RewriteRule ^(.*)$ /api/index.php [L]
    
    # Laravel storage routes
    RewriteCond %{REQUEST_URI} ^/storage/
    RewriteRule ^(.*)$ /storage/$1 [L]
    
    # Frontend (Nuxt)
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /index.html [L]
</IfModule>
```

---

## 📂 Part 6: File Structure on Server

```
/home/username/
├── public_html/                      # Main public folder
│   ├── .htaccess                     # URL rewriting rules
│   ├── index.html                    # Nuxt frontend entry
│   ├── _nuxt/                        # Nuxt assets
│   ├── api/                          # Laravel public folder
│   │   ├── index.php                 # Laravel entry point
│   │   └── .htaccess
│   └── storage/                      # Public storage symlink
│       └── images/
│
├── aprati_backend/                   # Laravel application
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── .env                          # Backend environment
│   └── artisan
│
└── aprati_frontend/                  # Nuxt source (optional)
    └── .output/                      # Production build
```

---

## 🔧 Part 7: Laravel Setup Commands

Run these in SSH terminal or cPanel Terminal:

```bash
cd ~/aprati_backend

# Install dependencies
composer install --optimize-autoloader --no-dev

# Generate application key
php artisan key:generate

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Create storage link
php artisan storage:link

# Set permissions
chmod -R 755 storage bootstrap/cache
```

---

## 🔐 Part 8: Set File Permissions

In cPanel File Manager or via SSH:

```bash
# Laravel
chmod -R 755 ~/aprati_backend
chmod -R 775 ~/aprati_backend/storage
chmod -R 775 ~/aprati_backend/bootstrap/cache

# Public folder
chmod -R 755 ~/public_html
chmod -R 775 ~/public_html/storage
```

---

## 🧪 Part 9: Testing

### 9.1 Test API
Visit: `https://sdev.apratifoods.asia/api/brands`

Should return JSON with brands data.

### 9.2 Test Frontend
Visit: `https://sdev.apratifoods.asia`

Should load your Nuxt frontend.

### 9.3 Test Admin Login
Visit: `https://sdev.apratifoods.asia/admin/login`

Login with:
- Email: admin@aprati.com
- Password: password123 (or your admin password)

---

## 🚨 Troubleshooting

### Issue 1: 500 Internal Server Error
**Solution:**
1. Check `.env` file exists in Laravel
2. Check file permissions (775 for storage)
3. Run `php artisan config:clear`
4. Check error logs in cPanel

### Issue 2: Storage Images Not Showing
**Solution:**
1. Create storage symlink: `php artisan storage:link`
2. Check permissions: `chmod -R 775 storage`
3. Verify path in .env: `FILESYSTEM_DISK=public`

### Issue 3: CORS Errors
**Solution:**
Update `aprati_backend/config/cors.php`:
```php
'allowed_origins' => ['https://sdev.apratifoods.asia'],
'allowed_origins_patterns' => [],
'supports_credentials' => true,
```

### Issue 4: Database Connection Error
**Solution:**
1. Verify database credentials in `.env`
2. Check database user has privileges
3. Ensure `DB_HOST=localhost` (not 127.0.0.1)

### Issue 5: Routes Not Working
**Solution:**
1. Check `.htaccess` in public_html
2. Enable mod_rewrite in cPanel (usually enabled by default)
3. Clear route cache: `php artisan route:clear`

---

## 📝 Part 10: Post-Deployment Checklist

- [ ] SSL certificate installed and working
- [ ] Database imported and connected
- [ ] Environment variables configured
- [ ] Storage symlink created
- [ ] File permissions set correctly
- [ ] API endpoints working
- [ ] Frontend loading correctly
- [ ] Admin login working
- [ ] Images displaying properly
- [ ] All navigation working
- [ ] Test product CRUD operations
- [ ] Test brand pages
- [ ] Test contact form

---

## 🔄 Part 11: Update Deployment (Future Updates)

When you make changes:

### Update Frontend:
```bash
# Build
cd aprati_frontend
npm run build

# Upload .output folder to server
# Replace files in public_html
```

### Update Backend:
```bash
# Upload changed files via FTP
# Run on server:
cd ~/aprati_backend
composer install --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 📞 Support

If you encounter issues:
1. Check cPanel error logs: **Errors** section
2. Check Laravel logs: `storage/logs/laravel.log`
3. Check PHP error logs in cPanel
4. Contact your hosting provider's support

---

## 🎉 Success!

Your application should now be live at:
**https://sdev.apratifoods.asia**

**API Endpoint:**
https://sdev.apratifoods.asia/api

**Admin Panel:**
https://sdev.apratifoods.asia/admin
