<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function authenticate(Request $request)
    {
        /**
         * Falta validación
         */

         $credentials = $request->validate([
             'email' => 'required|email',
             'password' => 'required'
         ]);

        // $credentials = $request->only('email', 'password');

        if ($request->has('remember')) {
            $remember = (Bool)$request->remember;
        }

        // dd($credentials);


        if (Auth::attempt($credentials, $remember)) {
            // Authentication passed...
            // return redirect()->intended('dashboard');
            return redirect()->route('home');
        } 
        return response([
            'resultado' => 'conexión fallida',
            'credenciales' => $credentials
            ]);

    }

    /**
     * Handle an logout.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function logout()
    {
        Auth::logout();
        return redirect()->route('home');
    }

    
}
