@extends('layouts.app')

@section('title', 'Inicio')

@section('content')
   
<h1>Logos:<small>Casa</small></h1>
    @auth
    <div class="login">
      <p> Bienvenido {{ Auth::user()->name }}!</p>
      <a href="/logout">Salir</a>
    </div>
    @endauth

    @guest
    <div class="login">
    <P>Hola Forastero!</p>
      <a href="/login">Iniciar Sesión</a> | 
      <a href="/register">Registrarse</a>
    </div>
    @endguest

@endsection