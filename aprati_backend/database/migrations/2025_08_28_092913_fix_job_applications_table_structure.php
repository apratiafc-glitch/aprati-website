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
        // Drop and recreate the job_applications table with correct structure
        Schema::dropIfExists('job_applications');
        
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->constrained('careers')->onDelete('cascade');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('telegram_number')->nullable();
            $table->text('cover_letter')->nullable();
            $table->string('cv_file_path');
            $table->string('cv_original_name');
            $table->enum('status', ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamp('applied_at')->useCurrent();
            $table->timestamps();
            
            $table->index(['career_id', 'status']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
