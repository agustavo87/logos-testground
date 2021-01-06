<x-layout>
    <x-slot name="title">
        Bienvenido
    </x-slot>
    <x-header />

    @php
        $message = "hola";
    @endphp

   

    <div class="mx-12"">
    <h1 class="border-b border-gray-300 font-black uppercase text-blue-500 text-xl mt-5 mb-8">Arete</h1>
    
    <x-alert type="error" :message="$message" class="mt-8 border border-gray-300 p-3">
        <strong> Que macana!:</strong> Dejaste la waina descuidada :(.<br>
        Mejor comprate un {{ $component->selected }}
    </x-alert>
    
    @auth
    <div class="p-2">
      <p class="my-2"> Bienvenido {{ Auth::user()->name }}!</p>

      <x-button class="mx-2" href="{{ route('home') }}">Inicio</x-button>

      <x-button class="mx-2" href="{{ route('auth.logout') }}">Salir</x-button>

    </div>
    @endauth

    @guest
    <div class="p-2">
      <p  class="my-2">Hola Forastero!</p>
      <x-button class="mx-2" href="{{ route('auth.show') }}">Iniciar Sesión</x-button>
      <x-button class="mx-2" href="{{ route('user.register.show') }}">Registrarse</x-button>
    </div>
    @endguest

  </div>
</x-layout>