<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Brand;
use App\Models\User;

class TestBrandCreation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:brand-creation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test brand creation functionality';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            // Test database connection
            $this->info('Testing database connection...');
            $userCount = User::count();
            $this->info("Found {$userCount} users in database");

            // Test brand table
            $this->info('Testing brands table...');
            $brandCount = Brand::count();
            $this->info("Found {$brandCount} brands in database");

            // Test brand creation
            $this->info('Testing brand creation...');
            $brand = Brand::create([
                'name' => 'Test Brand ' . time(),
                'slug' => 'test-brand-' . time(),
                'description' => 'Test brand description',
                'is_active' => true,
                'sort_order' => 1
            ]);

            $this->info("Brand created successfully with ID: {$brand->id}");
            
            // Clean up test brand
            $brand->delete();
            $this->info('Test brand deleted');

            $this->info('All tests passed!');
            
        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            $this->error('File: ' . $e->getFile() . ':' . $e->getLine());
            $this->error('Stack trace: ' . $e->getTraceAsString());
        }
    }
}
