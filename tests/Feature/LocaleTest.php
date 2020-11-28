<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Arr;
use Tests\FixturableTestCase as TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;

class LocaleTest extends TestCase
{
    protected static string $languageA = 'es';
    protected static string $languageB = 'en';
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
        self::$userId = User::factory()->create([
            'language' => self::$languageA
        ])->id;
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
    }

    /**
     * Actualiza el Lenguaje del usuario mediante una solicitud JSON.
     *
     * @return void
     */
    public function testUpdatesUserLanguageByJson(): void
    {
        $this->assertEquals(
            $this->user->language,
            self::$languageA
        );

        $response = $this->actingAs($this->user)
                         ->putJson("/locale", [
                             'language' => self::$languageB
                         ]);

        $this->assertEquals(self::$languageB, App::getLocale());

        $response->assertStatus(200);
        $response->assertJson([
            'language' => self::$languageB,
        ]);

        $this->assertEquals(
            $this->user->language,
            self::$languageB
        );
    }

    /**
     * The validators are callable.
     *
     * @return void
     */
    public function testValidatorsAreCallable(): void
    {
        $locale = $this->app->make('locale');
        $this->assertTrue(is_callable([$locale, 'validateValidLanguage']));
        $this->assertTrue(is_callable([$locale, 'validateSupportedLanguage']));
    }

    /**
     * Valida que el lenguaje tenga un formato válido y/o sea soportado por
     * la aplicación.
     *
     * @return void
     */
    public function testValidatesLanguageFormatAndSupport(): void
    {
        $invalidLanguage = "a2";
        $unsupportedLanguage = "fr";

        // Invalid language
        $response = $this->actingAs($this->user)
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
        $response = $this->actingAs($this->user)
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
    public function testRedirectsToSettedLanguageUri(): void
    {
        $language = $this->user->language;

        $response = $this->actingAs($this->user)
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
