<!DOCTYPE html>
<html>
<head>
    <title>Upload Status - Aprati Foods</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #f44336; padding-bottom: 10px; }
        h2 { color: #4CAF50; margin-top: 30px; }
        .error { color: #f44336; background: #ffebee; padding: 15px; margin: 15px 0; border-radius: 4px; font-weight: bold; }
        .success { color: #4CAF50; background: #e8f5e9; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .warning { color: #ff9800; background: #fff3e0; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .info { color: #2196F3; background: #e3f2fd; padding: 15px; margin: 15px 0; border-radius: 4px; }
        pre { background: #263238; color: #aed581; padding: 15px; border-radius: 4px; overflow-x: auto; }
        ol { line-height: 2; }
        code { background: #263238; color: #aed581; padding: 2px 8px; border-radius: 3px; }
        .step { background: #e3f2fd; padding: 15px; margin: 15px 0; border-left: 4px solid #2196F3; }
        .action { background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 5px; }
        .action:hover { background: #45a049; }
    </style>
</head>
<body>
<div class="container">
    <?php
    // Find base path
    $basePath = '/home/apratifoodscom/public_html';
    
    // Check all required components
    $checks = [
        'aprati_backend folder' => is_dir($basePath . '/aprati_backend'),
        'app/ folder' => is_dir($basePath . '/aprati_backend/app'),
        'bootstrap/ folder' => is_dir($basePath . '/aprati_backend/bootstrap'),
        'config/ folder' => is_dir($basePath . '/aprati_backend/config'),
        'public/ folder' => is_dir($basePath . '/aprati_backend/public'),
        'routes/ folder' => is_dir($basePath . '/aprati_backend/routes'),
        'storage/ folder' => is_dir($basePath . '/aprati_backend/storage'),
        'vendor/ folder' => is_dir($basePath . '/aprati_backend/vendor'),
        'artisan file' => file_exists($basePath . '/aprati_backend/artisan'),
        '.env file' => file_exists($basePath . '/aprati_backend/.env'),
        'frontend/ folder' => is_dir($basePath . '/aprati_backend/public/frontend'),
        '_nuxt/ folder' => is_dir($basePath . '/aprati_backend/public/_nuxt'),
    ];
    
    $allGood = !in_array(false, $checks);
    
    if ($allGood) {
        echo '<h1>✅ All Files Uploaded Successfully!</h1>';
        echo '<div class="success">';
        echo '<h3>🎉 Your Laravel application is ready!</h3>';
        echo '<p>All required files have been detected on the server.</p>';
        echo '</div>';
    } else {
        echo '<h1>❌ Laravel Application Files Missing!</h1>';
        echo '<div class="error">';
        echo '<strong>CRITICAL ISSUE DETECTED:</strong><br>';
        echo 'Your server is missing some Laravel application files. Please upload them.';
        echo '</div>';
    }
    ?>
    
    <h2>📊 Current Status:</h2>
    
    <?php
    foreach ($checks as $name => $exists) {
        if ($exists) {
            echo "<div class='success'>✅ $name - Found</div>";
        } else {
            echo "<div class='error'>❌ $name - Missing</div>";
        }
    }
    
    if ($allGood) {
        echo '<h2>🚀 Next Steps:</h2>';
        echo '<div class="info">';
        echo '<ol>';
        echo '<li>Make sure document root points to: <code>/home/apratifoodscom/public_html/aprati_backend/public</code></li>';
        echo '<li>Configure your .env file with database credentials</li>';
        echo '<li>Use deploy.php to complete setup</li>';
        echo '</ol>';
        echo '</div>';
        echo '<a href="deploy.php?password=aprati2025secure" class="action">Open Deployment Tool</a>';
    } else {
        echo '<h2>📋 Upload Instructions:</h2>';
    ?>
    
    <div class="step">
        <strong>Step 1: Create ZIP File on Your Computer</strong>
        <ol>
            <li>Locate your <code>aprati_backend</code> folder</li>
            <li>Make sure it contains: app/, bootstrap/, config/, database/, public/, routes/, storage/, vendor/</li>
            <li>Right-click the folder → Send to → Compressed (zipped) folder</li>
        </ol>
    </div>
    
    <div class="step">
        <strong>Step 2: Upload via cPanel File Manager</strong>
        <ol>
            <li>Login to cPanel</li>
            <li>Open <strong>File Manager</strong></li>
            <li>Navigate to: <code>/home/apratifoodscom/public_html/</code></li>
            <li>Click <strong>Upload</strong> button</li>
            <li>Select your <code>aprati_backend.zip</code> file</li>
            <li>Wait for upload to complete</li>
            <li>Go back to File Manager</li>
            <li>Right-click the ZIP file → <strong>Extract</strong></li>
            <li>Click <strong>Extract File(s)</strong></li>
        </ol>
    </div>
    
    <div class="step">
        <strong>Step 3: Configure Document Root</strong>
        <ol>
            <li>Go to cPanel → <strong>Domains</strong></li>
            <li>Find <strong>sdev.apratifoods.asia</strong></li>
            <li>Click <strong>Manage</strong></li>
            <li>Change <strong>Document Root</strong> to:<br>
                <code>/home/apratifoodscom/public_html/aprati_backend/public</code>
            </li>
            <li>Click <strong>Save</strong></li>
        </ol>
    </div>
    
    <div class="step">
        <strong>Step 4: Set File Permissions</strong>
        <ol>
            <li>In File Manager, go to <code>aprati_backend/</code></li>
            <li>Right-click <code>storage</code> → Change Permissions → <code>755</code></li>
            <li>Check "Recurse into subdirectories"</li>
            <li>Repeat for <code>bootstrap/cache</code></li>
        </ol>
    </div>
    
    <div class="warning">
        <strong>⚠️ Important Notes:</strong><br>
        • Make sure you ran <code>build-production.bat</code> before zipping<br>
        • The vendor/ folder must be included (it's very large, ~100MB)<br>
        • Upload might take 5-10 minutes depending on your connection<br>
        • Extract might take another 2-3 minutes
    </div>
    
    <?php
    }
    ?>
    
    <h2>🔄 Quick Actions:</h2>
    <a href="?refresh=<?php echo time(); ?>" class="action">🔄 Refresh Status</a>
    
    <div class="info">
        <strong>📞 Current Server Info:</strong><br>
        PHP Version: <?php echo PHP_VERSION; ?><br>
        Document Root: <?php echo $_SERVER['DOCUMENT_ROOT']; ?><br>
        Server: <?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'; ?>
    </div>
    
    <?php if (!$allGood): ?>
    <div class="warning">
        <strong>🔍 Troubleshooting:</strong><br>
        <strong>Q:</strong> Upload is too slow?<br>
        <strong>A:</strong> Use FTP client (FileZilla) instead of cPanel File Manager<br><br>
        
        <strong>Q:</strong> Extract failed?<br>
        <strong>A:</strong> Try extracting on your computer, then upload unzipped folder via FTP<br><br>
        
        <strong>Q:</strong> vendor/ folder missing?<br>
        <strong>A:</strong> Run <code>composer install</code> in your local aprati_backend folder first
    </div>
    <?php endif; ?>
</div>
</body>
</html>
