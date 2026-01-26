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
        Schema::create('management_posts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position');
            $table->string('department')->nullable();
            $table->string('email')->nullable();
            $table->text('description');
            $table->longText('bio')->nullable();
            $table->string('image_url', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['is_active', 'created_at']);
            $table->index('department');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('management_posts');
    }
};
