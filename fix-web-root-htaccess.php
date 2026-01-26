<?php
/**
 * Fix Web Root .htaccess
 * Access: https://sdev.apratifoods.asia/fix-web-root-htaccess.php?key=aprati2026
 */

// Security check
if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('<h1>Access Denied</h1><p>Add ?key=aprati2026 to the URL</p>');
}

header('Content-Type: text/html; charset=utf-8');

$htaccessPath = __DIR__ . '/.htaccess';
$backupPath = __DIR__ . '/.htaccess.backup.' . date('YmdHis');

// The CORRECT .htaccess for the web root
$correctHtaccess = <<<'HTACCESS'
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Increase Upload Limits
    <IfModule mod_php7.c>
        php_value upload_max_filesize 10M
        php_value post_max_size 10M
        php_value memory_limit 256M
    </IfModule>
    <IfModule mod_php.c>
        php_value upload_max_filesize 10M
        php_value post_max_size 10M
        php_value memory_limit 256M
    </IfModule>

    # Route /api/* to Laravel backend
    RewriteCond %{REQUEST_URI} ^/api/
    RewriteRule ^api/(.*)$ aprati_backend/public/index.php [L,QSA]

    # Route /admin-api/* to Laravel backend
    RewriteCond %{REQUEST_URI} ^/admin-api/
    RewriteRule ^admin-api/(.*)$ aprati_backend/public/index.php [L,QSA]

    # Serve /storage from Laravel storage symlink
    RewriteCond %{REQUEST_URI} ^/storage/
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule ^ - [L]

    # Serve static files directly (images, css, js, etc)
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule ^ - [L]

    # Serve directories directly
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # Everything else goes to Nuxt frontend (index.html)
    RewriteRule ^ index.html [L]

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

?>
<!DOCTYPE html>
<html>

<head>
    <title>Fix Web Root .htaccess</title>
    <style>
        body {
            font-family: Arial;
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background: #f5f5f5;
        }

        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }

        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }

        .success {
            color: #27ae60;
            font-weight: bold;
            font-size: 18px;
        }

        .btn {
            background: #27ae60;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            display: inline-block;
            margin: 20px 0;
        }

        .btn:hover {
            background: #229954;
        }

        ul {
            line-height: 1.8;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🔧 Fix Web Root .htaccess</h1>

        <p><strong>Current .htaccess:</strong> <code><?php echo htmlspecialchars($htaccessPath); ?></code></p>

        <?php if (isset($_GET['deploy']) && $_GET['deploy'] === 'yes'): ?>
            <?php
            // Backup existing
            if (file_exists($htaccessPath)) {
                copy($htaccessPath, $backupPath);
                echo "<p class='success'>✅ Backed up to: " . basename($backupPath) . "</p>";
            }

            // Deploy new
            file_put_contents($htaccessPath, $correctHtaccess);
            echo "<p class='success'>✅ NEW .HTACCESS DEPLOYED!</p>";
            ?>

            <h2>🎉 Success! Now Test Your APIs:</h2>
            <ul>
                <li><a href="https://sdev.apratifoods.asia/api/brands" target="_blank">Test /api/brands</a></li>
                <li><a href="https://sdev.apratifoods.asia/api/products" target="_blank">Test /api/products</a></li>
                <li><a href="https://sdev.apratifoods.asia/api/hero-slides" target="_blank">Test /api/hero-slides</a></li>
                <li><a href="https://sdev.apratifoods.asia/api/promotion-banners" target="_blank">Test
                        /api/promotion-banners</a></li>
                <li><a href="test-real-apis.php?key=aprati2026">Run Full API Test Suite</a></li>
            </ul>

            <h3>New .htaccess Content:</h3>
            <pre><?php echo htmlspecialchars($correctHtaccess); ?></pre>

        <?php else: ?>

            <h2>⚠️ Problem Identified:</h2>
            <p>Your web root .htaccess is NOT routing <code>/api/*</code> requests to Laravel!</p>

            <h3>This Will:</h3>
            <ul>
                <li>✅ Backup your current .htaccess</li>
                <li>✅ Deploy the correct .htaccess that routes:
                    <ul>
                        <li><code>/api/*</code> → <code>aprati_backend/public/index.php</code></li>
                        <li><code>/admin-api/*</code> → <code>aprati_backend/public/index.php</code></li>
                        <li>Everything else → <code>index.html</code> (Nuxt frontend)</li>
                    </ul>
                </li>
                <li>✅ Fix all 404 errors instantly!</li>
            </ul>

            <a href="?key=aprati2026&deploy=yes" class="btn">🚀 DEPLOY CORRECT .HTACCESS NOW</a>

            <h3>Preview of New .htaccess:</h3>
            <pre><?php echo htmlspecialchars($correctHtaccess); ?></pre>

        <?php endif; ?>

        <hr>
        <p><strong>DELETE THIS FILE:</strong> <code>fix-web-root-htaccess.php</code></p>
    </div>
</body>

</html>