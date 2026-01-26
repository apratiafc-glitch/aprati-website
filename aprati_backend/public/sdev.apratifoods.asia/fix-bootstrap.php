<?php
/**
 * Bootstrap Files Fixer
 * Creates missing bootstrap/app.php and bootstrap/providers.php files
 * 
 * Usage: https://sdev.apratifoods.asia/fix-bootstrap.php?password=aprati2025secure
 */

$PASSWORD = 'aprati2025secure';

// Password protection
if (!isset($_GET['password']) || $_GET['password'] !== $PASSWORD) {
    die('❌ Unauthorized Access');
}

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Files Fixer - Aprati Foods</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { 
            color: #333; 
            margin-bottom: 10px; 
            font-size: 32px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 15px;
        }
        .subtitle { color: #666; margin-bottom: 30px; font-size: 16px; }
        .status { 
            padding: 15px; 
            margin: 15px 0; 
            border-radius: 8px; 
            font-weight: 500;
        }
        .success { background: #d4edda; color: #155724; border-left: 4px solid #28a745; }
        .error { background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545; }
        .info { background: #d1ecf1; color: #0c5460; border-left: 4px solid #17a2b8; }
        .warning { background: #fff3cd; color: #856404; border-left: 4px solid #ffc107; }
        .file-box {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .file-header {
            font-weight: bold;
            color: #495057;
            margin-bottom: 10px;
            font-size: 18px;
        }
        pre {
            background: #282c34;
            color: #abb2bf;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.5;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
            font-weight: 600;
            transition: all 0.3s;
        }
        .btn:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        .step {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-left: 4px solid #667eea;
            border-radius: 4px;
        }
        .step-number {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: #667eea;
            color: white;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Bootstrap Files Fixer</h1>
        <p class="subtitle">Automatically creates missing Laravel bootstrap files</p>

<?php

// Find Laravel root directory - with detailed diagnostics
function findLaravelRoot() {
    $paths = [
        dirname(dirname(dirname(__DIR__))),
        dirname($_SERVER['DOCUMENT_ROOT']),
        dirname(dirname($_SERVER['DOCUMENT_ROOT'])),
        $_SERVER['DOCUMENT_ROOT'] . '/../',
        '/home/apratifoodscom/public_html',
        '/home/apratifoodscom/public_html/aprati_backend',
    ];
    
    echo '<div class="file-box">';
    echo '<div class="file-header">🔍 Path Detection Debug</div>';
    echo '<table style="width: 100%; border-collapse: collapse;">';
    echo '<tr style="background: #e9ecef; font-weight: bold;">';
    echo '<th style="padding: 10px; text-align: left; border: 1px solid #dee2e6;">Path</th>';
    echo '<th style="padding: 10px; text-align: left; border: 1px solid #dee2e6;">Real Path</th>';
    echo '<th style="padding: 10px; text-align: left; border: 1px solid #dee2e6;">artisan</th>';
    echo '<th style="padding: 10px; text-align: left; border: 1px solid #dee2e6;">bootstrap/</th>';
    echo '</tr>';
    
    $found = false;
    $foundPath = false;
    
    foreach ($paths as $path) {
        $realPath = realpath($path);
        $hasArtisan = $realPath && file_exists($realPath . '/artisan');
        $hasBootstrap = $realPath && is_dir($realPath . '/bootstrap');
        
        echo '<tr>';
        echo '<td style="padding: 8px; border: 1px solid #dee2e6;">' . htmlspecialchars($path) . '</td>';
        echo '<td style="padding: 8px; border: 1px solid #dee2e6; font-size: 12px;">' . ($realPath ? htmlspecialchars($realPath) : '❌ Invalid') . '</td>';
        echo '<td style="padding: 8px; border: 1px solid #dee2e6;">' . ($hasArtisan ? '✅' : '❌') . '</td>';
        echo '<td style="padding: 8px; border: 1px solid #dee2e6;">' . ($hasBootstrap ? '✅' : '❌') . '</td>';
        echo '</tr>';
        
        // Only require artisan file, not bootstrap directory (we're creating it!)
        if ($realPath && $hasArtisan && !$found) {
            $found = true;
            $foundPath = $realPath;
        }
    }
    
    echo '</table>';
    echo '</div>';
    
    return $foundPath;
}

$laravelRoot = findLaravelRoot();

if (!$laravelRoot) {
    echo '<div class="status error">❌ <strong>Error:</strong> Cannot find Laravel installation (no artisan file found)</div>';
    echo '<div class="info status">Laravel requires the artisan file to be present. Please ensure Laravel is properly uploaded.</div>';
    exit;
}

echo '<div class="status success">✅ <strong>Laravel Root Found:</strong> ' . htmlspecialchars($laravelRoot) . '</div>';

// Bootstrap directory path
$bootstrapDir = $laravelRoot . '/bootstrap';

// Create bootstrap directory if it doesn't exist
if (!is_dir($bootstrapDir)) {
    echo '<div class="status warning">⚠️ Bootstrap directory does not exist, creating it...</div>';
    if (mkdir($bootstrapDir, 0755, true)) {
        echo '<div class="status success">✅ <strong>Created:</strong> bootstrap directory with 755 permissions</div>';
    } else {
        echo '<div class="status error">❌ <strong>Failed:</strong> Could not create bootstrap directory</div>';
        exit;
    }
} else {
    echo '<div class="status success">✅ Bootstrap directory exists</div>';
}

// Create bootstrap/cache directory if it doesn't exist
$cacheDir = $bootstrapDir . '/cache';
if (!is_dir($cacheDir)) {
    echo '<div class="status warning">⚠️ bootstrap/cache directory does not exist, creating it...</div>';
    if (mkdir($cacheDir, 0755, true)) {
        echo '<div class="status success">✅ <strong>Created:</strong> bootstrap/cache directory with 755 permissions</div>';
    } else {
        echo '<div class="status warning">⚠️ <strong>Warning:</strong> Could not create bootstrap/cache directory</div>';
    }
} else {
    echo '<div class="status success">✅ bootstrap/cache directory exists</div>';
}

// Content for bootstrap/app.php
$appPhpContent = <<<'PHP'
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
            'track.visitors' => \App\Http\Middleware\TrackVisitors::class,
            'cors' => \App\Http\Middleware\CorsMiddleware::class,
        ]);
        
        // Disable CSRF for API routes
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);
        
        // Add CORS middleware to API routes
        $middleware->api([
            \App\Http\Middleware\CorsMiddleware::class,
        ]);
        
        $middleware->web([
            \App\Http\Middleware\VerifyCsrfToken::class,
            \App\Http\Middleware\TrackVisitors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated.',
                    'error' => 'Authentication required'
                ], 401);
            }
        });
    })->create();

