<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use App\Logos\Locale;
use App\Utils;

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

        App::setLocale($data['language']);

        $previous = url()->previous();
        $previous = Utils::path($previous);
        $previous = $this->locale->replaceLanguageInPath($previous, $data['language']);
        $previous = url($previous);


        if ($request->isJson()) {
            return response()->json([
                'language' => $user->language,
                'redirect' => $previous
            ]);
        }

        return redirect($previous)->with('language', $user->language);
    }
}
