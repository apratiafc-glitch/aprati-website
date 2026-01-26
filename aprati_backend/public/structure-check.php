<?php
header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Structure Checker - Simple Fix Guide</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            color: #fff;
        }
        .container { 
            max-width: 900px; 
            margin: 0 auto; 
            background: rgba(0,0,0,0.4);
            border-radius: 15px;
            padding: 30px;
            backdrop-filter: blur(10px);
        }
        h1 { 
            color: #ffd700; 
            margin-bottom: 10px;
            font-size: 32px;
        }
        h2 { 
            color: #90ee90; 
            margin-top: 25px;
            margin-bottom: 15px;
            font-size: 20px;
            border-left: 4px solid #90ee90;
            padding-left: 10px;
        }
        .box { 
            background: rgba(255,255,255,0.1); 
            padding: 20px; 
            margin: 15px 0; 
            border-radius: 10px;
            border: 2px solid rgba(255,255,255,0.2);
        }
        .path { 
            background: rgba(0,0,0,0.5); 
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            border-left: 5px solid #4fc3f7;
        }
        .found { 
            color: #90ee90; 
            font-weight: bold;
        }
        .missing { 
            color: #ff6b6b; 
            font-weight: bold;
        }
        .step {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            margin: 15px 0;
            border-radius: 10px;
            border: 3px solid #ffd700;
        }
        .step-number {
            background: #ffd700;
            color: #000;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 20px;
            margin-right: 15px;
        }
        .tree {
            font-family: 'Courier New', monospace;
            line-height: 1.8;
            margin-left: 20px;
        }
        button {
            background: #ffd700;
            color: #000;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            margin: 10px 10px 10px 0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        button:hover { 
            background: #ffed4e;
            transform: translateY(-2px);
        }
        code {
            background: rgba(0,0,0,0.5);
            padding: 3px 8px;
            border-radius: 4px;
            color: #ffd700;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Structure Checker</h1>
        <p style="margin-bottom: 20px; font-size: 18px;">Let's see exactly where your files are and what needs to be fixed!</p>

        <?php
        // Get current location
        $currentFile = __FILE__;
        $currentDir = __DIR__;
        $documentRoot = $_SERVER['DOCUMENT_ROOT'] ?? 'N/A';
        
        echo "<h2>📍 Your Current Location</h2>";
        echo "<div class='path'>";
        echo "<strong>This file is at:</strong><br>";
        echo "$currentFile<br><br>";
        echo "<strong>Document Root (where web server looks):</strong><br>";
        echo "$documentRoot";
        echo "</div>";

        // Check where Laravel files are
        echo "<h2>🔍 Scanning for Laravel Files...</h2>";
        
        $possibleLocations = [
            'Same folder as this file' => dirname(__DIR__),
            'aprati_backend in current folder' => __DIR__ . '/aprati_backend',
            'aprati_backend in document root' => $documentRoot . '/aprati_backend',
            'Parent directory' => dirname($documentRoot),
            'Absolute: /home/apratifoodscom/aprati_backend' => '/home/apratifoodscom/aprati_backend',
            'Absolute: /home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend' => '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend',
        ];
        
        $foundLocation = null;
        
        foreach ($possibleLocations as $name => $path) {
            $vendorExists = file_exists("$path/vendor/autoload.php");
            $bootstrapExists = file_exists("$path/bootstrap/app.php");
            $artisanExists = file_exists("$path/artisan");
            
            if ($vendorExists && $bootstrapExists && $artisanExists) {
                $foundLocation = $path;
                echo "<div class='box' style='border-color: #90ee90; background: rgba(144,238,144,0.2);'>";
                echo "✅ <span class='found'>FOUND LARAVEL HERE!</span><br>";
                echo "<strong>$name:</strong><br>";
                echo "<code>$path</code><br><br>";
                echo "✅ vendor/autoload.php<br>";
                echo "✅ bootstrap/app.php<br>";
                echo "✅ artisan";
                echo "</div>";
                break;
            }
        }
        
        if (!$foundLocation) {
            echo "<div class='box' style='border-color: #ff6b6b; background: rgba(255,107,107,0.2);'>";
            echo "❌ <span class='missing'>Laravel files not found in any expected location!</span>";
            echo "</div>";
        } else {
            // Show the structure
            echo "<h2>📂 Your Current Structure</h2>";
            echo "<div class='box'>";
            echo "<div class='tree'>";
            
            // Build structure visualization
            $docRootName = basename($documentRoot);
            $laravelName = basename($foundLocation);
            $laravelPublic = "$foundLocation/public";
            
            echo "🌐 <strong>$documentRoot/</strong> ← Web server points HERE<br>";
            
            // Check if index.php exists in document root
            $indexInRoot = file_exists("$documentRoot/index.php");
            echo "├── " . ($indexInRoot ? "✅" : "❌") . " index.php " . ($indexInRoot ? "" : "← <span class='missing'>MISSING!</span>") . "<br>";
            
            // Check if .htaccess exists in document root
            $htaccessInRoot = file_exists("$documentRoot/.htaccess");
            echo "├── " . ($htaccessInRoot ? "✅" : "❌") . " .htaccess " . ($htaccessInRoot ? "" : "← <span class='missing'>MISSING!</span>") . "<br>";
            
            echo "│<br>";
            echo "└── 📁 <strong>aprati_backend/</strong> ← Your Laravel is HERE<br>";
            echo "    ├── 📁 vendor/ ✅<br>";
            echo "    ├── 📁 bootstrap/ ✅<br>";
            echo "    ├── 📁 app/<br>";
            echo "    ├── 📁 config/<br>";
            echo "    ├── 📁 routes/<br>";
            echo "    ├── 📁 storage/<br>";
            echo "    ├── 📁 public/<br>";
            echo "    │   ├── " . (file_exists("$laravelPublic/index.php") ? "✅" : "❌") . " index.php<br>";
            echo "    │   └── " . (file_exists("$laravelPublic/.htaccess") ? "✅" : "❌") . " .htaccess<br>";
            echo "    ├── ✅ artisan<br>";
            echo "    └── " . (file_exists("$foundLocation/.env") ? "✅" : "❌") . " .env<br>";
            
            echo "</div>";
            echo "</div>";
            
            // Determine the fix needed
            echo "<h2>💡 Your Fix</h2>";
            
            if (!$indexInRoot) {
                echo "<div class='step'>";
                echo "<span class='step-number'>1</span>";
                echo "<strong style='font-size: 18px;'>Change Document Root in cPanel</strong><br><br>";
                echo "Your web server is looking at:<br>";
                echo "<code>$documentRoot</code><br><br>";
                echo "But your Laravel public folder is at:<br>";
                echo "<code>$laravelPublic</code><br><br>";
                echo "<strong>IN CPANEL:</strong><br>";
                echo "1. Go to <strong>Domains</strong> section<br>";
                echo "2. Find <strong>sdev.apratifoods.asia</strong><br>";
                echo "3. Click <strong>Manage</strong><br>";
                echo "4. Change <strong>Document Root</strong> to:<br>";
                echo "<code>$laravelPublic</code><br>";
                echo "5. Click <strong>Save</strong>";
                echo "</div>";
                
                echo "<div class='step'>";
                echo "<span class='step-number'>2</span>";
                echo "<strong style='font-size: 18px;'>Alternative: Copy Files (if you can't change document root)</strong><br><br>";
                echo "Copy these files TO document root:<br><br>";
                echo "<strong>FROM:</strong> <code>$laravelPublic/index.php</code><br>";
                echo "<strong>TO:</strong> <code>$documentRoot/index.php</code><br><br>";
                echo "<strong>FROM:</strong> <code>$laravelPublic/.htaccess</code><br>";
                echo "<strong>TO:</strong> <code>$documentRoot/.htaccess</code><br><br>";
                echo "<em>But you MUST update paths in index.php to point to:</em><br>";
                echo "<code>$foundLocation</code>";
                echo "</div>";
            } else {
                echo "<div class='step'>";
                echo "<span class='step-number'>✓</span>";
                echo "<strong style='font-size: 18px;'>Files are in place!</strong><br><br>";
                echo "Now test your API:<br>";
                echo "<button onclick='window.open(\"/api/brands\", \"_blank\")'>Test /api/brands</button>";
                echo "</div>";
            }
            
            // Show exact paths
            echo "<h2>📝 Exact Paths Reference</h2>";
            echo "<div class='box'>";
            echo "<strong>Laravel Root:</strong><br>";
            echo "<code>$foundLocation</code><br><br>";
            echo "<strong>Laravel Public:</strong><br>";
            echo "<code>$laravelPublic</code><br><br>";
            echo "<strong>Vendor Folder:</strong><br>";
            echo "<code>$foundLocation/vendor</code> ✅<br><br>";
            echo "<strong>Current Document Root:</strong><br>";
            echo "<code>$documentRoot</code>";
            echo "</div>";
        }
        ?>

        <h2>🔄 Quick Actions</h2>
        <button onclick="location.reload()">🔄 Refresh</button>
        <button onclick="window.open('/api/brands', '_blank')">🧪 Test API</button>
        <button onclick="window.open('/check-errors.php', '_blank')">🔍 Detailed Diagnostics</button>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid rgba(255,255,255,0.2); opacity: 0.7;">
            <small>Generated: <?php echo date('Y-m-d H:i:s'); ?></small>
        </div>
    </div>
</body>
</html>
