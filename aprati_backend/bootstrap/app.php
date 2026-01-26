<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
            'track.visitors' => \App\Http\Middleware\TrackVisitors::class,
            'cors' => \App\Http\Middleware\CorsMiddleware::class,
            'security.headers' => \App\Http\Middleware\SecurityHeaders::class,
            'api.rate.limit' => \App\Http\Middleware\ApiRateLimiter::class,
        ]);

        // Disable CSRF for API routes
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);

        // Add security middleware and CORS to all routes
        $middleware->use([
            \App\Http\Middleware\SecurityHeaders::class,
            \App\Http\Middleware\CorsMiddleware::class,
        ]);

        // Add CORS and rate limiting to API routes
        $middleware->api([
            // CorsMiddleware is now global
            'api.rate.limit:60', // 60 requests per minute
        ]);

        $middleware->web([
            \App\Http\Middleware\VerifyCsrfToken::class,
            \App\Http\Middleware\TrackVisitors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated.',
                    'error' => 'Authentication required'
                ], 401);
            }
        });
    })->create();
