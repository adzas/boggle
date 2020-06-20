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
//Route::get('/reactHome', 'HomeController@reactHome');
Route::get('/', 'HomeController@reactHome');
Route::get('/reactRoom/{id}', 'HomeController@reactRoom');
//Route::get('/', 'HomeController@index');
//Route::get('/room/{id}', 'HomeController@room')->name('room');
Route::get('/generateLettersArray/{id}', 'RoomController@generateLettersArray');
Route::get('/generate', 'RoomController@generate');
Route::get('/checkLogin', 'RoomController@checkLogin');
Route::get('/checkLettersArray', 'RoomController@checkLettersArray');
Route::get('/getPlayers', 'RoomController@getPlayers');
//Route::get('/login', 'RoomController@login');
Route::post('/login', 'RoomController@login');
Route::post('/saveWords', 'RoomController@saveWords');
Route::get('/resetRoom', 'RoomController@resetRoom');
Route::get('/checkDictionary', 'CheckController@checkDictionary');

//Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
