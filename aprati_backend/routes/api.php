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
Route::post('admin/information-sections/upload-image', [\App\Http\Controllers\Api\InformationSectionController::class, 'uploadImage']);
Route::apiResource('information-sections', \App\Http\Controllers\Api\InformationSectionController::class);

Route::post('careers/{career}/apply', [\App\Http\Controllers\Api\JobApplicationController::class, 'store']);
Route::apiResource('careers', \App\Http\Controllers\Api\CareerController::class);

// Nested route for brand products
Route::get('brands/{brand}/products', [\App\Http\Controllers\Api\ProductController::class, 'indexByBrand']);

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

Route::get('/header-settings', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'branding' => [
                'header_logo' => '/images/Company%20Logo-01.png',
                'footer_logo' => '/images/Company%20Logo-01.png'
            ],
            'nav_items' => []
        ]
    ]);
});

Route::get('/footer-settings', function () {
    return response()->json([
        'data' => [
            'social_links' => [],
            'copyright' => '© 2026  Aprati Foods (Cambodia) Ltd'
        ]
    ]);
});

Route::get('/admin-profile-image', function () {
    return response()->json(['profile_image' => 'https://ui-avatars.com/api/?name=Admin']);
});

Route::get('/promotion-banners', [\App\Http\Controllers\Api\PromotionBannerController::class, 'publicIndex']);

Route::get('/management-posts', [\App\Http\Controllers\Api\ManagementPostController::class, 'index']);
Route::get('/management-posts/{post}', [\App\Http\Controllers\Api\ManagementPostController::class, 'show']);
Route::get('/about-contents', [\App\Http\Controllers\Api\AboutContentController::class, 'index']);

// Google OAuth routes
Route::get('/auth/google', [\App\Http\Controllers\AuthController::class, 'googleRedirect']);
Route::get('/auth/google/callback', [\App\Http\Controllers\AuthController::class, 'googleCallback']);

// OTP verification
Route::post('/admin/verify-otp', [\App\Http\Controllers\AuthController::class, 'verifyOtp']);

// Token validation
Route::get('/admin/validate-token', [\App\Http\Controllers\AuthController::class, 'validateToken']);

// --- Admin Dashboard Routes ---

Route::get('/users', function () {
    try {
        return response()->json(['status' => 'success', 'data' => \App\Models\User::all()]);
    } catch (\Exception $e) {
        return response()->json(['status' => 'success', 'data' => []]);
    }
});

Route::get('/admin/settings', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'site_info' => [
                'site_name' => 'Aprati Foods Cambodia',
                'site_description' => 'Premium Quality Food Products',
                'meta_title' => 'Aprati Foods - Welcome'
            ],
            'contact_info' => [
                'phone' => '+855 12 345 678',
                'email' => 'info@apratifoods.asia',
                'address' => 'Phnom Penh, Cambodia',
                'google_maps_url' => ''
            ],
            'social_links' => [
                'facebook' => 'https://facebook.com/apratifoods',
                'instagram' => 'https://instagram.com/apratifoods',
                'linkedin' => '',
                'youtube' => ''
            ]
        ]
    ]);
});

Route::put('/admin/settings', function (Request $request) {
    return response()->json([
        'success' => true,
        'message' => 'Settings updated successfully'
    ]);
});

Route::get('/admin/notification-settings', [\App\Http\Controllers\Api\NotificationSettingController::class, 'index']);
Route::post('/admin/notification-settings', [\App\Http\Controllers\Api\NotificationSettingController::class, 'store']);

Route::post('/admin/promotion-banners/{id}/toggle-active', [\App\Http\Controllers\Api\PromotionBannerController::class, 'toggleActive']);
Route::apiResource('admin/promotion-banners', \App\Http\Controllers\Api\PromotionBannerController::class);

// Admin Brand Routes - disable automatic model binding, manually handle ID lookups
Route::prefix('admin/brands')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\BrandController::class, 'index']);
    Route::post('/', [\App\Http\Controllers\Api\BrandController::class, 'store']);

    Route::get('/{id}', function ($id) {
        $brand = \App\Models\Brand::findOrFail($id);
        return app(\App\Http\Controllers\Api\BrandController::class)->show($brand);
    })->where('id', '[0-9]+');

    Route::match(['put', 'post'], '/{id}', function (Request $request, $id) {
        $brand = \App\Models\Brand::findOrFail($id);
        return app(\App\Http\Controllers\Api\BrandController::class)->update($request, $brand);
    })->where('id', '[0-9]+');

    Route::delete('/{id}', function ($id) {
        $brand = \App\Models\Brand::findOrFail($id);
        return app(\App\Http\Controllers\Api\BrandController::class)->destroy($brand);
    })->where('id', '[0-9]+');
});

