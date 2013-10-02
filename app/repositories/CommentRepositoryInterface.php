<?php
 
interface CommentRepositoryInterface {

	public function findAll($post_id);
	public function store($post_id, $data);
	public function validate($data);
	public function instance();
	

}