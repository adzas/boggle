<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSzeflerWordsForPlayerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('szefler_words_for_player', function (Blueprint $table) {
            $table->id();
            $table->string('word');
            $table->boolean('is_checked');
            $table->boolean('is_password');
            $table->integer('player_id');
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
        Schema::dropIfExists('szefler_words');
    }
}
