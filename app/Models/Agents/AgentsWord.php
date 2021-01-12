<?php

namespace App\Models;

use App\Models\Agents\AgentsRoom;
use Illuminate\Database\Eloquent\Model;

class AgentsWord extends Model
{
    private $word;
    private $red = false;
    private $blue = false;
    private $black = false;

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

    private function setAttr(string $attr): bool
    {
        if (true !== $this->black && true !== $this->red && true !== $this->blue) {
            $this->{$attr} = true;

            return true;
        }

        return false;
    }

    public function getBackground(): string
    {
        if ($this->black) {
            return 'black';
        } elseif ($this->red) {
            return 'red';
        } elseif ($this->blue) {
            return 'blue';
        }

        return 'default';
    }

    public function getName(): string
    {
        return $this->getAttribute('word');
    }
}
