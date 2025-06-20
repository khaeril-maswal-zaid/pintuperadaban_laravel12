<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    function index(): Response
    {
        return Inertia::render('ppc/page');
    }

    function dashboard(): Response
    {
        return Inertia::render('dashboard/page');
    }
}
