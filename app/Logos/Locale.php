<?php

namespace App\Logos;
use Illuminate\Support\Facades\Route;


class Locale {

    public $langPattern = "/^[a-z]{2}$/";

    public $langsSupported;

    public function __construct() {
        $this->langsSupported = config('locale.languages.supported');
    }

    public function showRequest() {
        return request();
    }

    public function replaceLocaleURL(String $locale) {
        
        $parameters = Route::getCurrentRoute()->originalParameters();
        $parameters['locale'] = $locale;
        // ddd($parameters);
        $newLocaleRoute = url()->toRoute(request()->route(), $parameters, false);
        return $newLocaleRoute;
    }

    public function inURL () {
        $segment = request()->segment(1);
        return $this->isValid($segment) ? $segment : null;
    }

    public function isValid($locale) {
        return preg_match($this->langPattern, $locale) ? true : false;
    }

    public function supported($locale) {
        return in_array($locale, $this->langsSupported);
    }
}