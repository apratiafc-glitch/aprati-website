<?php
/**
 * Check Missing Images
 * Checks which images from API exist and which are missing
 * Access: https://sdev.apratifoods.asia/check-missing-images.php
 */

header('Content-Type: text/html; charset=utf-8');

// Find Laravel root
$possiblePaths = [
    __DIR__ . '/aprati_backend',
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
];

$laravelRoot = null;
foreach ($possiblePaths as $path) {
    if (file_exists($path . '/vendor/autoload.php')) {
        $laravelRoot = realpath($path);
        break;
    }
}

if (!$laravelRoot) {
    die('Laravel backend not found');
}

$storagePublicPath = $laravelRoot . '/storage/app/public';
$storageLinkPath = __DIR__ . '/storage';

// Get API data
$apiUrl = 'https://sdev.apratifoods.asia/api/brands';
$apiData = @file_get_contents($apiUrl);
$brands = [];

if ($apiData) {
    $json = json_decode($apiData, true);
    if (isset($json['data']['brands'])) {
        $brands = $json['data']['brands'];
    }
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Missing Images Checker</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto;
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); 
        }
        h1 { color: #1e293b; margin-bottom: 20px; }
        h2 { color: #475569; margin: 25px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
        .success { background: #d1fae5; color: #065f46; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #10b981; }
        .error { background: #fee2e2; color: #991b1b; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #dc2626; }
        .warning { background: #fef3c7; color: #92400e; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
        .info { background: #dbeafe; color: #1e40af; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6; }
        code { background: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 13px; }
        .image-check {
            display: flex;
            align-items: center;
            padding: 15px;
            margin: 10px 0;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #cbd5e1;
        }
        .image-check.exists { border-left-color: #10b981; background: #f0fdf4; }
        .image-check.missing { border-left-color: #dc2626; background: #fef2f2; }
        .image-check img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            margin-right: 15px;
            border: 2px solid #ddd;
            border-radius: 5px;
            background: white;
        }
        .image-check .info-box { flex: 1; }
        .image-check .status {
            font-size: 24px;
            margin-right: 15px;
        }
        .brand-section {
            margin: 20px 0;
            padding: 20px;
            background: #f8fafc;
            border-radius: 10px;
        }
        .stats {
            display: flex;
            gap: 20px;
            margin: 20px 0;
        }
        .stat-box {
            flex: 1;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-box.total { background: #dbeafe; color: #1e40af; }
        .stat-box.found { background: #d1fae5; color: #065f46; }
        .stat-box.missing { background: #fee2e2; color: #991b1b; }
        .stat-box .number { font-size: 36px; font-weight: bold; margin: 10px 0; }
        .stat-box .label { font-size: 14px; font-weight: 600; }
        ul { margin-left: 20px; line-height: 1.8; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🖼️ Missing Images Checker</h1>
        <p style="color: #64748b; margin-bottom: 20px;">Checking all images from API response</p>

<?php

// Check symlink
$symlinkExists = is_link($storageLinkPath);
$symlinkCorrect = false;

if ($symlinkExists) {
    $target = readlink($storageLinkPath);
    $symlinkCorrect = (realpath($target) === realpath($storagePublicPath));
}

echo '<h2>🔗 Storage Symlink Status</h2>';
if (!$symlinkExists) {
    echo '<div class="error">❌ <strong>Storage symlink NOT created!</strong><br>';
    echo 'This is why images don\'t load. Create it first:<br>';
    echo '<code>ln -s ' . htmlspecialchars($storagePublicPath) . ' ' . htmlspecialchars($storageLinkPath) . '</code><br>';
    echo 'Or visit: <a href="check-and-fix-storage.php?password=aprati2025secure">Storage Fix Tool</a>';
    echo '</div>';
} elseif (!$symlinkCorrect) {
    echo '<div class="warning">⚠️ Symlink exists but points to wrong location</div>';
} else {
    echo '<div class="success">✅ Storage symlink correctly configured</div>';
}

// Check images
$totalImages = 0;
$existingImages = 0;
$missingImages = 0;
$missingFiles = [];

echo '<h2>📊 Image Statistics</h2>';

if (empty($brands)) {
    echo '<div class="error">❌ Could not fetch brands from API</div>';
} else {
    foreach ($brands as $brand) {
        $imagesToCheck = [
            'logo' => $brand['logo'],
            'cover' => $brand['cover_image']
        ];
        
        foreach ($imagesToCheck as $type => $path) {
            if ($path) {
                $totalImages++;
                $fullPath = $storagePublicPath . '/' . $path;
                $exists = file_exists($fullPath);
                
                if ($exists) {
                    $existingImages++;
                } else {
                    $missingImages++;
                    $missingFiles[] = [
                        'brand' => $brand['name'],
                        'type' => $type,
                        'path' => $path,
                        'full_path' => $fullPath,
                        'url' => $brand[$type . '_url']
                    ];
                }
            }
        }
    }
    
    echo '<div class="stats">';
    echo '<div class="stat-box total"><div class="number">' . $totalImages . '</div><div class="label">Total Images</div></div>';
    echo '<div class="stat-box found"><div class="number">' . $existingImages . '</div><div class="label">Found on Disk</div></div>';
    echo '<div class="stat-box missing"><div class="number">' . $missingImages . '</div><div class="label">Missing Files</div></div>';
    echo '</div>';
    
    if ($missingImages > 0) {
        echo '<div class="error">';
        echo '<strong>❌ Missing ' . $missingImages . ' Image File(s):</strong><br>';
        echo 'These files exist in the database but are missing from disk:<ul>';
        foreach ($missingFiles as $file) {
            echo '<li><strong>' . htmlspecialchars($file['brand']) . ' ' . ucfirst($file['type']) . ':</strong> <code>' . htmlspecialchars($file['path']) . '</code></li>';
        }
        echo '</ul>';
        echo '<br><strong>Solution:</strong> Upload these images from your local <code>aprati_backend/storage/app/public/</code> to production';
        echo '</div>';
    }
    
    // Show detailed check for each brand
    echo '<h2>🔍 Detailed Image Check by Brand</h2>';
    
    foreach ($brands as $brand) {
        echo '<div class="brand-section">';
        echo '<h3 style="margin-bottom: 15px;">' . htmlspecialchars($brand['name']) . '</h3>';
        
        // Check logo
        if ($brand['logo']) {
            $logoPath = $storagePublicPath . '/' . $brand['logo'];
            $logoExists = file_exists($logoPath);
            $logoUrl = $brand['logo_url'];
            
            echo '<div class="image-check ' . ($logoExists ? 'exists' : 'missing') . '">';
            echo '<span class="status">' . ($logoExists ? '✅' : '❌') . '</span>';
            if ($logoExists && $symlinkCorrect) {
                echo '<img src="' . htmlspecialchars($logoUrl) . '" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22>❌</text></svg>\'">';
            } else {
                echo '<div style="width: 80px; height: 80px; margin-right: 15px; background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 24px;">❌</div>';
            }
            echo '<div class="info-box">';
            echo '<strong>Logo ' . ($logoExists ? '(Found)' : '(MISSING)') . '</strong><br>';
            echo '<code>' . htmlspecialchars($brand['logo']) . '</code><br>';
            if (!$logoExists) {
                echo '<span style="color: #dc2626; font-size: 12px;">File does not exist on disk</span>';
            }
            echo '</div>';
            echo '</div>';
        }
        
        // Check cover
        if ($brand['cover_image']) {
            $coverPath = $storagePublicPath . '/' . $brand['cover_image'];
            $coverExists = file_exists($coverPath);
            $coverUrl = $brand['cover_image_url'];
            
            echo '<div class="image-check ' . ($coverExists ? 'exists' : 'missing') . '">';
            echo '<span class="status">' . ($coverExists ? '✅' : '❌') . '</span>';
            if ($coverExists && $symlinkCorrect) {
                echo '<img src="' . htmlspecialchars($coverUrl) . '" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22>❌</text></svg>\'">';
            } else {
                echo '<div style="width: 80px; height: 80px; margin-right: 15px; background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 24px;">❌</div>';
            }
            echo '<div class="info-box">';
            echo '<strong>Cover Image ' . ($coverExists ? '(Found)' : '(MISSING)') . '</strong><br>';
            echo '<code>' . htmlspecialchars($brand['cover_image']) . '</code><br>';
            if (!$coverExists) {
                echo '<span style="color: #dc2626; font-size: 12px;">File does not exist on disk</span>';
            }
            echo '</div>';
            echo '</div>';
        }
        
        echo '</div>';
    }
}

?>

        <h2>🎯 Action Required</h2>
        <?php if ($missingImages > 0): ?>
            <div class="warning">
                <strong>Upload Missing Images:</strong><br>
                <ol>
                    <li>Go to your local: <code>d:\xammp\htdocs\aprati_web_backup\aprati_backend\storage\app\public\</code></li>
                    <li>Copy the <code>brands</code> folder</li>
                    <li>Upload to: <code>/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend/storage/app/public/</code></li>
                </ol>
            </div>
        <?php endif; ?>
        
        <?php if (!$symlinkExists): ?>
            <div class="error">
                <strong>Create Storage Symlink:</strong><br>
                <a href="check-and-fix-storage.php?password=aprati2025secure" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; margin: 10px 0;">
                    🔧 Auto-Fix Storage Symlink
                </a>
            </div>
        <?php endif; ?>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 13px;">
            <strong>Storage Path:</strong> <code><?php echo htmlspecialchars($storagePublicPath); ?></code><br>
            <strong>Symlink Path:</strong> <code><?php echo htmlspecialchars($storageLinkPath); ?></code>
        </div>
    </div>
</body>
</html>
