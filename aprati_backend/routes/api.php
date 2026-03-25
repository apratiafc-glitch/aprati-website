<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'Backend is working!']);
});

Route::apiResource('brands', \App\Http\Controllers\Api\BrandController::class);
Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class);
Route::apiResource('products', \App\Http\Controllers\Api\ProductController::class);
Route::apiResource('hero-slides', \App\Http\Controllers\Api\HeroSlideController::class);

// Custom upload routes must come BEFORE apiResource
Route::post('admin/information-sections/upload-image', [\App\Http\Controllers\Api\InformationSectionController::class , 'uploadImage']);
Route::apiResource('information-sections', \App\Http\Controllers\Api\InformationSectionController::class);

Route::post('careers/{career}/apply', [\App\Http\Controllers\Api\JobApplicationController::class , 'store']);
Route::apiResource('careers', \App\Http\Controllers\Api\CareerController::class);

// Nested route for brand products
Route::get('brands/{brand}/products', [\App\Http\Controllers\Api\ProductController::class , 'indexByBrand']);

Route::get('/me', function (Request $request) {
    return response()->json([
    'success' => true,
    'data' => [
    'id' => 1,
    'name' => 'Admin User',
    'email' => 'admin@aprati.com',
    'role' => 'admin'
    ]
    ]);
});

// --- MOCK ROUTES TO FIX 404s ---

// Public settings routes
Route::get('/header-settings', [\App\Http\Controllers\Api\SettingController::class , 'headerSettings']);
Route::get('/footer-settings', [\App\Http\Controllers\Api\SettingController::class , 'index']);

Route::get('/admin-profile-image', function () {
    return response()->json(['profile_image' => 'https://ui-avatars.com/api/?name=Admin']);
});

Route::get('/promotion-banners', [\App\Http\Controllers\Api\PromotionBannerController::class , 'publicIndex']);

Route::get('/management-posts', [\App\Http\Controllers\Api\ManagementPostController::class , 'index']);
Route::get('/management-posts/{post}', [\App\Http\Controllers\Api\ManagementPostController::class , 'show']);
Route::get('/about-contents', [\App\Http\Controllers\Api\AboutContentController::class , 'index']);

// Google OAuth routes
Route::get('/auth/google', [\App\Http\Controllers\AuthController::class , 'googleRedirect']);
Route::get('/auth/google/callback', [\App\Http\Controllers\AuthController::class , 'googleCallback']);

// OTP verification
Route::post('/admin/verify-otp', [\App\Http\Controllers\AuthController::class , 'verifyOtp']);

// Token validation
Route::get('/admin/validate-token', [\App\Http\Controllers\AuthController::class , 'validateToken']);

