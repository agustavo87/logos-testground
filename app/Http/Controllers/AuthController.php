<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{

    /**
     * Show login page
     * 
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function show(Request $request)
    {
        return Inertia::render('User/Login');
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function authenticate(Request $request)
    {
         $credentials = $request->validate([
             'email' => 'required|email',
             'password' => 'required'
         ]);

        $remember = $request->has('remember') ? true : false;

        if (Auth::attempt($credentials, $remember)) {
            if($request->inertia()) {
                return response('', 409)
                    ->header('X-Inertia-Location', route('home'));
            }
            return redirect()->route('home');
        } 

        
        return back()->withInput()
                    ->with('auth-error', __('auth.failed'));

    }

    /**
     * Handle an logout.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function logout(Request $request)
    {
        Auth::logout();
        if($request->inertia()) {
            return response('', 409)
                ->header('X-Inertia-Location', route('home'));
        }
        return redirect()->route('home');
    }

    
}
