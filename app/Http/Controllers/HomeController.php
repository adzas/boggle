<?php

namespace App\Http\Controllers;

use App\Room;

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


    public function room($id)
    {
        $room = Room::find($id);
        $app_url = Url('/');
        return view('room')->with(['room' => $room, 'app_url' => $app_url]);
    }


    public function reactHome()
    {
        return view('home');
    }
}
