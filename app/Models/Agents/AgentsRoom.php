<?php

namespace App\Models\Agents;

use App\Models\AgentsWord;
use Illuminate\Database\Eloquent\Model;

class AgentsRoom extends Model
{
    protected $fillable = [
        'id',
    ];

    public function agents_words()
    {
        return $this->hasMany(AgentsWord::class, 'agents_room_id', 'id');
    }
}
