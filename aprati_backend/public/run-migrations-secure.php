<?php
/**
 * Migration Runner for Production
 * Access via: https://sdev.apratifoods.asia/run-migrations-secure.php?password=aprati2025secure
 */

// Password protection
$password = $_GET['password'] ?? '';

if ($password !== 'aprati2025secure') {
    header('HTTP/1.1 403 Forbidden');
    die('Unauthorized. Please provide correct password.');
}

// Security headers
header('Content-Type: text/html; charset=utf-8');

?>
<!DOCTYPE html>
<html>
<head>
    <title>Database Migration Runner</title>
    <style>
        body {
            font-family: monospace;
            background: #1e1e1e;
            color: #00ff00;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #2d2d2d;
            padding: 20px;
            border-radius: 8px;
        }
        h1 {
            color: #4CAF50;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
        }
        h2 {
            color: #2196F3;
            margin-top: 30px;
        }
        pre {
            background: #1e1e1e;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            border-left: 4px solid #4CAF50;
        }
        .success {
            color: #4CAF50;
            font-weight: bold;
        }
        .error {
            color: #f44336;
            font-weight: bold;
        }
        .warning {
            color: #ff9800;
            font-weight: bold;
        }
        .info {
            color: #2196F3;
        }
        .section {
            margin: 20px 0;
            padding: 15px;
            background: #1e1e1e;
            border-radius: 4px;
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background: #45a049;
        }
        .danger {
            background: #f44336;
        }
        .danger:hover {
            background: #da190b;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>🚀 Database Migration Runner</h1>
    <p class="info">Time: <?= date('Y-m-d H:i:s') ?></p>

<?php

// Try to find Laravel root
$possibleRoots = [
    __DIR__ . '/../aprati_backend',
    __DIR__ . '/../../aprati_backend',
    '/home/apratifoodscom/public_html/aprati_backend',
    '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
];

$laravelRoot = null;
foreach ($possibleRoots as $root) {
    if (file_exists($root . '/artisan') && file_exists($root . '/vendor/autoload.php')) {
        $laravelRoot = $root;
        break;
    }
}

if (!$laravelRoot) {
    echo '<div class="section"><span class="error">❌ Error: Could not locate Laravel backend</span></div>';
    echo '<pre>Checked locations:';
    foreach ($possibleRoots as $path) {
        echo "\n  - $path";
    }
    echo '</pre>';
    echo '</div></body></html>';
    exit;
}

echo "<div class='section'><span class='success'>✅ Laravel Root Found:</span> $laravelRoot</div>";

// Change to Laravel directory
chdir($laravelRoot);

// Check current migration status
echo "<h2>📋 Current Migration Status</h2>";
echo "<div class='section'><pre>";
$statusOutput = shell_exec('php artisan migrate:status 2>&1');
echo htmlspecialchars($statusOutput);
echo "</pre></div>";

// Check if migrations should be run
$action = $_GET['action'] ?? 'status';

if ($action === 'run') {
    echo "<h2>🔄 Running Migrations...</h2>";
    echo "<div class='section'><pre>";
    
    // Run migrations with force flag
    $migrateOutput = shell_exec('php artisan migrate --force 2>&1');
    echo htmlspecialchars($migrateOutput);
    
    echo "</pre></div>";
    
    // Check if successful
    if (strpos($migrateOutput, 'Migrated:') !== false || strpos($migrateOutput, 'Nothing to migrate') !== false) {
        echo "<div class='section'><span class='success'>✅ Migrations completed successfully!</span></div>";
    } else if (strpos($migrateOutput, 'ERROR') !== false || strpos($migrateOutput, 'FAIL') !== false) {
        echo "<div class='section'><span class='error'>❌ Migration failed. Check the output above.</span></div>";
    }
    
    // Show new status
    echo "<h2>📋 Updated Migration Status</h2>";
    echo "<div class='section'><pre>";
    $newStatusOutput = shell_exec('php artisan migrate:status 2>&1');
    echo htmlspecialchars($newStatusOutput);
    echo "</pre></div>";
    
} else if ($action === 'rollback') {
    echo "<h2>⏮️ Rolling Back Last Batch...</h2>";
    echo "<div class='section'><pre>";
    
    $rollbackOutput = shell_exec('php artisan migrate:rollback --force 2>&1');
    echo htmlspecialchars($rollbackOutput);
    
    echo "</pre></div>";
    
} else if ($action === 'fresh') {
    echo "<h2>🆕 Fresh Migration (DANGER: This will drop all tables!)</h2>";
    echo "<div class='section'><pre>";
    
    $freshOutput = shell_exec('php artisan migrate:fresh --force 2>&1');
    echo htmlspecialchars($freshOutput);
    
    echo "</pre></div>";
    
} else if ($action === 'seed') {
    echo "<h2>🌱 Seeding Database...</h2>";
    echo "<div class='section'><pre>";
    
    $seedOutput = shell_exec('php artisan db:seed --force 2>&1');
    echo htmlspecialchars($seedOutput);
    
    echo "</pre></div>";
}

// Action buttons
echo "<h2>⚙️ Actions</h2>";
echo "<div class='section'>";

if ($action === 'status') {
    echo "<p>Choose an action:</p>";
    echo "<a href='?password=$password&action=run'><button>▶️ Run Pending Migrations</button></a>";
    echo "<a href='?password=$password&action=rollback'><button>⏮️ Rollback Last Batch</button></a>";
    echo "<a href='?password=$password&action=seed'><button>🌱 Seed Database</button></a>";
    echo "<a href='?password=$password&action=fresh'><button class='danger'>🆕 Fresh Migration (DANGER)</button></a>";
} else {
    echo "<a href='?password=$password&action=status'><button>🔄 Refresh Status</button></a>";
    echo "<a href='?password=$password'><button>⬅️ Back to Status</button></a>";
}

echo "</div>";

// Additional diagnostics
echo "<h2>🔍 Additional Diagnostics</h2>";

// Check .env file
echo "<div class='section'>";
echo "<h3>Environment Configuration</h3>";
$envPath = $laravelRoot . '/.env';
if (file_exists($envPath)) {
    echo "<span class='success'>✅ .env file exists</span><br>";
    
    $envContent = file_get_contents($envPath);
    $envLines = explode("\n", $envContent);
    
    echo "<pre>";
    foreach ($envLines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) continue;
        
        // Hide sensitive values
        if (preg_match('/^([^=]+)=(.*)$/', $line, $matches)) {
            $key = $matches[1];
            $value = $matches[2];
            
            $sensitiveKeys = ['PASSWORD', 'KEY', 'SECRET', 'TOKEN'];
            $isSensitive = false;
            foreach ($sensitiveKeys as $sensitiveKey) {
                if (strpos($key, $sensitiveKey) !== false) {
                    $isSensitive = true;
                    break;
                }
            }
            
            if ($isSensitive && !empty($value)) {
                echo "$key=***hidden***\n";
            } else {
                echo htmlspecialchars($line) . "\n";
            }
        }
    }
    echo "</pre>";
} else {
    echo "<span class='error'>❌ .env file not found</span>";
}
echo "</div>";

