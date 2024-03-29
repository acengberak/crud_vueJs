<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'Auth\LoginController@login');

Route::group(['middleware' => 'auth:api'], function () {
    Route::resource('/couriers','API\UserController')->except(['create','show','update']);
    Route::post('/couriers/{id}','API\UserController@update')->name('couriers.update');
    Route::resource('/outlets', 'API\OutletController')->except(['show']);
});
