<?php

namespace App\Http\Controllers;

use Session;
use App\Room;
use App\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{

    public function getPlayerWithSession()
    {
        $token = session()->getId();
        $p = Player::select('id')
            ->where('token', $token)
            ->first();
        if(!!$p)
        {
            $player = Player::select('id', 'nick', 'room', 'state', 'arrayWords')
                ->where('id', $p->id)
                ->first();
            return $player;
        }
        else
            return false;
    }


    public function checkLogin(Request $request)
    {
        $room = $request->get('room');
        $player = $this->getPlayerWithSession();

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


    public function login(Request $request)
    {
        //return $session_id = session()->getId();
        $nick = $request->get('nick');
        $isSet = Player::select('id')->where('nick', $nick)->first();
        if(empty($isSet))
        {
            $player = new Player;
            $player->nick = $nick;
            $player->room = 1;
            $player->arrayWords = '';
            $player->state = 1;
            $player->token = session()->getId();
            $player->save();

            return $player;
        }
        else
            return false;
    }



    public function getPlayers(Request $request)
    {
        $room = $request->get('room');
        $p = $this->getPlayerWithSession();
        $players = Player::select('id', 'nick', 'room', 'state', 'arrayWords')
            ->where('room', $room)
            ->where('id', '!=', $p->id)
            ->get();
        return $players;
    }


    public function saveWords(Request $request)
    {
        $string = '';
        $words = $request->get('words');
        foreach ($words as $word) {
            $string.= $word . ',';
        }
        $string = substr($string, 0, -1);

        $player = $this->getPlayerWithSession();
        if(!!$player)
        {
            $player->arrayWords = $string;
            $player->save();
            return $player;
        }
        else
            return false;
    }


    public function generateLettersArray($id)
    {
        $value = $this->randomLetters();
        $room = Room::find($id);
        $room->created = date('Y-m-d H:i:s');
        $room->letters = json_encode($value);
        $room->save();
        return $value;
    }


    public function generate(Request $request)
    {
        $id = $request->input('id');
        $getOldArray = $request->input('checkOldArray');
        
        DB::table('players')
            ->where('room', $id)
            ->update(['arrayWords' => '']);

        if($getOldArray === 'false')
        {
            $value = $this->randomLetters();
            $room = Room::find($id);
            $room->created = date('Y-m-d H:i:s');
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

    function randomLetters() {

        $A = 'A'; 
        $B = 'B'; 
        $C = 'C'; 
        $D = 'D';
        $E = 'E';
        $F = 'F';
        $G = 'G';
        $H = 'H';
        $I = 'I';
        $J = 'J';
        $K = 'K';
        $L = 'L';
        $M = 'M';
        $N = 'N';
        $O = 'O';
        $P = 'P';
        $Q = 'Q';
        $R = 'R';
        $S = 'S';
        $T = 'T';
        $U = 'U';
        $V = 'V';
        $W = 'W';
        $X = 'X';
        $Y = 'Y';
        $Z = 'Z';
        $Z2 = 'Ż';
        $Z3 = 'Ź';
        $L2 = 'Ł';
        $O2 = 'Ó';
        $N2 = 'Ń';
        $S2 = 'Ś';
        $E2 = 'Ę';
        $A2 = 'Ą'; 
        $C2 = 'Ć';
        
        /* 
        a 	8.91% 	  w 	4.65% 	  p 	3.13% 	  g 	1.42% 	  ć 	0.40%
        i 	8.21% 	  s 	4.32% 	  m 	2.80% 	  ę 	1.11% 	  f 	0.30%
        o 	7.75% 	  t 	3.98% 	  u 	2.50% 	  h 	1.08% 	  ń 	0.20%
        e 	7.66% 	  c 	3.96% 	  j 	2.28% 	  ą 	0.99% 	  q 	0.14%
        z 	5.64% 	  y 	3.76% 	  l 	2.10% 	  ó 	0.85% 	  ź 	0.06%
        n 	5.52% 	  k 	3.51% 	  ł 	1.82% 	  ż 	0.83% 	  v 	0.04%
        r 	4.69% 	  d 	3.25% 	  b 	1.47% 	  ś 	0.66% 	  x 	0.02% 
        */

        /* 
        0,01% = 0.5;
        0,1% = 4;
        0,5% = 21;
        1% = 42;
        */

        $alphabet = array();
        $alphabet = $this->addLetter($alphabet, $A, 372);
        $alphabet = $this->addLetter($alphabet, $I, (336 + (9*4)));
        $alphabet = $this->addLetter($alphabet, $O, ((7*42) + (7*4) + 2));
        $alphabet = $this->addLetter($alphabet, $E, ((7*42) + (6*4) + 3));
        $alphabet = $this->addLetter($alphabet, $Z, ((5*42) + (6*4) + 3));
        $alphabet = $this->addLetter($alphabet, $N, ((5*42) + (5*4) + 1));
        $alphabet = $this->addLetter($alphabet, $R, ((4*42) + (6*4) + 4));
        
        $alphabet = $this->addLetter($alphabet, $W, ((4*42) + (6*4) + 2));
        $alphabet = $this->addLetter($alphabet, $S, ((4*42) + (3*4) + 1));
        $alphabet = $this->addLetter($alphabet, $T, ((3*42) + (9*4) + 4));
        $alphabet = $this->addLetter($alphabet, $C, ((3*42) + (9*4) + 3));
        $alphabet = $this->addLetter($alphabet, $Y, ((3*42) + (7*4) + 3));
        $alphabet = $this->addLetter($alphabet, $K, ((3*42) + (5*4) + 0));
        $alphabet = $this->addLetter($alphabet, $D, ((3*42) + (2*4) + 2));
        
        $alphabet = $this->addLetter($alphabet, $P, ((3*42) + (1*4) + 1));
        $alphabet = $this->addLetter($alphabet, $M, ((2*42) + (8*4) + 0));
        $alphabet = $this->addLetter($alphabet, $U, ((2*42) + (5*4) + 0));
        $alphabet = $this->addLetter($alphabet, $J, ((2*42) + (2*4) + 4));
        $alphabet = $this->addLetter($alphabet, $L, ((2*42) + (1*4) + 0));
        $alphabet = $this->addLetter($alphabet, $L2, ((1*42) + (8*4) + 1));
        $alphabet = $this->addLetter($alphabet, $B, ((1*42) + (4*4) + 3));
        
        $alphabet = $this->addLetter($alphabet, $G, ((1*42) + (4*4) + 1));
        $alphabet = $this->addLetter($alphabet, $E2, ((1*42) + (1*4) + 0));
        $alphabet = $this->addLetter($alphabet, $H, 46);
        $alphabet = $this->addLetter($alphabet, $A2, 40);
        $alphabet = $this->addLetter($alphabet, $O2, (8*4));
        $alphabet = $this->addLetter($alphabet, $Z2, (8*4));
        $alphabet = $this->addLetter($alphabet, $S2, (6*4));

        $alphabet = $this->addLetter($alphabet, $C2, 16);
        $alphabet = $this->addLetter($alphabet, $X, 1);
        $alphabet = $this->addLetter($alphabet, $V, 2);
        $alphabet = $this->addLetter($alphabet, $Z3, 3);
        $alphabet = $this->addLetter($alphabet, $Q, 6);
        $alphabet = $this->addLetter($alphabet, $N2, 8);
        $alphabet = $this->addLetter($alphabet, $F, 13);
        
        sort($alphabet);
        $arrayWords = array(); //remember to declare $pass as an array
        $alphaLength = count($alphabet);
        for ($i = 0; $i < 16; $i++) {
            $n = rand(0, $alphaLength);
            $arrayWords[] = $alphabet[$n];
        }

        return $arrayWords; //turn the array into a string
    }


    function addLetter($alphabet, $word, $ilerazy)
    {
        for ($i=1; $i <= $ilerazy; $i++) { 
            $alphabet[]= $word;
        }
        return $alphabet;
    }
}
