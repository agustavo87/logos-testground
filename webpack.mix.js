const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    // .styles('resources/css/app.css', 'public/css/app.css')
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss'),
    ])
    .options({
        postCss: [
            require('postcss-import'),
            require('tailwindcss'),
        ]
    })
    .sourceMaps()
    .browserSync('localhost:8000')
    .webpackConfig({
        resolve: {
            alias: {
                ziggy: path.resolve('vendor/tightenco/ziggy/src/js/route.js'),
            },
        },
    });
