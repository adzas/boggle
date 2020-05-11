<?php

namespace App\Http\Controllers;

use App\Room;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $rooms = Room::all();
        return view('welcome')->with('rooms', $rooms);
    }

    public function room($id)
    {
        $room = Room::find($id);
        return view('room')->with('room', $room);
    }


    public function reactHome()
    {
        return view('home');
    }
}
