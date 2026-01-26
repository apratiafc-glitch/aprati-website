<?php
/**
 * Test Products API After Fix
 * Access: https://sdev.apratifoods.asia/test-products-fix.php?key=aprati2026
 */

if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('Access Denied');
}

header('Content-Type: text/html; charset=utf-8');

?>
<!DOCTYPE html>
<html>

<head>
    <title>Test Products API</title>
    <style>
        body {
            font-family: Arial;
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background: #f5f5f5;
        }

        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #2c3e50;
        }

        .success {
            color: #27ae60;
            font-size: 20px;
            font-weight: bold;
        }

        .error {
            color: #e74c3c;
            font-size: 20px;
            font-weight: bold;
        }

        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            max-height: 500px;
        }

        .badge {
            padding: 5px 10px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
        }

        .badge-success {
            background: #27ae60;
        }

        .badge-error {
            background: #e74c3c;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🧪 Testing Products API After Fix</h1>

        <?php
        echo "<h2>Test #1: Using cURL (Real HTTP Request)</h2>";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://sdev.apratifoods.asia/api/products');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode == 200) {
            echo "<p class='success'>✅ SUCCESS! Status: <span class='badge badge-success'>$httpCode OK</span></p>";
            $data = json_decode($response, true);
            echo "<p><strong>Products Count:</strong> " . count($data['data']['products'] ?? []) . "</p>";
        } else {
            echo "<p class='error'>❌ FAILED! Status: <span class='badge badge-error'>$httpCode</span></p>";
        }

        echo "<h3>Response:</h3>";
        echo "<pre>" . htmlspecialchars(json_encode(json_decode($response), JSON_PRETTY_PRINT)) . "</pre>";

        // Test direct Laravel call
        echo "<h2>Test #2: Direct Laravel Call</h2>";

        try {
            $basePath = __DIR__ . '/aprati_backend';
            require $basePath . '/vendor/autoload.php';
            $app = require_once $basePath . '/bootstrap/app.php';

            $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
            $request = Illuminate\Http\Request::create('/api/products', 'GET');

            $response = $kernel->handle($request);
            $content = $response->getContent();
            $status = $response->getStatusCode();

            if ($status == 200) {
                echo "<p class='success'>✅ SUCCESS! Status: <span class='badge badge-success'>$status OK</span></p>";
            } else {
                echo "<p class='error'>❌ Status: <span class='badge badge-error'>$status</span></p>";
            }

            echo "<h3>Response:</h3>";
            echo "<pre>" . htmlspecialchars(json_encode(json_decode($content), JSON_PRETTY_PRINT)) . "</pre>";

            $kernel->terminate($request, $response);

        } catch (Exception $e) {
            echo "<p class='error'>❌ Exception: " . htmlspecialchars($e->getMessage()) . "</p>";
        }
        ?>

        <hr>
        <h2>🎉 If Both Tests Show ✅ SUCCESS:</h2>
        <p>The Products API is now working! The fix successfully avoided the MySQL temp table issue.</p>

        <h3>Next Steps:</h3>
        <ul>
            <li><a href="test-real-apis.php?key=aprati2026">Run Full API Test Suite</a></li>
            <li>Cleanup diagnostic files (listed below)</li>
        </ul>

        <h3>Files to Delete:</h3>
        <pre>check-structure.php
crud-diagnostic.php
debug-products.php
deploy-htaccess.php
error-checker.php
fix-app-url.php
fix-crud.php
fix-web-root-htaccess.php
simple-diagnostic.php
test-api-errors.php
test-products-fix.php
test-real-apis.php
view-htaccess.php</pre>
    </div>
</body>

</html>