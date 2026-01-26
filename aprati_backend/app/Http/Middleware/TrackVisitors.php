<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Visitor;
use Carbon\Carbon;
use Jenssegers\Agent\Agent;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip tracking for admin routes, API routes, and assets
        if ($this->shouldSkipTracking($request)) {
            return $next($request);
        }

        $this->trackVisitor($request);

        return $next($request);
    }

    private function shouldSkipTracking(Request $request): bool
    {
        $skipPatterns = [
            'admin/*',
            'api/*',
            '*.css',
            '*.js',
            '*.png',
            '*.jpg',
            '*.jpeg',
            '*.gif',
            '*.svg',
            '*.ico',
            '*.woff',
            '*.woff2',
            '*.ttf',
            '*.eot',
            'robots.txt',
            'sitemap.xml',
        ];

        foreach ($skipPatterns as $pattern) {
            if ($request->is($pattern)) {
                return true;
            }
        }

        return false;
    }

    private function trackVisitor(Request $request): void
    {
        try {
            $agent = new Agent();
            $ipAddress = $this->getClientIpAddress($request);
            $sessionId = session()->getId();
            
            // Check if this is a unique visitor (first visit today)
            $isUnique = !Visitor::where('ip_address', $ipAddress)
                              ->whereDate('visited_at', Carbon::today())
                              ->exists();

            // Get location data (you can integrate with services like ipapi.com)
            $locationData = $this->getLocationData($ipAddress);

            Visitor::create([
                'ip_address' => $ipAddress,
                'user_agent' => $request->userAgent(),
                'page_url' => $request->fullUrl(),
                'referer' => $request->header('referer'),
                'session_id' => $sessionId,
                'country' => $locationData['country'] ?? null,
                'city' => $locationData['city'] ?? null,
                'device_type' => $this->getDeviceType($agent),
                'browser' => $agent->browser(),
                'operating_system' => $agent->platform(),
                'visited_at' => Carbon::now(),
                'is_unique' => $isUnique,
            ]);
        } catch (\Exception $e) {
            // Log error but don't break the application
            \Log::error('Visitor tracking failed: ' . $e->getMessage());
        }
    }

    private function getClientIpAddress(Request $request): string
    {
        $ipKeys = [
            'HTTP_CF_CONNECTING_IP',     // Cloudflare
            'HTTP_CLIENT_IP',            // Proxy
            'HTTP_X_FORWARDED_FOR',      // Load balancer/proxy
            'HTTP_X_FORWARDED',          // Proxy
            'HTTP_X_CLUSTER_CLIENT_IP',  // Cluster
            'HTTP_FORWARDED_FOR',        // Proxy
            'HTTP_FORWARDED',            // Proxy
            'REMOTE_ADDR'                // Standard
        ];

        foreach ($ipKeys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                $ip = $_SERVER[$key];
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }

        return $request->ip();
    }

    private function getDeviceType(Agent $agent): string
    {
        if ($agent->isMobile()) {
            return 'Mobile';
        } elseif ($agent->isTablet()) {
            return 'Tablet';
        } elseif ($agent->isDesktop()) {
            return 'Desktop';
        } else {
            return 'Unknown';
        }
    }

    private function getLocationData(string $ipAddress): array
    {
        // You can integrate with free services like:
        // - ipapi.com (free tier: 1000 requests/month)
        // - ip-api.com (free tier: 45 requests/minute)
        // - ipgeolocation.io
        
        try {
            // Example with ip-api.com (free service)
            $response = @file_get_contents("http://ip-api.com/json/{$ipAddress}");
            if ($response) {
                $data = json_decode($response, true);
                if ($data && $data['status'] === 'success') {
                    return [
                        'country' => $data['country'] ?? null,
                        'city' => $data['city'] ?? null,
                    ];
                }
            }
        } catch (\Exception $e) {
            // Silently fail if location service is unavailable
        }

        return ['country' => null, 'city' => null];
    }
}
