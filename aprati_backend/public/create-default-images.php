<?php
// Create default placeholder images by copying existing brand logo

$laravelRoot = '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend';
$imagesDir = $laravelRoot . '/public/images';

// Create images directory if it doesn't exist
if (!is_dir($imagesDir)) {
    mkdir($imagesDir, 0755, true);
}

// Copy a brand logo as default-brand.png
$sourceBrand = $laravelRoot . '/public/storage/brands/logos/S2BgCRhxQEjsWVRwISkaoOE6eVEEqKPYnK6CdmFp.png';
$destBrand = $imagesDir . '/default-brand.png';

if (file_exists($sourceBrand)) {
    copy($sourceBrand, $destBrand);
    echo "✅ Created default-brand.png<br>";
} else {
    echo "❌ Source brand logo not found<br>";
}

// Copy same for product default
$destProduct = $imagesDir . '/default-product.png';
copy($sourceBrand, $destProduct);
echo "✅ Created default-product.png<br>";

echo "<br><strong>Test URLs:</strong><br>";
echo "<a href='/images/default-brand.png'>View default-brand.png</a><br>";
echo "<a href='/images/default-product.png'>View default-product.png</a><br>";

echo "<br><strong>Now refresh your test page!</strong>";
?>
