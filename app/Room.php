<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public function getLetters()
    {
        $res = array();
        $letters = json_decode($this->letters);
        foreach ($letters as $key => $letter) {
            $res[] = $letter; 
        }
        return $res;
    }
}
