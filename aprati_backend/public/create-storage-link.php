<?php
/**
 * Create Storage Symlink
 * Creates the public/storage symlink that Laravel needs for file uploads
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
    <title>Create Storage Symlink</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 900px;
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
        .path-info {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            margin: 10px 0;
        }
        .status { font-size: 24px; margin-right: 10px; }
        h2 { color: #333; margin: 20px 0 15px; font-size: 20px; }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }
        .back-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔗 Create Storage Symlink</h1>
            <p>Creates the public/storage symlink for Laravel file uploads</p>
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
            
            $publicPath = $laravelRoot . '/public';
            $storagePath = $laravelRoot . '/storage/app/public';
            $linkPath = $publicPath . '/storage';
            
            echo '<h2>📋 Paths</h2>';
            echo '<div class="path-info"><strong>Target:</strong> ' . htmlspecialchars($storagePath) . '</div>';
            echo '<div class="path-info"><strong>Link:</strong> ' . htmlspecialchars($linkPath) . '</div>';
            
            // Check if link already exists
            if (file_exists($linkPath)) {
                if (is_link($linkPath)) {
                    $linkTarget = readlink($linkPath);
                    echo '<div class="info-box success">';
                    echo '<span class="status">✅</span>';
                    echo '<strong>Symlink Already Exists</strong><br>';
                    echo 'Points to: ' . htmlspecialchars($linkTarget);
                    echo '</div>';
                } else {
                    echo '<div class="info-box error">';
                    echo '<span class="status">❌</span>';
                    echo '<strong>Error:</strong> public/storage exists but is not a symlink!<br>';
                    echo 'Please delete it manually and try again.';
                    echo '</div>';
                }
            } else {
                // Check if target directory exists
                if (!file_exists($storagePath)) {
                    echo '<div class="info-box error">';
                    echo '<span class="status">❌</span>';
                    echo '<strong>Error:</strong> storage/app/public directory does not exist!';
                    echo '</div>';
                } else {
                    // Try to create symlink
                    if (isset($_GET['create'])) {
                        try {
                            if (symlink($storagePath, $linkPath)) {
                                echo '<div class="info-box success">';
                                echo '<span class="status">✅</span>';
                                echo '<strong>Success!</strong> Symlink created successfully.<br>';
                                echo 'public/storage → storage/app/public';
                                echo '</div>';
                            } else {
                                echo '<div class="info-box error">';
                                echo '<span class="status">❌</span>';
                                echo '<strong>Error:</strong> Failed to create symlink. Check permissions.';
                                echo '</div>';
                            }
                        } catch (Exception $e) {
                            echo '<div class="info-box error">';
                            echo '<span class="status">❌</span>';
                            echo '<strong>Error:</strong> ' . htmlspecialchars($e->getMessage());
                            echo '</div>';
                        }
                    } else {
                        echo '<div class="info-box warning">';
                        echo '<span class="status">⚠️</span>';
                        echo '<strong>Symlink Not Found</strong><br>';
                        echo 'Click the button below to create it.';
                        echo '</div>';
                        
                        echo '<form method="get" style="margin-top: 20px;">';
                        echo '<input type="hidden" name="create" value="1">';
                        echo '<button type="submit" class="btn">Create Symlink</button>';
                        echo '</form>';
                    }
                }
            }
            
            echo '<a href="fix-api-errors.php" class="back-link">← Back to Diagnostic Menu</a>';
            ?>
        </div>
    </div>
</body>
</html>
