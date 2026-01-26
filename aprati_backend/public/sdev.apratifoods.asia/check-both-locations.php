<?php
/**
 * Dual Location Checker
 * Checks both /public_html/ and /public_html/sdev.apratifoods.asia/ for Laravel
 */

$PASSWORD = 'aprati2025secure';

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
    <title>Dual Location Checker</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        .container { 
            max-width: 1400px; 
            margin: 0 auto; 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { 
            color: #333; 
            margin-bottom: 30px; 
            font-size: 32px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 15px;
        }
        .location-box {
            background: #f8f9fa;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
        }
        .location-box h2 {
            color: #495057;
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            background: white;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #dee2e6;
        }
        th {
            background: #e9ecef;
            font-weight: bold;
        }
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
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Dual Location Checker</h1>

<?php

$locations = [
    'Parent Directory (/public_html/)' => '/home/apratifoodscom/public_html',
    'Subdomain Directory (/sdev.apratifoods.asia/)' => '/home/apratifoodscom/public_html/sdev.apratifoods.asia'
];

$checkItems = [
    'artisan' => 'file',
    '.env' => 'file',
    'composer.json' => 'file',
    'vendor/' => 'dir',
    'app/' => 'dir',
    'config/' => 'dir',
    'routes/' => 'dir',
    'bootstrap/' => 'dir',
    'database/' => 'dir',
    'resources/' => 'dir',
    'storage/' => 'dir',
    'public/' => 'dir',
];

$results = [];

foreach ($locations as $locationName => $locationPath) {
    echo '<div class="location-box">';
    echo '<h2>📂 ' . htmlspecialchars($locationName) . '</h2>';
    echo '<code style="background: #282c34; color: #61dafb; padding: 5px 10px; border-radius: 4px; display: inline-block; margin-bottom: 15px;">' . htmlspecialchars($locationPath) . '</code>';
    
    if (!is_dir($locationPath)) {
        echo '<div class="status error">❌ Directory does not exist</div>';
        echo '</div>';
        continue;
    }
    
    $foundCount = 0;
    $totalCount = count($checkItems);
    
    echo '<table>';
    echo '<tr><th>Item</th><th>Type</th><th>Status</th></tr>';
    
    foreach ($checkItems as $item => $type) {
        $itemPath = $locationPath . '/' . $item;
        $exists = ($type === 'dir') ? is_dir($itemPath) : file_exists($itemPath);
        
        if ($exists) $foundCount++;
        
        $icon = $exists ? '✅' : '❌';
        $status = $exists ? '<span style="color: #28a745;">Found</span>' : '<span style="color: #dc3545;">Missing</span>';
        
        echo '<tr>';
        echo '<td><strong>' . htmlspecialchars($item) . '</strong></td>';
        echo '<td>' . ucfirst($type) . '</td>';
        echo '<td>' . $icon . ' ' . $status . '</td>';
        echo '</tr>';
    }
    
    echo '</table>';
    
    $percentage = round(($foundCount / $totalCount) * 100);
    
    echo '<div class="status ' . ($percentage >= 80 ? 'success' : ($percentage >= 50 ? 'warning' : 'error')) . '">';
    echo '<strong>Completeness:</strong> ' . $foundCount . '/' . $totalCount . ' items (' . $percentage . '%)';
    echo '</div>';
    
    $results[$locationName] = [
        'path' => $locationPath,
        'found' => $foundCount,
        'total' => $totalCount,
        'percentage' => $percentage
    ];
    
    echo '</div>';
}

// Recommendation
echo '<h2 style="margin-top: 40px; color: #333;">💡 Recommendation</h2>';

$parentResult = $results['Parent Directory (/public_html/)'];
$subdomainResult = $results['Subdomain Directory (/sdev.apratifoods.asia/)'];

if ($parentResult['percentage'] >= $subdomainResult['percentage']) {
    echo '<div class="status success">';
    echo '<strong>✅ Upload to: /home/apratifoodscom/public_html/</strong><br><br>';
    echo 'Reason: This location has more Laravel files (' . $parentResult['found'] . '/' . $parentResult['total'] . '). ';
    echo 'This is the Laravel ROOT directory.<br><br>';
    echo 'Missing directories (vendor, app, config, routes, database, resources) should be uploaded HERE.';
    echo '</div>';
    
    echo '<div class="status info">';
    echo '<strong>📍 About the subdomain folder:</strong><br>';
    echo 'The <code>/sdev.apratifoods.asia/</code> folder should only contain:<br>';
    echo '• index.php (entry point)<br>';
    echo '• .htaccess (rewrite rules)<br>';
    echo '• Public assets (CSS, JS, images)<br><br>';
    echo 'It acts as the public-facing directory that routes requests to the Laravel application in <code>/public_html/</code>';
    echo '</div>';
} else {
    echo '<div class="status warning">';
    echo '<strong>⚠️ Laravel might be in subdomain folder</strong><br><br>';
    echo 'The subdomain folder has more Laravel files (' . $subdomainResult['found'] . '/' . $subdomainResult['total'] . '). ';
    echo 'This is unusual but might be intentional.<br><br>';
    echo 'Upload missing directories to: <code>/home/apratifoodscom/public_html/sdev.apratifoods.asia/</code>';
    echo '</div>';
}

// Show what files currently exist in subdomain
echo '<h2 style="margin-top: 40px; color: #333;">📋 Files in Subdomain Folder</h2>';
$subdomainPath = '/home/apratifoodscom/public_html/sdev.apratifoods.asia';
if (is_dir($subdomainPath)) {
    $items = @scandir($subdomainPath);
    if ($items) {
        echo '<div style="background: #f8f9fa; padding: 15px; border-radius: 6px; max-height: 300px; overflow-y: auto;">';
        foreach ($items as $item) {
            if ($item === '.' || $item === '..') continue;
            $fullPath = $subdomainPath . '/' . $item;
            $isDir = is_dir($fullPath);
            $icon = $isDir ? '📁' : '📄';
            echo $icon . ' ' . htmlspecialchars($item) . ($isDir ? '/' : '') . '<br>';
        }
        echo '</div>';
    }
}

?>

    </div>
</body>
</html>
