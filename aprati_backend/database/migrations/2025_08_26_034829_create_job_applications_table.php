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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('career_positions')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('applicant_name');
            $table->string('applicant_email');
            $table->string('applicant_phone')->nullable();
            $table->longText('cover_letter')->nullable();
            $table->string('resume_path');
            $table->string('portfolio_url')->nullable();
            $table->decimal('expected_salary', 12, 2)->nullable();
            $table->date('availability_date')->nullable();
            $table->enum('status', ['pending', 'reviewing', 'interview', 'accepted', 'rejected'])->default('pending');
            $table->text('notes')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
            
            $table->index(['job_id', 'status']);
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
