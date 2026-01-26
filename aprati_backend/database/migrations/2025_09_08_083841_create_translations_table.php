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
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('key')->index(); // Translation key (e.g., 'home', 'about.title')
            $table->text('value'); // Translation value
            $table->string('locale', 5)->index(); // Language code (e.g., 'en', 'km')
            $table->string('group')->default('general')->index(); // Group (e.g., 'navigation', 'hero', 'brands')
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Unique constraint to prevent duplicate keys per locale
            $table->unique(['key', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
