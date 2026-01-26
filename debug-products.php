<?php
/**
 * Debug Products API
 * Access: https://sdev.apratifoods.asia/debug-products.php?key=aprati2026
 */

if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('Access Denied');
}

header('Content-Type: text/html; charset=utf-8');

$basePath = __DIR__ . '/aprati_backend';

?>
<!DOCTYPE html>
<html>

<head>
    <title>Debug Products API</title>
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
        }

        h1 {
            color: #2c3e50;
        }

        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }

        .error {
            color: #e74c3c;
        }

        .success {
            color: #27ae60;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🔍 Debug Products API</h1>

        <?php
        try {
            require $basePath . '/vendor/autoload.php';
            $app = require_once $basePath . '/bootstrap/app.php';

            putenv('APP_DEBUG=true');
            $_ENV['APP_DEBUG'] = 'true';
            config(['app.debug' => true]);

            // Enable query logging
            \DB::enableQueryLog();

            $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
            $request = Illuminate\Http\Request::create('/api/products', 'GET');

            ob_start();
            try {
                $response = $kernel->handle($request);
                $output = ob_get_clean();

                $status = $response->getStatusCode();
                $content = $response->getContent();

                // Get executed queries
                $queries = \DB::getQueryLog();

                echo "<h2>Status: <span class='" . ($status == 200 ? 'success' : 'error') . "'>$status</span></h2>";

                echo "<h3>Response:</h3>";
                echo "<pre>" . htmlspecialchars($content) . "</pre>";

                if ($output) {
                    echo "<h3>Debug Output:</h3>";
                    echo "<pre>" . htmlspecialchars($output) . "</pre>";
                }

                if (!empty($queries)) {
                    echo "<h3>Executed Queries:</h3>";
                    foreach ($queries as $i => $query) {
                        echo "<h4>Query #" . ($i + 1) . ":</h4>";
                        echo "<pre>" . htmlspecialchars($query['query']) . "</pre>";
                        echo "<p>Time: {$query['time']}ms</p>";
                    }
                }

            } catch (\Exception $inner) {
                $output = ob_get_clean();
                echo "<h2 class='error'>Inner Exception!</h2>";
                echo "<pre>";
                echo "Message: " . htmlspecialchars($inner->getMessage()) . "\n\n";
                echo "File: " . htmlspecialchars($inner->getFile()) . "\n";
                echo "Line: " . $inner->getLine() . "\n\n";

                if ($inner instanceof \Illuminate\Database\QueryException) {
                    echo "SQL: " . htmlspecialchars($inner->getSql()) . "\n\n";
                    echo "Bindings: " . print_r($inner->getBindings(), true) . "\n\n";
                }

                echo "Stack Trace:\n" . htmlspecialchars($inner->getTraceAsString());
                echo "</pre>";

                if ($output) {
                    echo "<h3>Output:</h3><pre>" . htmlspecialchars($output) . "</pre>";
                }
            }

            $kernel->terminate($request, $response ?? null);

        } catch (Exception $e) {
            echo "<h2 class='error'>Outer Exception Caught!</h2>";
            echo "<pre>";
            echo "Message: " . htmlspecialchars($e->getMessage()) . "\n\n";
            echo "File: " . htmlspecialchars($e->getFile()) . "\n";
            echo "Line: " . $e->getLine() . "\n\n";
            echo "Stack Trace:\n" . htmlspecialchars($e->getTraceAsString());
            echo "</pre>";
        }
        ?>

        <hr>
        <p><strong>DELETE THIS FILE:</strong> <code>debug-products.php</code></p>
    </div>
</body>

</html>