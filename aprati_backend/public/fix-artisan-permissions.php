<?php
/**
 * Fix Artisan Permissions
 * Makes the artisan file executable (0755)
 */

function findLaravelRoot() {
    $currentDir = __DIR__;
    $docRoot = $_SERVER['DOCUMENT_ROOT'] ?? $currentDir;
    
    $paths = [
        dirname(__DIR__) . '/aprati_backend',
        '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
        $currentDir . '/..',
        dirname($docRoot),
        $currentDir . '/../../aprati_backend',
        '/home/apratifoodscom/public_html',
        '/home/apratifoodscom/public_html/aprati_backend',
    ];
    
    foreach ($paths as $path) {
        $realPath = realpath($path);
        if (!$realPath) continue;
        
        if (file_exists($realPath . '/artisan') && file_exists($realPath . '/vendor/autoload.php')) {
            return $realPath;
        }
    }
    
    return false;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fix Artisan Permissions</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { opacity: 0.9; font-size: 14px; }
        .content { padding: 30px; }
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .success { background: #d4edda; border-left-color: #28a745; color: #155724; }
        .error { background: #f8d7da; border-left-color: #dc3545; color: #721c24; }
        .warning { background: #fff3cd; border-left-color: #ffc107; color: #856404; }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            transition: transform 0.2s;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        .btn:hover { transform: translateY(-2px); }
        .status { font-size: 24px; margin-right: 10px; }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }
        .back-link:hover { text-decoration: underline; }
        code {
            background: #f8f9fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔧 Fix Artisan Permissions</h1>
            <p>Makes the artisan file executable</p>
        </div>
        <div class="content">
            <?php
            $laravelRoot = findLaravelRoot();
            
            if (!$laravelRoot) {
                echo '<div class="info-box error">';
                echo '<span class="status">❌</span>';
                echo '<strong>Error:</strong> Could not find Laravel installation';
                echo '</div>';
                exit;
            }
            
            echo '<div class="info-box success">';
            echo '<span class="status">✅</span>';
            echo '<strong>Laravel Root Found:</strong> ' . htmlspecialchars($laravelRoot);
            echo '</div>';
            
            $artisanPath = $laravelRoot . '/artisan';
            
            if (!file_exists($artisanPath)) {
                echo '<div class="info-box error">';
                echo '<span class="status">❌</span>';
                echo '<strong>Error:</strong> Artisan file not found at: ' . htmlspecialchars($artisanPath);
                echo '</div>';
                exit;
            }
            
            $currentPerms = fileperms($artisanPath);
            $currentOctal = sprintf('%o', $currentPerms & 0777);
            
            echo '<div class="info-box">';
            echo '<strong>Current Permissions:</strong> <code>' . $currentOctal . '</code>';
            echo '</div>';
            
            if (isset($_GET['fix'])) {
                if (chmod($artisanPath, 0755)) {
                    $newPerms = fileperms($artisanPath);
                    $newOctal = sprintf('%o', $newPerms & 0777);
                    
                    echo '<div class="info-box success">';
                    echo '<span class="status">✅</span>';
                    echo '<strong>Success!</strong> Artisan permissions updated.<br>';
                    echo 'Old: <code>' . $currentOctal . '</code> → New: <code>' . $newOctal . '</code>';
                    echo '</div>';
                } else {
                    echo '<div class="info-box error">';
                    echo '<span class="status">❌</span>';
                    echo '<strong>Error:</strong> Failed to change permissions. Check file ownership.';
                    echo '</div>';
                }
            } else {
                if ($currentOctal === '755') {
                    echo '<div class="info-box success">';
                    echo '<span class="status">✅</span>';
                    echo '<strong>Artisan permissions are already correct!</strong>';
                    echo '</div>';
                } else {
                    echo '<div class="info-box warning">';
                    echo '<span class="status">⚠️</span>';
                    echo '<strong>Artisan needs to be executable</strong><br>';
                    echo 'Recommended: <code>0755</code>';
                    echo '</div>';
                    
                    echo '<form method="get" style="margin-top: 20px;">';
                    echo '<input type="hidden" name="fix" value="1">';
                    echo '<button type="submit" class="btn">Fix Permissions</button>';
                    echo '</form>';
                }
            }
            
            echo '<a href="fix-permissions.php" class="back-link">← Back to Permissions Check</a>';
            ?>
        </div>
    </div>
</body>
</html>
