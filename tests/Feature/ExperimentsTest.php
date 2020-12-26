<?php

namespace Tests\Feature;


use Tests\FixturableTestCase as TestCase;
use Illuminate\Routing\Router;

class ExperimentsTest extends TestCase
{

    public static bool $verbose = false;
    public static bool $debug = false;
    
    public Router $router;
    public function beforeEach(): void
    {
        $this->router = $this->app->make('router');
    }

    public function testLogs() 
    {
        $this->ok('todo viento');
        $routeCollection = $this->router->getRoutes();
        // var_dump($routeCollection->getRoutesByName());
    }

    public function testRequest()
    {
        $request = $this->get('/');
        $this->ok('tudo bom');
    }

}
