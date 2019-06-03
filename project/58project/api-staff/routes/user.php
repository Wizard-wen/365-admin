<?php

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

Route::group(['prefix' => 'user'], function () {
    
    Route::post('/register', 'LoginController@register');

    Route::post('/login', 'LoginController@login');
});

Route::group(['prefix' => 'user','middleware' => 'user'], function () {
    Route::get('/haha', function () {
        // send_msg_json(12345,"hahhah");
        return "hahaha";
    });
});
