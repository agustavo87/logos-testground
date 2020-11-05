@extends('layouts.app')

@section('title', 'Registro')

@section('content')
<h1>Registro</h1>

      <form method="POST" action="/register"
      class="mx-auto max-w-md shadow-lg flex flex-col>
      @csrf
      <label class="bg-blue-200" for="name">Nombre</label><br>
      <input class="border border-gray-300" id="name" type="text" name="name" placeholder="Juan Perez" required><br>
      <label for="email">e-mail</label><br>
      <input class="border border-gray-300" id="email" type="email" name="email" placeholder="juan@ejemplo.com" required><br>
      <label for="password">Password:</label><br>
      <input class="border border-gray-300"  type="password" id="password" name="password" required><br>
      <input type="submit" value="Enviar">
      <input type="reset">
      </form>

@endsection