<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Find 200.html Location</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
        .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #2196F3; }
        .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .warning { background: #fff3cd; color: #856404; border: 1px solid #ffeeba; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 11px; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
        th { background: #2196F3; color: white; }
        .found { background: #d4edda; }
        .notfound { background: #f8d7da; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Find 200.html Location</h1>
        
        <div class="section">
            <h2>Current Script Location</h2>
            <pre><?php
echo "__FILE__: " . __FILE__ . "\n";
echo "dirname(__FILE__): " . dirname(__FILE__) . "\n";
echo "dirname(2): " . dirname(dirname(__FILE__)) . "\n";
echo "dirname(3): " . dirname(dirname(dirname(__FILE__))) . "\n";
echo "dirname(4): " . dirname(dirname(dirname(dirname(__FILE__)))) . "\n";
echo "\npublic_path(): " . (function_exists('public_path') ? public_path() : 'N/A (not in Laravel)') . "\n";
echo "DOCUMENT_ROOT: " . (isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : 'N/A') . "\n";
            ?></pre>
        </div>

        <div class="section">
            <h2>Checking Possible Locations</h2>
            <table>
                <tr>
                    <th>Path</th>
                    <th>Exists?</th>
                    <th>Size</th>
                </tr>
                <?php
                $currentDir = dirname(__FILE__);
                $locations = [
                    'Same dir as this script' => $currentDir . '/200.html',
                    'Laravel public root' => $currentDir . '/200.html',
                    '1 level up (aprati_backend)' => dirname($currentDir) . '/200.html',
                    '2 levels up (sdev.apratifoods.asia)' => dirname(dirname($currentDir)) . '/200.html',
                    '3 levels up (public_html)' => dirname(dirname(dirname($currentDir))) . '/200.html',
                    '4 levels up' => dirname(dirname(dirname(dirname($currentDir)))) . '/200.html',
                    'Subdomain root guess' => str_replace('/aprati_backend/public', '', $currentDir) . '/200.html',
                ];
                
                if (isset($_SERVER['DOCUMENT_ROOT'])) {
                    $locations['Document root'] = $_SERVER['DOCUMENT_ROOT'] . '/200.html';
                }
                
                $foundAt = null;
                foreach ($locations as $label => $path) {
                    $exists = file_exists($path);
                    $size = $exists ? filesize($path) . ' bytes' : 'N/A';
                    $class = $exists ? 'found' : 'notfound';
                    
                    if ($exists && !$foundAt) {
                        $foundAt = $path;
                    }
                    
                    echo "<tr class='$class'>";
                    echo "<td><strong>$label</strong><br><small>$path</small></td>";
                    echo "<td>" . ($exists ? '✅ YES' : '❌ NO') . "</td>";
                    echo "<td>$size</td>";
                    echo "</tr>";
                }
                ?>
            </table>
        </div>

        <?php if ($foundAt): ?>
        <div class="section">
            <h2>✅ Found 200.html!</h2>
            <div class="status success">
                <strong>Location:</strong> <?php echo $foundAt; ?><br>
                <strong>Size:</strong> <?php echo filesize($foundAt); ?> bytes
            </div>
            
            <h3>Preview (first 2000 characters):</h3>
            <pre><?php echo htmlspecialchars(substr(file_get_contents($foundAt), 0, 2000)); ?>...</pre>
            
            <?php
            $content = file_get_contents($foundAt);
            preg_match_all('/<script[^>]*src="([^"]*)"[^>]*>/i', $content, $scriptMatches);
            preg_match_all('/<link[^>]*href="([^"]*)"[^>]*>/i', $content, $linkMatches);
            ?>
            
            <?php if (!empty($scriptMatches[1])): ?>
            <h3>JavaScript Files Referenced:</h3>
            <ul>
                <?php foreach ($scriptMatches[1] as $src): ?>
                    <li><code><?php echo htmlspecialchars($src); ?></code></li>
                <?php endforeach; ?>
            </ul>
            <?php endif; ?>
            
            <?php if (!empty($linkMatches[1])): ?>
            <h3>CSS Files Referenced:</h3>
            <ul>
                <?php foreach ($linkMatches[1] as $href): ?>
                    <li><code><?php echo htmlspecialchars($href); ?></code></li>
                <?php endforeach; ?>
            </ul>
            <?php endif; ?>
        </div>
        <?php else: ?>
        <div class="section">
            <div class="status error">
                <strong>❌ 200.html NOT FOUND in any expected location!</strong>
                <p>This means the Nuxt build files haven't been uploaded to the server yet.</p>
            </div>
            
            <h3>What to do:</h3>
            <ol>
                <li>On your local machine, the files should be at:<br>
                    <code>d:\xammp\htdocs\aprati_web_backup\aprati_backend\public\</code></li>
                <li>Upload ALL files from that folder to:<br>
                    <code>/home/apratifoodscom/public_html/sdev.apratifoods.asia/</code></li>
                <li>Make sure to upload:
                    <ul>
                        <li>200.html</li>
                        <li>index.html</li>
                        <li>_nuxt/ folder (all files inside)</li>
                        <li>_payload/ folder (if exists)</li>
                    </ul>
                </li>
            </ol>
        </div>
        <?php endif; ?>

        <div class="section">
            <h2>Check _nuxt Folder</h2>
            <table>
                <tr>
                    <th>Path</th>
                    <th>Exists?</th>
                    <th>File Count</th>
                </tr>
                <?php
                $nuxtLocations = [
                    'Same dir' => $currentDir . '/_nuxt',
                    '2 levels up' => dirname(dirname($currentDir)) . '/_nuxt',
                    'Subdomain root' => str_replace('/aprati_backend/public', '', $currentDir) . '/_nuxt',
                ];
                
                foreach ($nuxtLocations as $label => $path) {
                    $exists = is_dir($path);
                    $count = 'N/A';
                    if ($exists) {
                        $files = glob($path . '/*');
                        $count = count($files) . ' files';
                    }
                    $class = $exists ? 'found' : 'notfound';
                    
                    echo "<tr class='$class'>";
                    echo "<td><strong>$label</strong><br><small>$path</small></td>";
                    echo "<td>" . ($exists ? '✅ YES' : '❌ NO') . "</td>";
                    echo "<td>$count</td>";
                    echo "</tr>";
                }
                ?>
            </table>
        </div>
    </div>
</body>
</html>
