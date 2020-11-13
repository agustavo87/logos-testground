<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class ProfileController extends Controller
{
    public function show($lang, User $user)
        {
            return Inertia::render('Profile/Show', [
                'user' => $user,
                'country' => config('locale.countries')[$user['country']]
            ]);
        }

    public function edit($lang, User $user) {
        
        return Inertia::render('Profile/Edit', [
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
