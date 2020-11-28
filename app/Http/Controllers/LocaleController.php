<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Logos\Locale;

class LocaleController extends Controller
{
    protected Locale $locale;

    public function __construct(Locale $locale)
    {
        $this->locale = $locale;
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            "language" => ["bail", "required", 'language_valid', 'language_supported']
        ]);

        if (Auth::check()) {
            $user = Auth::user();
            $user->language = $data['language'];
            $user->save();
        }


        return response()->json([
            'language' => $user->language
        ]);
    }
}
