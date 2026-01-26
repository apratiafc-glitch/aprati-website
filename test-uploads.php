<?php
/**
 * Test Upload - Promotion Banners & Hero Slides
 * Access: https://sdev.apratifoods.asia/test-uploads.php?key=aprati2026
 */

// Security check
if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('<h1>Access Denied</h1><p>Add ?key=aprati2026 to the URL</p>');
}

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>

<head>
    <title>Test Upload - Promotion Banners & Hero Slides</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        h1 {
            color: white;
            text-align: center;
            margin-bottom: 30px;
            font-size: 32px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .card h2 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 24px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }

        input[type="text"],
        input[type="url"],
        textarea,
        select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.3s;
        }

        input[type="text"]:focus,
        input[type="url"]:focus,
        textarea:focus,
        select:focus {
            outline: none;
            border-color: #667eea;
        }

        textarea {
            min-height: 100px;
            resize: vertical;
        }

        input[type="file"] {
            padding: 10px;
            border: 2px dashed #667eea;
            border-radius: 6px;
            width: 100%;
            cursor: pointer;
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        button:active {
            transform: translateY(0);
        }

        .result {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            margin-top: 20px;
            display: none;
        }

        .result.show {
            display: block;
        }

        .result h3 {
            color: #667eea;
            margin-bottom: 15px;
        }

        .success {
            color: #27ae60;
            font-weight: bold;
        }

        .error {
            color: #e74c3c;
            font-weight: bold;
        }

        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            margin-top: 10px;
        }

        .note {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }

        .image-preview {
            margin-top: 10px;
            max-width: 100%;
        }

        .image-preview img {
            max-width: 100%;
            max-height: 200px;
            border-radius: 6px;
            border: 2px solid #e0e0e0;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🎨 Test Upload - Promotion Banners & Hero Slides</h1>

        <!-- Authentication Token -->
        <div class="card" style="margin-bottom: 20px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
            <h2 style="color: white; border-color: white;">🔐 Authentication Token</h2>
            <div class="form-group">
                <label style="color: white;">Enter Your Admin Token (will be saved in browser)</label>
                <input type="text" id="authToken" placeholder="Paste your Bearer token here..."
                    style="font-family: monospace;" value="">
            </div>

            <div style="margin-bottom: 15px; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 6px;">
                <div class="checkbox-group">
                    <input type="checkbox" id="usePublicRoute" onchange="toggleAuthMode()"
                        style="width: 20px; height: 20px;">
                    <label for="usePublicRoute" style="color: white; cursor: pointer; user-select: none;">🧪 Use Public
                        Test Mode (No Token Required)</label>
                </div>
                <p style="color: #eee; font-size: 13px; margin-top: 5px; margin-left: 30px;">
                    Uses temporary <code>/api/public-test/*</code> endpoints that bypass authentication.
                </p>
            </div>

            <div style="display: flex; gap: 10px;">
                <button id="saveTokenBtn" onclick="saveToken()" style="background: white; color: #f5576c; flex: 1;">💾
                    Save Token</button>
                <button id="testTokenBtn" onclick="testToken()"
                    style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; flex: 1;">🔌 Test
                    Connection</button>
            </div>
            <p id="tokenStatus" style="color: white; margin-top: 10px; font-weight: bold;"></p>
            <details style="margin-top: 15px;">
                <summary style="color: white; cursor: pointer; font-weight: bold;">❓ How to get your admin token?
                </summary>
                <div style="background: rgba(255,255,255,0.2); padding: 15px; margin-top: 10px; border-radius: 6px;">
                    <p style="color: white; margin-bottom: 10px;"><strong>Option 1: From Admin Panel</strong></p>
                    <ol style="color: white; padding-left: 20px; line-height: 1.8;">
                        <li>Login to your admin panel: <a href="https://sdev.apratifoods.asia/admin" target="_blank"
                                style="color: #fff;">https://sdev.apratifoods.asia/admin</a></li>
                        <li>Open browser DevTools (F12)</li>
                        <li>Go to: Application → Local Storage → https://sdev.apratifoods.asia</li>
                        <li>Look for key like "token", "authToken", or "adminToken"</li>
                        <li>Copy the value and paste above</li>
                    </ol>
                    <p style="color: white; margin: 10px 0;"><strong>Option 2: From Network Tab</strong></p>
                    <ol style="color: white; padding-left: 20px; line-height: 1.8;">
                        <li>Login to admin panel with DevTools open (F12)</li>
                        <li>Go to Network tab</li>
                        <li>Look for the login request</li>
                        <li>Check the response - copy the "token" value</li>
                    </ol>
                </div>
            </details>
        </div>

        <div class="note">
            <strong>⚠️ Important:</strong> Admin endpoints require authentication. Save your token above first!
        </div>

        <div class="cards">
            <!-- Promotion Banner Upload -->
            <div class="card">
                <h2>📢 Upload Promotion Banner</h2>
                <form id="bannerForm" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Title *</label>
                        <input type="text" name="title" required placeholder="e.g., Summer Sale 2026">
                    </div>

                    <div class="form-group">
                        <label>Subtitle</label>
                        <input type="text" name="subtitle" placeholder="Up to 50% OFF">
                    </div>

                    <div class="form-group">
                        <label>Image * (JPG, PNG, WebP - Max 10MB)</label>
                        <input type="file" name="image" accept="image/*" required
                            onchange="previewImage(this, 'bannerPreview')">
                        <div id="bannerPreview" class="image-preview"></div>
                    </div>

                    <div class="form-group">
                        <label>Background Color</label>
                        <input type="text" name="background_color" placeholder="#FF6B6B">
                    </div>

                    <div class="form-group">
                        <label>Text Color</label>
                        <input type="text" name="text_color" placeholder="#FFFFFF">
                    </div>

                    <div class="form-group">
                        <label>Button Text</label>
                        <input type="text" name="button_text" placeholder="Shop Now">
                    </div>

                    <div class="form-group">
                        <label>Button Link</label>
                        <input type="url" name="button_link" placeholder="https://example.com/sale">
                    </div>

                    <div class="form-group">
                        <label>Display Order</label>
                        <input type="text" name="display_order" value="0">
                    </div>

                    <div class="form-group checkbox-group">
                        <input type="checkbox" name="is_active" checked id="banner_active">
                        <label for="banner_active" style="margin: 0;">Active</label>
                    </div>

                    <button type="submit">🚀 Upload Promotion Banner</button>
                </form>
            </div>

            <!-- Hero Slide Upload -->
            <div class="card">
                <h2>🎯 Upload Hero Slide</h2>
                <form id="heroForm" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Title *</label>
                        <input type="text" name="title" required placeholder="e.g., Premium Quality Products">
                    </div>

                    <div class="form-group">
                        <label>Subtitle</label>
                        <textarea name="subtitle" placeholder="Discover our amazing collection..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Image * (JPG, PNG, WebP - Max 10MB)</label>
                        <input type="file" name="image" accept="image/*" required
                            onchange="previewImage(this, 'heroPreview')">
                        <div id="heroPreview" class="image-preview"></div>
                    </div>

                    <div class="form-group">
                        <label>Image Alt Text</label>
                        <input type="text" name="image_alt" placeholder="Hero image description">
                    </div>

                    <div class="form-group">
                        <label>Badge Text</label>
                        <input type="text" name="badge_text" placeholder="New Arrival">
                    </div>

                    <div class="form-group">
                        <label>Primary Button Text</label>
                        <input type="text" name="primary_button_text" placeholder="Shop Now">
                    </div>

                    <div class="form-group">
                        <label>Primary Button Link</label>
                        <input type="url" name="primary_button_link" placeholder="/products">
                    </div>

                    <div class="form-group">
                        <label>Secondary Button Text</label>
                        <input type="text" name="secondary_button_text" placeholder="Learn More">
                    </div>

                    <div class="form-group">
                        <label>Secondary Button Link</label>
                        <input type="url" name="secondary_button_link" placeholder="/about">
                    </div>

                    <div class="form-group">
                        <label>Display Order</label>
                        <input type="text" name="display_order" value="0">
                    </div>

                    <div class="form-group checkbox-group">
                        <input type="checkbox" name="is_active" checked id="hero_active">
                        <label for="hero_active" style="margin: 0;">Active</label>
                    </div>

                    <button type="submit">🚀 Upload Hero Slide</button>
                </form>
            </div>
        </div>

        <!-- Result Display -->
        <div id="result" class="result">
            <h3 id="resultTitle">Response</h3>
            <div id="resultContent"></div>
        </div>
    </div>

    <script>
        // Initialize state
        window.addEventListener('DOMContentLoaded', function() {
            const savedToken = localStorage.getItem('adminToken');
            if (savedToken) {
                document.getElementById('authToken').value = savedToken;
                document.getElementById('tokenStatus').textContent = '✅ Token loaded from storage';
            }
            
            // Restore public mode preference
            if (localStorage.getItem('usePublicRoute') === 'true') {
                document.getElementById('usePublicRoute').checked = true;
                toggleAuthMode();
            }
        });
        
        function toggleAuthMode() {
            const isPublic = document.getElementById('usePublicRoute').checked;
            localStorage.setItem('usePublicRoute', isPublic);
            
            const tokenInput = document.getElementById('authToken');
            const saveBtn = document.getElementById('saveTokenBtn');
            const testBtn = document.getElementById('testTokenBtn');
            const tokenStatus = document.getElementById('tokenStatus');
            
            if (isPublic) {
                tokenInput.disabled = true;
                saveBtn.disabled = true;
                testBtn.disabled = true;
                tokenInput.style.opacity = '0.5';
                saveBtn.style.opacity = '0.5';
                testBtn.style.opacity = '0.5';
                tokenStatus.textContent = '🔓 Public Test Mode Active - Token Ignored';
            } else {
                tokenInput.disabled = false;
                saveBtn.disabled = false;
                testBtn.disabled = false;
                tokenInput.style.opacity = '1';
                saveBtn.style.opacity = '1';
                testBtn.style.opacity = '1';
                // Reload status
                const savedToken = localStorage.getItem('adminToken');
                tokenStatus.textContent = savedToken ? '✅ Token loaded' : '';
            }
        }
        
        function getApiUrl(endpoint) {
            const isPublic = document.getElementById('usePublicRoute').checked;
            if (isPublic) {
                // Map admin endpoints to public test endpoints
                if (endpoint === 'promotion-banners') return 'https://sdev.apratifoods.asia/api/public-test/promotion-banners';
                if (endpoint === 'hero-slides') return 'https://sdev.apratifoods.asia/api/public-test/hero-slides';
            }
            // Standard admin endpoints
            return 'https://sdev.apratifoods.asia/api/admin/' + endpoint;
        }

        function saveToken() {
            const token = document.getElementById('authToken').value.trim();
            if (token) {
                localStorage.setItem('adminToken', token);
                document.getElementById('tokenStatus').textContent = '✅ Token saved successfully!';
            } else {
                document.getElementById('tokenStatus').textContent = '❌ Please enter a token first';
            }
        }
        
        async function testToken() {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                document.getElementById('tokenStatus').textContent = '❌ No token saved to test';
                return;
            }
            
            const statusEl = document.getElementById('tokenStatus');
            statusEl.textContent = '⏳ Testing token transmission...';
            
            try {
                const response = await fetch('https://sdev.apratifoods.asia/debug-headers.php?key=aprati2026', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                
                const data = await response.json();
                
                if (data.authorization_received) {
                    statusEl.innerHTML = '✅ <strong>Connection Successful!</strong><br>Server received token: ' + data.authorization_value_preview;
                } else {
                    statusEl.innerHTML = '❌ <strong>Header Missing!</strong><br>Server did NOT receive Authorization header.';
                }
                
                // Show full debug info in console
                console.log('Header Debug:', data);
                
            } catch (e) {
                statusEl.textContent = '❌ Error testing connection: ' + e.message;
            }
        }

        function getAuthHeaders() {
            const isPublic = document.getElementById('usePublicRoute').checked;
            if (isPublic) {
                return {}; // No token needed
            }
            
            const token = localStorage.getItem('adminToken');
            if (token) {
                return {
                    'Authorization': 'Bearer ' + token
                };
            }
            return {};
        }
        
        function previewImage(input, previewId) {
            const preview = document.getElementById(previewId);
            preview.innerHTML = '';
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.innerHTML = '<img src="' + e.target.result + '" alt="Preview">';
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        // Promotion Banner Form Submit
        document.getElementById('bannerForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const resultDiv = document.getElementById('result');
            const resultTitle = document.getElementById('resultTitle');
            const resultContent = document.getElementById('resultContent');
            
            try {
                const isPublic = document.getElementById('usePublicRoute').checked;
                resultTitle.textContent = isPublic ? '⏳ Uploading (Public Mode)...' : '⏳ Uploading Promotion Banner...';
                resultContent.innerHTML = '<p>Please wait...</p>';
                resultDiv.classList.add('show');
                
                const url = getApiUrl('promotion-banners');
                
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: getAuthHeaders()
                });

                const data = await response.json();

                if (response.ok) {
                    resultTitle.innerHTML = '<span class="success">✅ Success!</span>';
                    resultContent.innerHTML = '<p class="success">Promotion banner uploaded successfully!</p><pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    this.reset();
                    document.getElementById('bannerPreview').innerHTML = '';
                } else {
                    resultTitle.innerHTML = '<span class="error">❌ Error</span>';
                    resultContent.innerHTML = '<p class="error">Status: ' + response.status + '</p><pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    
                    if (response.status === 401) {
                        resultContent.innerHTML += '<p class="error"><strong>Authentication failed!</strong> Please check your token above.</p>';
                    }
                }
            } catch (error) {
                resultTitle.innerHTML = '<span class="error">❌ Error</span>';
                resultContent.innerHTML = '<p class="error">' + error.message + '</p>';
            }
        });
        
        // Hero Slide Form Submit
        document.getElementById('heroForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const resultDiv = document.getElementById('result');
            const resultTitle = document.getElementById('resultTitle');
            const resultContent = document.getElementById('resultContent');
            
            try {
                const isPublic = document.getElementById('usePublicRoute').checked;
                resultTitle.textContent = isPublic ? '⏳ Uploading (Public Mode)...' : '⏳ Uploading Hero Slide...';
                resultContent.innerHTML = '<p>Please wait...</p>';
                resultDiv.classList.add('show');
                
                const url = getApiUrl('hero-slides');
                
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: getAuthHeaders()
                });

                const data = await response.json();

                if (response.ok) {
                    resultTitle.innerHTML = '<span class="success">✅ Success!</span>';
                    resultContent.innerHTML = '<p class="success">Hero slide uploaded successfully!</p><pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    this.reset();
                    document.getElementById('heroPreview').innerHTML = '';
                } else {
                    resultTitle.innerHTML = '<span class="error">❌ Error</span>';
                    resultContent.innerHTML = '<p class="error">Status: ' + response.status + '</p><pre>' + JSON.stringify(data, null, 2) + '</pre>';
                    
                    if (response.status === 401) {
                        resultContent.innerHTML += '<p class="error"><strong>Authentication failed!</strong> Please check your token above.</p>';
                    }
                }
            } catch (error) {
                resultTitle.innerHTML = '<span class="error">❌ Error</span>';
                resultContent.innerHTML = '<p class="error">' + error.message + '</p>';
            }
        });
    </script>
</body>

</html>