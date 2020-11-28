<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Arr;
use Tests\FixturableTestCase as TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Route;

class LocaleTest extends TestCase
{
    protected static string $languageA = 'es';
    protected static string $languageB = 'en';
    protected static $userId;
    public static bool $verbose = true;
    public static bool $debug = true;


    protected static function beforeAll()
    {
        self::$userId = User::factory()->create([
            'language' => self::$languageA
        ])->id;
    }

    protected static function afterAll()
    {
        User::find(self::$userId)->delete();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLocaleUpdate()
    {
        $user = User::find(self::$userId);

        $this->assertEquals(
            $user->language,
            self::$languageA
        );

        $response = $this->actingAs($user)
                         ->putJson("/locale", [
                             'language' => self::$languageB
                         ]);


        $response->assertStatus(200);
        $response->assertJson([
            'language' => self::$languageB,
        ]);

        $this->assertEquals(
            $user->language,
            self::$languageB
        );
    }

    public function testRedirectToLocale()
    {
        $user = User::find(self::$userId);
        $language = $user->language;

        $response = $this->actingAs($user)
                         ->get('/');

        $response->assertRedirect();
        $response->assertLocation('/' . $language);
    }

    public function testIdentificaLenguageEnUri()
    {
        $testLanguage = 'es';
        $response = $this->get('/' . $testLanguage);

        $locale = $this->app->make('locale');
        $URL_Language = $locale->inURL();
        $this->assertEquals($URL_Language, $testLanguage);
    }

    public function testRemplazaLenguajeEnUri()
    {
        $originalLanguage = 'es';
        $replaceLanguage = 'en';
        $originalRoute = route('home', ['locale' => $originalLanguage], false);
        $this->log($originalRoute);
        $response = $this->get($originalRoute);


        $locale = $this->app->make('locale');
        $newRoute = $locale->replaceLocaleURL($replaceLanguage);
        $this->log($newRoute);
        $this->assertNotEquals($originalRoute, $newRoute);

        $segments = explode('/', $newRoute);
        $segments = array_values(array_filter($segments, function ($value) {
            return $value !== '';
        }));
        $lenguajeEnNuevaRuta = $segments[0];
        $this->assertEquals($replaceLanguage, $lenguajeEnNuevaRuta);
    }
}
