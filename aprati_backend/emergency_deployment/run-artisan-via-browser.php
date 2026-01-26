<?php
// Run Laravel artisan commands via browser
// Upload this to /home/apratifoodscom/aprati_backend/ and access via browser

// Security: Remove this file after use!
$securityKey = 'aprati2025'; // Change this!

if (!isset($_GET['key']) || $_GET['key'] !== $securityKey) {
    die('Access denied. Add ?key='.$securityKey.' to URL');
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Laravel Cache Commands</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
        h1 { color: #4ec9b0; }
        .output { background: #252526; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #007acc; }
        button { background: #007acc; color: white; border: none; padding: 10px 20px; margin: 5px; cursor: pointer; border-radius: 4px; }
        button:hover { background: #005a9e; }
        .success { color: #4ec9b0; }
        .error { color: #f48771; }
    </style>
</head>
<body>
    <h1>🔧 Laravel Artisan Commands</h1>
    <p>Run Laravel commands without SSH access</p>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $command = $_POST['command'] ?? '';
        
        if (empty($command)) {
            echo '<div class="output error">No command specified</div>';
        } else {
            echo '<div class="output">';
            echo '<strong>Running:</strong> php artisan ' . htmlspecialchars($command) . '<br><br>';
            
            // Change to Laravel root
            chdir(__DIR__);
            
            // Check if artisan exists
            if (!file_exists('artisan')) {
                echo '<span class="error">❌ artisan file not found in: ' . getcwd() . '</span>';
            } else {
                // Run command
                $output = [];
                $returnCode = 0;
                exec('php artisan ' . escapeshellarg($command) . ' 2>&1', $output, $returnCode);
                
                if ($returnCode === 0) {
                    echo '<span class="success">✅ Success!</span><br><pre>';
                } else {
                    echo '<span class="error">❌ Error (Code: ' . $returnCode . ')</span><br><pre>';
                }
                
                echo htmlspecialchars(implode("\n", $output));
                echo '</pre>';
            }
            
            echo '</div>';
        }
    }
    ?>

    <h2>Quick Commands:</h2>
    
    <form method="POST" style="margin: 20px 0;">
        <input type="hidden" name="command" value="config:clear">
        <button type="submit">Clear Config Cache</button>
    </form>

    <form method="POST" style="margin: 20px 0;">
        <input type="hidden" name="command" value="route:clear">
        <button type="submit">Clear Route Cache</button>
    </form>

    <form method="POST" style="margin: 20px 0;">
        <input type="hidden" name="command" value="cache:clear">
        <button type="submit">Clear Application Cache</button>
    </form>

    <form method="POST" style="margin: 20px 0;">
        <input type="hidden" name="command" value="view:clear">
        <button type="submit">Clear View Cache</button>
    </form>

    <form method="POST" style="margin: 20px 0;">
        <input type="hidden" name="command" value="optimize:clear">
        <button type="submit">Clear All Caches</button>
    </form>

    <form method="POST" style="margin: 20px 0;">
        <input type="hidden" name="command" value="route:cache">
        <button type="submit">✨ Cache Routes (Production)</button>
    </form>

    <form method="POST" style="margin: 20px 0;">
        <input type="hidden" name="command" value="config:cache">
        <button type="submit">✨ Cache Config (Production)</button>
    </form>

    <form method="POST" style="margin: 20px 0;">
        <input type="hidden" name="command" value="route:list --path=api">
        <button type="submit">📋 List API Routes</button>
    </form>

    <h2>Custom Command:</h2>
    <form method="POST">
        <input type="text" name="command" placeholder="e.g., migrate --force" style="width: 400px; padding: 10px; background: #252526; color: #d4d4d4; border: 1px solid #007acc; border-radius: 4px;">
        <button type="submit">Run Command</button>
    </form>

    <div class="output" style="margin-top: 40px; border-left-color: #f48771;">
        <strong>⚠️ SECURITY WARNING:</strong><br>
        Delete this file after use! It allows running artisan commands via browser.<br>
        File location: <?php echo __FILE__; ?>
    </div>

    <h2>System Info:</h2>
    <div class="output">
        <strong>PHP Version:</strong> <?php echo PHP_VERSION; ?><br>
        <strong>Current Directory:</strong> <?php echo getcwd(); ?><br>
        <strong>Artisan File:</strong> <?php echo file_exists('artisan') ? '✅ Found' : '❌ Not Found'; ?><br>
        <strong>Vendor Folder:</strong> <?php echo file_exists('vendor') ? '✅ Found' : '❌ Not Found'; ?><br>
        <strong>.env File:</strong> <?php echo file_exists('.env') ? '✅ Found' : '❌ Not Found'; ?><br>
    </div>
</body>
</html>
