<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function store(Request $request)
    {
        // $data = $request->only('email', 'name', 'country', 'locale');
        $data = $request->validate([
            'email' => 'required', 
            'name' => 'required',
            'country' => 'required', 
            'language' => 'required'
            ]);
        
        $data['password'] = Hash::make($request->password);
        // dd($data);

        $user = User::create($data);
        Auth::login($user, true);
        
        return redirect()->route('home');
    }

    public function create($lang, User $user) {
        return Inertia::render('User/Register', [
            'countries' => config('locale.countries'),
            'defLang' => config('locale.languages.default')
        ]);
    }

    public function show($lang, User $user)
        {
            return Inertia::render('User/Show', [
                'user' => $user,
                'country' => config('locale.countries')[$user['country']]
            ]);
        }

    public function edit($lang, User $user) {
        
        return Inertia::render('User/Edit', [
            'countries' => config('locale.countries'),
        ]);
    }

    public function update($lang, User $user, Request $request) {
        $data = $request->validate([
            'name' =>  ['required', 'min:2', 'max:255'],
            'country' => ['required', 'size:2'],
            'language' => ['nullable', 'size:2']
            ]);        

        $languageChange = $data['language'] != $user->language;
        $user->update($data);

        if($languageChange && $request->inertia()) {
            return  response('', 409)
            ->header('X-Inertia-Location', url()->previous());
        } 

        return back();
    }
}
