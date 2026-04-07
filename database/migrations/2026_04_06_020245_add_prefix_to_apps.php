<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('apps', function (Blueprint $table) {
            $table->string('address_prefix')->nullable();
            $table->ipAddress('mx_ip6')->change()->nullable();
            $table->string('webhook_route')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('apps', function (Blueprint $table) {
            $table->dropColumn('address_prefix');
            $table->dropColumn('webhook_route');
        });
    }
};
