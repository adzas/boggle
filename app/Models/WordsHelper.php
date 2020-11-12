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
        for ($i=0; $i < $howMuch; $i++) { 
            $random = rand(1, $all);
            $return[] = DB::table($table)->where('ID', $random)->value('word');
        }
        return $return;
    }
}
