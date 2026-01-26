# Step-by-Step Hosting Guide for Aprati Foods Website
## Domain: sdev.apratifoods.asia

---

## 📋 **PREPARATION - Files You Need**

Located in: `D:\xammp\htdocs\aprati_web_backup\`

1. ✅ **aprati_frontend_FINAL.zip** (4.71 MB) - Frontend files
2. ✅ **aprati_backend.zip** (if created) - Backend files
3. ✅ Manual upload of **aprati_backend** folder

---

## 🌐 **PART 1: SETUP DOMAIN & SSL (First Time Only)**

### Step 1.1: Add Domain in cPanel
1. Login to your cPanel
2. Go to **"Domains"** or **"Addon Domains"**
3. Add domain: `sdev.apratifoods.asia`
4. Document root: `/public_html/sdev` (cPanel will create this)
5. Click **"Add Domain"**

### Step 1.2: Install SSL Certificate
1. In cPanel, go to **"SSL/TLS Status"**
2. Find `sdev.apratifoods.asia`
3. Click **"Run AutoSSL"** or install Let's Encrypt certificate
4. Wait for SSL to activate (usually 1-5 minutes)
5. Verify: Visit `https://sdev.apratifoods.asia` (should show secure padlock)

---

## 📁 **PART 2: UPLOAD FRONTEND FILES**

### Step 2.1: Upload Frontend Zip
1. In cPanel, open **"File Manager"**
2. Navigate to `/public_html/sdev/` (or wherever your domain points)
3. Click **"Upload"** button (top menu)
4. Select `aprati_frontend_FINAL.zip`
5. Wait for upload to complete (4.71 MB)
6. Close upload window

### Step 2.2: Extract Frontend Files
1. Back in File Manager, find `aprati_frontend_FINAL.zip`
2. Right-click → **"Extract"**
3. Extract to: `/public_html/sdev/`
4. Click **"Extract File(s)"**
5. Delete the zip file after extraction (to save space)

### Step 2.3: Verify Frontend Structure
Your `/public_html/sdev/` should now contain:
```
/public_html/sdev/
├── .htaccess          ← Important for routing
├── index.html         ← Main page
├── 200.html
├── 404.html
├── _nuxt/             ← JavaScript & CSS
│   ├── *.js files
│   └── *.css files
├── images/            ← Image assets
└── _payload.json
```

