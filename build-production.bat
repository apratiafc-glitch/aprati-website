@echo off
echo 🚀 Building Aprati Foods Website for Single Domain Deployment
echo ============================================================
echo.

REM Step 1: Build Nuxt frontend
echo 📦 Step 1: Building Nuxt frontend...
cd aprati_frontend
call npm run generate

if errorlevel 1 (
    echo ❌ Frontend build failed!
    exit /b 1
)

echo ✅ Frontend built successfully!
echo.

REM Step 2: Copy built files to Laravel public directory
echo 📋 Step 2: Copying frontend files to backend public directory...

REM Copy static assets directly to public root
REM Copy _nuxt folder (CSS, JS, fonts, etc.)
if exist "..\aprati_backend\.output\public\_nuxt" (
    xcopy /E /I /Y "..\aprati_backend\.output\public\_nuxt\*" "..\aprati_backend\public\_nuxt\"
)

REM Copy other folders (images, etc.) 
for /d %%G in ("..\aprati_backend\.output\public\*") do (
    if not "%%~nxG"=="_nuxt" (
        xcopy /E /I /Y "%%G\*" "..\aprati_backend\public\%%~nxG\"
    )
)

REM Copy HTML files to a frontend subdirectory for Laravel to serve
if not exist "..\aprati_backend\public\frontend" mkdir "..\aprati_backend\public\frontend"
xcopy /Y "..\aprati_backend\.output\public\*.html" "..\aprati_backend\public\frontend\"
xcopy /Y "..\aprati_backend\.output\public\*.json" "..\aprati_backend\public\frontend\" 2>nul

echo ✅ Files copied successfully!
echo.

echo ============================================================
echo 🎉 Deployment build completed successfully!
echo.
echo 📁 Frontend files:
echo    - HTML files: aprati_backend\public\frontend\
echo    - Static assets: aprati_backend\public\_nuxt\
echo 🌐 Your app will run on a single domain:
echo    - Frontend: https://yourdomain.com
echo    - API: https://yourdomain.com/api
echo    - Assets: https://yourdomain.com/_nuxt/*
echo.
echo Next steps:
echo 1. Upload aprati_backend folder to your server
echo 2. Configure your web server (Apache/Nginx) to point to aprati_backend/public
echo 3. Set up your .env file on the server
echo 4. Run: php artisan config:cache
echo 5. Run: php artisan route:cache
echo.

cd ..
