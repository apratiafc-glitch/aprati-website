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
        Schema::table('visitors', function (Blueprint $table) {
            // Add missing columns if they don't exist
            if (!Schema::hasColumn('visitors', 'user_agent')) {
                $table->text('user_agent')->nullable()->after('ip_address');
            }
            if (!Schema::hasColumn('visitors', 'page_url')) {
                $table->string('page_url', 500)->after('user_agent');
            }
            if (!Schema::hasColumn('visitors', 'referer')) {
                $table->string('referer', 500)->nullable()->after('page_url');
            }
            if (!Schema::hasColumn('visitors', 'session_id')) {
                $table->string('session_id', 100)->nullable()->after('referer');
            }
            if (!Schema::hasColumn('visitors', 'country')) {
                $table->string('country', 100)->nullable()->after('session_id');
            }
            if (!Schema::hasColumn('visitors', 'city')) {
                $table->string('city', 100)->nullable()->after('country');
            }
            if (!Schema::hasColumn('visitors', 'device_type')) {
                $table->string('device_type', 50)->nullable()->after('city');
            }
            if (!Schema::hasColumn('visitors', 'browser')) {
                $table->string('browser', 100)->nullable()->after('device_type');
            }
            if (!Schema::hasColumn('visitors', 'operating_system')) {
                $table->string('operating_system', 100)->nullable()->after('browser');
            }
            if (!Schema::hasColumn('visitors', 'visited_at')) {
                $table->timestamp('visited_at')->after('operating_system');
            }
            if (!Schema::hasColumn('visitors', 'is_unique')) {
                $table->boolean('is_unique')->default(false)->after('visited_at');
            }
            if (!Schema::hasColumn('visitors', 'visit_duration')) {
                $table->integer('visit_duration')->nullable()->after('is_unique');
            }

            // Add indexes if they don't exist
            // Since the original create_visitors_table migration already adds these indexes,
            // we don't need to add them again. Just skip this section.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitors', function (Blueprint $table) {
            $table->dropColumn([
                'user_agent', 'page_url', 'referer', 'session_id',
                'country', 'city', 'device_type', 'browser',
                'operating_system', 'visited_at', 'is_unique', 'visit_duration'
            ]);
        });
    }
};
