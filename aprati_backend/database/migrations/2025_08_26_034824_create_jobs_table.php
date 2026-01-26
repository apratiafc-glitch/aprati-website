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
        Schema::create('career_positions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('department');
            $table->string('location');
            $table->enum('employment_type', ['full-time', 'part-time', 'contract', 'internship']);
            $table->enum('experience_level', ['entry', 'mid', 'senior', 'executive']);
            $table->string('salary_range')->nullable();
            $table->longText('description');
            $table->json('requirements')->nullable();
            $table->json('benefits')->nullable();
            $table->date('application_deadline');
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['is_active', 'application_deadline']);
            $table->index('department');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('career_positions');
    }
};
