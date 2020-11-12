<?php

namespace App\Http\Controllers;

use App\Player;
use Illuminate\Http\Request;

class CheckController extends Controller
{
    /**
     * Sprawdza czy słowo ustnieje w słowniku języka polskiego
     */
    public function checkDictionary(Request $request)
    {
        $post = $request->post();
        $room = $post['params']['room'];
        $words = $post['params']['words'];

        $player = Player::getPlayerWithSession($room);

        if ($player instanceof Player) {
            $stateWords = "";
            if (null != $words) {
                $stateWords = WordController::checkArray($words);
                $stateWords = substr($stateWords, 0, -1);
                $player->stateWords = $stateWords;
            }
            $player->save();

            return $player;
        }

        return false;
    }
    

    /**
     * Sprawdza czy użytkownik jest zalogowany w sesji w danym pokoju
     */
    public function checkLogin(Request $request)
    {
        $room = $request->get('room');
        $player = Player::getPlayerWithSession($room);

        if(!!$player)
        {
            if($player->room == $room)
                return $player;
            else
                return null;
        }
        else
        {
            return null;
        }
    }
}
