# Laravel File Permissions Guide for cPanel

## 📋 Required Permissions

### Critical Directories (775 - rwxrwxr-x)
These directories MUST be writable for Laravel to function:

```
storage/                    # Main storage directory
├── app/                   # Application storage
│   └── public/           # Public uploads (images, etc.)
├── framework/            # Laravel framework files
│   ├── cache/           # Application cache
│   ├── sessions/        # User sessions
│   └── views/           # Compiled Blade templates
└── logs/                 # Application logs

bootstrap/cache/          # Bootstrap cache files
```

### Public Directory (755 - rwxr-xr-x)
```
public/                   # Web-accessible files
└── storage/             # Symlink to storage/app/public
```

### Critical Files

**`.env` file** → `644` (rw-r--r--)
- Contains database credentials
- Must be readable by PHP

**`artisan` file** → `755` (rwxr-xr-x)  
- Laravel CLI tool
- Needs execute permission

---

## 🔧 Upload This Tool to cPanel

**File:** `fix-permissions.php`  
**Location:** `/public_html/sdev.apratifoods.asia/`

**Access:** https://sdev.apratifoods.asia/fix-permissions.php?password=aprati2025secure

---

## ✅ What the Tool Does

1. **Check Current Permissions** - Shows all file/folder permissions
2. **Identify Issues** - Highlights incorrect permissions
3. **Auto-Fix** - Attempts to fix all permissions automatically
4. **Manual Commands** - Provides SSH commands if auto-fix fails

---

## 🚀 Quick Fix Steps

### Option 1: Use the Web Tool (Easiest)
1. Upload `fix-permissions.php` to your server
2. Access: https://sdev.apratifoods.asia/fix-permissions.php?password=aprati2025secure
3. Click "🔧 Fix All Permissions" button
4. Verify all items show ✅ OK

### Option 2: cPanel File Manager
1. Go to cPanel → File Manager
2. Navigate to `/public_html/aprati_backend/`
3. Right-click `storage` folder → Change Permissions
   - Set to `775`
   - Check "Recurse into subdirectories"
   - Click OK
4. Repeat for `bootstrap/cache` folder

### Option 3: SSH/Terminal (Most Reliable)
```bash
# Connect to your server via SSH
cd /home/apratifoodscom/public_html/aprati_backend

# Fix all permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache
chmod 644 .env
chmod 755 artisan

# If you have permission issues, set ownership
# Replace 'username' with your cPanel username
chown -R username:username storage
chown -R username:username bootstrap/cache
```

---

## ❌ Common Permission Errors

### Error: "The stream or file could not be opened"
**Cause:** Laravel can't write to `storage/logs/`  
**Fix:** Set `storage/logs/` to 775 recursively

### Error: "No application encryption key"
**Cause:** Can't read or write `.env` file  
**Fix:** Set `.env` to 644

### Error: "The bootstrap/cache directory must be present"
**Cause:** Cache directory not writable  
**Fix:** Set `bootstrap/cache/` to 775 recursively

### Error: "Failed to store uploaded file"
**Cause:** Can't write to `storage/app/public/`  
**Fix:** Set `storage/app/public/` to 775 recursively

---

## 📊 Permission Codes Explained

| Code | Binary | Meaning | Who Can... |
|------|--------|---------|-----------|
| 644  | rw-r--r-- | Owner: read+write, Others: read | Owner edits, everyone reads |
| 755  | rwxr-xr-x | Owner: all, Others: read+execute | Owner controls, others access |
| 775  | rwxrwxr-x | Owner+Group: all, Others: read+execute | Full access for owner & group |

### Laravel Recommendations:
- **Directories:** 775 (owner and web server group can write)
- **Files:** 644 (owner can write, others read)
- **Executables:** 755 (owner can write, all can execute)

---

## 🔒 Security Best Practices

### DO:
✅ Set storage directories to 775  
✅ Set .env file to 644  
✅ Keep .env outside public directory  
✅ Delete fix tools after use  

### DON'T:
❌ Never set permissions to 777 (world-writable)  
❌ Don't make .env executable  
❌ Don't expose Laravel root directory to web  
❌ Don't commit .env to version control  

---

## 🎯 Expected File Structure on cPanel

```
/home/apratifoodscom/public_html/
├── sdev.apratifoods.asia/        # Document root (PUBLIC)
│   ├── index.php                 # Laravel entry point
│   ├── .htaccess                 # URL rewriting
│   ├── storage → ../../aprati_backend/storage/app/public  # Symlink
│   ├── _nuxt/                    # Frontend assets
│   └── images/                   # Static images (755)
│
└── aprati_backend/               # Laravel app (PRIVATE)
    ├── app/                      # 755
    ├── bootstrap/cache/          # 775 ← MUST BE WRITABLE
    ├── config/                   # 755
    ├── database/                 # 755
    ├── storage/                  # 775 ← MUST BE WRITABLE
    │   ├── app/public/          # 775 ← MUST BE WRITABLE
    │   ├── framework/           # 775 ← MUST BE WRITABLE
    │   └── logs/                # 775 ← MUST BE WRITABLE
    ├── vendor/                   # 755
    ├── .env                      # 644 ← MUST BE READABLE
    └── artisan                   # 755
```

---

## 🆘 Troubleshooting

### Tool shows "Failed to Fix"
**Cause:** PHP doesn't have permission to change file permissions  
**Solution:** Use SSH/Terminal or cPanel File Manager manually

### Tool can't find Laravel
**Cause:** Files uploaded to wrong directory  
**Solution:** Ensure Laravel is at `/public_html/aprati_backend/`

### Still getting 500 errors after fixing permissions
**Check these:**
1. Database connection (use fix-api-errors.php)
2. Missing vendor directory (run `composer install`)
3. Missing .env file (copy from .env.example)
4. Missing APP_KEY (run `php artisan key:generate`)

---

## 📞 Need More Help?

1. **Check Laravel logs:**  
   `/aprati_backend/storage/logs/laravel.log`

2. **Check PHP error log:**  
   cPanel → Errors → Error Log

3. **Test permissions:**  
   https://sdev.apratifoods.asia/fix-permissions.php?password=aprati2025secure

4. **Run full diagnostic:**  
   https://sdev.apratifoods.asia/fix-api-errors.php?password=aprati2025secure
