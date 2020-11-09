<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Support\DeferrableProvider;
use App\Logos\Locale;
use Illuminate\Http\Request;

class LocaleServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Locale::class, function ($app) {
            return new Locale;
        });

        $this->app->alias(Locale::class, 'locale');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [Locale::class, 'locale'];
    }
}