### Step 2.4: Test Frontend (Initial)
1. Visit: `https://sdev.apratifoods.asia`
2. You should see the website loading (images may be broken - that's OK for now)
3. Check browser console (F12) - you'll see API errors (expected, backend not setup yet)

---

## 🔧 **PART 3: UPLOAD & CONFIGURE BACKEND**

### Step 3.1: Create Backend Directory
1. In cPanel File Manager
2. Go to `/home/yourusername/` (root, NOT public_html)
3. Click **"+ Folder"** button
4. Create folder: `aprati_backend`
5. Enter that folder

### Step 3.2: Upload Backend Files
**Option A: Upload Zip (if you have it)**
1. Upload `aprati_backend.zip` to `/home/yourusername/aprati_backend/`
2. Extract it
3. Delete the zip

**Option B: Upload Folder via FTP (Recommended for large files)**
1. Use FileZilla or any FTP client
2. Connect to your cPanel (get FTP credentials from cPanel → FTP Accounts)
3. Upload entire `aprati_backend` folder to `/home/yourusername/`

### Step 3.3: Set File Permissions
1. In File Manager, select these folders in `aprati_backend`:
   - `storage/`
   - `bootstrap/cache/`
2. Right-click → **"Change Permissions"**
3. Set to: **755** (or check: Read, Write, Execute for owner; Read, Execute for others)
4. Check **"Recurse into subdirectories"**
5. Click **"Change Permissions"**

### Step 3.4: Create Symbolic Link for Storage
1. In cPanel, go to **"Terminal"** (or use SSH)
2. Run these commands:
```bash
cd ~/aprati_backend
php artisan storage:link
```
3. This creates: `public/storage` → `storage/app/public`

---

## 🗄️ **PART 4: SETUP DATABASE**

### Step 4.1: Create MySQL Database
1. In cPanel, go to **"MySQL Databases"**
2. Under "Create New Database":
   - Database Name: `aprati_web` (or `apratifoods_aprati`)
   - Click **"Create Database"**
3. **WRITE DOWN** the full database name (e.g., `username_aprati_web`)

### Step 4.2: Create Database User
1. Still in MySQL Databases
2. Under "MySQL Users" → "Add New User":
   - Username: `aprati_user`
   - Password: Generate a strong password → **SAVE THIS PASSWORD**
   - Click **"Create User"**

### Step 4.3: Assign User to Database
1. Under "Add User To Database":
   - User: Select `aprati_user`
   - Database: Select `aprati_web`
   - Click **"Add"**
2. On privileges page, check **"ALL PRIVILEGES"**
3. Click **"Make Changes"**

### Step 4.4: Import Database (if you have a backup)
1. In cPanel, go to **"phpMyAdmin"**
2. Select your database (`username_aprati_web`)
3. Click **"Import"** tab
4. Choose your SQL backup file
5. Click **"Go"** to import

**OR** Run migrations (if no backup):
```bash
cd ~/aprati_backend
php artisan migrate:fresh --seed
```

---

## ⚙️ **PART 5: CONFIGURE BACKEND .ENV FILE**

### Step 5.1: Edit .env File
1. In File Manager, go to `/home/yourusername/aprati_backend/`
2. Find `.env` file (enable "Show Hidden Files" if needed)
3. Right-click → **"Edit"**
4. Update these values:

```env
APP_NAME="Aprati Foods (Cambodia) Ltd"
APP_ENV=production
APP_KEY=base64:YOUR_EXISTING_KEY_HERE  # DON'T CHANGE THIS
APP_DEBUG=false
APP_URL=https://sdev.apratifoods.asia

# Database (UPDATE THESE)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=username_aprati_web    # ← Your full database name
DB_USERNAME=username_aprati_user   # ← Your database user
DB_PASSWORD=your_database_password # ← Password you created

# Session & Cache
SESSION_DRIVER=database
SESSION_DOMAIN=.apratifoods.asia

# CORS & Sanctum (Already configured)
SANCTUM_STATEFUL_DOMAINS=sdev.apratifoods.asia,*.apratifoods.asia,localhost:3000,localhost:3001
CORS_ALLOWED_ORIGINS=https://sdev.apratifoods.asia,https://apratifoods.asia,https://www.apratifoods.asia
```

5. Click **"Save Changes"**

### Step 5.2: Generate Application Key (if needed)
```bash
cd ~/aprati_backend
php artisan key:generate
```

---

## 🔗 **PART 6: EXPOSE BACKEND API**

You need to make the backend accessible at: `https://sdev.apratifoods.asia/api`

### Option A: Subdomain (Recommended)
1. Create subdomain: `api.apratifoods.asia` pointing to `/home/yourusername/aprati_backend/public`
2. Update frontend to use: `https://api.apratifoods.asia`

### Option B: Backend in Subdirectory (Current Setup)
1. Create folder: `/public_html/sdev/api/`
2. In Terminal:
```bash
# Create symbolic link
ln -s ~/aprati_backend/public ~/public_html/sdev/api
```

### Option C: .htaccess Rewrite (Easier)
1. Edit `/public_html/sdev/.htaccess`
2. Add BEFORE existing rules:
```apache
# Backend API proxy
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ /home/yourusername/aprati_backend/public/$1 [L,QSA]
```

---

## 🚀 **PART 7: FINAL CONFIGURATION**

### Step 7.1: Clear Laravel Cache
In Terminal:
```bash
cd ~/aprati_backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize
```

### Step 7.2: Set Up Admin User
Run the reset script (if admin doesn't exist):
```bash
cd ~/aprati_backend
php reset-admin.php
```
This creates: `admin@aprati.com` / `password123`

---

## ✅ **PART 8: TESTING**

### Test 8.1: Frontend Homepage
1. Visit: `https://sdev.apratifoods.asia`
2. Should load without errors
3. Hero image should display
4. Check browser console (F12) - should show no CORS errors

### Test 8.2: Backend API
1. Visit: `https://sdev.apratifoods.asia/api/brands`
2. Should return JSON: `{"status":"success","data":{"brands":[...]}}`
3. If 404 error, backend path is wrong

### Test 8.3: Admin Login
1. Visit: `https://sdev.apratifoods.asia/admin-access`
2. Login: `admin@aprati.com` / `password123`
3. Should redirect to admin dashboard
4. Check if products/brands load

### Test 8.4: Image Upload
1. Login as admin
2. Try uploading a product image
3. Verify image displays on frontend

---

## 🐛 **TROUBLESHOOTING COMMON ISSUES**

### Issue 1: "500 Internal Server Error"
**Solution:**
1. Check `.htaccess` syntax in `/public_html/sdev/`
2. Check file permissions (755 for folders, 644 for files)
3. Check error logs: cPanel → **Errors** → **Error Log**

### Issue 2: "CORS Error" in Browser Console
**Solution:**
1. Verify `.env` has correct `CORS_ALLOWED_ORIGINS`
2. Check `app/Http/Middleware/CorsMiddleware.php` includes your domain
3. Clear Laravel cache: `php artisan config:clear`

### Issue 3: API Returns 404
**Solution:**
1. Backend path is incorrect
2. Check symbolic link: `ls -la ~/public_html/sdev/api`
3. Try direct backend URL test

### Issue 4: Images Not Loading
**Solution:**
1. Check storage symlink: `ls -la ~/aprati_backend/public/storage`
2. Run: `php artisan storage:link`
3. Verify file permissions on `storage/` folder (755)
4. Check if images exist in: `storage/app/public/`

### Issue 5: Database Connection Error
**Solution:**
1. Verify database credentials in `.env`
2. Test connection in phpMyAdmin
3. Check database name format: `username_dbname`
4. Ensure user has ALL PRIVILEGES

### Issue 6: Admin Login Fails
**Solution:**
1. Clear cookies and cache
2. Check browser console for errors
3. Verify API endpoint: `https://sdev.apratifoods.asia/api/login`
4. Test with: `php reset-admin.php`

---

## 📊 **PART 9: MONITORING & MAINTENANCE**

### Daily Checks
- Check error logs: cPanel → **Errors**
- Monitor disk space: cPanel → **Disk Usage**
- Check SSL expiry: cPanel → **SSL/TLS Status**

### Weekly Maintenance
```bash
# Clear old logs
php artisan log:clear

# Clear expired sessions
php artisan session:clear

# Optimize application
php artisan optimize
```

### Backup (Important!)
1. **Database Backup:**
   - cPanel → **phpMyAdmin** → Export database weekly
2. **File Backup:**
   - cPanel → **Backup Wizard** → Download full backup monthly
3. **Store backups offsite** (Google Drive, Dropbox, etc.)

---

## 📞 **NEED HELP?**

### Check These First:
1. Error logs: `/home/yourusername/aprati_backend/storage/logs/laravel.log`
2. Browser console (F12 → Console tab)
3. Network tab (F12 → Network tab) to see failed requests

### Important URLs:
- Frontend: `https://sdev.apratifoods.asia`
- Admin: `https://sdev.apratifoods.asia/admin-access`
- API: `https://sdev.apratifoods.asia/api/brands`

### Admin Credentials:
- Email: `admin@aprati.com`
- Password: `password123`
- **⚠️ CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN!**

---

## ✨ **YOUR DEPLOYMENT IS COMPLETE!**

Your website should now be live at: **https://sdev.apratifoods.asia**

Good luck! 🎉
