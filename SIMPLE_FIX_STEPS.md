# ✅ Simple Fix - Copy Files to Web Root

## Stop fighting with .htaccess rewrites. Just copy 2 files:

### Step 1: Copy index.php
**From:** `/home/apratifoodscom/aprati_backend/public/index.php`  
**To:** `/home/apratifoodscom/public_html/sdev.apratifoods.asia/index.php`

In cPanel:
1. Navigate to `/home/apratifoodscom/aprati_backend/public/`
2. Find `index.php`
3. Right-click → Copy
4. Navigate to `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`
5. Right-click → Paste

---

### Step 2: Copy .htaccess
**From:** `/home/apratifoodscom/aprati_backend/public/.htaccess`  
**To:** `/home/apratifoodscom/public_html/sdev.apratifoods.asia/.htaccess`

In cPanel:
1. Navigate to `/home/apratifoodscom/aprati_backend/public/`
2. Find `.htaccess` (enable "Show Hidden Files" if needed)
3. Right-click → Copy
4. Navigate to `/home/apratifoodscom/public_html/sdev.apratifoods.asia/`
5. Right-click → Paste (overwrite if exists)

---

### Step 3: Test
Visit: `https://sdev.apratifoods.asia/api/brands`

**Expected:** JSON response with brands data

---

## Why This Works
- Your backend index.php already has multi-path detection
- It will automatically find the Laravel installation
- No complex .htaccess rewrites needed
- Backend files stay organized in aprati_backend folder

---

## If you still see 404 or errors:
1. Visit: `https://sdev.apratifoods.asia/check-errors.php`
2. Tell me what error message you see
3. We'll fix the paths in index.php if needed
