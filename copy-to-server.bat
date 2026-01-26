@echo off
echo ============================================
echo Copying Updated Frontend Files to Server
echo ============================================

:: Source: aprati_backend/.output/public/
:: Destination: /home/apratifoodscom/public_html/sdev.apratifoods.asia/

echo.
echo Please upload the following files via cPanel File Manager:
echo.
echo 1. Upload ALL files from:
echo    d:\xammp\htdocs\aprati_web_backup\aprati_backend\.output\public\
echo.
echo 2. Upload to:
echo    /home/apratifoodscom/public_html/sdev.apratifoods.asia/
echo.
echo 3. IMPORTANT: Overwrite existing files when prompted
echo.
echo 4. DO NOT overwrite these files:
echo    - .htaccess (keep the existing one with API routing)
echo    - aprati_backend folder (keep existing)
echo.
echo ============================================
echo Fixed JavaScript Error
echo ============================================
echo.
echo The issue was: response.data.filter is not a function
echo.
echo Fixed in: app/pages/index.vue line 935
echo Changed: Direct .filter() on response.data
echo To: Check if data is array, handle wrapped responses
echo.
echo The fix handles both formats:
echo - Array format: response.data = [...]
echo - Wrapped format: response.data = {sections: [...], data: [...]}
echo.
echo ============================================
pause
