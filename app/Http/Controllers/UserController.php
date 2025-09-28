<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(): Response
    {
        $data = [
            'mockUsers' => User::all(),
        ];

        return Inertia::render('dashboard/users/page', $data);
    }
}
