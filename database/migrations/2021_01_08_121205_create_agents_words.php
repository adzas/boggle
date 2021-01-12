<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentsWords extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agents_words', function (Blueprint $table) {
            $table->id();
            $table->string('word');
            $table->boolean('red')->default(0);
            $table->boolean('blue')->default(0);
            $table->boolean('black')->default(0);
            $table->integer('agents_room_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agents_words');
    }
}
