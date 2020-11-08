<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', 'HomeController@reactHome');
Route::get('/{id}', 'HomeController@room');

Route::get('/checkLogin', 'CheckController@checkLogin');
Route::get('/checkDictionary', 'CheckController@checkDictionary');

Route::get('/getPlayers', 'RoomController@getPlayers');
Route::get('/generateLettersArray', 'RoomController@generateLettersArray');
Route::get('/resetRoom', 'RoomController@resetRoom');

Route::post('/login', 'RoomController@login');
Route::post('/saveWords', 'RoomController@saveWords');
