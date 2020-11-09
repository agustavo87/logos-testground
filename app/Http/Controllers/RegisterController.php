<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // $data = $request->only('email', 'name', 'country', 'locale');
        $data = $request->validate([
            'email' => 'required', 
            'name' => 'required',
            'country' => 'required', 
            'locale' => 'required'
            ]);
        
        $data['password'] = Hash::make($request->password);
        // dd($data);

        $user = User::create($data);
        Auth::login($user, true);
        
        return redirect()->route('home');
    }
}
