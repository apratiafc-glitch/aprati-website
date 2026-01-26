<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\HeroImageController;
use App\Http\Controllers\Api\HeroContentController;
use App\Http\Controllers\Api\HeroSlideController;
use App\Http\Controllers\Api\PromotionBannerController;
use App\Http\Controllers\Api\PrivacyContentController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\JobApplicationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Diagnostic route to check request format
Route::post('/debug-request', function (Request $request) {
    return response()->json([
        'method' => $request->method(),
        'content_type' => $request->header('Content-Type'),
        'has_files' => $request->hasFile('image'),
        'all_files' => $request->allFiles(),
        'all_data' => $request->all(),
        'raw_content' => substr($request->getContent(), 0, 200) . '...'
    ]);
});

// Test upload without auth (for debugging only)
Route::post('/test-upload/{id}', function (Request $request, $id) {
    try {
        \Log::info('Test upload started', [
            'id' => $id,
            'has_file' => $request->hasFile('image'),
            'files' => $request->allFiles()
        ]);

        $content = \App\Models\AboutContent::findOrFail($id);

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid image file',
                'errors' => $validator->errors()
            ], 422);
        }

        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $imagePath = $image->storeAs('about-content', $imageName, 'public');
        $imageUrl = asset('storage/' . $imagePath);

        $content->update(['image_url' => $imageUrl]);

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'data' => ['url' => $imageUrl, 'path' => $imagePath]
        ]);

    } catch (\Exception $e) {
        \Log::error('Test upload error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
});

// Test the exact same controller logic with debug middleware
Route::middleware([\App\Http\Middleware\DebugAuthMiddleware::class])->post('/test-controller-upload/{id}', [\App\Http\Controllers\Admin\AboutContentController::class, 'uploadImage']);

// Token validation endpoint (no auth required)
Route::post('/validate-token', function (Request $request) {
    $authHeader = $request->header('Authorization');
    $bearerToken = $authHeader ? str_replace('Bearer ', '', $authHeader) : null;

    if (!$bearerToken) {
        return response()->json([
            'valid' => false,
            'message' => 'No token provided',
            'auth_header' => $authHeader
        ]);
    }

    // Try to find the token
    $token = \Laravel\Sanctum\PersonalAccessToken::findToken($bearerToken);

    if (!$token) {
        return response()->json([
            'valid' => false,
            'message' => 'Token not found',
            'token_preview' => substr($bearerToken, 0, 10) . '...'
        ]);
    }

    return response()->json([
        'valid' => true,
        'message' => 'Token is valid',
        'user' => $token->tokenable,
        'token_name' => $token->name,
        'created_at' => $token->created_at
    ]);
});

// Test auth debug route
Route::middleware(['auth:sanctum', \App\Http\Middleware\DebugAuthMiddleware::class])->post('/debug-upload/{id}', function (Request $request, $id) {
    return response()->json([
        'success' => true,
        'message' => 'Auth debug passed',
        'user' => auth()->user(),
        'id' => $id
    ]);
});

