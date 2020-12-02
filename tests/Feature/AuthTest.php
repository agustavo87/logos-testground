<?php

namespace Tests\Feature;

use Tests\FixturableTestCase as TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthTest extends TestCase
{
    protected static $userId;
    public static bool $verbose = true;
    public static bool $debug = true;
    public static $password = "password";
    public static $language = 'es';
    

    protected User $user;
    

    protected static function beforeAll(): void
    {
        self::$userId = User::factory()->create([
            'password' => Hash::make(self::$password),
            'language' => self::$language
        ])->id;
    }

    protected static function afterAll(): void
    {
        User::find(self::$userId)->delete();
    }

    public function beforeEach(): void
    {
        $this->user = User::find(self::$userId);
    }

    /**
     * The the correct login
     */
    public function testLogin()
    {
        $ruta = route('auth.login', self::$language);
        $this->log($ruta);
        $response = $this->post($ruta, [
            'email' => $this->user->email,
            'password' => self::$password
        ]);

        $this->log($response->getStatusCode());
        $newLocation = $response->headers->all()['location'][0];
        $this->log($newLocation);
        $response->assertRedirect(route('home'));
        $response->dumpHeaders();
        $response->dumpSession();
    }

    /**
     * The test work.
     */
    public function testReturnsErrorOnFailedLogin()
    {
        $ruta = route('auth.login', self::$language);
        $this->log($ruta);
        $response = $this->post($ruta, [
            'email' => $this->user->email,
            'password' => 'wrongpassword'
        ]);

        $this->log($response->getStatusCode());
        $newLocation = $response->headers->all()['location'][0];
        $this->log($newLocation);
        // $response->assertRedirect(route('home'));
        $response->dumpHeaders();
        $response->dumpSession();
    }

}