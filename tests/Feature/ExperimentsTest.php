<?php

namespace Tests\Feature;

use App\Models\{
    Source,
    User
};
use Tests\FixturableTestCase as TestCase;

class ExperimentsTest extends TestCase
{

    public static bool $verbose = true;
    public static bool $debug = true;


    public function testRequest()
    {
        $response = $this->get('/');
        $response->assertStatus(302);
    }

    public function testSourceResource()
    {
        $source = Source::all()->random();

        $response = $this->get("/test/source/{$source->key}");
        $response->dump();
        // $response->assertOk();
    }

    public function testUserSourcesCollection()
    {
        $user = User::all()->random();

        $response = $this->get("/test/user/{$user->id}/sources");
        $response->dump();
        $response->assertOk();
    }

}
