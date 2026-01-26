# Single Domain Deployment Guide

## Overview
Your Aprati Foods website is now configured to run on a single domain with:
- **Frontend (Nuxt.js)**: Served from root (/)
- **Backend API (Laravel)**: Accessible at (/api/*)
- **Storage**: Accessible at (/storage/*)

## Local Testing

### Build the frontend:
```powershell
# On Windows
build-production.bat

# OR manually:
cd aprati_frontend
npm run generate
cd ..
```

### Start Laravel server:
```powershell
cd aprati_backend
php artisan serve
```

### Test:
- Frontend: http://localhost:8000
- API: http://localhost:8000/api/brands
- Admin: http://localhost:8000/admin

## Production Deployment

### Step 1: Build the project
```powershell
# Build frontend and copy to backend
build-production.bat
```

This will:
1. Build Nuxt.js static files
2. Copy them to `aprati_backend/public/frontend/`

### Step 2: Upload to server
Upload **only the `aprati_backend` folder** to your server:
```
/home/yourusername/public_html/
├── aprati_backend/  ← Upload this entire folder
```

### Step 3: Configure server

#### For cPanel/Apache:
1. Set Document Root to: `/home/yourusername/public_html/aprati_backend/public`
2. Ensure .htaccess is enabled
3. PHP version: 8.2 or higher

#### For Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /home/yourusername/public_html/aprati_backend/public;

    index index.php index.html;

    # Frontend static files
    location /frontend {
        try_files $uri $uri/ =404;
    }

    # API routes
    location /api {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Storage files
    location /storage {
        try_files $uri $uri/ =404;
    }

    # Laravel
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### Step 4: Configure .env file
```env
APP_NAME="Aprati Foods Cambodia"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# File Permissions
FILESYSTEM_DISK=public
```

### Step 5: Run Laravel commands
```bash
cd /home/yourusername/public_html/aprati_backend

# Install dependencies (if not already done)
composer install --optimize-autoloader --no-dev

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

## URL Structure

### Production URLs:
- **Homepage**: https://yourdomain.com
- **About Page**: https://yourdomain.com/about
- **Products**: https://yourdomain.com/products
- **Brands**: https://yourdomain.com/brands
- **API**: https://yourdomain.com/api/*
- **Admin**: https://yourdomain.com/admin

### API Endpoints:
- GET /api/brands
- GET /api/products
- GET /api/brands/{slug}/products
- POST /api/contact
- etc.

## File Structure on Server

```
/home/yourusername/public_html/aprati_backend/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/              ← This is your web root
│   ├── frontend/        ← Nuxt static files
│   │   ├── index.html
│   │   ├── _nuxt/
│   │   └── images/
│   ├── storage/         ← Uploaded files (symlinked)
│   ├── images/
│   └── index.php        ← Laravel entry point
├── resources/
├── routes/
├── storage/
│   └── app/
│       └── public/      ← Actual uploaded files
└── vendor/
```

## Troubleshooting

### Frontend not loading:
1. Check if files exist: `aprati_backend/public/frontend/index.html`
2. Rebuild: `cd aprati_frontend && npm run generate`
3. Copy files: `xcopy /E /I /Y .output\public\* ..\aprati_backend\public\frontend\`

### API not working:
1. Check .htaccess is enabled
2. Clear cache: `php artisan config:clear`
3. Check .env database connection
4. Check error logs: `storage/logs/laravel.log`

### Images not showing:
1. Run: `php artisan storage:link`
2. Check permissions: `chmod -R 755 storage`
3. Check storage path in .env: `FILESYSTEM_DISK=public`

### 404 Errors:
1. Check web server configuration
2. Ensure mod_rewrite is enabled (Apache)
3. Clear route cache: `php artisan route:clear`

## Development vs Production

### Development (separate servers):
- Frontend: http://localhost:3000 (Nuxt dev server)
- Backend: http://localhost:8000 (Laravel serve)
- API calls: http://localhost:8000/api/*

### Production (single domain):
- Everything: https://yourdomain.com
- Frontend: / (root)
- Backend API: /api/*
- Uploads: /storage/*

## Security Checklist

- [ ] Set `APP_DEBUG=false` in .env
- [ ] Set `APP_ENV=production` in .env
- [ ] Configure proper database credentials
- [ ] Set secure `APP_KEY` (run `php artisan key:generate`)
- [ ] Configure CORS properly
- [ ] Set proper file permissions (755 for directories, 644 for files)
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure firewall rules
- [ ] Set up regular backups

## Updating the Site

When you make changes:

1. **Frontend changes**:
   ```powershell
   cd aprati_frontend
   npm run generate
   # Upload aprati_backend/public/frontend/ to server
   ```

2. **Backend changes**:
   ```powershell
   # Upload changed files in aprati_backend/
   # Then on server:
   php artisan config:cache
   php artisan route:cache
   ```

3. **Database changes**:
   ```powershell
   # On server:
   php artisan migrate
   ```

## Support

If you encounter issues:
1. Check Laravel logs: `storage/logs/laravel.log`
2. Check web server error logs
3. Enable debug mode temporarily: `APP_DEBUG=true`
4. Clear all caches: `php artisan optimize:clear`
