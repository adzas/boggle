<?php

namespace App\Http\Controllers;

use App\Models\LetterHelper;
use App\Models\Word;
use App\Room;
use App\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{

    /**
     * Loguje gracza do pokoju
     */
    public function login(Request $request)
    {
        //return $session_id = session()->getId();
        $nick = $request->input('nick');
        $room = $request->input('room');
        $isSet = Player::select('id')->where('nick', $nick)->first();
        if(empty($isSet))
        {
            $player = new Player;
            $player->nick = $nick;
            $player->room = $room;
            $player->arrayWords = '';
            $player->stateWords = '';
            $player->state = 1;
            $player->token = session()->getId();
            $player->save();

            return $player;
        }
        else
            return false;
    }

    public function logout(Request $request)
    {
        $player = Player::select()->where('token', session()->getId())->first();
        if ($player instanceof Player) {
            $player->delete();
        }
        $request->session()->flush();
        return (new HomeController())->reactHome();
    }

    /**
     * Pobiera graczy z danego pokoju
     */
    public function getPlayers(Request $request)
    {
        $room = $request->get('room');
        $p = Player::getPlayerWithSession($room);
        if(!!$p)
        {
            $players = Player::select('id', 'nick', 'room', 'state', 'arrayWords', 'stateWords')
                ->where('room', $room)
                ->where('id', '!=', $p->id)
                ->get();
            return $players;
        }
        else
            return false;
    }


    /**
     * Zapisuje słowa znalezione przez gracza
     */
    public function saveWords(Request $request)
    {
        $words = $request->input('words');
        $room = $request->input('room');
        $player = Player::getPlayerWithSession($room);
        if ($player instanceof Player) {
            $wordsToStored = [];
            if(!empty($words))
            {
                foreach ($words as $word) {
                    $wordsToStored[] = new Word(['word' => $word]);
                }
            }
            $player->words()->saveMany($wordsToStored);

            return $player;
        }

        return false;
    }


    /**
     * Generuje tablicę polskich znaków lub pobiera już istniejącą tablicę przypisaną do pokoju
     */
    public function generateLettersArray(Request $request)
    {
        $id = $request->input('id');
        $getOldArray = $request->input('checkOldArray');
        
        if(!empty($id))
        {
            $room = Room::find($id);
            if(!!$room)
            {
                DB::table('players')
                    ->where('room', $id)
                    ->update(['arrayWords' => '']);
        
                if($getOldArray === 'false')
                {
                    $value = LetterHelper::randomLetters();
                    $room->letters = json_encode($value);
                    $room->save();
                    return $value;
                }
                else
                {
                    $room = Room::find($id);
                    return $room->letters;
                }
            }
            else
            {
                $value = LetterHelper::randomLetters();
                $room = new Room;
                $room->letters = json_encode($value);
                $room->wasChanged();
                $room->save();
                return $value;
            }
        }
        else
            return false;
    }

    /**
     * Usuwa graczy z danego pokoju
     */
    public function resetRoom(Request $request)
    {
        $room = $request->get('room');
        $res = Player::where('room', $room)->delete();
        return $res;
    }
}
