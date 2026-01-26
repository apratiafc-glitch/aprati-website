<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CheckVisitorsTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'visitors:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check and fix visitors table structure';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking visitors table structure...');
        
        try {
            // Check if table exists
            if (!Schema::hasTable('visitors')) {
                $this->error('Visitors table does not exist!');
                return 1;
            }

            // Get current columns
            $columns = Schema::getColumnListing('visitors');
            $this->info('Current columns: ' . implode(', ', $columns));

            // Check if we need to recreate the table
            $requiredColumns = [
                'id', 'ip_address', 'user_agent', 'page_url', 'referer',
                'session_id', 'country', 'city', 'device_type', 'browser',
                'operating_system', 'visited_at', 'is_unique', 'visit_duration',
                'created_at', 'updated_at'
            ];

            $missingColumns = array_diff($requiredColumns, $columns);
            
            if (!empty($missingColumns)) {
                $this->warn('Missing columns: ' . implode(', ', $missingColumns));
                
                if ($this->confirm('Do you want to recreate the visitors table with correct structure?')) {
                    $this->recreateTable();
                }
            } else {
                $this->info('Visitors table structure is correct!');
            }

        } catch (\Exception $e) {
            $this->error('Error: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }

    private function recreateTable()
    {
        $this->info('Dropping existing visitors table...');
        Schema::dropIfExists('visitors');

        $this->info('Creating new visitors table...');
        Schema::create('visitors', function ($table) {
            $table->id();
            $table->string('ip_address', 45);
            $table->text('user_agent')->nullable();
            $table->string('page_url', 500);
            $table->string('referer', 500)->nullable();
            $table->string('session_id', 100)->nullable();
            $table->string('country', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('device_type', 50)->nullable();
            $table->string('browser', 100)->nullable();
            $table->string('operating_system', 100)->nullable();
            $table->timestamp('visited_at');
            $table->boolean('is_unique')->default(false);
            $table->integer('visit_duration')->nullable();
            $table->timestamps();

            // Indexes
            $table->index('ip_address');
            $table->index('visited_at');
            $table->index('page_url');
            $table->index('is_unique');
        });

        $this->info('Visitors table recreated successfully!');
    }
}
