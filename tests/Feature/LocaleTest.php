<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Arr;
use Tests\TestCase;
use App\Models\User;

class LocaleTest extends TestCase
{
    protected static string $languageA = 'es';
    protected static string $languageB = 'en';
    protected static bool $initialized = false;
    private User $user;
    private static User $staticUser;

    private function beforeAll()
    {
        $this->user = User::factory()->create([
            'language' => self::$languageA
        ]);

        self::$staticUser = $this->user;
    }

    protected function setUp(): void 
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        parent::setUp();
        if (!self::$initialized) {
            self::$initialized = true;
            $this->beforeAll();
        }
        $this->beforeEach();
    }

    protected function beforeEach()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
    }

    public static function tearDownAfterClass(): void
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        self::$staticUser->delete();
    }

    protected function tearDown(): void 
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        // $this->user->delete();
        parent::tearDown();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLocaleUpdate()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        $this->assertEquals(
            $this->user->language,
            self::$languageA
        );
       
        $response = $this->actingAs($this->user)
                         ->putJson("/locale", [
                             'language' => self::$languageB
                         ]);

        var_dump($response->baseResponse->status());

        $response->assertStatus(200);
        $response->assertJson([
            'language' => self::$languageB,
        ]);

        $this->assertEquals(
            $this->user->language,
            self::$languageB
        );
    }

}
