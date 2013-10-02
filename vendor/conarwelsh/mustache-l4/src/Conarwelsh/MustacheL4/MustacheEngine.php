<?php
namespace Conarwelsh\MustacheL4;

use Illuminate\View\Engines\EngineInterface;
use Illuminate\Filesystem\Filesystem;
use Mustache_Engine;

class MustacheEngine implements EngineInterface {

	public function __construct(Filesystem $files)
	{
		$this->files = $files;
	}
	
	public function get($path, array $data = array())
	{
		$view = $this->files->get($path);
		$app = app();
		$m = new Mustache_Engine( $app['config']->get('mustache-l4::config') );
 
 		$data = array_map(function($item){
			return (is_object($item) && method_exists($item, 'toArray')) ? $item->toArray() : $item;
		}, $data);
 
		return $m->render($view, $data);
	}

}
