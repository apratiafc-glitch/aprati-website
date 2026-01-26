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
        Schema::table('job_applications', function (Blueprint $table) {
            // Add career_id if not exists
            if (!Schema::hasColumn('job_applications', 'career_id')) {
                $table->foreignId('career_id')->nullable()->constrained()->onDelete('cascade');
            }
            
            // Add new fields if they don't exist
            if (!Schema::hasColumn('job_applications', 'full_name')) {
                $table->string('full_name')->nullable();
            }
            if (!Schema::hasColumn('job_applications', 'email')) {
                $table->string('email')->nullable();
            }
            if (!Schema::hasColumn('job_applications', 'phone_number')) {
                $table->string('phone_number')->nullable();
            }
            if (!Schema::hasColumn('job_applications', 'telegram_number')) {
                $table->string('telegram_number')->nullable();
            }
            if (!Schema::hasColumn('job_applications', 'cv_file_path')) {
                $table->string('cv_file_path')->nullable();
            }
            if (!Schema::hasColumn('job_applications', 'cv_original_name')) {
                $table->string('cv_original_name')->nullable();
            }
            if (!Schema::hasColumn('job_applications', 'admin_notes')) {
                $table->text('admin_notes')->nullable();
            }
            if (!Schema::hasColumn('job_applications', 'applied_at')) {
                $table->timestamp('applied_at')->nullable()->useCurrent();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            if (Schema::hasColumn('job_applications', 'career_id')) {
                $table->dropForeign(['career_id']);
                $table->dropColumn('career_id');
            }
            
            $columnsToCheck = [
                'full_name', 'email', 'phone_number', 'telegram_number',
                'cv_file_path', 'cv_original_name', 'admin_notes', 'applied_at'
            ];
            
            foreach ($columnsToCheck as $column) {
                if (Schema::hasColumn('job_applications', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
