<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\FixturableTestCase as TestCase;
use App\Models\User;

class SetupTest extends TestCase
{
    public static $userId;
    public static $newName ="Juan";
    public static $name = "Gustavo";

    protected static function beforeAll() {
        fwrite(STDOUT, __METHOD__ . "\n");
        self::$userId = User::factory()->create([
            'name' => self::$name
        ])->id;
    }

    public function beforeEach()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
    }

    public function afterEach()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
    }

    protected static function afterAll()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        $user = User::find(self::$userId);
        $user->delete();
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
        $user->name = self::$newName;
        $user->save();
        $this->log($user->name);
    }

    public function testSameName()
    {
        fwrite(STDOUT, __METHOD__ . "\n");
        $user = User::find(self::$userId);
        $this->log($user->name);
    }
}
