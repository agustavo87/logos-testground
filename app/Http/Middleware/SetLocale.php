<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Logos\Locale;

class SetLocale
{

    public $locale;

    public function __construct(Locale $locale)
    {
        $this->locale = $locale;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $uriLocale = $this->locale->inURL();

        if (Auth::check()) {
            $locale = Auth::user()->language;
            if ($locale != $uriLocale) {
                return redirect($this->locale->replaceLocaleURL($locale));
            }
        } else {
            if (!$this->locale->supported($uriLocale)) {
                return redirect($this->locale->replaceLocaleURL(config('locale.languages.default')));
            }
            $locale = $uriLocale;
        }

        app()->setLocale($locale);
        return $next($request);
    }
}
