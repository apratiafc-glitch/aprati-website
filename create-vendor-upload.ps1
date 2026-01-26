# Create vendor.zip for upload to server
# This will create a ZIP file of your vendor folder

$vendorPath = "D:\xammp\htdocs\aprati_web_backup\aprati_backend\vendor"
$zipPath = "D:\xammp\htdocs\aprati_web_backup\vendor.zip"

Write-Host "Creating vendor.zip..." -ForegroundColor Cyan
Write-Host "Source: $vendorPath" -ForegroundColor Yellow
Write-Host "Output: $zipPath" -ForegroundColor Yellow

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
    Write-Host "Deleted existing vendor.zip" -ForegroundColor Yellow
}

# Create ZIP
Compress-Archive -Path "$vendorPath\*" -DestinationPath $zipPath -CompressionLevel Optimal

$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host "`n✅ Created vendor.zip ($([math]::Round($zipSize, 2)) MB)" -ForegroundColor Green

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Upload vendor.zip to cPanel" -ForegroundColor White
Write-Host "2. Extract to: /home/apratifoodscom/public_html/sdev.apratifoods.asia/../vendor" -ForegroundColor White
Write-Host "3. Test: https://sdev.apratifoods.asia/api/brands" -ForegroundColor White
