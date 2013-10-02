<?php
 
interface IdeaRepositoryInterface {

	public function findById($id);
	public function findAll();
	public function store($data);
	public function update($id, $data);
	public function validate($data);
	public function instance();
	
}