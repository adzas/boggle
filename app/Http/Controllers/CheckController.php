<?php

namespace App\Http\Controllers;

use App\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CheckController extends Controller
{
    public function checkDictionary(Request $request)
    {
        $room = $request->get('room');
        $words = $request->get('words');
        $file = Storage::disk('local')->get('dictionary/slowa.txt');
        
        $stateWords = "";
        foreach ($words as $word)
        {
            if(strpos($file, "\r\n" . $word . "\r\n") !== FALSE)
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
}
