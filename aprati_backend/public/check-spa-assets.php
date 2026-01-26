<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>SPA Assets Diagnostic</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
        .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #2196F3; }
        .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .warning { background: #fff3cd; color: #856404; border: 1px solid #ffeeba; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px; }
        code { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
        button { background: #2196F3; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 5px; }
        button:hover { background: #1976D2; }
        #test-results { margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 SPA Assets & Routing Diagnostic</h1>
        
        <div class="section">
            <h2>200.html Content Check</h2>
            <?php
            // Go up 3 levels: public/ -> aprati_backend/ -> sdev.apratifoods.asia/
            $subdomainRoot = dirname(dirname(dirname(__FILE__)));
            $fallbackPath = $subdomainRoot . '/200.html';
            
            if (file_exists($fallbackPath)) {
                $content = file_get_contents($fallbackPath);
                $size = filesize($fallbackPath);
                
                echo '<div class="status success">';
                echo '<strong>✅ 200.html Found:</strong> ' . $size . ' bytes<br>';
                echo '<strong>Path:</strong> ' . $fallbackPath;
                echo '</div>';
                
                // Extract script src
                preg_match_all('/<script[^>]*src="([^"]*)"[^>]*>/', $content, $matches);
                if (!empty($matches[1])) {
                    echo '<h3>JavaScript Files Referenced:</h3>';
                    echo '<ul>';
                    foreach ($matches[1] as $src) {
                        echo '<li><code>' . htmlspecialchars($src) . '</code></li>';
                    }
                    echo '</ul>';
                }
                
                // Extract link href
                preg_match_all('/<link[^>]*href="([^"]*)"[^>]*>/', $content, $cssMatches);
                if (!empty($cssMatches[1])) {
                    echo '<h3>CSS Files Referenced:</h3>';
                    echo '<ul>';
                    foreach ($cssMatches[1] as $href) {
                        echo '<li><code>' . htmlspecialchars($href) . '</code></li>';
                    }
                    echo '</ul>';
                }
                
                echo '<h3>200.html Preview (first 1000 chars):</h3>';
                echo '<pre>' . htmlspecialchars(substr($content, 0, 1000)) . '...</pre>';
            } else {
                echo '<div class="status error">';
                echo '<strong>❌ 200.html NOT FOUND</strong><br>';
                echo 'Expected at: ' . $fallbackPath;
                echo '</div>';
            }
            ?>
        </div>

        <div class="section">
            <h2>Asset Loading Test</h2>
            <p>Click the button below to test if JavaScript assets can be loaded:</p>
            <button onclick="testAssetLoading()">Test Asset Loading</button>
            <button onclick="testVueRouter()">Test Vue Router</button>
            <button onclick="clearCacheAndReload()">Clear Cache & Reload</button>
            <div id="test-results"></div>
        </div>

        <div class="section">
            <h2>Current Location Info</h2>
            <div id="location-info"></div>
        </div>

        <div class="section">
            <h2>Recommendations</h2>
            <div id="recommendations" class="status warning">
                <strong>⚠️ If navigation redirects to /login despite cookies being present:</strong>
                <ol>
                    <li><strong>Clear Browser Cache:</strong> Press <code>Ctrl+Shift+Delete</code>, select "All time", clear cached images and files</li>
                    <li><strong>Hard Reload:</strong> Press <code>Ctrl+F5</code> or <code>Shift+F5</code> to force reload without cache</li>
                    <li><strong>Test in Incognito:</strong> Open an incognito window, log in, and test navigation</li>
                    <li><strong>Check Browser Console:</strong> Press <code>F12</code>, go to Console tab, look for JavaScript errors</li>
                    <li><strong>Check Network Tab:</strong> Press <code>F12</code>, go to Network tab, reload page, look for 404 errors on .js files</li>
                </ol>
            </div>
        </div>
    </div>

    <script>
        // Display current location info
        function updateLocationInfo() {
            const info = document.getElementById('location-info');
            info.innerHTML = `
                <pre>Current URL: ${window.location.href}
Protocol: ${window.location.protocol}
Host: ${window.location.host}
Pathname: ${window.location.pathname}
Cookies: ${document.cookie ? 'Present' : 'None'}
User Agent: ${navigator.userAgent}</pre>
            `;
        }
        updateLocationInfo();

        // Test asset loading
        function testAssetLoading() {
            const resultsDiv = document.getElementById('test-results');
            resultsDiv.innerHTML = '<div class="status warning">Testing asset loading...</div>';
            
            // Try to load a common Nuxt asset
            const testPaths = [
                '/_nuxt/entry.BDTBZ547.css',
                '/_nuxt/D-fVgYib.js',
                '/200.html',
                '/index.html'
            ];
            
            let results = '<h3>Asset Accessibility Test:</h3>';
            let testCount = 0;
            
            testPaths.forEach(path => {
                fetch(path, { method: 'HEAD' })
                    .then(response => {
                        testCount++;
                        if (response.ok) {
                            results += `<div class="status success">✅ ${path} - OK (${response.status})</div>`;
                        } else {
                            results += `<div class="status error">❌ ${path} - Failed (${response.status})</div>`;
                        }
                        
                        if (testCount === testPaths.length) {
                            resultsDiv.innerHTML = results;
                        }
                    })
                    .catch(error => {
                        testCount++;
                        results += `<div class="status error">❌ ${path} - Error: ${error.message}</div>`;
                        
                        if (testCount === testPaths.length) {
                            resultsDiv.innerHTML = results;
                        }
                    });
            });
        }

        // Test Vue Router presence
        function testVueRouter() {
            const resultsDiv = document.getElementById('test-results');
            
            if (typeof window.__NUXT__ !== 'undefined') {
                resultsDiv.innerHTML = '<div class="status success"><strong>✅ Nuxt Instance Found!</strong><br>Vue Router should be working. The SPA is loaded.</div>';
            } else {
                resultsDiv.innerHTML = '<div class="status error"><strong>❌ Nuxt Instance NOT Found!</strong><br>The SPA JavaScript hasn\'t loaded properly. This is why navigation isn\'t working.</div>';
                resultsDiv.innerHTML += '<div class="status warning" style="margin-top: 10px;"><strong>Solution:</strong> Clear your browser cache and hard reload (Ctrl+F5).</div>';
            }
        }

        // Clear cache and reload
        function clearCacheAndReload() {
            if (confirm('This will reload the page. Continue?')) {
                // Try to clear cache via service worker if present
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(registrations => {
                        registrations.forEach(registration => registration.unregister());
                    });
                }
                
                // Hard reload
                window.location.reload(true);
            }
        }

        // Auto-run tests on load
        setTimeout(() => {
            testVueRouter();
        }, 500);
    </script>
</body>
</html>
