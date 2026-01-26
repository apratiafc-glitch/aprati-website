<?php
/**
 * Fix Directory Location
 * Checks where files are and provides move commands
 * 
 * Usage: https://sdev.apratifoods.asia/fix-location.php?password=aprati2025secure
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
    <title>Fix Directory Location - Aprati Foods</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        pre {
            background: #282c34;
            color: #abb2bf;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 13px;
            line-height: 1.5;
            margin: 10px 0;
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
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: #f8f9fa;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #dee2e6;
        }
        th {
            background: #e9ecef;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Fix Directory Location</h1>
        <p class="subtitle">Diagnoses and fixes incorrect upload locations</p>

<?php

$laravelRoot = '/home/apratifoodscom/public_html';
$subdomainPath = $laravelRoot . '/sdev.apratifoods.asia';

echo '<div class="status info">📍 <strong>Expected Laravel Location:</strong> ' . htmlspecialchars($laravelRoot) . '</div>';

// Check if directories are in the wrong location (subdomain folder)
$checkDirs = ['vendor', 'app', 'config', 'routes', 'database', 'resources'];
$foundInWrongPlace = [];
$missingCompletely = [];

foreach ($checkDirs as $dir) {
    $correctPath = $laravelRoot . '/' . $dir;
    $wrongPath = $subdomainPath . '/' . $dir;
    
    if (is_dir($wrongPath)) {
        $foundInWrongPlace[] = $dir;
    } elseif (!is_dir($correctPath)) {
        $missingCompletely[] = $dir;
    }
}

// Check for ZIP files
$zipFiles = [];
$locations = [$laravelRoot, $subdomainPath];

foreach ($locations as $location) {
    if (is_dir($location)) {
        $files = @scandir($location);
        if ($files) {
            foreach ($files as $file) {
                if (substr($file, -4) === '.zip') {
                    $zipFiles[] = [
                        'file' => $file,
                        'location' => $location,
                        'path' => $location . '/' . $file
                    ];
                }
            }
        }
    }
}

// Diagnosis
echo '<h2 style="margin-top: 30px; color: #333;">🔍 Diagnosis</h2>';

if (!empty($foundInWrongPlace)) {
    echo '<div class="status error">';
    echo '❌ <strong>Files found in WRONG location!</strong><br>';
    echo 'These directories are in <code>/sdev.apratifoods.asia/</code> instead of <code>/public_html/</code>:<br>';
    echo '• ' . implode('<br>• ', $foundInWrongPlace);
    echo '</div>';
} elseif (!empty($missingCompletely)) {
    echo '<div class="status warning">';
    echo '⚠️ <strong>Files not found anywhere!</strong><br>';
    echo 'Missing directories: ' . implode(', ', $missingCompletely);
    echo '</div>';
} else {
    echo '<div class="status success">✅ <strong>All directories are in the correct location!</strong></div>';
}

if (!empty($zipFiles)) {
    echo '<div class="status info">';
    echo '📦 <strong>ZIP files found (need to be extracted):</strong><br>';
    foreach ($zipFiles as $zip) {
        echo '• ' . htmlspecialchars($zip['file']) . ' in ' . htmlspecialchars($zip['location']) . '<br>';
    }
    echo '</div>';
}

// Solution based on diagnosis
echo '<h2 style="margin-top: 30px; color: #333;">✅ Solution</h2>';

if (!empty($zipFiles)) {
    echo '<div class="step">';
    echo '<span class="step-number">1</span>';
    echo '<strong>You have unextracted ZIP files!</strong><br><br>';
    echo '<strong>Via cPanel File Manager:</strong><br>';
    echo '1. Go to: <code>' . htmlspecialchars($laravelRoot) . '/</code><br>';
    echo '2. For each ZIP file, right-click → Extract<br>';
    echo '3. MAKE SURE extraction path is: <code>/home/apratifoodscom/public_html/</code><br>';
    echo '4. Delete ZIP files after extraction';
    echo '</div>';
} elseif (!empty($foundInWrongPlace)) {
    echo '<div class="step">';
    echo '<span class="step-number">1</span>';
    echo '<strong>Move directories from subdomain to Laravel root</strong><br><br>';
    echo '<strong>Via cPanel File Manager:</strong><br>';
    echo '1. Navigate to: <code>/home/apratifoodscom/public_html/sdev.apratifoods.asia/</code><br>';
    echo '2. Select these folders: ' . implode(', ', $foundInWrongPlace) . '<br>';
    echo '3. Click "Move" button (top menu)<br>';
    echo '4. Set destination to: <code>/home/apratifoodscom/public_html/</code><br>';
    echo '5. Click "Move Files"';
    echo '</div>';
    
    echo '<div class="status warning">';
    echo '⚠️ <strong>Important:</strong> Make sure to move to the parent directory <code>/public_html/</code>, not keep them in subdirectory!';
    echo '</div>';
} elseif (!empty($missingCompletely)) {
    echo '<div class="step">';
    echo '<span class="step-number">1</span>';
    echo '<strong>Upload and extract ZIP files</strong><br><br>';
    echo 'You need to upload these ZIP files from your local computer:<br>';
    echo '• vendor.zip (26 MB)<br>';
    echo '• app.zip<br>';
    echo '• config.zip<br>';
    echo '• routes.zip<br>';
    echo '• database.zip<br>';
    echo '• resources.zip<br><br>';
    echo 'Local location: <code>d:\\xammp\\htdocs\\aprati_web_backup\\aprati_backend\\</code><br><br>';
    echo '<strong>Upload Steps:</strong><br>';
    echo '1. Open cPanel File Manager<br>';
    echo '2. Navigate to: <code>/home/apratifoodscom/public_html/</code> (NOT the subdomain folder!)<br>';
    echo '3. Click Upload button<br>';
    echo '4. Select all 6 ZIP files<br>';
    echo '5. After upload, extract each ZIP to current directory<br>';
    echo '6. Delete ZIP files after extraction';
    echo '</div>';
}

// Detailed file check
echo '<h2 style="margin-top: 30px; color: #333;">📋 Detailed Status</h2>';
echo '<table>';
echo '<tr><th>Directory</th><th>Correct Location</th><th>Wrong Location (subdomain)</th><th>Status</th></tr>';

foreach ($checkDirs as $dir) {
    $correctPath = $laravelRoot . '/' . $dir;
    $wrongPath = $subdomainPath . '/' . $dir;
    
    $inCorrect = is_dir($correctPath);
    $inWrong = is_dir($wrongPath);
    
    $correctIcon = $inCorrect ? '✅' : '❌';
    $wrongIcon = $inWrong ? '⚠️ YES' : '❌';
    
    $status = '';
    if ($inCorrect) {
        $status = '<span style="color: #28a745;">✅ OK</span>';
    } elseif ($inWrong) {
        $status = '<span style="color: #dc3545;">❌ WRONG LOCATION</span>';
    } else {
        $status = '<span style="color: #ffc107;">⚠️ MISSING</span>';
    }
    
    echo '<tr>';
    echo '<td><strong>' . htmlspecialchars($dir) . '/</strong></td>';
    echo '<td>' . $correctIcon . '</td>';
    echo '<td>' . $wrongIcon . '</td>';
    echo '<td>' . $status . '</td>';
    echo '</tr>';
}

echo '</table>';

?>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <strong>Note:</strong> Laravel must be in <code>/home/apratifoodscom/public_html/</code>, not in subdirectory.
            The subdomain points to public folder inside Laravel root.
        </div>
    </div>
</body>
</html>
