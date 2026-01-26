<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

echo "=================================================\n";
echo "API ENDPOINTS DIAGNOSTIC TOOL\n";
echo "=================================================\n\n";

// List of endpoints to check
$endpoints = [
    'information-sections' => ['GET', '/api/information-sections'],
    'header-settings' => ['GET', '/api/header-settings'],
    'brands' => ['GET', '/api/brands'],
    'admin-profile-image' => ['GET', '/api/admin-profile-image'],
    'hero-image' => ['GET', '/api/hero-image'],
    'hero-content' => ['GET', '/api/hero-content'],
    'footer-settings' => ['GET', '/api/footer-settings'],
];

echo "1. CHECKING REGISTERED ROUTES\n";
echo "-------------------------------------------------\n";

// Get all registered routes
$routes = Route::getRoutes();
$apiRoutes = [];

foreach ($routes as $route) {
    $uri = $route->uri();
    if (strpos($uri, 'api/') === 0) {
        $methods = implode('|', $route->methods());
        $apiRoutes[$uri] = [
            'methods' => $methods,
            'name' => $route->getName(),
            'action' => $route->getActionName(),
        ];
    }
}

echo "Found " . count($apiRoutes) . " API routes\n\n";

// Check each endpoint
echo "2. ENDPOINT STATUS CHECK\n";
echo "-------------------------------------------------\n";

foreach ($endpoints as $name => $config) {
    [$method, $path] = $config;
    $uri = ltrim($path, '/');
    
    echo "\n[$name]\n";
    echo "  Path: $path\n";
    echo "  Method: $method\n";
    
    $found = false;
    foreach ($apiRoutes as $routeUri => $routeInfo) {
        if ($routeUri === $uri || 'api/' . $uri === $routeUri) {
            $found = true;
            echo "  Status: ✅ FOUND\n";
            echo "  Route Name: " . ($routeInfo['name'] ?: 'N/A') . "\n";
            echo "  Controller: " . $routeInfo['action'] . "\n";
            echo "  Methods: " . $routeInfo['methods'] . "\n";
            break;
        }
    }
    
    if (!$found) {
        echo "  Status: ❌ NOT FOUND\n";
        echo "  Action: Route needs to be created in routes/api.php\n";
        
        // Try to find similar routes
        $similar = [];
        foreach ($apiRoutes as $routeUri => $routeInfo) {
            if (stripos($routeUri, $name) !== false) {
                $similar[] = $routeUri;
            }
        }
        
        if (!empty($similar)) {
            echo "  Similar routes found:\n";
            foreach ($similar as $sim) {
                echo "    - $sim\n";
            }
        }
    }
}

echo "\n\n3. ALL REGISTERED API ROUTES\n";
echo "-------------------------------------------------\n";

ksort($apiRoutes);
foreach ($apiRoutes as $uri => $info) {
    echo "\n/$uri\n";
    echo "  Methods: {$info['methods']}\n";
    echo "  Name: " . ($info['name'] ?: 'N/A') . "\n";
    echo "  Action: {$info['action']}\n";
}

echo "\n\n4. DATABASE CHECK\n";
echo "-------------------------------------------------\n";

try {
    DB::connection()->getPdo();
    echo "✅ Database connection: OK\n";
    
    // Check tables
    $tables = [
        'information_sections' => 'InformationSection model',
        'brands' => 'Brand model',
        'settings' => 'Settings/Headers/Footer',
        'users' => 'Admin users',
    ];
    
    echo "\nTables:\n";
    foreach ($tables as $table => $purpose) {
        try {
            $count = DB::table($table)->count();
            echo "  ✅ $table: $count records ($purpose)\n";
        } catch (\Exception $e) {
            echo "  ❌ $table: NOT FOUND\n";
        }
    }
    
} catch (\Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
}

echo "\n\n5. CONTROLLERS CHECK\n";
echo "-------------------------------------------------\n";

$controllers = [
    'App\Http\Controllers\API\InformationSectionController',
    'App\Http\Controllers\API\BrandController',
    'App\Http\Controllers\API\SettingsController',
    'App\Http\Controllers\API\HeroController',
];

foreach ($controllers as $controller) {
    if (class_exists($controller)) {
        echo "✅ $controller\n";
        $methods = get_class_methods($controller);
        $publicMethods = array_filter($methods, function($m) {
            return !in_array($m, ['__construct', 'middleware']) && strpos($m, '__') !== 0;
        });
        if (!empty($publicMethods)) {
            echo "   Methods: " . implode(', ', $publicMethods) . "\n";
        }
    } else {
        echo "❌ $controller (NOT FOUND)\n";
    }
}

echo "\n\n6. RECOMMENDATIONS\n";
echo "-------------------------------------------------\n";

$missingEndpoints = [];
foreach ($endpoints as $name => $config) {
    [$method, $path] = $config;
    $uri = ltrim($path, '/');
    
    $found = false;
    foreach ($apiRoutes as $routeUri => $routeInfo) {
        if ($routeUri === $uri || 'api/' . $uri === $routeUri) {
            $found = true;
            break;
        }
    }
    
    if (!$found) {
        $missingEndpoints[] = $name;
    }
}

if (!empty($missingEndpoints)) {
    echo "\n⚠️  Missing endpoints detected:\n";
    foreach ($missingEndpoints as $endpoint) {
        echo "  - $endpoint\n";
    }
    
    echo "\nTo fix:\n";
    echo "1. Check routes/api.php for route definitions\n";
    echo "2. Verify controllers exist in app/Http/Controllers/API/\n";
    echo "3. Run: php artisan route:list --path=api\n";
    echo "4. Clear route cache: php artisan route:clear\n";
    echo "5. Run migrations if tables are missing: php artisan migrate\n";
} else {
    echo "✅ All required endpoints are registered!\n";
    echo "\nIf you're still getting 404 errors:\n";
    echo "1. Clear route cache: php artisan route:clear\n";
    echo "2. Clear config cache: php artisan config:clear\n";
    echo "3. Check .htaccess file in public directory\n";
    echo "4. Verify API_URL in frontend matches backend URL\n";
}

echo "\n\n=================================================\n";
echo "DIAGNOSTIC COMPLETE\n";
echo "=================================================\n";
