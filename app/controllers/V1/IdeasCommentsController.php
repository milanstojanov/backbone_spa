<?php

namespace V1;
 
use BaseController;
use CommentRepositoryInterface;
use Input;
use View;

class IdeasCommentsController extends BaseController {

	public function __construct(CommentRepositoryInterface $comments) {
		$this->comments = $comments;
	}

	public function index($idea_id) {
        return $this->comments->findAll($idea_id);
	}

	public function store($idea_id) {	
		return $this->comments->store( $idea_id, Input::all() );
	}
}
