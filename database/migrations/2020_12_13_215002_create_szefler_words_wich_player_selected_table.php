<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSzeflerWordsWichPlayerSelectedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('szefler_words_wich_player_selected', function (Blueprint $table) {
            $table->id();
            $table->string('word');
            $table->integer('player_id');
            $table->integer('from_player');
            $table->integer('state');
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
        Schema::dropIfExists('szefler_words_wich_player_selected');
    }
}
