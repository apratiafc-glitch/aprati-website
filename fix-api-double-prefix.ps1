# Fix double /api/ prefix issue in useApi.js
# Problem: apiBase = '.../api' + endpoint = '/api/brands' = '/api/api/brands' (WRONG)
# Solution: Remove /api/ prefix from all endpoints

$filePath = "d:\xammp\htdocs\aprati_web_backup\aprati_frontend\app\composables\useApi.js"

Write-Host "Reading useApi.js..." -ForegroundColor Cyan
$content = Get-Content $filePath -Raw

# Backup original file
$backupPath = "$filePath.before-double-prefix-fix"
Copy-Item $filePath $backupPath
Write-Host "✅ Backup created: $backupPath" -ForegroundColor Green

# Replace all /api/ prefixes in endpoint strings
# Pattern: '/api/anything' → '/anything'
$replacements = @(
    # Brands endpoints
    @{ From = "request\('/api/admin/brands'"; To = "request('/admin/brands'" }
    @{ From = "request\('/api/brands'"; To = "request('/brands'" }
    @{ From = "request\(`"/api/brands/"; To = "request(`"/brands/" }
    
    # Users endpoints
    @{ From = "request\('/api/users'"; To = "request('/users'" }
    @{ From = "request\(`"/api/users/"; To = "request(`"/users/" }
    
    # Auth endpoints
    @{ From = "request\('/api/login'"; To = "request('/login'" }
    @{ From = "request\('/api/admin/login'"; To = "request('/admin/login'" }
    @{ From = "request\('/api/register'"; To = "request('/register'" }
    @{ From = "request\('/api/logout'"; To = "request('/logout'" }
    @{ From = "request\('/api/me'"; To = "request('/me'" }
    @{ From = "request\('/api/change-password'"; To = "request('/change-password'" }
    @{ From = "request\('/api/forgot-password'"; To = "request('/forgot-password'" }
    @{ From = "request\('/api/reset-password'"; To = "request('/reset-password'" }
    @{ From = "request\('/api/validate-token'"; To = "request('/validate-token'" }
    
    # Products endpoints
    @{ From = "request\('/api/products'"; To = "request('/products'" }
    @{ From = "request\('/api/admin/products'"; To = "request('/admin/products'" }
    @{ From = "request\(`"/api/products/"; To = "request(`"/products/" }
    @{ From = "request\(`"/api/admin/products/"; To = "request(`"/admin/products/" }
    
    # Categories endpoints
    @{ From = "request\('/api/categories'"; To = "request('/categories'" }
    @{ From = "request\('/api/admin/categories'"; To = "request('/admin/categories'" }
    @{ From = "request\(`"/api/categories/"; To = "request(`"/categories/" }
    @{ From = "request\(`"/api/admin/categories/"; To = "request(`"/admin/categories/" }
    
    # Careers endpoints
    @{ From = "request\('/api/careers'"; To = "request('/careers'" }
    @{ From = "request\('/api/admin/careers'"; To = "request('/admin/careers'" }
    @{ From = "request\(`"/api/careers/"; To = "request(`"/careers/" }
    @{ From = "request\(`"/api/admin/careers/"; To = "request(`"/admin/careers/" }
    
    # Job Applications endpoints
    @{ From = "request\(`"/api/careers/`$"; To = "request(`"/careers/`$" }
    @{ From = "request\('/api/admin/job-applications'"; To = "request('/admin/job-applications'" }
    @{ From = "request\(`"/api/admin/job-applications/"; To = "request(`"/admin/job-applications/" }
    
    # Dashboard endpoints
    @{ From = "request\('/api/admin/dashboard'"; To = "request('/admin/dashboard'" }
    @{ From = "request\('/api/admin/visitors'"; To = "request('/admin/visitors'" }
    
    # Management Posts endpoints
    @{ From = "request\('/api/management-posts'"; To = "request('/management-posts'" }
    @{ From = "request\('/api/admin/management-posts'"; To = "request('/admin/management-posts'" }
    @{ From = "request\(`"/api/management-posts/"; To = "request(`"/management-posts/" }
    @{ From = "request\(`"/api/admin/management-posts/"; To = "request(`"/admin/management-posts/" }
    
    # About Content endpoints
    @{ From = "request\('/api/about-content'"; To = "request('/about-content'" }
    @{ From = "request\('/api/admin/about-content'"; To = "request('/admin/about-content'" }
    @{ From = "request\(`"/api/about-content/"; To = "request(`"/about-content/" }
    @{ From = "request\(`"/api/admin/about-content/"; To = "request(`"/admin/about-content/" }
    
    # Privacy Content endpoints
    @{ From = "request\('/api/privacy-content'"; To = "request('/privacy-content'" }
    @{ From = "request\('/api/admin/privacy-content'"; To = "request('/admin/privacy-content'" }
    @{ From = "request\(`"/api/privacy-content/"; To = "request(`"/privacy-content/" }
    @{ From = "request\(`"/api/admin/privacy-content/"; To = "request(`"/admin/privacy-content/" }
    
    # Favicon endpoints
    @{ From = "request\('/api/favicon-settings'"; To = "request('/favicon-settings'" }
    @{ From = "request\('/api/admin/favicon-settings'"; To = "request('/admin/favicon-settings'" }
    
    # Header/Footer Settings endpoints
    @{ From = "request\('/api/header-settings'"; To = "request('/header-settings'" }
    @{ From = "request\('/api/admin/header-settings'"; To = "request('/admin/header-settings'" }
    @{ From = "request\('/api/footer-settings'"; To = "request('/footer-settings'" }
    @{ From = "request\('/api/admin/footer-settings'"; To = "request('/admin/footer-settings'" }
    
    # Information Sections endpoints
    @{ From = "request\('/api/information-sections'"; To = "request('/information-sections'" }
    @{ From = "request\('/api/admin/information-sections'"; To = "request('/admin/information-sections'" }
    @{ From = "request\(`"/api/information-sections/"; To = "request(`"/information-sections/" }
    @{ From = "request\(`"/api/admin/information-sections/"; To = "request(`"/admin/information-sections/" }
    
    # Hero Content/Images endpoints
    @{ From = "request\('/api/admin/hero-content'"; To = "request('/admin/hero-content'" }
    @{ From = "request\('/api/admin/hero-images'"; To = "request('/admin/hero-images'" }
    @{ From = "request\(`"/api/admin/hero-"; To = "request(`"/admin/hero-" }
    
    # Admin Profile Image
    @{ From = "request\('/api/admin-profile-image'"; To = "request('/admin-profile-image'" }
)

$changesMade = 0
foreach ($replacement in $replacements) {
    $oldContent = $content
    $content = $content -replace [regex]::Escape($replacement.From), $replacement.To
    if ($oldContent -ne $content) {
        $changesMade++
        Write-Host "  ✓ Fixed: $($replacement.From) → $($replacement.To)" -ForegroundColor Yellow
    }
}

# Save the fixed file
Set-Content $filePath $content -NoNewline

Write-Host "`n✅ Fixed $changesMade endpoint(s) in useApi.js" -ForegroundColor Green
Write-Host "✅ File saved: $filePath" -ForegroundColor Green

# Now rebuild frontend
Write-Host "`n🔨 Rebuilding frontend..." -ForegroundColor Cyan
Set-Location "d:\xammp\htdocs\aprati_web_backup\aprati_frontend"
npm run generate

# Create new package
Write-Host "`n📦 Creating frontend-update.zip..." -ForegroundColor Cyan
Set-Location "d:\xammp\htdocs\aprati_web_backup"
Remove-Item frontend-update.zip -ErrorAction SilentlyContinue
Compress-Archive -Path "aprati_backend\.output\public\*" -DestinationPath "frontend-update.zip"

$zipInfo = Get-Item frontend-update.zip | Select-Object Name, @{N='Size';E={"{0:N2} MB" -f ($_.Length / 1MB)}}
Write-Host "`n✅ Package created:" -ForegroundColor Green
Write-Host "   Name: $($zipInfo.Name)" -ForegroundColor White
Write-Host "   Size: $($zipInfo.Size)" -ForegroundColor White

Write-Host "`n🎉 DONE! Upload frontend-update.zip to your server." -ForegroundColor Green
