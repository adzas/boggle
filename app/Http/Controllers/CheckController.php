<?php

namespace App\Http\Controllers;

use App\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CheckController extends Controller
{
    /**
     * Sprawdza czy słowo ustnieje w słowniku języka polskiego
     */
    public function checkDictionary(Request $request)
    {
        $room = $request->get('room');
        $words = $request->get('words');
        $file = Storage::disk('local')->get('dictionary/slowa.txt');
        
        $stateWords = "";
        foreach ($words as $word)
        {
            if(strpos($file, "\r\n" . strtolower($word) . "\r\n") !== FALSE)
                $stateWords.= "1,";
            else
                $stateWords.= "0,";
        }

        $player = Player::getPlayerWithSession($room);
        $stateWords = substr($stateWords, 0, -1);
        $player->stateWords = $stateWords;
        $player->save();
        return $player;
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
