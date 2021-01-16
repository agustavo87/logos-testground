<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\{
    AuthController,
    UserController,
    LogosController,
    LocaleController,
    UserSourceController
};
use App\Http\Resources\SourceCollection;
use App\Http\Resources\SourceResource;
use App\Models\{
    Source,
    User
};

use Illuminate\Support\Facades\DB;

/**
 * WARNING: IMPLICIT MODEL BINDING
 * The binding has to have the following parameters orders in the handler
 * 1st. the $lang prefix
 * after this, anything.
 */

Route::group([
    'prefix' => '{locale?}',
    'where' => ['locale' => '[a-z]{2}'],
    'middleware' => ['setDefaultLocaleURL', 'setLocale']
], function () {

    Route::get('/', function (Request $request) {
        return view('landing');
    })->name('landing');

    Route::get('home', function () {
        return Inertia::render('Welcome', [
         'msg' => 'Hola Gustavo',
        ]);
    })->name('home');


    Route::get('login', [AuthController::class, 'show'])
        ->name('auth.show');

    Route::post('login', [AuthController::class, 'authenticate'])
        ->name('auth.login');

    Route::get('logout', [AuthController::class, 'logout'])
        ->name('auth.logout');


    Route::name('user.')->group(function () {
        Route::get('user/register', [UserController::class, 'create'])
        ->name('register.show');

        Route::post('user', [UserController::class, 'store'])
            ->name('register');

        Route::get('user/{user}', [UserController::class, 'show'])
            ->name('show');

        Route::get('user/{user}/edit', [UserController::class, 'edit'])
            ->name('edit');

        Route::put('user/{user}', [UserController::class, 'update'])
            ->name('update');
    });

    Route::group([
        'prefix' => 'token',
        'name' => 'token.'
    ], function () { 
        Route::get('create', function (Request $request) {
            return 'hola';
        });
    });

    Route::get('logos', [LogosController::class, 'create'])
        ->name('logos.show');
});

Route::get('stage/{experiment?}', function (Request $request, $experiment = null) {
    $prefix = $experiment ? 'Experiments/' : 'Staging';
    return Inertia::render($prefix . $experiment, [
        'request' => $request,
    ]);
});

Route::put('/locale', [LocaleController::class, 'update'])->name('locale');




Route::get('/test/source/{source:key}', function (Request $request, Source $source) {
    return new SourceResource($source);
});

Route::group([
    'prefix' => 'xhr',
], function () {
    Route::apiResource('users.sources', UserSourceController::class)->scoped([
        'source' => 'key'
    ])->middleware('auth'); // ver que significa auth:api
});

Route::get('/test/user/{user}/sources', function (Request $request, User $user) {

    $sources_paginated = DB::table('sources')->where('user_id', $user->id)->paginate(2);

    // return (new SourceCollection($sources_paginated, $user))
    return (new SourceCollection($sources_paginated, $user))
        ->response()
        ->header('X-Tu-Mama', 'Me mima');
})->name('test.user.sources');