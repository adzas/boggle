<?php

namespace App\Models\Agents;

use App\Models\AgentsWord;
use App\Models\WordsHelper;
use Illuminate\Database\Eloquent\Model;

class AgentsHelper extends Model
{
    const HOM_MUCH_WORDS = 25;
    const HOM_MUCH_BLUE_WORDS = 8;
    const HOM_MUCH_RED_WORDS = 8;
    const HOM_MUCH_BLACK_WORDS = 1;

    private $currentRoom;
    private $agentsWords = [];

    public function getRooms()
    {
        return AgentsRoom::get();
    }

    public function getWords($id): array
    {
        $this->setCurrentRoom($id);
        if (empty($this->getIssetWords())) {
            $this->generateWords(SELF::HOM_MUCH_WORDS);
            $this->setRandomRedWords(SELF::HOM_MUCH_RED_WORDS);
            $this->setRandomBlueWords(SELF::HOM_MUCH_BLUE_WORDS);
            $this->setRandomBlackWords(SELF::HOM_MUCH_BLACK_WORDS);
        }

        return $this->agentsWords;
    }

    public function resetSettings(int $id)
    {
        foreach ($this->getWords($id) as $word) {
            $word->reset();
        }
        $this->setRandomRedWords(SELF::HOM_MUCH_RED_WORDS);
        $this->setRandomBlueWords(SELF::HOM_MUCH_BLUE_WORDS);
        $this->setRandomBlackWords(SELF::HOM_MUCH_BLACK_WORDS);
    }

    public function getIssetWords()
    {
        return $this->agentsWords = $this->currentRoom->agents_words->all();
    }

    public function setCurrentRoom(int $id)
    {
        $this->currentRoom = AgentsRoom::where('id', $id)->first();
    }

    public function setRandomRedWords(int $howMuch): bool
    {
        return $this->setAttrToRandomWords($howMuch, 'setRed');
    }

    public function setRandomBlueWords(int $howMuch): bool
    {
        return $this->setAttrToRandomWords($howMuch, 'setBlue');
    }

    public function setRandomBlackWords(int $howMuch): bool
    {
        return $this->setAttrToRandomWords($howMuch, 'setBlack');
    }

    public function setAttrToRandomWords(int $howMuch, string $method)
    {
        $count = 0;
        if ($howMuch > 0) {
            while ($count < $howMuch) {
                $randomKey = rand(0, (count($this->agentsWords)-1));
                if ($this->agentsWords[$randomKey]->{$method}()) {
                    $count++;
                }
            }
        }
        if ($count == $howMuch) {
            return true;
        }

        return false;
    }

    public function generateWords(int $howMuch): void
    {
        $words = WordsHelper::getRandomWords($howMuch);
        foreach ($words as $word) {
            $agentsWord = new AgentsWord();
            $agentsWord->agents_room_id = $this->currentRoom->id;
            $agentsWord->word = $word;
            $agentsWord->save();
            $this->agentsWords[] = $agentsWord;
        }
    }
}
