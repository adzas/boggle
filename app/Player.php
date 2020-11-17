<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    /**
     * Zwrata użytkownika z sesji
     */
    public static function getPlayerWithSession($room)
    {
        $token = session()->getId();
        $p = Player::select('id')
            ->where('token', $token)
            ->where('room', $room)
            ->first();
        if(!!$p)
        {
            $player = Player::select('id', 'nick', 'room', 'state', 'arrayWords', 'stateWords')
                ->where('id', $p->id)
                ->first();
            return $player;
        }
        else
            return false;
    }

    public function words()
    {
        return $this->hasMany('App\Models\Word');
    }
}
