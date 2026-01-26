<?php
/**
 * Deploy Correct .htaccess File
 * Access: https://sdev.apratifoods.asia/deploy-htaccess.php?key=aprati2026
 * 
 * This creates the correct .htaccess file for Laravel API routing
 */

// Security check
if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('<h1>Access Denied</h1><p>Add ?key=aprati2026 to the URL</p>');
}

header('Content-Type: text/html; charset=utf-8');

$htaccessPath = __DIR__ . '/.htaccess';
$backupPath = __DIR__ . '/.htaccess.backup.' . date('Y-m-d-His');

echo "<h1>🔧 Deploy Correct .htaccess</h1>";

// Backup existing .htaccess
if (file_exists($htaccessPath)) {
    copy($htaccessPath, $backupPath);
    echo "<p>✅ Backed up existing .htaccess to: <code>" . basename($backupPath) . "</code></p>";
}

// Correct .htaccess content
$correctHtaccess = <<<'HTACCESS'
<IfModule mod_rewrite.c>
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
    RewriteRule ^(.*)$ index.php [L,QSA]

    # Route admin-api requests to Laravel
    RewriteCond %{REQUEST_URI} ^/admin-api/
    RewriteRule ^(.*)$ index.php [L,QSA]

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
    RewriteCond %{REQUEST_URI} !^/storage/
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
</FilesMatch>
HTACCESS;

if (isset($_GET['deploy']) && $_GET['deploy'] === 'yes') {
    file_put_contents($htaccessPath, $correctHtaccess);
    echo "<p style='color: green; font-size: 18px;'>✅ <strong>.htaccess has been deployed!</strong></p>";
    echo "<p>Now test the API endpoints again:</p>";
    echo "<ul>";
    echo "<li><a href='https://sdev.apratifoods.asia/api/brands' target='_blank'>Test /api/brands</a></li>";
    echo "<li><a href='https://sdev.apratifoods.asia/api/hero-slides' target='_blank'>Test /api/hero-slides</a></li>";
    echo "<li><a href='test-real-apis.php?key=aprati2026'>Run Full API Test Suite</a></li>";
    echo "</ul>";
} else {
    echo "<p style='color: orange;'>⚠️ Ready to deploy the correct .htaccess file</p>";
    echo "<p><strong>Current .htaccess path:</strong> <code>" . htmlspecialchars($htaccessPath) . "</code></p>";

    echo "<h3>What This Will Do:</h3>";
    echo "<ul>";
    echo "<li>✅ Backup your current .htaccess file</li>";
    echo "<li>✅ Deploy the correct .htaccess that routes /api/* to Laravel's index.php</li>";
    echo "<li>✅ Fix all 404 errors for API endpoints</li>";
    echo "</ul>";

    echo "<p><a href='?key=aprati2026&deploy=yes' style='background: #27ae60; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; display: inline-block; margin: 20px 0;'>🚀 Deploy .htaccess Now</a></p>";

    echo "<h3>Preview of New .htaccess:</h3>";
    echo "<pre style='background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;'>" . htmlspecialchars($correctHtaccess) . "</pre>";
}

echo "<hr>";
echo "<p><strong>DELETE THIS FILE after deployment:</strong> <code>deploy-htaccess.php</code></p>";
?>