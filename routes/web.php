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

Route::get('/checkLogin', 'CheckController@checkLogin');
Route::get('/check-word/{word}', 'CheckController@checkWord');

Route::get('/getPlayers', 'RoomController@getPlayers');
Route::get('/generate-letters', 'RoomController@generateLettersArray');

Route::get('/room/{id}', 'HomeController@room');
Route::get('/resetRoom', 'RoomController@resetRoom');

Route::get('/szefler/{id}', 'HomeController@szefler');

Route::get('/tajniacy', 'AgentsController@index');
Route::get('/tajniacy/{id}', 'AgentsController@room');

Route::get('/logout', 'RoomController@logout');
Route::post('/login', 'RoomController@login');
Route::post('/check-words', 'CheckController@checkDictionary');
Route::post('/saveWords', 'RoomController@saveWords');

Route::get('/get-password-words/{howMuch}', 'WordController@getPasswordWords');
