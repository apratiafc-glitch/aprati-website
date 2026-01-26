<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the existing unique constraint
        Schema::table('brands', function (Blueprint $table) {
            $table->dropUnique(['slug']);
        });
        
        // Add a new unique constraint that ignores soft-deleted records
        DB::statement('ALTER TABLE brands ADD CONSTRAINT brands_slug_unique UNIQUE (slug, deleted_at)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the new constraint
        DB::statement('ALTER TABLE brands DROP CONSTRAINT brands_slug_unique');
        
        // Restore the original unique constraint
        Schema::table('brands', function (Blueprint $table) {
            $table->unique('slug');
        });
    }
};
