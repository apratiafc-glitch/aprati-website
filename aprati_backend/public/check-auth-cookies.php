<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Auth Cookie Diagnostic</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
        .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #2196F3; }
        .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .warning { background: #fff3cd; color: #856404; border: 1px solid #ffeeba; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
        code { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
        .check { color: #4CAF50; font-weight: bold; }
        .cross { color: #f44336; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍪 Auth Cookie Diagnostic Tool</h1>
        
        <div class="section">
            <h2>PHP Cookies ($_COOKIE)</h2>
            <?php if (!empty($_COOKIE)): ?>
                <div class="status success">
                    <strong>✅ Cookies Found:</strong> <?php echo count($_COOKIE); ?> cookies detected
                </div>
                <pre><?php print_r($_COOKIE); ?></pre>
            <?php else: ?>
                <div class="status error">
                    <strong>❌ No Cookies:</strong> No cookies detected in PHP $_COOKIE
                </div>
            <?php endif; ?>
        </div>

        <div class="section">
            <h2>JavaScript Cookie Check</h2>
            <div id="js-cookies" class="status warning">
                Checking JavaScript cookies...
            </div>
            <div id="cookie-list"></div>
        </div>

        <div class="section">
            <h2>Auth-Specific Cookies</h2>
            <div id="auth-status"></div>
        </div>

        <div class="section">
            <h2>Domain & Path Info</h2>
            <pre><?php
echo "Current Domain: " . $_SERVER['HTTP_HOST'] . "\n";
echo "Request URI: " . $_SERVER['REQUEST_URI'] . "\n";
echo "Server Name: " . $_SERVER['SERVER_NAME'] . "\n";
echo "Protocol: " . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'HTTPS' : 'HTTP') . "\n";
            ?></pre>
        </div>

        <div class="section">
            <h2>Instructions</h2>
            <ol>
                <li>Log in to the admin panel first</li>
                <li>Then come back to this page (keep the tab open or open in new tab)</li>
                <li>Check if <code>auth-token</code> and <code>auth-user</code> cookies are present</li>
                <li>If missing, the login is not setting cookies properly</li>
            </ol>
        </div>
    </div>

    <script>
        // Check JavaScript cookies
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }

        function getAllCookies() {
            const cookies = document.cookie.split(';');
            const cookieObj = {};
            cookies.forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name) cookieObj[name] = value;
            });
            return cookieObj;
        }

        // Display all cookies
        const allCookies = getAllCookies();
        const cookieCount = Object.keys(allCookies).length;
        
        const jsCookiesDiv = document.getElementById('js-cookies');
        const cookieListDiv = document.getElementById('cookie-list');
        
        if (cookieCount > 0) {
            jsCookiesDiv.className = 'status success';
            jsCookiesDiv.innerHTML = '<strong>✅ JavaScript Cookies Found:</strong> ' + cookieCount + ' cookies detected';
            
            let cookieHtml = '<pre>';
            for (const [name, value] of Object.entries(allCookies)) {
                cookieHtml += name + ' = ' + (value.length > 50 ? value.substring(0, 50) + '...' : value) + '\n';
            }
            cookieHtml += '</pre>';
            cookieListDiv.innerHTML = cookieHtml;
        } else {
            jsCookiesDiv.className = 'status error';
            jsCookiesDiv.innerHTML = '<strong>❌ No JavaScript Cookies:</strong> No cookies found via document.cookie';
        }

        // Check auth-specific cookies
        const authToken = getCookie('auth-token');
        const authUser = getCookie('auth-user');
        const adminToken = getCookie('admin_token');
        
        const authStatusDiv = document.getElementById('auth-status');
        let authHtml = '';
        
        authHtml += '<div class="status ' + (authToken ? 'success' : 'error') + '">';
        authHtml += (authToken ? '<span class="check">✅</span>' : '<span class="cross">❌</span>');
        authHtml += ' <strong>auth-token:</strong> ' + (authToken ? 'Present (' + authToken.substring(0, 30) + '...)' : 'Missing') + '</div>';
        
        authHtml += '<div class="status ' + (authUser ? 'success' : 'error') + '">';
        authHtml += (authUser ? '<span class="check">✅</span>' : '<span class="cross">❌</span>');
        authHtml += ' <strong>auth-user:</strong> ' + (authUser ? 'Present' : 'Missing') + '</div>';
        
        authHtml += '<div class="status ' + (adminToken ? 'success' : 'error') + '">';
        authHtml += (adminToken ? '<span class="check">✅</span>' : '<span class="cross">❌</span>');
        authHtml += ' <strong>admin_token:</strong> ' + (adminToken ? 'Present' : 'Missing (legacy)') + '</div>';
        
        authStatusDiv.innerHTML = authHtml;
        
        if (!authToken || !authUser) {
            authStatusDiv.innerHTML += '<div class="status error" style="margin-top: 15px;"><strong>⚠️ Problem Found:</strong> Required authentication cookies are missing! This is why you\'re being redirected to /login.</div>';
            authStatusDiv.innerHTML += '<div class="status warning" style="margin-top: 10px;"><strong>Solution:</strong> Log in to the admin panel. The login process should set these cookies.</div>';
        } else {
            authStatusDiv.innerHTML += '<div class="status success" style="margin-top: 15px;"><strong>✅ Authentication OK:</strong> All required cookies are present. Navigation should work.</div>';
        }
    </script>
</body>
</html>
