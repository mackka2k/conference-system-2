<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddConferenceNameToConferenceUserTable extends Migration
{
    public function up()
    {
        Schema::table('conference_user', function (Blueprint $table) {
            $table->string('conference_name')->after('user_name');
        });
    }

    public function down()
    {
        Schema::table('conference_user', function (Blueprint $table) {
            $table->dropColumn('conference_name');
        });
    }
}
