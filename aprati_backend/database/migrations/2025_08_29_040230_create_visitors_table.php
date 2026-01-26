<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visitors', function (Blueprint $table) {
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
            $table->integer('visit_duration')->nullable(); // in seconds
            $table->timestamps();

            // Indexes for better performance
            $table->index('ip_address');
            $table->index('visited_at');
            $table->index('page_url');
            $table->index('is_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitors');
    }
};
