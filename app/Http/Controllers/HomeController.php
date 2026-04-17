<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * Homepage controller for Дом на Утёсе landing.
 *
 * Returns the Inertia-rendered Home page. Structure will grow once the
 * client provides the landing brief; for now this is a placeholder that
 * proves the SSR pipeline is alive.
 */
class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home');
    }
}
