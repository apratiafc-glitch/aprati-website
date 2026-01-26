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
        Schema::create('promotion_banners', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->string('image_url');
            $table->string('background_color')->default('#EF4444'); // Default red from image
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->string('text_color')->default('text-white');
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->json('styling_options')->nullable(); // For extra styling customization
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotion_banners');
    }
};
