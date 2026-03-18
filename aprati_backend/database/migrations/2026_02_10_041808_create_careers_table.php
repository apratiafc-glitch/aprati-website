<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('title_job');
            $table->text('career_information');
            $table->text('job_description');
            $table->text('job_requirements');
            $table->string('salary_range');
            $table->string('position');
            $table->string('location')->nullable();
            $table->string('job_type')->default('Full-time');
            $table->string('department')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
