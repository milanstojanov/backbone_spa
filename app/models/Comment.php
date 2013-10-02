<?php

class Comment extends Eloquent {

	protected $guarded = array();

	public static $rules = array();
	public $timestamps = false;
	
	public function idea() {	
		return $this->belongsTo('Idea');
	}
}
