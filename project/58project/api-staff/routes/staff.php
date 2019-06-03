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
Route::group(['prefix' => 'staff'], function () {
    
    Route::post('/register', 'LoginController@register');

    Route::post('/login', 'LoginController@login');
});

Route::group(['prefix' => 'staff','middleware' => 'staff'], function () {
    Route::get('/haha', function () {
        return "hahaha";
    });
});