// Check permissions
echo "<div class='section'>";
echo "<h3>Directory Permissions</h3>";
$dirs = ['storage', 'bootstrap/cache', 'public'];
echo "<pre>";
foreach ($dirs as $dir) {
    $path = $laravelRoot . '/' . $dir;
    if (file_exists($path)) {
        $perms = substr(sprintf('%o', fileperms($path)), -4);
        $writable = is_writable($path) ? '✅' : '❌';
        echo "$writable $dir: $perms\n";
    } else {
        echo "❌ $dir: NOT FOUND\n";
    }
}
echo "</pre>";
echo "</div>";

// Check database connection
echo "<div class='section'>";
echo "<h3>Database Connection</h3>";
echo "<pre>";
$dbCheckOutput = shell_exec('php artisan db:show 2>&1');
echo htmlspecialchars($dbCheckOutput);
echo "</pre>";
echo "</div>";

?>

    <div class="section">
        <h3>📚 Documentation</h3>
        <ul>
            <li><strong>Run Migrations:</strong> Executes all pending database migrations</li>
            <li><strong>Rollback:</strong> Reverts the last batch of migrations</li>
            <li><strong>Fresh Migration:</strong> Drops all tables and re-runs migrations (DANGER!)</li>
            <li><strong>Seed Database:</strong> Populates database with sample data</li>
        </ul>
        
        <p class="warning">⚠️ Warning: Always backup your database before running migrations in production!</p>
    </div>

</div>
</body>
</html>
