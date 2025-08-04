<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    function dashboard(): Response
    {
        return Inertia::render('dashboard/page');
    }
}
