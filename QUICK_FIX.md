# ⚡ Quick Fix - API 500 Error

## 🎯 The Issue
- Frontend: ✅ Configured correctly
- Backend API: ❌ Returns 500 error

## 🚀 Quick Fix (2 Minutes)

### Step 1: Upload Files
Upload these 2 files to `https://sdev.apratifoods.asia/`:
1. `diagnose-api-error.php`
2. `run-migrations-secure.php`

### Step 2: Diagnose
Visit: `https://sdev.apratifoods.asia/diagnose-api-error.php?password=aprati2025secure`

Look at **Step 5** - API Endpoint Test

### Step 3: Fix
Visit: `https://sdev.apratifoods.asia/run-migrations-secure.php?password=aprati2025secure`

Click: **"Run Pending Migrations"**

### Step 4: Verify
Visit: `https://sdev.apratifoods.asia/api/brands`

Should see JSON: `{"success":true,"data":[...]}`

## ✅ Done!
Your frontend will now connect to the API successfully.

---

## 📁 Files Created

1. **FRONTEND_API_CONNECTION_REPORT.md** - Detailed analysis and fix guide
2. **BACKEND_DIAGNOSIS_AND_FIX.md** - Backend troubleshooting guide
3. **diagnose-api-error.php** - Upload to production for diagnostics
4. **run-migrations-secure.php** - Upload to production to run migrations

## 🔑 Password
All tools use: `aprati2025secure`

## 🛡️ Security
After fixing, delete or rename the diagnostic files!
