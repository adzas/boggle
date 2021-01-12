<?php

namespace App\Models;

use App\Models\Agents\AgentsRoom;
use Illuminate\Database\Eloquent\Model;

class AgentsWord extends Model
{
    protected $fillable = [
        'red',
        'blue',
        'black',
    ];

    public function agents_room()
    {
        return $this->belongsTo(AgentsRoom::class, 'id', 'agents_rooms_id');
    }

    public function setRed(): bool
    {
        return $this->setAttr('red');
    }

    public function setBlue(): bool
    {
        return $this->setAttr('blue');
    }

    public function setBlack(): bool
    {
        return $this->setAttr('black');
    }

    public function reset()
    {
        $this->update(['red' => 0, 'blue' => 0, 'black' => 0]);
    }

    private function setAttr(string $attr): bool
    {
        if (true !== $this->getAttribute('black') && true !== $this->getAttribute('red') && true !== $this->getAttribute('blue')) {
            $this->update([$attr => 1]);

            return true;
        }

        return false;
    }

    public function getBackground(): string
    {
        if ($this->getAttribute('black')) {
            return 'black';
        } elseif ($this->getAttribute('red')) {
            return 'red';
        } elseif ($this->getAttribute('blue')) {
            return 'blue';
        }

        return 'default';
    }

    public function getName(): string
    {
        return $this->getAttribute('word');
    }

    public function getID(): int
    {
        return $this->getAttribute('id');
    }
}
