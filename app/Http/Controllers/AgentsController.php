<?php

namespace App\Http\Controllers;

use App\Models\Agents\AgentsHelper;
use App\Models\Agents\AgentsRoom;
use App\Models\AgentsWord;
use Illuminate\Http\Request;

class AgentsController extends Controller
{
    public function index()
    {
        $helper = new AgentsHelper();
        $agentsRoom = $helper->getRooms();

        return view('agents.index', compact('agentsRoom'));
    }

    public function room(int $id)
    {
        $helper = new AgentsHelper();
        $agentsWords = $helper->getWords($id);

        return view('agents.room', compact('agentsWords', 'id'));
    }

    public function roomBoss(int $id)
    {
        $helper = new AgentsHelper();
        $agentsWords = $helper->getWords($id);

        return view('agents.room_boss', compact('agentsWords'));
    }

    public function roomWordsReset(int $id)
    {
        $agentsRoom = AgentsRoom::where('id', $id)->first();
        $agentsRoom->resetWords();

        return redirect('/tajniacy/'.$id.'/boss');
    }

    public function roomSettingsReset(int $id)
    {
        $helper = new AgentsHelper();
        $helper->resetSettings($id);

        return redirect('/tajniacy/'.$id.'/boss');
    }

    public function roomCheckWord(int $id, int $word_id)
    {
        $AgentsWord = AgentsWord::where('id', $word_id)->first();

        return $AgentsWord->getBackground();
    }
}
