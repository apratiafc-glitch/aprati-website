<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Check if user is authenticated
        if (!$request->user()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication required.',
            ], 401);
        }

        // Check if user has required role
        $userRole = $request->user()->role;
        
        if (!in_array($userRole, $roles)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Insufficient permissions. Required roles: ' . implode(', ', $roles),
                'user_role' => $userRole,
                'required_roles' => $roles,
            ], 403);
        }

        return $next($request);
    }
}
