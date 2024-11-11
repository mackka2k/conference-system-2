<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDateToConferencesTable extends Migration
{
    public function up()
    {
        Schema::table('conferences', function (Blueprint $table) {
            $table->date('date')->nullable();
        });
    }

    public function down()
    {
        Schema::table('conferences', function (Blueprint $table) {
            $table->dropColumn('date');
        });
    }
}
