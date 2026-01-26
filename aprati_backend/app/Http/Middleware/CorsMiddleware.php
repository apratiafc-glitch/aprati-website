<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Define allowed origins
        $allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
            'https://sdev.apratifoods.asia',
            'https://apratifoods.asia',
            'https://www.apratifoods.asia',
        ];

        $origin = $request->header('Origin');
        
        // Determine allowed origin
        $allowOrigin = '*';
        if ($origin && in_array($origin, $allowedOrigins)) {
            $allowOrigin = $origin;
        } elseif (!$origin) {
            // No origin header means same-origin or direct access
            $allowOrigin = '*';
        }

        // Handle preflight requests (OPTIONS)
        if ($request->isMethod('OPTIONS')) {
            return response('', 204)
                ->header('Access-Control-Allow-Origin', $allowOrigin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD')
                ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With, X-Requested-With, X-CSRF-TOKEN, X-Socket-Id')
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Access-Control-Max-Age', '86400')
                ->header('Vary', 'Origin');
        }

        $response = $next($request);

        // Add CORS headers to all responses
        // Skip CORS headers for file downloads (BinaryFileResponse)
        if ($response instanceof \Symfony\Component\HttpFoundation\BinaryFileResponse) {
            return $response;
        }

        return $response
            ->header('Access-Control-Allow-Origin', $allowOrigin)
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD')
            ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With, X-Requested-With, X-CSRF-TOKEN, X-Socket-Id')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Vary', 'Origin');
    }
}
