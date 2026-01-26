<?php
/**
 * Raw Database Check - No Laravel
 */
header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Raw Database Check</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #00ff00; }
        .success { color: #00ff00; }
        .error { color: #ff0000; }
        .info { color: #00aaff; }
        pre { background: #000; padding: 15px; border-radius: 4px; }
    </style>
</head>
<body>
<h1>🔍 Raw Database Check (No Laravel)</h1>
<pre>
<?php

// Read .env file manually
$envFile = __DIR__ . '/../.env';
$envVars = [];

if (file_exists($envFile)) {
    echo "<span class='success'>✅ .env file found</span>\n\n";
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) == 2) {
            $key = trim($parts[0]);
            $value = trim($parts[1]);
            $envVars[$key] = $value;
        }
    }
} else {
    echo "<span class='error'>❌ .env file not found at: $envFile</span>\n";
    exit(1);
}

echo "<span class='info'>📊 Database Configuration:</span>\n";
echo "Host: " . ($envVars['DB_HOST'] ?? 'Not set') . "\n";
echo "Database: " . ($envVars['DB_DATABASE'] ?? 'Not set') . "\n";
echo "Username: " . ($envVars['DB_USERNAME'] ?? 'Not set') . "\n";
echo "Password: " . (isset($envVars['DB_PASSWORD']) ? '***' : 'Not set') . "\n\n";

// Try to connect
try {
    $host = $envVars['DB_HOST'] ?? '127.0.0.1';
    $db = $envVars['DB_DATABASE'] ?? '';
    $user = $envVars['DB_USERNAME'] ?? '';
    $pass = $envVars['DB_PASSWORD'] ?? '';
    
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "<span class='success'>✅ Database connected successfully!</span>\n\n";
    
    // Check if table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'information_sections'");
    $tableExists = $stmt->fetch();
    
    if ($tableExists) {
        echo "<span class='success'>✅ Table 'information_sections' exists</span>\n\n";
        
        // Get count
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM information_sections");
        $result = $stmt->fetch();
        $count = $result['count'];
        
        echo "<span class='info'>📊 Total sections: $count</span>\n\n";
        
        if ($count > 0) {
            // Get all sections
            $stmt = $pdo->query("
                SELECT id, title, description, image_path, is_active, sort_order, created_by, created_at 
                FROM information_sections 
                ORDER BY sort_order, created_at DESC
            ");
            $sections = $stmt->fetchAll();
            
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
            echo "<span class='info'>📋 Current Sections:</span>\n";
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
            
            foreach ($sections as $section) {
                $status = $section['is_active'] ? '<span class="success">✅ Active</span>' : '<span class="error">❌ Inactive</span>';
                echo "ID: {$section['id']}\n";
                echo "Title: {$section['title']}\n";
                echo "Status: $status\n";
                echo "Sort Order: {$section['sort_order']}\n";
                echo "Description: " . substr($section['description'], 0, 100) . "...\n";
                echo "Image Path: " . ($section['image_path'] ?: 'None') . "\n";
                echo "Created By: {$section['created_by']}\n";
                echo "Created At: {$section['created_at']}\n";
                echo "\n";
            }
            
            // Generate API-like response
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
            echo "<span class='info'>📡 Simulated API Response:</span>\n";
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
            
            $baseUrl = $envVars['APP_URL'] ?? 'https://sdev.apratifoods.asia';
            $activeSections = array_filter($sections, function($s) {
                return $s['is_active'] == 1;
            });
            
            $response = [
                'success' => true,
                'data' => array_map(function($section) use ($baseUrl) {
                    return [
                        'id' => $section['id'],
                        'title' => $section['title'],
                        'description' => $section['description'],
                        'image_url' => $section['image_path'] 
                            ? $baseUrl . '/storage/' . $section['image_path']
                            : $baseUrl . '/images/default-info.svg',
                        'is_active' => (bool)$section['is_active'],
                        'sort_order' => (int)$section['sort_order'],
                        'created_at' => $section['created_at'],
                    ];
                }, array_values($activeSections))
            ];
            
            echo htmlspecialchars(json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            
        } else {
            echo "<span class='error'>❌ No sections found in database</span>\n";
        }
        
    } else {
        echo "<span class='error'>❌ Table 'information_sections' does not exist</span>\n";
        echo "<span class='info'>💡 Run migrations first</span>\n";
    }
    
} catch (PDOException $e) {
    echo "<span class='error'>❌ Database Error:</span>\n";
    echo "<span class='error'>{$e->getMessage()}</span>\n";
} catch (Exception $e) {
    echo "<span class='error'>❌ Error:</span>\n";
    echo "<span class='error'>{$e->getMessage()}</span>\n";
}

echo "\n\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "<span class='info'>🔧 PHP Info:</span>\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "PHP Version: " . PHP_VERSION . "\n";
echo "PDO Available: " . (extension_loaded('pdo') ? 'Yes' : 'No') . "\n";
echo "PDO MySQL Available: " . (extension_loaded('pdo_mysql') ? 'Yes' : 'No') . "\n";

?>
</pre>

<div style="margin-top: 20px; padding: 15px; background: #333; border-radius: 4px;">
    <h3 style="color: #00aaff;">🔧 Check Laravel Errors:</h3>
    <p style="color: #fff;">
        If this page works but Laravel doesn't, check:<br>
        <a href="view-laravel-errors.php" style="color: #00ff00;">View Laravel Error Logs</a>
    </p>
</div>

</body>
</html>
