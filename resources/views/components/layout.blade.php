<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <title>{{ 'Arete - ' . $title ?? 'La ciencia de la mejora' }}</title>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        
        
            @stack('head-script')
        
  
</head>
    <body>
    
        {{ $slot }}

        @stack('foot-script')
    </body>
</html>