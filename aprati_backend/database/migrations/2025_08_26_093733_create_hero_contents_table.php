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
        Schema::create('hero_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->text('subtitle')->nullable();
            $table->string('primary_button_text', 100)->default('Explore Our Brands');
            $table->string('primary_button_link', 255)->default('/brands');
            $table->string('secondary_button_text', 100)->default('Join Our Team');
            $table->string('secondary_button_link', 255)->default('/careers');
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_contents');
    }
};