// Test categories route (public for testing)
Route::get('/test-categories', function () {
    try {
        $categories = \App\Models\Category::with(['parent', 'children'])->get();
        return response()->json([
            'success' => true,
            'message' => 'Categories loaded successfully',
            'data' => [
                'categories' => $categories->map(function ($cat) {
                    return $cat->toApiArray();
                }),
                'count' => $categories->count()
            ]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
});

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Telegram authentication routes
Route::post('/auth/telegram', [\App\Http\Controllers\TelegramAuthController::class, 'login']);
Route::get('/auth/telegram/bot-info', [\App\Http\Controllers\TelegramAuthController::class, 'getBotInfo']);

// Admin login route
Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::post('/admin/verify-otp', [AuthController::class, 'verifyAdminOTP']);

// Debug route for admin login
Route::post('/debug/admin-login', function (Request $request) {
    \Log::info('Debug admin login request', [
        'headers' => $request->headers->all(),
        'body' => $request->all(),
        'method' => $request->method(),
        'content_type' => $request->header('Content-Type'),
        'raw_body' => $request->getContent()
    ]);

    try {
        $result = app(\App\Http\Controllers\Api\AuthController::class)->adminLogin($request);
        \Log::info('Debug admin login result', ['result' => $result]);
        return $result;
    } catch (\Exception $e) {
        \Log::error('Debug admin login error', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
        return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
    }
});

// Public data routes
Route::get('/brands', [BrandController::class, 'index']);
Route::get('/brands/{brand}', [BrandController::class, 'show']);
Route::get('/brands/{brand}/products', [BrandController::class, 'products']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/products/categories', [ProductController::class, 'categories']);

// Career public routes
Route::get('/careers', [CareerController::class, 'index']);
Route::get('/careers/{career}', [CareerController::class, 'show']);
Route::get('/careers/department/{department}', [CareerController::class, 'byDepartment']);

// Job application public routes (no auth required for applying)
Route::post('/careers/{career}/apply', [JobApplicationController::class, 'apply']);
Route::get('/job-applications/{application}', [JobApplicationController::class, 'show']);

// Management posts public routes
Route::get('/management-posts', [\App\Http\Controllers\ManagementPostController::class, 'index']);
Route::get('/management-posts/{post}', [\App\Http\Controllers\ManagementPostController::class, 'show']);

// Seed management posts (development only)
Route::get('/seed-management-posts', function () {
    try {
        // Check if posts already exist
        $existingCount = \App\Models\ManagementPost::count();
        if ($existingCount > 0) {
            return response()->json([
                'success' => true,
                'message' => "Management posts already exist ({$existingCount} posts)",
                'data' => \App\Models\ManagementPost::all()
            ]);
        }

        // Create sample management posts
        $posts = [
            [
                'name' => 'John Smith',
                'position' => 'Chief Executive Officer',
                'department' => 'Executive',
                'email' => 'john.smith@aprati.com',
                'description' => 'Experienced leader with over 15 years in the food industry, driving innovation and growth across all our brands.',
                'bio' => 'John has been leading Aprati Foods since 2018, driving innovation and growth across all our brands. His vision for sustainable food production and commitment to quality has positioned the company as a market leader in the industry. Under his leadership, the company has expanded into new markets and launched several successful product lines.',
                'image_url' => '/images/team/john-smith.jpg',
                'is_active' => true
            ],
            [
                'name' => 'Sarah Johnson',
                'position' => 'Chief Technology Officer',
                'department' => 'Technology',
                'email' => 'sarah.johnson@aprati.com',
                'description' => 'Technology innovator focused on digital transformation and implementing cutting-edge solutions.',
                'bio' => 'Sarah leads our technology initiatives, implementing cutting-edge solutions to streamline operations and enhance customer experience. She brings 12 years of experience in food tech innovation and has been instrumental in modernizing our production processes and supply chain management systems.',
                'image_url' => '/images/team/sarah-johnson.jpg',
                'is_active' => true
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'Chief Marketing Officer',
                'department' => 'Marketing',
                'email' => 'michael.chen@aprati.com',
                'description' => 'Creative marketing strategist with global brand experience and expertise in digital marketing.',
                'bio' => 'Michael oversees brand strategy and marketing campaigns for all Aprati brands. His innovative approach to digital marketing has significantly increased brand visibility and customer engagement. He has successfully launched multiple product campaigns that have resulted in substantial market share growth.',
                'image_url' => '/images/team/michael-chen.jpg',
                'is_active' => true
            ],
            [
                'name' => 'Emily Rodriguez',
                'position' => 'Chief Financial Officer',
                'department' => 'Finance',
                'email' => 'emily.rodriguez@aprati.com',
                'description' => 'Financial expert with strong analytical skills and strategic planning expertise.',
                'bio' => 'Emily manages all financial operations and strategic planning initiatives. With over 10 years of experience in corporate finance, she has helped guide the company through several successful expansion phases and maintains strong relationships with investors and financial institutions.',
                'image_url' => '/images/team/emily-rodriguez.jpg',
                'is_active' => true
            ]
        ];

        foreach ($posts as $postData) {
            \App\Models\ManagementPost::create($postData);
        }

        $createdPosts = \App\Models\ManagementPost::all();

        return response()->json([
            'success' => true,
            'message' => 'Sample management posts created successfully',
            'data' => $createdPosts,
            'count' => $createdPosts->count()
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => 'Failed to create management posts: ' . $e->getMessage()
        ], 500);
    }
});

// Hero image public route
Route::get('/hero-image', [HeroImageController::class, 'getActive']);

// Hero content public route
Route::get('/hero-content', [HeroContentController::class, 'getActive']);

// Hero slides public route (for multi-hero carousel)
Route::get('/hero-slides', [HeroSlideController::class, 'getActiveSlides']);

// Footer settings public route
Route::get('/footer-settings', [\App\Http\Controllers\Admin\FooterSettingController::class, 'getPublicSettings']);

// Header settings public route
Route::get('/header-settings', [\App\Http\Controllers\Admin\HeaderSettingController::class, 'getAllSettings']);

// Favicon settings public route
Route::get('/favicon-settings', [\App\Http\Controllers\Admin\FaviconController::class, 'getFaviconConfig']);

// About content public routes
Route::get('/about-content', [\App\Http\Controllers\Api\AboutContentController::class, 'index']);
Route::get('/about-content/{key}', [\App\Http\Controllers\Api\AboutContentController::class, 'getByKey']);

// Admin profile image for logo (public route)
Route::get('/admin-profile-image', function () {
    try {
        $adminUser = \App\Models\User::where('role', 'admin')->first();

        if ($adminUser && $adminUser->profile_image) {
            return response()->json([
                'status' => 'success',
                'data' => [
                    'profile_image' => $adminUser->profile_image,
                    'name' => $adminUser->name
                ]
            ]);
        }

        return response()->json([
            'status' => 'success',
            'data' => null
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to load admin profile image',
            'error' => $e->getMessage()
        ], 500);
    }
});

// Information sections public route
Route::get('/information-sections', function () {
    $sections = \App\Models\InformationSection::active()
        ->ordered()
        ->get()
        ->map(function ($section) {
            return [
                'id' => $section->id,
                'title' => $section->title,
                'description' => $section->description,
                'image_url' => $section->image_path ? asset('storage/' . $section->image_path) : asset('images/default-info.svg'),
                'is_active' => $section->is_active,
                'sort_order' => $section->sort_order,
                'created_at' => $section->created_at->format('Y-m-d H:i:s'),
            ];
        });

    return response()->json([
        'success' => true,
        'data' => $sections
    ]);
});

// Translation public routes
Route::get('/translations', [\App\Http\Controllers\TranslationController::class, 'getTranslations']);
Route::get('/translations/locales', [\App\Http\Controllers\TranslationController::class, 'getLocales']);
Route::get('/translations/groups', [\App\Http\Controllers\TranslationController::class, 'getGroups']);

// Test route
Route::get('/test-info', function () {
    return response()->json(['status' => 'success', 'message' => 'Information sections route is working']);
});

// Test visitor tracking
Route::get('/test-visitor-stats', function () {
    try {
        $stats = \App\Models\Visitor::getStats();
        return response()->json([
            'status' => 'success',
            'message' => 'Visitor tracking is working',
            'data' => $stats
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Visitor tracking error: ' . $e->getMessage()
        ], 500);
    }
});

// Debug management post creation
Route::post('/debug/management-post', function (Request $request) {
    \Log::info('Debug management post request', [
        'headers' => $request->headers->all(),
        'body' => $request->all(),
        'content_type' => $request->header('Content-Type'),
        'raw_body' => $request->getContent()
    ]);

    // Test validation
    try {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'description' => 'required|string',
            'department' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'bio' => 'nullable|string',
            'image_url' => 'nullable|string|max:500',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed',
                'received_data' => $request->all()
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Validation passed',
            'data' => $request->all()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Update brands with cover images for testing
Route::get('/update-brand-covers', function () {
    try {
        // Get available cover images
        $storage = \Illuminate\Support\Facades\Storage::disk('public');
        $coverImages = collect($storage->allFiles('brands/covers'))->filter(function ($file) {
            return in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif']);
        })->values();

        $brands = \App\Models\Brand::all();
        $updated = [];

        foreach ($brands as $index => $brand) {
            if ($coverImages->count() > $index) {
                $coverImage = $coverImages[$index];
                $brand->update(['cover_image' => $coverImage]);
                $updated[] = [
                    'name' => $brand->name,
                    'cover_image' => $coverImage,
                    'cover_url' => asset('storage/' . $coverImage)
                ];
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Updated brand cover images',
            'updated_brands' => $updated,
            'available_covers' => $coverImages
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Check brands data including cover images
Route::get('/debug-brands', function () {
    $brands = \App\Models\Brand::all()->map(function ($brand) {
        return [
            'id' => $brand->id,
            'name' => $brand->name,
            'slug' => $brand->slug,
            'logo' => $brand->logo,
            'cover_image' => $brand->cover_image,
            'logo_url' => $brand->logo_url,
            'cover_image_url' => $brand->cover_image_url,
        ];
    });

    return response()->json([
        'brands' => $brands,
        'available_images' => \Illuminate\Support\Facades\Storage::disk('public')->allFiles()
    ]);
});

// Update brand with local logo for testing
Route::get('/test-brand-logo', function () {
    try {
        // Check if we have any uploaded images we can use
        $storage = \Illuminate\Support\Facades\Storage::disk('public');
        $imageFiles = collect($storage->allFiles())->filter(function ($file) {
            return in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif']);
        });

        if ($imageFiles->count() > 0) {
            // Use the first available image as a test logo
            $testImage = $imageFiles->first();
            $brand = \App\Models\Brand::first();
            $brand->update(['logo' => $testImage]);

            return response()->json([
                'success' => true,
                'message' => 'Updated brand with test logo',
                'brand' => $brand,
                'logo_url' => asset('storage/' . $testImage),
                'logo_path' => $testImage,
                'available_images' => $imageFiles->values()
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'No images found in storage',
                'files' => $storage->allFiles()
            ]);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Test storage and images
Route::get('/test-storage', function () {
    try {
        $storage = \Illuminate\Support\Facades\Storage::disk('public');
        $files = $storage->allFiles();

        $brands = \App\Models\Brand::all()->map(function ($brand) {
            return [
                'name' => $brand->name,
                'logo' => $brand->logo,
                'logo_exists' => $brand->logo ? \Illuminate\Support\Facades\Storage::disk('public')->exists($brand->logo) : false
            ];
        });

        return response()->json([
            'storage_path' => storage_path('app/public'),
            'public_storage_path' => public_path('storage'),
            'storage_link_exists' => is_link(public_path('storage')),
            'files_in_storage' => $files,
            'brands' => $brands,
            'asset_url_example' => asset('storage/test.jpg'),
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Test footer settings
Route::get('/test-footer-settings', function () {
    try {
        // Check if table exists
        if (!\Schema::hasTable('footer_settings')) {
            return response()->json([
                'status' => 'error',
                'message' => 'Footer settings table does not exist. Please run migrations.'
            ], 500);
        }

        $settings = \App\Models\FooterSetting::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Footer settings working',
            'data' => $settings,
            'count' => $settings->count()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Footer settings error: ' . $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Create footer settings table
Route::get('/create-footer-table', function () {
    try {
        // Check if table already exists
        if (\Schema::hasTable('footer_settings')) {
            return response()->json([
                'status' => 'info',
                'message' => 'Footer settings table already exists.'
            ]);
        }

        // Create the table
        \Schema::create('footer_settings', function (\Illuminate\Database\Schema\Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('text'); // text, url, email, phone, textarea
            $table->string('group')->default('general'); // contact, social, company
            $table->string('label');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Initialize default data
        \App\Models\FooterSetting::createDefaults();

        return response()->json([
            'status' => 'success',
            'message' => 'Footer settings table created and defaults initialized successfully.'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Error creating footer settings table: ' . $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Test admin token route (for development only)
Route::get('/test-admin-token', function () {
    $user = \App\Models\User::where('role', 'admin')->first();
    if (!$user) {
        // Create a test admin user if none exists
        $user = \App\Models\User::create([
            'name' => 'Test Admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }

    $token = $user->createToken('test-admin-token')->plainTextToken;

    return response()->json([
        'status' => 'success',
        'data' => [
            'user' => $user,
            'token' => $token
        ]
    ]);
});

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);

    // Job applications (authenticated users)
    // Route::post('/jobs/{job}/apply', [JobApplicationController::class, 'store']);
    // Route::get('/my-applications', [JobApplicationController::class, 'myApplications']);
    // Route::get('/my-applications/{application}', [JobApplicationController::class, 'show']);
    // Route::put('/my-applications/{application}', [JobApplicationController::class, 'update']);

    // Admin only routes
    Route::middleware('role:admin')->group(function () {
        // User management
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::get('/users/{user}', [UserController::class, 'show']);
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
        Route::post('/users/{user}/toggle-status', [UserController::class, 'toggleStatus']);
        Route::post('/users/{user}/reset-password', [UserController::class, 'resetPassword']);
        Route::post('/users/{user}/upload-profile-image', [UserController::class, 'uploadProfileImage']);
        Route::delete('/users/{user}/profile-image', [UserController::class, 'removeProfileImage']);

        // Profile image management
        Route::post('/users/{user}/upload-profile-image', [UserController::class, 'uploadProfileImage']);
        Route::delete('/users/{user}/profile-image', [UserController::class, 'removeProfileImage']);

        // User roles
        Route::get('/roles', [UserController::class, 'roles']);
        Route::get('/users/role/{role}', [UserController::class, 'getUsersByRole']);
        Route::get('/dashboard/stats', [UserController::class, 'dashboardStats']);

        // Brand management (Admin can manage all) - TEST
        Route::get('/admin/brands/test', function () {
            return response()->json(['status' => 'success', 'message' => 'Route works']);
        });
        Route::post('/admin/brands/direct', function (Request $request) {
            try {
                $brand = \App\Models\Brand::create([
                    'name' => $request->name,
                    'slug' => $request->slug,
                    'description' => $request->description,
                    'is_active' => $request->is_active ?? true,
                    'sort_order' => $request->sort_order ?? 0
                ]);
                return response()->json(['status' => 'success', 'data' => ['brand' => $brand]]);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
            }
        });
        Route::get('/admin/brands', [\App\Http\Controllers\Admin\BrandController::class, 'index']);
        Route::post('/admin/brands', [\App\Http\Controllers\Admin\BrandController::class, 'store']);
        Route::get('/admin/brands/{brand}', [\App\Http\Controllers\Admin\BrandController::class, 'show']);
        Route::put('/admin/brands/{brand}', [\App\Http\Controllers\Admin\BrandController::class, 'update']);
        Route::delete('/admin/brands/{brand}', [\App\Http\Controllers\Admin\BrandController::class, 'destroy']);
        Route::post('/admin/brands/{brand}/toggle-status', [\App\Http\Controllers\Admin\BrandController::class, 'toggleStatus']);
        Route::post('/admin/brands/sort-order', [\App\Http\Controllers\Admin\BrandController::class, 'updateSortOrder']);

        // Product management (Admin can manage all)
        Route::get('/admin/products', [\App\Http\Controllers\Admin\ProductController::class, 'index']);
        Route::get('/admin/products/create', [\App\Http\Controllers\Admin\ProductController::class, 'create']);
        Route::post('/admin/products', [\App\Http\Controllers\Admin\ProductController::class, 'store']);
        Route::get('/admin/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'show']);
        Route::put('/admin/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'update']);
        Route::post('/admin/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'update']); // For FormData updates
        Route::delete('/admin/products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy']);
        Route::get('/admin/products-stats', [\App\Http\Controllers\Admin\ProductController::class, 'stats']);

        // Product variant management
        Route::post('/admin/products/{product}/variants', [\App\Http\Controllers\Admin\ProductController::class, 'storeVariant']);
        Route::put('/admin/products/{product}/variants/{variant}', [\App\Http\Controllers\Admin\ProductController::class, 'updateVariant']);
        Route::delete('/admin/products/{product}/variants/{variant}', [\App\Http\Controllers\Admin\ProductController::class, 'deleteVariant']);

        // Category management
        Route::get('/admin/categories', [\App\Http\Controllers\Admin\CategoryController::class, 'index']);
        Route::post('/admin/categories', [\App\Http\Controllers\Admin\CategoryController::class, 'store']);
        Route::get('/admin/categories/statistics', [\App\Http\Controllers\Admin\CategoryController::class, 'statistics']);
        Route::get('/admin/categories/tree', [\App\Http\Controllers\Admin\CategoryController::class, 'tree']);
        Route::get('/admin/categories/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'show']);
        Route::put('/admin/categories/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'update']);
        Route::delete('/admin/categories/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy']);
        Route::post('/admin/categories/{category}/toggle-status', [\App\Http\Controllers\Admin\CategoryController::class, 'toggleStatus']);

        // Debug route for category deletion
        Route::get('/admin/categories/{category}/debug', function (\App\Models\Category $category) {
            return response()->json([
                'success' => true,
                'category' => $category->toApiArray(),
                'products_count' => $category->products()->count(),
                'children_count' => $category->children()->count(),
                'can_delete' => $category->products()->count() === 0 && $category->children()->count() === 0
            ]);
        });

        // Career management (Admin can manage all careers)
        Route::get('/admin/careers', [CareerController::class, 'adminIndex']);
        Route::post('/admin/careers', [CareerController::class, 'store']);
        Route::get('/admin/careers/{career}', [CareerController::class, 'show']);
        Route::put('/admin/careers/{career}', [CareerController::class, 'update']);
        Route::delete('/admin/careers/{career}', [CareerController::class, 'destroy']);

        // Job application management (Admin can view all)
        Route::get('/admin/job-applications', [\App\Http\Controllers\Admin\JobApplicationController::class, 'index']);
        Route::get('/admin/job-applications/statistics', [\App\Http\Controllers\Admin\JobApplicationController::class, 'statistics']);
        Route::get('/admin/job-applications/recent', [\App\Http\Controllers\Admin\JobApplicationController::class, 'recent']);
        Route::get('/admin/job-applications/{application}', [\App\Http\Controllers\Admin\JobApplicationController::class, 'show']);
        Route::put('/admin/job-applications/{application}/status', [\App\Http\Controllers\Admin\JobApplicationController::class, 'updateStatus']);
        Route::delete('/admin/job-applications/{application}', [\App\Http\Controllers\Admin\JobApplicationController::class, 'destroy']);
        Route::get('/admin/job-applications/{application}/download-cv', [\App\Http\Controllers\Admin\JobApplicationController::class, 'downloadCV']);
        Route::get('/admin/job-applications/{application}/view-cv', [\App\Http\Controllers\Admin\JobApplicationController::class, 'viewCV']);

        // Management posts management (Admin only)
        Route::get('/admin/management-posts', [\App\Http\Controllers\Admin\ManagementPostController::class, 'index']);
        Route::post('/admin/management-posts', [\App\Http\Controllers\Admin\ManagementPostController::class, 'store']);
        Route::post('/admin/management-posts/upload-image', [\App\Http\Controllers\Admin\ManagementPostController::class, 'uploadImage']);
        Route::get('/admin/management-posts/{post}', [\App\Http\Controllers\Admin\ManagementPostController::class, 'show']);
        Route::put('/admin/management-posts/{post}', [\App\Http\Controllers\Admin\ManagementPostController::class, 'update']);
        Route::delete('/admin/management-posts/{post}', [\App\Http\Controllers\Admin\ManagementPostController::class, 'destroy']);
        Route::put('/admin/management-posts/{post}/toggle-status', [\App\Http\Controllers\Admin\ManagementPostController::class, 'toggleStatus']);

        // Hero image management (Admin only)
        Route::get('/admin/hero-images', [HeroImageController::class, 'index']);
        Route::post('/admin/hero-images', [HeroImageController::class, 'store']);
        Route::get('/admin/hero-images/{heroImage}', [HeroImageController::class, 'show']);
        Route::put('/admin/hero-images/{heroImage}', [HeroImageController::class, 'update']);
        Route::delete('/admin/hero-images/{heroImage}', [HeroImageController::class, 'destroy']);
        Route::post('/admin/hero-images/{heroImage}/set-active', [HeroImageController::class, 'setActive']);

        // Hero content management (Admin only)
        Route::get('/admin/hero-contents', [HeroContentController::class, 'index']);
        Route::post('/admin/hero-contents', [HeroContentController::class, 'store']);
        Route::get('/admin/hero-contents/{heroContent}', [HeroContentController::class, 'show']);
        Route::put('/admin/hero-contents/{heroContent}', [HeroContentController::class, 'update']);
        Route::delete('/admin/hero-contents/{heroContent}', [HeroContentController::class, 'destroy']);
        Route::post('/admin/hero-contents/{heroContent}/set-active', [HeroContentController::class, 'setActive']);

        // Hero slides management (Admin only)
        Route::get('/admin/hero-slides', [HeroSlideController::class, 'index']);
        Route::post('/admin/hero-slides', [HeroSlideController::class, 'store']);
        Route::get('/admin/hero-slides/{id}', [HeroSlideController::class, 'show']);
        Route::put('/admin/hero-slides/{id}', [HeroSlideController::class, 'update']);
        Route::post('/admin/hero-slides/{id}', [HeroSlideController::class, 'update']); // For FormData with _method=PUT
        Route::delete('/admin/hero-slides/{id}', [HeroSlideController::class, 'destroy']);
        Route::post('/admin/hero-slides/{id}/toggle-active', [HeroSlideController::class, 'toggleActive']);
        Route::post('/admin/hero-slides/update-order', [HeroSlideController::class, 'updateOrder']);

        // Promotion banners management (Admin only)
        Route::get('/admin/promotion-banners', [PromotionBannerController::class, 'adminIndex']);
        Route::post('/admin/promotion-banners', [PromotionBannerController::class, 'store']);
        Route::get('/admin/promotion-banners/{id}', [PromotionBannerController::class, 'show']);
        Route::put('/admin/promotion-banners/{id}', [PromotionBannerController::class, 'update']);
        Route::post('/admin/promotion-banners/{id}', [PromotionBannerController::class, 'update']); // For FormData with _method=PUT
        Route::delete('/admin/promotion-banners/{id}', [PromotionBannerController::class, 'destroy']);
        Route::post('/admin/promotion-banners/{id}/toggle-active', [PromotionBannerController::class, 'toggleActive']);


        // Information sections management (Admin only)
        Route::get('/admin/information-sections', function () {
            $sections = \App\Models\InformationSection::with('creator:id,name')
                ->ordered()
                ->get()
                ->map(function ($section) {
                    return [
                        'id' => $section->id,
                        'title' => $section->title,
                        'description' => $section->description,
                        'image_url' => $section->image_path ? asset('storage/' . $section->image_path) : asset('images/default-info.svg'),
                        'is_active' => $section->is_active,
                        'sort_order' => $section->sort_order,
                        'created_by' => $section->creator->name ?? 'Unknown',
                        'created_at' => $section->created_at->format('Y-m-d H:i:s'),
                        'updated_at' => $section->updated_at->format('Y-m-d H:i:s')
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $sections
            ]);
        });

        // Test authentication endpoint
        Route::get('/admin/test-auth', function () {
            $user = auth()->user();
            return response()->json([
                'authenticated' => auth()->check(),
                'user' => $user,
                'role' => $user ? $user->role : null,
                'guards' => array_keys(config('auth.guards')),
                'current_guard' => config('auth.defaults.guard')
            ]);
        });

        // Diagnostic upload route with same middleware as real upload
        Route::post('/admin/diagnostic-upload/{id}', function (Request $request, $id) {
            try {
                return response()->json([
                    'success' => true,
                    'message' => 'Middleware passed successfully',
                    'user' => auth()->user(),
                    'has_file' => $request->hasFile('image'),
                    'files' => $request->allFiles(),
                    'id' => $id,
                    'content_type' => $request->header('Content-Type')
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ], 500);
            }
        });

        // Simple auth test route
        Route::get('/admin/auth-test', function (Request $request) {
            return response()->json([
                'authenticated' => auth()->check(),
                'user' => auth()->user(),
                'guard' => auth()->getDefaultDriver(),
                'token_valid' => auth('sanctum')->check()
            ]);
        });

        // About content management (Admin only)
        Route::get('/admin/about-contents', [\App\Http\Controllers\Admin\AboutContentController::class, 'index']);
        Route::post('/admin/about-contents', [\App\Http\Controllers\Admin\AboutContentController::class, 'store']);
        Route::get('/admin/about-contents/{aboutContent}', [\App\Http\Controllers\Admin\AboutContentController::class, 'show']);
        Route::put('/admin/about-contents/{aboutContent}', [\App\Http\Controllers\Admin\AboutContentController::class, 'update']);
        Route::delete('/admin/about-contents/{aboutContent}', [\App\Http\Controllers\Admin\AboutContentController::class, 'destroy']);
        Route::post('/admin/about-contents/{aboutContent}/upload-image', [\App\Http\Controllers\Admin\AboutContentController::class, 'uploadImage']);
        Route::post('/admin/about-contents/initialize-defaults', [\App\Http\Controllers\Admin\AboutContentController::class, 'initializeDefaults']);

        // Visitor analytics routes
        Route::get('/admin/visitors/stats', [\App\Http\Controllers\Admin\VisitorController::class, 'getStats']);
        Route::get('/admin/visitors/analytics', [\App\Http\Controllers\Admin\VisitorController::class, 'getAnalytics']);
        Route::get('/admin/visitors/real-time', [\App\Http\Controllers\Admin\VisitorController::class, 'getRealTimeStats']);
        Route::get('/admin/visitors', [\App\Http\Controllers\Admin\VisitorController::class, 'index']);
        Route::get('/admin/visitors/export', [\App\Http\Controllers\Admin\VisitorController::class, 'export']);

        // Footer settings management (Admin only)
        Route::get('/admin/footer-settings', [\App\Http\Controllers\Admin\FooterSettingController::class, 'index']);
        Route::post('/admin/footer-settings', [\App\Http\Controllers\Admin\FooterSettingController::class, 'store']);
        Route::get('/admin/footer-settings/{setting}', [\App\Http\Controllers\Admin\FooterSettingController::class, 'show']);
        Route::put('/admin/footer-settings/{setting}', [\App\Http\Controllers\Admin\FooterSettingController::class, 'update']);
        Route::delete('/admin/footer-settings/{setting}', [\App\Http\Controllers\Admin\FooterSettingController::class, 'destroy']);
        Route::post('/admin/footer-settings/{setting}/toggle-status', [\App\Http\Controllers\Admin\FooterSettingController::class, 'toggleStatus']);
        Route::post('/admin/footer-settings/bulk-update', [\App\Http\Controllers\Admin\FooterSettingController::class, 'updateBulk']);
        Route::post('/admin/footer-settings/upload-image', [\App\Http\Controllers\Admin\FooterSettingController::class, 'uploadImage']);
        Route::post('/admin/footer-settings/initialize-defaults', [\App\Http\Controllers\Admin\FooterSettingController::class, 'initializeDefaults']);
        Route::post('/admin/footer-settings/upload-image', [\App\Http\Controllers\Admin\FooterSettingController::class, 'uploadImage']);

        // Header settings management (Admin only)
        Route::get('/admin/header-settings', [\App\Http\Controllers\Admin\HeaderSettingController::class, 'index']);
        Route::post('/admin/header-settings', [\App\Http\Controllers\Admin\HeaderSettingController::class, 'store']);
        Route::get('/admin/header-settings/{setting}', [\App\Http\Controllers\Admin\HeaderSettingController::class, 'show']);
        Route::put('/admin/header-settings/{setting}', [\App\Http\Controllers\Admin\HeaderSettingController::class, 'update']);
        Route::delete('/admin/header-settings/{setting}', [\App\Http\Controllers\Admin\HeaderSettingController::class, 'destroy']);
        Route::post('/admin/header-settings/{setting}/toggle', [\App\Http\Controllers\Admin\HeaderSettingController::class, 'toggle']);
        Route::post('/admin/header-settings/upload-image', [\App\Http\Controllers\Admin\HeaderSettingController::class, 'uploadImage']);

        // Favicon settings management (Admin only)
        Route::get('/admin/favicon-settings', [\App\Http\Controllers\Admin\FaviconController::class, 'index']);
        Route::post('/admin/favicon-settings', [\App\Http\Controllers\Admin\FaviconController::class, 'store']);
        Route::get('/admin/favicon-settings/{setting}', [\App\Http\Controllers\Admin\FaviconController::class, 'show']);
        Route::put('/admin/favicon-settings/{setting}', [\App\Http\Controllers\Admin\FaviconController::class, 'update']);
        Route::delete('/admin/favicon-settings/{setting}', [\App\Http\Controllers\Admin\FaviconController::class, 'destroy']);
        Route::post('/admin/favicon-settings/{setting}/toggle', [\App\Http\Controllers\Admin\FaviconController::class, 'toggle']);
        Route::post('/admin/favicon-settings/upload-image', [\App\Http\Controllers\Admin\FaviconController::class, 'uploadImage']);
        Route::post('/admin/favicon-settings/initialize-defaults', [\App\Http\Controllers\Admin\FaviconController::class, 'initializeDefaults']);

        // Translation management (Admin only)
        Route::get('/admin/translations', [\App\Http\Controllers\TranslationController::class, 'index']);
        Route::post('/admin/translations', [\App\Http\Controllers\TranslationController::class, 'store']);
        Route::get('/admin/translations/{translation}', [\App\Http\Controllers\TranslationController::class, 'show']);
        Route::put('/admin/translations/{translation}', [\App\Http\Controllers\TranslationController::class, 'update']);
        Route::delete('/admin/translations/{translation}', [\App\Http\Controllers\TranslationController::class, 'destroy']);
        Route::post('/admin/translations/bulk-update', [\App\Http\Controllers\TranslationController::class, 'bulkUpdate']);
        Route::get('/admin/translations/locales', [\App\Http\Controllers\TranslationController::class, 'getLocales']);
        Route::get('/admin/translations/groups', [\App\Http\Controllers\TranslationController::class, 'getGroups']);

        Route::post('/admin/information-sections', function (Request $request) {
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'is_active' => 'boolean',
                'sort_order' => 'integer|min:0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            try {
                $data = $request->only(['title', 'description', 'is_active', 'sort_order']);
                $data['created_by'] = auth()->id();
                $data['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : true;
                $data['sort_order'] = $request->input('sort_order', 0);

                // Handle image upload
                if ($request->hasFile('image')) {
                    $image = $request->file('image');
                    $imagePath = $image->store('information-sections', 'public');
                    $data['image_path'] = $imagePath;
                }

                $section = \App\Models\InformationSection::create($data);

                return response()->json([
                    'success' => true,
                    'message' => 'Information section created successfully',
                    'data' => [
                        'id' => $section->id,
                        'title' => $section->title,
                        'description' => $section->description,
                        'image_url' => $section->image_path ? asset('storage/' . $section->image_path) : asset('images/default-info.svg'),
                        'is_active' => $section->is_active,
                        'sort_order' => $section->sort_order,
                        'created_at' => $section->created_at->format('Y-m-d H:i:s')
                    ]
                ], 201);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create information section',
                    'error' => $e->getMessage()
                ], 500);
            }
        });

        Route::delete('/admin/information-sections/{id}', function ($id) {
            try {
                $section = \App\Models\InformationSection::findOrFail($id);

                // Delete associated image if exists
                if ($section->image_path) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($section->image_path);
                }

                $section->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Information section deleted successfully'
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete information section',
                    'error' => $e->getMessage()
                ], 500);
            }
        });

        Route::post('/admin/information-sections/{id}/toggle-status', function ($id) {
            try {
                $section = \App\Models\InformationSection::findOrFail($id);
                $section->update([
                    'is_active' => !$section->is_active
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Information section status updated successfully',
                    'data' => [
                        'id' => $section->id,
                        'is_active' => $section->is_active
                    ]
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update information section status',
                    'error' => $e->getMessage()
                ], 500);
            }
        });

        Route::put('/admin/information-sections/{id}', function ($id, Request $request) {
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'is_active' => 'boolean',
                'sort_order' => 'integer|min:0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            try {
                $section = \App\Models\InformationSection::findOrFail($id);

                $data = $request->only(['title', 'description', 'is_active', 'sort_order']);
                $data['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : $section->is_active;
                $data['sort_order'] = $request->input('sort_order', $section->sort_order);

                // Handle image upload
                if ($request->hasFile('image')) {
                    // Delete old image if exists
                    if ($section->image_path) {
                        \Illuminate\Support\Facades\Storage::disk('public')->delete($section->image_path);
                    }

                    $image = $request->file('image');
                    $imagePath = $image->store('information-sections', 'public');
                    $data['image_path'] = $imagePath;
                }

                $section->update($data);

                return response()->json([
                    'success' => true,
                    'message' => 'Information section updated successfully',
                    'data' => [
                        'id' => $section->id,
                        'title' => $section->title,
                        'description' => $section->description,
                        'image_url' => $section->image_path ? asset('storage/' . $section->image_path) : asset('images/default-info.svg'),
                        'is_active' => $section->is_active,
                        'sort_order' => $section->sort_order,
                        'updated_at' => $section->updated_at->format('Y-m-d H:i:s')
                    ]
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update information section',
                    'error' => $e->getMessage()
                ], 500);
            }
        });

        // Handle POST with method override for PUT (FormData compatibility)
        Route::post('/admin/information-sections/{id}', function ($id, Request $request) {
            // Check if this is a method override for PUT
            if ($request->input('_method') === 'PUT') {
                $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                    'title' => 'required|string|max:255',
                    'description' => 'required|string',
                    'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                    'is_active' => 'nullable',
                    'sort_order' => 'nullable|integer|min:0'
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Validation failed',
                        'errors' => $validator->errors()
                    ], 422);
                }

                try {
                    $section = \App\Models\InformationSection::findOrFail($id);

                    // Log for debugging
                    \Log::info('Updating Information Section', [
                        'id' => $id,
                        'current_image_path' => $section->image_path,
                        'has_new_image' => $request->hasFile('image')
                    ]);

                    $data = $request->only(['title', 'description']);

                    // Handle boolean conversion for is_active
                    if ($request->has('is_active')) {
                        $data['is_active'] = in_array($request->input('is_active'), ['1', 'true', true, 1], true);
                    }

                    // Handle sort_order
                    if ($request->has('sort_order')) {
                        $data['sort_order'] = (int) $request->input('sort_order');
                    }

                    // Handle image upload - ONLY update if new image provided
                    if ($request->hasFile('image')) {
                        \Log::info('New image file detected, updating image');

                        // Delete old image if exists
                        if ($section->image_path) {
                            \Illuminate\Support\Facades\Storage::disk('public')->delete($section->image_path);
                        }

                        $image = $request->file('image');
                        $imagePath = $image->store('information-sections', 'public');
                        $data['image_path'] = $imagePath;
                    } else {
                        // No new image - explicitly preserve existing image_path
                        \Log::info('No new image provided, preserving existing image', [
                            'keeping_image_path' => $section->image_path
                        ]);
                    }

                    \Log::info('Data to update', ['data' => $data]);

                    $section->update($data);

                    return response()->json([
                        'success' => true,
                        'message' => 'Information section updated successfully',
                        'data' => [
                            'id' => $section->id,
                            'title' => $section->title,
                            'description' => $section->description,
                            'image_url' => $section->image_path ? asset('storage/' . $section->image_path) : asset('images/default-info.svg'),
                            'is_active' => $section->is_active,
                            'sort_order' => $section->sort_order,
                            'updated_at' => $section->updated_at->format('Y-m-d H:i:s')
                        ]
                    ]);
                } catch (\Exception $e) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to update information section',
                        'error' => $e->getMessage()
                    ], 500);
                }
            }

            // If not a PUT override, return method not allowed
            return response()->json([
                'success' => false,
                'message' => 'Method not allowed for this route'
            ], 405);
        });
    });

    // Brand Admin routes (can manage their own brand's content)
    Route::middleware('role:admin,brand_admin')->group(function () {
        // Brand-specific product management
        Route::get('/my-brand/products', [ProductController::class, 'myBrandProducts']);
        Route::post('/my-brand/products', [ProductController::class, 'storeBrandProduct']);
        Route::put('/my-brand/products/{product}', [ProductController::class, 'updateBrandProduct']);
        Route::delete('/my-brand/products/{product}', [ProductController::class, 'destroyBrandProduct']);

        // Brand-specific job management (commented until JobController is created)
        // Route::get('/my-brand/jobs', [JobController::class, 'myBrandJobs']);
        // Route::post('/my-brand/jobs', [JobController::class, 'storeBrandJob']);
        // Route::put('/my-brand/jobs/{job}', [JobController::class, 'updateBrandJob']);
        // Route::delete('/my-brand/jobs/{job}', [JobController::class, 'destroyBrandJob']);

        // Brand-specific application management (commented until JobApplicationController is created)
        // Route::get('/my-brand/applications', [JobApplicationController::class, 'myBrandApplications']);
        // Route::put('/my-brand/applications/{application}/status', [JobApplicationController::class, 'updateBrandApplicationStatus']);
    });
});

// Privacy Content routes
// Public route for getting active privacy content
Route::get('/privacy-content', [PrivacyContentController::class, 'index']);

// Admin-only privacy content management routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/privacy-content', [PrivacyContentController::class, 'adminIndex']);
    Route::post('/admin/privacy-content', [PrivacyContentController::class, 'store']);
    Route::get('/admin/privacy-content/{id}', [PrivacyContentController::class, 'show']);
    Route::put('/admin/privacy-content/{id}', [PrivacyContentController::class, 'update']);
    Route::delete('/admin/privacy-content/{id}', [PrivacyContentController::class, 'destroy']);
});

// Hero Content routes
// Public route for getting active hero content
Route::get('/hero-content', [HeroContentController::class, 'getActive']);

// Admin-only hero content management routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/hero-contents', [HeroContentController::class, 'index']);
    Route::post('/admin/hero-contents', [HeroContentController::class, 'store']);
    Route::get('/admin/hero-contents/{heroContent}', [HeroContentController::class, 'show']);
    Route::put('/admin/hero-contents/{heroContent}', [HeroContentController::class, 'update']);
    Route::delete('/admin/hero-contents/{heroContent}', [HeroContentController::class, 'destroy']);
    Route::post('/admin/hero-contents/{heroContent}/set-active', [HeroContentController::class, 'setActive']);
});

// Hero Slides routes (Multi-Hero Carousel)
// Public route already defined above: Route::get('/hero-slides', [HeroSlideController::class, 'getActiveSlides']);

// Admin-only hero slides management routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/hero-slides', [HeroSlideController::class, 'index']);
    Route::post('/admin/hero-slides', [HeroSlideController::class, 'store']);
    Route::get('/admin/hero-slides/{id}', [HeroSlideController::class, 'show']);
    Route::put('/admin/hero-slides/{id}', [HeroSlideController::class, 'update']);
    Route::delete('/admin/hero-slides/{id}', [HeroSlideController::class, 'destroy']);
    Route::post('/admin/hero-slides/{id}/toggle-active', [HeroSlideController::class, 'toggleActive']);
    Route::post('/admin/hero-slides/update-order', [HeroSlideController::class, 'updateOrder']);
});

// Route to get current user (for testing)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Promotion Banner Routes
// Public route for active banners
Route::get('/promotion-banners', [App\Http\Controllers\Api\PromotionBannerController::class, 'index']);

// Admin-only promotion banner management
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/recent-activity', function () {
        return response()->json(['status' => 'success', 'data' => []]);
    });
    Route::get('/admin/promotion-banners', [App\Http\Controllers\Api\PromotionBannerController::class, 'adminIndex']);
    Route::post('/admin/promotion-banners', [App\Http\Controllers\Api\PromotionBannerController::class, 'store']);
    Route::put('/admin/promotion-banners/{id}', [App\Http\Controllers\Api\PromotionBannerController::class, 'update']);
    Route::delete('/admin/promotion-banners/{id}', [App\Http\Controllers\Api\PromotionBannerController::class, 'destroy']);
    Route::post('/admin/promotion-banners/{id}/toggle-active', [App\Http\Controllers\Api\PromotionBannerController::class, 'toggleActive']);
});

// --- TEMPORARY PUBLIC ROUTES FOR TESTING (Added by AI) ---
Route::post('/public-test/promotion-banners', [App\Http\Controllers\Api\PromotionBannerController::class, 'store']);
Route::post('/public-test/hero-slides', [App\Http\Controllers\Api\HeroSlideController::class, 'store']);