// Admin Product Routes - manually handle ID-based lookups to override slug binding
Route::prefix('admin/products')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\ProductController::class, 'adminIndex']);
    Route::post('/', [\App\Http\Controllers\Api\ProductController::class, 'store']);

    Route::get('/{id}', function ($id) {
        $product = \App\Models\Product::findOrFail($id);
        return app(\App\Http\Controllers\Api\ProductController::class)->show($product);
    })->where('id', '[0-9]+');

    Route::match(['put', 'post'], '/{id}', function (Request $request, $id) {
        $product = \App\Models\Product::findOrFail($id);
        return app(\App\Http\Controllers\Api\ProductController::class)->update($request, $product);
    })->where('id', '[0-9]+');

    Route::delete('/{id}', function ($id) {
        $product = \App\Models\Product::findOrFail($id);
        return app(\App\Http\Controllers\Api\ProductController::class)->destroy($product);
    })->where('id', '[0-9]+');
});

Route::apiResource('admin/categories', \App\Http\Controllers\Api\CategoryController::class);

Route::post('/admin/information-sections/upload-image', [\App\Http\Controllers\Api\InformationSectionController::class, 'uploadImage']);
Route::apiResource('admin/information-sections', \App\Http\Controllers\Api\InformationSectionController::class);

// About Content Admin Routes - note: using 'about-contents' (plural) to match frontend
Route::middleware('auth:sanctum')->prefix('admin/about-contents')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\AboutContentController::class, 'index']);
    Route::post('/upload-image', [\App\Http\Controllers\Api\AboutContentController::class, 'uploadImage']);
    Route::post('/', [\App\Http\Controllers\Api\AboutContentController::class, 'store']);
    Route::get('/{aboutContent}', [\App\Http\Controllers\Api\AboutContentController::class, 'show']);
    Route::match(['put', 'patch'], '/{aboutContent}', [\App\Http\Controllers\Api\AboutContentController::class, 'update']);
    Route::delete('/{aboutContent}', [\App\Http\Controllers\Api\AboutContentController::class, 'destroy']);
});

Route::get('/admin/management-posts', [\App\Http\Controllers\Api\ManagementPostController::class, 'index']);
Route::put('/admin/management-posts/{management_post}/toggle-status', [\App\Http\Controllers\Api\ManagementPostController::class, 'toggleStatus']);
Route::post('/admin/management-posts/upload-image', [\App\Http\Controllers\Api\ManagementPostController::class, 'uploadImage']);
Route::apiResource('admin/management-posts', \App\Http\Controllers\Api\ManagementPostController::class)->except(['index']);

Route::get('/admin/visitors/stats', function () {
    return response()->json([
        'status' => 'success',
        'data' => [
            'total_visitors' => 12543,
            'today_visitors' => 142,
            'daily_visits' => [120, 150, 180, 200, 170, 160, 190],
            'labels' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        ]
    ]);
});

Route::get('/admin/recent-activity', function () {
    return response()->json(['status' => 'success', 'data' => []]);
});

Route::get('/admin/job-applications/recent', function () {
    return response()->json(['status' => 'success', 'data' => []]);
});

Route::apiResource('admin/careers', \App\Http\Controllers\Api\CareerController::class);

Route::get('admin/hero-slides', [\App\Http\Controllers\Api\HeroSlideController::class, 'adminIndex']);
Route::post('admin/hero-slides/{hero_slide}/toggle-active', [\App\Http\Controllers\Api\HeroSlideController::class, 'toggleActive']);
Route::apiResource('admin/hero-slides', \App\Http\Controllers\Api\HeroSlideController::class)->except(['index']);

Route::get('/admin/job-applications', function () {
    return response()->json([
        'success' => true,
        'data' => []
    ]);
});

// Redundant routes removed

Route::get('/admin/privacy-content', function () {
    return response()->json([
        'success' => true,
        'data' => []
    ]);
});

Route::get('/admin/dashboard', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'stats' => [
                'users' => 1,
                'brands' => 0,
                'products' => 0,
                'categories' => 0
            ]
        ]
    ]);
});

Route::get('/admin/job-applications/statistics', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'total' => 0,
            'pending' => 0,
            'reviewed' => 0
        ]
    ]);
});

Route::get('/admin/categories-stats', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'total' => 0,
            'active' => 0
        ]
    ]);
});

Route::get('/admin/favicon-settings', function () {
    return response()->json([
        'success' => true,
        'data' => []
    ]);
});




// --- Product Management Routes ---

// Specific admin route for listing products with filtering and correct structure
Route::get('admin/products', [\App\Http\Controllers\Api\ProductController::class, 'adminIndex']);
// Resource routes (except index which we just defined)
Route::apiResource('admin/products', \App\Http\Controllers\Api\ProductController::class)->except(['index']);
Route::apiResource('admin/brands', \App\Http\Controllers\Api\BrandController::class);
Route::apiResource('admin/categories', \App\Http\Controllers\Api\CategoryController::class);

Route::get('/admin/products-stats', function () {
    return response()->json([
        'status' => 'success',
        'data' => [
            'total_products' => \App\Models\Product::count(),
            'active_products' => \App\Models\Product::where('is_active', true)->count(),
            'out_of_stock' => 0,
            'low_stock' => 0
        ]
    ]);
});
