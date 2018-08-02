<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Route::get('/app/creditPay/{page}', function ($page) {
//     return view('creditPay'.$page);
// });
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/



Route::get('/test', function () {
    return view('test');
});

Route::group(['middleware' => ['web']], function () {
    //
});

/*Route::group(['prefix' => 'api/v1'], function(){
    Route::resource('jokes', 'JokesController');
});*/

Route::group(['']], function () {

    Route::resource('', '');

    //Route::post('users/{id}/updateUser'				, 'UsersController@updateUser');
});

Route::group(['']], function () {
    
});

Route::group(['prefix' => 'api/v1'], function () {

    


    

});


