<?php

namespace App\Models\Agents;

use Illuminate\Database\Eloquent\Model;

class AgentsRoom extends Model
{
    protected $fillable = [
        'id',
    ];

    public function player()
    {
        return $this->belongsTo('App\Player');
    }
}
