@extends('layouts.app')

@section('title', 'Iniciar Sesión')

@section('content')
   
<h1>Logos:<small>Iniciar Sesión</small></h1>
<h2>Hola</h2>

    <form method="POST" action="/login" class="login">
    @csrf
    <label for="email">e-mail</label><br>
    <input id="email" type="email" name="email" placeholder="juan@example.com" required><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" required><br>
    <input type="checkbox" id="remember" name="remember" value="1">
    <label for="remember"> Recordar</label><br>
    <input type="submit" value="Enviar">
    <input type="reset">
    </form>
@endsection