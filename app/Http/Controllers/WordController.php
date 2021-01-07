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
        // TODO przenieść do modelu Word
        $return = [];
        foreach ($arrayWords as $word) {
            $return[] = self::check($word);
        }

        return $return;
    }

    public function getPasswordWords(int $howmuch)
    {
        $max = DB::table('polish_password_words')->count('id');
        $returnWords = [];
        while (count($returnWords) < $howmuch) {
            $returnWords[] = DB::table('polish_password_words')->where('id', '=', rand(1, $max))->first();
            // TODO zrobić model rekordów tabeli szefler_words_for_player i takie instancje tutaj zwracać
            $returnWords = array_filter($returnWords);
        }

        return $returnWords;
    }
}
