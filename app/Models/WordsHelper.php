<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class WordsHelper extends Model
{
    public static function getRandomWords(int $howMuch)
    {
        $return = [];
        $table = 'polish_password_words';
        $all = DB::table($table)->count();
        while (count($return) < $howMuch) {
            $random = rand(1, $all);
            $currentWord = DB::table($table)->where('ID', $random)->value('word');
            if (false === array_search($currentWord, $return)) {
                $return[] = $currentWord;
            }
        }

        return $return;
    }
}
