<?php

namespace App\Http\Controllers;

use App\Models\Agents\AgentsHelper;
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
        $agentsWords = $helper->getWords();

        return view('agents.room', compact('agentsWords'));   
    }
}
