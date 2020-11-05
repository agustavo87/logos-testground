<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LogosController extends Controller
{
    public function create()
    {
        return Inertia::render('Logos/Create', [
            'msg' => 'Hola Gustavo',
            'user' => Auth::user(),
            'auth' => Auth::check()
        ]);

    }
}
