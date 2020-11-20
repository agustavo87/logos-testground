<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
    @routes 
    @translations
    <link href="{{ mix('css/app.css') }}" rel="stylesheet" >
    <script src="{{ mix('/js/app.js') }}" defer></script>

    {{-- Tailwind UI Inter Font --}}
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
  </head>
    <body>
      @inertia
    </body>
</html>