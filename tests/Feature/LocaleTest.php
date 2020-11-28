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

    protected static function beforeAll(): void
    {
        self::$userId = User::factory()->create([
            'language' => self::$languageA
        ])->id;
    }

    protected static function afterAll(): void
    {
        User::find(self::$userId)->delete();
    }

    /**
     * Actualiza el Lenguaje del usuario mediante una solicitud JSON.
     *
     * @return void
     */
    public function testLocaleUpdate(): void
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

    public function testValidatorsAreCallables(): void
    {
        $locale = $this->app->make('locale');
        $this->assertTrue(is_callable([$locale, 'validateValidLanguage']));
        $this->assertTrue(is_callable([$locale, 'validateSupportedLanguage']));
    }

    public function testValidateLocaleChangeRequest(): void    
    {
        $invalidLanguage = "a2";
        $unsupportedLanguage = "fr";
        $user = User::find(self::$userId);

        // Invalid language
        $response = $this->actingAs($user)
                         ->putJson("/locale", [
                             'language' => $invalidLanguage
                         ]);
        $content = json_decode($response->content());
        $this->log($content);
        $this->assertObjectHasAttribute('errors', $content);
        $this->assertObjectHasAttribute('language', $content->errors);
        $this->log($content->errors->language);
        $this->assertEquals($content->errors->language[0], __('validation.language_valid'));

        // Unsupported language
        $response = $this->actingAs($user)
                         ->putJson("/locale", [
                             'language' => $unsupportedLanguage
                         ]);
        $content = json_decode($response->content());
        $this->log($content);
        $this->assertObjectHasAttribute('errors', $content);
        $this->assertObjectHasAttribute('language', $content->errors);
        $this->log($content->errors->language);
        $this->assertEquals($content->errors->language[0], __('validation.language_supported'));
    }



    /**
     * El usuario es redireccionado de acuerdo a su lenguaje configurado.
     *
     * @return void
     */
    public function testRedirectToLocale(): void
    {
        $user = User::find(self::$userId);
        $language = $user->language;

        $response = $this->actingAs($user)
                         ->get('/');

        $response->assertRedirect();
        $response->assertLocation('/' . $language);
    }

    /**
     * Obtiene el lenguaje en la URI.
     *
     * @return void
     */
    public function testIdentificaLenguageEnUri(): void
    {
        $testLanguage = 'es';
        $response = $this->get('/' . $testLanguage);

        $locale = $this->app->make('locale');
        $URL_Language = $locale->inURL();
        $this->assertEquals($URL_Language, $testLanguage);
    }

    /**
     * Reemplaza el lenguaje en la URI.
     *
     * @return void
     */
    public function testRemplazaLenguajeEnUri(): void
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
