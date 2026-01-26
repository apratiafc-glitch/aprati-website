<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use App\Models\FooterSetting;

class CreateFooterSettingsTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'footer:create-table';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create footer settings table and initialize default data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            // Check if table already exists
            if (Schema::hasTable('footer_settings')) {
                $this->info('Footer settings table already exists.');
                
                // Ask if we should initialize defaults
                if ($this->confirm('Do you want to initialize default footer settings?')) {
                    FooterSetting::createDefaults();
                    $this->info('Default footer settings created successfully.');
                }
                return;
            }

            // Create the table
            Schema::create('footer_settings', function (Blueprint $table) {
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

            $this->info('Footer settings table created successfully.');

            // Initialize default data
            FooterSetting::createDefaults();
            $this->info('Default footer settings initialized.');

            return 0;
        } catch (\Exception $e) {
            $this->error('Error creating footer settings table: ' . $e->getMessage());
            return 1;
        }
    }
}
