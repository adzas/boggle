<?php

namespace App\Http\Controllers;

use App\Models\LetterHelper;
use App\Models\Word;
use App\Room;
use App\Player;
use Illuminate\Http\Request;

class RoomController extends Controller
{

    /**
     * Loguje gracza do pokoju
     */
    public function login(Request $request)
    {
        $room = $request->input('room');
        $nick = $request->input('nick');

        if(isset($nick) && Player::checkNick($nick)) {
            $player = new Player;
            $player->nick = $nick;
            $player->room = $room;
            $player->words();
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
        if($p instanceof Player)
        {
            $players = Player::with('words')
                ->where('room', $room)
                ->where('id', '!=', $p->id)
                ->get();

            return $players;
        }

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
            $player->resetWords();
            $wordsToStored = [];
            if(!empty($words))
            {
                foreach ($words as $word) {
                    $word = json_decode($word);
                    $wordsToStored[] = new Word(['word' => $word->word]);
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
            if($room instanceof Room)
            {
                $player = Player::where('room', $id)->first();
                $player->resetWords();

                if($getOldArray === 'false' || empty($room->letters))
                {
                    $value = LetterHelper::randomLetters();
                    $room->letters = json_encode($value);
                    $room->save();
                    return $value;
                }
                else
                {
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
