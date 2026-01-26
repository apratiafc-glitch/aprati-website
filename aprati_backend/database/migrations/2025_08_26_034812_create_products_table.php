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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('brands')->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->unique()->nullable();
            $table->string('part_number')->unique()->nullable();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->decimal('cost_price', 12, 2)->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->integer('min_stock_level')->default(0);
            $table->integer('max_stock_level')->default(0);
            $table->decimal('weight', 8, 2)->nullable();
            $table->json('dimensions')->nullable();
            $table->string('category')->nullable();
            $table->string('subcategory')->nullable();
            $table->json('technical_specs')->nullable();
            $table->json('images')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('tags')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['brand_id', 'is_active']);
            $table->index(['category', 'is_active']);
            $table->index(['is_featured', 'is_active']);
            $table->index('part_number');
            // Note: Fulltext index commented out for SQLite compatibility
            // $table->fullText(['name', 'description']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
