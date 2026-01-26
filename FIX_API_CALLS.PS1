#!/usr/bin/env pwsh
# FIX_API_CALLS.PS1 - Fix API prefix errors in frontend
# This script fixes all direct $fetch calls to use the useApi composable

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🔧 Fixing API Prefix Errors" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
$frontendDir = "D:\xammp\htdocs\aprati_web_backup\aprati_frontend"
$indexVueFile = Join-Path $frontendDir "app\pages\index.vue"

if (-Not (Test-Path $indexVueFile)) {
    Write-Host "❌ Error: index.vue not found at $indexVueFile" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Found index.vue" -ForegroundColor Green
Write-Host "📝 Reading file..." -ForegroundColor Yellow

# Read the file
$content = Get-Content $indexVueFile -Raw

# Backup original file
$backupFile = "$indexVueFile.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Copy-Item $indexVueFile $backupFile
Write-Host "💾 Backup created: $backupFile" -ForegroundColor Green

# Fix 1: Replace direct $fetch calls with useApi
Write-Host ""
Write-Host "🔧 Fixing API calls..." -ForegroundColor Yellow

# Pattern replacements
$fixes = @(
    @{
        Pattern = 'const response = await \$fetch\(`\$\{runtimeConfig\.public\.apiBase\}/information-sections\?t=\$\{Date\.now\(\)\}`, \{'
        Replacement = 'const api = useApi(); const response = await api.request(''/information-sections?t=${Date.now()}'', {'
        Description = "Information sections API call"
    },
    @{
        Pattern = 'const response = await \$fetch\(`\$\{runtimeConfig\.public\.apiBase\}/brands\?t=\$\{Date\.now\(\)\}`, \{'
        Replacement = 'const api = useApi(); const response = await api.request(''/brands?t=${Date.now()}'', {'
        Description = "Brands API call"
    },
    @{
        Pattern = 'const productsResponse = await \$fetch\(`\$\{runtimeConfig\.public\.apiBase\}/brands/\$\{brand\.slug\}/products\?active=1&t=\$\{Date\.now\(\)\}`, \{'
        Replacement = 'const api = useApi(); const productsResponse = await api.request(`/brands/${brand.slug}/products?active=1&t=${Date.now()}`, {'
        Description = "Brand products API call"
    },
    @{
        Pattern = 'const response = await \$fetch\(`\$\{runtimeConfig\.public\.apiBase\}/hero-image`, \{'
        Replacement = 'const api = useApi(); const response = await api.request(''/hero-image'', {'
        Description = "Hero image API call"
    },
    @{
        Pattern = 'const response = await \$fetch\(`\$\{runtimeConfig\.public\.apiBase\}/hero-content`, \{'
        Replacement = 'const api = useApi(); const response = await api.request(''/hero-content'', {'
        Description = "Hero content API call"
    }
)

$fixedCount = 0
foreach ($fix in $fixes) {
    if ($content -match [regex]::Escape($fix.Pattern)) {
        Write-Host "  ✅ Fixing: $($fix.Description)" -ForegroundColor Green
        $content = $content -replace [regex]::Escape($fix.Pattern), $fix.Replacement
        $fixedCount++
    } else {
        Write-Host "  ℹ️  Pattern not found: $($fix.Description)" -ForegroundColor Gray
    }
}

# Write the fixed content back
Set-Content $indexVueFile -Value $content -NoNewline
Write-Host ""
Write-Host "✅ Fixed $fixedCount API calls" -ForegroundColor Green

# Now rebuild
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🏗️  Rebuilding Frontend" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $frontendDir

Write-Host "📦 Running npm run generate..." -ForegroundColor Yellow
$buildResult = npm run generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    # Check output
    $outputDir = "..\aprati_backend\.output\public"
    if (Test-Path $outputDir) {
        Write-Host ""
        Write-Host "📁 Build output created at: $outputDir" -ForegroundColor Green
        
        # List JS files
        Write-Host ""
        Write-Host "📄 Generated JavaScript files:" -ForegroundColor Cyan
        Get-ChildItem -Path "$outputDir\_nuxt" -Filter "*.js" -ErrorAction SilentlyContinue | 
            Select-Object -First 10 | 
            ForEach-Object {
                $size = [math]::Round($_.Length / 1KB, 2)
                Write-Host "   - $($_.Name) ($size KB)" -ForegroundColor Gray
            }
    }
    
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "✅ FIX COMPLETE!" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📤 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Upload files from: $outputDir" -ForegroundColor White
    Write-Host "2. Destination: /home/apratifoodscom/public_html/sdev.apratifoods.asia/" -ForegroundColor White
    Write-Host "3. Test in incognito mode: https://sdev.apratifoods.asia/" -ForegroundColor White
    Write-Host ""
    Write-Host "🔍 Expected behavior:" -ForegroundColor Yellow
    Write-Host "   All API calls should now use /api prefix:" -ForegroundColor White
    Write-Host "   ✅ https://sdev.apratifoods.asia/api/hero-content" -ForegroundColor Green
    Write-Host "   ✅ https://sdev.apratifoods.asia/api/footer-settings" -ForegroundColor Green
    Write-Host "   ✅ https://sdev.apratifoods.asia/api/header-settings" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host "   Check the error messages above for details." -ForegroundColor Yellow
    Write-Host "   You can restore the backup from: $backupFile" -ForegroundColor Yellow
    exit 1
}
