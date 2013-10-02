<?php

class Idea extends Eloquent {
	
	protected $guarded = array();
	public $timestamps = false;

	
	public static $rules = array(
		'title'    => 'required',
		'description' => 'required',
		'author_id' => 'required',
	);

	public function comments()
	{
		return $this->hasMany('Comment');
	}

	public function user() 
	{
		return $this->belongsTo('User');
	}
}
