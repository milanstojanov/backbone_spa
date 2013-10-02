<?php

App::bind('IdeaRepositoryInterface', 'EloquentIdeaRepository');
App::bind('CommentRepositoryInterface', 'EloquentCommentRepository');
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::group(array('prefix' => 'v1'), function() {
	Route::resource('ideas', 'V1\IdeasController');
	Route::resource('ideas.comments', 'V1\IdeasCommentsController');
});

Route::get('/', function() {
	return View::make('application');
});
