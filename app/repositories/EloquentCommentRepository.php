<?php
 
class EloquentCommentRepository implements CommentRepositoryInterface {

 
    public function findAll($idea_id) {  

        return Comment::where('idea_id', $idea_id)
            ->orderBy('created_at', 'desc')
            ->get();
    }
 
    public function store($idea_id, $data) {

        $data['idea_id'] = $idea_id;
        $this->validate($data);
        return Comment::create($data);
    }

    public function validate($data) {

        $validator = Validator::make($data, Comment::$rules);
        if($validator->fails()) 
            throw new ValidationException($validator);
        return true;
    }

    public function instance($data = array()) {
        
        return new Comment($data);
    }
 
}