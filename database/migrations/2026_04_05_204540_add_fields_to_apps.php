<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('apps', function (Blueprint $table) {
            $table->string('mx_name');
            $table->ipAddress('mx_ip4');
            $table->ipAddress('mx_ip6');
            $table->string('website');
        });
    }

    public function down(): void
    {
        Schema::table('apps', function (Blueprint $table) {
            $table->dropColumn('mx_name');
            $table->dropColumn('mx_ip4');
            $table->dropColumn('mx_ip6');
            $table->dropColumn('website');
        });
    }
};
