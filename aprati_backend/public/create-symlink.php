<?php
// Create symbolic link to backend public folder
// Visit: https://sdev.apratifoods.asia/create-symlink.php?key=aprati2025

if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2025') {
    die('Access denied. Add ?key=aprati2025 to URL');
}

$target = '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend/public';
$link = '/home/apratifoodscom/public_html/sdev.apratifoods.asia/api';

echo "<pre>";
echo "Creating symbolic link...\n\n";
echo "Target: $target\n";
echo "Link: $link\n\n";

if (file_exists($link)) {
    echo "⚠️ Link already exists. Removing old link...\n";
    unlink($link);
}

if (symlink($target, $link)) {
    echo "✅ SUCCESS! Symbolic link created.\n\n";
    echo "Now your API will work at:\n";
    echo "https://sdev.apratifoods.asia/api/brands\n";
} else {
    echo "❌ FAILED to create symbolic link.\n\n";
    echo "Try manual approach:\n";
    echo "1. Use cPanel Terminal (if available)\n";
    echo "2. Run: ln -s $target $link\n";
}

echo "</pre>";
?>
