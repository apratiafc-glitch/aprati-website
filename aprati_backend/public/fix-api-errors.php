<?php
/**
 * API Error Diagnostic and Fix Script
 * Upload to: /public_html/sdev.apratifoods.asia/
 * Access: https://sdev.apratifoods.asia/fix-api-errors.php?password=aprati2025secure
 * 
 * This script diagnoses and fixes 500 errors in API endpoints
 */

// Security: Require password
$REQUIRED_PASSWORD = 'aprati2025secure';
if (!isset($_GET['password']) || $_GET['password'] !== $REQUIRED_PASSWORD) {
    die('❌ Access Denied. Add ?password=aprati2025secure to URL');
}

// Set execution time and memory
set_time_limit(300);
ini_set('memory_limit', '256M');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get action
$action = $_GET['action'] ?? 'menu';

?>
<!DOCTYPE html>
<html>
<head>
    <title>API Error Fix Tool</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        h1 { color: #333; }
        .menu { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0; }
        .menu-item { background: #007bff; color: white; padding: 20px; text-align: center; border-radius: 5px; text-decoration: none; display: block; }
        .menu-item:hover { background: #0056b3; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .warning { background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin: 10px 0; }
        pre { background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        table th, table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        table th { background: #007bff; color: white; }
        .btn { display: inline-block; padding: 10px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }
        .btn:hover { background: #218838; }
        .btn-danger { background: #dc3545; }
        .btn-danger:hover { background: #c82333; }
    </style>
</head>
<body>
<div class="container">
    <h1>🔧 API Error Diagnostic & Fix Tool</h1>
    <p><a href="?password=<?php echo $REQUIRED_PASSWORD; ?>" class="btn">🏠 Back to Menu</a></p>
    
<?php

// Find Laravel root directory
function findLaravelRoot() {
    // Current directory info
    $currentDir = __DIR__;
    $docRoot = $_SERVER['DOCUMENT_ROOT'] ?? $currentDir;
    
    // Possible paths from the public directory
    $possiblePaths = [
        dirname(__DIR__) . '/aprati_backend',                        // PRIORITY: Sibling aprati_backend subfolder
        '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend', // Full path
        $currentDir . '/..',                                         // Parent of current (most likely)
        dirname($docRoot),                                           // Parent of document root
        $currentDir . '/../../aprati_backend',                       // Nested structure
        '/home/apratifoodscom/public_html',                         // Direct parent
        '/home/apratifoodscom/public_html/aprati_backend',          // Separate directory
        dirname(dirname($docRoot)) . '/aprati_backend',             // Two levels up + aprati_backend
    ];
    
    foreach ($possiblePaths as $path) {
        $realPath = realpath($path);
        if (!$realPath) continue;
        
        $envPath = $realPath . '/.env';
        $artisanPath = $realPath . '/artisan';
        $bootstrapPath = $realPath . '/bootstrap/app.php';
        
        // Check for Laravel installation
        if (file_exists($artisanPath) && file_exists($bootstrapPath)) {
            return $realPath;
        }
    }
    
    return null;
}

// Get .env file path
function getEnvPath() {
    $laravelRoot = findLaravelRoot();
    
    if (!$laravelRoot) {
        throw new Exception("Cannot find Laravel installation. Please ensure Laravel files are uploaded correctly.");
    }
    
    $envPath = $laravelRoot . '/.env';
    
    if (!file_exists($envPath)) {
        throw new Exception("Laravel found at '$laravelRoot' but .env file is missing. Please upload or create .env file.");
    }
    
    return $envPath;
}

// Parse .env file manually (since parse_ini_file doesn't work with Laravel .env format)
function parseEnvFile($envPath) {
    $env = [];
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Parse KEY=VALUE
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            
            // Remove quotes from value
            $value = trim($value, '"\'');
            
            $env[$key] = $value;
        }
    }
    
    return $env;
}

// Bootstrap Laravel
function bootstrapLaravel() {
    $laravelRoot = findLaravelRoot();
    
    if (!$laravelRoot) {
        throw new Exception("Cannot find Laravel application directory");
    }
    
    $autoloadPath = $laravelRoot . '/vendor/autoload.php';
    $bootstrapPath = $laravelRoot . '/bootstrap/app.php';
    
    if (!file_exists($autoloadPath)) {
        throw new Exception("Cannot find vendor/autoload.php at: $autoloadPath");
    }
    
    if (!file_exists($bootstrapPath)) {
        throw new Exception("Cannot find Laravel bootstrap file at: $bootstrapPath");
    }
    
    try {
        require_once $autoloadPath;
        $app = require_once $bootstrapPath;
        $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
        $response = $kernel->handle(
            $request = Illuminate\Http\Request::capture()
        );
        
        return $app;
    } catch (Exception $e) {
        throw new Exception("Laravel bootstrap failed: " . $e->getMessage());
    }
}

// Get database connection
function getDB() {
    try {
        $app = bootstrapLaravel();
        return $app->make('db');
    } catch (Exception $e) {
        // Fallback: Manual database connection from .env
        try {
            $envPath = getEnvPath();
            $env = parseEnvFile($envPath);
            
            $connection = $env['DB_CONNECTION'] ?? 'sqlsrv';
            $host = $env['DB_HOST'] ?? 'localhost';
            $database = $env['DB_DATABASE'] ?? '';
            $username = $env['DB_USERNAME'] ?? '';
            $password = $env['DB_PASSWORD'] ?? '';
            
            if (empty($database) || empty($username)) {
                throw new Exception("Database credentials not found in .env file");
            }
            
            // Determine DSN based on connection type
            if ($connection === 'sqlsrv') {
                $dsn = "sqlsrv:server=$host;Database=$database";
            } else {
                $dsn = "mysql:host=$host;dbname=$database;charset=utf8mb4";
            }
            
            $pdo = new PDO($dsn, $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            return $pdo;
        } catch (Exception $dbError) {
            throw new Exception("Database connection failed: " . $dbError->getMessage() . " (Original error: " . $e->getMessage() . ")");
        }
    }
}

// Menu
if ($action === 'menu') {
    ?>
    <div class="info">
        <strong>🎯 Purpose:</strong> This tool fixes 500 Internal Server Errors in API endpoints by:
        <ul>
            <li>Creating missing database tables</li>
            <li>Seeding default data</li>
            <li>Fixing database connectivity</li>
            <li>Creating default images</li>
            <li>Checking permissions</li>
        </ul>
    </div>
    
    <div class="menu">
        <a href="?password=<?php echo $REQUIRED_PASSWORD; ?>&action=check_db" class="menu-item">
            1️⃣ Check Database Connection
        </a>
        <a href="?password=<?php echo $REQUIRED_PASSWORD; ?>&action=check_tables" class="menu-item">
            2️⃣ Check Database Tables
        </a>
        <a href="?password=<?php echo $REQUIRED_PASSWORD; ?>&action=seed_data" class="menu-item">
            3️⃣ Seed Default Data
        </a>
        <a href="?password=<?php echo $REQUIRED_PASSWORD; ?>&action=create_images" class="menu-item">
            4️⃣ Create Default Images
        </a>
        <a href="?password=<?php echo $REQUIRED_PASSWORD; ?>&action=test_endpoints" class="menu-item">
            5️⃣ Test API Endpoints
        </a>
        <a href="fix-permissions.php?password=<?php echo $REQUIRED_PASSWORD; ?>" class="menu-item" style="background: #ff9800;">
            6️⃣ Fix File Permissions
        </a>
        <a href="run-migrations.php?password=<?php echo $REQUIRED_PASSWORD; ?>" class="menu-item" style="background: #dc3545;">
            7️⃣ Run Migrations
        </a>
        <a href="?password=<?php echo $REQUIRED_PASSWORD; ?>&action=fix_all" class="menu-item" style="background: #28a745;">
            🚀 Quick Fix (Seed Data + Images)
        </a>
    </div>
    <?php
}

// Check Database Connection
elseif ($action === 'check_db') {
    echo "<h2>1️⃣ Database Connection Check</h2>";
    
    // First, try to find Laravel installation
    try {
        $laravelRoot = findLaravelRoot();
        
        if (!$laravelRoot) {
            throw new Exception("Cannot locate Laravel installation");
        }
        
        echo "<div class='success'>✅ Found Laravel at: <code>$laravelRoot</code></div>";
        
        // Now check for .env file
        $envPath = $laravelRoot . '/.env';
        
        if (!file_exists($envPath)) {
            echo "<div class='error'>❌ Laravel found but .env file is missing at: <code>$envPath</code></div>";
            echo "<div class='warning'>💡 <strong>Solution:</strong> Upload your .env file to <code>$laravelRoot/.env</code> or copy from .env.example</div>";
            
            // Check if .env.example exists
            $envExample = $laravelRoot . '/.env.example';
            if (file_exists($envExample)) {
                echo "<div class='info'>✓ Found .env.example - You can copy this to .env and update the values</div>";
            }
            return;
        }
        
        echo "<div class='success'>✅ Found .env file at: <code>$envPath</code></div>";
        
        $env = parseEnvFile($envPath);
        echo "<div class='info'>📋 <strong>Database Configuration:</strong><br>";
        echo "Connection: <code>" . ($env['DB_CONNECTION'] ?? 'Not set') . "</code><br>";
        echo "Host: <code>" . ($env['DB_HOST'] ?? 'Not set') . "</code><br>";
        echo "Database: <code>" . ($env['DB_DATABASE'] ?? 'Not set') . "</code><br>";
        echo "Username: <code>" . ($env['DB_USERNAME'] ?? 'Not set') . "</code><br>";
        echo "</div>";
        
    } catch (Exception $e) {
        echo '<div class="error">❌ Error: ' . $e->getMessage() . '</div>';
        
        // Show diagnostic information
        echo "<div class='info'><strong>🔍 Diagnostic Information:</strong><br>";
        echo "Current directory: <code>" . __DIR__ . "</code><br>";
        echo "Document root: <code>" . $_SERVER['DOCUMENT_ROOT'] . "</code><br>";
        echo "</div>";
        
        // Show what we're checking
        echo "<div class='info'><strong>Checked these locations for Laravel:</strong>";
        $currentDir = __DIR__;
        $docRoot = $_SERVER['DOCUMENT_ROOT'] ?? $currentDir;
        
        $paths = [
            $currentDir . '/..',
            dirname($docRoot),
            $currentDir . '/../../aprati_backend',
            '/home/apratifoodscom/public_html',
            '/home/apratifoodscom/public_html/aprati_backend',
        ];
        
        echo "<table style='margin-top:10px; font-size:12px;'>";
        echo "<tr><th>Path</th><th>Exists</th><th>Real Path</th><th>artisan</th><th>bootstrap</th><th>.env</th></tr>";
        
        foreach ($paths as $path) {
            $realPath = realpath($path);
            $exists = $realPath !== false;
            $hasArtisan = $realPath && file_exists($realPath . '/artisan');
            $hasBootstrap = $realPath && file_exists($realPath . '/bootstrap/app.php');
            $hasEnv = $realPath && file_exists($realPath . '/.env');
            
            // Highlight the valid Laravel installation
            $isLaravel = $hasArtisan && $hasBootstrap;
            $rowStyle = $isLaravel ? "background:#d4edda;" : "";
            
            echo "<tr style='$rowStyle'>";
            echo "<td><code>" . htmlspecialchars($path) . "</code></td>";
            echo "<td>" . ($exists ? '✓' : '✗') . "</td>";
            echo "<td><small>" . ($realPath ?: 'N/A') . "</small></td>";
            echo "<td>" . ($hasArtisan ? '✓' : '✗') . "</td>";
            echo "<td>" . ($hasBootstrap ? '✓' : '✗') . "</td>";
            echo "<td>" . ($hasEnv ? '✓' : '✗') . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        echo "</div>";
        
        echo "<div class='warning'>";
        echo "<strong>💡 Required Actions:</strong><br>";
        
        // Check what's missing
        $publicHtml = '/home/apratifoodscom/public_html';
        $hasArtisan = file_exists($publicHtml . '/artisan');
        $hasBootstrap = file_exists($publicHtml . '/bootstrap/app.php');
        $hasEnv = file_exists($publicHtml . '/.env');
        
        if ($hasArtisan && $hasBootstrap && !$hasEnv) {
            echo "✅ Laravel is installed correctly!<br>";
            echo "❌ Missing: <code>.env</code> file<br><br>";
            echo "<strong>Create .env file:</strong><br>";
            echo "1. Via cPanel File Manager:<br>";
            echo "&nbsp;&nbsp;• Go to <code>$publicHtml</code><br>";
            echo "&nbsp;&nbsp;• Copy <code>.env.example</code> to <code>.env</code><br>";
            echo "&nbsp;&nbsp;• Edit <code>.env</code> and set database credentials<br><br>";
            echo "2. Via SSH/Terminal:<br>";
            echo "&nbsp;&nbsp;<code>cd $publicHtml</code><br>";
            echo "&nbsp;&nbsp;<code>cp .env.example .env</code><br>";
            echo "&nbsp;&nbsp;<code>nano .env</code> (edit database settings)<br>";
        } else {
            echo "Upload Laravel files to <code>$publicHtml</code><br>";
            if (!$hasArtisan) echo "❌ Missing: <code>artisan</code><br>";
            if (!$hasBootstrap) echo "❌ Missing: <code>bootstrap/app.php</code><br>";
            if (!$hasEnv) echo "❌ Missing: <code>.env</code><br>";
        }
        
        echo "</div>";
        return;
    }
    
    try {
        $db = getDB();
        echo '<div class="success">✅ Database connection successful!</div>';
        
        // Get database info
        if ($db instanceof PDO) {
            try {
                $stmt = $db->query("SELECT DB_NAME() as dbname");
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                echo "<div class='info'>📊 Connected to database: <strong>{$result['dbname']}</strong></div>";
            } catch (Exception $e) {
                // MySQL fallback
                $stmt = $db->query("SELECT DATABASE() as dbname");
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                echo "<div class='info'>📊 Connected to database: <strong>{$result['dbname']}</strong></div>";
            }
        } else {
            $dbName = $db->getDatabaseName();
            echo "<div class='info'>📊 Connected to database: <strong>$dbName</strong></div>";
        }
        
    } catch (Exception $e) {
        echo '<div class="error">❌ Database connection failed: ' . $e->getMessage() . '</div>';
        echo '<div class="warning">💡 Check your .env file database settings</div>';
    }
}

// Check Tables
elseif ($action === 'check_tables') {
    echo "<h2>2️⃣ Database Tables Check</h2>";
    
    try {
        $db = getDB();
        
        $requiredTables = [
            'users',
            'brands',
            'products',
            'categories',
            'hero_images',
            'hero_contents',
            'information_sections',
            'footer_settings',
            'header_settings',
            'privacy_contents',
            'careers',
            'job_applications'
        ];
        
        echo "<table>";
        echo "<tr><th>Table Name</th><th>Status</th><th>Record Count</th></tr>";
        
        $missingTables = [];
        
        foreach ($requiredTables as $table) {
            try {
                if ($db instanceof PDO) {
                    $stmt = $db->query("SELECT COUNT(*) as count FROM $table");
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    $count = $result['count'];
                } else {
                    $count = $db->table($table)->count();
                }
                
                $status = $count > 0 ? "✅ Exists ($count records)" : "⚠️ Empty";
                $statusClass = $count > 0 ? 'success' : 'warning';
                echo "<tr><td>$table</td><td><span style='color: " . ($count > 0 ? 'green' : 'orange') . "'>$status</span></td><td>$count</td></tr>";
                
                if ($count === 0) {
                    $missingTables[] = $table;
                }
            } catch (Exception $e) {
                echo "<tr><td>$table</td><td style='color: red;'>❌ Missing</td><td>-</td></tr>";
                $missingTables[] = $table;
            }
        }
        
        echo "</table>";
        
        if (count($missingTables) > 0) {
            echo "<div class='warning'>⚠️ Missing or empty tables: " . implode(', ', $missingTables) . "</div>";
            echo "<a href='?password=$REQUIRED_PASSWORD&action=create_tables' class='btn'>Create Missing Tables</a>";
            echo "<a href='?password=$REQUIRED_PASSWORD&action=seed_data' class='btn'>Seed Data</a>";
        } else {
            echo "<div class='success'>✅ All required tables exist and have data!</div>";
        }
        
    } catch (Exception $e) {
        echo '<div class="error">❌ Error checking tables: ' . $e->getMessage() . '</div>';
    }
}

// Create Missing Tables
elseif ($action === 'create_tables') {
    echo "<h2>3️⃣ Create Missing Tables</h2>";
    echo "<div class='warning'>⚠️ This should be done via Laravel migrations. Use action 7 instead.</div>";
    echo "<a href='?password=$REQUIRED_PASSWORD&action=run_migrations' class='btn'>Run Migrations</a>";
}

// Seed Default Data
elseif ($action === 'seed_data') {
    echo "<h2>4️⃣ Seed Default Data</h2>";
    
    try {
        $db = getDB();
        $seeded = [];
        
        // Seed Footer Settings
        if ($db instanceof PDO) {
            $stmt = $db->query("SELECT COUNT(*) as count FROM footer_settings");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $count = $result['count'];
        } else {
            $count = $db->table('footer_settings')->count();
        }
        
        if ($count === 0) {
            $footerData = [
                ['key' => 'company_name', 'value' => 'Aprati Foods Company', 'type' => 'text', 'category' => 'company'],
                ['key' => 'company_address', 'value' => 'Dhaka, Bangladesh', 'type' => 'text', 'category' => 'company'],
                ['key' => 'company_phone', 'value' => '+880-XXX-XXXXXX', 'type' => 'text', 'category' => 'contact'],
                ['key' => 'company_email', 'value' => 'info@apratifoods.com', 'type' => 'text', 'category' => 'contact'],
                ['key' => 'facebook_url', 'value' => '#', 'type' => 'url', 'category' => 'social'],
                ['key' => 'twitter_url', 'value' => '#', 'type' => 'url', 'category' => 'social'],
                ['key' => 'linkedin_url', 'value' => '#', 'type' => 'url', 'category' => 'social'],
            ];
            
            foreach ($footerData as $data) {
                if ($db instanceof PDO) {
                    $stmt = $db->prepare("INSERT INTO footer_settings ([key], value, type, category, created_at, updated_at) VALUES (?, ?, ?, ?, GETDATE(), GETDATE())");
                    $stmt->execute([$data['key'], $data['value'], $data['type'], $data['category']]);
                } else {
                    $db->table('footer_settings')->insert(array_merge($data, [
                        'created_at' => now(),
                        'updated_at' => now()
                    ]));
                }
            }
            $seeded[] = 'footer_settings';
        }
        
        // Seed Header Settings
        if ($db instanceof PDO) {
            $stmt = $db->query("SELECT COUNT(*) as count FROM header_settings");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $count = $result['count'];
        } else {
            $count = $db->table('header_settings')->count();
        }
        
        if ($count === 0) {
            $headerData = [
                ['key' => 'logo', 'value' => '/images/logo.png', 'type' => 'image', 'is_active' => 1],
                ['key' => 'company_name', 'value' => 'Aprati Foods', 'type' => 'text', 'is_active' => 1],
            ];
            
            foreach ($headerData as $data) {
                if ($db instanceof PDO) {
                    $stmt = $db->prepare("INSERT INTO header_settings ([key], value, type, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, GETDATE(), GETDATE())");
                    $stmt->execute([$data['key'], $data['value'], $data['type'], $data['is_active']]);
                } else {
                    $db->table('header_settings')->insert(array_merge($data, [
                        'created_at' => now(),
                        'updated_at' => now()
                    ]));
                }
            }
            $seeded[] = 'header_settings';
        }
        
        // Seed Hero Content
        if ($db instanceof PDO) {
            $stmt = $db->query("SELECT COUNT(*) as count FROM hero_contents");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $count = $result['count'];
        } else {
            $count = $db->table('hero_contents')->count();
        }
        
        if ($count === 0) {
            $heroData = [
                'title' => 'Welcome to Aprati Foods',
                'subtitle' => 'Quality Food Products',
                'description' => 'Providing premium quality food products to Bangladesh and beyond.',
                'button_text' => 'Learn More',
                'button_url' => '/about',
                'is_active' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
            
            if ($db instanceof PDO) {
                $stmt = $db->prepare("INSERT INTO hero_contents (title, subtitle, description, button_text, button_url, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute(array_values($heroData));
            } else {
                $db->table('hero_contents')->insert($heroData);
            }
            $seeded[] = 'hero_contents';
        }
        
        // Seed Information Sections
        if ($db instanceof PDO) {
            $stmt = $db->query("SELECT COUNT(*) as count FROM information_sections");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $count = $result['count'];
        } else {
            $count = $db->table('information_sections')->count();
        }
        
        if ($count === 0) {
            $infoData = [
                ['title' => 'Our Mission', 'content' => 'To provide quality food products.', 'order' => 1, 'is_active' => 1],
                ['title' => 'Our Vision', 'content' => 'To be a leading food company.', 'order' => 2, 'is_active' => 1],
            ];
            
            foreach ($infoData as $data) {
                if ($db instanceof PDO) {
                    $stmt = $db->prepare("INSERT INTO information_sections (title, content, [order], is_active, created_at, updated_at) VALUES (?, ?, ?, ?, GETDATE(), GETDATE())");
                    $stmt->execute([$data['title'], $data['content'], $data['order'], $data['is_active']]);
                } else {
                    $db->table('information_sections')->insert(array_merge($data, [
                        'created_at' => now(),
                        'updated_at' => now()
                    ]));
                }
            }
            $seeded[] = 'information_sections';
        }
        
        if (count($seeded) > 0) {
            echo "<div class='success'>✅ Seeded data for: " . implode(', ', $seeded) . "</div>";
        } else {
            echo "<div class='info'>ℹ️ All tables already have data. No seeding needed.</div>";
        }
        
    } catch (Exception $e) {
        echo '<div class="error">❌ Error seeding data: ' . $e->getMessage() . '</div>';
    }
}

// Create Default Images
elseif ($action === 'create_images') {
    echo "<h2>5️⃣ Create Default Images</h2>";
    
    $imagesDir = __DIR__ . '/images';
    
    if (!file_exists($imagesDir)) {
        mkdir($imagesDir, 0755, true);
        echo "<div class='success'>✅ Created /images directory</div>";
    }
    
    // Create default hero SVG
    $heroSvg = $imagesDir . '/default-hero.svg';
    if (!file_exists($heroSvg)) {
        $svgContent = '<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="600" fill="#007bff"/>
  <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle">Aprati Foods</text>
  <text x="50%" y="60%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">Quality Food Products</text>
</svg>';
        file_put_contents($heroSvg, $svgContent);
        echo "<div class='success'>✅ Created default-hero.svg</div>";
    }
    
    // Create logo placeholder
    $logo = $imagesDir . '/logo.png';
    if (!file_exists($logo)) {
        // Create a simple 1x1 transparent PNG
        $img = imagecreatetruecolor(200, 80);
        $bg = imagecolorallocate($img, 0, 123, 255);
        $text = imagecolorallocate($img, 255, 255, 255);
        imagefilledrectangle($img, 0, 0, 200, 80, $bg);
        imagestring($img, 5, 30, 30, 'Aprati Foods', $text);
        imagepng($img, $logo);
        imagedestroy($img);
        echo "<div class='success'>✅ Created logo.png</div>";
    }
    
    echo "<div class='info'>✅ All default images are ready!</div>";
}

// Test Endpoints
elseif ($action === 'test_endpoints') {
    echo "<h2>6️⃣ Test API Endpoints</h2>";
    
    $baseUrl = 'https://' . $_SERVER['HTTP_HOST'];
    
    $endpoints = [
        '/api/hero-content',
        '/api/hero-image',
        '/api/information-sections',
        '/api/footer-settings',
        '/api/header-settings',
        '/api/admin-profile-image',
        '/api/brands',
        '/images/default-hero.svg'
    ];
    
    echo "<table>";
    echo "<tr><th>Endpoint</th><th>Status</th><th>Response</th></tr>";
    
    foreach ($endpoints as $endpoint) {
        $url = $baseUrl . $endpoint;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        $statusColor = $httpCode === 200 ? 'green' : 'red';
        $statusIcon = $httpCode === 200 ? '✅' : '❌';
        
        $responsePreview = substr($response, 0, 100);
        
        echo "<tr>";
        echo "<td><a href='$url' target='_blank'>$endpoint</a></td>";
        echo "<td style='color: $statusColor;'>$statusIcon $httpCode</td>";
        echo "<td><small>" . htmlspecialchars($responsePreview) . "...</small></td>";
        echo "</tr>";
    }
    
    echo "</table>";
}

// Run Migrations
elseif ($action === 'run_migrations') {
    echo "<h2>7️⃣ Run Laravel Migrations</h2>";
    
    // Check if migration runner exists
    $migrationRunner = __DIR__ . '/run-migrations.php';
    
    if (file_exists($migrationRunner)) {
        echo "<div class='success'>✅ Migration runner found!</div>";
        echo "<div class='info'>Click the button below to run migrations:</div>";
        echo "<a href='run-migrations.php?password=$REQUIRED_PASSWORD' class='btn' style='background: #28a745; font-size: 18px; padding: 15px 30px;'>🚀 Run Migrations Now</a>";
        echo "<br><br>";
        echo "<div class='warning'>⚠️ This will create all database tables required by the application.</div>";
    } else {
        echo "<div class='error'>❌ Migration runner not found at: $migrationRunner</div>";
        echo "<div class='warning'>Please upload run-migrations.php to the same directory as this file.</div>";
    }
    
    echo "<div class='info'><strong>Alternative - SSH/Terminal Method:</strong></div>";
    echo "<ol>";
    echo "<li>Access your server via SSH or cPanel Terminal</li>";
    echo "<li>Navigate to the Laravel directory:<br><code>cd /home/apratifoodscom/public_html/aprati_backend</code></li>";
    echo "<li>Run migrations:<br><code>php artisan migrate --force</code></li>";
    echo "</ol>";
    
    // Try to find Laravel path for reference
    try {
        $laravelRoot = findLaravelRoot();
        if ($laravelRoot) {
            echo "<div class='success'>✅ Laravel found at: $laravelRoot</div>";
        }
    } catch (Exception $e) {
        echo "<div class='warning'>Could not locate Laravel root directory</div>";
    }
}

// Fix All
elseif ($action === 'fix_all') {
    echo "<h2>🚀 Fix Everything</h2>";
    echo "<div class='info'>Running all fix operations...</div>";
    
    try {
        // 1. Check DB
        echo "<h3>Step 1: Check Database</h3>";
        try {
            $db = getDB();
            echo '<div class="success">✅ Database connected</div>';
        } catch (Exception $e) {
            echo '<div class="error">❌ Database error: ' . $e->getMessage() . '</div>';
            throw $e;
        }
        
        // 2. Seed Data
        echo "<h3>Step 2: Seed Data</h3>";
        $_GET['action'] = 'seed_data';
        include __FILE__;
        
        // 3. Create Images
        echo "<h3>Step 3: Create Default Images</h3>";
        $_GET['action'] = 'create_images';
        include __FILE__;
        
        echo "<div class='success'>";
        echo "<h3>✅ All Done!</h3>";
        echo "<p>The API should now be working. Test the endpoints:</p>";
        echo "<a href='?password=$REQUIRED_PASSWORD&action=test_endpoints' class='btn'>Test API Endpoints</a>";
        echo "</div>";
        
    } catch (Exception $e) {
        echo '<div class="error">❌ Fix failed: ' . $e->getMessage() . '</div>';
    }
}

?>

</div>
</body>
</html>
