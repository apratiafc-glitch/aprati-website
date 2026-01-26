<?php
/**
 * Storage Configuration Checker & Fixer
 * Diagnoses and fixes storage issues for Laravel on cPanel
 * Access: https://sdev.apratifoods.asia/check-and-fix-storage.php
 */

// Simple password protection
$correct_password = 'aprati2025secure';
$provided_password = $_GET['password'] ?? '';

if ($provided_password !== $correct_password) {
    die('
    <!DOCTYPE html>
    <html>
    <head>
        <title>Storage Configuration Checker</title>
        <style>
            body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
            .box { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #1e293b; margin-top: 0; }
            .error { color: #dc2626; background: #fee; padding: 15px; border-radius: 8px; margin: 15px 0; }
            input { padding: 10px; width: 100%; margin: 10px 0; border: 2px solid #ddd; border-radius: 5px; }
            button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%; font-size: 16px; }
            button:hover { background: #1d4ed8; }
        </style>
    </head>
    <body>
        <div class="box">
            <h1>🔍 Storage Configuration Checker</h1>
            <div class="error">❌ Password Required</div>
            <form method="get">
                <input type="password" name="password" placeholder="Enter password" required>
                <button type="submit">Check Storage Configuration</button>
            </form>
        </div>
    </body>
    </html>
    ');
}

$action = $_GET['action'] ?? '';

?>
<!DOCTYPE html>
<html>
<head>
    <title>Storage Configuration Checker</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container { 
            max-width: 1000px; 
            margin: 0 auto;
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); 
        }
        h1 { color: #1e293b; margin-bottom: 10px; }
        h2 { color: #475569; margin: 25px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
        .success { 
            background: #d1fae5; 
            color: #065f46; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 15px 0;
            border-left: 4px solid #10b981;
        }
        .error { 
            background: #fee2e2; 
            color: #991b1b; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 15px 0;
            border-left: 4px solid #dc2626;
        }
        .warning { 
            background: #fef3c7; 
            color: #92400e; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 15px 0;
            border-left: 4px solid #f59e0b;
        }
        .info { 
            background: #dbeafe; 
            color: #1e40af; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 15px 0;
            border-left: 4px solid #3b82f6;
        }
        code { 
            background: #f1f5f9; 
            padding: 3px 8px; 
            border-radius: 4px; 
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
        .check-item {
            padding: 15px;
            margin: 10px 0;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #cbd5e1;
        }
        .check-item.pass { border-left-color: #10b981; }
        .check-item.fail { border-left-color: #dc2626; }
        .check-item.warn { border-left-color: #f59e0b; }
        .icon { font-size: 20px; margin-right: 10px; }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 10px 5px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            font-size: 14px;
        }
        .button:hover { background: #1d4ed8; }
        .button.success { background: #10b981; }
        .button.success:hover { background: #059669; }
        .button.danger { background: #dc2626; }
        .button.danger:hover { background: #b91c1c; }
        pre {
            background: #1e293b;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.6;
        }
        ul { margin-left: 20px; line-height: 1.8; }
        .test-image {
            max-width: 150px;
            max-height: 100px;
            border: 2px solid #ddd;
            border-radius: 5px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Storage Configuration Checker</h1>
        <p style="color: #64748b; margin-bottom: 20px;">Time: <?php echo date('Y-m-d H:i:s'); ?></p>

<?php

// Find Laravel root
$possiblePaths = [
    __DIR__ . '/aprati_backend',
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
    __DIR__ . '/../',
];

$laravelRoot = null;
foreach ($possiblePaths as $path) {
    if (file_exists($path . '/vendor/autoload.php')) {
        $laravelRoot = realpath($path);
        break;
    }
}

if (!$laravelRoot) {
    echo '<div class="error"><strong>❌ Laravel Backend Not Found</strong></div>';
    die();
}

echo '<div class="success">✅ <strong>Laravel Found:</strong> <code>' . htmlspecialchars($laravelRoot) . '</code></div>';

$documentRoot = __DIR__;
$storageLinkPath = $documentRoot . '/storage';
$storagePublicPath = $laravelRoot . '/storage/app/public';
$htaccessPath = $documentRoot . '/.htaccess';

// Check 1: Storage directory exists
echo '<h2>📁 Storage Directory Checks</h2>';

echo '<div class="check-item ' . (is_dir($storagePublicPath) ? 'pass' : 'fail') . '">';
echo '<span class="icon">' . (is_dir($storagePublicPath) ? '✅' : '❌') . '</span>';
echo '<strong>Storage Directory:</strong> <code>' . htmlspecialchars($storagePublicPath) . '</code><br>';
echo is_dir($storagePublicPath) ? 'Directory exists' : 'Directory missing!';
echo '</div>';

// Check 2: Storage symlink
$symlinkExists = file_exists($storageLinkPath) || is_link($storageLinkPath);
$symlinkCorrect = false;

if (is_link($storageLinkPath)) {
    $target = readlink($storageLinkPath);
    $symlinkCorrect = (realpath($target) === realpath($storagePublicPath));
}

echo '<div class="check-item ' . ($symlinkExists && $symlinkCorrect ? 'pass' : 'fail') . '">';
echo '<span class="icon">' . ($symlinkExists && $symlinkCorrect ? '✅' : '❌') . '</span>';
echo '<strong>Storage Symlink:</strong> <code>' . htmlspecialchars($storageLinkPath) . '</code><br>';
if (!$symlinkExists) {
    echo '❌ Symlink does not exist';
} elseif (!$symlinkCorrect) {
    echo '⚠️ Symlink exists but points to wrong location<br>';
    echo 'Points to: <code>' . htmlspecialchars(readlink($storageLinkPath)) . '</code>';
} else {
    echo '✅ Symlink correctly configured';
}
echo '</div>';

// Check 3: Test image files
echo '<h2>🖼️ Image File Tests</h2>';

$brandLogosPath = $storagePublicPath . '/brands/logos';
$testImages = [];

if (is_dir($brandLogosPath)) {
    $files = array_slice(scandir($brandLogosPath), 2, 3);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $testImages[] = $file;
        }
    }
}

if (!empty($testImages)) {
    echo '<div class="info">Found ' . count($testImages) . ' test images</div>';
    
    foreach ($testImages as $image) {
        $imageUrl = 'https://sdev.apratifoods.asia/storage/brands/logos/' . $image;
        $localPath = $storagePublicPath . '/brands/logos/' . $image;
        
        echo '<div class="check-item">';
        echo '<strong>Image:</strong> <code>' . htmlspecialchars($image) . '</code><br>';
        echo '<strong>URL:</strong> <a href="' . htmlspecialchars($imageUrl) . '" target="_blank">' . htmlspecialchars($imageUrl) . '</a><br>';
        echo '<strong>Exists:</strong> ' . (file_exists($localPath) ? '✅ Yes' : '❌ No') . '<br>';
        
        if ($symlinkExists && $symlinkCorrect) {
            echo '<img src="' . htmlspecialchars($imageUrl) . '" class="test-image" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'block\'">';
            echo '<div style="display:none; color: #dc2626;">❌ Image failed to load</div>';
        }
        echo '</div>';
    }
} else {
    echo '<div class="warning">⚠️ No test images found in storage/brands/logos</div>';
}

// Check 4: .htaccess configuration
echo '<h2>⚙️ .htaccess Configuration</h2>';

$htaccessExists = file_exists($htaccessPath);
echo '<div class="check-item ' . ($htaccessExists ? 'pass' : 'fail') . '">';
echo '<span class="icon">' . ($htaccessExists ? '✅' : '❌') . '</span>';
echo '<strong>.htaccess File:</strong> ' . ($htaccessExists ? 'Exists' : 'Missing!');
echo '</div>';

if ($htaccessExists) {
    $htaccessContent = file_get_contents($htaccessPath);
    
    // Check for storage routing issue
    $hasStorageRoute = strpos($htaccessContent, 'RewriteCond %{REQUEST_URI} ^/storage/') !== false;
    
    echo '<div class="check-item ' . (!$hasStorageRoute ? 'pass' : 'fail') . '">';
    echo '<span class="icon">' . (!$hasStorageRoute ? '✅' : '❌') . '</span>';
    echo '<strong>Storage Routing:</strong> ';
    if ($hasStorageRoute) {
        echo '❌ <strong>PROBLEM FOUND!</strong><br>';
        echo 'Your .htaccess is routing /storage/ to Laravel instead of serving files directly.<br>';
        echo 'This prevents images from loading.';
    } else {
        echo '✅ Correctly configured to serve storage files directly';
    }
    echo '</div>';
    
    // Check PHP file handling
    $hasPhpRule = strpos($htaccessContent, '\.php$') !== false;
    
    echo '<div class="check-item ' . ($hasPhpRule ? 'pass' : 'warn') . '">';
    echo '<span class="icon">' . ($hasPhpRule ? '✅' : '⚠️') . '</span>';
    echo '<strong>PHP File Handling:</strong> ';
    echo $hasPhpRule ? '✅ PHP files can execute' : '⚠️ PHP files might redirect to frontend';
    echo '</div>';
}

// Summary and Actions
echo '<h2>🎯 Summary & Actions</h2>';

$issues = [];
if (!is_dir($storagePublicPath)) $issues[] = 'Storage directory missing';
if (!$symlinkExists || !$symlinkCorrect) $issues[] = 'Storage symlink not configured';
if ($htaccessExists && strpos(file_get_contents($htaccessPath), 'RewriteCond %{REQUEST_URI} ^/storage/') !== false) {
    $issues[] = '.htaccess routing /storage/ to Laravel';
}

if (empty($issues)) {
    echo '<div class="success">';
    echo '<strong>🎉 All Checks Passed!</strong><br>';
    echo 'Your storage configuration is correct. Images should load properly.';
    echo '</div>';
    
    echo '<a href="https://sdev.apratifoods.asia/api/brands" class="button success">Test API with Images</a>';
    echo '<a href="https://sdev.apratifoods.asia" class="button">Visit Frontend</a>';
} else {
    echo '<div class="error">';
    echo '<strong>❌ Issues Found:</strong><br><ul>';
    foreach ($issues as $issue) {
        echo '<li>' . htmlspecialchars($issue) . '</li>';
    }
    echo '</ul></div>';
    
    // Action buttons
    if (!$symlinkExists || !$symlinkCorrect) {
        if ($action === 'create-symlink') {
            echo '<div class="info">⏳ Creating storage symlink...</div>';
            
            if (file_exists($storageLinkPath) && !is_link($storageLinkPath)) {
                echo '<div class="error">❌ A file/directory named "storage" already exists. Please remove it manually.</div>';
            } else {
                if (is_link($storageLinkPath)) {
                    unlink($storageLinkPath);
                }
                
                if (@symlink($storagePublicPath, $storageLinkPath)) {
                    echo '<div class="success">✅ Storage symlink created successfully!</div>';
                    echo '<script>setTimeout(function(){ window.location.href = window.location.pathname + "?password=' . urlencode($provided_password) . '"; }, 2000);</script>';
                } else {
                    echo '<div class="error">❌ Failed to create symlink. Your hosting might not support symlinks.</div>';
                }
            }
        } else {
            echo '<a href="?password=' . urlencode($provided_password) . '&action=create-symlink" class="button success">🔗 Create Storage Symlink</a>';
        }
    }
    
    if ($htaccessExists && strpos(file_get_contents($htaccessPath), 'RewriteCond %{REQUEST_URI} ^/storage/') !== false) {
        echo '<div class="warning">';
        echo '<strong>⚠️ .htaccess Needs Update</strong><br>';
        echo 'You need to remove the storage routing rule from your .htaccess file.<br><br>';
        echo '<strong>Current .htaccess has this (REMOVE IT):</strong>';
        echo '<pre># Route storage requests to Laravel storage
RewriteCond %{REQUEST_URI} ^/storage/
RewriteRule ^(.*)$ laravel-bootstrap.php [L,QSA]</pre>';
        
        echo '<strong>Replace your .htaccess with the fixed version from:</strong><br>';
        echo '<code>aprati_backend/public/.htaccess</code><br><br>';
        
        echo '<strong>Or download the correct .htaccess:</strong><br>';
        echo '<a href="?password=' . urlencode($provided_password) . '&action=download-htaccess" class="button">📥 Download Correct .htaccess</a>';
        echo '</div>';
        
        if ($action === 'download-htaccess') {
            $correctHtaccess = '<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Prevent direct access to Laravel application files (except public assets)
    RewriteRule ^aprati_backend/(?!public/) - [F,L]

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Route API requests to Laravel
    RewriteCond %{REQUEST_URI} ^/api/
    RewriteRule ^(.*)$ laravel-bootstrap.php [L,QSA]

    # Route admin-api requests to Laravel
    RewriteCond %{REQUEST_URI} ^/admin-api/
    RewriteRule ^(.*)$ laravel-bootstrap.php [L,QSA]

    # Serve PHP diagnostic/utility files directly
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteCond %{REQUEST_FILENAME} \.php$
    RewriteRule ^ - [L]

    # Serve static files directly (storage, _nuxt, images, etc.)
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule ^ - [L]

    # Serve frontend HTML files
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !^/api/
    RewriteCond %{REQUEST_URI} !^/admin-api/
    RewriteCond %{REQUEST_URI} !\.php$
    RewriteRule ^(.*)$ index.html [L]

</IfModule>

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Disable directory browsing
Options -Indexes

# Protect sensitive files
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>';
            
            header('Content-Type: text/plain');
            header('Content-Disposition: attachment; filename=".htaccess"');
            echo $correctHtaccess;
            exit;
        }
    }
}

?>

        <h2>📚 Manual Fix Instructions</h2>
        <div class="info">
            <strong>If automatic fixes don't work, follow these steps:</strong>
            <ol>
                <li><strong>Create Storage Symlink:</strong>
                    <ul>
                        <li>Via SSH: <code>cd /home/apratifoodscom/public_html/sdev.apratifoods.asia && ln -s aprati_backend/storage/app/public storage</code></li>
                        <li>Or use cPanel Terminal/SSH access</li>
                    </ul>
                </li>
                <li><strong>Fix .htaccess:</strong>
                    <ul>
                        <li>Remove the lines that route /storage/ to Laravel</li>
                        <li>Storage files should be served directly, not through Laravel</li>
                        <li>Upload the corrected .htaccess from your local <code>aprati_backend/public/</code></li>
                    </ul>
                </li>
            </ol>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 13px;">
            <strong>File Paths Reference:</strong><br>
            Document Root: <code><?php echo htmlspecialchars($documentRoot); ?></code><br>
            Laravel Backend: <code><?php echo htmlspecialchars($laravelRoot); ?></code><br>
            Storage Source: <code><?php echo htmlspecialchars($storagePublicPath); ?></code><br>
            Symlink Target: <code><?php echo htmlspecialchars($storageLinkPath); ?></code>
        </div>
    </div>
</body>
</html>
