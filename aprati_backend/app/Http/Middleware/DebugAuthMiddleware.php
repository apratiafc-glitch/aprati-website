<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DebugAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        \Log::info('Debug Auth Middleware', [
            'url' => $request->url(),
            'method' => $request->method(),
            'headers' => $request->headers->all(),
            'auth_check' => auth()->check(),
            'user' => auth()->user(),
            'guard' => auth()->getDefaultDriver(),
            'bearer_token' => $request->bearerToken()
        ]);

        return $next($request);
    }
}
