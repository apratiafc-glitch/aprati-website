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
        Schema::table('users', function (Blueprint $table) {
            $table->string('telegram_chat_id')->nullable()->after('telegram_photo_url');
            $table->string('otp_code')->nullable()->after('telegram_chat_id');
            $table->timestamp('otp_expires_at')->nullable()->after('otp_code');
            $table->boolean('two_factor_enabled')->default(false)->after('otp_expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'telegram_chat_id',
                'otp_code',
                'otp_expires_at',
                'two_factor_enabled'
            ]);
        });
    }
};
