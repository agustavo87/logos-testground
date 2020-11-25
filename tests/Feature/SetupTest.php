<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class SetupTest extends TestCase
{
    // protected static $sApp = null;
    protected static $lastInstance = null;
    protected static bool $destroy = false;

    public static $initialized = false;

    public static $userId;


    protected static function beforeAll() {
        fwrite(STDOUT, __METHOD__ . "\n");
        self::$userId = User::factory()->create()->id;
    }

    protected function setUp(): void
    {
        
        if(self::$lastInstance !== null) {
            self::destroyApp(); //se cierra la instancia anterior para crear una nueva
        }
        $this->app = $this->app ?? $this->createApplication(); //debería ser null

        parent::setUp(); // al estar app establecida la ignora
        if(!self::$initialized) {
            self::$initialized = true;
            self::beforeAll();
        }
        $this->beforeEach();
    }

    public function beforeEach()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
    }

    protected function tearDown(): void
    {
        if(self::$destroy) {
            parent::tearDown();
        } else {
            $this->afterEach();
            self::$lastInstance = $this;
        }
       
    }

    public function afterEach()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
    }

    public static function tearDownAfterClass(): void
    {
        // podemos hacer algunas limpiezas finales antes de terminar
        // aún esta la app abierta.

        self::afterAll();

        self::destroyApp();
    }

    protected static function afterAll()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        $user = User::find(self::$userId);
        $user->delete();
    }

    protected static function destroyApp()
    {
        if (self::$lastInstance !== null)  {
            self::$destroy = true;
            self::$lastInstance->tearDown();
            self::$destroy = false;
        }
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testChangeName()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        $user = User::find(self::$userId);
        $user->name = "Juan";
        $user->save();
        var_dump($user->name);
    }


    public function testSameName()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        $user = User::find(self::$userId);
        var_dump($user->name);
    }
}
