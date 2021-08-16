<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = [
        'word',
        'state'
    ];

    public function player()
    {
        return $this->belongsTo('App\Player');
    }
}