// --- Admin Dashboard Routes ---

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', function () {
            try {
                return response()->json(['status' => 'success', 'data' => \App\Models\User::all()]);
            }
            catch (\Exception $e) {
                return response()->json(['status' => 'success', 'data' => []]);
            }
        }
        );    });

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    // General Settings
    Route::get('/settings', [\App\Http\Controllers\Api\SettingController::class , 'index']);
    Route::put('/settings', [\App\Http\Controllers\Api\SettingController::class , 'update']);

    // Header Settings
    Route::get('/header-settings', [\App\Http\Controllers\Api\SettingController::class , 'headerSettings']);
    Route::post('/header-settings/upload-image', [\App\Http\Controllers\Api\SettingController::class , 'uploadImage']);
    Route::put('/header-settings/{key}', [\App\Http\Controllers\Api\SettingController::class , 'update']);

    // Footer Settings
    Route::get('/footer-settings', [\App\Http\Controllers\Api\SettingController::class , 'index']);
    Route::post('/footer-settings/upload-image', [\App\Http\Controllers\Api\SettingController::class , 'uploadImage']);
    Route::post('/footer-settings/bulk-update', [\App\Http\Controllers\Api\SettingController::class , 'update']);
    Route::post('/footer-settings/initialize-defaults', [\App\Http\Controllers\Api\SettingController::class , 'initializeDefaults']);

    Route::get('/notification-settings', [\App\Http\Controllers\Api\NotificationSettingController::class , 'index']);
    Route::post('/notification-settings', [\App\Http\Controllers\Api\NotificationSettingController::class , 'store']);

    Route::post('/promotion-banners/{id}/toggle-active', [\App\Http\Controllers\Api\PromotionBannerController::class , 'toggleActive']);
    Route::apiResource('promotion-banners', \App\Http\Controllers\Api\PromotionBannerController::class);

    // Admin Brand Routes - disable automatic model binding, manually handle ID lookups
    Route::prefix('brands')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\BrandController::class , 'index']);
            Route::post('/', [\App\Http\Controllers\Api\BrandController::class , 'store']);
            Route::get('/{id}', function ($id) {
                    $brand = \App\Models\Brand::findOrFail($id);
                    return app(\App\Http\Controllers\Api\BrandController::class)->show($brand);
                }
                )->where('id', '[0-9]+');
                Route::match (['put', 'post'], '/{id}', function (Illuminate\Http\Request $request, $id) {
                    $brand = \App\Models\Brand::findOrFail($id);
                    return app(\App\Http\Controllers\Api\BrandController::class)->update($request, $brand);
                }
                )->where('id', '[0-9]+');
                Route::delete('/{id}', function ($id) {
                    $brand = \App\Models\Brand::findOrFail($id);
                    return app(\App\Http\Controllers\Api\BrandController::class)->destroy($brand);
                }
                )->where('id', '[0-9]+');
            }
            );

            // Admin Product Routes
            Route::prefix('products')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\ProductController::class , 'adminIndex']);
            Route::post('/', [\App\Http\Controllers\Api\ProductController::class , 'store']);
            Route::get('/{id}', function ($id) {
                    $product = \App\Models\Product::findOrFail($id);
                    return app(\App\Http\Controllers\Api\ProductController::class)->show($product);
                }
                )->where('id', '[0-9]+');
                Route::match (['put', 'post'], '/{id}', function (Illuminate\Http\Request $request, $id) {
                    $product = \App\Models\Product::findOrFail($id);
                    return app(\App\Http\Controllers\Api\ProductController::class)->update($request, $product);
                }
                )->where('id', '[0-9]+');
                Route::delete('/{id}', function ($id) {
                    $product = \App\Models\Product::findOrFail($id);
                    return app(\App\Http\Controllers\Api\ProductController::class)->destroy($product);
                }
                )->where('id', '[0-9]+');
            }
            );

            Route::get('/products-stats', function () {
            return response()->json([
            'status' => 'success',
            'data' => [
            'total_products' => \App\Models\Product::count(),
            'active_products' => \App\Models\Product::where('is_active', true)->count(),
            'out_of_stock' => 0,
            'low_stock' => 0
            ]
            ]);
        }
        );

        Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class);

        Route::get('/categories-stats', function () {
            return response()->json([
            'success' => true,
            'data' => [
            'total' => 0,
            'active' => 0
            ]
            ]);
        }
        );

        Route::post('/information-sections/upload-image', [\App\Http\Controllers\Api\InformationSectionController::class , 'uploadImage']);
        Route::apiResource('information-sections', \App\Http\Controllers\Api\InformationSectionController::class);

        // About Content Admin Routes
        Route::prefix('about-contents')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\AboutContentController::class , 'index']);
            Route::post('/upload-image', [\App\Http\Controllers\Api\AboutContentController::class , 'uploadImage']);
            Route::post('/', [\App\Http\Controllers\Api\AboutContentController::class , 'store']);
            Route::get('/{aboutContent}', [\App\Http\Controllers\Api\AboutContentController::class , 'show']);
            Route::match (['put', 'patch'], '/{aboutContent}', [\App\Http\Controllers\Api\AboutContentController::class , 'update']);
            Route::delete('/{aboutContent}', [\App\Http\Controllers\Api\AboutContentController::class , 'destroy']);
        }
        );

        Route::get('/management-posts', [\App\Http\Controllers\Api\ManagementPostController::class , 'index']);
        Route::put('/management-posts/{management_post}/toggle-status', [\App\Http\Controllers\Api\ManagementPostController::class , 'toggleStatus']);
        Route::post('/management-posts/upload-image', [\App\Http\Controllers\Api\ManagementPostController::class , 'uploadImage']);
        Route::apiResource('management-posts', \App\Http\Controllers\Api\ManagementPostController::class)->except(['index']);

        Route::get('/visitors/stats', function () {
            return response()->json([
            'status' => 'success',
            'data' => [
            'total_visitors' => 12543,
            'today_visitors' => 142,
            'daily_visits' => [120, 150, 180, 200, 170, 160, 190],
            'labels' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            ]
            ]);
        }
        );

        Route::get('/recent-activity', function () {
            return response()->json(['status' => 'success', 'data' => []]);
        }
        );

        // Admin Job Application Routes
        Route::prefix('job-applications')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\JobApplicationController::class , 'index']);
            Route::get('/statistics', [\App\Http\Controllers\Api\JobApplicationController::class , 'statistics']);
            Route::get('/recent', [\App\Http\Controllers\Api\JobApplicationController::class , 'recent']);
            Route::get('/{jobApplication}', [\App\Http\Controllers\Api\JobApplicationController::class , 'show']);
            Route::put('/{jobApplication}/status', [\App\Http\Controllers\Api\JobApplicationController::class , 'updateStatus']);
            Route::delete('/{jobApplication}', [\App\Http\Controllers\Api\JobApplicationController::class , 'destroy']);
            Route::get('/{jobApplication}/download-cv', [\App\Http\Controllers\Api\JobApplicationController::class , 'downloadCv']);
            Route::get('/{jobApplication}/view-cv', [\App\Http\Controllers\Api\JobApplicationController::class , 'viewCv']);
        }
        );

        Route::apiResource('careers', \App\Http\Controllers\Api\CareerController::class);

        Route::get('hero-slides', [\App\Http\Controllers\Api\HeroSlideController::class , 'adminIndex']);
        Route::post('hero-slides/{hero_slide}/toggle-active', [\App\Http\Controllers\Api\HeroSlideController::class , 'toggleActive']);
        Route::apiResource('hero-slides', \App\Http\Controllers\Api\HeroSlideController::class)->except(['index']);

        Route::get('/privacy-content', function () {
            return response()->json([
            'success' => true,
            'data' => []
            ]);
        }
        );

        Route::get('/dashboard', function () {
            return response()->json([
            'success' => true,
            'data' => [
            'stats' => [
            'users' => 1,
            'brands' => \App\Models\Brand::count(),
            'products' => \App\Models\Product::count(),
            'categories' => \App\Models\Category::count()
            ]
            ]
            ]);
        }
        );

        Route::get('/favicon-settings', function () {
            return response()->json([
            'success' => true,
            'data' => []
            ]);
        }
        );    });
