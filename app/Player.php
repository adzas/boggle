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
            $player = self::select('id', 'nick', 'room', 'state')
                ->where('id', $p->id)
                ->first();
            $player->words;
            return $player;
        }
        else
            return false;
    }

    public static function checkNick(string $nick)
    {
        if (!empty($nick)) {
            self::removeOldPlayers();
            $exist = self::select()
                ->where('nick', $nick)
                ->orWhere('token', session()->getId())
                ->exists();

            if (!$exist && self::allowedNick($nick)) {
                return true;
            }
        }

        return false;
    }

    public static function removeOldPlayers()
    {
        $oldPlayers = Player::select()->where('updated_at', '<', date('Y-m-d H:i:s', strtotime('-20 minutes')))->get();
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

    public function resetWords()
    {
        foreach ($this->words as $word) {
            $word->delete();
        }
    }
}
