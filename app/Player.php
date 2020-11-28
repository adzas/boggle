<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    const FORBIDDEN_NICK = [
        'chuj',
        'dupa',
        'cipa',
        'cipka',
        'kutas',
        'jebać',
        'jebac',
        'kurw',
    ];
    /**
     * Zwrata użytkownika z sesji
     */
    public static function getPlayerWithSession($room)
    {
        $token = session()->getId();
        $p = self::select('id')
            ->where('token', $token)
            ->where('room', $room)
            ->first();
        if(!!$p)
        {
            $player = self::select('id', 'nick', 'room', 'state', 'arrayWords', 'stateWords')
                ->where('id', $p->id)
                ->first();
            return $player;
        }
        else
            return false;
    }

    public static function checkNick(string $nick)
    {
        // TODO to coś nie halo bo przepuszcza ten sam nick dwa razy
        if (!empty($nick)) {
            self::removeOldPlayers();
            $exist = self::select()
                ->where([
                    ['nick', $nick],
                    ['token', session()->getId()],
                ])
                ->exists();

            if (1 !== $exist && self::allowedNick($nick)) {
                return true;
            }
        }

        return false;
    }

    public static function removeOldPlayers()
    {
        $oldPlayers = Player::select()->where('updated_at', '<', date('Y-m-d', strtotime(' -20 minutes')))->get();
        foreach ($oldPlayers as $oldPlayer) {
            $oldPlayer->delete();
        }
    }

    public static function allowedNick(string $nick)
    {
        foreach (self::FORBIDDEN_NICK as $forbidden) {
            if (false !== strpos($nick, $forbidden)) {
                return false;
            }
        }

        return true;
    }

    public function words()
    {
        return $this->hasMany('App\Models\Word');
    }
}
