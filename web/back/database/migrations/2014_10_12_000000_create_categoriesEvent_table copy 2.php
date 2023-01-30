<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoriesEvent', function (Blueprint $table) {
            $table->integer('id_event')->unsigned();
            $table->integer('id_categoria')->unsigned();
            $table->foreign('id_event')->references('id')->on('events'); 
            $table->foreign('id_categoria')->references('id')->on('eventCategories'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
