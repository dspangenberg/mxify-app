<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
            $table->boolean('is_locked')->default(false);
            $table->timestamp('last_login_at')->nullable();
            $table->unsignedBigInteger('current_app_id')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
            $table->dropColumn('is_locked');
            $table->dropColumn('last_login_at');
            $table->dropColumn('current_app_id');
        });
    }
};
