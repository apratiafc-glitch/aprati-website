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
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->text('subtitle')->nullable();
            $table->string('image_url')->nullable();
            $table->string('image_alt')->nullable();
            $table->string('badge_text')->nullable();
            $table->string('badge_color')->nullable()->default('bg-blue-600 shadow-blue-500/50');
            $table->string('overlay_class')->nullable()->default('bg-blue-600/30');
            $table->string('primary_button_text', 100)->nullable();
            $table->string('primary_button_link')->nullable();
            $table->text('primary_button_class')->nullable();
            $table->string('secondary_button_text', 100)->nullable();
            $table->string('secondary_button_link')->nullable();
            $table->text('secondary_button_class')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('is_active');
            $table->index('display_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
