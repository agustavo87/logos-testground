<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->only('email', 'name');
        $data['password'] = Hash::make($request->password);
        // dd($data);
        User::create($data);
        return redirect('/login');
    }
}
