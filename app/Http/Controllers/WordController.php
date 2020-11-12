<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class WordController extends Controller
{
    public static function check($word)
    {
        if (DB::table('polish_words')->where('word', $word)->exists()) {
            return 1;
        } else {
            return 0;
        }
    }

    public static function checkArray(array $arrayWords)
    {
        $return = '';
        foreach ($arrayWords as $word) {
            $return.= self::check($word).',';
        }

        return $return;
    }
}
