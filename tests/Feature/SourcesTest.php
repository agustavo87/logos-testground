<?php

namespace Tests\Feature;

use Tests\FixturableTestCase as TestCase;
use App\Models\User;

class SourcesTest extends TestCase
{

    protected static $userId;
    public static bool $verbose = true;
    public static bool $debug = true;

    protected User $user;

    /**
     * Crea un modelo de usuario para ser usado en los tests.
     *
     * @return void
     */
    protected static function beforeAll(): void
    {
        self::$userId = User::factory()->create()->id;
        \Illuminate\Testing\TestResponse::macro('getStatusText', function () {
            return \Illuminate\Http\Response::$statusTexts[$this->getStatusCode()];
        });
    }

    /**
     * Limpia la BD del modelo de usuario creado.
     *
     * @return void
     */
    protected static function afterAll(): void
    {
        User::find(self::$userId)->delete();
    }

    /**
     * Obtiene el usuario y lo guarda para uso posterior.
     *
     * @return void
     */
    public function beforeEach(): void
    {
        $this->user = User::find(self::$userId);
        // $this->locale = $this->app->make('locale');
    }

    /**
     * Logs Status.
     * 
     * Depends on
     * - getStatusText macro
     * - LogsInformation trait
     * @param \Illuminate\Testing\TestResponse $response
     * @param int $expected 
     *
     * @return string
     */
    public function logStatus($response, int $expected = 200): void {

        $statusCode = $response->getStatusCode();
        $this->log("$statusCode: {$response->getStatusText()}", $statusCode == $expected);
    }

    /**
     * Error on un-auntheticated attemp.
     *
     * @return void
     */
    public function test_return_error_on_post_a_source_unauthenticated() 
    {
        $key = 'gus2020';
        $data = 'Gustavo, A. (2020). El ocaso del menemismo amarillo. Viñeta2: Buenos Aires.';
        $response = $this
            // ->actingAs($this->user)
            ->postJson("/users/{$this->user->id}/sources", [
                'key' => $key,
                'data' => $data
        ]);

        
        $this->logStatus($response, 401);

        $response
            ->assertStatus(401); // UnAuthorized.

    }


    /**
     * Post a source.
     *
     * @return string
     */
    public function test_posts_a_source(): string
    {
        $key = 'gus2020';
        $data = 'Gustavo, A. (2020). El ocaso del menemismo amarillo. Viñeta2: Buenos Aires.';
        $response = $this
            ->actingAs($this->user)
            ->postJson("/users/{$this->user->id}/sources", [
                'key' => $key,
                'data' => $data
        ]);

        
        $this->logStatus($response, 201);

        $response
            ->assertStatus(201) // created.
            ->assertJson([
                'key' => $key,
                'data' => $data,
                'user_id' => $this->user->id
            ]);

        return $key;

    }

    /**
     * Get a source data.
     * @depends test_posts_a_source
     * @param string $key
     * @return string
     */
    public function test_gets_a_source(string $key): string
    {
        // $key = 'gus2020';
        $response = $this
            ->actingAs($this->user)
            ->getJson("/users/{$this->user->id}/sources/$key");

        
        $this->logStatus($response, 200);

        $response
            ->assertStatus(200) // ok
            ->assertJson([
                'key' => $key,
                'user_id' => $this->user->id
            ]);

        return $key;

    }

    /**
     * Updates a source data.
     * @depends test_gets_a_source
     * @param string $key
     * @return string
     */
    public function test_updates_a_source(string $key): string
    {
        $newData = "Gustavo, A. (2021). El resultado siniestro. Arkadia: Buenos Aires.";
        $response = $this
            ->actingAs($this->user)
            ->putJson("/users/{$this->user->id}/sources/$key", [
                'data' => $newData
            ]);
        $this->logStatus($response, 200);

        $response
        ->assertStatus(200) // ok
        ->assertJson([
            'key' => $key,
            'user_id' => $this->user->id,
            'data' => $newData
        ]);

        $this->assertSame($this->user->sources[0]->data, $newData);

        return $key;
    }

    /**
     * Deletes a source data.
     * @depends test_updates_a_source
     * @param string $key
     * @return string
     */
    public function test_deletes_a_source(string $key): string
    {
        $this->assertTrue($this->user->sources->contains('key', $key));
        $response = $this
            ->actingAs($this->user)
            ->deleteJson("/users/{$this->user->id}/sources/$key");

        $this->logStatus($response, 200);
        $response
        ->assertStatus(200); // ok
        $this->user->refresh();
        $this->assertFalse($this->user->sources->contains('key', $key));

        return $key;
    }

    /**
     * Get a source data.
     * @depends test_updates_a_source
     * @param string $key
     * @return string
     */
    public function test_index_sources(string $key): string
    {
        return $key;
    }

}
