<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\RegisterController;
// use App\Http\Controllers\LogosController;
// use App\Http\Controllers\ProfileController;

use App\Http\Controllers as Ctrlr;



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

/*
Route::get('/', function () {
    return 'Hogar sin locale';
}) ;
*/


/**
 * WARNING: IMPLICIT MODEL BINDING
 * The binding has to have the following parameters orders in the handler
 * 1st. the $lang prefix
 * after this, anythin.
 */
Route::group([
    'prefix' => '{locale?}',
    'where' => ['locale' => '[a-z]{2}'],
    'middleware' => ['setDefaultLocaleURL', 'setLocale']
], function() {
    Route::get('/', function (Request $request) {
        
        return view('welcome');
    })->name('landing');

    Route::get('home', function () {
     return Inertia::render('Welcome', [
         'msg' => 'Hola Gustavo',
     ]);
    })->name('home');

    Route::get('login', function () {
        return Inertia::render('Auth/Login');
    })->name('auth.login.show');

    Route::post('login', [Ctrlr\AuthController::class, 'authenticate'])
        ->name('auth.login');

    Route::get('logout', [Ctrlr\AuthController::class, 'logout'])
        ->name('auth.logout');

    Route::get('register', function () {
        return Inertia::render('Auth/Register', [
            'countries' => config('locale.countries'),
            'defLang' => config('locale.languages.default')
        ]);
    })->name('auth.register.show');

    Route::post('register', [Ctrlr\RegisterController::class, 'register'])
        ->name('auth.register');

    
    Route::get('profile/{user}', [Ctrlr\ProfileController::class, 'show'])
        ->name('profile.show');

    Route::get('profile/{user}/edit', [Ctrlr\ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::put('profile/{user}', [Ctrlr\ProfileController::class, 'update'])
        ->name('profile.update');


    Route::get('logos', [Ctrlr\LogosController::class, 'create'])
        ->name('logos.show');
    });

    



// Route::get('welcome/{locale}', function ($locale) {
//     if (! in_array($locale, ['en', 'es'])) {
//         abort(404);
//     }

//     App::setLocale($locale);
//     return Inertia::render('Welcome', [
//         'msg' => 'Hola Gustavo',
//     ]);

//     //
// });

// Route::get('/', function () {
//     App::setLocale('es');
//     return view('welcome');
// })->name('landing');

// Route::get('/login', function () {
//     return Inertia::render('Auth/Login');
// })->name('auth.login.show');

// Route::post('/login', [AuthController::class, 'authenticate'])
//     ->name('auth.login');
// Route::get('/logout', [AuthController::class, 'logout'])
//     ->name('auth.logout');

// Route::get('/register', function () {
//     return Inertia::render('Auth/Register');
// })->name('auth.register.show');

// Route::post('/register', [RegisterController::class, 'register'])
//     ->name('auth.register');

// Route::get('/home', function () {
//     return Inertia::render('Welcome', [
//         'msg' => 'Hola Gustavo',
//     ]);
// })->name('home');

// Route::get('/logos', [LogosController::class, 'create'])
//     ->name('logos.show');
