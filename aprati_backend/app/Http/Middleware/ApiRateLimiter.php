<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiRateLimiter
{
    protected $limiter;

    public function __construct(RateLimiter $limiter)
    {
        $this->limiter = $limiter;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $limit = '60'): Response
    {
        // Parse limit format (e.g., "60" or "1000,60" for 1000 per 60 minutes)
        $parts = explode(',', $limit);
        $maxAttempts = (int)$parts[0];
        $decayMinutes = isset($parts[1]) ? (int)$parts[1] : 1;

        // Create key based on user or IP
        $key = $this->resolveRequestSignature($request);

        // Check if too many attempts
        if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
            $seconds = $this->limiter->availableIn($key);
            
            return response()->json([
                'message' => 'Too many requests. Please try again later.',
                'retry_after' => $seconds
            ], 429)
            ->header('Retry-After', $seconds)
            ->header('X-RateLimit-Limit', $maxAttempts)
            ->header('X-RateLimit-Remaining', 0);
        }

        // Hit the rate limiter
        $this->limiter->hit($key, $decayMinutes * 60);

        $response = $next($request);

        // Add rate limit headers
        return $this->addHeaders(
            $response,
            $maxAttempts,
            $this->limiter->retriesLeft($key, $maxAttempts)
        );
    }

    /**
     * Resolve request signature
     */
    protected function resolveRequestSignature(Request $request): string
    {
        // Prefer user ID if authenticated
        if ($user = $request->user()) {
            return 'rate_limit:user:' . $user->id;
        }

        // Fall back to IP address
        return 'rate_limit:ip:' . $request->ip();
    }

    /**
     * Add rate limit headers to response
     */
    protected function addHeaders(Response $response, int $maxAttempts, int $remainingAttempts): Response
    {
        $response->headers->set('X-RateLimit-Limit', $maxAttempts);
        $response->headers->set('X-RateLimit-Remaining', max(0, $remainingAttempts));

        return $response;
    }
}