PHP;

// Content for bootstrap/providers.php
$providersPhpContent = <<<'PHP'
<?php

return [
    App\Providers\AppServiceProvider::class,
];

PHP;

// Fix bootstrap/app.php
$appPhpPath = $bootstrapDir . '/app.php';
$appPhpStatus = '';

if (file_exists($appPhpPath)) {
    $appPhpStatus = '<div class="status warning">⚠️ bootstrap/app.php already exists - skipping</div>';
} else {
    $result = file_put_contents($appPhpPath, $appPhpContent);
    if ($result !== false) {
        chmod($appPhpPath, 0644);
        $appPhpStatus = '<div class="status success">✅ <strong>Created:</strong> bootstrap/app.php (' . $result . ' bytes)</div>';
    } else {
        $appPhpStatus = '<div class="status error">❌ <strong>Failed:</strong> Could not create bootstrap/app.php</div>';
    }
}

// Fix bootstrap/providers.php
$providersPhpPath = $bootstrapDir . '/providers.php';
$providersPhpStatus = '';

if (file_exists($providersPhpPath)) {
    $providersPhpStatus = '<div class="status warning">⚠️ bootstrap/providers.php already exists - skipping</div>';
} else {
    $result = file_put_contents($providersPhpPath, $providersPhpContent);
    if ($result !== false) {
        chmod($providersPhpPath, 0644);
        $providersPhpStatus = '<div class="status success">✅ <strong>Created:</strong> bootstrap/providers.php (' . $result . ' bytes)</div>';
    } else {
        $providersPhpStatus = '<div class="status error">❌ <strong>Failed:</strong> Could not create bootstrap/providers.php</div>';
    }
}

echo $appPhpStatus;
echo $providersPhpStatus;

// Verify files exist
echo '<h2 style="margin-top: 30px; color: #333;">📋 Verification</h2>';

$verification = [
    'bootstrap/app.php' => file_exists($appPhpPath),
    'bootstrap/providers.php' => file_exists($providersPhpPath),
    'bootstrap/cache/' => is_dir($bootstrapDir . '/cache'),
];

echo '<div class="file-box">';
foreach ($verification as $file => $exists) {
    $icon = $exists ? '✅' : '❌';
    $status = $exists ? 'Exists' : 'Missing';
    echo "<div style='padding: 5px 0;'>$icon <strong>$file:</strong> $status</div>";
}
echo '</div>';

// Show file contents
if (file_exists($appPhpPath)) {
    echo '<div class="file-box">';
    echo '<div class="file-header">📄 bootstrap/app.php Content:</div>';
    echo '<pre>' . htmlspecialchars(file_get_contents($appPhpPath)) . '</pre>';
    echo '</div>';
}

if (file_exists($providersPhpPath)) {
    echo '<div class="file-box">';
    echo '<div class="file-header">📄 bootstrap/providers.php Content:</div>';
    echo '<pre>' . htmlspecialchars(file_get_contents($providersPhpPath)) . '</pre>';
    echo '</div>';
}

// Next steps
echo '<h2 style="margin-top: 30px; color: #333;">🚀 Next Steps</h2>';
echo '<div class="step"><span class="step-number">1</span> Upload your <strong>.env</strong> file to: ' . htmlspecialchars($laravelRoot) . '/.env</div>';
echo '<div class="step"><span class="step-number">2</span> Run: <strong>fix-api-errors.php</strong> to verify Laravel installation</div>';
echo '<div class="step"><span class="step-number">3</span> Run: <strong>run-migrations.php</strong> to create database tables</div>';
echo '<div class="step"><span class="step-number">4</span> Run: <strong>fix-permissions.php</strong> to set correct permissions</div>';
echo '<div class="step"><span class="step-number">5</span> Test API endpoints: <strong>fix-api-errors.php → Test API Endpoints</strong></div>';

echo '<div style="margin-top: 30px;">';
echo '<a href="fix-api-errors.php?password=' . $PASSWORD . '" class="btn">▶️ Run Diagnostic Tool</a>';
echo '</div>';

?>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <strong>Note:</strong> This tool creates the missing Laravel 11 bootstrap files required for your application to function.
            After running this tool, proceed with uploading your .env file and running migrations.
        </div>
    </div>
</body>
</html>
