<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KontakController extends Controller
{
    public function card()
    {

        return Inertia::render('ppc/kontak/page');
    }
}
