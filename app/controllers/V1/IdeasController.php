<?php
namespace V1;
 
use BaseController;
use IdeaRepositoryInterface;
use Input;
use View;
use Carbon\Carbon;
use Cookie; 
use Response;
class IdeasController extends BaseController {

	const NEW_IDEA = 1;
	
	public function __construct(IdeaRepositoryInterface $ideas) {
		$this->ideas = $ideas;
	}

	public function index() {	
        return $this->ideas->findAll();
	}

	public function store() {

		$input = Input::all();

		return $this->ideas->store( array(
			'title' => $input['title'],
			'description' => $input['description'],
			'created_at' => Carbon::now(),
			'votes' => 0,
			'author_id' => 5,
			'status_id' => self::NEW_IDEA // for now :)
		));
	}
	
	public function update($id)
	{
		$cookieClient = unserialize(Cookie::get('voted'));
		$votedIdeas = ($cookieClient) ? $cookieClient : array();
		if(in_array($id, $votedIdeas)) {
			return Response::json(array(
		        'error' => true,
		        'message' => 'You have already voted for this'),
		        200
    		); 
		}

		if($this->ideas->update($id, Input::get('votes'))) {
			$votedIdeas[] = $id;
			$cookie = Cookie::make('voted', serialize($votedIdeas));
			return Response::make()->withCookie($cookie);
		}		
	}

}
