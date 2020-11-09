<?php

namespace App\Logos;


class Locale {

    public $langPattern = "/^[a-z]{2}$/";

    public $langsSupported;

    public function __construct() {
        $this->langsSupported = config('locale.langs.supported');
    }

    public function showRequest() {
        return request();
    }

    public function replaceLocaleURL(String $locale) {
        $newLocaleRoute = url()->toRoute(request()->route(), ['locale' => $locale], false);
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