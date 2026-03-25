<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production environments
        if (str_contains(request()->root(), 'https') || str_contains(env('APP_URL'), 'https')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        // Force correct APP_URL if accessed via the live domain (bypasses stale .env or cache)
        if (str_contains(request()->getHost(), 'apratifoods.asia')) {
            config(['app.url' => 'https://sdev.apratifoods.asia']);
            config(['filesystems.disks.public.url' => 'https://sdev.apratifoods.asia/storage']);
        }
    }
}
