<?php

class EloquentIdeaRepository implements IdeaRepositoryInterface {

    public function findById($id) {

        $idea = Idea::with(
            array(
                'comments' => function($q) {
                $q->orderBy('created_at', 'desc');
            })
        )->where('id', $id)->first();

        if(!$idea) 
            throw new NotFoundException('Idea Not Found');
        return $idea;
    }

    public function findAll() {
    
        return Idea::orderBy('created_at', 'desc')->get();
    }

    public function store($data) {
    
        $this->validate($data);
        return Idea::create($data);
    }

    public function update($id, $votes) {
    
        $idea = $this->findById($id);
        $idea->votes = $votes;
        $idea->save();
        return $idea;
    }

    public function validate($data) {
    
        $validator = Validator::make($data, Idea::$rules);
        if($validator->fails()) throw new ValidationException($validator);
        return true;
    }

    public function instance($data = array()) {    
        return new Idea($data);
    }

}