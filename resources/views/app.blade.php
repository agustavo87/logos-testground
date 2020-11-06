<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--  Por algún motivo si pongo esto acá no funciona Ziggy.
      @routes 
      -->
    @translations
    <link href="{{ mix('css/app.css') }}" rel="stylesheet" >
    <script src="{{ mix('/js/app.js') }}" defer></script>
  </head>
    <body>
      @inertia
    </body>
</html>