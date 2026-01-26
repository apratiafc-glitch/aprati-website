<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\FooterSetting;

class InitializeFooterSettings extends Command
{
    protected $signature = 'footer:init';
    protected $description = 'Initialize footer settings with default values';

    public function handle()
    {
        FooterSetting::createDefaults();
        $this->info('Footer settings initialized successfully!');
        
        // Show business hours settings
        $businessHours = FooterSetting::where('group', 'contact')
            ->where('key', 'like', '%business_hours%')
            ->get();
            
        $this->info('Business hours settings:');
        foreach ($businessHours as $setting) {
            $this->line("- {$setting->label}: {$setting->value}");
        }
    }
}
