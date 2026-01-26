@echo off
REM API Redirect Fix - Deployment Script
REM This script packages the fixed .htaccess for upload to production

echo ================================================
echo   API REDIRECT FIX - DEPLOYMENT PACKAGE
echo ================================================
echo.

set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set PACKAGE_NAME=api-redirect-fix-%TIMESTAMP%.zip

echo Creating deployment package...
echo.

REM Create temp directory
if not exist "deployment_temp" mkdir deployment_temp

REM Copy files to deploy
echo Copying .htaccess...
copy "aprati_backend\public\.htaccess" "deployment_temp\.htaccess"

echo Copying laravel-bootstrap.php...
copy "aprati_backend\public\laravel-bootstrap.php" "deployment_temp\laravel-bootstrap.php"

echo Copying diagnostic tools...
copy "aprati_backend\public\diagnose-api-error.php" "deployment_temp\diagnose-api-error.php"
copy "aprati_backend\public\run-migrations-secure.php" "deployment_temp\run-migrations-secure.php"

REM Create deployment instructions
echo Creating deployment instructions...
(
echo ================================================
echo   API REDIRECT FIX - UPLOAD INSTRUCTIONS
echo ================================================
echo.
echo PROBLEM: API requests redirect to homepage
echo SOLUTION: Updated .htaccess with proper routing
echo.
echo FILES TO UPLOAD:
echo 1. .htaccess - Main routing configuration
echo 2. laravel-bootstrap.php - Laravel bootstrap script
echo 3. diagnose-api-error.php - Diagnostic tool
echo 4. run-migrations-secure.php - Migration runner
echo.
echo UPLOAD TO:
echo /home/apratifoodscom/public_html/sdev.apratifoods.asia/
echo.
echo STEPS:
echo 1. Access cPanel File Manager
echo 2. Navigate to: /public_html/sdev.apratifoods.asia/
echo 3. Backup current .htaccess (rename to .htaccess.backup)
echo 4. Upload all files from this package
echo 5. Test: https://sdev.apratifoods.asia/api/brands
echo.
echo EXPECTED RESULT:
echo - Should return JSON data (not redirect to homepage^)
echo - If 500 error, run: diagnose-api-error.php
echo - If migrations needed, run: run-migrations-secure.php
echo.
echo PASSWORD FOR TOOLS: aprati2025secure
echo.
echo IMPORTANT:
echo - After fixing, delete or rename diagnostic files
echo - Ensure laravel-bootstrap.php can find aprati_backend folder
echo.
echo ================================================
) > "deployment_temp\UPLOAD_INSTRUCTIONS.txt"

REM Create ZIP file using PowerShell
echo.
echo Compressing files...
powershell -Command "Compress-Archive -Path 'deployment_temp\*' -DestinationPath '%PACKAGE_NAME%' -Force"

REM Cleanup
echo Cleaning up...
rmdir /s /q deployment_temp

echo.
echo ================================================
echo   DEPLOYMENT PACKAGE CREATED SUCCESSFULLY!
echo ================================================
echo.
echo Package: %PACKAGE_NAME%
echo Location: %CD%\%PACKAGE_NAME%
echo.
echo NEXT STEPS:
echo 1. Extract %PACKAGE_NAME%
echo 2. Read UPLOAD_INSTRUCTIONS.txt
echo 3. Upload files via cPanel File Manager
echo 4. Test API: https://sdev.apratifoods.asia/api/brands
echo.
echo ================================================
echo.
pause
